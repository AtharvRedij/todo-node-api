const express = require("express");
const test = require("../routes/test");
// const todos = require("../routes/todos");
// const users = require("../routes/users");
// const auth = require("../routes/auth");

// const error = require("../middleware/error");

module.exports = function (app) {
  app.use(express.json());
  app.use("/api/test", test);
  //   app.use("/api/todos", todos);
  //   app.use("/api/users", users);
  //   app.use("/api/auth", auth);
  //   app.use(error);
};
