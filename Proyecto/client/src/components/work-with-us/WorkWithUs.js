import React from "react";

import Footer from "../Footer/Footer";
import Nav from "../nav-public/Nav-Public";
import "./WorkWithUs.css";
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
  Input,
} from "@material-ui/core";

import { lettersValidation, emailValidation } from "../../utils/validation";
import { submitCV } from "../../service/WorkWithUs";
import MuiAlert from "@material-ui/lab/Alert";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const WorkWithUS = () => {
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
    cv: "",
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
  const [cvValueError, setCvValueError] = React.useState({
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

  const fileBase64 = (event) => {
    console.log("FileName");
    let selectedFile = event.target.files;
    let file = null;
    let fileName = "";
    //Check File is not Empty
    if (selectedFile.length > 0) {
      // Select the very first file from list
      let fileToLoad = selectedFile[0];
      fileName = fileToLoad.name;
      // FileReader function for read the file.
      let fileReader = new FileReader();
      // Onload of file read the file content
      fileReader.onload = function (fileLoadedEvent) {
        file = fileLoadedEvent.target.result;
        // Print data in console
        console.log(fileToLoad);
        setValues({
          ...values,
          cv: file,
        });
      };
      // Convert data to base64
      fileReader.readAsDataURL(fileToLoad);
    }

    console.log(selectedFile);
  };

  let nameBool = false;
  let surnameBool = false;
  let emailBool = false;
  let cvBool = false;
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

    if (values.cv === "") {
      alert("You haven't uploaded your CV");
      cvBool = false;
    } else {
      cvBool = true;
    }

    if (nameBool && surnameBool && emailBool && cvBool && messageBool) {
      submitYourCV();
    } else {
      setCreateUserSnackError(true);
    }
  }

  function submitYourCV() {
    submitCV(
      values.name,
      values.surname,
      values.email,
      values.message,
      values.cv
    ).then((res) => {
     if (res.data) {
       setCreateUserSnackSuccess(true);
     } else if (!res.data) {
       setCreateUserSnackError(true);
     }
   });
  }

  return (
    <div className="workWithUs">
      <Typography component={"div"}>
        <Nav></Nav>
        <div className="work-first">
          <br />
          <Typography variant="h2" className="white">
            WORK WITH US
          </Typography>
          <Typography variant="h5" className="white">
            Send your CV here
          </Typography>
          <br />
        </div>
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
                <input
                  accept="application/pdf"
                  name="cv"
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
                    Upload your CV
                  </Button>
                </label>
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12}>
                <TextField
                  variant="outlined"
                  name="message"
                  multiline
                  name="message"
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
              Send your CV
            </Button>
          </form>
          <br />
          <br />
          <br />
        </div>
        <Snackbar
          open={createUserSnackSuccess}
          autoHideDuration={3000}
          onClose={handleClose}
        >
          <Alert
            autoHideDuration={3000}
            onClose={handleClose}
            severity="success"
          >
            Your application sent succesfully
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
        <Footer></Footer>
      </Typography>
    </div>
  );
};

export default WorkWithUS;
