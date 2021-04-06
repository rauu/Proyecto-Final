import "./Register.css";
import logo from "../../assets/logo.png";
import { Typography, Link, Button } from "@material-ui/core";
import LinkA from "react-router-dom/Link";

const Register = () => {
  return (
    <div className="register">
      <Typography component={"div"}>
        <nav className="navbar navbar-expand nav">
          <div className="d-flex flex-grow-1">
            <a className="navbar-brand" href="#">
              <img src={logo} alt="logo" className="logo" />
            </a>
          </div>
          <div className="collapse navbar-collapse flex-grow-1 text-right">
            <ul className="navbar-nav ml-auto flex-nowrap ">
              <li className="nav-item px-3">
                <Link href="#" className="nav-link links" color="secondary">
                  Sign In
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      </Typography>
      <div className="register-first">
        <br/>
        <Typography variant="h2" className="white">YOUR CHANGE BEGINS HERE</Typography>
        <Typography variant="h5" className="white">Body, Mind and Nutrition</Typography>
        <br/>
      </div>
    </div>
  );
};

export default Register;
