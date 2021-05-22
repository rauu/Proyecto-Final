const db = require("../config/db_connection");
const moment = require("moment-timezone");
const fs = require("fs");

function index(req, res) {
  const getPlans = "SELECT * FROM plans";

  db.query(getPlans, [], (err, result) => {
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
