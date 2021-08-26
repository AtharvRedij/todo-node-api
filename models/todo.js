const Joi = require("joi");
const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50,
  },
});

const Todo = mongoose.model("Todo", todoSchema);

function validateTodo(todo) {
  const schema = Joi.object({
    title: Joi.string().min(5).max(50).required(),
  });

  return schema.validate(todo);
}

exports.todoSchema = todoSchema;
exports.Todo = Todo;
exports.validate = validateTodo;
