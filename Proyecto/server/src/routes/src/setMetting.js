const express = require("express");
const router = express.Router();
const controller = require("../../controllers/setMettingController");


 router.post("/", controller.postMetting);
/*router.get("/getsearchuser", controller.getSearchUser); */

module.exports = router;
