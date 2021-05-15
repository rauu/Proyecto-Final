import React from "react";
import { AllVideos } from "../../service/Dashboard";
import "./Dashboard.css";
import NavPrivate from "../nav-private/Nav-Private";
const DashBoard = () => {
  const [videos, setVideos] = React.useState(null);
  /*   function getVideos() {
    AllVideos();
  } */

  console.log(videos);

  React.useEffect(() => {
    AllVideos().then((res) => {
      setVideos(res.data);
      console.log(videos);
    });
  }, []);
  return (
    <>
      <NavPrivate></NavPrivate>
      {videos && (
        <>
          <h1>{videos[0].video}</h1>

          {videos.map((video) => {
            return (
              <div className="videos-dashboard" key={video.id_video}>
                <video controls className="video">
                <source src={`http://192.168.1.38:3001/${video.video}`} />
              </video>
                
              </div>
            );
          })}
        </>
      )}
    </>
  );
};

export default DashBoard;
