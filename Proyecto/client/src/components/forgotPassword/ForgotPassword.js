import React from "react";

import { Fade } from "react-reveal";

import "./ForgotPassword.css";
import logo from "../../assets/logo.png";

import {
  Typography,
  Button,
  Grid,
  TextField,
  Snackbar,
} from "@material-ui/core";

import MuiAlert from "@material-ui/lab/Alert";

import LinkA from "react-router-dom/Link";
import { emailValidation } from "../../utils/validation";

import { changePassword } from "../../service/ForgotPassword";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const ForgotPassword = () => {
  const [values, setValues] = React.useState({
    email: "",
  });

  const [emailValueError, setEmailValueError] = React.useState({
    error: false,
    errorMessage: "",
  });

  let emailBool = false;

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    validationFunciton();
  };

  function changeUserPassword() {
    changePassword(values.email).then((res) => {
      if(res.data === "email doesn't exist"){
        setSnackbarExists(true);
        setEmailValueError({
          error: true,
          errorMessage: "Email dosen't exists",
        })
      } else if(res.data === "check your email"){
        setEmailValueError({
          error: false,
          errorMessage: "",
        })
        setSnackbarSuccess(true)
      }
    });
  }
  const [SnackbarSuccess, setSnackbarSuccess] = React.useState(false);
  const [SnackbarError, setSnackbarError] = React.useState(false);
  const [SnackbarExists, setSnackbarExists] = React.useState(false);
  const handleClose = () => {
    setSnackbarSuccess(false);
    setSnackbarError(false);
    setSnackbarExists(false);
  };

  function validationFunciton() {
    //Validation email
    if (values.email === "") {
      setEmailValueError({
        ...emailValueError,
        error: true,
        errorMessage: "Invalid email",
      });
      emailBool = false;
    } else if (!emailValidation(values.email)) {
      setEmailValueError({
        ...emailValueError,
        error: true,
        errorMessage: "Email validation error",
      });
      emailBool = false;
    } else {
      setEmailValueError({
        ...emailValueError,
        error: false,
        errorMessage: "",
      });
      emailBool = true;
    }
    //Create changePassword request
    if (emailBool) {
      changeUserPassword();
    } else {
      setSnackbarError(true);
    }
  }

  return (
    <div className="register">
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
                <LinkA to="/login" className="nav-link links" color="secondary">
                  Sign In
                </LinkA>
              </li>
            </ul>
          </div>
        </nav>
      </Typography>
      <div className="register-first">
        <Fade right>
          <br />
          <Typography variant="h2" className="white">
            FORGOT YOUR PASSWORD?
          </Typography>
          <Typography variant="h5" className="white">
            Write your email in the textbox below and we will send you your new password in your email.
          </Typography>
          <br />
        </Fade>
      </div>
      <Fade left>
        <div className="registerForm">
          <br />
          <br />
          <br />
          <form noValidate autoComplete="off" onSubmit={handleSubmit}>
            <Grid
              container
              spacing={5}
              className="grid-center"
              alignItems="center"
              justify="center"
            >
              <Grid item xs={12} sm={12} md={12} lg={12}>
                <TextField
                  name="email"
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  label="Email"
                  onChange={handleChange}
                  error={emailValueError.error}
                  helperText={
                    emailValueError.error ? emailValueError.errorMessage : ""
                  }
                />
              </Grid>
            </Grid>
            <br />
            <Button
              variant="contained"
              color="primary"
              className="button"
              type="submit"
            >
              Change Password
            </Button>
            <br />
            <br />
            <br />
          </form>
        </div>
      </Fade>
      <Snackbar
        open={SnackbarSuccess}
        autoHideDuration={3000}
        onClose={handleClose}
      >
        <Alert autoHideDuration={3000} onClose={handleClose} severity="success">
          Your new Password has been sent to your email account.
        </Alert>
      </Snackbar>
      <Snackbar
        open={SnackbarError}
        autoHideDuration={3000}
        onClose={handleClose}
      >
        <Alert autoHideDuration={3000} onClose={handleClose} severity="error">
          Change Password Failed
        </Alert>
      </Snackbar>
      <Snackbar
        open={SnackbarExists}
        autoHideDuration={3000}
        onClose={handleClose}
      >
        <Alert autoHideDuration={3000} onClose={handleClose} severity="error">
          Email dosen't exist
        </Alert>
      </Snackbar>
    </div>
  );
};

export default ForgotPassword;
