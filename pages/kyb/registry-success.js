import React from "react";
import axios from "axios";
import LayoutNew from "../../components/LayoutNew";
import { connect } from "react-redux";
import Head from "next/head";
import RegistrySuccessAreaComp from "../../components/InfoArea/RegistrySuccessArea";
import Cookies from "js-cookie";

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
    return {
      userDetails: reduxStore.getState().userSelection,
      selfLei: reduxStore.getState().selfLei,
      sessionId: reduxStore.getState().sessionId,
      keycloakUrl: reduxStore.getState().custodianFinishURI,
    };
  }

  proceedToKeycloak() {
    //finish the flow by redirecting back to keycloak to  "continue" the OIDC flow originated by the DC
    console.log("proceed to keycloak");
    let isKompanySpecificFlow = Cookies.get("kompanySessionId");
    let sessionId = this.props.sessionId;
    let issueLink = `http://kyb-custodian-i4mlab.aegean.gr:5050/vc/issue/kyb?sessionId=${sessionId}`
    const reqObj = { sessionId: sessionId };
    //add to registry and redirect
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
            issueLink: issueLink,
            name:this.props.userDetails.given_name,
            surname:this.props.userDetails.family_name
          })
          .then((response) => {
            // console.log(response);
            console.log("email sent ok");
          });
      })
      .then(() => {
        if (isKompanySpecificFlow) {
          Cookies.set("komanyAuthFinished", "true");
          Cookies.remove("kompanySessionId");
          window.location.href = "/kompany/proceed";
        } else {
          window.location.href = this.props.keycloakUrl;
        }
      });
  }

  render() {
    return (
      <LayoutNew home>
        <Head>
          <title>Grids</title>
        </Head>
        <RegistrySuccessAreaComp
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
