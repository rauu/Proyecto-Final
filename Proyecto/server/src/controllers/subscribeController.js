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

  const getTrainer =
    "SELECT * FROM users WHERE username = ? AND role_user = 'role_trainer' OR role_user = 'role_admin'";

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

function user(req, res) {
  //let username = req.query.username;
  console.log(req.body);
  let userID = req.body.userID;
  let trainer = req.body.trainer;
  let typeSubscription = req.body.typeSubscription;

  const getMonthSQL = "SELECT * FROM plans WHERE id_plan = ?;";
  const getTrainerID = "SELECT * FROM users WHERE username = ?;";
  const createSubscriptionSQL =
    "INSERT INTO subscriptions (id_user, id_user_trainer, id_plan, start_date, expire_date) VALUES (?,?,?,?,?)";

  db.query(getMonthSQL, [typeSubscription], (err, result) => {
    if (err) {
      console.log(err);
      res.send(fale);
    } else {
      if (result.length > 0) {
        let months = result[0].months;
        console.log(months);
        let expirySubsDate = moment().add(months, "M").format("YYYY-MM-DD");
        console.log(expirySubsDate);

        db.query(getTrainerID, [trainer], (err, resQuery) => {
          if (err) {
            console.log(err);
            res.send(false);
          } else {
            if (resQuery.length > 0) {
              console.log(resQuery);
              let trainerID = resQuery[0].id_user;
              db.query(
                createSubscriptionSQL,
                [
                  userID,
                  trainerID,
                  typeSubscription,
                  moment().format("YYYY-MM-DD"),
                  expirySubsDate,
                ],
                (err, response) => {
                  if (err) {
                    res.send(false);
                    console.log(err);
                  } else {
                    console.log(response);
                    res.send(true);
                  }
                }
              );
            }
          }
        });
      }
    }
  });

  /*  const getTrainer =
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
  }); */
}

module.exports = {
  getPlans: (req, res) => getPlans(req, res),
  userExists: (req, res) => userExists(req, res),
  user: (req, res) => user(req, res),
};
