const db = require("../config/db_connection");
const moment = require("moment-timezone");


function index(req, res) {
     let trainers = [];
   
   
     const getTrainers = "SELECT * FROM users WHERE role_user = 'role_trainer' OR role_user = 'role_admin';";
   
     db.query(getTrainers, (err, result) => {
       if (err) {
         console.log(err);
   
         res.send(false);
       } else {
         result.map((value) => {

          trainers.push({
             name: value.name,
             surname: value.surname,
             id: value.id_user,
             username: value.username,
             profile_image: value.profile_image,
           });
         });
         console.log(trainers);
   
         res.send(trainers);
       
       }
     });
   }

   function getSearchUser(req, res) {
     let trainers = [];
   
     let username = req.query.username;
     console.log(req.query.username);
     const getUsers = "SELECT * FROM users WHERE username LIKE ? AND (role_user = 'role_trainer' OR role_user = 'role_admin');";
     db.query(getUsers, [username + "%"], (err, result) => {
       //res.send(result);
       if (err) {
         console.log(err);
         res.send(false);
       } else {
         result.map((value) => {

          trainers.push({
               name: value.name,
               surname: value.surname,
               id: value.id_user,
               username: value.username,
               profile_image: value.profile_image,
             });
           });
           console.log(trainers);
     
           res.send(trainers);
       }
     });
   }


   module.exports = {
     index: (req, res) => index(req, res),
     getSearchUser: (req, res) => getSearchUser(req, res),

   };
   