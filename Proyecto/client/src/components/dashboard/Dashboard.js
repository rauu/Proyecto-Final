import React from "react";
import { AllVideos } from "../../service/Dashboard";
import "./Dashboard.css";
import NavPrivate from "../nav-private/Nav-Private";
import { Fade } from "react-reveal";
import Link from "react-router-dom/Link";

import {
  Typography,
  Backdrop,
  Card,
  CardContent,
  Grid,
} from "@material-ui/core/";
const moment = require("moment-timezone");

const DashBoard = () => {
  const [videos, setVideos] = React.useState(null);
  const userInfo = JSON.parse(sessionStorage.getItem("user"));

  /*   function getVideos() {
    AllVideos();
  } */

  console.log(videos);

  React.useEffect(() => {
    AllVideos(userInfo.username,userInfo.id_user ).then((res) => {
      setVideos(res.data);
      console.log(videos);
    });
  }, []);
  return (
    <>
      <NavPrivate></NavPrivate>
      {videos && (
        <>
          <Fade up>
            <Grid
              container
              spacing={5}
              className="grid-center dashboardVideos"
              alignItems="center"
              justify="center"
            >
              <Grid item xs={12} sm={12} md={12} lg={12}>
                <Typography variant="h3">Latest Videos</Typography>
              </Grid>

              {videos && (
                <>
                  {videos.map((val) => {
                    return (
                      <>
                        <Grid
                          item
                          xs={12}
                          sm={6}
                          md={4}
                          lg={3}
                          key={val.id_video}
                        >
                          <Link to={`/video/${val.id_video}`}>
                          <Card className="card">
                            <CardContent className="video-card">
                              <video
                                /*  onClick={(e) => e.preventDefault()} */
                                onContextMenu={(e) => e.preventDefault()}
                                className="video controls"
                              >
                                <source
                                  src={`http://192.168.1.38:3001/${val.video}`}
                                />
                              </video>
                              <br />
                              <Typography variant="h5">
                                {val.video_name}
                              </Typography>
                              <Typography variant="body2">
                                {moment(val.date_upload).format("DD.MM.YY")}
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

export default DashBoard;
