const db = require("../config/db_connection");
const moment = require("moment-timezone");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const fs = require("fs");

function getPDF(req, res) {
  let pdfUsers = [];

  const gefAllPDF = "SELECT * FROM work_with_us ORDER BY date_uploaded DESC;";

  db.query(gefAllPDF, (err, result) => {
    if (err) {
      console.log(err);

      res.send(false);
    } else {
      /* res.json(result); */
      if (result.length > 0) {
        result.map((value) => {
          /* userData = {
          username: value.username,
          role_user: value.role_user,
          id_user: value.id_user
        } */
          pdfUsers.push({
            name: value.name,
            surname: value.surname,
            email: value.email,
            date_uploaded: moment(value.date_uploaded).format("DD-MM-YYYY"),
            message: value.message,
            file_location: value.file_location,
            id: value.id,
          });
        });
        res.send(pdfUsers);
      } else {
        res.send(false);
      }
      console.log(pdfUsers);
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

function users(req, res) {
  let userData = [];
  let count = 0;

  const getUsers = "SELECT * FROM users";
  db.query(getUsers, [], (err, result) => {
    //res.send(result);
    if (err) {
      console.log(err);
      res.send(false);
    } else {
      result.map((value) => {
        /* userData = {
          username: value.username,
          role_user: value.role_user,
          id_user: value.id_user
        } */
        userData.push({
          username: value.username,
          role_user: value.role_user,
          id_user: value.id_user,
          id: count,
        });
        count++;
      });
      console.log(userData);

      res.send(userData);
    }
  });
}

function updateUserType(req, res) {
  let role_user = req.body.role_user;
  let id_user = req.body.id_user;
  console.log(req.body);
  const getUsers = "UPDATE users SET role_user = ? WHERE id_user = ?";
  db.query(getUsers, [role_user, id_user], (err, result) => {
    //res.send(result);
    if (err) {
      console.log(err);
      res.send(false);
    } else {
      res.send(true);
    }
  });
}

function deleteUser(req, res) {
  let id_user = req.query.id_user;
  console.log(req.query.id_user);
  const getNotices = "SELECT * FROM news WHERE id_user = ?";
  const getVideos = "SELECT * FROM videos WHERE id_user = ?";
  const deleteUsers = "DELETE FROM users WHERE id_user = ?";
  db.query(getNotices, [id_user], (err, result) => {
    if (err) {
      console.log(err);
      re.send(false);
    } else {
      for (let val of result) {
        let path = val.image_uploded;
        fs.unlinkSync("src/uploads/" + path);
      }

      db.query(getVideos, [id_user], (err, result) => {
        for (let val of result) {
          let path = val.video;
          fs.unlinkSync("src/uploads/" + path);
        }
        db.query(deleteUsers, [id_user], (err, result) => {
          //res.send(result);
          if (err) {
            console.log(err);
            res.send(false);
          } else {
            res.send(true);
          }
        });
      });
    }
  });
}

function getSearchUser(req, res) {
  let userData = [];
  let count = 0;

  let username = req.query.username;
  console.log(req.query.username);
  const getUsers = "SELECT * FROM users WHERE username LIKE ?;";
  db.query(getUsers, [username + "%"], (err, result) => {
    //res.send(result);
    if (err) {
      console.log(err);
      res.send(false);
    } else {
      result.map((value) => {
        /* userData = {
          username: value.username,
          role_user: value.role_user,
          id_user: value.id_user
        } */
        userData.push({
          username: value.username,
          role_user: value.role_user,
          id_user: value.id_user,
          id: count,
        });
        count++;
      });
      console.log(userData);

      res.send(userData);
    }
  });
}
function deleteCV(req, res) {
  let id = req.query.id;
  console.log(req.query);
  console.log(req.query.username);
  const getCV = "SELECT * FROM work_with_us where id = ?";
  const deleteCV = "DELETE FROM work_with_us WHERE id = ?;";
  db.query(getCV, [id], (err, result) => {
    if (err) {
      console.log(err);
      res.send(false);
    } else {
      const path = result[0].file_location;
      fs.unlinkSync("src/uploads/" + path);
      db.query(deleteCV, [id], (err, result) => {
        //res.send(result);
        if (err) {
          console.log(err);
          res.send(false);
        } else {
          res.send(result);
        }
      });
    }
  });
}

module.exports = {
  getPDF: (req, res) => getPDF(req, res),
  registerUser: (req, res) => registerUser(req, res),
  createRoom: (req, res) => createRoom(req, res),
  deleteRoom: (req, res) => deleteRoom(req, res),
  users: (req, res) => users(req, res),
  updateUserType: (req, res) => updateUserType(req, res),
  deleteUser: (req, res) => deleteUser(req, res),
  getSearchUser: (req, res) => getSearchUser(req, res),
  deleteCV: (req, res) => deleteCV(req, res),
};
