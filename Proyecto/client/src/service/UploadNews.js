import axios from "axios";
axios.defaults.withCredentials = true;
const url = "http://localhost:3001/";

export const UploadNews = (headline, headlineImage, content, userId) => {
  return axios
    .post(url + "uploadNews/", {
      headline: headline,
      headlineImage: headlineImage,
      content: content,
      userId: userId,
    })
    .then((request, response) => {
      console.log(request);
      return request;
      //sessionStorage.setItem("user", JSON.stringify(request.data))
      //history.push('/dashboard')
    });
};
