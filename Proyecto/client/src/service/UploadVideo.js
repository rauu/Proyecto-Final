import axios from "axios";
axios.defaults.withCredentials = true;
const url = "http://localhost:3001/";

export const GetExersiceRooms = () => {
  return axios
    .get(url + "uploadVideo/getRooms", {})
    .then((request, response) => {
      return request.data;
      //sessionStorage.setItem("user", JSON.stringify(request.data))
      //history.push('/dashboard')
    });
};
export const UploadVideo = (
  videoName,
  videoDescription,
  videoType,
  videoRoom,
  video,
  id_user
) => {
  return axios
    .post(url + "uploadVideo/", {
      videoName: videoName,
      videoDescription: videoDescription,
      videoType: videoType,
      videoRoom: videoRoom,
      video: video,
      id_user: id_user,
    })
    .then((request, response) => {
      console.log(request);
      return request;
      //sessionStorage.setItem("user", JSON.stringify(request.data))
      //history.push('/dashboard')
    });
};
