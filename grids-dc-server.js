import { getSessionConfg, getCacheStore } from "./config/sessionConf";
import { configServer } from "./config/serverConfig";
import { initAgent } from "./config/jolocomAgent";
import {
  issueEidas,
  handleIssueEidasResponse,
  issueMyID,
  companySelection,
  startLogin,
  validateRelationship,
  registryPrompt,
  issueKYB,
  issueVcKYBResponse,
} from "./controllers/views-controllers";
import { startKompanyLogin, kompanyProcceed } from "./controllers/kompanyControllers";
import {
  startSession,
  makeEidasRedirectionToken,
  updateSession,
} from "./controllers/seal-api-controllers";
import {
  makeConnectionRequestController,
  handleConnectionResponse,
  handleVCRequestController,
  handleVCResponseController,
} from "./controllers/jolocom-api-controller";
import { sendEmailVCInvite } from "./controllers/emailControllers";
import { jwksController } from "./controllers/jwks-controllers";
import { addToRegistry } from "./controllers/registryControllers";
import { subscribe } from "./services/sse-service";
import { searchDbController } from "./controllers/seach-db-controllers";
import mongoose from "mongoose";

// import winston from "winston";
// import expressWinston from "express-winston";
const cors = require("cors");
const KeycloakMultiRealm = require("./config/KeycloakMultiRealm");
const express = require("express");
const https = require("https");
const fs = require("fs");
const next = require("next");
const jsesc = require("jsesc");
const request = require("request-promise");
const port = parseInt(process.env.PORT, 10) || 5000;
const dev = process.env.NODE_ENV !== "production";
const bodyParser = require("body-parser");
const session = require("express-session");
const axios = require("axios");
const moment = require("moment");
const app = next({ dev });
const handle = app.getRequestHandler();
const cookieParser = require("cookie-parser");
const { passportController } = require("./controllers/security/passport");

// server session cache config
const isProduction = process.env.NODE_ENV === "production";
const SESSION_CONF = getSessionConfg(isProduction);

// configure Keycloak connector for OIDC support
const ldapConfing = JSON.parse(
  fs.readFileSync("./config/keycloakRealms/ldapKeycloak.json")
);
const eidasRealmConfig = JSON.parse(
  fs.readFileSync("./config/keycloakRealms/eidasKeycloak.json")
);
const taxisRealmConfig = JSON.parse(
  fs.readFileSync("./config/keycloakRealms/taxisKeycloak.json")
);
const keycloak = new KeycloakMultiRealm({ store: getCacheStore() }, [
  // esmoRealmConfig,
  eidasRealmConfig,
  taxisRealmConfig,
  ldapConfing,
]);

//Configure and Start the server
let serverConfiguration = { endpoint: "" };

