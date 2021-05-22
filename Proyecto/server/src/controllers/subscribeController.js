const db = require("../config/db_connection");
const moment = require("moment-timezone");
const fs = require("fs");

function getPlans(req, res) {
  const plans = "SELECT * FROM plans";

  db.query(plans, [], (err, result) => {
    if (err) {
      console.log(err);
      res.send(false);
    } else {
      res.send(result);
    }
  });
}

function userExists(req, res) {
  let username = req.query.username;
  console.log(username);

  const getTrainer =
    "SELECT * FROM users WHERE username = ? AND role_user = 'role_trainer'";

  db.query(getTrainer, [username], (err, result) => {
    if (err) {
      console.log(err);
      res.send(false);
    } else {
      if (result.length > 0) {
        
        res.send(true);
      } else {
        console.log(result);
        
        res.send(false);
      }
    }
  });
}

module.exports = {
  getPlans: (req, res) => getPlans(req, res),
  userExists: (req, res) => userExists(req, res),
};
