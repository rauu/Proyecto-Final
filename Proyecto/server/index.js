const express = require("express");
const app = express();
const cors = require("cors");


app.use(express.json({ limit: "50000000mb" }));
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 3001;

app.use(
  cors({
    /* origin: ["http://192.168.1.38:3000"], */
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
/* app.use(cors()); */
/* // Add headers
app.use(function (req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
}); */
require("./src/routes")(app);

app.listen(PORT, () => {
  console.log(`Running on port ${PORT}`);
});
