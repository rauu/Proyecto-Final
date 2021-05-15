import React from "react";
import NavPrivate from "../nav-private/Nav-Private";
import PropTypes from "prop-types";
import "./Admin.css";
import { Fade } from "react-reveal";

import {
  makeStyles,
  AppBar,
  Tabs,
  Tab,
  Typography,
  Box,
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
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide,
} from "@material-ui/core/";
import MuiAlert from "@material-ui/lab/Alert";

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
  registerUser,
  dataExists,
  CreateExerciseRoom,
  DeleteExerciseRoom,
  GetExersiceRooms,
  GetAllUsers,
} from "../../service/Admin";
import DoneRoundedIcon from "@material-ui/icons/DoneRounded";
import CloseRoundedIcon from "@material-ui/icons/CloseRounded";
import DeleteRoundedIcon from "@material-ui/icons/DeleteRounded";

import { useHistory } from "react-router-dom";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`wrapped-tabpanel-${index}`}
      aria-labelledby={`wrapped-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}
TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};
function a11yProps(index) {
  return {
    id: `wrapped-tab-${index}`,
    "aria-controls": `wrapped-tabpanel-${index}`,
  };
}
const useTabStyles = makeStyles({
  root: {
    justifyContent: "center",
    fontSize: "20px",
  },
  scroller: {
    flexGrow: "0",
  },
  label: {
    fontSize: "22px",
  },
});

const Admin = () => {
  const classes = useTabStyles();

  const [value, setValue] = React.useState("one");
  const [value2, setValue2] = React.useState("two");
  const [value3, setValue3] = React.useState("three");
  const [value4, setValue4] = React.useState("four");

  const [alertOpen, setAlertOpen] = React.useState(false);
  const [deleteAlertOpen, setDeleteAlertOpen] = React.useState(false);

  const [roomsList, setRoomslist] = React.useState([]);
  const [allUsers, setAllUsers] = React.useState([]);

  const handleAlertOpen = () => {
    setAlertOpen(true);
  };
  const handleAlertClose = () => {
    setAlertOpen(false);
  };

  const handleDeleteAlertOpen = () => {
    setDeleteAlertOpen(true);
  };
  const handleDeleteAlertClose = () => {
    setDeleteAlertOpen(false);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleSearchUser = () => {
    console.log(searchValue);
  };
  const [userRegisterValue, setUserRegisterValue] = React.useState({
    name: "",
    surname: "",
    username: "",
    email: "",
    dob: "",
    typeUser: "",
    gender: "",
    password: "",
    confirmPassword: "",
  });
  const [deleteRoomValue, setDeleteRoomValue] = React.useState({
    room: "",
  });

  const [addExerciseRoom, setAddExerciseRoom] = React.useState({
    room_name: "",
    profile_image: "",
  });

  const [searchValue, setSearchValue] = React.useState({
    userSearch: "",
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
  const [typeUserValueError, setTypeUserValueError] = React.useState({
    error: false,
    errorMessage: "",
  });
  const [passwordValueError, setPasswordVlueError] = React.useState({
    error: false,
    errorMessage: "",
  });
  const [exersiceRoomValueError, setExersiceRoomValueError] = React.useState({
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
  let typeUserBool = false;
  let roomNameBool = false;
  let roomProfileBool = false;

  const handleChangeUser = (event) => {
    setUserRegisterValue({
      ...userRegisterValue,
      [event.target.name]: event.target.value,
    });
    console.log(userRegisterValue);
  };
  const handleChangeRoom = (event) => {
    if (event.target.name === "room_name") {
      setAddExerciseRoom({
        ...addExerciseRoom,
        [event.target.name]: event.target.value.toUpperCase(),
      });
    } else {
      setAddExerciseRoom({
        ...addExerciseRoom,
        [event.target.name]: event.target.value,
      });
    }

    console.log(addExerciseRoom);
  };

  const handleChangeDeleteRoom = (event) => {
    setDeleteRoomValue({
      ...deleteRoomValue,
      [event.target.name]: event.target.value,
    });
    console.log(deleteRoomValue);
  };

  const handleSubmitUser = (e) => {
    e.preventDefault();
    console.log(userRegisterValue);
    RegisterUserValidation();
  };
  const handleSubmitRoom = (e) => {
    e.preventDefault();
    console.log(addExerciseRoom);
    CreateRoomValidation();
  };
  const handleSubmitDeleteRoom = (e) => {
    e.preventDefault();
    console.log(deleteRoomValue);
    deleteRoomValidations();
  };

  function createUser() {
    console.log("USER");
    //console.log(values);
    registerUser(
      userRegisterValue.name,
      userRegisterValue.surname,
      userRegisterValue.username,
      userRegisterValue.email,
      userRegisterValue.dob,
      userRegisterValue.gender,
      userRegisterValue.password,
      userRegisterValue.typeUser
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
  const [userExists, setUserExists] = React.useState({
    userExists: false,
    userTooltip: "User alredy exists",
  });
  const [emailExists, setEmailExists] = React.useState({
    emailExists: false,
    emailTooltip: "Email alredy exists",
  });

  const [createUserSnackSuccess, setCreateUserSnackSuccess] = React.useState(
    false
  );
  const [createUserSnackError, setCreateUserSnackError] = React.useState(false);
  const [createRoomSnackSuccess, setCreateRoomSnackSuccess] = React.useState(
    false
  );
  const [
    createDeleteRoomSnackSuccess,
    setCreateDeleteRoomSnackSuccess,
  ] = React.useState(false);
  const [createRoomSnackError, setCreateRoomSnackError] = React.useState(false);

  const handleClose = () => {
    setCreateUserSnackSuccess(false);
    setCreateUserSnackError(false);
    setCreateRoomSnackSuccess(false);
    setCreateRoomSnackError(false);
    setCreateDeleteRoomSnackSuccess(false);
  };
  function RegisterUserValidation() {
    //name
    if (userRegisterValue.name === "") {
      setNameValueError({
        error: true,
        errorMessage: "Invalid name",
      });
      nameBool = false;
    } else if (!lettersValidation(userRegisterValue.name)) {
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
    if (userRegisterValue.surname === "") {
      setSurnameValueError({
        ...surnameValueError,
        error: true,
        errorMessage: "Invalid surname",
      });
      surnameBool = false;
    } else if (!lettersValidation(userRegisterValue.surname)) {
      setSurnameValueError({
        ...surnameValueError,
        error: true,
        errorMessage: "Surname can't contain numbers",
      });
      surnameBool = false;
    } else if (
      userRegisterValue.surname !== "" &&
      lettersValidation(userRegisterValue.surname)
    ) {
      setSurnameValueError({
        ...surnameValueError,
        error: false,
        errorMessage: "",
      });
      surnameBool = true;
    }

    //validation username
    if (userRegisterValue.username === "") {
      setUsernameValueError({
        ...usernameValueError,
        error: true,
        errorMessage: "Invalid username",
      });
      usernameBool = false;
    } else if (!usernameValidation(userRegisterValue.username)) {
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
    if (userRegisterValue.email === "") {
      setEmailValueError({
        ...emailValueError,
        error: true,
        errorMessage: "Invalid email",
      });
      emailBool = false;
    } else if (!emailValidation(userRegisterValue.email)) {
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
    if (userRegisterValue.dob === "") {
      setDobValueError({
        ...dobValueError,
        error: true,
        errorMessage: "Select your date of birth",
      });
      dobBool = false;
    } else if (!isOverEighteen(userRegisterValue.dob)) {
      setDobValueError({
        ...dobValueError,
        error: true,
        errorMessage: "You have to be over 18 to register in this application",
      });
      dobBool = false;
    } else if (!isPastDate100(userRegisterValue.dob)) {
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
    if (userRegisterValue.gender === "") {
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

    //validation TypeUser
    if (userRegisterValue.typeUser === "") {
      setTypeUserValueError({
        ...typeUserValueError,
        error: true,
        errorMessage: "You have to select the type of the user",
      });
      typeUserBool = false;
    } else {
      setTypeUserValueError({
        ...typeUserValueError,
        error: false,
        errorMessage: "",
      });
      typeUserBool = true;
    }

    //validation password
    if (userRegisterValue.password === "") {
      setPasswordVlueError({
        ...passwordValueError,
        error: true,
        errorMessage: "You have to write your password",
      });
      passBool = false;
    } else if (!passwordValidation(userRegisterValue.password)) {
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
    if (userRegisterValue.confirmPassword === "") {
      setConfirmPasswordVlueError({
        ...confirmPasswordValueError,
        error: true,
        errorMessage: "You have to re-write your passowrd",
      });
      cPassBool = false;
    } else if (!passwordValidation(userRegisterValue.confirmPassword)) {
      setConfirmPasswordVlueError({
        ...confirmPasswordValueError,
        error: true,
        errorMessage:
          "Your password must  8 letters and it must contain at least 1 Capital letter and 1 special letter",
      });
      cPassBool = false;
    } else if (
      !passwordMatchValidation(
        userRegisterValue.password,
        userRegisterValue.confirmPassword
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

    //Create user request
    if (
      nameBool &&
      surnameBool &&
      usernameBool &&
      emailBool &&
      dobBool &&
      genderBool &&
      passBool &&
      cPassBool &&
      typeUserBool
    ) {
      createUser();
    } else {
      setCreateUserSnackError(true);
    }
  }

  function CreateRoomValidation() {
    if (addExerciseRoom.room_name === "") {
      setExersiceRoomValueError({
        error: true,
        errorMessage: "You have to write name of the room",
      });
      roomNameBool = false;
    } else {
      setExersiceRoomValueError({
        error: false,
        errorMessage: "",
      });
      roomNameBool = true;
    }

    if (addExerciseRoom.profile_image === "") {
      setAlertOpen(true);
      roomProfileBool = false;
    } else {
      roomProfileBool = true;
    }

    if (roomProfileBool && roomProfileBool) {
      createExerciseRoomService();
    }
  }

  function deleteRoomValidations() {
    if (deleteRoomValue.room === "") {
      setDeleteAlertOpen(true);
    } else {
      DeleteRoomService();
    }
  }

  function DeleteRoomService() {
    DeleteExerciseRoom(deleteRoomValue.room).then((res) => {
      if (res.data === true) {
        setCreateDeleteRoomSnackSuccess(true);
        console.log("DELETE");
      }
    });
  }
  function createExerciseRoomService() {
    CreateExerciseRoom(
      addExerciseRoom.room_name,
      addExerciseRoom.profile_image
    ).then((res) => {
      console.log(res);
      if (res.data === "Room already exists") {
        setCreateRoomSnackError(true);
      } else if (res.data === true) {
        setCreateRoomSnackSuccess(true);
      }
    });
  }

  const dataCheck = () => {
    dataExists(userRegisterValue.username, userRegisterValue.email);
  };

  const fileBase64 = (event) => {
    let selectedFile = event.target.files;
    let file = null;
    //let fileName = "";
    //Check File is not Empty
    if (selectedFile.length > 0) {
      // Select the very first file from list
      let fileToLoad = selectedFile[0];
      //fileName = fileToLoad.name;
      // FileReader function for read the file.
      let fileReader = new FileReader();
      // Onload of file read the file content
      fileReader.onload = function (fileLoadedEvent) {
        file = fileLoadedEvent.target.result;
        // Print data in console
        console.log("file");

        setAddExerciseRoom({
          ...addExerciseRoom,
          profile_image: file,
        });
        console.log(addExerciseRoom);
      };

      // Convert data to base64
      fileReader.readAsDataURL(fileToLoad);
    }
  };

  React.useEffect(() => {
    console.log(roomsList);
    getRooms();
  }, [createRoomSnackSuccess, createDeleteRoomSnackSuccess]);
  
  React.useEffect(() => {
    console.log(allUsers);
    getUsers();
  }, []);

  function getRooms() {
    GetExersiceRooms().then((res) => {
      setRoomslist(res);
      console.log(roomsList);
      console.log(res);
    });
  }

  function getUsers() {
    GetAllUsers().then((res) => {
      setAllUsers(res.data);
      console.log(allUsers);
    });
    console.log(allUsers);
  }

  return (
    <>
      <NavPrivate></NavPrivate>
      <div className="">
        <AppBar position="static" className="tabs">
          <Tabs
            classes={{ root: classes.root, scroller: classes.scroller }}
            value={value}
            onChange={handleChange}
            variant="scrollable"
            scrollButtons={"on"}
          >
            <Tab
              value="one"
              label="Register Users"
              {...a11yProps("one")}
              classes={{ root: classes.label }}
            />
            <Tab
              value="two"
              label="All users"
              {...a11yProps("two")}
              classes={{ root: classes.label }}
            />
            <Tab
              value="three"
              label="Add/Delete ExerciseRoom"
              {...a11yProps("three")}
              classes={{ root: classes.label }}
            />
            <Tab
              value="four"
              label="CV applications"
              {...a11yProps("four")}
              classes={{ root: classes.label }}
            />
          </Tabs>
        </AppBar>
        <TabPanel value={value} index="one">
          <div className="register">
            <Fade left>
              <div className="registerForm">
                <br />
                <form noValidate autoComplete="off" onSubmit={handleSubmitUser}>
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
                        onChange={handleChangeUser}
                        error={nameValueError.error}
                        helperText={
                          nameValueError.error
                            ? nameValueError.errorMessage
                            : ""
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
                        onChange={handleChangeUser}
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
                        id="username"
                        label="UserName"
                        onBlur={dataCheck}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="end">
                              <Tooltip title="User">
                                <DoneRoundedIcon edge="end"> </DoneRoundedIcon>
                              </Tooltip>
                            </InputAdornment>
                          ),
                        }}
                        onChange={handleChangeUser}
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
                        onBlur={dataCheck}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="end">
                              <Tooltip title="User">
                                <DoneRoundedIcon edge="end"> </DoneRoundedIcon>
                              </Tooltip>
                            </InputAdornment>
                          ),
                        }}
                        onChange={handleChangeUser}
                        error={emailValueError.error}
                        helperText={
                          emailValueError.error
                            ? emailValueError.errorMessage
                            : ""
                        }
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={4}>
                      <TextField
                        name="dob"
                        id="date"
                        label="Date of Birth"
                        type="date"
                        required
                        fullWidth
                        variant="outlined"
                        InputLabelProps={{ shrink: true }}
                        onChange={handleChangeUser}
                        error={dobValueError.error}
                        helperText={
                          dobValueError.error ? dobValueError.errorMessage : ""
                        }
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={4}>
                      <FormControl variant="outlined" fullWidth required>
                        <InputLabel id="gender">Gender</InputLabel>
                        <Select
                          name="gender"
                          labelId="gender"
                          id="gender"
                          value={userRegisterValue.gender}
                          onChange={handleChangeUser}
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
                    <Grid item xs={12} sm={12} md={12} lg={4}>
                      <FormControl variant="outlined" fullWidth required>
                        <InputLabel id="typeUser">User Type</InputLabel>
                        <Select
                          name="typeUser"
                          labelId="typeUser"
                          id="typeUser"
                          value={userRegisterValue.typeUser}
                          onChange={handleChangeUser}
                          label="User Type"
                          error={typeUserValueError.error}
                        >
                          <MenuItem value={"role_user"}>User</MenuItem>
                          <MenuItem value={"role_trainer"}>Trainer</MenuItem>
                          <MenuItem value={"role_admin"}>Admin</MenuItem>
                        </Select>
                        {typeUserValueError.error && (
                          <FormHelperText
                            id="standard-weight-helper-text"
                            error={typeUserValueError.error}
                          >
                            {typeUserValueError.error
                              ? typeUserValueError.errorMessage
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
                        onChange={handleChangeUser}
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
                        onChange={handleChangeUser}
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
              </div>
            </Fade>
            <Snackbar
              class="snackbar"
              open={createUserSnackSuccess}
              autoHideDuration={3000}
              onClose={handleClose}
            >
              <Alert
                autoHideDuration={3000}
                onClose={handleClose}
                severity="success"
              >
                User registered successfully
              </Alert>
            </Snackbar>
            <Snackbar
              class="snackbar"
              open={createUserSnackError}
              autoHideDuration={3000}
              onClose={handleClose}
            >
              <Alert
                autoHideDuration={3000}
                onClose={handleClose}
                severity="error"
              >
                User registration failed
              </Alert>
            </Snackbar>
          </div>
        </TabPanel>
        <TabPanel value={value} index="two">
          <div className="searchIcon">
            <TextField
              name="userSearch"
              variant="outlined"
              required
              fullWidth
              id="userSearch"
              label="Search Users"
              onChange={handleSearchUser}
            />
          </div>
          <br />
          {allUsers !== undefined && (
            <>
              {allUsers.map((val) => {
                return (
                  <div className="listUser" key={val.id_user}>
                    <Grid
                      container
                      spacing={5}
                      className="grid-center"
                      alignItems="center"
                      justify="center"
                    >
                      <Grid item xs={6} sm={6} md={3} lg={3}>
                        {val.username}
                      </Grid>
                      <Grid item xs={6} sm={6} md={3} lg={3}>
                        <FormControl variant="outlined" fullWidth required>
                          <InputLabel id="typeUser">User Type</InputLabel>
                          <Select
                            name="typeUser"
                            labelId="typeUser"
                            id="typeUser"
                            value={val.role_user}
                            onChange={handleChangeUser}
                            label="User Type"
                            error={typeUserValueError.error}
                          >
                            <MenuItem value={"role_user"}>User</MenuItem>
                            <MenuItem value={"role_trainer"}>Trainer</MenuItem>
                            <MenuItem value={"role_admin"}>Admin</MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid item xs={6} sm={6} md={3} lg={3}>
                        <DeleteRoundedIcon
                          fontSize="large"
                          color="primary"
                        ></DeleteRoundedIcon>
                      </Grid>
                      <Grid item xs={6} sm={6} md={3} lg={3}>
                        <Button
                          variant="contained"
                          color="primary"
                          className="button"
                          type="submit"
                        >
                          Save Changes
                        </Button>
                      </Grid>
                    </Grid>
                  </div>
                );
              })}
            </>
          )}
        </TabPanel>
        <TabPanel value={value} index="three">
          <div className="addRemoveRoom">
            <Fade up>
              <Grid item xs={12} sm={12} md={12} lg={12}>
                <Grid
                  container
                  spacing={5}
                  className="grid-center"
                  alignItems="center"
                  justify="center"
                >
                  <Grid item xs={12} sm={12} md={12} lg={12}>
                    <Typography variant="h3">Add Exercise Rooms</Typography>
                  </Grid>
                  <Grid item xs={12} sm={12} md={12} lg={12}>
                    <form
                      className="roomForm"
                      noValidate
                      autoComplete="off"
                      onSubmit={handleSubmitRoom}
                    >
                      <Grid item xs={12} sm={12} md={12} lg={12}>
                        <TextField
                          name="room_name"
                          variant="outlined"
                          required
                          fullWidth
                          id="newExerciseRoom"
                          label="New Exercise Room"
                          onChange={handleChangeRoom}
                          error={exersiceRoomValueError.error}
                          helperText={
                            exersiceRoomValueError.error
                              ? exersiceRoomValueError.errorMessage
                              : ""
                          }
                        />
                      </Grid>
                      <br />
                      <Grid item xs={12} sm={12} md={12} lg={12}>
                        <input
                          accept="image/*"
                          name="profile_image"
                          className="upload"
                          id="contained-button-file"
                          multiple
                          type="file"
                          required
                          onChange={fileBase64}
                        />
                        <label htmlFor="contained-button-file">
                          <Button
                            variant="contained"
                            color="primary"
                            component="span"
                            style={{ fontSize: 25 }}
                          >
                            Select your Room Profile Image
                          </Button>
                        </label>
                      </Grid>
                      <br />
                      <Button
                        variant="contained"
                        color="primary"
                        className="button"
                        type="submit"
                      >
                        Add Room
                      </Button>
                    </form>
                  </Grid>
                </Grid>
              </Grid>
              <Snackbar
                class="snackbar"
                open={createRoomSnackSuccess}
                autoHideDuration={3000}
                onClose={handleClose}
              >
                <Alert
                  autoHideDuration={3000}
                  onClose={handleClose}
                  severity="success"
                >
                  Room Created successfully
                </Alert>
              </Snackbar>
              <Snackbar
                class="snackbar"
                open={createRoomSnackError}
                autoHideDuration={3000}
                onClose={handleClose}
              >
                <Alert
                  autoHideDuration={3000}
                  onClose={handleClose}
                  severity="error"
                >
                  Room Already exists
                </Alert>
              </Snackbar>
              <br />
              <hr />
              <br />
              <Grid item xs={12} sm={12} md={12} lg={12}>
                <Grid
                  container
                  spacing={5}
                  className="grid-center"
                  alignItems="center"
                  justify="center"
                >
                  <Grid item xs={12} sm={12} md={12} lg={12}>
                    <Typography variant="h3">Delete Exercise Rooms</Typography>
                  </Grid>
                  <form
                    className="RoomDelete"
                    noValidate
                    onSubmit={handleSubmitDeleteRoom}
                    autoComplete="off"
                  >
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                      <FormControl variant="outlined" className="room-options">
                        <InputLabel htmlFor="outlined-age-native-simple">
                          Select Room *
                        </InputLabel>
                        <Select
                          native
                          name="room"
                          value={deleteRoomValue.room}
                          onChange={handleChangeDeleteRoom}
                          label="Select Room *"
                        >
                          <option value=""></option>

                          {roomsList !== undefined && (
                            <>
                              {roomsList.map((val) => {
                                return (
                                  <option key={val.id} value={val.id}>
                                    {val.room_name}
                                  </option>
                                );
                              })}
                            </>
                          )}
                        </Select>
                      </FormControl>
                    </Grid>
                    <br />
                    <Button
                      variant="contained"
                      color="primary"
                      className="button"
                      type="submit"
                    >
                      Delete Room
                    </Button>
                  </form>
                </Grid>
                <Snackbar
                  class="snackbar"
                  open={createDeleteRoomSnackSuccess}
                  autoHideDuration={3000}
                  onClose={handleClose}
                >
                  <Alert
                    autoHideDuration={3000}
                    onClose={handleClose}
                    severity="success"
                  >
                    Room Deleted Succesfully
                  </Alert>
                </Snackbar>
              </Grid>
              <br />
            </Fade>
            <Dialog
              open={deleteAlertOpen}
              TransitionComponent={Transition}
              keepMounted
              onClose={handleAlertClose}
              aria-labelledby="alert-dialog-slide-title"
              aria-describedby="alert-dialog-slide-description"
            >
              <DialogTitle id="alert-dialog-slide-title">
                {"Error while deleting Exercise Room"}
              </DialogTitle>

              <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                  You have to select a room in order to delete it..
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleDeleteAlertClose} color="primary">
                  Agree
                </Button>
              </DialogActions>
            </Dialog>
          </div>
        </TabPanel>
        <TabPanel value={value} index="four">
          <iframe
            src="http://192.168.1.38:3001/cv/CV-RAmon_fadsfasdf_1620163694893.pdf"
            width="600px"
            height="500px"
          />
        </TabPanel>
        <Dialog
          open={alertOpen}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleAlertClose}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle id="alert-dialog-slide-title">
            {"Error while createing new Exercise Room"}
          </DialogTitle>

          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              You have to select an image to create new exercise room.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleAlertClose} color="primary">
              Agree
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </>
  );
};

export default Admin;
