const db = require("../config/db_connection");
const bcrypt = require("bcrypt");
const saltRounds = 10;

function store(req, res) {
  const name = req.body.name;
  const lastname = req.body.lastname;
  const username = req.body.username;
  const email = req.body.email;
  const dob = req.body.dob;
  const gender = req.body.gender;
  const password = bcrypt.hashSync(req.body.password, saltRounds);
  console.log(req.body);

  const sqlInsert =
    "INSERT INTO users (name, surname, username, email, date_birth, sex, password) VALUES (?,?,?,?,?,?,?);";

  db.query(
    sqlInsert,
    [name, lastname, username, email, dob, gender, password],
    (err, result) => {
      //res.send(result);
      if (err) {
        console.log(err.errno);
        res.send(false);
      } else {
        console.log("inserted user");
        res.send(true);
      }
    }
  );
}

module.exports = {
  store: (req, res) => store(req, res),
};
