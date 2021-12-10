import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
//AppBar
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MoreIcon from "@mui/icons-material/MoreVert";
//Stepper
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";

import Grid from "@mui/material/Grid";

//Card
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";

//Forms
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";

//Icons
import InfoIcon from "@mui/icons-material/Info";
import Tooltip from "@mui/material/Tooltip";

//Table
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Link from "next/link";

function createData(variabl, value) {
  return { variabl, value };
}

export default function RegistryPromptAreaComp(props) {
  const rows = [];
  const rowsPersonal = [];
  let personalAttributes = [
    "given_name",
    "family_name",
    "personal_number",
    "brithdate",
    "business_role",
  ];
  Object.keys(props.userDetails).forEach((attributeName) => {
    if (personalAttributes.indexOf(attributeName) >= 0) {
      rowsPersonal.push(
        createData(attributeName, props.userDetails[attributeName])
      );
    } else {
      rows.push(createData(attributeName, props.userDetails[attributeName]));
    }
  });

  // let attributeRows = Object.keys(props.userDetails).flatMap(
  //   (attributeName) => {
  //     return (
  //       <GridItem>
  //         <div
  //           className="MuiGrid-root MuiGrid-container MuiGrid-item"
  //           key={attributeName}
  //         >
  //           <div
  //             className="MuiGrid-root jss579 MuiGrid-item MuiGrid-grid-xs-12 MuiGrid-grid-sm-6"
  //             style={{ fontWeight: "500" }}
  //           >
  //             {attributeName}
  //           </div>
  //           <div
  //             className="MuiGrid-root
  //             MuiGrid-item
  //             MuiGrid-grid-xs-12
  //             MuiGrid-grid-sm-6"
  //           >
  //             {props.userDetails[attributeName]}
  //           </div>
  //         </div>
  //         <GridItem>
  //           <hr
  //             className="MuiDivider-root"
  //             style={{
  //               border: "none",
  //               height: "1px",
  //               margin: "0",
  //               flexShrink: "0",
  //               backgroundColor: "rgba(0, 0, 0, 0.12)",
  //             }}
  //           />
  //         </GridItem>
  //       </GridItem>
  //     );
  //   }
  // );

  return (
    // <div
    //   className={classes.container}
    //   style={{
    //     color: "rgba(0, 0, 0, 0.87)",
    //     margin: 0,
    //     fontSize: "1rem",
    //     fontFamily: `"Roboto", "Helvetica", "Arial", sans-serif`,
    //     fontWeight: 400,
    //     lineHeight: "1.43",
    //     letterSpacing: "0.01071em",
    //   }}
    // >
    //   <h1 className={classes.headTitle}>Review your KYB Profile</h1>
    //   <GridContainer>
    //     <GridItem xs={12} sm={12} md={12}>
    //       <p
    //         className="MuiTypography-root  MuiTypography-body1"
    //         style={{ fontSize: "1.1429rem" }}
    //       >
    //         Your KYB Profile has been generated successfully. In order to
    //         redirect back to the service that initiated the KYB check please
    //         review the correctness of the generated profile. If you are certain
    //         that the information is accurate click “Finish”.
    //       </p>
    //       <p
    //         className="MuiTypography-root  MuiTypography-body1"
    //         style={{ fontSize: "1.1429rem" }}
    //       >
    //         Additionally, you can instantly generate a publicly Verifiable KYB
    //         profile of your Company and store it in the system's public
    //         registry. By opting in for this feature you will enable Regulation
    //         Supervision Authorities, government bodies and other qualified
    //         entities, the possibility to instantly Verify the KYB attributes of
    //         your Company, thus facilitating and simplifying your dealings with
    //         these parties. To do so click “Register”. To learn more about
    //         Verifiable KYB data click <a href="#">here</a>
    //       </p>
    //     </GridItem>
    //     <GridItem>
    //       <h2 className={classes.customH4}>Details</h2>
    //     </GridItem>
    //     <GridItem>
    //       <div className="MuiGrid-root jss578 MuiGrid-container">
    //         {attributeRows}
    //       </div>
    //     </GridItem>

    //     <div
    //       className="MuiBox-root jss593 jss541"
    //       style={{ paddingTop: "32px" }}
    //     >
    //       <GridContainer>
    //         <div
    //           className="MuiGrid-root jss579 MuiGrid-item MuiGrid-grid-xs-12 MuiGrid-grid-sm-4"
    //           style={{ margin: "1rem" }}
    //         >
    //           {/* {addToRegistryDiv} */}
    //           <Link
    //             href={
    //               props.baseUrl
    //                 ? `${props.baseUrl}/kyb/registry-success`
    //                 : "/kyb/registry-success"
    //             }
    //           >
    //             <Button
    //               // variant="primary"
    //               // className="float-right"
    //               color="primary"
    //               size="lg"
    //               // type="submit"
    //             >
    //               Register
    //             </Button>
    //           </Link>
    //         </div>
    //         <div
    //           className="MuiGrid-root jss579 MuiGrid-item MuiGrid-grid-xs-12 MuiGrid-grid-sm-4"
    //           style={{ margin: "1rem" }}
    //         >
    //           <Button
    //             onClick={props.proceedToKeycloak}
    //             color="primary"
    //             size="lg"
    //             type="submit"
    //           >
    //             Finish
    //           </Button>
    //         </div>
    //       </GridContainer>
    //     </div>
    //   </GridContainer>
    // </div>
    <React.Fragment>
      <>
        <Typography variant="h5" sx={{ mt: 6, mb: 4 }}>
          Company KYB profile retrieved
        </Typography>
        <Typography variant="h6" sx={{ mt: 6, mb: 4, fontWeight: "bold" }}>
          Company
        </Typography>

        <TableContainer>
          <Table aria-label="simple table">
            <TableBody>
              {rows.map((row) => (
                <TableRow
                  key={row.name}
                  sx={{
                    "&:last-child td, &:last-child th": {
                      border: 0,
                    },
                  }}
                >
                  <TableCell component="th" scope="row">
                    <Box fontWeight="fontWeightBold" display="inline">
                      {row.variabl}
                    </Box>
                  </TableCell>
                  <TableCell align="left">{row.value}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Typography variant="h6" sx={{ mt: 6, mb: 4, fontWeight: "bold" }}>
          Legal Representative
        </Typography>
        <TableContainer>
          <Table aria-label="simple table">
            <TableBody>
              {rowsPersonal.map((row) => (
                <TableRow
                  key={row.name}
                  sx={{
                    "&:last-child td, &:last-child th": {
                      border: 0,
                    },
                  }}
                >
                  <TableCell component="th" scope="row">
                    <Box fontWeight="fontWeightBold" display="inline">
                      {row.variabl}
                    </Box>
                  </TableCell>
                  <TableCell align="left">{row.value}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </>


      <Box sx={{ display: "flex", flexDirection: "row", pt: 4 }}>
        <Button
          color="inherit"
          disabled={props.activeStep === 0}
          onClick={props.handleBack}
          sx={{ mr: 1 }}
          size="large"
        >
          Back
        </Button>
        <Box sx={{ flex: "1 1 auto" }} />
       

        {props.activeStep == 2 && (
          <>
            <Button color="inherit" onClick={props.handleStep2} sx={{ mr: 1 }}>
              Register
            </Button>
            <Button
              variant="contained"
              size="large"
              onClick={props.handleNext}
              sx={{ mr: 1 }}
            >
              Finish
            </Button>
          </>
        )}

      

        
      </Box>
    </React.Fragment>
  );
}
