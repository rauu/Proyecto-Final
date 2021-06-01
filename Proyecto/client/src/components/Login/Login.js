import React from "react";
import { useHistory } from "react-router-dom";

import { Fade } from "react-reveal";

import "./Login.css";
import logo from "../../assets/logo.png";

import { LoginUser } from "../../service/Login";

import {
  Typography,
  Button,
  Grid,
  TextField,
  Snackbar,
} from "@material-ui/core";

import MuiAlert from "@material-ui/lab/Alert";

import LinkA from "react-router-dom/Link";

const Login = () => {
  const history = useHistory();

  const [loginInfo, setLoginInfo] = React.useState({
    username: "",
    password: "",
  });

  const handleChange = (event) => {
    setLoginInfo({ ...loginInfo, [event.target.name]: event.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    //console.log(values);
    validationFunciton();
  };

  const [createUserSnackSuccess, setCreateUserSnackSuccess] = React.useState(
    false
  );
  const [createUserSnackError, setCreateUserSnackError] = React.useState(false);
  const handleClose = () => {
    setCreateUserSnackSuccess(false);
    setCreateUserSnackError(false);
  };
  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

  function validationFunciton() {
    if (loginInfo.username === "" || loginInfo.password === "") {
      setCreateUserSnackError(true);
    } else if (loginInfo.username !== "" && loginInfo.password !== "") {
      loginFunction();
    }
  }

  function loginFunction() {
    LoginUser(loginInfo.username, loginInfo.password).then((res) => {
      if(res === true){
        history.push("/dashboard");
      } else{
        setCreateUserSnackError(true);
      }
    });
  }
  return (
    <div className="login">
      <Typography component={"div"}>
        <nav className="navbar navbar-expand nav">
          <div className="d-flex flex-grow-1">
            <LinkA to="/">
              <img src={logo} alt="logo" className="logo" />
            </LinkA>
          </div>
          <div className="collapse navbar-collapse flex-grow-1 text-right">
            <ul className="navbar-nav ml-auto flex-nowrap ">
              <li className="nav-item px-3">
                <LinkA
                  to="/register"
                  className="nav-link links"
                  color="secondary"
                >
                  Sign Up
                </LinkA>
              </li>
            </ul>
          </div>
        </nav>
      </Typography>
      <div className="login-first">
        <Fade top>
          <br />
          <Typography variant="h2" className="white">
            Welcome again!
          </Typography>
          <Typography variant="h5" className="white">
            LogIn to have another great session
          </Typography>
          <br />
        </Fade>
      </div>
      <div className="login-form">
        <Fade bottom>
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
              <Grid item xs={12} sm={12} md={12} lg={12}>
                <TextField
                  name="username"
                  variant="outlined"
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  autoFocus
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12}>
                <TextField
                  name="password"
                  variant="outlined"
                  type="password"
                  required
                  fullWidth
                  id="password"
                  label="Password"
                  onChange={handleChange}
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
              LogIn
            </Button>
          </form>
          <br/>
          <Grid
              container
              spacing={5}
              className="grid-center"
              alignItems="center"
              justify="center"
            >
              <Grid item xs={12} sm={12} md={12} lg={12}>
                <LinkA to="/forgotPassword" className="forgotPassowrd">
                <Typography variant="body1" color="primary">Forgot Password?</Typography>
                </LinkA>
                </Grid>

            </Grid>
        </Fade>
      </div>
      <br />
 

      <Snackbar
        open={createUserSnackSuccess}
        autoHideDuration={3000}
        onClose={handleClose}
      >
        <Alert autoHideDuration={3000} onClose={handleClose} severity="success">
          User registered successfully
        </Alert>
      </Snackbar>
      <Snackbar
        open={createUserSnackError}
        autoHideDuration={3000}
        onClose={handleClose}
      >
        <Alert autoHideDuration={3000} onClose={handleClose} severity="error">
          Wrong Credentials
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Login;
