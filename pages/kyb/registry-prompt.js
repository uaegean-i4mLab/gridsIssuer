import React from "react";
import axios from "axios";
import LayoutNew from "../../components/updated/LayoutNew";
import { connect } from "react-redux";
import Head from "next/head";
import RegistryPromptAreaComp from "../../components/updated/RegistryPromptArea";
import Cookies from "js-cookie";
import {setUserAttributeSelection, setSessionId,setBaseUrl,setCustodianFinishURI} from "../../store.js"

class Wizard extends React.Component {
  constructor(props) {
    super(props);
    this.addUserToRegistry = this.addUserToRegistry.bind(this);
    this.proceedToKeycloak = this.proceedToKeycloak.bind(this);
    this.state = {
      addedToRegistry: false,
    };
  }

  static async getInitialProps({ reduxStore, req }) {
    //returned value here is getting mered with the mapstatetoprops
    // mapstatetoprops overrides these values if they match
    if (typeof window === "undefined") {
      let baseUrl = req.baseUrl ? `/${req.baseUrl}/` : "";
      reduxStore.dispatch(setBaseUrl(baseUrl));
      reduxStore.dispatch(setSessionId(req.sessionId));
      reduxStore.dispatch(setUserAttributeSelection(req.userDetails))
      reduxStore.dispatch(setCustodianFinishURI(req.keycloakRedirectURI))
    }


    return {
      userDetails: req.userDetails,
      selfLei: req.selfLei,
      sessionId: req.sessionId,
      keycloakUrl: req.keycloakRedirectURI,
    };
  }

  addUserToRegistry() {
    let sessionId = this.props.sessionId;
    const reqObj = { sessionId: sessionId };
    axios
      .post("/registry/add", reqObj)
      .then((response) => {
        // console.log(response);
        this.setState({
          addedToRegistry: true,
        });
      })
      .then(() => {
        axios
          .post("/email/send", {
            sessionId: sessionId,
            issueLink: "thisisalink",
          })
          .then((response) => {
            // console.log(response);
            console.log("email sent ok");
            window.location.href = "/kyb/registry-success";
          });
      });
    //TODO add here the send email callback
  }

  proceedToKeycloak() {
    //finish the flow by redirecting back to keycloak to  "continue" the OIDC flow originated by the DC
    console.log("proceed to keycloak");
    let isKompanySpecificFlow = Cookies.get("kompanySessionId");
    
    if (isKompanySpecificFlow) {
      Cookies.set("komanyAuthFinished", "true");
      Cookies.remove("kompanySessionId")
      window.location.href = "/kompany/proceed";
    } else {
      window.location.href = this.props.keycloakUrl;
    }
  }

  render() {
    let addToRegistryDiv = !this.state.addedToRegistry ? (
      <div className="row" style={{ marginBottom: "3 rem" }}>
        <button onClick={this.addUserToRegistry}>Register</button>
      </div>
    ) : (
      <div style={{ margin: "3 rem 3 rem 3 rem 3 rem" }}>
        Thank you for registering
      </div>
    );

    return (
      <LayoutNew home activeStep={2}>
        <Head>
          <title>Grids</title>
        </Head>

        <RegistryPromptAreaComp
          userDetails={this.props.userDetails}
          handleNext={this.proceedToKeycloak}
          addToRegistryDiv={this.state.addedToRegistry}
          handleStep2={this.addUserToRegistry}
          activeStep={2}
        />
      </LayoutNew>
    );
  }
}

function mapStateToProps(state) {
  return {
    test: "Test",
  };
}

const mapDispatchToProps = (dispatch) => {
  return {};
};
export default connect(mapStateToProps, mapDispatchToProps)(Wizard);
