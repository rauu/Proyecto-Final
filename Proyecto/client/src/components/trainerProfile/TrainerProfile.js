import React from "react";
import "./TrainerProfile.css";
import NavPrivate from "../nav-private/Nav-Private";
import { FadeR } from "react-reveal";
import { useLocation, useHistory, Link } from "react-router-dom";
import {
  dataExists,
  updateProfile,
  userSubscribed,
} from "../../service/TrainerProfile";
import NotFound from "../notFound/NotFound";
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
  FormHelperText,
  Modal,
  Backdrop,
  Fade,
  Card,
  CardContent,
} from "@material-ui/core/";
import serverURL from "../../utils/serverURL";
const url = serverURL;

const moment = require("moment-timezone");

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "auto",
  },
  paper: {
    backgroundColor: "#FFEFEB",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    borderRadius: "10px",
  },
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
}));

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
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

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const TrainerProfile = () => {
  const history = useHistory();
  const location = useLocation();
  const pathname = location.pathname.substr(
    location.pathname.lastIndexOf("/") + 1
  );
  const [trainerExists, setTrainerExists] = React.useState(true);
  const [trainerInfo, setTrainerInfo] = React.useState(true);
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("one");
  const [value2, setValue2] = React.useState("two");
  const userInfo = JSON.parse(sessionStorage.getItem("user"));
  const [editProfileimage, setEditProfileimage] = React.useState();
  const [editProfile, setEditProfile] = React.useState({
    newProfileImage: "",
    description: "",
  });
  const [videoInfo, setVideoInfo] = React.useState({});
  const [privateVideos, setPrivateVideos] = React.useState();
  const [publicVideos, setPublicVideos] = React.useState();
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeInfo = (event) => {
    setEditProfile({ ...editProfile, [event.target.name]: event.target.value });
    /*     console.log(editProfile);
     */
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  React.useEffect(() => {
    getUser();
    userSubs();
  }, []);

  function getUser() {
    dataExists(pathname).then((res) => {
      /*       console.log(res);
       */ if (res.data.userExists) {
        setTrainerExists(res.data.userExists);
        setTrainerInfo(res.data);
        setEditProfileimage(
          `${url + res.data.profile_image}`
        );
        setEditProfile({
          ...editProfile,
          description: res.data.description,
        });
      } else {
        setTrainerExists(res.data.userExists);
      }
    });
  }

  function userSubs() {
    userSubscribed(userInfo.id_user, pathname).then((res) => {
      /*       console.log(res);
       */ setVideoInfo(res.data);
      setPrivateVideos(res.data.privateVideos);
      setPublicVideos(res.data.publicVideos);
      /*       console.log(videoInfo);
       */
    });
  }

  const getAllPrivateVideoTrainer = () => {
    /*     console.log("videos");
     */
  };

  const handleSubmitEditProfile = (e) => {
    e.preventDefault();
    /*     console.log(editProfile);
     */ updateProfile(
      trainerInfo.id,
      editProfile.newProfileImage,
      editProfile.description
    ).then((res) => {
      if (res.data) {
        getUser();
      }
    });
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

        /*         console.log("file");
         */ setEditProfile({
          ...editProfile,
          newProfileImage: file,
        });
      };
      /*       console.log(editProfile);
       */ // Convert data to base64
      fileReader.readAsDataURL(fileToLoad);
    }
  };

  return (
    <>
      <NavPrivate></NavPrivate>
      <br />
      {trainerExists ? (
        <>
          <Grid
            container
            spacing={5}
            className="grid-center"
            alignItems="center"
            justify="center"
          >
            <Grid item xs={12} sm={12} md={4} lg={2}>
              <>
                <img
                  src={url + trainerInfo.profile_image}
                  alt="trainerImage"
                  className="trainerImage"
                />
                {/*                 <Typography variant="body1">{trainerInfo.username}</Typography>
                 */}{" "}
                <Typography variant="h6">
                  {trainerInfo.name} {trainerInfo.surname}
                </Typography>
              </>
            </Grid>
            <Grid item xs={12} sm={12} md={8} lg={8}>
              <Typography variant="body1" className="profile_description">
                {trainerInfo.description == null ||
                trainerInfo.description === "" ? (
                  <>
                    <i>No Description Available</i>{" "}
                  </>
                ) : (
                  <>{trainerInfo.description}</>
                )}
              </Typography>
            </Grid>
          </Grid>
          <Grid
            container
            spacing={5}
            className="grid-center"
            alignItems="center"
            justify="center"
          >
            <Grid item xs={12} sm={12} md={4} lg={2}>
              <>
                <div>
                  <Modal
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    className={classes.modal}
                    open={open}
                    onClose={handleClose}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                      timeout: 500,
                    }}
                  >
                    <Fade in={open}>
                      <div className={classes.paper} id="modal">
                        <br />
                        {/*                         <Typography variant="h4">Change your profile image</Typography>
                         */}
                        <form className="formTrainer">
                          {editProfileimage !== undefined && (
                            <>
                              <label
                                htmlFor="contained-button-file"
                                className="newImage"
                              >
                                <img
                                  src={editProfileimage}
                                  alt="trainerImage"
                                  className="trainerImage"
                                  htmlFor="contained-button-file"
                                />
                              </label>
                              <br />
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
                              <br />
                              <TextField
                                variant="outlined"
                                name="description"
                                multiline
                                required
                                rows="5"
                                fullWidth
                                defaultValue={trainerInfo.description}
                                label="Description"
                                onChange={handleChangeInfo}
                                inputProps={{
                                  maxlength: 500,
                                }}
                                /* helperText={`${
                                  editProfile.description.length
                                }/${500}`} */
                              />
                              <FormHelperText>
                                {editProfile.description != null ? (
                                  <>
                                    {`${editProfile.description.length}/${500}`}
                                  </>
                                ) : (
                                  <>0/500</>
                                )}
                              </FormHelperText>
                              <Button
                                variant="contained"
                                color="primary"
                                component="span"
                                type="button"
                                onClick={handleSubmitEditProfile}
                                style={{ fontSize: 25 }}
                              >
                                Edit Profile
                              </Button>
                            </>
                          )}
                        </form>
                      </div>
                    </Fade>
                  </Modal>
                </div>
                {JSON.parse(sessionStorage.getItem("user")).username ===
                  trainerInfo.username && (
                  <>
                    <Button
                      variant="contained"
                      color="primary"
                      className="button"
                      type="button"
                      onClick={handleOpen}
                    >
                      Edit Profile
                    </Button>
                  </>
                )}
              </>
            </Grid>
            <Grid item xs={12} sm={12} md={8} lg={8}>
              {videoInfo.subscribed ? (
                <>
                  {" "}
                  <Button
                    variant="contained"
                    color="primary"
                    className="button"
                    type="button"
                    disabled
                  >
                    Subscribed till {videoInfo.expire_date}
                  </Button>
                </>
              ) : (
                <>
                  {" "}
                  {userInfo.username !== trainerInfo.username ? (
                    <>
                      <Link to={`/subscribe/${trainerInfo.username}`}>
                        <Button
                          variant="contained"
                          color="primary"
                          className="button"
                          type="button"
                        >
                          Subscribe to {trainerInfo.username}
                        </Button>
                      </Link>
                    </>
                  ) : (
                    <></>
                  )}
                </>
              )}
            </Grid>
          </Grid>
          <br />
          <div className={classes.root}>
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
                  label="Public Videos"
                  {...a11yProps("one")}
                  classes={{ root: classes.label }}
                />
                <Tab
                  value="two"
                  label="Private Videos"
                  {...a11yProps("two")}
                  classes={{ root: classes.label }}
                  onClick={getAllPrivateVideoTrainer}
                />
              </Tabs>
            </AppBar>
            <TabPanel value={value} index="one">
              <Grid
                container
                spacing={5}
                className="grid-center"
                alignItems="center"
                justify="center"
              >
                {publicVideos && (
                  <>
                    {publicVideos.map((val) => {
                      return (
                        <>
                          <Grid
                            item
                            xs={12}
                            sm={6}
                            md={4}
                            lg={3}
                            key={val.id_video}
                          >
                            <Link to={`/video/${val.id_video}`}>
                              <Card>
                                <CardContent className="video-card">
                                  <video
                                    /*  onClick={(e) => e.preventDefault()} */
                                    onContextMenu={(e) => e.preventDefault()}
                                    className="video controls"
                                  >
                                    <source src={url + val.video} />
                                  </video>
                                  <br />
                                  <Typography variant="h5">
                                    {val.video_name}
                                  </Typography>
                                  <Typography variant="body2">
                                    {moment(val.date_upload).format("DD.MM.YY")}
                                  </Typography>
                                </CardContent>
                              </Card>
                            </Link>
                          </Grid>
                        </>
                      );
                    })}
                  </>
                )}
                {(publicVideos === undefined || publicVideos.length === 0) && (
                  <>
                    <br />
                    <br />
                    <Typography variant="body1">
                      <i>No public videos available</i>
                    </Typography>
                  </>
                )}
              </Grid>
            </TabPanel>
            <TabPanel value={value} index="two">
              {videoInfo.subscribed ||
              trainerInfo.username === userInfo.username ? (
                <>
                  <Grid
                    container
                    spacing={5}
                    className="grid-center"
                    alignItems="center"
                    justify="center"
                  >
                    {privateVideos && (
                      <>
                        {privateVideos.map((val) => {
                          return (
                            <>
                              <Grid
                                item
                                xs={12}
                                sm={6}
                                md={4}
                                lg={3}
                                key={val.id_video}
                              >
                                <Link to={`/video/${val.id_video}`}>
                                  <Card>
                                    <CardContent className="video-card">
                                      <video
                                        onContextMenu={(e) =>
                                          e.preventDefault()
                                        }
                                        className="video controls"
                                      >
                                        <source src={url + val.video} />
                                      </video>
                                      <br />
                                      <Typography variant="h5">
                                        {val.video_name}
                                      </Typography>
                                      <Typography variant="body2">
                                        {moment(val.date_upload).format(
                                          "DD.MM.YY"
                                        )}
                                      </Typography>
                                    </CardContent>
                                  </Card>
                                </Link>
                              </Grid>
                            </>
                          );
                        })}
                      </>
                    )}
                  </Grid>
                </>
              ) : (
                <>
                  <Grid
                    container
                    spacing={5}
                    className="grid-center"
                    alignItems="center"
                    justify="center"
                  >
                    {privateVideos && (
                      <>
                        {privateVideos.map((val) => {
                          return (
                            <>
                              <Grid
                                item
                                xs={12}
                                sm={6}
                                md={4}
                                lg={3}
                                key={val.id_video}
                              >
                                <Link to={`/subscribe/${trainerInfo.username}`}>
                                  <Card>
                                    <CardContent className="video-card overlayCard">
                                      <div className="notSubscribed">
                                        <video
                                          onContextMenu={(e) =>
                                            e.preventDefault()
                                          }
                                          className="video notSubscribedVideo controls"
                                        >
                                          <source src={url + val.video} />
                                        </video>
                                        <Typography
                                          variant="body2"
                                          className="white"
                                        >
                                          Your need to subscribe to{" "}
                                          {trainerInfo.username} in order to
                                          watch his videos
                                        </Typography>
                                      </div>

                                      <br />
                                      <Typography variant="h5">
                                        {val.video_name}
                                      </Typography>
                                      <Typography variant="body2">
                                        {moment(val.date_upload).format(
                                          "DD.MM.YY"
                                        )}
                                      </Typography>
                                    </CardContent>
                                  </Card>
                                </Link>
                              </Grid>
                            </>
                          );
                        })}
                      </>
                    )}
                    {(privateVideos === undefined ||
                      privateVideos.length === 0) && (
                      <>
                        <br />
                        <br />
                        <Typography variant="body1">
                          <i>No public videos available</i>
                        </Typography>
                      </>
                    )}
                  </Grid>
                </>
              )}
            </TabPanel>
          </div>
        </>
      ) : (
        <NotFound></NotFound>
      )}
      <br />
    </>
  );
};

export default TrainerProfile;
