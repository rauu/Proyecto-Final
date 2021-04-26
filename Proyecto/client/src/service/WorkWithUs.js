import axios from "axios";
const headers = {
  headers: {
    "content-type": "multipart/form-data",
  },
};
const url = "http://192.168.1.48:3001/";
export const submitCV = (name, lastname, email, message, file) => {
  const cv = new FormData();
  cv.append("file", file);
  console.log(cv);
  return axios
    .post(url + "workwithus/", {
      name: name,
      lastname: lastname,
      email: email,
      message: message,
      file: file,
    })
    .then((request, response) => {
      console.log(file);
      return request;
    });
};
