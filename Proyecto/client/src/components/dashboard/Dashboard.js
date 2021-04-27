import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import MailIcon from "@material-ui/icons/Mail";
import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import logo from "../../assets/logo.png";
import LinkA from "react-router-dom/Link";
import {Router, Switch, Route} from "react-router-dom";
import "./Dashboard.css";
import {
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

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

function SideMenu(props) {
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

  const { window } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  useEffect(() => {
    if (sessionStorage.getItem("user") === null) {
      history.push("/login");
    } else {
      setLoggedIn(true);
    }
  });
  const [loggedIn, setLoggedIn] = useState(false);
  const history = useHistory();
  const user = JSON.parse(sessionStorage.getItem("user"));

  const drawer = (
    <div >
      {/*  <LinkA className="navbar-brand" to="/">
        <img src={logo} alt="logo" className="logo"  />
      </LinkA> */}
      <div className={classes.toolbar} />

      <Divider />
      <List>
        <LinkA to="/about">
        <ListItem button>
          <ListItemText> Subscriptions</ListItemText>
        </ListItem>
        </LinkA>
        <ListItem button>
          <ListItemText> All Videos</ListItemText>
        </ListItem>
        <ListItem button>
          <ListItemText> Trainers</ListItemText>
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem button>
          <ListItemText> Profile</ListItemText>
        </ListItem>
      </List>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <div className={classes.root} >
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar} >
        <Toolbar className="nav-top" >
          <IconButton
            color="primary"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon size="large" />
          </IconButton>
          <div className="nav-right">
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
                        placement === "bottom" ? "center top" : "center bottom",
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
                            <MenuItem onClick={handleCloseUser}>Admin</MenuItem>
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
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders" >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css" className="prueba">
          <Drawer 
            container={container}
            variant="temporary"
            anchor={theme.direction === "rtl" ? "right" : "left"}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer 
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Typography paragraph>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Rhoncus
          dolor purus non enim praesent elementum facilisis leo vel. Risus at
          ultrices mi tempus imperdiet. Semper risus in hendrerit gravida rutrum
          quisque non tellus. Convallis convallis tellus id interdum velit
          laoreet id donec ultrices. Odio morbi quis commodo odio aenean sed
          adipiscing. Amet nisl suscipit adipiscing bibendum est ultricies
          integer quis. Cursus euismod quis viverra nibh cras. Metus vulputate
          eu scelerisque felis imperdiet proin fermentum leo. Mauris commodo
          quis imperdiet massa tincidunt. Cras tincidunt lobortis feugiat
          vivamus at augue. At augue eget arcu dictum varius duis at consectetur
          lorem. Velit sed ullamcorper morbi tincidunt. Lorem donec massa sapien
          faucibus et molestie ac.
        </Typography>
        <Typography paragraph>
          Consequat mauris nunc congue nisi vitae suscipit. Fringilla est
          ullamcorper eget nulla facilisi etiam dignissim diam. Pulvinar
          elementum integer enim neque volutpat ac tincidunt. Ornare suspendisse
          sed nisi lacus sed viverra tellus. Purus sit amet volutpat consequat
          mauris. Elementum eu facilisis sed odio morbi. Euismod lacinia at quis
          risus sed vulputate odio. Morbi tincidunt ornare massa eget egestas
          purus viverra accumsan in. In hendrerit gravida rutrum quisque non
          tellus orci ac. Pellentesque nec nam aliquam sem et tortor. Habitant
          morbi tristique senectus et. Adipiscing elit duis tristique
          sollicitudin nibh sit. Ornare aenean euismod elementum nisi quis
          eleifend. Commodo viverra maecenas accumsan lacus vel facilisis. Nulla
          posuere sollicitudin aliquam ultrices sagittis orci a.
        </Typography>
      </main>
    </div>
  );
}

SideMenu.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default SideMenu;
