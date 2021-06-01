const moment = require('moment-timezone');
const db = require("../config/db_connection");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const express = require("express");
const app = express();

function store(req, res) {
  const username = req.body.username;
  const password = req.body.password;

  const sqlInsert = "SELECT * FROM users WHERE username = ?";

  db.query(sqlInsert, [username], (err, result) => {
    //res.send(result);
    if (err) {
      console.log(err.errno);
      res.send(false);
    }

    if (result.length > 0) {
      bcrypt.compare(password, result[0].password, (error, response) => {
        if (response) {
          let userLogin = {
            user: true,
            id_user: result[0].id_user,
            email: result[0].email,
            role_user: result[0].role_user,
            sex: result[0].sex,
            name: result[0].name,
            surname: result[0].surname,
            username: result[0].username,
            dob: moment(result[0].date_birth).format("YYYY-MM-DD"),
          };
          /*           req.session.user = result;
          console.log(req.session.user); */
          res.send(userLogin);
        } else {
          let userLogin = {
            user: false,
          };
          res.send(userLogin);
        }
      });
    } else {
      res.send("Username doesn't exist");
    }
  });
}

module.exports = {
  store: (req, res) => store(req, res),
};
