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
  FormHelperText,
  Snackbar,
} from "@material-ui/core";

import MuiAlert from "@material-ui/lab/Alert";

import LinkA from "react-router-dom/Link";
import {
  lettersValidation,
  usernameValidation,
  isOverEighteen,
  isPastDate100,
  emailValidation,
  passwordValidation,
  passwordMatchValidation,
} from "../../utils/validation";
import { registerUser } from "../../service/User";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const Register = () => {
  const [values, setValues] = React.useState({
    name: "",
    surname: "",
    username: "",
    email: "",
    dob: "",
    gender: "",
    password: "",
    confirmPassword: "",
  });
  const [nameValueError, setNameValueError] = React.useState({
    error: false,
    errorMessage: "",
  });
  const [surnameValueError, setSurnameValueError] = React.useState({
    error: false,
    errorMessage: "",
  });
  const [usernameValueError, setUsernameValueError] = React.useState({
    error: false,
    errorMessage: "",
  });
  const [emailValueError, setEmailValueError] = React.useState({
    error: false,
    errorMessage: "",
  });
  const [dobValueError, setDobValueError] = React.useState({
    error: false,
    errorMessage: "",
  });
  const [genderValueError, setGenderValueError] = React.useState({
    error: false,
    errorMessage: "",
  });
  const [passwordValueError, setPasswordVlueError] = React.useState({
    error: false,
    errorMessage: "",
  });
  const [
    confirmPasswordValueError,
    setConfirmPasswordVlueError,
  ] = React.useState({
    error: false,
    errorMessage: "",
  });

  let nameBool = false;
  let surnameBool = false;
  let usernameBool = false;
  let emailBool = false;
  let dobBool = false;
  let genderBool = false;
  let passBool = false;
  let cPassBool = false;

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
    console.log(values);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(values);
    validationFunciton();
  };

  function createUser() {
    console.log("USER");
    //console.log(values);
    registerUser(
      values.name,
      values.surname,
      values.username,
      values.email,
      values.dob,
      values.gender,
      values.password
    ).then((res) => {
      console.log(res);
      if (res.data) {
        console.log(res.data);
        setCreateUserSnackSuccess(true);
      } else if (!res.data) {
        console.log(res.data);
        setCreateUserSnackError(true);
      }
    });
  }
  const [createUserSnackSuccess, setCreateUserSnackSuccess] = React.useState(
    false
  );
  const [createUserSnackError, setCreateUserSnackError] = React.useState(false);
  const handleClose = () => {
    setCreateUserSnackSuccess(false);
    setCreateUserSnackError(false);
  };

  function validationFunciton() {
    //name
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
        errorMessage: "Name can't contain numbers",
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

    //Validation surname
    if (values.surname === "") {
      setSurnameValueError({
        ...surnameValueError,
        error: true,
        errorMessage: "Invalid surname",
      });
      surnameBool = false;
    } else if (!lettersValidation(values.surname)) {
      setSurnameValueError({
        ...surnameValueError,
        error: true,
        errorMessage: "Surname can't contain numbers",
      });
      surnameBool = false;
    } else if (values.surname !== "" && lettersValidation(values.surname)) {
      setSurnameValueError({
        ...surnameValueError,
        error: false,
        errorMessage: "",
      });
      surnameBool = true;
    }

    //validation username
    if (values.username === "") {
      setUsernameValueError({
        ...usernameValueError,
        error: true,
        errorMessage: "Invalid username",
      });
      usernameBool = false;
    } else if (!usernameValidation(values.username)) {
      setUsernameValueError({
        ...usernameValueError,
        error: true,
        errorMessage:
          "Usernme can't contain space or @ and must contain between 3 and 15 letters",
      });
      usernameBool = false;
    } else {
      setUsernameValueError({
        ...usernameValueError,
        error: false,
        errorMessage: "",
      });
      usernameBool = true;
    }

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

    //validation DOB
    if (values.dob === "") {
      setDobValueError({
        ...dobValueError,
        error: true,
        errorMessage: "Select your date of birth",
      });
      dobBool = false;
    } else if (!isOverEighteen(values.dob)) {
      setDobValueError({
        ...dobValueError,
        error: true,
        errorMessage: "You have to be over 18 to register in this application",
      });
      dobBool = false;
    } else if (!isPastDate100(values.dob)) {
      setDobValueError({
        ...dobValueError,
        error: true,
        errorMessage: "You can't have over 100 years",
      });
      dobBool = false;
    } else {
      setDobValueError({
        ...dobValueError,
        error: false,
        errorMessage: "",
      });
      dobBool = true;
    }

    //validation Gender
    if (values.gender === "") {
      setGenderValueError({
        ...genderValueError,
        error: true,
        errorMessage: "You have to select a gender",
      });
      genderBool = false;
    } else {
      setGenderValueError({
        ...genderValueError,
        error: false,
        errorMessage: "",
      });
      genderBool = true;
    }

    //validation password
    if (values.password === "") {
      setPasswordVlueError({
        ...passwordValueError,
        error: true,
        errorMessage: "You have to write your password",
      });
      passBool = false;
    } else if (!passwordValidation(values.password)) {
      setPasswordVlueError({
        ...passwordValueError,
        error: true,
        errorMessage:
          "Your password must  8 letters and it must contain at least 1 Capital letter and 1 special letter",
      });
      passBool = false;
    } else {
      setPasswordVlueError({
        ...passwordValueError,
        error: false,
        errorMessage: "",
      });
      passBool = true;
    }

    //Confirm Password Validation
    if (values.confirmPassword === "") {
      setConfirmPasswordVlueError({
        ...confirmPasswordValueError,
        error: true,
        errorMessage: "You have to re-write your passowrd",
      });
      cPassBool = false;
    } else if (!passwordValidation(values.confirmPassword)) {
      setConfirmPasswordVlueError({
        ...confirmPasswordValueError,
        error: true,
        errorMessage:
          "Your password must  8 letters and it must contain at least 1 Capital letter and 1 special letter",
      });
      cPassBool = false;
    } else if (
      !passwordMatchValidation(values.password, values.confirmPassword)
    ) {
      setConfirmPasswordVlueError({
        ...confirmPasswordValueError,
        error: true,
        errorMessage: "Your password dosen't match",
      });
      cPassBool = false;
    } else {
      setConfirmPasswordVlueError({
        ...confirmPasswordValueError,
        error: false,
        errorMessage: "",
      });
      cPassBool = true;
    }

    //Create user request
    if (
      nameBool &&
      surnameBool &&
      usernameBool &&
      emailBool &&
      dobBool &&
      genderBool &&
      passBool &&
      cPassBool
    ) {
      createUser();
    } else {
      setCreateUserSnackError(true);
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
                  surnameValueError.error ? surnameValueError.errorMessage : ""
                }
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
                onChange={handleChange}
                error={usernameValueError.error}
                helperText={
                  usernameValueError.error
                    ? usernameValueError.errorMessage
                    : ""
                }
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
                onChange={handleChange}
                error={emailValueError.error}
                helperText={
                  emailValueError.error ? emailValueError.errorMessage : ""
                }
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6}>
              <TextField
                name="dob"
                id="date"
                label="Date of Birth"
                type="date"
                required
                fullWidth
                variant="outlined"
                InputLabelProps={{ shrink: true }}
                onChange={handleChange}
                error={dobValueError.error}
                helperText={
                  dobValueError.error ? dobValueError.errorMessage : ""
                }
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6}>
              <FormControl variant="outlined" fullWidth required>
                <InputLabel id="gender">Gender</InputLabel>
                <Select
                  name="gender"
                  labelId="gender"
                  id="gender"
                  value={values.gender}
                  onChange={handleChange}
                  label="Gender"
                  error={genderValueError.error}
                >
                  <MenuItem value={"men"}>Men</MenuItem>
                  <MenuItem value={"women"}>Women</MenuItem>
                  <MenuItem value={"other"}>Other</MenuItem>
                </Select>
                {genderValueError.error && (
                  <FormHelperText
                    id="standard-weight-helper-text"
                    error={genderValueError.error}
                  >
                    {confirmPasswordValueError.error
                      ? genderValueError.errorMessage
                      : ""}
                  </FormHelperText>
                )}
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <TextField
                name="password"
                id="password"
                label="Password"
                type="password"
                variant="outlined"
                fullWidth
                required
                onChange={handleChange}
                error={passwordValueError.error}
                helperText={
                  passwordValueError.error
                    ? passwordValueError.errorMessage
                    : ""
                }
              />
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <TextField
                name="confirmPassword"
                id="confirm-password"
                label="Confirm Password"
                type="password"
                variant="outlined"
                fullWidth
                required
                onChange={handleChange}
                error={confirmPasswordValueError.error}
                helperText={
                  confirmPasswordValueError.error
                    ? confirmPasswordValueError.errorMessage
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
            Register
          </Button>
          <br />
          <br />
          <br />
        </form>
      </div>{" "}
      <Snackbar
        open={createUserSnackSuccess}
        autoHideDuration={3000}
        onClose={handleClose}
      >
        <Alert autoHideDuration={3000} onClose={handleClose} severity="success">
          User registered successfully
        </Alert>
      </Snackbar>
      <Snackbar
        open={createUserSnackError}
        autoHideDuration={3000}
        onClose={handleClose}
      >
        <Alert autoHideDuration={3000} onClose={handleClose} severity="error">
          User registration failed
        </Alert>
      </Snackbar>
      <Footer></Footer>
    </div>
  );
};

export default Register;
