import Nav from './../nav-public/Nav-Public';
import "./Home.css";

import {Typography} from "@material-ui/core";

const Home = () => {
     return ( 
          <div className="home">
               <Nav className="nav"></Nav>
               <Typography variant="h1" color="secondary">PUBLIC HOME</Typography>
          </div>
      );
}
 
export default Home;