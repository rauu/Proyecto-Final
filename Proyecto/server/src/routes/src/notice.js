const express = require("express");
const router = express.Router();
const controller = require("../../controllers/noticeController")


router.get("/", controller.index);

module.exports = router;
