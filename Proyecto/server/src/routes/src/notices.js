const express = require("express");
const router = express.Router();
const controller = require("../../controllers/noticesController")


router.get("/", controller.index);

module.exports = router;
