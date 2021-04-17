import React from "react";

import { Fade } from "react-reveal";

import "./Login.css";
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
  FormHelperText,
  Snackbar,
} from "@material-ui/core";

import MuiAlert from "@material-ui/lab/Alert";

import LinkA from "react-router-dom/Link";

const Login = () => {
  return (
    <div className="login">
      <Typography component={"div"}>
        <nav className="navbar navbar-expand nav">
          <div className="d-flex flex-grow-1">
            <LinkA to="/">
              <img src={logo} alt="logo" className="logo" />
            </LinkA>
          </div>
          <div className="collapse navbar-collapse flex-grow-1 text-right">
            <ul className="navbar-nav ml-auto flex-nowrap ">
              <li className="nav-item px-3">
                <LinkA
                  to="/register"
                  className="nav-link links"
                  color="secondary"
                >
                  Sign Up
                </LinkA>
              </li>
            </ul>
          </div>
        </nav>
      </Typography>
      <div className="login-first">
        <Fade top>
          <br />
          <Typography variant="h2" className="white">
            Welcome again!
          </Typography>
          <Typography variant="h5" className="white">
            LogIn to have another great session
          </Typography>
          <br />
        </Fade>
      </div>
      <div className="login-form">
        <br />
        <br />
        <br />
        <form noValidate autoComplete="off">
          <Grid
            container
            spacing={5}
            className="grid-center"
            alignItems="center"
            justify="center"
          >
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <TextField
                name="username"
                variant="outlined"
                required
                fullWidth
                id="username"
                label="Username"
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <TextField
                name="password"
                variant="outlined"
                required
                fullWidth
                id="password"
                label="Password"
              />
            </Grid>
          </Grid>
          <Button
            variant="contained"
            color="primary"
            className="button"
            type="submit"
          >
            LogIn
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Login;
