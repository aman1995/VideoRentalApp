const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
//const bcrypt = require('bcrypt');
const Joi = require("joi");
const { User } = require("../models/usermodel");

//HTTP post
router.post("/", async (req, res) => {
  const result = validate(req.body);
  if (result.error)
    return res.status(400).send(result.error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Invalid Credentials");

  //const validPassword = await bcrypt.compare(req.body.password , user.password);
  //if(!validPassword) return res.status(400).send('Invalid Credentials');

  const token = user.generateAuthToken();
  res.send(token);
});

const validate = (user) => {
  const schema = {
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(255).required(),
  };
  return Joi.validate(user, schema);
};

module.exports = router;
