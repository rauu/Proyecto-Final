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
        <Grid item xs={12} sm={12} md={4} lg={4} className="left-footer">
          <Link href="#" className="white">
            Contact Us
          </Link>
          <br />
          <br />
          <Link href="#" className="white">
            Work with us
          </Link>
        </Grid>
        <Grid item xs={12} sm={12} md={4} lg={4}>
          <img src={logo} alt={logo} className="logo-footer" />
        </Grid>
        <Grid item xs={12} sm={12} md={4} lg={4}>
          <div className="inline">
            <Link href="#" className="white inline-icons">
            <InstagramIcon style={{ fontSize: 70 }}></InstagramIcon>
            </Link>
            <Link href="#" className="white inline-icons">
            <FacebookIcon style={{ fontSize: 70 }}></FacebookIcon>
            </Link>
            <Link href="#" className="white inline-icons">
            <TwitterIcon style={{ fontSize: 70 }}></TwitterIcon>
            </Link>
            <Link href="#" className="white inline-icons">
            <WhatsAppIcon style={{ fontSize: 70 }}></WhatsAppIcon>
            </Link>
          </div>
        </Grid>
      </Grid>
      <br />
      <Typography variant="body2" className="white copyright">
        Copyright 2021 Made By Raunak Binyani
      </Typography>
    </div>
  );
};

export default Footer;
