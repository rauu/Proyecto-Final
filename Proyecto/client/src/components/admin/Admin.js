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
  UpdateUserType,
  DeleteUser,
  GetSearchUsers,
  GetPDF,
  DeleteCV,
} from "../../service/Admin";
import DoneRoundedIcon from "@material-ui/icons/DoneRounded";
import CloseRoundedIcon from "@material-ui/icons/CloseRounded";
import DeleteRoundedIcon from "@material-ui/icons/DeleteRounded";
import SearchRoundedIcon from "@material-ui/icons/SearchRounded";
import { getUser, getEmail } from "../../service/User";

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

  const [alertOpen, setAlertOpen] = React.useState(false);
  const [deleteAlertOpen, setDeleteAlertOpen] = React.useState(false);

  const [roomsList, setRoomslist] = React.useState([]);
  const [allUsers, setAllUsers] = React.useState([]);
  const [allPdf, setAllPdf] = React.useState(null);
  const [userExists, setUserExists] = React.useState(false);
  const [emailExists, setEmailExists] = React.useState(false);

  const userAdornment = userExists
    ? {
        endAdornment: (
          <InputAdornment position="end">
            <Tooltip title="User Alerady Exits">
              <CloseRoundedIcon edge="end" color="error">
                {" "}
              </CloseRoundedIcon>
            </Tooltip>
          </InputAdornment>
        ),
      }
    : {
        endAdornment: (
          <InputAdornment position="end">
            <Tooltip title="User Available">
              <DoneRoundedIcon edge="end" className="green">
                {" "}
              </DoneRoundedIcon>
            </Tooltip>
          </InputAdornment>
        ),
      };

  const emailAdornment = emailExists
    ? {
        endAdornment: (
          <InputAdornment position="end">
            <Tooltip title="Email Alerady Exits">
              <CloseRoundedIcon edge="end" color="error">
                {" "}
              </CloseRoundedIcon>
            </Tooltip>
          </InputAdornment>
        ),
      }
    : {
        endAdornment: (
          <InputAdornment position="end">
            <Tooltip title="Email Available">
              <DoneRoundedIcon edge="end" className="green">
                {" "}
              </DoneRoundedIcon>
            </Tooltip>
          </InputAdornment>
        ),
      };

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

  const handleSearchUser = (event) => {
    setSearchValue({
      username: event.target.value,
    });
    console.log(searchValue);
    GetSearchUsers(event.target.value).then((res) => {
      setAllUsers(res.data);
    });
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

  const [updateUsers, setUpdateUsers] = React.useState({
    role_user: "",
    username: "",
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

  const userChange = (id_user, username, id) => {
    console.log(id_user);
    console.log(username);
    let role_user = document
      .getElementsByName("typeUserModify")
      [id].getAttribute("value");
    UpdateUserType(id_user, role_user).then((res) => {
      if (res.data === true) {
        setSnackbarUserModified(true);
      }
    });
  };
  const userDelete = (i) => {
    console.log(i);
    let userDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );
    if (userDelete) {
      DeleteUser(i).then((res) => {
        console.log(res);
        setSnackbarUserDeleted(true);
      });
    }
  };
  const deleteCV = (i) => {
    console.log(i);

    let cvDelete = window.confirm(
      "Are you sure that you want to delete this CV?"
    );
    if (cvDelete) {
      DeleteCV(i).then((res) => {
        console.log(res);
        //setAllPdf(res.data)
        setDeletePdfSnackSuccess(true);
      });
    }
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

  const [createUserSnackSuccess, setCreateUserSnackSuccess] =
    React.useState(false);
  const [createUserSnackError, setCreateUserSnackError] = React.useState(false);
  const [createRoomSnackSuccess, setCreateRoomSnackSuccess] =
    React.useState(false);
  const [createDeleteRoomSnackSuccess, setCreateDeleteRoomSnackSuccess] =
    React.useState(false);
  const [createRoomSnackError, setCreateRoomSnackError] = React.useState(false);
  const [snackbarUserModified, setSnackbarUserModified] = React.useState(false);
  const [snackbarUserDeleted, setSnackbarUserDeleted] = React.useState(false);
  const [deletePdfSnackSuccess, setDeletePdfSnackSuccess] =
    React.useState(false);

  const handleClose = () => {
    setCreateUserSnackSuccess(false);
    setCreateUserSnackError(false);
    setCreateRoomSnackSuccess(false);
    setCreateRoomSnackError(false);
    setCreateDeleteRoomSnackSuccess(false);
    setSnackbarUserModified(false);
    setSnackbarUserDeleted(false);
    setDeletePdfSnackSuccess(false);
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
  }, [snackbarUserDeleted]);

  React.useEffect(() => {
    console.log(allPdf);
    GetAllPDF();
  }, [deletePdfSnackSuccess]);

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
  function GetAllPDF() {
    GetPDF().then((res) => {
      setAllPdf(res.data);
      console.log(res.data);
    });
    console.log(allPdf);
  }

  /* function SearchUsers() {
    GetSearchUsers(searchValue.username).then((res) => {
      console.log(res);
    });
  } */

  const dataCheckEmail = () => {
    getEmail(userRegisterValue.email).then((res) => {
      setEmailExists(res.data);
    });
  };
  const dataCheckUser = () => {
    getUser(userRegisterValue.username).then((res) => {
      setUserExists(res.data);
    });
  };

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
                        onBlur={dataCheckUser}
                        InputProps={userAdornment}
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
                        onBlur={dataCheckEmail}
                        InputProps={emailAdornment}
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
              className="snackbar"
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
              className="snackbar"
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
          <>
            <div className="searchIcon">
              <TextField
                name="userSearch"
                variant="outlined"
                fullWidth
                id="userSearch"
                label="Search Users"
                onChange={handleSearchUser}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="end">
                      <Tooltip title="User">
                        <SearchRoundedIcon edge="end"> </SearchRoundedIcon>
                      </Tooltip>
                    </InputAdornment>
                  ),
                }}
              />
            </div>
            <br />
            {allUsers !== undefined && (
              <>
                {allUsers.map((val) => {
                  return (
                    <div className="listUser" key={val.id_user}>
                      <form noValidate autoComplete="off">
                        <Grid
                          container
                          spacing={5}
                          className="grid-center"
                          alignItems="center"
                          justify="center"
                        >
                          <Grid item xs={6} sm={6} md={3} lg={3}>
                            <Typography variant="body">
                              {val.username}
                            </Typography>
                          </Grid>
                          <Grid item xs={6} sm={6} md={3} lg={3}>
                            <FormControl variant="outlined" fullWidth required>
                              <InputLabel id="typeUser">User Type</InputLabel>
                              <Select
                                name="typeUserModify"
                                labelId="typeUserModify"
                                id="typeUserModify"
                                className="typeUserModify"
                                defaultValue={val.role_user}
                                label="User Type"
                              >
                                <MenuItem value={"role_user"}>User</MenuItem>
                                <MenuItem value={"role_trainer"}>
                                  Trainer
                                </MenuItem>
                                <MenuItem value={"role_admin"}>Admin</MenuItem>
                              </Select>
                            </FormControl>
                          </Grid>
                          <Grid item xs={6} sm={6} md={3} lg={3}>
                            <DeleteRoundedIcon
                              onClick={userDelete.bind(this, val.id_user)}
                              className="deleteIcon"
                              fontSize="large"
                              color="primary"
                            ></DeleteRoundedIcon>
                          </Grid>
                          <Grid item xs={6} sm={6} md={3} lg={3}>
                            <Button
                              variant="contained"
                              color="primary"
                              className="button"
                              type="button"
                              onClick={userChange.bind(
                                this,
                                val.id_user,
                                val.username,
                                val.id
                              )}
                            >
                              Save Changes
                            </Button>
                          </Grid>
                        </Grid>
                      </form>
                    </div>
                  );
                })}
              </>
            )}

            <Snackbar
              className="snackbarModified"
              open={snackbarUserModified}
              autoHideDuration={3000}
              onClose={handleClose}
            >
              <Alert
                autoHideDuration={3000}
                onClose={handleClose}
                severity="success"
              >
                User modified successfully
              </Alert>
            </Snackbar>
            <Snackbar
              className="snackbarDeleted"
              open={snackbarUserDeleted}
              autoHideDuration={3000}
              onClose={handleClose}
            >
              <Alert
                autoHideDuration={3000}
                onClose={handleClose}
                severity="success"
              >
                The user has been deleted succesfully
              </Alert>
            </Snackbar>
          </>
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
                  className="snackbar"
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
                <Snackbar
                  className="snackbar"
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
                  className="snackbar"
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
          <>
            {allPdf !== null && allPdf !== false && (
              <>
                {allPdf.map((val) => {
                  return (
                    <div className="listUser" key={val.id}>
                      <Typography variant="body">
                        <b>Date Uploaded:</b> {val.date_uploaded}
                      </Typography>
                      <br />
                      <br />
                      <Typography variant="body">
                        <b>From:</b> {val.name} {val.surname}
                      </Typography>
                      <br />
                      <br />
                      <Typography variant="body">
                        <b>Email:</b> {val.email}{" "}
                      </Typography>
                      <br />
                      <br />
                      <Typography variant="body">
                        <b>Message:</b> {val.message}
                      </Typography>
                      <br />
                      <br />

                      <iframe
                        src={`http://192.168.1.38:3001/${val.file_location}`}
                        width="100%"
                        height="600px"
                        allowfullscreen
                        sandbox
                      />

                      <br />
                      <div className="deleteCV">
                        <Button
                          variant="contained"
                          color="primary"
                          className="button"
                          type="button"
                          onClick={deleteCV.bind(this, val.id)}
                        >
                          Delete cv
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </>
            )}

            {allPdf === false && (
              <>
                <Typography variant="body1">
                  <i>Currently there are no CV uploaded</i>
                </Typography>
              </>
            )}
          </>
          <Snackbar
            className="snackbar"
            open={deletePdfSnackSuccess}
            autoHideDuration={3000}
            onClose={handleClose}
          >
            <Alert
              autoHideDuration={3000}
              onClose={handleClose}
              severity="success"
            >
              CV Deleted successfully
            </Alert>
          </Snackbar>
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
