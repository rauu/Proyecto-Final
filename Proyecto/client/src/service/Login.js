import axios from "axios";
import serverURL from "../utils/serverURL";
const url = serverURL;
axios.defaults.withCredentials = true;

export const LoginUser = (username, password) => {
  return axios
    .post(url + "login/", {
      username: username,
      password: password,
    })
    .then((request, response) => {
      if (request.data.user === true) {
        sessionStorage.setItem("user", JSON.stringify(request.data));
        //history.push('/dashboard')

        return request.data.user;
      } else if (request.data.user === false) {
        return request.data.user;
      } else {
        return request.data;
      }
    });
};
