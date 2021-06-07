import NavPrivate from "../nav-private/Nav-Private";
import React, { useState, useEffect } from "react";
import "./ExersiceRoomVideos.css";
import { Fade } from "react-reveal";
import { AllRooms } from "../../service/ExerciseRooms";
import { useLocation, useHistory, Link } from "react-router-dom";
import { AllVideos, roomName } from "../../service/ExerciseRoomVideo";
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
import serverURL from "../../utils/serverURL";
const url = serverURL;
const moment = require("moment-timezone");
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& > * + *": {
      marginLeft: theme.spacing(2),
    },
  },
}));

const ExerciseRoomVideo = () => {
  const classes = useStyles();
  const [videos, setVideos] = useState(null);
  const [room, setRoom] = useState(null);
  const userInfo = JSON.parse(sessionStorage.getItem("user"));
  const location = useLocation();
  const pathname = location.pathname.substr(
    location.pathname.lastIndexOf("/") + 1
  );

  useEffect(() => {
    AllVideos(userInfo.username, pathname).then((res) => {
      setVideos(res.data);
    });
    roomName(pathname).then((res) => {
      setRoom(res.data);
    });
  }, []);

  return (
    <>
      <NavPrivate></NavPrivate>
      {videos == null && (
        <>
          <div className="divLoader">
            <div className={classes.root} id="ball">
              <CircularProgress />
            </div>
          </div>
        </>
      )}

      {videos === false && (
        <>
          <NotFound></NotFound>
        </>
      )}

      {videos && room && (
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
                <Typography variant="h3">{room.room_name} Videos</Typography>
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
                                    src={url + val.video}
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

export default ExerciseRoomVideo;
