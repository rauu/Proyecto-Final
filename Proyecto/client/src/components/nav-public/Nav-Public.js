import "./Nav-Public.css";
import logo from "../../assets/logo.png";
import "./Nav-Public.css";
import { Typography, Link, Button } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";

const Nav = () => {
  return (
    <Typography>
      <nav className="navbar navbar-expand-md nav">
        <div className="d-flex flex-grow-1">
          <a className="navbar-brand" href="#">
            <img src={logo} alt="logo" className="logo" />
          </a>
          <div className="w-100 text-right">
            <Button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#myNavbar7"
            >
              <MenuIcon
                color="primary"
                style={{ fontSize: 40 }}
                className="icon"
              ></MenuIcon>
            </Button>
          </div>
        </div>
        <div
          className="collapse navbar-collapse flex-grow-1 text-right"
          id="myNavbar7"
        >
          <ul className="navbar-nav ml-auto flex-nowrap ">
            <li className="nav-item px-3">
              <Link href="#" className="nav-link links" color="secondary">
                Pricing
              </Link>
            </li>
            <li className="nav-item px-3  background">
              <Link href="#" className="nav-link links link_color" color="secondary">
                Sign Up
              </Link>
            </li>
            <li className="nav-item px-3">
              <Link href="#" className="nav-link links" color="secondary">
                Sign In
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </Typography>
  );
};

export default Nav;
