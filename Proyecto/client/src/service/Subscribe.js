import axios from "axios";
import serverURL from "../utils/serverURL";
const url = serverURL;
const headers = {
  headers: {
    "content-type": "multipart/form-data",
  },
};

export const GetPlans = () => {

  const headers = { headers: { "Access-Control-Allow-Origin": "*" } };

  return axios.get(url + "subscribe/getPlans").then((response) => {
    console.log(response);
    return response;
  });
};

export const dataExists = (username) => {
  const params = {
    username: username,
  };
  const headers = { headers: { "Access-Control-Allow-Origin": "*" } };

  return axios.get(url + "subscribe/trainerExists", { params }).then((response) => {
    console.log(response);
    return response;
  });
};