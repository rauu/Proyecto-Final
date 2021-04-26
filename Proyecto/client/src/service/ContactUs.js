import axios from "axios";
const url = "http://192.168.1.48:3001/";

const headers = {
  headers: {
    "content-type": "multipart/form-data",
  },
};
export const Contact = (name, lastname, email, message, number) => {
  return axios
    .post( url + "contactUs/", {
      name: name,
      lastname: lastname,
      email: email,
      message: message,
      number: number,
    })
    .then((request, response) => {
      return request;
    });
};
