import "./UploadVideo.css";
import NavPrivate from "../nav-private/Nav-Private";
import { Fade } from "react-reveal";
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import { GetExersiceRooms, UploadVideo } from "../../service/UploadVideo";
import {
  Typography,
  Button,
  Grid,
  TextField,
  Select,
  InputLabel,
  FormControl,
  Snackbar,
  FormHelperText,
} from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
const UploadVideos = () => {
  const [roomsList, setRoomslist] = useState([]);

  const handleChange = (event) => {
    setUploadValue({ ...uploadValue, [event.target.name]: event.target.value });
    console.log(uploadValue);
  };
  const [createUserSnackSuccess, setCreateUserSnackSuccess] = React.useState(
    false
  );
  const [createUserSnackError, setCreateUserSnackError] = React.useState(false);
  const handleClose = () => {
    setCreateUserSnackSuccess(false);
    setCreateUserSnackError(false);
  };

  function getRooms() {
    GetExersiceRooms().then((res) => {
      setRoomslist(res);
      //console.log(roomsList)
      console.log(res);
    });
  }
  const history = useHistory();

  useEffect(() => {
    console.log(roomsList);
    getRooms();
    console.log("entro");
    if (JSON.parse(sessionStorage.getItem("user")).role_user === "role_user") {
      history.push("/dashboard");
    }
    console.log(JSON.parse(sessionStorage.getItem("user")));
  }, []);
  const fileBase64 = (event) => {
    console.log("FileName");
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
        console.log(file);

        setUploadValue({
          ...uploadValue,
          video: file,
        });
      };

      // Convert data to base64
      fileReader.readAsDataURL(fileToLoad);
    }
  };

  const [uploadValue, setUploadValue] = React.useState({
    video_name: "",
    description: "",
    type_video: "",
    room: "",
    video: "",
  });

  const [videoNameError, setVideoNameError] = React.useState({
    error: false,
    errorMessage: "",
  });
  const [videoDescriptionError, setVideoDescriptionError] = React.useState({
    error: false,
    errorMessage: "",
  });
  const [videoTypeError, setVideoTypeError] = React.useState({
    error: false,
    errorMessage: "",
  });
  const [videoRoomError, setVideoRoomError] = React.useState({
    error: false,
    errorMessage: "",
  });

  let videoNameBool = false;
  let videoDescriptionBool = false;
  let videoTypeBool = false;
  let videoRoomBool = false;
  let videoBool = false;

  function uploadVideoValitation() {
    console.log("validation");

    if (uploadValue.video_name === "") {
      setVideoNameError({
        error: true,
        errorMessage: "Invalid video name",
      });
      videoNameBool = false;
    } else {
      setVideoNameError({
        ...videoNameError,
        error: false,
        errorMessage: "",
      });
      videoNameBool = true;
    }

    if (uploadValue.room === "") {
      setVideoRoomError({
        error: true,
        errorMessage: "Select a Room",
      });
      videoRoomBool = false;
    } else {
      setVideoRoomError({
        ...videoRoomError,
        error: false,
        errorMessage: "",
      });
      videoRoomBool = true;
    }

    if (uploadValue.type_video === "") {
      setVideoTypeError({
        error: true,
        errorMessage: "Select a Type",
      });
      videoTypeBool = false;
    } else {
      setVideoTypeError({
        ...videoTypeError,
        error: false,
        errorMessage: "",
      });
      videoTypeBool = true;
    }
    if (uploadValue.description === "") {
      setVideoDescriptionError({
        error: true,
        errorMessage: "Write a Description",
      });
      videoDescriptionBool = false;
    } else {
      setVideoDescriptionError({
        ...videoDescriptionError,
        error: false,
        errorMessage: "",
      });
      videoDescriptionBool = true;
    }
    if (uploadValue.video === "") {
      alert("You have to select the video");
      videoBool = false;
    } else {
      videoBool = true;
    }

    if (
      videoNameBool &&
      videoDescriptionBool &&
      videoTypeBool &&
      videoRoomBool &&
      videoBool
    ) {
      uploadVideo();
    } else {
      setCreateUserSnackError(true);
    }
  }

  function uploadVideo() {
    let id_user = JSON.parse(sessionStorage.getItem("user")).id_user;
    UploadVideo(
      uploadValue.video_name,
      uploadValue.description,
      uploadValue.type_video,
      uploadValue.room,
      uploadValue.video,
      id_user
    ).then((res) => {
      if (res.data) {
        setCreateUserSnackSuccess(true);
      } else if (!res.data) {
        setCreateUserSnackError(true);
      }
    });
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    uploadVideoValitation();
  };
  return (
    <>
      <Typography component={"div"}>
        <NavPrivate></NavPrivate>
        <div className="uploadVideo">
          <div className="upload-first">
            <Fade right>
              <br />
              <Typography variant="h2" className="white">
                UPLOAD VIDEO
              </Typography>
              <br />
            </Fade>
          </div>
          <br />

          <div className="upload-form">
            <Fade left>
              <br />
              <br />
              <br />

              <form
                noValidate
                autoComplete="off"
                className="uploadForm"
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
                      name="video_name"
                      variant="outlined"
                      required
                      fullWidth
                      id="video_name"
                      label="Video Name"
                      autoFocus
                      onChange={handleChange}
                      error={videoNameError.error}
                      helperText={
                        videoNameError.error ? videoNameError.errorMessage : ""
                      }
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={6} lg={6}>
                    <FormControl variant="outlined" className="room-options">
                      <InputLabel htmlFor="outlined-age-native-simple">
                        Select Room *
                      </InputLabel>
                      <Select
                        native
                        name="room"
                        value={uploadValue.room}
                        onChange={handleChange}
                        label="Select Room *"
                        error={videoRoomError.error}
                        helperText={
                          videoRoomError.error
                            ? videoRoomError.errorMessage
                            : ""
                        }
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
                      {videoRoomError.error ? (
                        <FormHelperText error="true">
                          {videoRoomError.errorMessage}
                        </FormHelperText>
                      ) : (
                        ""
                      )}
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={12} md={6} lg={6}>
                    <FormControl variant="outlined" className="room-options">
                      <InputLabel htmlFor="outlined-age-native-simple">
                        Video Type *
                      </InputLabel>
                      <Select
                        native
                        name="type_video"
                        value={uploadValue.type_video}
                        onChange={handleChange}
                        label="Video Type *"
                        error={videoTypeError.error}
                      >
                        <option value=""></option>
                        <option value="private">Private Video</option>
                        <option value="public">Public Video</option>
                      </Select>
                      {videoTypeError.error ? (
                        <FormHelperText error="true">
                          {videoTypeError.errorMessage}
                        </FormHelperText>
                      ) : (
                        ""
                      )}
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={12} md={12} lg={12}>
                    <input
                      accept="video/*"
                      name="video"
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
                        Select your Video
                      </Button>
                    </label>
                  </Grid>
                  <Grid item xs={12} sm={12} md={12} lg={12}>
                    <TextField
                      variant="outlined"
                      name="description"
                      multiline
                      required
                      rows="5"
                      fullWidth
                      label="Description"
                      onChange={handleChange}
                      error={videoDescriptionError.error}
                      helperText={
                        videoDescriptionError.error
                          ? videoDescriptionError.errorMessage
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
                  Upload
                </Button>
              </form>
              <br />
              <br />
            </Fade>
          </div>
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
            Your video has been uploaded succesfully
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
      </Typography>
    </>
  );
};

export default UploadVideos;
