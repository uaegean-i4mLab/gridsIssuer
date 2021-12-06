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


export default function CompanySelectionForm(props) {
  let longText = "";

  return (
    <React.Fragment>
      <>
        <Typography variant="h5" sx={{ mt: 6, mb: 4 }}>
          Company Details Form
          <Tooltip title={longText}>
            <IconButton>
              <InfoIcon />
            </IconButton>
          </Tooltip>
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={6}>
            <TextField
              fullWidth
              id="filled-basic"
              label="Company Name"
              variant="filled"
              sx={{ mr: 4 }}
              handleChange={props.handleChange}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              id="filled-basic"
              label="Company Registration Number"
              variant="filled"
              sx={{ mr: 4 }}
              handleChange={props.handleChange}
            />
          </Grid>
        </Grid>
        <FormControl fullWidth sx={{ mt: 4 }}>
          <InputLabel id="demo-simple-select-label">Country</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Age"
            onChange={props.handleChange}
            variant="filled"
          >
            <MenuItem value={"UK"}>UK</MenuItem>
            <MenuItem value={"Greece"}>Greece</MenuItem>
            <MenuItem value={"Germany"}>Germany</MenuItem>
          </Select>
        </FormControl>

        <Typography variant="h5" sx={{ mt: 6, mb: 4 }}>
          Representative Form
          <Tooltip title={longText}>
            <IconButton>
              <InfoIcon />
            </IconButton>
          </Tooltip>
        </Typography>

        <Grid container spacing={4}>
          <Grid item xs={6}>
            <TextField
             handleChange={props.handleChange}
              fullWidth
              id="filled-basic"
              label="Name"
              variant="filled"
              sx={{ mr: 4 }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              id="filled-basic"
              label="Surname"
              variant="filled"
              sx={{ mr: 4 }}
            />
          </Grid>
        </Grid>
        <TextField
          fullWidth
          id="filled-basic"
          label="Email"
          variant="filled"
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
        
        <Button variant="contained" size="large" type="submit">
          Generate Profile
        </Button>
      </Box>
    </React.Fragment>
  );
}
