const express = require("express");
const router = express.Router();
const controller = require("../../controllers/forgotPasswordController")


router.post("/", controller.store);

module.exports = router;
