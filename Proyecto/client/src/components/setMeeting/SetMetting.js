import React from "react";
import "./SetMetting.css";
import NavPrivate from "../nav-private/Nav-Private";
import { Fade } from "react-reveal";
import Link from "react-router-dom/Link";
import { AllNotices } from "../../service/Notices";
import parse from "html-react-parser";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import NotFound from "../notFound/NotFound";
import { postMetting } from "../../service/setMetting";
import {
  Typography,
  Button,
  Grid,
  TextField,
  Snackbar,
} from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";

const SetMetting = () => {
  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }
  const userInfo = JSON.parse(sessionStorage.getItem("user"));

  const [meeting, setMetting] = React.useState({
    subject: "",
    message: "",
  });

  const [subjectValueError, setSubjectValueError] = React.useState({
    error: false,
    errorMessage: "",
  });
  const [messageValueError, setMessageValueError] = React.useState({
    error: false,
    errorMessage: "",
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    validationForm();
  };
  const [createUserSnackSuccess, setCreateUserSnackSuccess] =
    React.useState(false);
  const [createUserSnackError, setCreateUserSnackError] = React.useState(false);
  const handleClose = () => {
    setCreateUserSnackSuccess(false);
    setCreateUserSnackError(false);
  };

  const handleChange = (event) => {
    setMetting({ ...meeting, [event.target.name]: event.target.value });
    console.log(meeting);
  };

  let subjectBool = false;
  let messageBool = false;
  function validationForm() {
    console.log("validation");

    if (meeting.message === "") {
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

    if (meeting.subject === "") {
      setSubjectValueError({
        ...subjectValueError,
        error: true,
        errorMessage: "You have to write a subject",
      });
      subjectBool = false;
    } else {
      setSubjectValueError({
        ...subjectValueError,
        error: false,
        errorMessage: "",
      });
      subjectBool = true;
    }

    if (subjectBool && messageBool) {
      setMettingService();
    } else {
      setCreateUserSnackError(true);
    }
  }

  function setMettingService() {
    postMetting(userInfo.id_user, meeting.message, meeting.subject).then(
      (res) => {
        if (res.data) {
          console.log(res.data);
          setCreateUserSnackSuccess(true);
        } else if (!res.data) {
          setCreateUserSnackError(true);
        }
      }
    );
  }
  return (
    <>
      <NavPrivate></NavPrivate>
      <div className="contact-first">
        <Fade right>
          <br />
          <Typography variant="h2" className="white">
            Write this form to set a meetig with your subscribers
          </Typography>

          <br />
        </Fade>
      </div>
      <br />
      <br />
      <div>
        <Fade left>
          <div className="workForm">
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
                    name="subject"
                    variant="outlined"
                    required
                    fullWidth
                    id="email"
                    label="Message Subject"
                    onChange={handleChange}
                    error={subjectValueError.error}
                    helperText={
                      subjectValueError.error
                        ? subjectValueError.errorMessage
                        : ""
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
                Send Message
              </Button>
            </form>

            <br />
          </div>
        </Fade>
      </div>
      <Snackbar
        open={createUserSnackSuccess}
        autoHideDuration={3000}
        onClose={handleClose}
      >
        <Alert autoHideDuration={3000} onClose={handleClose} severity="success">
          Your message has been send successfully
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
    </>
  );
};

export default SetMetting;
