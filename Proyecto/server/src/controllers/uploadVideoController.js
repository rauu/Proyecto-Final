const db = require("../config/db_connection");
const express = require("express");
const app = express();
const fs = require("fs");

function getRooms(req, res) {
  const sqlGet = "SELECT * FROM exercise_room";

  db.query(sqlGet, (err, result) => {
    res.send(result);
    if (err) {
      console.log(err);
    } else {
      console.log("got data");
    }
  });
}
function store(req, res) {
  res.send(req.body);
  let videoName = req.body.videoName;
  let videoType = req.body.videoType;
  let videoRoom = req.body.videoRoom;
  let videoDescription = req.body.videoDescription;
  let video = req.body.video;
  let id_user = req.body.id_user;

  const GetExersiceId =
    "SELECT id_room as cnt FROM exercise_room WHERE room_name = ?;";

  db.query(GetExersiceId, [videoRoom], (err, result) => {
    if (err) {
      console.log(err);
      res.send(false);
    } else {
      let room_id = result[0].cnt;

      const extension = video.split(";")[0].split("/")[1];

      let filename =
        "src/uploads/videos/" +
        "video-" +
        videoType +
        "_" +
        Date.now() +
        "." +
        extension;

      let video_write = video.split(";base64,").pop();

      fs.writeFile(
        filename,
        video_write,
        { encoding: "base64" },
        function (err) {
          console.log("File created");
        }
      );

      const sqlInsert =
        "INSERT INTO videos (video_name, video_description, type_video, exercise_room, video, id_user) VALUES(?,?,?,?,?,?)";

      db.query(sqlInsert, [
        videoName,
        videoDescription,
        videoType,
        room_id,
        filename,
        id_user,
      ]),
        (err, result) => {
          if (err) {
            console.log(err);
            res.send(false);
          } else {
            res.send(true);
            console.log("video success");
          }
        };
    }
  });

  /* const extension = video.split(";")[0].split("/")[1];

  let filename =
    "src/uploads/videos/" +
    "video-" +
    videoType +
    "_" +
    Date.now() +
    "." +
    extension;

  let video_write = video.split(";base64,").pop();

  fs.writeFile(filename, video_write, { encoding: "base64" }, function (err) {
    console.log("File created");
  });

  const sqlInsert =
    "INSERT INTO videos (video_name, video_description, type_video, exercise_room, video, id_user) VALUES(?,?,?,?,?,?)";

  db.query(sqlInsert, [
    videoName,
    videoDescription,
    videoType,
    videoRoom,
    filename,
    id_user
  ]),
    (err, result) => {
      if (err) {
        console.log(err);
        res.send(false);
      } else {
        res.send(true);
        console.log("video success");
      }
    }; */
}

module.exports = {
  getRooms: (req, res) => getRooms(req, res),
  store: (req, res) => store(req, res),
};
