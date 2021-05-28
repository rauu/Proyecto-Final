const db = require("../config/db_connection");
const Moment = require("moment");
const MomentRange = require("moment-range");

const moment = MomentRange.extendMoment(Moment);

function index(req, res) {
  const getSQL = "SELECT * FROM exercise_room";

  db.query(getSQL, [], (err, result) => {
    if (err) {
      console.log(err);
      res.send(false);
    } else {
      res.send(result);
    }
  });
}

module.exports = {
  index: (req, res) => index(req, res),
};
