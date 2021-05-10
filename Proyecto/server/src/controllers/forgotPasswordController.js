const db = require("../config/db_connection");
const randomString = require("../utils/randomString");
const nodemailer = require("nodemailer");
const gmailConnection = require("../config/gmail_connection");
const bcrypt = require("bcrypt");
const saltRounds = 10;

function update(req, res) {
  const email = req.body.email;

  console.log(req.body);

  const searchEmailSQL = "SELECT * FROM users WHERE email = ?;";
  db.query(searchEmailSQL, [email], (err, result) => {
    //res.send(result);
    if (err) {
      console.log(err.errno);
      res.send(false);
    } else if (result.length > 0) {
      console.log(randomString.randomString(8));
      let newPassword = randomString.randomString(10);
      let userID = result[0].id_user;
      let userName = result[0].name;

      const sqlUpdatePassword =
        "UPDATE users SET password = ? WHERE id_user = ?";
      db.query(
        sqlUpdatePassword,
        [bcrypt.hashSync(newPassword, saltRounds), userID],
        (err, result) => {
          if (err) {
            console.log(err.errno + "error");
            res.send(false);
          } else {
            var mailOptions = {
              from: "raunakbinyani@gmail.com",
              to: email,
              subject: "Your GYMOOZE password has been changed",
              text:
                "Greetings " +
                userName +
                ",\nWe recived your request to change your current password so, here is your new Password:\n\n" +
                newPassword+
                "\n\n" +
                "You can change your password in settings. Don't share it to anyone\nHave a great day.\nGYMOOZE",
            };

            transporter.sendMail(mailOptions, function (error, info) {
              if (error) {
                console.log(error);
              } else {
                console.log("Email sent: " + info.response);
              }
            });
            console.log("password changed");
            res.send("check your email");
          }
        }
      );
    } else {
      res.send("email doesn't exist");
    }
  });
  var transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    auth: {
      user: gmailConnection.email,
      pass: gmailConnection.password,
    },
  });
}

module.exports = {
  update: (req, res) => update(req, res),
};
