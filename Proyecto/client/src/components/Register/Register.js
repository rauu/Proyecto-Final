import React from "react";

import Footer from "../Footer/Footer";

import "./Register.css";
import logo from "../../assets/logo.png";
import {
  Typography,
  Link,
  Button,
  Grid,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  IconButton,
  InputAdornment,
  OutlinedInput,
} from "@material-ui/core";
import { DatePicker, KeyboardDatePicker } from "@material-ui/pickers";

import { Visibility, VisibilityOff } from "@material-ui/icons";

import LinkA from "react-router-dom/Link";

const Register = () => {
  const [gender, setGender] = React.useState("");
  const [values, setValues] = React.useState({
    name: "",
    surname: "",
    username: "",
    email: "",
    dob: "",
    gender: "",
    password: "",
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
    console.log(values);
  };

  return (
    <div className="register">
      <Typography component={"div"}>
        <nav className="navbar navbar-expand nav">
          <div className="d-flex flex-grow-1">
            <LinkA to="/">
              <a className="navbar-brand" href="#">
                <img src={logo} alt="logo" className="logo" />
              </a>
            </LinkA>
          </div>
          <div className="collapse navbar-collapse flex-grow-1 text-right">
            <ul className="navbar-nav ml-auto flex-nowrap ">
              <li className="nav-item px-3">
                <Link href="#" className="nav-link links" color="secondary">
                  Sign In
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      </Typography>
      <div className="register-first">
        <br />
        <Typography variant="h2" className="white">
          YOUR CHANGE BEGINS HERE
        </Typography>
        <Typography variant="h5" className="white">
          Body, Mind and Nutrition
        </Typography>
        <br />
      </div>
      <div className="registerForm">
        <br />
        <br />
        <br />
        <br />
        <form action="POST" autoComplete="off">
          <Grid
            container
            spacing={5}
            className="grid-center"
            alignItems="center"
            justify="center"
          >
            <Grid item xs={12} sm={12} md={6} lg={6}>
              <TextField
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                onChange={handleChange("name")}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6}>
              <TextField
                name="lastName"
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                onChange={handleChange("surname")}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <TextField
                name="username"
                variant="outlined"
                required
                fullWidth
                id="username"
                label="UserName"
                onChange={handleChange("username")}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <TextField
                name="email"
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email"
                onChange={handleChange("email")}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6}>
              <TextField
                id="date"
                label="Date of Birth"
                type="date"
                required
                fullWidth
                variant="outlined"
                defaultValue=""
                InputLabelProps={{ shrink: true }}
                onChange={handleChange("dob")}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6}>
              <FormControl variant="outlined" fullWidth required>
                <InputLabel id="gender">Gender</InputLabel>
                <Select
                  labelId="gender"
                  id="gender"
                  value={values.gender}
                  onChange={handleChange("gender")}
                  label="Gender"
                >
                  <MenuItem value={"men"}>Men</MenuItem>
                  <MenuItem value={"women"}>Women</MenuItem>
                  <MenuItem value={"other"}>Other</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <TextField
                id="password"
                label="Password"
                type="password"
                variant="outlined"
                fullWidth
                required
                onChange={handleChange("password")}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <TextField
                id="confirm-password"
                label="Confirm Password"
                type="password"
                variant="outlined"
                fullWidth
                required
              />
            </Grid>
          </Grid>
          <br />
          <Button
            variant="contained"
            color="primary"
            className="button"
            type="button"
          >
            Register
          </Button>
          <br/>
          <br/>
          <br/>
        </form>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default Register;
