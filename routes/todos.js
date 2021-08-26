const express = require("express");

const { Todo, validate } = require("../models/todo");
const validateObjectId = require("../middleware/validateObjectId");
const auth = require("../middleware/auth");

const router = express.Router();

router.get("/", auth, async (req, res) => {
  const todos = await Todo.find().select("-__v").sort("title");
  res.send(todos);
});

router.get("/:id", auth, validateObjectId, async (req, res) => {
  const todo = await Todo.findById(req.params.id).select("-__v");

  if (!todo)
    return res.status(404).send("The todo with the given ID was not found.");

  res.send(todo);
});

router.post("/", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let todo = new Todo({ title: req.body.title });
  todo = await todo.save();

  res.send(todo);
});

router.put("/:id", [auth, validateObjectId], async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const todo = await Todo.findByIdAndUpdate(
    req.params.id,
    { title: req.body.title },
    {
      new: true,
    }
  );

  if (!todo)
    return res.status(404).send("The todo with the given ID was not found.");

  res.send(todo);
});

router.delete("/:id", [auth, validateObjectId], async (req, res) => {
  const todo = await Todo.findByIdAndRemove(req.params.id);

  if (!todo)
    return res.status(404).send("The todo with the given ID was not found.");

  res.send(todo);
});

module.exports = router;
