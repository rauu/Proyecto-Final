import React from "react";

import { Fade } from "react-reveal";

import "./Pricing.css";
import Nav from "../nav-public/Nav-Public";
import Footer from "../footer/Footer";
import { Typography, Grid, Card, CardContent } from "@material-ui/core";

const Pricing = () => {
  return (
    <div className="pricing">
      <Typography component={"div"}>
        <Nav></Nav>
      </Typography>
      <div className="pricing-first">
        <Fade right>
          <br />
          <Typography variant="h2" className="white">
            Start training from today
          </Typography>

          <br />
        </Fade>
      </div>
      <Fade left>
        <div className="pricing-second">
          <Typography variant="h2" color="secondary">
            Gymooze has a plan that adapts to your style.
          </Typography>
          <Typography variant="h5" color="secondary">
            Unlimited access to all activities and clases.
          </Typography>

          <br />

          <div className="pricing-info">
            <Grid
              container
              spacing={5}
              className="grid-center"
              alignItems="center"
              justify="center"
            >
              <Grid item xs={12} sm={6} md={4} lg={4}>
                <Card>
                  <CardContent className="pricing-card">
                    <Typography variant="body1">
                      1 month/subscription
                    </Typography>
                    <br />
                    <Typography variant="h3">14.99€/mes</Typography>
                    <Typography variant="body2">(IVA INCLUDED)</Typography>
                    <br/>
                    <Typography variant="body1">Unlimited Clases</Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} sm={6} md={4} lg={4}>
                <Card>
                  <CardContent className="pricing-card">
                    <Typography variant="body1">
                      3 month/subscription
                    </Typography>
                    <br />
                    <Typography variant="h3">13.50€/mes</Typography>
                    <Typography variant="body2">(IVA INCLUDED)</Typography>
                    <br/>
                    <Typography variant="body1">Unlimited Clases</Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} sm={12} md={4} lg={4}>
                <Card>
                  <CardContent className="pricing-card">
                    <Typography variant="body1">
                      6 month/subscription
                    </Typography>
                    <br />
                    <Typography variant="h3">12.75€/mes</Typography>
                    <Typography variant="body2">(IVA INCLUDED)</Typography>
                    <br/>
                    <Typography variant="body1">Unlimited Clases</Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </div>
        </div>
      </Fade>
      <br />
      <br />
      <br />
      <Footer></Footer>
    </div>
  );
};

export default Pricing;
