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

async function index(req, res) {
  let sqlResult = {
    user: true,
    email: true,
  };
  //Username validation
  if (req.query.username !== "") {
    const sqlCheck = "SELECT username FROM users WHERE username = ?";

     await db.query(sqlCheck, [req.query.username], async (err, result) => {
      //res.send(result);
       if (result.length > 0) {
         sqlResult = {
          ...sqlResult,
          user: false,
        };
        console.log("Entra")
        console.log(sqlResult)
        //return res.send(sqlResult);
      } else {
        sqlResult = {
          user: true,
        };
      }
    });
  } else if (req.query.email !== "") {
    const sqlCheck = "SELECT email FROM users WHERE email = ?";

    db.query(sqlCheck, [req.query.email], (err, result) => {
      //res.send(result);
      if (result.length > 0) {
        sqlResult = {
          ...sqlResult,
          email: false,
        };
        //return res.send(sqlResult);
      } else {
        sqlResult = {
          ...sqlResult,
          email: true,
        };
      }
    });
  }
  console.log(sqlResult);

  res.send(sqlResult);

  //Email validation
}

module.exports = {
  store: (req, res) => store(req, res),
  index: (req, res) => index(req, res),
};
