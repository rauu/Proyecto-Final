const db = require("../config/db_connection");
const moment = require("moment-timezone");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const fs = require("fs");

function getPDF(req, res) {
  const getVideos = "SELECT * FROM work_with_us";

  db.query(getVideos, (err, result) => {
    if (err) {
      console.log(err);

      res.send(false);
    } else {
      /* res.json(result); */
      console.log(result[0]);
      var path = require("path");
      res.json(result);
    }
  });
}

function registerUser(req, res) {
  const name = req.body.name;
  const lastname = req.body.lastname;
  const username = req.body.username;
  const email = req.body.email;
  const dob = req.body.dob;
  const gender = req.body.gender;
  const password = bcrypt.hashSync(req.body.password, saltRounds);
  const typeUser = req.body.typeUser;
  console.log(req.body);

  const sqlInsert =
    "INSERT INTO users (name, surname, username, email, date_birth, sex, password, role_user) VALUES (?,?,?,?,?,?,?,?);";

  db.query(
    sqlInsert,
    [name, lastname, username, email, dob, gender, password, typeUser],
    (err, result) => {
      //res.send(result);
      if (err) {
        console.log(err);
        res.send(false);
      } else {
        console.log("inserted user");
        res.send(true);
      }
    }
  );
}

function createRoom(req, res) {
  console.log(req.body.roomName);
  const roomName = req.body.roomName;
  const backgroundImage = req.body.backgroundImage;

  const extension = backgroundImage.split(";")[0].split("/")[1];
  let route = "src/uploads/";

  let filename =
    "images/roomProfileImage/" + "image-" + Date.now() + "." + extension;

  let backgroundImage_Write = backgroundImage.split(";base64,").pop();

  const checkRoomExitsSQL = "SELECT * FROM exercise_room WHERE room_name = ?";
  const sqlInsert =
    "INSERT INTO exercise_room (room_name, background_image) VALUES (?,?);";

  db.query(checkRoomExitsSQL, [roomName], (err, result) => {
    if (result.length > 0) {
      res.send("Room already exists");
    } else {
      db.query(sqlInsert, [roomName, filename], (err, result) => {
        //res.send(result);
        if (err) {
          console.log(err);
          res.send(false);
        } else {
          console.log("inserted room");
          fs.writeFile(
            route + filename,
            backgroundImage_Write,
            { encoding: "base64" },
            function (err) {
              console.log("File created");
            }
          );
          res.send(true);
        }
      });
    }
  });
}

function deleteRoom(req, res) {
  const roomName = req.query.roomName;

  const sqlDelete = "DELETE FROM exercise_room WHERE room_name = ?;";

  db.query(sqlDelete, [roomName], (err, result) => {
    //res.send(result);
    if (err) {
      console.log(err);
      res.send(false);
    } else {
      console.log("Room Deleted");

      res.send(true);
    }
  });

}

function users(req, res){
  let userData = []

  const getUsers = "SELECT * FROM users";
  db.query(getUsers, [], (err, result) => {
    //res.send(result);
    if (err) {
      console.log(err);
      res.send(false);
    } else {
      result.map(value =>{
        
        /* userData = {
          username: value.username,
          role_user: value.role_user,
          id_user: value.id_user
        } */
        userData.push({
          username: value.username,
          role_user: value.role_user,
          id_user: value.id_user
        })
      })
      console.log(userData)

      res.send(userData);
    }
  });
}

module.exports = {
  getPDF: (req, res) => getPDF(req, res),
  registerUser: (req, res) => registerUser(req, res),
  createRoom: (req, res) => createRoom(req, res),
  deleteRoom: (req, res) => deleteRoom(req, res),
  users: (req, res) => users(req, res),
};
