import axios from "axios";
import serverURL from "../utils/serverURL";
const url = serverURL;

export const AllVideos = (username) => {
  const params = { username: username };
  return axios.get(url + "dashboard/", { params }).then((request, response) => {
    return request;
  });
};
