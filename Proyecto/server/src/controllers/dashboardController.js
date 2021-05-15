const db = require("../config/db_connection");

function index(req, res) {
  /*   console.log(req.body);
  const name = req.body.name;
  const surname = req.body.surname;
  const email = req.body.email;
  const username = req.body.username;
  const sex = req.body.sex;
  const dob = req.body.dob;
  const userID = req.body.userID; */

  const getVideos = "SELECT * FROM videos";

  db.query(getVideos, (err, result) => {
    if (err) {
      console.log(err);

      res.send(false);
    } else {
      /* res.json(result); */
      console.log(result[0]);
      var path = require("path");
      res.json(( result) );
    }
  });
}

module.exports = {
  index: (req, res) => index(req, res),
};
