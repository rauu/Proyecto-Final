import { Typography } from "@material-ui/core";
import "./NotFound.css"
import notFound from "../../assets/notFound.svg";


const NotFound = () => {
  return (
    <div className="notFound">
      <Typography component={"div"}>
        <img src={notFound} alt="notFound" className="notFoundImage"/>
        <Typography variant="h4">Requested page hasen't been found</Typography>
      </Typography>
    </div>
  );
};

export default NotFound;
