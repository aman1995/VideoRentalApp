const auth = require('../middleware/auth');
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Fawn = require('fawn');
const {Movie} = require('../models/moviemodel');
const {Customer} = require('../models/customermodel');
const {Rental,validateRental} = require('../models/rentalmodel');

Fawn.init(mongoose);


//HTTP get 
router.get('/' , async (req,res) =>{
    const rentals = await Rental.find().sort('-dateOut');
    res.send(rentals);
});

//HTTP post
router.post('/', auth, async (req,res)=>{
    
    const result = validateRental(req.body);
    if(result.error) return res.status(400).send(result.error.details[0].message);

    const movie = await Movie.findById(req.body.movieId);
    if(!movie) return res.status(400).send('Invalid Movie');

    const customer = await Customer.findById(req.body.customerId);
    if(!customer) return res.status(400).send('Invalid Customer');

    if(movie.numberInStock === 0) return res.status(400).send('Movie is not available');

    let rental = new Rental({  
        customer :{
            _id : customer._id,
            name : customer.name,
            phone : customer.phone
        },
        movie : {
            _id : movie._id,
            title : movie.title,
            dailyRentalRate : movie.dailyRentalRate
        }
    })
    try{
        new Fawn.Task()
            .save('rentals' , rental)
            .update('movies',{ _id : movie._id},{
                $inc : {numberInStock : -1}
            })
            .run();

    res.send(rental);
    }
    catch(ex){
        res.status(500).send('Something failed in transaction')
    }
})

module.exports = router;
