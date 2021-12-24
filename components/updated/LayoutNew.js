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

import CustomStepper from "./stepper.js";

export default function LayoutNew(props, { children, home }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const steps = [
    "Registration / Verification",
    "Mandate Validation",
    "KYB Profile",
    "Register with us",
  ];

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Container maxWidth="lg">
        <Grid container spacing={4} sx={{ mt: 2 }}>
          <Grid item md={4} xs={10}>
            <img src="/logo-group.svg" alt="" className="kyb" width="100%" />
          </Grid>

          <Grid item xs={6} sx={{ display: { xs: "none", md: "block" } }}>
            <img
              src="/pattern.svg"
              alt=""
              className="Pattern"
              width="750px"
              style={{ marginTop: -480, marginBottom: -250, marginLeft: -100 }}
            />
          </Grid>
        </Grid>
        {/* side box  */}
        <Grid container spacing={4} sx={{ mt: 3 }}>
          <Grid item md={9} sm={12}>
            <Box sx={{ width: "100%", mt: 2 }}>
              <CustomStepper activeStep={props.activeStep} steps={steps} />

              <React.Fragment>{props.children}</React.Fragment>
            </Box>
          </Grid>

          <Grid item md={3} xs={12}>
            {props.activeStep == 0 ? (
              <Card variant="outlined">
                <CardContent>
                  <Typography
                    sx={{ fontSize: 14 }}
                    color="text.secondary"
                    gutterBottom
                  >
                    Welcome
                  </Typography>
                  <Typography variant="h5" component="div">
                    Build your KYB profile
                  </Typography>
                  <Typography variant="body2" sx={{ mt: 4 }}>
                    In order to initiate the generation of the KYB profile of
                    your Company, you must first provide your personal details
                    and the details of the company you represent below. Then
                    click the “Next” button.
                    <br />
                  </Typography>
                  <Box my={3} sx={{ width: { md: "100%", xs: "50%" } }}>
                    <img src="/profile.svg" alt="provile-img" width="100%" />
                  </Box>
                </CardContent>
              </Card>
            ) : null}

            {props.activeStep == 1 ? (
              <Card variant="outlined">
                <CardContent>
                  <Typography
                    sx={{ fontSize: 14 }}
                    color="text.secondary"
                    gutterBottom
                  >
                    Validate
                  </Typography>
                  <Typography variant="h5" component="div">
                    Almost Ready
                  </Typography>
                  <Box my={3}>
                    <img src="/sign.svg" alt="sign-img" width="100%" />
                  </Box>
                </CardContent>
              </Card>
            ) : null}

            {props.activeStep == 2 ? (
              <Card variant="outlined">
                <CardContent>
                  <Typography
                    sx={{ fontSize: 14 }}
                    color="text.secondary"
                    gutterBottom
                  >
                    Profile
                  </Typography>
                  <Typography variant="h5" component="div">
                    KYB profile (Finish or Register)
                  </Typography>
                  <Typography variant="body2" sx={{ mt: 4 }}>
                    1. Finish: Your KYB Profile has been generated successfully.
                    In order to redirect back to the service that initiated the
                    KYB check please complete this step (Finish). <br />
                  </Typography>
                  <Typography variant="body2" sx={{ mt: 4 }}>
                    2. Register: Additionally, you can instantly generate a
                    publicly Verifiable KYB profile of your Company and store it
                    in the system's public registry. By opting in for this
                    feature you will enable Regulation Supervision Authorities,
                    government bodies and other qualified entities, the
                    possibility to instantly Verify the KYB attributes of your
                    Company, thus facilitating and simplifying your dealings
                    with these parties. To do so click “Register”.
                  </Typography>
                  <Box my={3}>
                    <img src="/information.svg" alt="sign-img" width="100%" />
                  </Box>
                </CardContent>
              </Card>
            ) : null}

            {props.activeStep == 3 ? (
              <Card variant="outlined">
                <CardContent>
                  <Typography
                    sx={{ fontSize: 14 }}
                    color="text.secondary"
                    gutterBottom
                  >
                    Register
                  </Typography>
                  <Typography variant="h5" component="div">
                    Completed
                  </Typography>
                  <Typography variant="body2" sx={{ mt: 4 }}>
                    Your Company’s KYB profile has been successfully added to
                    the Verifiable Data Registry of the GRIDS KYB Custodian
                    Service. <br />
                  </Typography>

                  <Box my={3}>
                    <img src="/done.svg" alt="sign-img" width="100%" />
                  </Box>
                </CardContent>
              </Card>
            ) : null}
          </Grid>
        </Grid>

        {/* footer */}
        <Grid container spacing={5} sx={{ pt: 12, mb: 2 }}>
          <Grid item md={2} xs={4}>
            <img src="/cef.png" alt="cef" />
          </Grid>
          <Grid item md={6} xs={8}>
            <Typography>
              The GRIDS KYB Custodian Service has been co-financed by the{" "}
              <a href="https://ec.europa.eu/inea/en/connecting-europe-facility">
                {" "}
                Connecting Europe Facility (CEF)
              </a>{" "}
              of the European Union | <br />
              GRIDS Project: Grant Agreement No INEA/CEF/ICT/A2019/1926018
            </Typography>{" "}
            <br />
          </Grid>

          <Grid item md={4} xs={12}>
            <Grid container>
              <Typography sx={{ mb: 2, mr: 2 }}>
                Developed by{" "}
                <a href="http://www.atlantis-group.gr/i4Mlab">
                  {" "}
                  UAegean i4m Lab{" "}
                </a>
                , <a href="https://www.kompany.com/">Kompany</a> and{" "}
                <a href="https://www.grids-cef.eu/">GRIDS Consortium</a>
              </Typography>
              <Grid>
                <Typography variant="h6" sx={{ mr: 2 }}>
                  Contact:
                </Typography>{" "}
              </Grid>

              <Grid sx={{ mr: 1 }}>
                <a href="mailto:i4mlab@uaegean">
                  <img
                    src="/mail.svg"
                    height="35"
                    alt="kompany"
                    className="facebook"
                  />
                </a>{" "}
              </Grid>
              <Grid sx={{ mr: 1 }}>
                {" "}
                <a href="https://www.linkedin.com/showcase/grids-kyb-custodian">
                  <img
                    src="/linkedin.svg"
                    height="35"
                    alt="linkedin"
                    className="twitter"
                  />
                </a>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
