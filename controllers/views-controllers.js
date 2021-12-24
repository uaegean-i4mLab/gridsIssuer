// import { getSealSessionData, validateToken } from "../services/sealService";
import { endpoints } from "../config/seal_endpoints";
import { parseSealAttributeSet } from "../utils/dataStoreHelper";
import { defaultClaims } from "../config/defaultOidcClaims";
import { updatePassportConfig } from "../config/serverConfig";
import { v4 as uuidv4 } from "uuid";
import { getSessionData, setOrUpdateSessionData } from "../services/redis";


const companySelection = async (app, req, res) => {
 
  let options = {
    maxAge: 1000 * 60 * 15, // would expire after 15 minutes
    httpOnly: false, // The cookie only accessible by the web server
    signed: false, // Indicates if the cookie should be signed
  };

  let externalSessionId = req.query.extSessionId ? req.query.extSessionId : null;
  let sessionId = externalSessionId?externalSessionId:uuidv4();
  // console.log(`hey the external session id is:${req.query.extSessionId}`);
  // Set cookie
  res.cookie("sessionId", sessionId, options); // options is optional
  res.cookie("extSessionId", externalSessionId, options);
  res.cookie("kyb", "false", options); // options is optional

  req.sessionId = sessionId;
  return app.render(req, res, "/kyb/company-selection", req.query);
};

const startLogin = async (app, req, res, serverPassport, oidcClient) => {
  // let lei = req.body.lei;
  let companyName = req.body.companyName;
  let legalPersonIdentifier = req.body.legal_person_identifier;
  let email = req.body.email;
  let country = req.body.country

  let claims = defaultClaims;
  console.log("2 2222222222 ViewControllers.js startLogin " + req.query.sessionId)
  let sessionId =  req.query.sessionId;


  
  await setOrUpdateSessionData(
    sessionId,
    "legalPersonIdentifier",
    legalPersonIdentifier
  );
  await setOrUpdateSessionData(sessionId, "companyName", companyName);
  await setOrUpdateSessionData(sessionId, "email", email);
  await setOrUpdateSessionData(sessionId, "companyCountry", country);

  
  claims.userinfo.verified_claims.verification.evidence[0].registry.country.value=country 
  // console.log("!!!!!!!!!!! the claims that will be added!!!!!!!")
  // console.log(claims.userinfo.verified_claims.verification.evidence[0])
  if (companyName || legalPersonIdentifier) {
    const headerRaw = {
      alg: "none",
      typ: "JWT",
    };
    const payloadRaw = {
      sub: "mock",
      aud: "mock",
      iss: "http://localhost",
      client_id: oidcClient.client_id,
      redirect_uri: oidcClient.redirect_uris[0],
      claims: claims,
    };

    if (companyName) {
      payloadRaw.legal_name = companyName;
    }
    if (legalPersonIdentifier) {
      payloadRaw.legal_person_identifier = legalPersonIdentifier;
    }

    // console.log(oidcClient)
    // console.log(oidcClient.client_id)
    // console.log(oidcClient.redirect_uris)

    const header = JSON.stringify(headerRaw);
    const payload = JSON.stringify(payloadRaw);
    let jwt = `${urlEncode(header)}.${urlEncode(payload)}.`;
    console.log(`viewcontrollers.js::startLogin:: will make request with jwt`);
    updatePassportConfig(serverPassport, claims, oidcClient, jwt);
  } else {
    updatePassportConfig(serverPassport, claims, oidcClient);
  }

  // updatePassportConfig(serverPassport, claims, oidcClient);
  res.redirect(307, "/login?sessionId="+sessionId);
};

const validateRelationship = async (app, req, res, endpoint) => {
  
  // console.log("000000000000000000000000000000")
  // console.log(req.query)
  
  let sessionId = req.query.sessionId;
  let userDetails = await getSessionData(sessionId, "userDetails");
  let legalPersonIdentifier = await getSessionData(
    sessionId,
    "legalPersonIdentifier"
  );
  let companyName = await getSessionData(sessionId, "companyName");
  // console.log(`sessionId ${sessionId} details:`)
  req.userDetails = userDetails;
  req.companyName = companyName;
  req.legalPersonIdentifier = legalPersonIdentifier;
  req.sessionId = sessionId;
  if(userDetails.error){
    req.error = userDetails.error
  }
  // console.log(userDetails)
  /*
  {
  lei: '529900ENKWV3BZ5GYL12',
  address: null,
  birthdate: '1965-01-01',
  business_role: null,
  trading_status: 'LIVE',
  legal_name: '360kompany AG',
  sub_jurisdiction: 'AT',
  sic: '["7375 - Informationsabruf von entfernten Datenbanken","1450 - Media","73759903 - Remote data base information retrieval","63120 - Web portals"]',
  given_name: 'claude',
  vat_registration: 'ATU67091005',
  legal_person_identifier: '375714x',
  family_name: 'Phil',
  personal_number: 'el/el/11111'
}
  */
  return app.render(req, res, "/kyb/validate-relation", req.query);
};

