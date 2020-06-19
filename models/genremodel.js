const Joi = require('joi');
const mongoose = require('mongoose');

 const genreSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
        minlength : 3,
        maxlength : 50 
    }   
});

const Genre = mongoose.model('Genre', genreSchema);

const validateGenre = ((genre)=>{
    const schema = {
        name : Joi.string().min(3).max(50).required()
     };
     return Joi.validate(genre , schema)
})

module.exports.genreSchema = genreSchema;
module.exports.Genre = Genre;
module.exports.validateGenre = validateGenre;