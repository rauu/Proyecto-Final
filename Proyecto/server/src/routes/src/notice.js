const express = require("express");
const router = express.Router();
const controller = require("../../controllers/noticeController")


router.get("/", controller.index);
router.delete("/delete", controller.deleteNotice);

module.exports = router;
