import React from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import LayoutNew from "../LayoutNew";
import Button from "../CustomButtons/Button.js";
import Head from "next/head";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";

import styles from "styles/jss/nextjs-material-kit/components/infoStyle.js";

const useStyles = makeStyles(styles);

export default function ValidateRelationArea(props) {
  const classes = useStyles();

  let documentDisplayDiv = !props.displayDocument ? (
    <div></div>
  ) : (
    <div className={classes.container}>
      <h1 className={classes.headTitle}>Document to Sign:</h1>
      <GridItem xs={12} sm={12} md={12}>
        <p
          className="MuiTypography-root  MuiTypography-body1"
          style={{ fontSize: "1.1429rem" }}
        >
          <span style={{ padding: "0rem 0.3rem 0rem 0.3rem" }}>I</span>
          <b>
            {props.userDetails.given_name} {props.userDetails.family_name}
          </b>
          <span style={{ padding: "0rem 0.3rem 0rem 0.3rem" }}>, born at:</span>{" "}
          <b>{props.userDetails.birthdate}</b>
          <span style={{ padding: "0rem 0.3rem 0rem 0.3rem" }}>
            identified by the eIDAS personal Identifier:
          </span>
          <b>{props.userDetails.personal_number}</b>
          <span style={{ padding: "0rem 0.3rem 0rem 0.3rem" }}>
            {" "}
            attest that I am affiliated with the company identified by the Legal
            Company Identifier or Legal Name:
          </span>
          <b>{props.companyIdentifier}</b>.
        </p>
      </GridItem>
    </div>
  );

  let normalResult = (
    <div
      className={classes.container}
      style={{
        color: "rgba(0, 0, 0, 0.87)",
        margin: 0,
        fontSize: "1rem",
        fontFamily: `"Roboto", "Helvetica", "Arial", sans-serif`,
        fontWeight: 400,
        lineHeight: "1.43",
        letterSpacing: "0.01071em",
      }}
    >
      <h1 className={classes.headTitle}>Personal Declaration</h1>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <p
            className="MuiTypography-root  MuiTypography-body1"
            style={{ fontSize: "1.1429rem" }}
          >
            Your KYB profile is almost ready. 
            To continue, please confirm that you, 
            <b>{props.userDetails.given_name}</b> <b>{props.userDetails.family_name}</b>, 
            born at <b>{props.userDetails.birthdate} </b>
            and assigned the eIDAS eID personal Identifier <b>{props.userDetails.personal_number}</b>, 
            are affiliated with the company <b>"{props.companyName}"</b>, 
            with the company identifier: <b>"{props.companyIdentifier}" </b>
          </p>
        </GridItem>
        <GridItem>{documentDisplayDiv}</GridItem>
        <GridItem>
          <Button
            onClick={props.signAndProceed}
            color="primary"
            size="lg"
            type="submit"
          >
            I Confirm
          </Button>
        </GridItem>
      </GridContainer>
    </div>
  );

  let errorResult = (
    <div
      className={classes.container}
      style={{
        color: "rgba(0, 0, 0, 0.87)",
        margin: 0,
        fontSize: "1rem",
        fontFamily: `"Roboto", "Helvetica", "Arial", sans-serif`,
        fontWeight: 400,
        lineHeight: "1.43",
        letterSpacing: "0.01071em",
      }}
    >
      <h1 className={classes.headTitle}>An unexpected error occured!</h1>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <p
            className="MuiTypography-root  MuiTypography-body1"
            style={{ fontSize: "1.1429rem" }}
          >
            {props.error}
          </p>
        </GridItem>
      </GridContainer>
    </div>
  );
  let finalResult;
  if (props.error) {
    finalResult = errorResult;
  } else {
    finalResult = normalResult;
  }

  return (
    <LayoutNew home>
      <Head>
        <title>Grids</title>
      </Head>
      {finalResult}
    </LayoutNew>
  );
}
