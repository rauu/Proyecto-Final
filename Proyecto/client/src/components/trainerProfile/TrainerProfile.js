import NavPrivate from "../nav-private/Nav-Private";
import { Fade } from "react-reveal";
import {
     BrowserRouter as Router,
     Switch,
     Route,
     Link,
     useParams,
     useLocation
   } from "react-router-dom";

const TrainerProfile = () => {
     let { id } = useParams();
     const location = useLocation();
const pathname = location.pathname.substr(location.pathname.lastIndexOf("/")+1);

  return (
    <>
      <NavPrivate></NavPrivate>
      <br />
      <h1>{pathname}</h1>
    </>
  );
};

export default TrainerProfile;
