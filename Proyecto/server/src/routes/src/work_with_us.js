const express = require("express");
const router = express.Router();
const controller = require("../../controllers/work_with_usController");


router.post("/", controller.store);

module.exports = router;
