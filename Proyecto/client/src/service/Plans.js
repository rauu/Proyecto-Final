import axios from "axios";
import serverURL from "../utils/serverURL";
const url = serverURL;
const headers = {
  headers: {
    "content-type": "multipart/form-data",
  },
};

export const AllPlans = () => {
  const headers = { headers: { "Access-Control-Allow-Origin": "*" } };

  return axios.get(url + "plans/").then((response) => {
    return response.data;
  });
};
