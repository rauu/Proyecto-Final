import axios from "axios";
import serverURL from "../utils/serverURL"
const url = serverURL;

export const userUpdateProfile = (
  name,
  surname,
  username,
  email,
  dob,
  sex,
  userID
) => {
  return axios
    .put(url + "updateSettings/updateProfile", {
      name: name,
      surname: surname,
      username: username,
      email: email,
      dob: dob,
      sex: sex,
      userID: userID
    })
    .then((request, response) => {
      console.log(request);
      let userData = request.data;
      let newCookie = {
          dob: userData.dob,
          email: userData.email,
          id_user: userData.id_user,
          name: userData.name,
          role_user: userData.role_user,
          sex: userData.sex,
          surname: userData.surname,
          user: userData.user,
          username: userData.username,
      }
      sessionStorage.removeItem("user");
      sessionStorage.setItem("user", JSON.stringify(newCookie))
      console.log(newCookie)
      return request;
    });
};

export const userUpdatePassword = (
  password,
  userID
) => {
  return axios
    .put(url + "updateSettings/updatePassword", {
      password: password,
      userID: userID
    })
    .then((request, response) => {
      console.log(request);
      return request;
    });
};