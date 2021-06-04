const db = require("../config/db_connection");
const Moment = require("moment");
const MomentRange = require("moment-range");
const fs = require("fs");
var crypto = require("crypto"),
  algorithm = "aes-256-ctr",
  password = "d6F3Efeq";

function decrypt(text) {
  var decipher = crypto.createDecipher(algorithm, password);
  var dec = decipher.update(text, "hex", "utf8");
  dec += decipher.final("utf8");
  return dec;
}

const moment = MomentRange.extendMoment(Moment);

function index(req, res) {
  console.log(req.query);
  let idNotice = req.query.idNotice;
  const getNotice = "SELECT * FROM news WHERE id_news = ?";

  db.query(getNotice, [idNotice], (err, result) => {
    if (err) {
      res.send(false);
      console.log(err);
    } else if (result.length > 0) {
      res.send(result[0]);
    } else {
      res.send(false);
    }
  });
}

function deleteNotice(req, res) {
  console.log(req.query);
  let idNotice = req.query.id_notice;

  const getSQL = "SELECT * FROM  news WHERE id_news = ?";

  const deleteSQL = "DELETE  FROM news WHERE id_news = ?;";

  db.query(getSQL, [idNotice], (err, result) => {
    if (err) {
      res.send(false);
      console.log(err);
    } else {
      if (result.length > 0) {
        const path = result[0].image_uploded;
        fs.unlinkSync("src/uploads/" + path);
        db.query(deleteSQL, [idNotice], (err, result) => {
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
  deleteNotice: (req, res) => deleteNotice(req, res),
};