const registryPrompt = async (app, req, res, endpoint) => {
  let sessionId = req.query.sessionId;
  console.log("1111111111111111")
  console.log(req.query)
  console.log("*******************")

  let userDetails = await getSessionData(sessionId, "userDetails");
  let selfLei = await getSessionData(sessionId, "selfLEI");
  // console.log(`sessionId ${sessionId} details:`)
  req.userDetails = userDetails;
  req.selfLei = selfLei;
  req.sessionId = sessionId;
  // req.extSessionId = req.cookies.extSessionId;

  //below:: sessionId <<---  req.cookies.extSessionId
  req.keycloakRedirectURI = process.env.KEYCLOAK_REDIRECT_URI
    ? `${process.env.KEYCLOAK_REDIRECT_URI}?extSessionId=${sessionId}&userDetails=${encodeURIComponent(JSON.stringify(userDetails))}`
    : `http://localhost:8081/auth/realms/kyb/rest/kybResponse?extSessionId=${sessionId}&userDetails=${encodeURIComponent(JSON.stringify(userDetails))}`;
  return app.render(req, res, "/kyb/registry-prompt", req.query);
};


const registrySuccess = async (app, req, res, endpoint) => {
  let sessionId = req.cookies.sessionId;
  let userDetails = await getSessionData(sessionId, "userDetails");
  let selfLei = await getSessionData(sessionId, "selfLEI");
  // console.log(`sessionId ${sessionId} details:`)
  req.userDetails = userDetails;
  req.selfLei = selfLei;
  req.sessionId = sessionId;
  // req.extSessionId = req.cookies.extSessionId;
  req.keycloakRedirectURI = process.env.KEYCLOAK_REDIRECT_URI
    ? `${process.env.KEYCLOAK_REDIRECT_URI}?extSessionId=${req.cookies.extSessionId}&userDetails=${encodeURIComponent(JSON.stringify(userDetails))}`
    : `http://localhost:8081/auth/realms/kyb/rest/kybResponse?extSessionId=${req.cookies.extSessionId}&userDetails=${encodeURIComponent(JSON.stringify(userDetails))}`;
  return app.render(req, res, "/kyb/registry-success", req.query);
};


const issueKYB = async (app, req, res, serverPassport, oidcClient) => {
  let sessionId = req.query.sessionId;
  let claims = defaultClaims;
  let redirectURI = process.env.ISSUE_REDIRECT_URI
    ? process.env.ISSUE_REDIRECT_URI
    : "http://localhost:5000/vc/response/kyb";

  const headerRaw = {
    alg: "none",
    typ: "JWT",
  };
  const payloadRaw = {
    sub: "mock",
    aud: "mock",
    iss: "http://localhost",
    client_id: oidcClient.client_id,
    redirect_uri: redirectURI,
    claims: claims,
  };
  const header = JSON.stringify(headerRaw);
  const payload = JSON.stringify(payloadRaw);
  let jwt = `${urlEncode(header)}.${urlEncode(payload)}.`;
  updatePassportConfig(serverPassport, claims, oidcClient, jwt);
  let options = {
    maxAge: 1000 * 60 * 15, // would expire after 5 minutes
    httpOnly: true, // The cookie only accessible by the web server
    signed: false, // Indicates if the cookie should be signed
  };
  // Set cookie
  res.cookie("kyb", sessionId, options); // options is optional
  res.cookie("sessionId", sessionId, options); // options is optional
  res.redirect(307, "/login");
  // return app.render(req, res, "/vc/issue/kyb", req.query);
};

