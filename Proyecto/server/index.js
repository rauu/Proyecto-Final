const express = require("express");
const app = express();
const cors = require("cors");
/* const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser"); */

app.use(express.json({ limit: "50000000mb" }));
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 3001;

app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
/* app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true })); */
/* app.use(express.json());
 */
require("./src/routes")(app);

app.listen(PORT, () => {
  console.log(`Running on port ${PORT}`);
});
