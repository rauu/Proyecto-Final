const express = require("express");
const router = express.Router();
const controller = require("../../controllers/usersController")


router.post("/", controller.store);

module.exports = router;
