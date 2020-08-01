const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const {Customer,validate} = require('../models/customermodel');


//HTTP get 
router.get('/' , async (req,res) =>{
    const customers = await Customer.find().sort('name');
    res.send(customers);
});

router.get('/:id' , async(req,res) =>{
    const customer = await Customer.findById(req.params.id);
    if(!customer) return res.status('404').send(`The customer with given Id ${req.params.id} not found`)
    res.send(customer);
});

//HTTP post
router.post('/', async (req,res)=>{
    
     const result = validate(req.body);
     if(result.error){
         res.status(400).send(result.error.details[0].message);
     }

     let customer = new Customer({  
        name :  req.body.name,
        phone :  req.body.phone,
        isGold :  req.body.isGold
     });
     customer = await customer.save();
     res.send(customer);
});

//HTTP put
router.put('/:id', async (req,res)=>{
    const result = validate(req.body);
    if(result.error){
         return res.status(400).send(result.error.details[0].message);
    }

    const customer = await Customer.findByIdAndUpdate(req.params.id ,{ 
        name : req.body.name,
        phone : req.body.phone,
        isGold : req.body.isGold,
        },
        { new : true
    })

    if(!customer) return res.status('404').send(`The customer with given Id not found`)
    res.send(customer);
});

//HTTP delete
router.delete('/:id', async (req,res)=>{
    const customer = await Customer.findByIdAndRemove(req.params.id);
    if(!customer) return res.status('404').send(`The customer with given Id ${req.params.id} not found`)
    res.send(customer);
});

module.exports = router;