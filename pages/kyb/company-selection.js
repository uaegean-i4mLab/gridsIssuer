import React from "react";
import axios from "axios";
import LayoutNew from "../../components/updated/LayoutNew";
import { connect } from "react-redux";
import ValidateTable from "../../components/ValidateKYBComp";
import Form1 from "../../components/Forms/Form1";
import Form2 from "../../components/Forms/Form2";
import Form3 from "../../components/Forms/Form3";
import Form4 from "../../components/Forms/Form4";
import Form5 from "../../components/Forms/Form5";
import Form6 from "../../components/Forms/CompanySelectionForm";
import CompanySelectionForm from "../../components/updated/CompanySelectionForm";
import Head from "next/head";

class CompanySelectionWrapper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      companyName: null,
      companyCountry: null,
      LEI: null,
      isNextEnabled: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.stringNotEmpty = this.stringNotEmpty.bind(this);
  }

  static async getInitialProps({ reduxStore, req }) {
    //returned value here is getting mered with the mapstatetoprops
    // mapstatetoprops overrides these values if they match
    return {
      userDetails: req.userDetails,
    };
  }

  async handleChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    // console.log(name + " " + value);
    // setInputs(values => ({...values, [name]: value}))
    await this.setState({
      [name]: value,
    });
    if (
      this.stringNotEmpty(this.state.country) &&
      this.stringNotEmpty(this.state.email) &&
      (this.stringNotEmpty(this.state.companyName) ||
        this.stringNotEmpty(this.state.legal_person_identifier))
    ) {
      this.setState({
        isNextEnabled: true,
      });
    } else {
      this.setState({
        isNextEnabled: false,
      });
    }
  }

  stringNotEmpty(s) {
    if (s) {
      let result = s.length > 0;
      // console.log(`not empty ${s}:: ${result}`);

      return result;
    }
    return false;
  }

  render() {
    return (
      <LayoutNew home activeStep={0}>
        <Head>
          <title>Grids</title>
        </Head>
        <form action="/start-login" method="post">
          <CompanySelectionForm
            activeStep={0}
            handleChange={this.handleChange}
            isNextEnabled={this.state.isNextEnabled}
          />
        </form>
        {/*<label className="row">
            Company Name:
            <input
              type="text"
              name="companyName"
              onChange={this.handleChange}
            />
          </label>
          <label className="row">
            Company identifier:
            <input
              type="text"
              name="legal_person_identifier"
              onChange={this.handleChange}
            />
          </label>

          <div
            className="row"
            style={{ marginBottom: "2rem", marginTop: "2rem" }}
          >
            {" "}
            <b>Representative Details:</b>
          </div>

          <label className="row">
            Name:
            <input type="text" name="name" onChange={this.handleChange} />
          </label>
          <label className="row">
            Surname:
            <input type="text" name="surname" onChange={this.handleChange} />
          </label>
          <label className="row">
            e-mail:
            <input type="text" name="email" onChange={this.handleChange} />
          </label>

          <div className="row">
            <input type="submit" disabled={!this.state.isNextEnabled} />

          </div>*/}
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
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CompanySelectionWrapper);
