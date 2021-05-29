const db = require("../config/db_connection");
const Moment = require("moment");
const MomentRange = require("moment-range");
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
  const getNotices = "SELECT * FROM news";

  db.query(getNotices, [], (err, result) => {
    if (err) {
      console.log(err);
      res.send(false);
    } else {
      let news = [];

      for (let val of result) {
        news.push({
          content: val.content,
          date_upload: moment(val.date_upload).format("DD.MM.YYYY"),
          id_news: val.id_news,
          id_user: val.id_user,
          image_uploded: val.image_uploded,
          title: val.title,
        });
      }
      res.send(news.sort((a, b) => (a.id_news < b.id_news && 1) || -1));
    }
  });
}

module.exports = {
  index: (req, res) => index(req, res),
};
