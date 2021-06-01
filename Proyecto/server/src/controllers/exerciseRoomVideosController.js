const db = require("../config/db_connection");
const Moment = require("moment");
const MomentRange = require("moment-range");

const moment = MomentRange.extendMoment(Moment);

function index(req, res) {
  let username = req.query.username;
  let idRoom = req.query.idRoom;
  let trainerSubs = [];
  let videos = [];

  const getPublicVideos = "SELECT * FROM videos WHERE type_video = 'public'";
  const getPrivateVideos =
    "SELECT * FROM videos WHERE type_video = 'private' AND id_user= ?";

  const getSubsName = "SELECT * FROM subscriptions WHERE id_user = ?";
  const getUserID = "SELECT id_user FROM users WHERE username = ?";
  const getRoom = "SELECT * FROM exercise_room WHERE id_room = ?";

  db.query(getRoom, [idRoom], (err, result) => {
    if (err) {
      res.send(false);
      console.log(err);
    } else {
      let count = 0;
      if (result.length > 0) {
        for (val of result) {
          if (val.id_room.toString() == idRoom) {
            count++;
            db.query(getUserID, [username], (err, result) => {
              if (err) {
                console.log(err);

                res.send(false);
              } else {
                let userID = result[0].id_user;
                trainerSubs.push(userID);
                db.query(getSubsName, [userID], (err, result) => {
                  if (err) {
                    console.log(err);
                    re.send(false);
                  } else {
                    for (val of result) {
                      let range = moment().range(
                        moment(val.start_date).format("YYYY-MM-DD"),
                        moment(val.expire_date).format("YYYY-MM-DD")
                      );
                      if (range.contains(moment())) {
                        trainerSubs.push(val.id_user_trainer);
                      }
                    }
                    db.query(getPublicVideos, [userID], async (err, result) => {
                      if (err) {
                        console.log(err);
                        await res.send(false);
                      } else {
                        for (value of result) {
                          if (value.exercise_room == idRoom) {
                            videos.push(value);
                          }
                        }
                        for (let [index, i] of trainerSubs.entries()) {
                          db.query(
                            getPrivateVideos,
                            [i],
                            async (err, result) => {
                              if (err) {
                                console.log(err);
                                res.send(false);
                              } else {
                                for (value of await result) {
                                  if (value.exercise_room == idRoom) {
                                    videos.push(value);
                                  }
                                }
                                if (index == trainerSubs.length - 1) {
                                  res.send(
                                    videos.sort(
                                      (a, b) =>
                                        (a.id_video < b.id_video && 1) || -1
                                    )
                                  );
                                }
                              }
                            }
                          );
                        }
                        if (trainerSubs == []) {
                          res.send(
                            videos.sort(
                              (a, b) => (a.id_video < b.id_video && 1) || -1
                            )
                          );
                        }
                      }
                    });
                  }
                });
              }
            });
          }
        }
        if (count == 0) {
          res.send([]);
        }
      } else {
        res.send(false);
      }
    }
  });
}

function roomName(req, res) {
  let roomID = req.query.idRoom;
  const getRoom = "SELECT * FROM exercise_room WHERE id_room = ?";

  db.query(getRoom, [roomID], (err, result) => {
    if (err) {
      res.send(false);
      console.log(err);
    } else {
      res.send(result[0]);
    }
  });
}

module.exports = {
  index: (req, res) => index(req, res),
  roomName: (req, res) => roomName(req, res),
};