app.prepare().then(async () => {
  const server = express();

  // // Log the whole request and response body
  // expressWinston.requestWhitelist.push("body");
  // expressWinston.responseWhitelist.push("body");
  // server.use(expressWinston.logger({
  //   transports: [
  //     new winston.transports.Console({
  //       json: true,
  //       colorize: true
  //     })
  //   ]
  // }))
  server.set("trust proxy", 1); // trust first proxy
  server.use(bodyParser.urlencoded({ extended: true }));
  server.use(bodyParser.json({ type: "*/*" }));
  server.use(session(SESSION_CONF));
  server.use(cookieParser());

  // server.use(keycloak.middleware());

  // initiate the jolocom agent

  let issuerAgent = null; //await initAgent();

  //CONTROLLERS

  //sse
  server.get(["/events","/kyb/events"], subscribe);

  //view
  server.get(["/company-selection","/kyb/company-selection"], async (req, res) => {
    console.log("/company-selection");
    return companySelection(app, req, res, serverConfiguration.endpoint);
  });
  server.post(["/start-login","/kyb/start-login"], async (req, res) => {
    console.log("/start-login");
    startLogin(app, req, res, serverPassport, oidcClient);
  });
  server.get(["/validate-relation","/kyb/validate-relation"], async (req, res) => {
    console.log("/validate-relation");
    return validateRelationship(app, req, res, serverConfiguration.endpoint);
  });
  server.get(["/kyb/registry-prompt","/kyb/kyb/registry-prompt"], async (req, res) => {
    console.log("/kyb/registry-prompt");
    return registryPrompt(app, req, res, serverConfiguration.endpoint);
  });
  // view VC controllers
  server.get(["/vc/issue/kyb","/kyb/vc/issue/kyb"], async (req, res) => {
    console.log("/vc/issue/kyb");
    return issueKYB(app, req, res, serverPassport, oidcClient);
  });
  //issueVcKYBResponse
  server.get(["/vc/issue/kybResponse","/kyb/vc/issue/kybResponse"], async (req, res) => {
    console.log("/vc/issue/kybResponse");
    return issueVcKYBResponse(
      app,
      req,
      res,
      serverConfiguration.endpoint,
      serverPassport,
      oidcClient
    );
  });

 

  // registry
  server.post(["/registry/add", "/kyb/registry/add"], async (req, res) => {
    console.log("/registry/add");
    await addToRegistry(req, res);
  });

  //email
  server.post(["/email/send","/kyb/email/send"], async (req, res) => {
    console.log("/email/send");
    await sendEmailVCInvite(req, res);
  });

  // //seal
  // server.post(["/seal/start-session"], async (req, res) => {
  //   console.log("/seal/start-session");
  //   await startSession(app, req, res, serverConfiguration.endpoint);
  // });
  // server.get(["/seal/make-eidas-token"], async (req, res) => {
  //   console.log("/seal/make-eidas-token");
  //   res.send(
  //     await makeEidasRedirectionToken(req, res, serverConfiguration.endpoint)
  //   );
  // });
  // server.post(["/seal/update-session"], async (req, res) => {
  //   console.log("/seal/update-session ");
  //   res.send(await updateSession(req, res, serverConfiguration.endpoint));
  // });

  // session
  server.post(["/start-session", "/kyb/start-session"], async (req, res) => {
    console.log("/start-session");
    await startSession(app, req, res, serverConfiguration.endpoint);
  });
  server.post(["/update-session", "/kyb/update-session"], async (req, res) => {
    console.log("/update-session ");
    res.send(await updateSession(req, res, serverConfiguration.endpoint));
  });

  //jolo
  server.post(["/makeConnectionRequest", "/kyb/makeConnectionRequest"], async (req, res) => {
    console.log("/makeConnectionRequest");
    makeConnectionRequestController(req, res, issuerAgent);
  });

  server.post(["/connectionResponse","/kyb/connectionResponse"], async (req, res) => {
    console.log("/connectionResponse");
    handleConnectionResponse(req, res, issuerAgent);
  });

  server.post(["/issueVC","/kyb/issueVC"], async (req, res) => {
    console.log("/issueVC");
    // console.log(req.body)
    handleVCRequestController(
      req,
      res,
      issuerAgent,
      serverConfiguration.endpoint
    );
  });

  server.post(["/offerResponse","/kyb/offerResponse"], async (req, res) => {
    console.log("/offerResponse");
    handleVCResponseController(req, res, issuerAgent);
  });

  // kompany helpers
  server.post(["/kompany-start-login", "/kyb/kompany-start-login"], cors(), async (req, res) => {
    console.log("/kompany-start-login");
    startKompanyLogin(app, req, res, serverPassport, oidcClient);
  });
  server.get(["/kompany/proceed", "/kyb/kompany/proceed"], async (req, res) => {
    console.log("/kompany/proceed");
    kompanyProcceed(app, req, res);
  });

  // this call needs to be on the end of the config as, the handle(*,*) must be last
  // otherwise the rest of the controllers are ignored
  let { endpoint, passport, client } = await configServer(
    server,
    https,
    port,
    isProduction,
    handle,
    serverConfiguration
  );
  let serverPassport = passport;
  let oidcClient = client;
  // grids login flow, all /login*.* uris will be handles by the passportController router
  server.use("/login", passportController);

  server.use("/jwks", jwksController);
  server.use("/query", searchDbController);
  server.use("/jwks", jwksController);
  server.all("*", async (req, res) => {
    return handle(req, res);
  });

  // moved after server startup to speed boot up for dev
  console.log("--- initiating jolocom agent---");
  issuerAgent = await initAgent();
  console.log("--- agent ready ---");
});
