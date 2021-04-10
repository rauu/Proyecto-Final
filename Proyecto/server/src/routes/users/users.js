const express = require("express");
const router = express.Router();
const db = require("../../config/db_connection");

//insert movie

router.post("/storeuser", (req, res) => {
  const name = req.body.name;
  const lastname = req.body.lastname;
  const username = req.body.username;
  const email = req.body.email;
  const dob = req.body.dob;
  const gender = req.body.gender;
  const password = req.body.password;
  console.log(req.body)

  const sqlInsert = "INSERT INTO users (name, surname, username, email, date_birth, sex, password) VALUES (?,?,?,?,?,?,?);";

  db.query(sqlInsert, [name, lastname, username, email, dob, gender, password], (err, result) =>{
    res.send(result);
    if(err){
      console.log(err);
    }else{
      console.log("inserted user")
    }
  })

});

module.exports = router;
