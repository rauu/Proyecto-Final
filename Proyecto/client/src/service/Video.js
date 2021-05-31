import axios from "axios";
import serverURL from "../utils/serverURL";
const url = serverURL;

export const GetVideo = (idVideo, userId) => {
  let params = { idVideo: idVideo, userId: userId };
  return axios.get(url + "video/", { params }).then((request, response) => {
    console.log(request);
    return request.data;
  });
};
export const DeleteVideo = (idVideo) => {
  let params = { idVideo: idVideo };
  return axios.delete(url + "video/videoDelete", { params }).then((request, response) => {
    console.log(request);
    return request.data;
  });
};
