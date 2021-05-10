const db = require("../config/db_connection");
const moment = require("moment-timezone");
const bcrypt = require("bcrypt");
const saltRounds = 10;

function updateProfile(req, res) {
  console.log(req.body);
  const name = req.body.name;
  const surname = req.body.surname;
  const email = req.body.email;
  const username = req.body.username;
  const sex = req.body.sex;
  const dob = req.body.dob;
  const userID = req.body.userID;

  const updateProfileSQL =
    "UPDATE users SET name = ?, surname = ?, email = ?, username = ?, sex = ?, date_birth = ? WHERE id_user = ?";

  db.query(
    updateProfileSQL,
    [name, surname, email, username, sex, dob, userID],
    (err, result) => {
      let userData = {
        user: true,
        id_user: "",
        email: "",
        role_user: "",
        sex: "",
        name: "",
        surname: "",
        username: "",
        dob: "",
        userUpdated: "",
      };
      if (err) {
        console.log(err);
        userData = {
          userUpdated: false,
        };
        res.send(userData);
      } else {
        const getUserSQL = "SELECT * FROM users WHERE id_user = ?";
        db.query(getUserSQL, userID, (err, result) => {
          if (result) {
            userData = {
              user: true,
              id_user: result[0].id_user,
              email: result[0].email,
              role_user: result[0].role_user,
              sex: result[0].sex,
              name: result[0].name,
              surname: result[0].surname,
              username: result[0].username,
              dob: moment(result[0].date_birth).format("YYYY-MM-DD"),
              userUpdated: true,
            };
            console.log(userData);
            res.send(userData);
          }
        });
      }
    }
  );
  /*   const email = req.body.email;

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
  }); */
}
function updatePassword(req, res) {
  console.log(req.body);
  const password = req.body.password;
  const userID = req.body.userID;

  const updateProfileSQL = "UPDATE users SET password = ? WHERE id_user = ?";

  db.query(
    updateProfileSQL,
    [bcrypt.hashSync(password, saltRounds), userID],
    (err, result) => {
      if (err) {
        console.log(err);
        res.send(false);
      } else {
        res.send("Password Updated");
      }
    }
  );

  /*   const email = req.body.email;

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
  }); */
}

module.exports = {
  updateProfile: (req, res) => updateProfile(req, res),
  updatePassword: (req, res) => updatePassword(req, res),
};
