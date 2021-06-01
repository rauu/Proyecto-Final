import "./UserSettings.css";
import NavPrivate from "../nav-private/Nav-Private";
import React from "react";

import { Fade } from "react-reveal";

import {
  Typography,
  Button,
  Grid,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  FormHelperText,
  Snackbar,
  InputAdornment,
  Tooltip,
  AppBar,
  Tabs,
  Tab,
  Box,
} from "@material-ui/core";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";

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
import {
  userUpdateProfile,
  userUpdatePassword,
} from "../../service/UserSettings";
import DoneRoundedIcon from "@material-ui/icons/DoneRounded";
import CloseRoundedIcon from "@material-ui/icons/CloseRounded";
import { useHistory } from "react-router-dom";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const UserSettings = () => {
  let userData = JSON.parse(sessionStorage.getItem("user"));
  const history = useHistory();

  const [loggedIn, setLoggedIn] = React.useState(false);
  if (sessionStorage.getItem("user") === null) {
    history.push("/login");
    window.location.reload();
  }

  const [profileValue, setProfileValue] = React.useState({
    name: userData.name,
    surname: userData.surname,
    username: userData.username,
    email: userData.email,
    dob: userData.dob,
    gender: userData.sex,
  });
  const [passwordValue, setPasswordValue] = React.useState({
    password: "",
    confirmPassword: "",
  });

  /*  React.useEffect(() => {
          console.log(values.username);
          dataExists(values.username, values.email);
        }, [values.username, values.email]); */

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
  const [confirmPasswordValueError, setConfirmPasswordVlueError] =
    React.useState({
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

  const handleChangeProfile = (event) => {
    setProfileValue({
      ...profileValue,
      [event.target.name]: event.target.value,
    });
  };
  const handleChangePassword = (event) => {
    setPasswordValue({
      ...passwordValue,
      [event.target.name]: event.target.value,
    });
  };

  const updateProfile = (e) => {
    e.preventDefault();
    validationProfileFunciton();
  };
  const updatePassword = (e) => {
    e.preventDefault();
    validationPasswordFunciton();
  };

  function updateProfileService() {
    //console.log(values);
    userUpdateProfile(
      profileValue.name,
      profileValue.surname,
      profileValue.username,
      profileValue.email,
      profileValue.dob,
      profileValue.gender,
      userData.id_user
    ).then((res) => {
      if (res.data) {
        setUpdateProfileSnack(true);
      } else if (!res.data) {
        setCreateUserSnackError(true);
      }
    });
  }
  function updatePasswordService() {
    userUpdatePassword(passwordValue.password, userData.id_user).then((res) => {
      if (res.data) {
        setUpdatePasswordSnack(true);
      } else if (!res.data) {
        setCreateUserSnackError(true);
      }
    });
  }
  const [updateProfileSnack, setUpdateProfileSnack] = React.useState(false);
  const [updatePasswordSnack, setUpdatePasswordSnack] = React.useState(false);
  const [createUserSnackError, setCreateUserSnackError] = React.useState(false);
  const handleClose = () => {
    setUpdatePasswordSnack(false);
    setUpdateProfileSnack(false);
    setCreateUserSnackError(false);
  };
  const [userExists, setUserExists] = React.useState({
    userExists: false,
    userTooltip: "User alredy exists",
  });
  const [emailExists, setEmailExists] = React.useState({
    emailExists: false,
    emailTooltip: "Email alredy exists",
  });

  function validationProfileFunciton() {
    //name
    if (profileValue.name === "") {
      setNameValueError({
        error: true,
        errorMessage: "Invalid name",
      });
      nameBool = false;
    } else if (!lettersValidation(profileValue.name)) {
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
    if (profileValue.surname === "") {
      setSurnameValueError({
        ...surnameValueError,
        error: true,
        errorMessage: "Invalid surname",
      });
      surnameBool = false;
    } else if (!lettersValidation(profileValue.surname)) {
      setSurnameValueError({
        ...surnameValueError,
        error: true,
        errorMessage: "Surname can't contain numbers",
      });
      surnameBool = false;
    } else if (
      profileValue.surname !== "" &&
      lettersValidation(profileValue.surname)
    ) {
      setSurnameValueError({
        ...surnameValueError,
        error: false,
        errorMessage: "",
      });
      surnameBool = true;
    }

    //validation username
    if (profileValue.username === "") {
      setUsernameValueError({
        ...usernameValueError,
        error: true,
        errorMessage: "Invalid username",
      });
      usernameBool = false;
    } else if (!usernameValidation(profileValue.username)) {
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
    if (profileValue.email === "") {
      setEmailValueError({
        ...emailValueError,
        error: true,
        errorMessage: "Invalid email",
      });
      emailBool = false;
    } else if (!emailValidation(profileValue.email)) {
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
    if (profileValue.dob === "") {
      setDobValueError({
        ...dobValueError,
        error: true,
        errorMessage: "Select your date of birth",
      });
      dobBool = false;
    } else if (!isOverEighteen(profileValue.dob)) {
      setDobValueError({
        ...dobValueError,
        error: true,
        errorMessage: "You have to be over 18 to register in this application",
      });
      dobBool = false;
    } else if (!isPastDate100(profileValue.dob)) {
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
    if (profileValue.gender === "") {
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

    //Create user request
    if (
      nameBool &&
      surnameBool &&
      usernameBool &&
      emailBool &&
      dobBool &&
      genderBool
    ) {
      updateProfileService();
    } else {
      setCreateUserSnackError(true);
    }
  }

  function validationPasswordFunciton() {
    //validation password
    if (passwordValue.password === "") {
      setPasswordVlueError({
        ...passwordValueError,
        error: true,
        errorMessage: "You have to write your password",
      });
      passBool = false;
    } else if (!passwordValidation(passwordValue.password)) {
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
    if (passwordValue.confirmPassword === "") {
      setConfirmPasswordVlueError({
        ...confirmPasswordValueError,
        error: true,
        errorMessage: "You have to re-write your passowrd",
      });
      cPassBool = false;
    } else if (!passwordValidation(passwordValue.confirmPassword)) {
      setConfirmPasswordVlueError({
        ...confirmPasswordValueError,
        error: true,
        errorMessage:
          "Your password must  8 letters and it must contain at least 1 Capital letter and 1 special letter",
      });
      cPassBool = false;
    } else if (
      !passwordMatchValidation(
        passwordValue.password,
        passwordValue.confirmPassword
      )
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

    if (passBool && cPassBool) {
      updatePasswordService();
    } else {
      setCreateUserSnackError(true);
    }
  }

  /* const dataCheck = () => {
    dataExists(profileValue.username, profileValue.email);
  }; */

  return (
    <div className="register">
      <Typography component={"div"}>
        <NavPrivate></NavPrivate>
      </Typography>
      <div className="register-first">
        <Fade right>
          <br />
          <Typography variant="h2" className="white">
            USER SETTINGS
          </Typography>
          <br />
        </Fade>
      </div>
      <Fade left>
        <div className="settingsForm-first">
          <br />
          <form noValidate autoComplete="off" onSubmit={updateProfile}>
            <Grid
              container
              spacing={5}
              className="grid-center"
              alignItems="center"
              justify="center"
            >
              <Grid item xs={12} sm={12} md={12} lg={12}>
                <Typography variant="h5">Profile</Typography>
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <TextField
                  name="name"
                  variant="outlined"
                  required
                  fullWidth
                  defaultValue={userData.name}
                  id="firstName"
                  label="First Name"
                  autoFocus
                  onChange={handleChangeProfile}
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
                  defaultValue={userData.surname}
                  onChange={handleChangeProfile}
                  error={surnameValueError.error}
                  helperText={
                    surnameValueError.error
                      ? surnameValueError.errorMessage
                      : ""
                  }
                />
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12}>
                <TextField
                  name="username"
                  variant="outlined"
                  required
                  fullWidth
                  defaultValue={userData.username}
                  id="username"
                  label="UserName"
                  disabled
                  onChange={handleChangeProfile}
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
                  defaultValue={userData.email}
                  onChange={handleChangeProfile}
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
                  defaultValue={userData.dob}
                  fullWidth
                  variant="outlined"
                  InputLabelProps={{ shrink: true }}
                  onChange={handleChangeProfile}
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
                    defaultValue={userData.sex}
                    onChange={handleChangeProfile}
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
            </Grid>
            <br />
            <Button
              variant="contained"
              color="primary"
              className="button"
              type="submit"
            >
              Update Profile
            </Button>
          </form>
          <br />
        </div>
        <hr class="userSettingsHr" />
        <div className="settingsForm-second">
          <br />
          <form noValidate autoComplete="off" onSubmit={updatePassword}>
            <Grid
              container
              spacing={5}
              className="grid-center"
              alignItems="center"
              justify="center"
            >
              <Grid item xs={12} sm={12} md={12} lg={12}>
                <Typography variant="h5">Password</Typography>
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
                  onChange={handleChangePassword}
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
                  onChange={handleChangePassword}
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
              Update Password
            </Button>
            <br />
            <br />
            <br />
          </form>
        </div>
      </Fade>
      <Snackbar
        open={updateProfileSnack}
        autoHideDuration={3000}
        onClose={handleClose}
      >
        <Alert autoHideDuration={3000} onClose={handleClose} severity="success">
          User updated successfully
        </Alert>
      </Snackbar>
      <Snackbar
        open={updatePasswordSnack}
        autoHideDuration={3000}
        onClose={handleClose}
      >
        <Alert autoHideDuration={3000} onClose={handleClose} severity="success">
          Password updated successfully
        </Alert>
      </Snackbar>
      <Snackbar
        open={createUserSnackError}
        autoHideDuration={3000}
        onClose={handleClose}
      >
        <Alert autoHideDuration={3000} onClose={handleClose} severity="error">
          There has been an unexpected error.
        </Alert>
      </Snackbar>
    </div>
  );
};

export default UserSettings;
