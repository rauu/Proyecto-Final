import axios from "axios";
import serverURL from "../utils/serverURL";
const url = serverURL;

export const AllRooms = () => {
  return axios.get(url + "exerciseRooms/").then((request, response) => {
    return request;
  });
};
