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
import InfoIcon from '@mui/icons-material/Info';
import Tooltip from '@mui/material/Tooltip';

//Table
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Link from "next/link";

import Divider from "@mui/material/Divider";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import DoneAllIcon from "@mui/icons-material/DoneAll";

function createData(variabl, value, info) {
  return { variabl, value, info };
}

function mapName(name) {
  switch (name) {
    case "country":
      return "Company Country of Registration";
      break;

    case "lei":
      return "LEI";
      break;
    case "address":
      return "Company Address";
      break;
    case "birthdate":
      return "Date of Birth";
      break;
    case "trading_status":
      return "Trading Status";
      break;
    case "legal_name":
      return "Legal Company Name";
      break;
    case "sub_jurisdiction":
      return "Sub Jurisdiction";
      break;
    case "sic":
      return "SIC";
      break;
    case "vat_registration":
      return "VAT Registration Number";
      break;
    case "legal_person_identifier":
      return "Company Identifier";
      break;
    case "business_role":
      return "Business Role";
      break;
    case "given_name":
      return "First Name";
      break;
    case "family_name":
      return "Last Name";
      break;
    case "personal_number":
      return "eIDAS eID Person Identifier";
      break;
  }
}

function getRowByAttribute(name, rowArray) {
  return rowArray.filter((entry) => {
    return entry.variabl === name;
  })[0];
}

export default function RegistryPromptAreaComp(props) {
  const companyRows = [];
  const rowsPersonal = [];
  let personalAttributes = [
    "given_name",
    "family_name",
    "personal_number",
    "birthdate",
    "business_role",
  ];
  Object.keys(props.userDetails).forEach((attributeName) => {
    let info = undefined;
    switch (attributeName) {
      case "legal_person_identifier":
        info = "The Company Business Identifier";
        break;
      case "Company Country of Registration":
        info = "The Company Jurisdiction Country";
        break;
      case "sub_jurisdiction":
        info = "The sub-jurisdiction that the Company is registered at";
        break;
      case "trading_status":
        info = "The trading status of the company (live, dormant etc.)";
        break;
      case "sic":
        info = "The Standard Industrial Classification Code of the Company";
        break;
      case "lei":
        info = "The Legal Entity Identifier of the Company";
        break;
      case "business_role":
        info =
          "The business role of the Legal Representative within the Company (example: Managing Director, Director etc.)";
        break;
      default:
        console.log(`was looking ofr ${attributeName}`)
        break; 
    }
    if (personalAttributes.indexOf(attributeName) >= 0) {
      rowsPersonal.push(
        createData(mapName(attributeName), props.userDetails[attributeName],info)
      );
    } else {
      companyRows.push(
        createData(mapName(attributeName), props.userDetails[attributeName],info)
      );
    }
  });

  let shortePersonalRow = [];
  shortePersonalRow.push(getRowByAttribute("First Name", rowsPersonal));
  shortePersonalRow.push(getRowByAttribute("Last Name", rowsPersonal));
  shortePersonalRow.push(
    getRowByAttribute("eIDAS eID Person Identifier", rowsPersonal)
  );
  shortePersonalRow.push(getRowByAttribute("Date of Birth", rowsPersonal));
  shortePersonalRow.push(getRowByAttribute("Business Role", rowsPersonal));

  let shortedCompanyRows = [];
  shortedCompanyRows.push(getRowByAttribute("Legal Company Name", companyRows));
  shortedCompanyRows.push(getRowByAttribute("Company Identifier", companyRows));
  // shortedCompanyRows.push(getRowByAttribute("Company Country of Registration", companyRows));
  shortedCompanyRows.push(getRowByAttribute("Sub Jurisdiction", companyRows));
  shortedCompanyRows.push(
    getRowByAttribute("VAT Registration Number", companyRows)
  );
  shortedCompanyRows.push(getRowByAttribute("Trading Status", companyRows));
  shortedCompanyRows.push(getRowByAttribute("SIC", companyRows));
  shortedCompanyRows.push(getRowByAttribute("LEI", companyRows));
  shortedCompanyRows.push(getRowByAttribute("Company Address", companyRows));

  console.log(companyRows);
  console.log(shortedCompanyRows);

  return (
    <React.Fragment>
      <>
        <Typography variant="h5" sx={{ mt: 6, mb: 6 }}>
          Company KYB profile retrieved
        </Typography>
        <Divider sx={{ borderColor: "#ff9900" }}></Divider>
        <Typography
          variant="h6"
          sx={{ mt: 2, mb: 4, fontWeight: "bold", color: "#ff9900" }}
        >
          Company
        </Typography>
        <TableContainer sx={{ mb: 6 }}>
          <Table aria-label="simple table" size="small">
            <TableBody>
              {shortedCompanyRows.map((row) => (
                <TableRow
                  key={row.variabl}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    <Box fontWeight="fontWeightBold" display="inline">
                      {row.variabl}
                    </Box>
                    {row.info != null && (
                      <>
                        <Tooltip title={row.info}>
                          <IconButton>
                            <InfoIcon />
                          </IconButton>
                        </Tooltip>
                      </>
                    )}
                  </TableCell>
                  <TableCell align="left">{row.value}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Divider
          className="dividerForm"
          sx={{ borderColor: "#00b33c" }}
        ></Divider>

        <Typography
          variant="h6"
          sx={{ mt: 2, mb: 4, fontWeight: "bold", color: "#00b33c" }}
        >
          Legal Representative
        </Typography>
        <TableContainer>
          <Table aria-label="simple table" size="small">
            <TableBody>
              {shortePersonalRow.map((row) => (
                <TableRow
                  key={row.variabl}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    <Box fontWeight="fontWeightBold" display="inline">
                      {row.variabl}
                    </Box>
                    {row.info != null && (
                      <>
                        <Tooltip title={row.info}>
                          <IconButton>
                            <InfoIcon />
                          </IconButton>
                        </Tooltip>
                      </>
                    )}
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
