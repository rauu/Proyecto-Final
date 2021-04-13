const express = require("express");
const app = express();
const cors = require("cors");

const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

require("./src/routes")(app);

app.listen(PORT, () => {
  console.log(`Running on port ${PORT}`);
});

/* var nodemailer = require("nodemailer");

var transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  auth: {
    user: "raunakbinyani@gmail.com",
    pass: "Raunak_12",
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