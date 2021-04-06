import "./Register.css";
import logo from "../../assets/logo.png";
import { Typography, Link, Button, Grid, TextField } from "@material-ui/core";
import DatePicker from "@material-ui/lab/DatePicker";

import LinkA from "react-router-dom/Link";

const Register = () => {
  return (
    <div className="register">
      <Typography component={"div"}>
        <nav className="navbar navbar-expand nav">
          <div className="d-flex flex-grow-1">
            <a className="navbar-brand" href="#">
              <img src={logo} alt="logo" className="logo" />
            </a>
          </div>
          <div className="collapse navbar-collapse flex-grow-1 text-right">
            <ul className="navbar-nav ml-auto flex-nowrap ">
              <li className="nav-item px-3">
                <Link href="#" className="nav-link links" color="secondary">
                  Sign In
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      </Typography>
      <div className="register-first">
        <br />
        <Typography variant="h2" className="white">
          YOUR CHANGE BEGINS HERE
        </Typography>
        <Typography variant="h5" className="white">
          Body, Mind and Nutrition
        </Typography>
        <br />
      </div>
      <div className="registerForm">
        <br />
        <br />
        <br />
        <br />
        <form action="POST" autoComplete="off">
          <Grid container spacing={5} className="grid-center">
            <Grid item xs={12} sm={12} md={6} lg={6}>
              <TextField
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6}>
              <TextField
                name="lastName"
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
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
              />
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12}>
{/*               <DatePicker
                label="Basic example"
                value={value}
                onChange={(newValue) => {
                  setValue(newValue);
                }}
                renderInput={(params) => <TextField {...params} />}
              /> */}
            </Grid>
          </Grid>
        </form>
      </div>
    </div>
  );
};

export default Register;
