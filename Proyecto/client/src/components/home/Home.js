import Nav from "./../nav-public/Nav-Public";
import "./Home.css";
import Carousel3 from "../../assets/Carousel3.png";
import Carousel2 from "../../assets/Carousel2.png";
import Carousel1 from "../../assets/Carousel1.png";
import Carousel4 from "../../assets/Carousel4.png";
import Fitness1 from "../../assets/fitness.png";
import Fitness2 from "../../assets/fitness-1.png";
import Fitness3 from "../../assets/fitness-2.png";
import Fitness4 from "../../assets/fitness-3.png";
import Fitness5 from "../../assets/fitness-4.png";
import Fitness6 from "../../assets/fitness-5.png";
import Person1 from "../../assets/raunak.png";
import Person2 from "../../assets/person.png";

import { Typography, Grid } from "@material-ui/core";
import Slide from "react-reveal/Slide";
import Fade from "react-reveal/Fade";
import Footer from "../Footer/Footer";

import DirectionsRunRoundedIcon from "@material-ui/icons/DirectionsRunRounded";
import MusicVideoRoundedIcon from "@material-ui/icons/MusicVideoRounded";
import GroupRoundedIcon from "@material-ui/icons/GroupRounded";
import LocalOfferRoundedIcon from "@material-ui/icons/LocalOfferRounded";
import ScheduleRoundedIcon from "@material-ui/icons/ScheduleRounded";
import TimelineRoundedIcon from "@material-ui/icons/TimelineRounded";
import PauseCircleFilledRoundedIcon from "@material-ui/icons/PauseCircleFilledRounded";

