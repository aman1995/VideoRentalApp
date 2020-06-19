const express = require('express');
const genres = require('../routes/genres');
const movies = require('../routes/movies');
const customers = require('../routes/customers');
const rentals = require('../routes/rentals');
const user = require('../routes/user');
const auth = require('../routes/auth');
const returns = require('../routes/returns');
const error = require('../middleware/error');
const helmet = require('helmet');
const morgan = require('morgan');

module.exports = function (app){
    app.use(express.json());
    app.use(helmet());
    app.use(morgan('tiny'));

    app.use('/api/genres', genres);
    app.use('/api/customers', customers);
    app.use('/api/movies', movies);
    app.use('/api/rentals', rentals);
    app.use('/api/user', user);
    app.use('/api/auth', auth);
    app.use('/api/returns', returns );
    app.use(error);

}