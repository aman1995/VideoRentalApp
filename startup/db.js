const winston = require("winston");
const mongoose = require("mongoose");
const config = require("config");

module.exports = function () {
  const db = config.get("db");
  mongoose
    .connect(db, { keepAlive: 1, useNewUrlParser: true })
    .then(() => console.log(`Connected To ${db}..`))
    .catch((err) => console.log(`Could not connect to ${db}...`));
};
