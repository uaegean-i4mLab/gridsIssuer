const qr = require("qr-image");
const imageDataURI = require("image-data-uri");
import { streamToBuffer } from "@jorgeferrero/stream-to-buffer";
import { vcTypes } from "../config/vcTypes";
import { AuthenticationProcessor } from "../utils/jolocomProcessors/authenticationProcessor";
import { setOrUpdateSessionData } from "../services/redis";
// import session from "express-session";
const jsesc = require("jsesc");

const getProcessor = async (jwt, agent) => {
  let authProcessor = new AuthenticationProcessor();
  let processors = [authProcessor];
  // Fetching interaction instance to define processor type based on provided jwt
  const interaction = await agent.findInteraction(jwt);
  // Defining appropriate processor based on interaction flow type
  const processor = processors.find(
    (processor) => processor.supportedType() === interaction.flow.type
  );
  if (!processor) {
    throw new RuntimeException(
      `Can't find processor for '${interaction.flow.type}' interaction flow type.`
    );
  }
  return processor;
};

const handleJolocomFlow = async (jwt, agent) => {
  // Defining appropriate processor based on provided jwt type
  try {
    await agent.findInteraction(jwt);
  } catch (error) {
    // response.status(StatusCodes.NOT_FOUND).json({
    //   message: `Interaction with token '${request.body.token}' not found.`
    // })
    console.log(error);
  }
  const processor = await getProcessor(jwt, agent);
  let token;
  try {
    // Processing jwt and receiving token of the latest interaction message
    token = await processor.process(jwt, agent);
  } catch (error) {
    throw new RuntimeException(
      `Unable to process interaction with type '${processor.supportedType()}'. ${error}.`
    );
  }
  console.log(
    `'${processor.supportedType()}' interaction request processed successfully. Token nonce: '${
      token.nonce
    }'.`
  );
  return token;
};

const makeConnectionRequest = async (
  sealSession,
  vcType,
  isMobile,
  callback,
  sessionId,
  issuerAgent
) => {
  const authRequest = await issuerAgent.authRequestToken({
    callbackURL: `${callback}`,
    description: "Connect with KYB Custodian?",
  });
  // console.log(authRequest);
  var code = qr.image(authRequest.encode(), {
    type: "png",
    ec_level: "H",
    size: 10,
    margin: 10,
  });
  let mediaType = "PNG";
  let encodedQR = imageDataURI.encode(await streamToBuffer(code), mediaType);
  // store in the sessionManager the (sealSession,issuerSession)
  let sessionUpdated = await setOrUpdateSessionData(
    sealSession,
    "issuerSession",
    sessionId
  );
  //res.send({ qr: encodedQR, uuid: sealSession });
  return { qr: encodedQR, uuid: sealSession };
};

const connectionResponseServ = async (
  jwtResponse,
  issuerAgent,
  sealSessionId
) => {
  const userConnectionResponse = await issuerAgent.processJWT(jwtResponse);
  const did = userConnectionResponse.participants.responder.didDocument.did;
  console.log(
    `jolocomService.js:: will cache the DID ${did} in the session ${sealSessionId}`
  );
  let sessionUpdated = await setOrUpdateSessionData(sealSessionId, "DID", did);
  let responseToken =
    await userConnectionResponse.createAuthenticationResponse();
  // console.log(responseToken.encode());
  // console.log("!@#");
  return responseToken.encode();
};

