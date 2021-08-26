const { Todo } = require("../models/todo");

module.exports = async function (req, res, next) {
  const todo = await Todo.findById(req.params.id).select("-__v");

  if (!todo)
    return res.status(404).send("The todo with the given ID was not found.");

  if (todo.owner !== req.user._id) {
    return res
      .status(401)
      .send("Access denied. This todo does not belong to you.");
  }

  req.todo = todo;

  next();
};
