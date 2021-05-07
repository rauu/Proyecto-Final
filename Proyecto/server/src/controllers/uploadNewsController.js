const db = require("../config/db_connection");
const express = require("express");
const app = express();
const fs = require("fs");

function store(req, res) {
  res.send(req.body);
  let headline = req.body.headline;
  let headlineImage = req.body.headlineImage;
  let content = req.body.content;
  let userId = req.body.userId;

  const extension = headlineImage.split(";")[0].split("/")[1];

  let filename =
    "src/uploads/news/headlineImages/" + "image-" + Date.now() + "." + extension;

  let newsImage_write = headlineImage.split(";base64,").pop();

  fs.writeFile(
    filename,
    newsImage_write,
    { encoding: "base64" },
    function (err) {
      console.log("File created");
    }
  );

  const sqlInsert =
    "INSERT INTO news (id_user, content, title, image_uploded) VALUES(?,?,?,?)";

  db.query(sqlInsert, [userId, content, headline, filename]),
    (err, result) => {
      if (err) {
        console.log(err);
        res.send(false);
      } else {
        res.send(true);
        console.log("news success");
      }
    };
  console.log(req.body.headline);
}

module.exports = {
  store: (req, res) => store(req, res),
};
