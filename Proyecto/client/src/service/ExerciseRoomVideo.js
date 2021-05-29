import axios from "axios";
import serverURL from "../utils/serverURL";
const url = serverURL;

export const AllVideos = (username, idRoom) => {
  const params = { username: username, idRoom: idRoom };
  return axios
    .get(url + "exerciseRoomVideo/", { params })
    .then((request, response) => {
      console.log(request);
      return request;
    });
};
export const roomName = (idRoom) => {
  const params = { idRoom: idRoom };
  return axios
    .get(url + "exerciseRoomVideo/roomName", { params })
    .then((request, response) => {
      console.log(request);
      return request;
    });
};
