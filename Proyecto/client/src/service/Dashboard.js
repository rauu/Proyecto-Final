import axios from "axios";
import serverURL from "../utils/serverURL"
const url = serverURL;

export const AllVideos = () => {
  return axios
    .get( url + "dashboard/")
    .then((request, response) => {
      return request;
    });
};