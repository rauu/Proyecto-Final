const express = require("express");
const app = express();
const cors = require("cors");


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

require("./src/routes")(app);

app.listen(PORT, () => {
  console.log(`Running on port ${PORT}`);
});
