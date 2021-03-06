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
  Tooltip,
} from "@material-ui/core/";
import serverURL from "../../utils/serverURL";
const url = serverURL;
const moment = require("moment-timezone");

const DashBoard = () => {
  const [videos, setVideos] = React.useState(null);
  const userInfo = JSON.parse(sessionStorage.getItem("user"));

  /*   function getVideos() {
    AllVideos();
  } */

  React.useEffect(() => {
    AllVideos(userInfo.username, userInfo.id_user).then((res) => {
      setVideos(res.data);
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
                              <Tooltip title={<small style={{ fontSize: "14px" }}>{val.video_name}</small>}> 
                                <CardContent className="video-card">
                                  <video
                                    /*  onClick={(e) => e.preventDefault()} */
                                    onContextMenu={(e) => e.preventDefault()}
                                    className="video controls"
                                  >
                                    <source src={url + val.video} />
                                  </video>
                                  <br />
                                  <Typography variant="h5" noWrap>
                                    {val.video_name}
                                  </Typography>
                                  <Typography variant="body2">
                                    {moment(val.date_upload).format("DD.MM.YY")}
                                  </Typography>
                                </CardContent>
                              </Tooltip>
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
