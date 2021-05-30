import axios from "axios";
import serverURL from "../utils/serverURL";
const url = serverURL;

export const GetNotice = (idNotice) => {
  let params = { idNotice: idNotice };
  return axios.get(url + "notice/", { params }).then((request, response) => {
    console.log(request);
    return request.data;
  });
};
