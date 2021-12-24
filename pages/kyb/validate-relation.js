import React from "react";
import ValidateRelationArea from "../../components/updated/ValidateRelationArea";
import { connect } from "react-redux";

class ValidateRelation extends React.Component {
  constructor(props) {
    super(props);
    this.signAndProceed = this.signAndProceed.bind(this);
    this.showDocument = this.showDocument.bind(this);
    this.state = {
      displayDocument: false,
    };
  }

  static async getInitialProps({ reduxStore, req }) {
    //returned value here is getting mered with the mapstatetoprops
    // mapstatetoprops overrides these values if they match
    let companyIdentifier = req.legalPersonIdentifier
      ? req.legalPersonIdentifier
      : req.companyName;

    let sessionId = req.sessionId;
    return {
      userDetails: req.userDetails,
      legalPersonIdentifier: req.legalPersonIdentifier,
      companyName: req.companyName,
      companyIdentifier: companyIdentifier,
      error: req.error,
      sessionId: sessionId,
    };
  }

  signAndProceed = () => {
    console.log("/kyb/registry-prompt?sessionId=" + this.props.sessionId);
    window.location.href =
      "/kyb/registry-prompt?sessionId=" + this.props.sessionId;
    // history.push("/kyb/registry-prompt");
  };

  showDocument = (e) => {
    console.log("showdocument");
    e.preventDefault();
    this.setState({
      displayDocument: true,
    });
  };

  render() {
    return (
      <ValidateRelationArea
        showDocument={this.showDocument}
        signAndProceed={this.signAndProceed}
        displayDocument={this.state.displayDocument}
        userDetails={this.props.userDetails}
        companyIdentifier={this.props.companyIdentifier}
        companyName={this.props.companyName}
        legalPersonIdentifier={this.props.legalPersonIdentifier}
        error={this.props.error}
        activeStep={1}
        handleNext={this.signAndProceed}
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    test: "Test",
    // sessionId: state.sessionId,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {};
};
export default connect(mapStateToProps, mapDispatchToProps)(ValidateRelation);
