import axios from "axios";

export const LoginUser = (
  username,
  password
) => {
  return axios.post("http://localhost:3001/login/", {
      username: username,
      password: password
    })
    .then((request, response) => {
      console.log(request);
      return request;
    })
};
