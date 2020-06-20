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

const port = process.env.PORT || 3000; 
console.log(`NODE_ENV: ${process.env.NODE_ENV}`);
const server = app.listen(port, () => console.log(`Listening on port ${port}...`));

module.exports=server;
