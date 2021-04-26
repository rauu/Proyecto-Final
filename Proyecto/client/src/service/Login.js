import axios from "axios";
axios.defaults.withCredentials = true;
const url = "http://192.168.1.48:3001/";




export const LoginUser = (
  username,
  password
) => {

  return axios.post(url+"login/", {
      username: username,
      password: password
    })
    .then((request, response) => {
      if(request.data.user === true){
        console.log(request.data)
        sessionStorage.setItem("user", JSON.stringify(request.data))
        //history.push('/dashboard')

        return request.data.user;
      }else if( request.data.user === false){
        return request.data.user;
      }else{
        return request.data
      }
    })
};
