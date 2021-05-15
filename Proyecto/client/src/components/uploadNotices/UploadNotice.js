import React, { Component, useEffect } from "react";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw } from "draft-js";

import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from "draftjs-to-html";

import NavPrivate from "../nav-private/Nav-Private";
import "./UploadNotice.css";
import {
  Typography,
  Button,
  Grid,
  TextField,
  Snackbar,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide,
} from "@material-ui/core";
import { Fade } from "react-reveal";
import { useHistory } from "react-router-dom";

import MuiAlert from "@material-ui/lab/Alert";
import { UploadNews } from "../../service/UploadNews";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const UploadNotices = () => {
  const history = useHistory();
  const [uploadValue, setUploadValue] = React.useState({
    headline: "",
    headlineImage: "",
    content: "",
  });
  const [alertOpen, setAlertOpen] = React.useState(false);
  const [alertOpenContent, setApenContent] = React.useState(false);

  const handleAlertOpen = () => {
    setAlertOpen(true);
    
  };
  const handleAlertClose = () => {
    setAlertOpen(false);
    setApenContent(false);
  };
  useEffect(() => {
    console.log("entro");
    if (JSON.parse(sessionStorage.getItem("user")).role_user === "role_user") {
      history.push("/dashboard");
    }
    console.log(JSON.parse(sessionStorage.getItem("user")));
    console.log(createSnackSuccess);
  }, []);

  /* useEffect(() => {
    setUploadValue({
      ...uploadValue,
      content: draftToHtml(convertToRaw(editorState.getCurrentContent()))
    })
    console.log(uploadValue)
  }, [draftToHtml(convertToRaw(editorState.getCurrentContent()))]); */

  const [createSnackSuccess, setCreateSnackSuccess] = React.useState(false);
  const [SnackError, setSnackError] = React.useState(false);
  const handleClose = () => {
    setCreateSnackSuccess(false);
    setSnackError(false);
  };

  const [state, setState] = React.useState({
    editorState: EditorState.createEmpty(),
  });

  const onEditorStateChange = (editorState) => {
    setState({
      editorState,
    });
    setUploadValue({
      ...uploadValue,
      content: draftToHtml(convertToRaw(editorState.getCurrentContent())),
    });
    console.log(uploadValue);
  };

  const handleChange = (event) => {
    setUploadValue({ ...uploadValue, [event.target.name]: event.target.value });
    console.log(uploadValue);
  };

  const { editorState } = state;

  const handleSubmit = (e) => {
    e.preventDefault();
    setUploadValue({
      ...uploadValue,
      content: draftToHtml(convertToRaw(editorState.getCurrentContent())),
    });
    validation();
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

        setUploadValue({
          ...uploadValue,
          headlineImage: file,
        });
      };

      // Convert data to base64
      fileReader.readAsDataURL(fileToLoad);
    }
  };

  const [noticeHeadlineError, setNoticeHeadlineError] = React.useState({
    error: false,
    errorMessage: "",
  });
  let newsHeadlineBool = false;
  let newsHeadlineImageBool = false;
  let newsContentBool = false;

  function validation() {
    console.log(uploadValue);
    if (uploadValue.headline === "") {
      setNoticeHeadlineError({
        error: true,
        errorMessage: "Headline can't be empty",
      });
      newsHeadlineBool = false;
    } else {
      setNoticeHeadlineError({
        ...noticeHeadlineError,
        error: false,
        errorMessage: "",
      });
      newsHeadlineBool = true;
    }

    if (uploadValue.headlineImage === "") {
      setAlertOpen(true)
      newsHeadlineImageBool = false;
    } else {
      newsHeadlineImageBool = true;
    }
    if (uploadValue.content === "") {
      setApenContent(true)
      newsContentBool = false;
    } else {
      newsContentBool = true;
    }

    if (newsHeadlineBool && newsContentBool && newsHeadlineImageBool) {
      createNews();
    } else {
      setSnackError(true);
    }
  }

  function createNews() {
    let userId = JSON.parse(sessionStorage.getItem("user")).id_user;

    UploadNews(
      uploadValue.headline,
      uploadValue.headlineImage,
      uploadValue.content,
      userId
    ).then((res) => {
      if (res.data) {
        setCreateSnackSuccess(true);
      } else if (!res.data) {
        setSnackError(true);
      }
    });
  }
  return (
    <div>
      <NavPrivate></NavPrivate>
      <div className="upload-first">
        <Fade right>
          <br />
          <Typography variant="h2" className="white">
            UPLOAD NEWS
          </Typography>
          <br />
        </Fade>
      </div>
      <br />

      <div className="upload-form">
        <Fade left>
          <form
            noValidate
            autoComplete="off"
            className="uploadNewsForm"
            onSubmit={handleSubmit}
          >
            <Grid
              container
              spacing={5}
              className="grid-center"
              alignItems="center"
              justify="center"
            >
              <Grid item xs={12} sm={12} md={12} lg={12}>
                <TextField
                  name="headline"
                  variant="outlined"
                  required
                  fullWidth
                  id="video_name"
                  label="News HeadLine"
                  onChange={handleChange}
                  autoFocus
                  error={noticeHeadlineError.error}
                      helperText={
                        noticeHeadlineError.error
                          ? noticeHeadlineError.errorMessage
                          : ""
                      }
                />
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12}>
                <input
                  accept="image/*"
                  name="headlineImage"
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
                    Select your Headline Image
                  </Button>
                </label>
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12}>
                <div className="notice">
                  <Editor
                    editorState={editorState}
                    toolbarClassName="toolbarClassName"
                    wrapperClassName="wrapperClassName"
                    editorClassName="editorClassName"
                    onEditorStateChange={onEditorStateChange}
                  />
                </div>
              </Grid>
            </Grid>
            <br />
            <Button
              variant="contained"
              color="primary"
              className="button"
              type="submit"
            >
              Upload News
            </Button>
          </form>
          <br />
          <br />
        </Fade>
      </div>
      <Snackbar
        open={createSnackSuccess}
        autoHideDuration={3000}
        onClose={handleClose}
      >
        <Alert autoHideDuration={3000} onClose={handleClose} severity="success">
          Your news has been uploaded succesfully
        </Alert>
      </Snackbar>
      <Snackbar open={SnackError} autoHideDuration={3000} onClose={handleClose}>
        <Alert autoHideDuration={3000} onClose={handleClose} severity="error">
          There was an unexpected error
        </Alert>
      </Snackbar>
      <Dialog
          open={alertOpen}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleAlertClose}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle id="alert-dialog-slide-title">
            {"Error while uploading news"}
          </DialogTitle>

          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              Select headline Image
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleAlertClose} color="primary">
              Agree
            </Button>
          </DialogActions>
        </Dialog>

      <Dialog
          open={alertOpenContent}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleAlertClose}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle id="alert-dialog-slide-title">
            {"Error while uploading news"}
          </DialogTitle>

          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              You have to write a content.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleAlertClose} color="primary">
              Agree
            </Button>
          </DialogActions>
        </Dialog>
    </div>
  );
};

export default UploadNotices;
