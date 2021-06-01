const db = require("../config/db_connection");
const Moment = require("moment");
const MomentRange = require("moment-range");

const moment = MomentRange.extendMoment(Moment);
const fs = require("fs");

function index(req, res) {
  let trainer;
  let username = req.query.username;

  const getTrainer =
    "SELECT * FROM users WHERE username = ? AND role_user = 'role_trainer' OR role_user = 'role_admin'";

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

function userSubscribed(req, res) {
  console.log(req.query);
  let id_user = req.query.id_user;
  let trainerName = req.query.trainerName;

  const getAll =
    "SELECT * FROM videos WHERE id_user = ? ORDER BY id_video DESC ";
  const getTrainerID = "SELECT * FROM users WHERE username = ?";
  const getSub =
    "SELECT * FROM subscriptions WHERE id_user = ? AND id_user_trainer = ?";

  db.query(getTrainerID, [trainerName], (err, result) => {
    if (err) {
      console.log(err);
      res.send(false);
    } else {
      let trainerID = result[0].id_user;

      db.query(getAll, [trainerID], (err, resultVideo) => {
        if (err) {
          res.send(false);
          console.log(err);
        } else {
          let sub = false;
          let startDate;
          let endDate;
          let range;
          let PublicVideos = [];
          let PrivateVideos = [];
          let InfoSend = {};

          /*           console.log(result);
           */ db.query(getSub, [id_user, trainerID], (err, result) => {
            if (err) {
              console.log(err);
              res.send(false);
            } else {
              /*               console.log(range.contains(moment()));
               */ if (result.length > 0) {
                for (value of result) {
                  startDate = moment(value.start_date).format("YYYY-MM-DD");
                  endDate = moment(value.expire_date).format("YYYY-MM-DD");
                  range = moment().range(startDate, endDate);
                  if (range.contains(moment())) {
                    sub = true;
                    break;
                  }
                }
              }
              for (value of resultVideo) {
                if (value.type_video == "private") {
                  PrivateVideos.push(value);
                } else if (value.type_video == "public") {
                  PublicVideos.push(value);
                }
              }

              InfoSend = {
                subscribed: sub,
                expire_date: moment(endDate).format("DD/MM/YYYY"),
                publicVideos: PublicVideos,
                privateVideos: PrivateVideos,
              };
              res.send(InfoSend);
              console.log(InfoSend);
              console.log(sub + "SUB");
            }
          });
        }
      });
    }
  });
}

module.exports = {
  index: (req, res) => index(req, res),
  update: (req, res) => update(req, res),
  userSubscribed: (req, res) => userSubscribed(req, res),
};
