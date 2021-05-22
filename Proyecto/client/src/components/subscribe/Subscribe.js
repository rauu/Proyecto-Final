import React from "react";
import "./Subscribe.css";
import NavPrivate from "../nav-private/Nav-Private";
import { useLocation, useHistory } from "react-router-dom";
import NotFound from "../notFound/NotFound";
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

import { GetPlans, dataExists } from "../../service/Subscribe";

const SubscribeUser = () => {
  const history = useHistory();
  const location = useLocation();
  const pathname = location.pathname.substr(
    location.pathname.lastIndexOf("/") + 1
  );

  const [trainerExists, setTrainerExists] = React.useState(true);
  const [plans, setPlans] = React.useState(null);
  const expiry = "";
  const userInfo = JSON.parse(sessionStorage.getItem("user"));
  const [subscriptionInfo, setSubscriptionInfo] = React.useState({
    name: userInfo.id_user,
    trainerUsername: pathname,
    typeSubscription: "",
  });

  const handleChange = (event) => {
    console.log(event);
    setSubscriptionInfo({
      ...subscriptionInfo,
      [event.target.name]: event.target.value,
    });
    console.log(subscriptionInfo);
  };

  function getUser() {}
  React.useEffect(() => {
    dataExists(pathname).then((res) => {
      console.log(res);
      if (!res.data) {
        history.push("/error");
      }
    });
    GetPlans().then((res) => {
      setPlans(res.data);
      console.log(plans);
    });
  }, []);

  console.log(plans);
  return (
    <>
      <NavPrivate></NavPrivate>
      <div className="subscribe-first">
        <Fade right>
          <br />
          <Typography variant="h2" className="white">
            FILL THE FORM PROVIDED BELOW
          </Typography>

          <br />
        </Fade>
      </div>
      <br />
      <div className="subscription-form">
        <Fade right>
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
                disabled
                value={userInfo.name}
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
                disabled
                value={userInfo.surname}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6}>
              <TextField
                name="trainerUsername"
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Trainer Username"
                disabled
                value={pathname}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6}>
              <FormControl variant="outlined" className="room-options">
                <InputLabel htmlFor="outlined-age-native-simple">
                  Select Plan *
                </InputLabel>
                <Select
                  native
                  name="typeSubscription"
                  value={subscriptionInfo.typeSubscription}
                  onChange={handleChange}
                  label=" Select Plan *"
                  /* error={videoRoomError.error}
                        helperText={
                          videoRoomError.error
                            ? videoRoomError.errorMessage
                            : ""
                        } */
                >
                  <option value=""></option>

                  {plans !== null && (
                    <>
                      {plans.map((val) => {
                        return (
                          <option key={val.id_plan} value={val.id_plan}>
                            {val.name} {val.price}€
                          </option>
                        );
                      })}
                    </>
                  )}
                </Select>
                {/* {videoRoomError.error ? (
                        <FormHelperText error="true">
                          {videoRoomError.errorMessage}
                        </FormHelperText>
                      ) : (
                        ""
                      )} */}
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6}>
            <TextField
                name="expiry_date"
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Trainer Username"
                type="tel"
                value={pathname}
              />
            </Grid>
          </Grid>
        </Fade>
      </div>
    </>
  );
};

export default SubscribeUser;
