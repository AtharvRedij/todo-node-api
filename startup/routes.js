const express = require("express");
const test = require("../routes/test");
const users = require("../routes/users");
// const todos = require("../routes/todos");

// const error = require("../middleware/error");

module.exports = function (app) {
  app.use(express.json());
  app.use("/api/test", test);
  app.use("/api/users", users);
  //   app.use("/api/todos", todos);
  //   app.use(error);
};
