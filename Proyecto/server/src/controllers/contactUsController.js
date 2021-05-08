const db = require("../config/db_connection");

const nodemailer = require("nodemailer");
const gmailConnection = require("../config/gmail_connection");

function store(req, res) {
  const name = req.body.name;
  const lastname = req.body.lastname;
  const email = req.body.email;
  const message = req.body.message;
  const telephone = req.body.number;

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
    subject: name + " " + lastname + " wants to contact with you",
    text:
      "Name:  " +
      name +
      "\n\nLast name: " +
      lastname +
      "\n\nMessage: " +
      message +
      "\n\nTelephone: " +
      telephone +
      "\n\nEmail: " +
      email,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
}

module.exports = {
  store: (req, res) => store(req, res),
};
