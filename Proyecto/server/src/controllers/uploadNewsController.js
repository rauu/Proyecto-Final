const db = require("../config/db_connection");
const express = require("express");
const app = express();
const fs = require("fs");
var crypto = require("crypto"),
  algorithm = "aes-256-ctr",
  password = "d6F3Efeq";

function encrypt(text) {
  var cipher = crypto.createCipher(algorithm, password);
  var crypted = cipher.update(text, "utf8", "hex");
  crypted += cipher.final("hex");
  return crypted;
}

function decrypt(text) {
  var decipher = crypto.createDecipher(algorithm, password);
  var dec = decipher.update(text, "hex", "utf8");
  dec += decipher.final("utf8");
  return dec;
}

function store(req, res) {
  res.send(req.body);
  let headline = req.body.headline;
  let headlineImage = req.body.headlineImage;
  let content = req.body.content;
  let userId = req.body.userId;

  const extension = headlineImage.split(";")[0].split("/")[1];

  let route = "src/uploads/"
  let filename =
    "news/headlineImages/" +
    "image-" +
    Date.now() +
    "." +
    extension;
    

  let newsImage_write = headlineImage.split(";base64,").pop();

  fs.writeFile(
    route + filename,
    newsImage_write,
    { encoding: "base64" },
    function (err) {
      console.log("File created");
    }
  );

  const sqlInsert =
    "INSERT INTO news (id_user, content, title, image_uploded) VALUES(?,?,?,?)";

  db.query(sqlInsert, [userId, encrypt(content), headline, filename]),
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
