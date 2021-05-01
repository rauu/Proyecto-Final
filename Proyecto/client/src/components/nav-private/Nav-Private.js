import logo from "../../assets/logo.png";
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import "./Nav-Private.css";
import {
  Typography,
  Link,
  Button,
  MenuItem,
  Menu,
  MenuList,
  Popper,
  Paper,
  Grow,
  ClickAwayListener,
  SwipeableDrawer,
  List,
  Divider,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
  Collapse,
} from "@material-ui/core";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import clsx from "clsx";

import LinkA from "react-router-dom/Link";
import NavLink from "react-router-dom/NavLink";
import MenuRoundedIcon from "@material-ui/icons/MenuRounded";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import StarBorderRoundedIcon from "@material-ui/icons/StarBorderRounded";
const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: "auto",
  },
  paper: {},
});

const NavPrivate = () => {
  const classes = useStyles();
  const history = useHistory();
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("user") === null) {
      history.push("/login");
    } else {
      setLoggedIn(true);
    }
  });

  const userInfo = JSON.parse(sessionStorage.getItem("user"));
  const [openUser, setOpenUser] = React.useState(false);
  const [openAdmin, setOpenAdmin] = React.useState(false);
  const [openTrainer, setOpenTrainer] = React.useState(false);
  const anchorRef = React.useRef(null);

  const [state, setState] = React.useState({
    left: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };
  const handleAdminClick = () => {
    setOpenAdmin(!openAdmin);
  };
  const handleTrainerClick = () => {
    setOpenTrainer(!openTrainer);
  };

  const handleToggleUser = () => {
    setOpenUser((prevOpen) => !prevOpen);
  };

  const handleCloseUser = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpenUser(false);
  };

  function handleListKeyDownUser(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpenUser(false);
    }
  }

  const logOut = () => {
    console.log("prueeba");
    sessionStorage.removeItem("user");
    history.push("/login");
  };
  return (
    <Typography component={"div"}>
      {loggedIn && (
        <nav className="navbar navbar-expand nav">
          <div className="d-flex flex-grow-1">
            <LinkA  className="navbar-brand" to="/dashboard">
              <img src={logo} alt="logo" className="logo" />
            </LinkA>
          </div>
          <div
            className="collapse navbar-collapse flex-grow-1 text-right"
            id="myNavbar7"
          >
            <ul className="navbar-nav ml-auto flex-nowrap nav-pri-ul">
              <li className="nav-item px-3" id="background">
                <div>
                  <div>
                    <LinkA
                      ref={anchorRef}
                      aria-controls={openUser ? "menu-list-grow" : undefined}
                      aria-haspopup="true"
                      onClick={handleToggleUser}
                      className="link_color"
                    >
                      {userInfo.username}
                    </LinkA>
                    <Popper
                      open={openUser}
                      anchorEl={anchorRef.current}
                      role={undefined}
                      transition
                      disablePortal
                    >
                      {({ TransitionProps, placement }) => (
                        <Grow
                          {...TransitionProps}
                          style={{
                            transformOrigin:
                              placement === "bottom"
                                ? "center top"
                                : "center bottom",
                          }}
                        >
                          <Paper>
                            <ClickAwayListener onClickAway={handleCloseUser}>
                              <MenuList
                                autoFocusItem={openUser}
                                id="menu-list-grow"
                                onKeyDown={handleListKeyDownUser}
                                color="primary"
                              >
                                {userInfo.role_user === "role_trainer" && (
                                  <MenuItem onClick={handleCloseUser}>
                                    My Profile
                                  </MenuItem>
                                )}

                                <MenuItem onClick={handleCloseUser}>
                                  My account
                                </MenuItem>
                                <MenuItem
                                  onClick={(event) => {
                                    handleCloseUser(event);
                                    logOut();
                                  }}
                                >
                                  Logout
                                </MenuItem>
                              </MenuList>
                            </ClickAwayListener>
                          </Paper>
                        </Grow>
                      )}
                    </Popper>
                  </div>
                </div>
              </li>
              <li>
                <div>
                  {["left"].map((anchor) => (
                    <React.Fragment key={anchor}>
                      <Button onClick={toggleDrawer(anchor, true)}>
                        <MenuRoundedIcon
                          color="primary"
                          style={{ fontSize: 40 }}
                          className="icon"
                        ></MenuRoundedIcon>
                      </Button>
                      <SwipeableDrawer
                        classes={{ paper: classes.paper }}
                        anchor={anchor}
                        open={state[anchor]}
                        onClose={toggleDrawer(anchor, false)}
                        onOpen={toggleDrawer(anchor, true)}
                      >
                        <div className="">
                          <div
                            className={clsx(classes.list, {
                              [classes.fullList]:
                                anchor === "top" || anchor === "bottom",
                            })}
                            role="presentation"
                            onKeyDown={toggleDrawer(anchor, false)}
                          >
                            <List>
                              <ListItem button>
                                <LinkA className="navbar-brand" to="/dashboard">
                                  <img src={logo} alt="logo" className="logo" />
                                </LinkA>
                              </ListItem>
                              <br />
                              <NavLink
                                className="navbar-brand dashboard-link"
                                to="/dashboard" activeClassName="selected"
                              >
                                <ListItem button className="list">
                                  <ListItemText>DashBoard</ListItemText>
                                </ListItem>
                              </NavLink>

                              <Divider />
                              <ListItem button className="list">
                                <ListItemText>Your Videos</ListItemText>
                              </ListItem>
                              <Divider />
                              <ListItem button className="list">
                                <ListItemText>Our Trainers</ListItemText>
                              </ListItem>
                              <Divider />
                              <LinkA
                                className="navbar-brand dashboard-link"
                                to="/notices"
                              >
                                <ListItem button className="list">
                                  <ListItemText>Notices</ListItemText>
                                </ListItem>
                              </LinkA>

                              <Divider />
                              {userInfo.role_user === "role_admin" && (
                                <>
                                  <ListItem
                                    button
                                    className="list"
                                    onClick={handleAdminClick}
                                  >
                                    <ListItemText>Admin</ListItemText>
                                    {openAdmin ? (
                                      <ExpandLess />
                                    ) : (
                                      <ExpandMore />
                                    )}
                                  </ListItem>
                                  <Collapse
                                    in={openAdmin}
                                    timeout="auto"
                                    unmountOnExit
                                  >
                                    <List component="div" disablePadding>
                                      <ListItem
                                        button
                                        className="dashboard-link"
                                      >
                                        <ListItemText>
                                          Cosas de admin
                                        </ListItemText>
                                      </ListItem>
                                    </List>
                                  </Collapse>
                                </>
                              )}

                              <Divider />
                              {(userInfo.role_user === "role_trainer" ||
                                userInfo.role_user === "role_admin") && (
                                <>
                                  <ListItem
                                    button
                                    className="list"
                                    onClick={handleTrainerClick}
                                  >
                                    <ListItemText>Trainer</ListItemText>
                                    {openTrainer ? (
                                      <ExpandLess />
                                    ) : (
                                      <ExpandMore />
                                    )}
                                  </ListItem>
                                  <Collapse
                                    in={openTrainer}
                                    timeout="auto"
                                    unmountOnExit
                                  >
                                    <List component="div" disablePadding>
                                      <LinkA
                                        className="navbar-brand dashboard-link"
                                        to="/uploadvideos"
                                      >
                                        <ListItem
                                          button
                                          className="dashboard-link"
                                        >
                                          <ListItemText>
                                            Upload Videos
                                          </ListItemText>
                                        </ListItem>
                                      </LinkA>
                                    </List>
                                  </Collapse>
                                </>
                              )}
                            </List>
                          </div>
                        </div>
                      </SwipeableDrawer>
                    </React.Fragment>
                  ))}
                </div>
              </li>
            </ul>
          </div>
        </nav>
      )}
    </Typography>
  );
};

export default NavPrivate;
