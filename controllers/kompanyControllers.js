// import { getSealSessionData, validateToken } from "../services/sealService";
import { endpoints } from "../config/seal_endpoints";
import { parseSealAttributeSet } from "../utils/dataStoreHelper";
import { defaultClaims } from "../config/defaultOidcClaims";
import { updatePassportConfig } from "../config/serverConfig";
import { v4 as uuidv4 } from "uuid";
import { getSessionData, setOrUpdateSessionData } from "../services/redis";


const kompanyProcceed = async(app,req,res) =>{

  console.log("/kompany/proceed");
  let sessionId = req.query.sessionId//req.cookies.sessionId;

  let userDetails = await getSessionData(sessionId, "userDetails");
  let redirectURI = await getSessionData(sessionId, "redirect_uri");
  req.userDetails = userDetails;
  if(userDetails.error){
    req.error = userDetails.error
  }
  req.redirectURI = redirectURI
  let komanyAuthFinished = req.cookies.komanyAuthFinished?req.cookies.komanyAuthFinished:req.query.komanyAuthFinished;
  //TODO

  console.log("Kompany/procced cookies:")
  console.log(req.cookies)
  if(komanyAuthFinished){
    return app.render(req, res, "/kompany/proceed", req.query);
  }else{
    let legalPersonIdentifier = await getSessionData(
      sessionId,
      "legalPersonIdentifier"
    );
    let companyName = await getSessionData(sessionId, "companyName");
    req.userDetails = userDetails;
    req.companyName = companyName;
    req.legalPersonIdentifier = legalPersonIdentifier;
    req.sessionId = sessionId;
    if(userDetails.error){
      req.error = userDetails.error
    }
    return app.render(req, res, "/kyb/validate-relation", req.query);
  }
  

}


const startKompanyLogin = async (app, req, res, serverPassport, oidcClient) => {
  let companyName = req.body.company_name;
  let legalPersonIdentifier = req.body.legal_person_identifier;
  let email = req.body.email;
  let country = req.body.country;
  let externalSessionId = req.body.externalSessionId;
  let redirectURI = req.body.redirect_uri;
  let sessionId = req.body.externalSessionId;

  let claims = defaultClaims;
  // let sessionId = req.cookies.sessionId;

  await setOrUpdateSessionData(sessionId,"legalPersonIdentifier",legalPersonIdentifier);
  await setOrUpdateSessionData(sessionId, "companyName", companyName);
  await setOrUpdateSessionData(sessionId, "email", email);
  await setOrUpdateSessionData(sessionId, "companyCountry", country);
  await setOrUpdateSessionData(sessionId, "redirect_uri", redirectURI);
  await setOrUpdateSessionData(sessionId, "kompanySessionId", externalSessionId);

  let options = {
    maxAge: 1000 * 60 *2, // would expire after 2 minutes
    httpOnly: false, // The cookie only accessible by the web server
    signed: false, // Indicates if the cookie should be signed
    overwrite: true,
  };
  
  res.cookie("sessionId", sessionId, options); // options is optional
  res.cookie("kompanySessionId", externalSessionId, options);
  res.cookie("kyb", "false", options); // options is optional
  res.clearCookie("komanyAuthFinished");

  claims.userinfo.verified_claims.verification.evidence[0].registry.country.value =
    country;
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
    const header = JSON.stringify(headerRaw);
    const payload = JSON.stringify(payloadRaw);
    let jwt = `${urlEncode(header)}.${urlEncode(payload)}.`;
    console.log(`viewcontrollers.js::startLogin:: will make request with jwt`);
    updatePassportConfig(serverPassport, claims, oidcClient, jwt);
  } else {
    updatePassportConfig(serverPassport, claims, oidcClient);
  }

  console.log("2a 22222222222222 sessionId=  " + sessionId)

  // updatePassportConfig(serverPassport, claims, oidcClient);
  res.redirect(307, "/login?sessionId="+sessionId);
};


const encode = function (unencoded) {
  return new Buffer(unencoded || "").toString("base64");
};
const urlEncode = function (unencoded) {
  const encoded = encode(unencoded);
  return encoded.replace(/\+/g, "-").replace(/\//, "_").replace(/=+$/, "");
};

export { startKompanyLogin,kompanyProcceed };
