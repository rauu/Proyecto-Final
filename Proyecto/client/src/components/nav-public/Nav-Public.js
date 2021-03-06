import "./Nav-Public.css";
import logo from "../../assets/logo.png";
import "./Nav-Public.css";
import { Typography, Link, Button, AppBar } from "@material-ui/core";
import LinkA from "react-router-dom/Link";
import MenuRoundedIcon from "@material-ui/icons/MenuRounded";

const Nav = () => {
  return (
    <Typography component={"div"}>
      <nav className="navbar navbar-expand-md nav">
        <div className="d-flex flex-grow-1">
          <LinkA className="navbar-brand" to="/">
            <img src={logo} alt="logo" className="logo" />
          </LinkA>
          <div className="w-100 text-right">
            <Button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#myNavbar7"
            >
              <MenuRoundedIcon
                color="primary"
                style={{ fontSize: 40 }}
                className="icon"
              ></MenuRoundedIcon>
            </Button>
          </div>
        </div>
        <div
          className="collapse navbar-collapse flex-grow-1 text-right"
          id="myNavbar7"
        >
          <ul className="navbar-nav ml-auto flex-nowrap ">
            <li className="nav-item px-3">
            <LinkA
                to="/pricing"
                className="nav-link links"
                color="secondary"
              >
                Pricing
              </LinkA>
            </li>
            <li className="nav-item px-3  background">
              <LinkA
                to="/register"
                className="nav-link links link_color"
                color="secondary"
              >
                Sign Up
              </LinkA>
            </li>
            <li className="nav-item px-3">
              <LinkA
                to="/login"
                className="nav-link links"
                color="secondary"
              >
                Sign In
              </LinkA>
            </li>
          </ul>
        </div>
      </nav>
    </Typography>
  );
};

export default Nav;
