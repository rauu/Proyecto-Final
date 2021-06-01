const express = require("express");
const router = express.Router();
const controller = require("../../controllers/updateSettingsController")


router.put("/updateProfile", controller.updateProfile);
router.put("/updatePassword", controller.updatePassword);

module.exports = router;
