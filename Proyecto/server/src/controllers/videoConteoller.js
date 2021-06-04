const db = require("../config/db_connection");
const Moment = require("moment");
const MomentRange = require("moment-range");
const fs = require("fs");

const moment = MomentRange.extendMoment(Moment);

function index(req, res) {
  console.log(req.query);
  let idVideo = req.query.idVideo;
  let userId = req.query.userId;

  const getVideo = "SELECT * FROM videos WHERE id_video = ?;";
  const getSubsName = "SELECT * FROM subscriptions WHERE id_user = ?";

  db.query(getVideo, [idVideo], (err, resultVideo) => {
    if (err) {
      res.send(false);
      console.log(err);
    } else {
      if (resultVideo.length > 0) {
        if (resultVideo[0].type_video == "private") {
          let trainerID = resultVideo[0].id_user;
          db.query(getSubsName, [userId], (err, result) => {
            if (err) {
              res.send(false);
              console.log(err);
            } else {
              let count = 0;
              for (let [index, val] of result.entries()) {
                let range = moment().range(
                  moment(val.start_date).format("YYYY-MM-DD"),
                  moment(val.expire_date).format("YYYY-MM-DD")
                );
                if (
                  range.contains(moment()) &&
                  trainerID == val.id_user_trainer
                ) {
                  console.log(val.id_user_trainer);
                  count++;
                  res.send(resultVideo[0]);
                  break;
                } else if (index === result.length) {
                  console.log(val.id_user_trainer);
                  console.log(trainerID);
                  res.send(false);
                }
              }
              if (count === 0) {
                console.log(resultVideo[0]);
                console.log(userId);
                if (resultVideo[0].id_user == userId) {
                  res.send(resultVideo[0]);
                } else {
                  console.log("w");

                  res.send(false);
                }
              }
            }
          });
        } else if (resultVideo[0].type_video == "public") {
          res.send(resultVideo[0]);
        }
      } else {
        res.send(false);
      }
    }
  });
}
function videoDelete(req, res) {
  console.log(req.query);
  let idVideo = req.query.idVideo;

  const deleteSQL = "DELETE  FROM videos WHERE id_video = ?;";
  const getVideo = "SELECT * FROM videos WHERE id_video = ?;";

  db.query(getVideo, [idVideo], (err, result) => {
    if (err) {
      res.send(false);
      console.log(err);
    } else {
      if (result.length > 0) {
        const path = result[0].video;
        fs.unlinkSync("src/uploads/" + path);
        db.query(deleteSQL, [idVideo], (err, resultVideo) => {
          if (err) {
            res.send(false);
            console.log(err);
          } else {
            res.send(true);
          }
        });
      }
    }
  });
}

module.exports = {
  index: (req, res) => index(req, res),
  videoDelete: (req, res) => videoDelete(req, res),
};
