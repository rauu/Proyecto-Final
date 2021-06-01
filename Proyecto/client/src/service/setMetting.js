import axios from "axios";
import serverURL from "../utils/serverURL";
const url = serverURL;
const headers = {
  headers: {
    "content-type": "multipart/form-data",
  },
};

export const postMetting = (userID, message, subject) => {
  const headers = { headers: { "Access-Control-Allow-Origin": "*" } };

  return axios
    .post(url + "setMetting/", {
      userID: userID,
      message: message,
      subject: subject,
    })
    .then((response) => {
      return response;
    });
};
