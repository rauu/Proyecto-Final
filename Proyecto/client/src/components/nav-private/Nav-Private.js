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
    }
    console.log(sessionStorage.getItem("user"));
  });
  const userInfo = JSON.parse(sessionStorage.getItem("user"));
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    }
  }
  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  const prueba = () =>{
       console.log("prueeba")
  }
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
            <ul className="navbar-nav ml-auto flex-nowrap ">
              <li className="nav-item px-3  background">
                {/* <LinkA
                  to="/dashboard"
                  className="nav-link links link_color"
                  color="secondary"
                >
                  {userInfo.name + " " + userInfo.surname}
                </LinkA> */}
                <div>
                  <div>
                    <LinkA
                      ref={anchorRef}
                      aria-controls={open ? "menu-list-grow" : undefined}
                      aria-haspopup="true"
                      onClick={handleToggle}
                      className="link_color"
                    >
                      {userInfo.name + " " + userInfo.surname}
                    </LinkA>
                    <Popper
                      open={open}
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
                            <ClickAwayListener onClickAway={handleClose}>
                              <MenuList
                                autoFocusItem={open}
                                id="menu-list-grow"
                                onKeyDown={handleListKeyDown}
                                color="primary"
                              >
                                <MenuItem onClick={handleClose}>
                                  My account
                                </MenuItem>
                                <MenuItem onClick={(event)=>{handleClose(event); prueba()}}>
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
            </ul>
          </div>
        </nav>
      )}
    </Typography>
  );
};

export default NavPrivate;
