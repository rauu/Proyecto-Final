const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require('cookie-parser')

app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({ extended: true }))

const PORT = process.env.PORT || 3001;

app.use(cors({
  origin:['http://localhost:3000'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));
app.use(cookieParser())
app.use(express.json());

require("./src/routes")(app);

app.listen(PORT, () => {
  console.log(`Running on port ${PORT}`);
});


/* 
const nodemailer = require("nodemailer");
const gmailConnection = require("./src/config/gmail_connection");

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
  subject: "Sending Email using Node.js",
  text: "That was easy!",
  attachments: [
    {
      //path: pdf,
      // filename: 'text1.pdf',
      //content: 'aGVsbG8gd29ybGQh',
      //encoding: 'base64'
    },
  ],
};

transporter.sendMail(mailOptions, function (error, info) {
  if (error) {
    console.log(error);
  } else {
    console.log("Email sent: " + info.response);
  }
});
 */