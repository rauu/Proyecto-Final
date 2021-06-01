import axios from "axios";
import serverURL from "../utils/serverURL";
const url = serverURL;

export const AllVideos = (username, idTrainer) => {
  const params = { username: username, idTrainer: idTrainer};
  return axios.get(url + "dashboard/", { params }).then((request, response) => {
    return request;
  });
};
