import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";

import { Fade } from "react-reveal";

import "./Pricing.css";
import Nav from "../nav-public/Nav-Public";
import Footer from "../footer/Footer";
import { Typography, Grid, Card, CardContent } from "@material-ui/core";
import { AllPlans } from "../../service/Plans";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& > * + *": {
      marginLeft: theme.spacing(2),
    },
  },
}));

const Pricing = () => {
  const classes = useStyles();

  const [plans, setPlans] = React.useState(null);

  React.useEffect(() => {
    getPlans();
  }, []);
  function getPlans() {
    AllPlans().then((res) => {
      setPlans(res);
    });
  }
  console.log(plans);
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
              {plans != null ? (
                <>
                  {plans.map((val) => {
                    return (
                      <>
                        <Grid
                          item
                          xs={12}
                          sm={6}
                          md={4}
                          lg={4}
                          key={val.id_plan}
                        >
                          <Card>
                            <CardContent className="pricing-card">
                              <Typography variant="body1">
                                {val.name}
                              </Typography>
                              <br />
                              <Typography variant="h3">
                                {val.price}€/mes
                              </Typography>
                              <Typography variant="body2">
                                (IVA INCLUDED)
                              </Typography>
                              <br />
                              <Typography variant="body1">
                                Unlimited Clases
                              </Typography>
                            </CardContent>
                          </Card>
                        </Grid>
                      </>
                    );
                  })}
                </>
              ) : (
                <>
                  <div className="divLoader">
                    <div className={classes.root} id="ball">
                      <CircularProgress />
                    </div>
                  </div>{" "}
                </>
              )}
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
