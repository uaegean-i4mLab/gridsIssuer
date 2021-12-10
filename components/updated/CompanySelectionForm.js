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

export default function CompanySelectionForm(props) {
  let longText = "";

  return (
    <React.Fragment>
      <>
        <Typography variant="h5" sx={{ mt: 6, mb: 4 }}>
          Company Information
        </Typography>
        <Grid container spacing={4}>
          <Grid item sm={6} xs={12}>
            <TextField
              fullWidth
              name="companyName"
              id="companyName"
              placeholder="Company Name"
              label="Company Name"
              variant="filled"
              sx={{ mr: 4 }}
              onChange={props.handleChange}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              name="legal_person_identifier"
              placeholder="Company Registration Identifier"
              label="Company Registration Number"
              variant="filled"
              sx={{ mr: 4 }}
              onChange={props.handleChange}
            />
          </Grid>
        </Grid>
        <FormControl fullWidth sx={{ mt: 4 }}>
          <InputLabel id="demo-simple-select-label">
            Country of Company Registration
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            name="country"
            id="country"
            // placeholder="Company Country of Registration"
            // label="Age"
            onChange={props.handleChange}
            variant="filled"
          >
            <MenuItem value={"AT"}>Austria</MenuItem>

            <MenuItem value={"BE"}>Belgium</MenuItem>
            <MenuItem value={"BG"}>Bulgaria</MenuItem>
            <MenuItem value={"HR"}>Croatia</MenuItem>
            <MenuItem value={"CY"}>Cyprus</MenuItem>

            <MenuItem value={"CZ"}>Czechia</MenuItem>

            <MenuItem value={"DK"}>Denmark</MenuItem>
            <MenuItem value={"EE"}>Estonia</MenuItem>
            <MenuItem value={"FI"}>Finland</MenuItem>

            <MenuItem value={"FR"}>France</MenuItem>

            <MenuItem value={"DE"}>Germany</MenuItem>
            <MenuItem value={"GR"}>Greece</MenuItem>
            <MenuItem value={"HU"}>Hungary</MenuItem>

            <MenuItem value={"IE"}>Ireland</MenuItem>
            <MenuItem value={"IT"}>Italy</MenuItem>

            <MenuItem value={"LV"}>Latvia</MenuItem>
            <MenuItem value={"LU"}>Luxembourg</MenuItem>
            <MenuItem value={"LT"}>Lithuania</MenuItem>
            <MenuItem value={"MT"}>Malta</MenuItem>
            <MenuItem value={"NL"}>Netherlands</MenuItem>

            <MenuItem value={"PL"}>Poland</MenuItem>
            <MenuItem value={"PT"}>Portugal</MenuItem>
            <MenuItem value={"RO"}>Romania</MenuItem>

            <MenuItem value={"ES"}>Spain</MenuItem>
            <MenuItem value={"SK"}>Slovakia</MenuItem>

            <MenuItem value={"SI"}>Slovenia</MenuItem>
            <MenuItem value={"SE"}>Sweden</MenuItem>
            <MenuItem value={"UK"}>United Kingdom</MenuItem>
          </Select>
        </FormControl>

        <Typography variant="h5" sx={{ mt: 6, mb: 4 }}>
          Company Representative Information
        </Typography>

        <Grid container spacing={4}>
        <Grid item sm={6} xs={12}>
            <TextField
              onChange={props.handleChange}
              fullWidth
              id="lname"
              name="lname"
              placeholder="Name of Legal Representative"
              label="Name"
              variant="filled"
              sx={{ mr: 4 }}
            />
          </Grid>
          <Grid item sm={6} xs={12}>
            <TextField
              fullWidth
              placeholder="Surname of Legal Representative"
              name="lsurname"
              id="lsurname"
              label="Surname"
              variant="filled"
              sx={{ mr: 4 }}
            />
          </Grid>
        </Grid>
        <TextField
          fullWidth
          name="email"
          id="email"
          label="Email"
          variant="filled"
          onChange={props.handleChange}
          sx={{ mt: 4 }}
        />
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

        <Button
          variant="contained"
          size="large"
          type="submit"
          disabled={!props.isNextEnabled}
        >
          Generate Profile
        </Button>
      </Box>
    </React.Fragment>
  );
}
