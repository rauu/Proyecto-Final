import axios from "axios";
const headers = {
  headers: {
    "content-type": "multipart/form-data",
  },
};
export const submitCV = (name, lastname, email, message, file) => {
     const cv = new FormData()
     cv.append('file', file)
     console.log(cv)
  return axios
    .post(
      "http://localhost:3001/workwithus/",
      {
        name: name,
        lastname: lastname,
        email: email,
        message: message,
        file: file,
      }
    )
    .then((request, response) => {
      console.log(file);
      return request;
    });
};
