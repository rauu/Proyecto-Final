const db = require("../config/db_connection");
const moment = require("moment-timezone");

function UploadNewsComment(req, res) {
  console.log(req.body);
  let idUser = req.body.idUser;
  let idNotice = req.body.idNotice;
  let comment = req.body.comment;

  const postComment =
    "INSERT INTO news_comment (id_news, id_user, comment) VALUES (?,?,?)";

  db.query(postComment, [idNotice, idUser, comment], (err, result) => {
    if (err) {
      console.log(err);
      res.send(false);
    } else {
      res.send(true);
    }
  });
}

function GetNewsComment(req, res) {
  let idNotice = req.query.idNotice;

  const getComments = "SELECT * FROM news_comment  WHERE id_news = ? ORDER BY id_comment DESC ";
  const getUserName = "SELECT * FROM users WHERE id_user = ?";

  db.query(getComments, [idNotice], (err, result) => {
    if (err) {
      console.log(err);
      res.send(false);
    } else {
      let comments = [];
      for (let [index, val] of result.entries()) {
        db.query(getUserName, [val.id_user], (err, ress) => {
          if (err) {
            res.send(false);
            console.log(err);
          } else {
            comments.push({
              id_comment: val.id_comment,
              id_news: val.id_news,
              username: ress[0].username,
              date: val.date_upload,
              content: val.comment,
            });

            if (index == result.length - 1) {
              res.send(comments);
            }
          }
        });
      }
    }
  });
}

function DeleteNewsComment(req, res) {
  let idComment = req.query.idComment;

  const deleteComment = "DELETE FROM news_comment  WHERE id_comment = ?";

  db.query(deleteComment, [idComment], (err, result) => {
    if (err) {
      console.log(err);
      res.send(false);
    } else {
      res.send(true);
    }
  });
}

module.exports = {
  UploadNewsComment: (req, res) => UploadNewsComment(req, res),
  GetNewsComment: (req, res) => GetNewsComment(req, res),
  DeleteNewsComment: (req, res) => DeleteNewsComment(req, res),
};
