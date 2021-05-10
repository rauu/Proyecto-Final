import axios from "axios";
import serverURL from "../utils/serverURL"
const url = serverURL;

export const changePassword = (
  email,
) => {
  return axios
    .put(url + "changePassword/", {
      email: email,
    })
    .then((request, response) => {
      console.log(request);
      return request;
    });
};