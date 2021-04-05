import "./Footer.css";

import logo from "../../assets/logo.png";

import { Typography, Grid, Link } from "@material-ui/core";

import InstagramIcon from "@material-ui/icons/Instagram";
import FacebookIcon from "@material-ui/icons/Facebook";
import TwitterIcon from "@material-ui/icons/Twitter";
import WhatsAppIcon from "@material-ui/icons/WhatsApp";

const Footer = () => {
  return (
    <div className="footer">
      <br />
      <br />
      <Grid container spacing={2} className="grid-center">
        <Grid item xs={12} sm={12} md={6} lg={6} className="left-footer">
          <Link href="#" className="" color="primary">
            Contact Us
          </Link>
          <br />
          <br />
          <Link href="#" className="" color="primary">
            Work with us
          </Link>
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6}>
          <img src={logo} alt={logo} className="logo" />
        </Grid>
      </Grid>
      <br />
      <Typography variant="body2" color="primary">
        Copyright 2021 Made By Raunak Binyani
      </Typography>
      <br />
    </div>
  );
};

export default Footer;
