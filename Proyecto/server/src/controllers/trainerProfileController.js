const db = require("../config/db_connection");
const moment = require("moment-timezone");
const fs = require("fs");

function index(req, res) {
  let trainer;
  let username = req.query.username;

  const getTrainer =
    "SELECT * FROM users WHERE username = ? AND role_user = 'role_trainer'";

  db.query(getTrainer, [username], (err, result) => {
    if (err) {
      console.log(err);
      res.send(false);
    } else {
      if (result.length > 0) {
        trainer = {
          userExists: true,
          username: result[0],
          username,
          profile_image: result[0].profile_image,
          name: result[0].name,
          surname: result[0].surname,
          description: result[0].description,
          id: result[0].id_user,
        };
        res.send(trainer);
      } else {
        console.log(result);
        trainer = {
          userExists: false,
        };
        res.send(trainer);
      }
    }
  });
}

function update(req, res) {
  let description = req.body.description;
  let idUser = req.body.id;
  let profileImage = req.body.profileImage;

  const extension = profileImage.split(";")[0].split("/")[1];

  let route = "src/uploads/";
  let filename =
    "images/profile-image/" + "image-" + Date.now() + "." + extension;
  let profileImage_write = profileImage.split(";base64,").pop();

  if (profileImage != "") {
    fs.writeFile(
      route + filename,
      profileImage_write,
      { encoding: "base64" },
      function (err) {
        console.log("File created");
      }
    );
  }

  const updateTrainerWithImage =
    "UPDATE users SET profile_image = ?, description = ? WHERE id_user = ? ";

  const updateTrainer = "UPDATE users SET description = ? WHERE id_user = ? ";

  if (profileImage != "") {
    db.query(
      updateTrainerWithImage,
      [filename, description, idUser],
      (err, result) => {
        if (err) {
          console.log(err);
          res.send(false);
        } else {
          console.log(result);

          res.send(true);
        }
      }
    );
  } else {
    db.query(updateTrainer, [description, idUser], (err, result) => {
      if (err) {
        console.log(err);
        res.send(false);
      } else {
        res.send(true);
      }
    });
  }
}

module.exports = {
  index: (req, res) => index(req, res),
  update: (req, res) => update(req, res),
};
