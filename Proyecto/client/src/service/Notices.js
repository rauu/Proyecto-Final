import axios from "axios";
import serverURL from "../utils/serverURL";
const url = serverURL;

export const AllNotices = () => {
  return axios.get(url + "notices/").then((request, response) => {
    return request.data;
  });
};
