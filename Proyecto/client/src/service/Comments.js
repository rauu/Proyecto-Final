import axios from "axios";
import serverURL from "../utils/serverURL";
const url = serverURL;

export const NewsComment = (idNotice, idUser, comment) => {
  return axios
    .post(url + "comments/newsComment", {
      idUser: idUser,
      idNotice: idNotice,
      comment: comment,
    })
    .then((request, response) => {
      console.log(request);
      return request.data;
    });
};

export const GetNewsComments = (idNotice) => {
  let params = { idNotice: idNotice };
  return axios
    .get(url + "comments/newsComments", { params })
    .then((request, response) => {
      console.log(request);
      return request.data;
    });
};

export const DeleteNewsComment = (idComment) => {
  let params = { idComment: idComment };
  return axios
    .delete(url + "comments/deleteNewsComment", { params })
    .then((request, response) => {
      console.log(request);
      return request.data;
    });
};
