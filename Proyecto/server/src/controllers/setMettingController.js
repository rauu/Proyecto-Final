const db = require("../config/db_connection");
const express = require("express");
const app = express();
const fs = require("fs");
const Moment = require("moment");
const MomentRange = require("moment-range");

const nodemailer = require("nodemailer");
const gmailConnection = require("../config/gmail_connection");

const moment = MomentRange.extendMoment(Moment);

function postMetting(req, res) {
  let userID = req.body.userID;
  let message = req.body.message;
  let subject = req.body.subject;
  let emails = [];
  let users = [];
  const getSubs = "SELECT * FROM subscriptions WHERE id_user_trainer = ?";

  const getEmails = "SELECT * FROM users WHERE id_user = ?";
  db.query(getSubs, [userID], (err, resultSubs) => {
    if (err) {
      console.log(err);
      res.send(false);
    } else {
      if (resultSubs.length > 0) {
        let subs = resultSubs;
        for (let val of resultSubs) {
          let range = moment().range(
            moment(val.start_date).format("YYYY-MM-DD"),
            moment(val.expire_date).format("YYYY-MM-DD")
          );

          if (range.contains(moment())) {
            users.push(val.id_user);
          }
        }
        users = users.filter(function (value, index, array) {
          return array.indexOf(value) == index;
        });
        console.log(users);

        for (let [index, val] of users.entries()) {
          db.query(getEmails, [val], (err, result) => {
            if (err) {
              console.log(err);
              res.send(false);
            } else {
              emails.push(result[0].email);
              if (index === users.length - 1) {
                console.log(emails);

                for (let [index, val] of emails.entries()) {
                  var transporter = nodemailer.createTransport({
                    host: "smtp.gmail.com",
                    port: 465,
                    auth: {
                      user: gmailConnection.email,
                      pass: gmailConnection.password,
                    },
                  });

                  var mailOptions = {
                    from: "raunakbinyani@gmail.com",
                    to: val,
                    subject: subject,
                    text: message,
                  };

                  transporter.sendMail(mailOptions, function (error, info) {
                    if (error) {
                      res.send(false);
                      console.log(error);
                    } else {
                      res.send(true);
                      console.log("Email sent: " + info.response);
                    }
                  });
                  if (index == emails.length - 1) {
                    res.send(true);
                  }
                }
              }
            }
          });
        }
      } else {
        res.send(true);
      }
    }
  });
  console.log(req.body);
}

module.exports = {
  postMetting: (req, res) => postMetting(req, res),
};
