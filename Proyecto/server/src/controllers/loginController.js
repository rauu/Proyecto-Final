const db = require("../config/db_connection");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const express = require("express");
const app = express();

const bodyparser = require('body-parser')
const expressSession = require('express-session')
const cookieParser = require('cookie-parser')

app.use(expressSession({
     userID: "userID",
     secret: "login"
}))

function store(req, res) {
  const username = req.body.username;
  const password = req.body.password;
  console.log(req.body);

  const sqlInsert =
    "SELECT * FROM users WHERE username = ?";

  db.query(
    sqlInsert,
    [username],
    (err, result) => {
      //res.send(result);
      if (err) {
        console.log(err.errno);
        res.send(false);
      }
      
      if(result.length > 0){
           bcrypt.compare(password, result[0].password,(error, response) =>{
                if(response){
                res.send(result)
               }else{
                    res.send("Invalid credentials")
               }
           })           
      } else{
           res.send("Username doesn't exist")
      }
    }
  );
}

module.exports = {
  store: (req, res) => store(req, res),
};
