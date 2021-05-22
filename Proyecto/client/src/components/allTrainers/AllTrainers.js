import "./AllTrainers.css";
import React, { useState, useEffect } from "react";
import NavPrivate from "../nav-private/Nav-Private";
import { Fade } from "react-reveal";
import { GetTrainers, GetSearchUsers } from "../../service/Trainers";
import {
  Typography,
  Grid,
  TextField,
  InputAdornment,
  Tooltip,
} from "@material-ui/core/";
import SearchRoundedIcon from "@material-ui/icons/SearchRounded";
import LinkA from "react-router-dom/Link";

const AllTrainers = () => {
  const [trainerList, setTrainerList] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState({
    userSearch: "",
  });

  React.useEffect(() => {
    console.log(trainerList);
    ourTrainers();
  }, []);

  function ourTrainers() {
    GetTrainers().then((res) => {
      setTrainerList(res.data);
      console.log(trainerList);
      console.log(res.data);
    });
  }
  const handleSearchUser = (event) => {
    setSearchValue({
      username: event.target.value,
    });
    console.log(searchValue);
    GetSearchUsers(event.target.value).then((res) => {
      setTrainerList(res.data);
    });
  };
  return (
    <>
      <NavPrivate></NavPrivate>
      <br />
      <Fade up>
        <div className="searchIcon">
          <TextField
            name="userSearch"
            variant="outlined"
            fullWidth
            id="userSearch"
            label="Search Trainers"
            onChange={handleSearchUser}
            InputProps={{
              startAdornment: (
                <InputAdornment position="end">
                  <Tooltip title="Trainers">
                    <SearchRoundedIcon edge="end"> </SearchRoundedIcon>
                  </Tooltip>
                </InputAdornment>
              ),
            }}
          />
        </div>
        <br />
        <br />
        <Grid
          container
          spacing={5}
          className="grid-center"
          alignItems="center"
          justify="center"
        >
          {trainerList !== undefined && (
            <>
              {trainerList.map((val) => {
                return (
                  <Grid item xs={12} sm={6} md={4} lg={3} key={val.id}>
                    <>
                      <div>
                        <LinkA
                          to={`trainer/${val.username}`}
                          className="a_link"
                        >
                          <img
                            src={`http://192.168.1.38:3001/${val.profile_image}`}
                            alt="profile_image"
                            className="profile_image"
                          />
                          <Typography variant="body">
                            {val.name} {val.surname}
                          </Typography>
                        </LinkA>
                      </div>
                    </>
                  </Grid>
                );
              })}
            </>
          )}
        </Grid>
      </Fade>
    </>
  );
};

export default AllTrainers;
