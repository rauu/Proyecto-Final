const express = require("express");
const router = express.Router();
const controller = require("../../controllers/exerciseRoomController")


router.get("/", controller.index);

module.exports = router;
