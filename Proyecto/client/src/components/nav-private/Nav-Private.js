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
} from "@material-ui/core";
import LinkA from "react-router-dom/Link";
import MenuRoundedIcon from "@material-ui/icons/MenuRounded";

const NavPrivate = () => {
  const history = useHistory();
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("user") === null) {
      history.push("/login");
    } else {
      setLoggedIn(true);
      console.log("ETNRAS")
    }
    console.log(sessionStorage.getItem("user"));
  });
  const userInfo = JSON.parse(sessionStorage.getItem("user"));
  const [openUser, setOpenUser] = React.useState(false);
  const [openAdmin, setOpenAdmin] = React.useState(false);
  const anchorRef = React.useRef(null);

  const handleToggleUser = () => {
    setOpenUser((prevOpen) => !prevOpen);
  };
  const handleToggleAdmin = () => {
    setOpenAdmin((prevOpen) => !prevOpen);
  };

  const handleCloseUser = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpenUser(false);
  };

  const handleCloseAdmin = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpenAdmin(false);
  };

  function handleListKeyDownUser(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpenUser(false);
    }
  }

  function handleListKeyDownAdmin(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpenAdmin(false);
    }
  }
  // return focus to the button when we transitioned from !open -> open
  const prevOpenUser = React.useRef(openUser);
  const prevOpenAdmin = React.useRef(openAdmin);
  React.useEffect(() => {
    if (prevOpenUser.current === true && openUser === false) {
      anchorRef.current.focus();
    }
    if (prevOpenAdmin.current === true && openAdmin === false) {
      anchorRef.current.focus();
    }


    prevOpenAdmin.current = openAdmin;
  }, [openAdmin]);

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
            <LinkA className="navbar-brand" to="/">
              <img src={logo} alt="logo" className="logo" />
            </LinkA>
          </div>
          <div
            className="collapse navbar-collapse flex-grow-1 text-right"
            id="myNavbar7"
          >
            <ul className="navbar-nav ml-auto flex-nowrap nav-pri-ul">
              <li className="nav-item px-3  background ">
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
                                <MenuItem onClick={handleCloseUser}>
                                  My account
                                </MenuItem>
                                {userInfo.role_user === "role_admin" && (
                                  <MenuItem onClick={handleCloseUser}>
                                    Admin
                                  </MenuItem>
                                )}

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

            {/*

              <li className="nav-item px-3  background nav-pri-li">
                <div>
                  <div>
                    <LinkA
                      ref={anchorRef}
                      aria-controls={openAdmin ? "menu-list-grow" : undefined}
                      aria-haspopup="true"
                      onClick={handleToggleAdmin}
                      className="link_color"
                    >
                     Admin
                    </LinkA>
                    <Popper
                      open={openAdmin}
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
                            <ClickAwayListener onClickAway={handleCloseAdmin}>
                              <MenuList
                                autoFocusItem={openAdmin}
                                id="menu-list-grow"
                                onKeyDown={handleListKeyDownAdmin}
                                color="primary"
                              >
                                

                                <MenuItem
                                  onClick={(event) => {
                                    handleCloseAdmin(event);
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
              </li> */}
            </ul>
          </div>
        </nav>
      )}
    </Typography>
  );
};

export default NavPrivate;
