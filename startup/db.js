const winston = require('winston');
const mongoose = require('mongoose');
const config = require('config');
module.exports = function(){
    const db = config.get('db');
    mongoose.connect(db)
    .then(() => winston.info(`Connected To ${db}..`))
    .catch(err => console.log(`Could not connect to ${db}...`))
}