const Home = () => {
  return (
    <div className="home">
      <Nav className="nav"></Nav>
      <Slide right>
        <div className="imageCarousel scroll">
          <div
            id="carouselExampleIndicators"
            className="carousel slide"
            data-ride="carousel"
            data-interval="10000"
          >
            <ol className="carousel-indicators">
              <li
                data-target="#carouselExampleIndicators"
                data-slide-to="0"
                className="active"
              ></li>
              <li
                data-target="#carouselExampleIndicators"
                data-slide-to="1"
              ></li>
              <li
                data-target="#carouselExampleIndicators"
                data-slide-to="2"
              ></li>
              <li
                data-target="#carouselExampleIndicators"
                data-slide-to="3"
              ></li>
            </ol>
            <div className="carousel-inner">
              <div className="carousel-item active">
                <img
                  src={Carousel1}
                  className="d-block w-100 image"
                  alt={Carousel1}
                />
              </div>
              <div className="carousel-item">
                <img
                  src={Carousel2}
                  className="d-block w-100"
                  alt={Carousel2}
                />
              </div>
              <div className="carousel-item">
                <img
                  src={Carousel3}
                  className="d-block w-100"
                  alt={Carousel3}
                />
              </div>
              <div className="carousel-item">
                <img
                  src={Carousel4}
                  className="d-block w-100"
                  alt={Carousel4}
                />
              </div>
            </div>
            <a
              className="carousel-control-prev"
              href="#carouselExampleIndicators"
              role="button"
              data-slide="prev"
            >
              <span
                className="carousel-control-prev-icon color"
                aria-hidden="true"
              ></span>
              <span className="sr-only">Previous</span>
            </a>
            <a
              className="carousel-control-next"
              href="#carouselExampleIndicators"
              role="button"
              data-slide="next"
            >
              <span
                className="carousel-control-next-icon"
                aria-hidden="true"
              ></span>
              <span className="sr-only">Next</span>
            </a>
          </div>
        </div>
      </Slide>

      <div className="second-compo scroll">
        <br />
        <br />
        <br />
        <Slide right>
          <Typography variant="h1" color="secondary">
            Online Gym - Fitness and Nutrition
          </Typography>
          <br />
          <Grid container spacing={2}>
            <Grid item xs={12} md={6} lg={4}>
              <div className="grid-compo">
                <DirectionsRunRoundedIcon
                  color="primary"
                  style={{ fontSize: 100 }}
                  className="icon"
                ></DirectionsRunRoundedIcon>
                <br />
                <br />
                <Typography variant="h4" color="secondary">
                  Multi-activity
                </Typography>
                <br />
                <Typography variant="body1">
                  Combine running, fitness, indoor cycling, Pilates, yoga or
                  dancefit activities and other experiences
                </Typography>
              </div>
            </Grid>

            <Grid item xs={12} md={6} lg={4}>
              <div className="grid-compo">
                <MusicVideoRoundedIcon
                  color="primary"
                  style={{ fontSize: 100 }}
                  className="icon"
                ></MusicVideoRoundedIcon>
                <br />
                <br />
                <Typography variant="h4" color="secondary">
                  Video + Music
                </Typography>
                <br />
                <Typography variant="body1">
                  Video classes of the highest quality and realism and with the
                  best music
                </Typography>
              </div>
            </Grid>

            <Grid item xs={12} md={12} lg={4}>
              <div className="grid-compo">
                <GroupRoundedIcon
                  color="primary"
                  style={{ fontSize: 100 }}
                  className="icon"
                ></GroupRoundedIcon>
                <br />
                <br />
                <Typography variant="h4" color="secondary">
                  Personal trainers
                </Typography>
                <br />
                <Typography variant="body1">
                  Train with the coach you like
                </Typography>
              </div>
            </Grid>
          </Grid>
        </Slide>
        <br />
        <br />
        <br />
      </div>

      <div className="third-campo">
        <br />
        <br />
        <br />
        <Slide right>
          <Typography variant="h1" className="white">
            Running, ciclo indoor, fitness, yoga, pilates, dancefit…
          </Typography>
          <br />
          <Grid container spacing={2} className="grid-center">
            <Grid item xs={12} sm={6} md lg>
              <div className="grid-compo">
                <LocalOfferRoundedIcon
                  style={{ fontSize: 100 }}
                  className="icon"
                ></LocalOfferRoundedIcon>
                <br />
                <Typography variant="body1" className="white">
                  Discover classes, challenges and eating guidelines
                </Typography>
              </div>
            </Grid>

            <Grid item xs={12} sm={6} md lg>
              <div className="grid-compo">
                <ScheduleRoundedIcon
                  style={{ fontSize: 100 }}
                  className="icon"
                ></ScheduleRoundedIcon>
                <br />
                <Typography variant="body1" className="white">
                  Discover classes, challenges and eating guidelines
                </Typography>
              </div>
            </Grid>

            <Grid item xs={12} sm={6} md lg>
              <div className="grid-compo">
                <TimelineRoundedIcon
                  style={{ fontSize: 100 }}
                  className="icon"
                ></TimelineRoundedIcon>
                <br />
                <Typography variant="body1" className="white">
                  For all levels. Select your goal
                </Typography>
              </div>
            </Grid>
            <Grid item xs={12} sm={6} md lg>
              <div className="grid-compo">
                <PauseCircleFilledRoundedIcon
                  style={{ fontSize: 100 }}
                  className="icon"
                ></PauseCircleFilledRoundedIcon>
                <br />
                <Typography variant="body1" className="white">
                  Pause and resume your class whenever you want
                </Typography>
              </div>
            </Grid>
          </Grid>
        </Slide>
        <br />
        <br />
        <br />
      </div>

      <div className="forth-compo">
        <Slide left>
          <Typography variant="h1" color="secondary">
            Do your favorite activities
          </Typography>
          <br />
          <Grid container spacing={2} className="grid-center">
            <Grid item xs={12} sm={6} md={4} lg={4}>
              <div className="grid-compo">
                <img src={Fitness1} alt={Fitness1} className="image-fitness" />
                <br />
                <Typography variant="h5">Running</Typography>
              </div>
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={4}>
              <div className="grid-compo">
                <img src={Fitness2} alt={Fitness2} className="image-fitness" />
                <br />
                <Typography variant="h5">Pilates</Typography>
              </div>
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={4}>
              <div className="grid-compo">
                <img src={Fitness3} alt={Fitness3} className="image-fitness" />
                <br />
                <Typography variant="h5">Fitness</Typography>
              </div>
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={4}>
              <div className="grid-compo">
                <img src={Fitness4} alt={Fitness4} className="image-fitness" />
                <br />
                <Typography variant="h5">Abs</Typography>
              </div>
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={4}>
              <div className="grid-compo">
                <img src={Fitness5} alt={Fitness5} className="image-fitness" />
                <br />
                <Typography variant="h5">Indoor cycle</Typography>
              </div>
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={4}>
              <div className="grid-compo">
                <img src={Fitness6} alt={Fitness6} className="image-fitness" />
                <br />
                <Typography variant="h5">Yoga</Typography>
              </div>
            </Grid>
          </Grid>
        </Slide>
        <br />
        <br />
        <br />
      </div>
      <hr />
      <div className="fifth-compo">
        <br />
        <br />
        <br />
        <Fade top>
          <Typography variant="h1">See what our fans says:</Typography>
        </Fade>
        <br />
        <br />
        <Fade bottom>
          <Grid container spacing={2} className="grid-center">
            
            <Grid item xs={12} sm={12} md={6} lg={6}>
              <div className="grid-compo">
                <Grid container spacing={0} className="grid-center">
                  <Grid item xs={12} sm={12} md={6} lg={6}>
                    <div className="comment-inline">
                      <img
                        src={Person1}
                        alt={Person1}
                        className="comment-image"
                      />
                    </div>
                  </Grid>
                  <Grid item xs={12} sm={12} md={6} lg={6}>
                    <div className="comment-text">
                      <Typography variant="body1" className="comment-text">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Cras commodo ornare eros sed semper. Aliquam at tortor
                        laoreet, laoreet lorem id, vehicula leo.
                      </Typography>
                      <br />
                      <Typography variant="body1">
                        Lorem ipsum - Lorem
                      </Typography>
                    </div>
                  </Grid>
                </Grid>
              </div>
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6}>
              <div className="grid-compo">
                <Grid container spacing={0} className="grid-center">
                  <Grid item xs={12} sm={12} md={6} lg={6}>
                    <div className="comment-inline">
                      <img
                        src={Person2}
                        alt={Person2}
                        className="comment-image"
                      />
                    </div>
                  </Grid>
                  <Grid item xs={12} sm={12} md={6} lg={6}>
                    <div className="comment-text">
                      <Typography variant="body1" className="comment-text">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Cras commodo ornare eros sed semper. Aliquam at tortor
                        laoreet, laoreet lorem id, vehicula leo.
                      </Typography>
                      <br />
                      <Typography variant="body1">
                        Lorem ipsum - Lorem
                      </Typography>
                    </div>
                  </Grid>
                </Grid>
              </div>
            </Grid>
          </Grid>
        </Fade>
        <br />
        <br />
        <br />
      </div>
      <Footer></Footer>
    </div>
  );
};

export default Home;
