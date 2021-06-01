import axios from "axios";
import serverURL from "../utils/serverURL";
const url = serverURL;
const headers = {
  headers: {
    "content-type": "multipart/form-data",
  },
};
export const GetTrainers = () => {
  return axios.get(url + "allTrainers/", {}).then((request, response) => {
    return request;
  });
};

export const GetSearchUsers = (username) => {
  const params = {
    username: username,
  };
  return axios
    .get(url + "allTrainers/getsearchuser", {
      params,
    })
    .then((request, response) => {
      return request;
    });
};
