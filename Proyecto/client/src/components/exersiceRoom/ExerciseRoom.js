import NavPrivate from "../nav-private/Nav-Private";
import React, { useState, useEffect } from "react";
import "./ExerciseRoom.css";
import { Fade } from "react-reveal";
import { AllRooms } from "../../service/ExerciseRooms";
import Link from "react-router-dom/Link";
import {
  Typography,
  Backdrop,
  Card,
  CardContent,
  Grid,
} from "@material-ui/core/";
import serverURL from "../../utils/serverURL";
const url = serverURL;
const ExerciseRooms = () => {
  const [allRooms, setAllRooms] = useState(null);

  useEffect(() => {
    AllRooms().then((res) => {
      setAllRooms(res.data);
    });
  }, []);
  return (
    <>
      <NavPrivate></NavPrivate>
      {allRooms && (
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
                <Typography variant="h3">Exercise Rooms</Typography>
              </Grid>

              {allRooms.map((val) => {
                return (
                  <>
                    <Grid item xs={12} sm={6} md={4} lg={3} key={val.id_room}>
                      <Link to={`/exerciseRooms/${val.id_room}`}>
                        <Card className="cardImage">
                          <CardContent className="image-card">
                            <img
                              src={url + val.background_image}
                              alt="roomImage" className="imageCard"
                            />
                            <br />
                            <Typography variant="h5">{val.room_name}</Typography>
                          </CardContent>
                        </Card>
                      </Link>
                    </Grid>
                  </>
                );
              })}
            </Grid>
          </Fade>
        </>
      )}
    </>
  );
};

export default ExerciseRooms;
