import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
//AppBar
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';
//Stepper
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';

import Grid from '@mui/material/Grid';

//Card
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';

//Forms
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';

//Icons
import InfoIcon from '@mui/icons-material/Info';
import Tooltip from '@mui/material/Tooltip';

//Table
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


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
    "Registration/Verification",
    "Company Validation",
    "KYB Profile",
  ];

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" elevation={0}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <img width="80" src={"./GRIDS_logo.svg"} />
          <Box sx={{ flexGrow: 1 }} />
         
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <IconButton
              size="large"
              aria-label="show 4 new mails"
              color="inherit"
            >
              <Badge badgeContent={4} color="error">
                <MailIcon />
              </Badge>
            </IconButton>
            <IconButton
              size="large"
              aria-label="show 17 new notifications"
              color="inherit"
            >
              <Badge badgeContent={17} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="show more"
              // aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMenu}
      <Container maxWidth="lg">
        <Grid container spacing={4} sx={{ mt: 5 }}>
          <Grid item xs={9}>
            <Box sx={{ width: "100%", mt: 2 }}>
              <CustomStepper activeStep={props.activeStep} steps={steps} />

              <main>{props.children}</main>
            </Box>
          </Grid>
          <Grid item xs={3}>
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
                    {props.activeStep + 1}. Build your KYB profile
                  </Typography>
                  <Typography variant="body2" sx={{ mt: 4 }}>
                    In order to initiate the generation of the KYB profile of
                    your Company, you must first provide your personal details
                    and the details of the company you represent below. Then
                    click the “Next” button.
                    <br />
                  </Typography>
                  <Box my={3}>
                    <img src="./profile.svg" alt="provile-img" width="100%" />
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
                    {activeStep + 1}. Almost Ready
                  </Typography>
                  <Typography variant="body2" sx={{ mt: 4 }}>
                    Confirm that you are affiliated with the company you
                    represent. Then click the “Next” button for an information
                    overview of your personal details.
                    <br />
                  </Typography>
                  <Box my={3}>
                    <img src="./sign.svg" alt="sign-img" width="100%" />
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
                    {activeStep + 1}. Review your KYB Profile
                  </Typography>
                  <Typography variant="body2" sx={{ mt: 4 }}>
                    Your KYB Profile has been generated successfully. In order
                    to redirect back to the service that initiated the KYB check
                    please review the correctness of the generated profile. If
                    you are certain that the information is accurate click
                    “Finish”.
                    <br />
                  </Typography>
                  <Typography variant="body2" sx={{ mt: 4 }}>
                    Additionally, you can instantly generate a publicly
                    Verifiable KYB profile of your Company and store it in the
                    system's public registry. By opting in for this feature you
                    will enable Regulation Supervision Authorities, government
                    bodies and other qualified entities, the possibility to
                    instantly Verify the KYB attributes of your Company, thus
                    facilitating and simplifying your dealings with these
                    parties. To do so click “Register”. To learn more about
                    Verifiable KYB data click here
                  </Typography>
                  <Box my={3}>
                    <img src="./information.svg" alt="sign-img" width="100%" />
                  </Box>
                </CardContent>
              </Card>
            ) : null}
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
