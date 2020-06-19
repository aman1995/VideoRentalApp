const config = require('config');
const Joi = require('joi');
const logger = require('./logger');

const express = require('express');
const app = express();

require('./startup/logging')();
require('./startup/routes')(app);
require('./startup/db')();
require('./startup/config')();
require('./startup/validation')();
require('./startup/prod')(app);


const server = app.listen(3000, () => console.log("listening"));

module.exports=server;
