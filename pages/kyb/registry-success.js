import React from "react";
import axios from "axios";
import LayoutNew from "../../components/updated/LayoutNew";
import { connect } from "react-redux";
import Head from "next/head";
import RegistrySuccessAreaComp from "../../components/updated/RegistrySuccessArea";
import Cookies from "js-cookie";
import {setUserAttributeSelection, setSessionId,setBaseUrl,setCustodianFinishURI} from "../../store.js"

class Wizard extends React.Component {
  constructor(props) {
    super(props);
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
      reduxStore.dispatch(setUserAttributeSelection(req.userDetails));
      reduxStore.dispatch(setCustodianFinishURI(req.keycloakRedirectURI));
    }

    return {
      userDetails: req.userDetails,
      selfLei: req.selfLei,
      sessionId: req.sessionId,
      keycloakUrl: req.keycloakRedirectURI,
    };
  }

  proceedToKeycloak() {
    //finish the flow by redirecting back to keycloak to  "continue" the OIDC flow originated by the DC
    console.log("proceed to keycloak");
    let isKompanySpecificFlow = Cookies.get("kompanySessionId");

    if (isKompanySpecificFlow) {
      Cookies.set("komanyAuthFinished", "true");
      Cookies.remove("kompanySessionId");
      window.location.href = "/kompany/proceed";
    } else {
      window.location.href = this.props.keycloakUrl;
    }
  }

  render() {
    return (
      <LayoutNew home activeStep={3}>
        <Head>
          <title>Grids</title>
        </Head>
        <RegistrySuccessAreaComp
          userDetails={this.props.userDetails}
          handleNext={this.proceedToKeycloak}
          activeStep={3}
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
