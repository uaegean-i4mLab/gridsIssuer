import { response } from "express";
import {
  makeConnectionRequest,
  connectionResponseServ,
  makeCredentialOffer,
  makeVC,
  handleJolocomFlow,
} from "../services/jolocomService";
import { getSessionData } from "../services/redis";

import { getSealSessionData } from "../services/sealService";

import { publish } from "../services/sse-service";

const makeConnectionRequestController = async (req, res, issuerAgent) => {
  let sealSession = req.body.sealSession;
  let vcType = req.body.vcType;
  let isMobile = req.body.isMobile ? true : false;
  let callback = req.baseUrl
    ? `${req.session.endpoint}/${req.baseUrl}/connectionResponse?sealSession=${sealSession}`
    : req.session.endpoint + "/connectionResponse?sealSession=" + sealSession;
  let sessionId = req.session.id;
  console.log(
    "jolocom-api-contorller, makeConnectionRquest callback::" + callback
  );
  let response = await makeConnectionRequest(
    sealSession,
    vcType,
    isMobile,
    callback,
    sessionId,
    issuerAgent
  );
  res.send(response);
};

const handleConnectionResponse = async (req, res, issuerAgent) => {
  console.log("jolocom-api-controller.js handleConnectionResponse ");
  const sealSessionId = req.query.sealSession; //get the sesionId that is picked up from the response uri
  const jwtResponse = req.body.token;
  // retrieve the server sessionId from the SesssionManager
  const responseToken = await handleJolocomFlow(req.body.token, issuerAgent);

  // console.log("handleConnectionResponse")
  // console.log(jwtResponse)

  let responseForUserWallet = await connectionResponseServ(
    jwtResponse,
    issuerAgent,
    sealSessionId
  );

  req.session.did = true;
  publish(
    JSON.stringify({
      uuid: sealSessionId,
      sessionId: sealSessionId,
      status: "connected",
    })
  );

  res.set({
    "access-control-expose-headers": "WWW-Authenticate,Server-Authorization",
    "content-type": "text/html; charset=utf-8",
    vary: "origin",
    "strict-transport-security": "max-age=31536000",
    "cache-control": "no-cache",
    "content-length": "0",
    "content-type": "text/html; charset=utf-8",
  });
  res.status(200).end();
};

const handleVCRequestController = async (req, res, issuerAgent, endpoint) => {
  let sessionId = req.body.sessionId;
  let vcType = req.body.vcType;
  let isMobile = req.body.isMobile ? true : false;
  let userData = req.session.userData;
  // req.session.endpoint = endpoint;
  // req.session.baseUrl = process.env.BASE_PATH;

  let callback = process.env.BASE_PATH
    ? `${endpoint}/${process.env.BASE_PATH}/offerResponse?vcType=${vcType}&sessionId=${sessionId} `
    : endpoint + `/offerResponse?vcType=${vcType}&sessionId=${sessionId} `;
  // console.log("handleVCRequestController userData in session")
  // console.log(userData)
  console.log("handleVCRequestController the callback is " + callback);
  let response = await makeCredentialOffer(
    sessionId,
    vcType,
    userData,
    callback,
    isMobile,
    issuerAgent
  );
  res.send(response);
};

const handleVCResponseController = async (req, res, issuerAgent) => {
  let sealSessionId = req.query.sessionId;
  let vcType = req.query.vcType;
  console.log("handleVCResponseController");
  // console.log(sealSessionId);

  let sessionDetails = await getSessionData(sealSessionId) //, "userDetails");
  // console.log("session details")
  // console.log(sessionDetails);
  let kybAttributes = JSON.parse(sessionDetails).kybProfile;
  // console.log("user attributes::");
  // console.log(userAttributes);
  let userDID = JSON.parse(sessionDetails).DID;//await getSealSessionData(sealSessionId, "DID");

  let userResponseToken = req.body.token;
  let response = await makeVC(
    vcType,
    kybAttributes,
    userDID,
    userResponseToken,
    issuerAgent
  );

  publish(
    JSON.stringify({
      uuid: sealSessionId,
      sessionId: sealSessionId,
      status: "sent",
    })
  );
  res.send(response);
};

export {
  makeConnectionRequestController,
  handleConnectionResponse,
  handleVCRequestController,
  handleVCResponseController,
};
