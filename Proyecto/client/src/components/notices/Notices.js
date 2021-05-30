import React from "react";
import "./Notices.css";
import NavPrivate from "../nav-private/Nav-Private";
import { Fade } from "react-reveal";
import Link from "react-router-dom/Link";
import { AllNotices } from "../../service/Notices";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import NotFound from "../notFound/NotFound";

import {
  Typography,
  Backdrop,
  Card,
  CardContent,
  Grid,
} from "@material-ui/core/";
const moment = require("moment-timezone");
var crypto = require("crypto"),
  algorithm = "aes-256-ctr",
  password = "d6F3Efeq";

  const useStyles = makeStyles((theme) => ({
    root: {
      display: "flex",
      "& > * + *": {
        marginLeft: theme.spacing(2),
      },
    },
  }));

const Notices = () => {
  const classes = useStyles();

  const [notices, setNotices] = React.useState(null);

  React.useEffect(() => {
    AllNotices().then((res) => {
      setNotices(res);
    });
  }, []);
  function decrypt(text) {
    var decipher = crypto.createDecipher(algorithm, password);
    var dec = decipher.update(text, "hex", "utf8");
    dec += decipher.final("utf8");
    return dec;
  }
  return (
    <>
      <NavPrivate></NavPrivate>

      {notices && (
        <>
          {/*           {new DOMParser().parseFromString(notices[0].content, "text/xml")}
           */}{" "}
          {}
        {/*   <div className="FUCK">
          {parse(decrypt(notices[0].content))}
          </div> */}
        </>
      )}
      {notices == null && (
        <>
          <div className="divLoader">
            <div className={classes.root} id="ball">
              <CircularProgress />
            </div>
          </div>
        </>
      )}

      {notices === false && (
        <>
          <NotFound></NotFound>
        </>
      )}

      {notices  && (
        <>
          {" "}
          <Fade up>
            <Grid
              container
              spacing={5}
              className="grid-center dashboardVideos"
              alignItems="center"
              justify="center"
            >
              <Grid item xs={12} sm={12} md={12} lg={12}>
                <Typography variant="h3">Latest Notices</Typography>
              </Grid>

              {notices && (
                <>
                  {notices.map((val) => {
                    return (
                      <>
                        <Grid
                          item
                          xs={12}
                          sm={6}
                          md={6}
                          lg={4}
                          key={val.id_news}
                        >
                          <Link to={`/notices/${val.id_news}`}>
                            <Card className="card">
                              <CardContent className="video-card">
                               {/*  <video
                                  onContextMenu={(e) => e.preventDefault()}
                                  className="video controls"
                                >
                                  <source
                                    src={`http://192.168.1.38:3001/${val.video}`}
                                  />
                                </video> */}
                                <img src={`http://192.168.1.38:3001/${val.image_uploded}`} alt={val.id_news} className="news-image"/>
                                <br />
                                <Typography variant="h5">
                                  {val.title}
                                </Typography>
                                <Typography variant="body2">
                                  {val.date_upload}
                                </Typography>
                              </CardContent>
                            </Card>
                          </Link>
                        </Grid>
                        <Grid
                          item
                          xs={12}
                          sm={6}
                          md={6}
                          lg={4}
                          key={val.id_news}
                        >
                          <Link to={`/notices/${val.id_news}`}>
                            <Card className="card">
                              <CardContent className="video-card">
                               {/*  <video
                                  onContextMenu={(e) => e.preventDefault()}
                                  className="video controls"
                                >
                                  <source
                                    src={`http://192.168.1.38:3001/${val.video}`}
                                  />
                                </video> */}
                                <img src={`http://192.168.1.38:3001/${val.image_uploded}`} alt={val.id_news} className="news-image"/>
                                <br />
                                <Typography variant="h5">
                                  {val.title}
                                </Typography>
                                <Typography variant="body2">
                                  {val.date_upload}
                                </Typography>
                              </CardContent>
                            </Card>
                          </Link>
                        </Grid>


                      </>
                    );
                  })}
                </>
              )}
            </Grid>
          </Fade>
        </>
      )}
    </>
  );
};

export default Notices;
