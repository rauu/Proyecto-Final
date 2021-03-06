import axios from "axios";
import serverURL from "../utils/serverURL";
const url = serverURL;

export const GetPDF = () => {
  return axios.get(url + "admin/").then((request, response) => {
    return request;
  });
};

export const registerUser = (
  name,
  lastname,
  username,
  email,
  dob,
  gender,
  password,
  typeUser
) => {
  return axios
    .post(url + "admin/registerUser", {
      name: name,
      lastname: lastname,
      username: username,
      email: email,
      dob: dob,
      gender: gender,
      password: password,
      typeUser: typeUser,
    })
    .then((request, response) => {
      return request;
    });
};

export const dataExists = (username, email) => {
  const params = {
    username: username,
    email: email,
  };
  const headers = { headers: { "Access-Control-Allow-Origin": "*" } };

  return axios
    .get("http://localhost:3001/users/", { params })
    .then((response) => {});
};

export const GetExersiceRooms = () => {
  return axios
    .get(url + "uploadVideo/getRooms", {})
    .then((request, response) => {
      return request.data;
      //sessionStorage.setItem("user", JSON.stringify(request.data))
      //history.push('/dashboard')
    });
};

export const CreateExerciseRoom = (roomName, backgroundImage) => {
  return axios
    .post(url + "admin/createRoom", {
      roomName: roomName,
      backgroundImage: backgroundImage,
    })
    .then((request, response) => {
      return request;
    });
};

export const DeleteExerciseRoom = async (roomName) => {
  const params = {
    roomName: roomName,
  };
  const request = await axios.delete(url + "admin/deleteRoom", { params });
  return request;
};

export const DeleteCV = async (id) => {
  const params = {
    id: id,
  };
  const request = await axios.delete(url + "admin/deleteCV", { params });
  return request;
};

export const GetAllUsers = () => {
  return axios.get(url + "admin/users", {}).then((request, response) => {
    return request;
  });
};

export const UpdateUserType = (id_user, role_user) => {
  return axios
    .put(url + "admin/updateUserType", {
      id_user: id_user,
      role_user: role_user,
    })
    .then((request, response) => {
      return request;
    });
};

export const DeleteUser = (id_user) => {
  const params = {
    id_user: id_user,
  };
  return axios
    .delete(url + "admin/deleteUser", {
      params,
    })
    .then((request, response) => {
      return request;
    });
};

export const GetSearchUsers = (username) => {
  const params = {
    username: username,
  };
  return axios
    .get(url + "admin/getsearchuser", {
      params,
    })
    .then((request, response) => {
      return request;
    });
};
