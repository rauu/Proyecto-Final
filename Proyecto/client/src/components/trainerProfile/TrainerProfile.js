import React from "react";
import "./TrainerProfile.css";
import NavPrivate from "../nav-private/Nav-Private";
import { FadeR } from "react-reveal";
import { useLocation, useHistory, Link } from "react-router-dom";
import { dataExists, updateProfile } from "../../service/TrainerProfile";
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
  Modal,
  Backdrop,
  Fade,
} from "@material-ui/core/";

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
  const [editProfileimage, setEditProfileimage] = React.useState();
  const [editProfile, setEditProfile] = React.useState({
    newProfileImage: "",
    description: "",
  });

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeInfo = (event) => {
    setEditProfile({ ...editProfile, [event.target.name]: event.target.value });
    console.log(editProfile);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  React.useEffect(() => {
    getUser();
  }, []);

  function getUser() {
    dataExists(pathname).then((res) => {
      console.log(res);
      if (res.data.userExists) {
        setTrainerExists(res.data.userExists);
        setTrainerInfo(res.data);
        setEditProfileimage(
          `http://192.168.1.38:3001/${res.data.profile_image}`
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

  const getAllPrivateVideoTrainer = () => {
    console.log("videos");
  };

  const handleSubmitEditProfile = (e) => {
    e.preventDefault();
    console.log(editProfile);
    updateProfile(
      trainerInfo.id,
      editProfile.newProfileImage,
      editProfile.description
    ).then((res) =>{
      if(res.data){
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

        console.log("file");
        setEditProfile({
          ...editProfile,
          newProfileImage: file,
        });
      };
      console.log(editProfile);
      // Convert data to base64
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
                  src={`http://192.168.1.38:3001/${trainerInfo.profile_image}`}
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
                {trainerInfo.description}
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
                                {editProfile.description != null 
                                ? (
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
              Item One
            </TabPanel>
            <TabPanel value={value} index="two">
              Item Two
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
