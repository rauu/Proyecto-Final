const express = require("express");
const router = express.Router();
const db = require("../../config/db_connection");
const bcrypt = require('bcrypt');
const saltRounds = 10;
const controller = require("../../controllers/usersController")


//insert movie

router.post("/", controller.store);

module.exports = router;
