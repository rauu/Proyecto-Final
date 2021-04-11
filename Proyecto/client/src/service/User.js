import axios from "axios";

export const registerUser = (
  name,
  lastname,
  username,
  email,
  dob,
  gender,
  password
) => {
  return axios.post("http://localhost:3001/users/storeuser", {
      name: name,
      lastname: lastname,
      username: username,
      email: email,
      dob: dob,
      gender: gender,
      password: password
    })
    .then((request, response) => {
      console.log(request);
      return request;
    })
};
