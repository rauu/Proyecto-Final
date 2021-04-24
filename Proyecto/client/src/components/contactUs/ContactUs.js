import React from "react";

import { Fade } from "react-reveal";

import "./ContactUs.css";
import Nav from "../nav-public/Nav-Public";
import {
  Typography,
  Button,
  Grid,
  TextField,
  Snackbar,
} from "@material-ui/core";

import MuiAlert from "@material-ui/lab/Alert";

import LinkA from "react-router-dom/Link";
import { lettersValidation, emailValidation } from "../../utils/validation";
import {Contact} from "../../service/ContactUs";

const ContactUs = () => {
  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }
  const [createUserSnackSuccess, setCreateUserSnackSuccess] = React.useState(
    false
  );
  const [createUserSnackError, setCreateUserSnackError] = React.useState(false);
  const handleClose = () => {
    setCreateUserSnackSuccess(false);
    setCreateUserSnackError(false);
  };

  const [values, setValues] = React.useState({
    name: "",
    surname: "",
    email: "",
    number: "",
    message: "",
  });

  const [nameValueError, setNameValueError] = React.useState({
    error: false,
    errorMessage: "",
  });
  const [surnameValueError, setSurnameValueError] = React.useState({
    error: false,
    errorMessage: "",
  });
  const [emailValueError, setEmailValueError] = React.useState({
    error: false,
    errorMessage: "",
  });
  const [numberValueError, setNumberValueError] = React.useState({
    error: false,
    errorMessage: "",
  });
  const [messageValueError, setMessageValueError] = React.useState({
    error: false,
    errorMessage: "",
  });

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
    console.log(values);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    validationForm();
  };

  let nameBool = false;
  let surnameBool = false;
  let emailBool = false;
  let numberBool = false;
  let messageBool = false;

  function validationForm() {
    console.log("validation");

    if (values.name === "") {
      setNameValueError({
        error: true,
        errorMessage: "Invalid name",
      });
      nameBool = false;
    } else if (!lettersValidation(values.name)) {
      setNameValueError({
        ...nameValueError,
        error: true,
        errorMessage: "Name can't contain numbers or unnecessary spaces",
      });
      nameBool = false;
    } else {
      setNameValueError({
        ...nameValueError,
        error: false,
        errorMessage: "",
      });
      nameBool = true;
    }

    if (values.surname === "") {
      setSurnameValueError({
        error: true,
        errorMessage: "Invalid surname",
      });
      surnameBool = false;
    } else if (!lettersValidation(values.surname)) {
      setSurnameValueError({
        ...surnameValueError,
        error: true,
        errorMessage: "Last Name can't contain numbers or unnecessary spaces",
      });
      surnameBool = false;
    } else {
      setSurnameValueError({
        ...surnameValueError,
        error: false,
        errorMessage: "",
      });
      surnameBool = true;
    }

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

    if (values.message === "") {
      setMessageValueError({
        ...messageValueError,
        error: true,
        errorMessage: "You have to write a message",
      });
      messageBool = false;
    } else {
      setMessageValueError({
        ...messageValueError,
        error: false,
        errorMessage: "",
      });
      messageBool = true;
    }

    if (values.number === "") {
      setNumberValueError({
        ...numberValueError,
        error: true,
        errorMessage: "You have to write a number",
      });
      numberBool = false;
    } else {
      setNumberValueError({
        ...numberValueError,
        error: false,
        errorMessage: "",
      });
      numberBool = true;
    }

    if (nameBool && surnameBool && emailBool && numberBool && messageBool) {
      contactUS();
    } else {
      setCreateUserSnackError(true);
    }
  }

  function contactUS() {
    Contact(
      values.name,
      values.surname,
      values.email,
      values.message,
      values.number
    ).then((res) => {
      if (res.data) {
        console.log(res.data);
        setCreateUserSnackSuccess(true);
      } else if (!res.data) {
        setCreateUserSnackError(true);
      }
    });
  }
  return (
    <div className="contactUs">
      <Typography component={"div"}>
        <Nav className="nav"></Nav>
      </Typography>
      <div className="contact-first">
        <Fade right>
          <br />
          <Typography variant="h2" className="white">
            Write this form to contact with us
          </Typography>

          <br />
        </Fade>
      </div>
      <Fade left>
        <div className="workForm">
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
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <TextField
                  name="name"
                  variant="outlined"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  onChange={handleChange}
                  error={nameValueError.error}
                  helperText={
                    nameValueError.error ? nameValueError.errorMessage : ""
                  }
                />
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <TextField
                  name="surname"
                  variant="outlined"
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  onChange={handleChange}
                  error={surnameValueError.error}
                  helperText={
                    surnameValueError.error
                      ? surnameValueError.errorMessage
                      : ""
                  }
                />
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <TextField
                  name="email"
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  label="Your Email"
                  onChange={handleChange}
                  error={emailValueError.error}
                  helperText={
                    emailValueError.error ? emailValueError.errorMessage : ""
                  }
                />
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <TextField
                  name="number"
                  variant="outlined"
                  required
                  fullWidth
                  id="number"
                  label="Your Number with prefix"
                  onChange={handleChange}
                  error={numberValueError.error}
                  helperText={
                    numberValueError.error ? numberValueError.errorMessage : ""
                  }
                />
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12}>
                <TextField
                  variant="outlined"
                  name="message"
                  multiline
                  required
                  rows="5"
                  fullWidth
                  label="Your Message"
                  onChange={handleChange}
                  error={messageValueError.error}
                  helperText={
                    messageValueError.error
                      ? messageValueError.errorMessage
                      : ""
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
              Contact Us
            </Button>
          </form>
          <br />
          <br />
          <br />
        </div>
      </Fade>
      <Snackbar
        open={createUserSnackSuccess}
        autoHideDuration={3000}
        onClose={handleClose}
      >
        <Alert autoHideDuration={3000} onClose={handleClose} severity="success">
          Our team will contact you shortly
        </Alert>
      </Snackbar>
      <Snackbar
        open={createUserSnackError}
        autoHideDuration={3000}
        onClose={handleClose}
      >
        <Alert autoHideDuration={3000} onClose={handleClose} severity="error">
          There was an unexpected error
        </Alert>
      </Snackbar>
    </div>
  );
};

export default ContactUs;
