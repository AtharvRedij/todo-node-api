const express = require("express");
const bcrypt = require("bcrypt");

const { User, validate } = require("../models/user");

const router = express.Router();

// register a user
router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send("User already registered.");

  const { name, email, password } = req.body;
  user = new User({
    name,
    email,
    password,
  });

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  await user.save();

  const token = user.generateAuthToken();

  res.header("x-auth-token", token).send({
    _id: user._id,
    name,
    email,
  });
});

// login
router.get("/", async (req, res) => {
  const { error } = validate({ ...req.body, name: "test" });
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Invalid email");

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send("Invalid password");

  const token = user.generateAuthToken();
  res.send(token);
});

module.exports = router;
