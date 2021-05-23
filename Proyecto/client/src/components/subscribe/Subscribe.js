import React from "react";
import "./Subscribe.css";
import NavPrivate from "../nav-private/Nav-Private";
import { useLocation, useHistory } from "react-router-dom";
import NotFound from "../notFound/NotFound";
import { Fade } from "react-reveal";
import { DatePicker } from "@material-ui/pickers";

import {
  Typography,
  Button,
  Grid,
  TextField,
  Select,
  InputLabel,
  FormControl,
  Snackbar,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide,
} from "@material-ui/core/";

import {
  GetPlans,
  dataExists,
  SubscribeUserService,
} from "../../service/Subscribe";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

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
    usename: userInfo.id_user,
    trainerUsername: pathname,
    typeSubscription: "",
    creditCard: "",
    expiryDate: "",
    cvv: "",
  });
  const [alertOpen, setAlertOpen] = React.useState(false);

  const handleAlertOpen = () => {
    setAlertOpen(true);
  };

  const handleAlertClose = () => {
    setAlertOpen(false);
    history.push("/trainer/" + pathname)
  };

  const handleChange = (event) => {
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

  const handleSubmit = (e) => {
    e.preventDefault();
    setAlertOpen(true);
    console.log(subscriptionInfo);
    SubscribeUserService(
      subscriptionInfo.usename,
      subscriptionInfo.trainerUsername,
      subscriptionInfo.creditCard,
      subscriptionInfo.cvv,
      subscriptionInfo.typeSubscription,
      subscriptionInfo.expiryDate
    ).then((res) => {
      console.log(res);
    });
  };

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
        <form onSubmit={handleSubmit}>
          <Fade left>
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
                    required
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
              <Grid item xs={12} sm={12} md={12} lg={12}>
                <TextField
                  name="creditCard"
                  variant="outlined"
                  required
                  fullWidth
                  id="lastName"
                  label="Credit Card No."
                  type="number"
                  inputProps={{
                    maxlength: 19,
                  }}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <TextField
                  name="expiryDate"
                  id="date"
                  label="Expiry Date"
                  type="month"
                  required
                  fullWidth
                  variant="outlined"
                  InputLabelProps={{ shrink: true }}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <TextField
                  name="cvv"
                  variant="outlined"
                  required
                  fullWidth
                  id="lastName"
                  label="CVV"
                  type="number"
                  inputProps={{
                    maxlength: 3,
                  }}
                  onChange={handleChange}
                />
              </Grid>
              <br />
              <Button
                variant="contained"
                color="primary"
                className="button"
                type="submit"
              >
                Subscribe
              </Button>
            </Grid>
          </Fade>
        </form>
        <Dialog
          open={alertOpen}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleAlertClose}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle id="alert-dialog-slide-title">
            {"Payment Sucessfull"}
          </DialogTitle>

          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              Your payment has been received succesfully.
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

export default SubscribeUser;
