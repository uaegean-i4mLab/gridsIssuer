import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import CustomInputNew from "components/CustomInput/CustomInputNew.js";

import styles from "styles/jss/nextjs-material-kit/components/formStyle.js";
import MessageBox from "../messageBox";

const useStyles = makeStyles(styles);

export default function Form6(props) {
  const classes = useStyles();
  const { ...rest } = props;
  // let nextButton =

  return (
    <div className={classes.container}>
      <h6 className={classes.headTitle}>Build your KYB profile</h6>
      <div
        style={{
          fontSize: "18px",
          lineHeight: "32px",
          color: "#414141",
          fontFamily: "Open Sans,sans-serif!important",
        }}
      >
        <p>
          <p data-uw-styling-context="true">
            In order to initiate the generation of the KYB profile of your
            Company, you must first provide your personal details and the
            details of the company you represent below. Then click the “Generate
            Profile” button.
          </p>
        </p>
      </div>

      <h4 className={classes.customH4}>Company Details Form</h4>
      <GridContainer>
        <GridItem xs={12} sm={12} md={6}>
          <CustomInputNew
            labelText="Company Name"
            name="companyName"
            id="companyName"
            formControlProps={{
              fullWidth: true,
            }}
            handleChange={props.handleChange}
            placeholder="Legal Name of the Company"
          />
        </GridItem>
        <GridItem xs={12} sm={12} md={6}>
          <CustomInputNew
            labelText="Company Registration Number"
            name="legal_person_identifier"
            placeholder="Company Registration Identifier"
            id="legal_person_identifier"
            formControlProps={{
              fullWidth: true,
            }}
            handleChange={props.handleChange}
          />
        </GridItem>

        <GridItem xs={12} sm={12} md={6}>
          <CustomInputNew
            labelText="Company Country"
            name="country"
            id="country"
            placeholder="Company Country of Registration"
            formControlProps={{
              fullWidth: true,
            }}
            handleChange={props.handleChange}
          />
        </GridItem>
      </GridContainer>
      <h4 className={classes.customH4}>Representative Form</h4>
      <GridContainer>
        <GridItem xs={12} sm={12} md={6}>
          <CustomInputNew
            labelText="Name"
            id="name"
            name="name"
            placeholder="Name of Legal Representative"
            formControlProps={{
              fullWidth: true,
            }}
            handleChange={props.handleChange}
          />
        </GridItem>
        <GridItem xs={12} sm={12} md={6}>
          <CustomInputNew
            labelText="Surname"
            placeholder="Surname of Legal Representative"
            name="surname"
            id="surname"
            formControlProps={{
              fullWidth: true,
            }}
            handleChange={props.handleChange}
          />
        </GridItem>
        <GridItem xs={12} sm={12} md={12}>
          <CustomInputNew
            labelText="email"
            placeholder="Email of Legal Representative"
            name="email"
            id="email"
            formControlProps={{
              fullWidth: true,
            }}
            handleChange={props.handleChange}
          />
        </GridItem>
      </GridContainer>
      <Button
        disabled={!props.isNextEnabled}
        color="primary"
        size="lg"
        type="submit"
      >
        Generate Profile
      </Button>
    </div>
  );
}
