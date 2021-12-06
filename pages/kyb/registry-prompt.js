import React from "react";
import axios from "axios";
import LayoutNew from "../../components/LayoutNew";
import { connect } from "react-redux";
import Head from "next/head";
import RegistryPromptAreaComp from "../../components/InfoArea/RegistryPromptArea";
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
      <LayoutNew home>
        <Head>
          <title>Grids</title>
        </Head>

        {/* <div className="container" style={{ marginTop: "3rem" }}>
          
          <div className="row" style={{ marginBottom: "3rem" }}>
            Please review the attributes retrieved, presented below. If you are
            certain that these attributes correctly identify you please click
            the Next button. Additionally, if you would like you can add your
            Company’s KYB profile in the public registry in an easily Verifiable
            Format? If you opt in for this feature the public profile of your
            organization will be easily verified by anyone (public authorities,
            B2B transactions etc.) greatly facilitating your dealings with these
            parties. If Yes, please click the “Register” button
          </div>
          <div className="row" style={{ marginBottom: "3rem" }}>
            Details:
          </div>
          <div className="row" style={{ marginBottom: "3rem" }}>
            <ValidateTable userDetails={this.props.userDetails}></ValidateTable>
          </div>

          {addToRegistryDiv}

          <div className="row" style={{ marginBottom: "3rem" }}>
            <button onClick={this.proceedToKeycloak}>Finish</button>
          </div>
        </div> */}

        <RegistryPromptAreaComp
          userDetails={this.props.userDetails}
          proceedToKeycloak={this.proceedToKeycloak}
          addToRegistryDiv={this.state.addedToRegistry}
          addUserToRegistry={this.addUserToRegistry}
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
