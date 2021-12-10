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



export default function RegistrySuccessAreaComp(props) {

  return (
    <React.Fragment>
      <>
        <Typography variant="h5" sx={{ mt: 6, mb: 4 }}>
          Already Registered!
        </Typography>

        <Typography sx={{ mt: 6, mb: 4 }}>
          Your Company’s KYB profile has been successfully added to the
          Verifiable Data Registry of the GRIDS KYB Custodian Service. An email
          with further details will be sent to you shortly.
        </Typography>

        <Typography>
          In order to redirect back to the service that initiated the KYB check
          please complete this step (Finish).
        </Typography>
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

        <>
          
          <Button
            variant="contained"
            size="large"
            onClick={props.handleNext}
            sx={{ mr: 1 }}
          >
            Finish
          </Button>
        </>
      </Box>
    </React.Fragment>

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
    //         Your Company’s KYB profile has been successfully added to the
    //         Verifiable Data Registry of the GRIDS KYB Custodian Service. An
    //         email with further details will be sent to you shortly.
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
  );
}
