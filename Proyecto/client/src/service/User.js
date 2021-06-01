import axios from "axios";
import serverURL from "../utils/serverURL";
const url = serverURL;

export const registerUser = (
  name,
  lastname,
  username,
  email,
  dob,
  gender,
  password
) => {
  return axios
    .post(url + "users/", {
      name: name,
      lastname: lastname,
      username: username,
      email: email,
      dob: dob,
      gender: gender,
      password: password,
    })
    .then((request, response) => {
      console.log(request);
      return request;
    });
};

export const getUser = (username) => {
  const params = {
    username: username,
  };
  console.log(username);
  const headers = { headers: { "Access-Control-Allow-Origin": "*" } };

  return axios.get(url + "users/getUser/", { params }).then((response) => {
    return response;
  });
};
export const getEmail = (email) => {
  const params = {
    email: email,
  };
  const headers = { headers: { "Access-Control-Allow-Origin": "*" } };

  return axios.get(url + "users/getEmail/", { params }).then((response) => {
    return response;
  });
};
