import axios from "axios";
import serverURL from "../utils/serverURL";
const url = serverURL;
axios.defaults.withCredentials = true;

export const UploadNews = (headline, headlineImage, content, userId) => {
  return axios
    .post(url + "uploadNews/", {
      headline: headline,
      headlineImage: headlineImage,
      content: content,
      userId: userId,
    })
    .then((request, response) => {
      return request;
      //sessionStorage.setItem("user", JSON.stringify(request.data))
      //history.push('/dashboard')
    });
};
