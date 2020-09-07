const config = require("config");
const auth = require("../middleware/auth");
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
//const bcrypt = require('bcrypt');
const { User, validate } = require("../models/usermodel");

//HTTP get
router.get("/me", auth, async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");
  res.send(user);
});

//HTTP post
router.post("/", async (req, res) => {
  const result = validate(req.body);
  if (result.error)
    return res.status(400).send(result.error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send("User Already exist");

  user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });
  //const salt = await bcrypt.genSalt(10);
  user.password = ""; //await bcrypt.hash(user.password,salt);

  await user.save();

  const token = user.generateAuthToken();
  res.header("x-auth-token", token).send({
    name: user.name,
    email: user.email,
  });
});

module.exports = router;
