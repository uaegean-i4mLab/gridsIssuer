import React from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Button from "../CustomButtons/Button.js";
import Head from "next/head";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Link from "next/link";

import styles from "styles/jss/nextjs-material-kit/components/infoStyle.js";

const useStyles = makeStyles(styles);

export default function RegistryPromptAreaComp(props) {
  const classes = useStyles();

  let attributeRows = Object.keys(props.userDetails).flatMap(
    (attributeName) => {
      return (
        <GridItem>
          <div
            className="MuiGrid-root MuiGrid-container MuiGrid-item"
            key={attributeName}
          >
            <div
              className="MuiGrid-root jss579 MuiGrid-item MuiGrid-grid-xs-12 MuiGrid-grid-sm-6"
              style={{ fontWeight: "500" }}
            >
              {attributeName}
            </div>
            <div
              className="MuiGrid-root
              MuiGrid-item
              MuiGrid-grid-xs-12
              MuiGrid-grid-sm-6"
            >
              {props.userDetails[attributeName]}
            </div>
          </div>
          <GridItem>
            <hr
              className="MuiDivider-root"
              style={{
                border: "none",
                height: "1px",
                margin: "0",
                flexShrink: "0",
                backgroundColor: "rgba(0, 0, 0, 0.12)",
              }}
            />
          </GridItem>
        </GridItem>
      );
    }
  );

  // let addToRegistryDiv = (
  //   <Button
  //     onClick={props.addUserToRegistry}
  //     color="primary"
  //     size="lg"
  //     type="submit"
  //   >
  //     Register
  //   </Button>
  // );

  return (
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
      <h1 className={classes.headTitle}>Review your KYB Profile</h1>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <p
            className="MuiTypography-root  MuiTypography-body1"
            style={{ fontSize: "1.1429rem" }}
          >
            Your KYB Profile has been generated successfully. In order to
            redirect back to the service that initiated the KYB check please
            review the correctness of the generated profile. If you are certain
            that the information is accurate click “Finish”.
          </p>
          <p
            className="MuiTypography-root  MuiTypography-body1"
            style={{ fontSize: "1.1429rem" }}
          >
            Additionally, you can instantly generate a publicly Verifiable KYB
            profile of your Company and store it in the system's public
            registry. By opting in for this feature you will enable Regulation
            Supervision Authorities, government bodies and other qualified
            entities, the possibility to instantly Verify the KYB attributes of
            your Company, thus facilitating and simplifying your dealings with
            these parties. To do so click “Register”. To learn more about
            Verifiable KYB data click <a href="#">here</a>
          </p>
        </GridItem>
        <GridItem>
          <h2 className={classes.customH4}>Details</h2>
        </GridItem>
        <GridItem>
          <div className="MuiGrid-root jss578 MuiGrid-container">
            {attributeRows}
          </div>
        </GridItem>

        <div
          className="MuiBox-root jss593 jss541"
          style={{ paddingTop: "32px" }}
        >
          <GridContainer>
            <div
              className="MuiGrid-root jss579 MuiGrid-item MuiGrid-grid-xs-12 MuiGrid-grid-sm-4"
              style={{ margin: "1rem" }}
            >
              {/* {addToRegistryDiv} */}
              <Link
                href={
                  props.baseUrl
                    ? `${props.baseUrl}/kyb/registry-success`
                    : "/kyb/registry-success"
                }
              >
                <Button
                  // variant="primary"
                  // className="float-right"
                  color="primary"
                  size="lg"
                  // type="submit"
                >
                  Register
                </Button>
              </Link>
            </div>
            <div
              className="MuiGrid-root jss579 MuiGrid-item MuiGrid-grid-xs-12 MuiGrid-grid-sm-4"
              style={{ margin: "1rem" }}
            >
              <Button
                onClick={props.proceedToKeycloak}
                color="primary"
                size="lg"
                type="submit"
              >
                Finish
              </Button>
            </div>
          </GridContainer>
        </div>
      </GridContainer>
    </div>
  );
}
