const Joi = require('joi');
const auth = require('../middleware/auth');
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const {Movie} = require('../models/moviemodel');
const {Customer} = require('../models/customermodel');
const {Rental} = require('../models/rentalmodel');


//HTTP post
router.post('/', auth, async (req,res)=>{
    
    const result = validateReturns(req.body);
    if(result.error) return res.status(400).send(result.error.details[0].message);

    const movie = await Movie.findById(req.body.movieId);
    if(!movie) return res.status(400).send('Invalid Movie');

    const customer = await Customer.findById(req.body.customerId);
    if(!customer) return res.status(400).send('Invalid Customer');

    const rental = await Rental.lookup(req.body.customerId, req.body.movieId);

    if(!rental) return res.status(404).send('No rental found');
    if(rental.dateReturned) return res.status(400).send('Return already processed');

    rental.return();
    await rental.save();
    
    await Movie.update({ _id : rental.movie_id},{
        $inc : { numberInStock : 1 } 
    })
    
    return res.status(200).send(rental);
    
})

const validateReturns = ((returns)=>{
    const schema = {
        customerId : Joi.objectId().required(),
        movieId : Joi.objectId().required()
     };
     return Joi.validate(rental , schema)
})


module.exports = router;
