import axios from "axios";
import serverURL from "../utils/serverURL";
const url = serverURL;
const headers = {
  headers: {
    "content-type": "multipart/form-data",
  },
};

export const dataExists = (username) => {
  const params = {
    username: username,
  };
  const headers = { headers: { "Access-Control-Allow-Origin": "*" } };

  return axios.get(url + "trainer/", { params }).then((response) => {
    return response;
  });
};

export const updateProfile = (id_user, profileImage, description) => {
  const headers = { headers: { "Access-Control-Allow-Origin": "*" } };

  return axios
    .put(url + "trainer/", {
      id: id_user,
      profileImage: profileImage,
      description: description,
    })
    .then((response) => {
      return response;
    });
};

export const userSubscribed = (id_user, trainerName) => {
  const headers = { headers: { "Access-Control-Allow-Origin": "*" } };

  const params = {
    id_user: id_user,
    trainerName: trainerName,
  };
  return axios
    .get(url + "trainer/userSubscribed", {
      params,
    })
    .then((response) => {
      return response;
    });
};
