const mysql = require("mysql");
const mysqlConnection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "gymooze",
});

mysqlConnection.connect((err) => {
  if (!err) {
    console.log("Connected to DB");
  } else {
    console.log("Connection failed: " + err);
  }
});

module.exports = mysqlConnection; 


