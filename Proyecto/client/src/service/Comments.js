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
      return request.data;
    });
};

export const GetNewsComments = (idNotice) => {
  let params = { idNotice: idNotice };
  return axios
    .get(url + "comments/newsComments", { params })
    .then((request, response) => {
      return request.data;
    });
};

export const DeleteNewsComment = (idComment) => {
  let params = { idComment: idComment };
  return axios
    .delete(url + "comments/deleteNewsComment", { params })
    .then((request, response) => {
      return request.data;
    });
};

export const VideoComment = (idVideo, idUser, comment) => {
  return axios
    .post(url + "comments/videoComment", {
      idUser: idUser,
      idVideo: idVideo,
      comment: comment,
    })
    .then((request, response) => {
      return request.data;
    });
};

export const GetVideoComments = (idVideo) => {
  let params = { idVideo: idVideo };
  return axios
    .get(url + "comments/videoComments", { params })
    .then((request, response) => {
      return request.data;
    });
};

export const DeleteVideoComment = (idComment) => {
  let params = { idComment: idComment };
  return axios
    .delete(url + "comments/deleteVideoComment", { params })
    .then((request, response) => {
      return request.data;
    });
};
