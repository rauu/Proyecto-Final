const express = require("express");
const router = express.Router();
const controller = require("../../controllers/forgotPasswordController")


router.put("/", controller.update);

module.exports = router;
