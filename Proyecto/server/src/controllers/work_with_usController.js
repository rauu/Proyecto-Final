const db = require("../config/db_connection");
const randomString = require("../utils/randomString");
const fs = require("fs");

const nodemailer = require("nodemailer");
const gmailConnection = require("../config/gmail_connection");

function store(req, res) {
  const name = req.body.name;
  const lastname = req.body.lastname;
  const email = req.body.email;
  const message = req.body.message;
  const file = req.body.file;

  let route = "src/uploads/";
  let filename =
    "cv/" + "CV-" + name + "_" + lastname + "_" + Date.now() + ".pdf";

  let pdf = file.split(";base64,").pop();

  fs.writeFile(route + filename, pdf, { encoding: "base64" }, function (err) {
    console.log("File created");
  });

  const sqlInsert =
    "INSERT INTO work_with_us (name, surname, email, file_location, message) VALUES (?,?,?,?,?);";

  db.query(
    sqlInsert,
    [name, lastname, email, filename, message],
    (err, result) => {
      //res.send(result);
      if (err) {
        console.log(err.errno);
        res.send(false);
      } else {
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
          to: "raunakbinyani.binyani@gmail.com",
          subject: "New CV application recived",
          text:
            "You got a new CV application of " +
            name +
            " " +
            lastname +
            "\nHis email is " +
            email,
        };

        transporter.sendMail(mailOptions, function (error, info) {
          if (error) {
            console.log(error);
          } else {
            console.log("Email sent: " + info.response);
          }
        });
        res.send(true);
      }
    }
  );
}

module.exports = {
  store: (req, res) => store(req, res),
};
