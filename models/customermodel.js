const Joi = require('joi');
const mongoose = require('mongoose');


const Customer = mongoose.model('Customer', new mongoose.Schema({
    name : {
        type : String,
        required : true,
        minlength : 1,
        maxlength : 50 
    },
    isGold :{
        type : Boolean,
        default : false
    },
    phone : {
        type : String,
        required : true,
        minlength : 5,
        maxlength : 50 
    }   
}));



const validateCustomer = ((customer)=>{
    const schema = {
        name : Joi.string().min(1).max(50).required(),
        phone : Joi.string().min(5).max(50).required(),
        isGold : Joi.boolean()
     };
     return Joi.validate(customer , schema)
})

module.exports.Customer = Customer;
module.exports.validate = validateCustomer;