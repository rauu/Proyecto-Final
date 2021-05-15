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
      console.log(request);
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
    .then((response) => {
      console.log(response);
    });
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
      console.log(request);
      return request;
    });
};

export const DeleteExerciseRoom = async (roomName) => {
  const params = {
    roomName: roomName,
  };
  const request = await axios.delete(url + "admin/deleteRoom", { params });
  console.log(request);
  return request;
};


export const GetAllUsers = () =>{
  return axios.get(url + "admin/users",{}).then((request, response) =>{
    console.log(request);
    return request;
  });
}