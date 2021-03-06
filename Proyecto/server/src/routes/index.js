const express = require("express");
function router(app) {
  app.use("/users", require("./src/users"));
  app.use("/workwithus", require("./src/work_with_us"));
  app.use("/login", require("./src/login"));
  app.use("/contactUs", require("./src/contactUs"));
  app.use("/uploadVideo", require("./src/uploadVideos"));
  app.use("/uploadNews", require("./src/uploadNews"));
  app.use("/changePassword", require("./src/forgotPassword"));
  app.use("/updateSettings", require("./src/userSettings"));
  app.use("/admin", require("./src/admin"));
  app.use("/dashboard", require("./src/dashboard"));
  app.use("/allTrainers", require("./src/allTrainers"));
  app.use("/trainer", require("./src/trainerProfile"));
  app.use("/plans", require("./src/plans"));
  app.use("/subscribe", require("./src/subscribe"));
  app.use("/exerciseRooms", require("./src/exerciseRoom"));
  app.use("/exerciseRoomVideo", require("./src/exerciseRoomVideos"));
  app.use("/notices", require("./src/notices"));
  app.use("/notice", require("./src/notice"));
  app.use("/comments", require("./src/comments"));
  app.use("/video", require("./src/video"));
  app.use("/sendMessage", require("./src/setMetting"));

  app.use(express.static("src/uploads"));
}

module.exports = router;