const issueVcKYBResponse = async (
  app,
  req,
  res,
  endpoint,
  serverPassport,
  oidcClient
) => {
  let sessionId = req.query.sessionId;
  let userDetails = await getSessionData(sessionId, "userDetails");
  // console.log(updatedUsersAttributes);
  req.session.DID = false;
  req.session.userData = userDetails;
  req.session.sessionId = sessionId;
  req.session.endpoint = endpoint;
  req.session.baseUrl = process.env.BASE_PATH;
  return app.render(req, res, "/vc/issue/kyb", req.query);
};

const issueEidas = async (app, req, res, endpoint) => {
  //if we are redirected from mobile
  if (req.query.sealSession) {
    req.session.sealSession = req.query.sealSession;
    let did = await getSealSessionData(
      req.query.sealSession,
      "DID",
      0,
      endpoints.sealSMUri,
      endpoints.sealSMPort
    );
    console.log(
      `for the session ${req.query.sealSession}  i got the DID data ${did}`
    );
    if (did) {
      req.session.DID = true;
    }
  }
  req.session.endpoint = endpoint;
  // console.log("ENDPOINT");
  // console.log(req.session.endpoint);
  req.session.baseUrl = process.env.BASE_PATH;
  req.eidasUri = endpoints.sealEidasUri;
  req.eidasPort = endpoints.sealEidasPort;
  let redirect = process.env.BASE_PATH
    ? `${endpoint}/${process.env.BASE_PATH}/vc/issue/eidas/response`
    : `${endpoint}/vc/issue/eidas/response`;
  req.eidasRedirectUri = redirect;
  //   console.log(req.eidasRedirectUri);
  return app.render(req, res, "/vc/issue/eidas", req.query);
};

const handleIssueEidasResponse = async (app, req, res, endpoint) => {
  const msToken = req.body.msToken;
  // sessionId is provided by the caller
  let sessionId = await validateToken(msToken);
  let dataStore = JSON.parse(await getSealSessionData(sessionId, "dataStore"));
  let eidasAttributes = dataStore.clearData.find((dataSet) => {
    return dataSet.type === "eIDAS";
  }).attributes;
  let updatedUsersAttributes = parseSealAttributeSet(
    eidasAttributes,
    null,
    "eidas"
  );
  // console.log(updatedUsersAttributes);
  req.session.DID = true;
  req.session.userData = updatedUsersAttributes;
  req.session.sealSession = sessionId;

  req.session.endpoint = endpoint;
  req.session.baseUrl = process.env.BASE_PATH;
  return app.render(req, res, "/vc/issue/eidas", req.query);
};

const issueMyID = async (app, req, res, endpoint) => {
  // if (req.query.msToken) {
  //   let sessionId = await validateToken(req.query.msToken);
  //   let ds = await getSealSessionData(sessionId, "dataStore");
  //   let did = await getSealSessionData(sessionId, "DID");
  //   if (did) {
  //     req.session.DID = true;
  //   }
  //   if (ds) {
  //     let dataStore = JSON.parse(ds);
  //     req.session.userData = makeUserDetails(dataStore);
  //   }
  //   req.session.sealSession = sessionId;
  // }
  //if we are redirected from mobile
  if (req.query.sealSession) {
    req.session.sealSession = req.query.sealSession;
    let did = await getSessionData(req.query.sealSession, "DID");
    if (did) {
      req.session.DID = true;
    }
  }
  req.session.endpoint = endpoint;
  req.session.baseUrl = process.env.BASE_PATH;
  req.eidasUri = endpoints.sealEidasUri;
  req.eidasPort = endpoints.sealEidasPort;
  req.edugainUri = endpoints.sealEdugainUri;
  req.edugainPort = endpoints.sealEdugainPort;
  let redirect = process.env.BASE_PATH
    ? `${endpoint}/${process.env.BASE_PATH}/vc/issue/myID/response`
    : `${endpoint}/vc/issue/myID/response`;
  req.eidasRedirectUri = redirect;
  console.log(req.eidasRedirectUri);
  return app.render(req, res, "/vc/issue/myID", req.query);
};

const encode = function (unencoded) {
  return new Buffer(unencoded || "").toString("base64");
};
const urlEncode = function (unencoded) {
  const encoded = encode(unencoded);
  return encoded.replace(/\+/g, "-").replace(/\//, "_").replace(/=+$/, "");
};

export {
  issueEidas,
  handleIssueEidasResponse,
  issueMyID,
  companySelection,
  startLogin,
  validateRelationship,
  registryPrompt,
  issueKYB,
  issueVcKYBResponse,
  registrySuccess
};
