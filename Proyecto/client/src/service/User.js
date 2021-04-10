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
    .then((response) => {
      console.log(name);
    })
    .catch((error) => {
      console.log(error);
    });
};