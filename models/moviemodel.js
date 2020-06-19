const Joi = require('joi');
const mongoose = require('mongoose');
const {genreSchema} = require('./genremodel');

const Movie = mongoose.model('Movie', new mongoose.Schema({
    title : {
        type : String,
        required : true,
        minlength : 3,
        maxlength : 255
    },
    genre : {
        type : genreSchema,
        required : true
    },
    numberInStock:{
        type : Number,  
        required : true,
        min : 0,
        max : 255 
    },
    dailyRentalRate : {
        type : Number,
        required : true,
        min : 0,
        max : 255
    }

}));

const validateMovie = ((movie)=>{
    const schema = {
        title : Joi.string().min(1).max(50).required(),
        genreId : Joi.objectId().required(),
        numberInStock : Joi.number().min(0).max(255).required(),
        dailyRentalRate : Joi.number().min(0).max(255).required(),
     };
     return Joi.validate(movie , schema)
})



module.exports.validateMovie = validateMovie;
module.exports.Movie = Movie;