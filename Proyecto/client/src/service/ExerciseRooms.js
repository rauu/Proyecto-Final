import axios from "axios";
import serverURL from "../utils/serverURL";
const url = serverURL;

export const AllRooms = () => {
  return axios.get(url + "exersiceRooms/").then((request, response) => {
    console.log(request);
    return request;
  });
};
