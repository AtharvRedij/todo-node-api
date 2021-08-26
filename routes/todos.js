const express = require("express");

const { Todo, validate } = require("../models/todo");
const validateObjectId = require("../middleware/validateObjectId");
const auth = require("../middleware/auth");
const fetchTodo = require("../middleware/fetchTodo");

const router = express.Router();

router.post("/", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let todo = new Todo({ title: req.body.title, owner: req.user._id });
  todo = await todo.save();

  res.send(todo);
});

router.get("/", auth, async (req, res) => {
  const todos = await Todo.find({ owner: req.user._id })
    .select("-__v")
    .sort("title");
  res.send(todos);
});

router.get("/:id", [auth, validateObjectId, fetchTodo], async (req, res) => {
  res.send(req.todo);
});

router.put("/:id", [auth, validateObjectId, fetchTodo], async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const todo = req.todo;
  todo.title = req.body.title;
  await todo.save();

  res.send(todo);
});

router.delete("/:id", [auth, validateObjectId, fetchTodo], async (req, res) => {
  const todo = req.todo;
  await todo.delete();

  res.send(todo);
});

module.exports = router;
