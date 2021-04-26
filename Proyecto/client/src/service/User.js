import axios from "axios";
const url = "http://192.168.1.48:3001/";

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

export const dataExists = (username, email) => {
  const params = {
    username: username,
    email: email,
  };
  const headers = { headers: { "Access-Control-Allow-Origin": "*" } };

  return axios.get("http://localhost:3001/users/", {params}).then((response)=>{
    console.log(response);
  });
};