const makeCredentialOffer = async (
  sealSession,
  vcType,
  userAttributes,
  callback,
  isMobile,
  issuerAgent
) => {
  // let did = await getSessionData(sealSession, "DID");
  //store the attributes of the user in session to get them from the call of the wallet
  await setOrUpdateSessionData(
    sealSession,
    "user",
    jsesc(userAttributes, {
      json: true,
    })
  );
  let credentialOfferJSON = {
    callbackURL: callback,
    offeredCredentials: [
      {
        type: vcType,
        renderInfo: {
          renderAs: "document",
        },
        credential: {
          name: vcType,
          display: {
            properties: [
              { path: ["$.familyName"], label: "Family Name", value: "" },
              {
                path: ["$.given_name"],
                label: "Given Name",
                value: "",
              },
              { path: ["$.legal_name"], label: "Legal Name", value: "" },
              {
                path: ["$.legal_person_identifier"],
                label: "Legal Person Identifier",
                value: "",
              },
              {
                path: ["$.business_role"],
                label: "Business Role",
                value: "",
              },
              {
                path: ["$.address"],
                label: "Address",
                value: "",
              },
              {
                path: ["$.lei"],
                label: "L.E.I.",
                value: "",
              },
              {
                path: ["$.vat_registration"],
                label: "Vat Registration Number.",
                value: "",
              },
              {
                path: ["$.birthdate"],
                label: "Date of Birth",
                value: "",
              },
              {
                path: ["$.trading_status"],
                label: "Trading Status",
                value: "",
              },
              {
                path: ["$.personal_number"],
                label: "Personal Identifier",
                value: "",
              },
              {
                path: ["$.sub_jurisdiction"],
                label: "Subjurisdiction",
                value: "",
              },
            ],
          },
        },
      },
    ],
  };

  let credentialOffer = await issuerAgent.credOfferToken(credentialOfferJSON);
  let code = qr.image(credentialOffer.encode(), {
    type: "png",
    ec_level: "L",
    size: 100,
    margin: 0,
  });
  let mediaType = "PNG";
  let encodedQR = imageDataURI.encode(await streamToBuffer(code), mediaType);
  return { qr: encodedQR };
};

const makeVC = async (
  credType,
  userData,
  userDID,
  responseToken,
  issuerAgent
) => {
  const simpleExampleCredMetadata = {
    type: ["VerifiableCredential", credType],
    name: credType,
    context: [
      {
        SimpleExample: `https://grids.project.eu/terms/${credType}`,
        schema: "https://schema.org/",
        source: "schema:source",
      },
    ],
  };
  let claimValues = {};

  simpleExampleCredMetadata.context[0].family_name = "schema:familyName";
  simpleExampleCredMetadata.context[0].given_name = "schema:name";
  simpleExampleCredMetadata.context[0].legal_name = "schema:legal_name";
  simpleExampleCredMetadata.context[0].legal_person_identifier =
    "schema:legal_person_identifier";
  simpleExampleCredMetadata.context[0].business_role = "schema:business_role";
  simpleExampleCredMetadata.context[0].address = "schema:address";
  simpleExampleCredMetadata.context[0].lei = "schema:lei";
  simpleExampleCredMetadata.context[0].vat_registration =
    "schema:vat_registration";
  simpleExampleCredMetadata.context[0].birthdate = "schema:birthdate";
  simpleExampleCredMetadata.context[0].trading_status = "schema:trading_status";
  simpleExampleCredMetadata.context[0].personal_number = "schema:Person";
  simpleExampleCredMetadata.context[0].sub_jurisdiction =
    "schema:sub_jurisdiction";

  if (userData.family_name) claimValues.family_name = userData.family_name;
  if (userData.given_name) claimValues.given_name = userData.given_name;
  if (userData.legal_name) claimValues.legal_name = userData.legal_name;
  if (userData.legal_person_identifier)
    claimValues.legal_person_identifier = userData.legal_person_identifier;
  if (userData.business_role)
    claimValues.business_role = userData.business_role;
  if (userData.address) claimValues.address = userData.address;
  if (userData.lei) claimValues.lei = userData.lei;
  if (userData.vat_registration)
    claimValues.vat_registration = userData.vat_registration;
  if (userData.birthdate) claimValues.birthdate = userData.birthdate;
  if (userData.trading_status)
    claimValues.trading_status = userData.trading_status;
  if (userData.personal_number)
    claimValues.personal_number = userData.personal_number;
  if (userData.sub_jurisdiction)
    claimValues.sub_jurisdiction = userData.sub_jurisdiction;

  const offeredCredential = await issuerAgent.signedCredential(
    {
      metadata: simpleExampleCredMetadata,
      subject: userDID,
      claim: claimValues,
    },
    "mySecretPassword"
  );
  const userIssuerInteraction = await issuerAgent.processJWT(responseToken);
  let credentialOffer = {
    token: (
      await userIssuerInteraction.createCredentialReceiveToken([
        offeredCredential,
      ])
    ).encode(),
  };
  console.log("jolocomService.js makeVC:: the credential VC is");
  console.log(credentialOffer);
  return credentialOffer;
};

export {
  makeConnectionRequest,
  connectionResponseServ,
  makeCredentialOffer,
  makeVC,
  handleJolocomFlow,
};
