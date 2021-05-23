const express = require("express");
const router = express.Router();
const controller = require("../../controllers/usersController")


router.post("/", controller.store);
router.get("/getUser", controller.getUser);
router.get("/getEmail", controller.getEmail);

module.exports = router;
