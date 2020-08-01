const validateObjectId =  require('../middleware/validateObjectId');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const {Genre,validateGenre} = require('../models/genremodel');


//HTTP get 
router.get('/'  , async (req,res) =>{
    const genres = await Genre.find().sort('name');
    res.send(genres);
});

router.get('/:id' , validateObjectId , async(req,res) => {
    const genre = await Genre.findById(req.params.id)
    
    if(!genre) return res.status('404').send(`The genre with given Id ${req.params.id} not found`)
    res.send(genre);
});

//HTTP post
router.post('/', async (req,res) => {
    
     const result = validateGenre(req.body);
     if(result.error)  return res.status(400).send(result.error.details[0].message);
     
     const genre = new Genre({  
        name :  req.body.name
     });
     await genre.save();
     res.send(genre);
});

//HTTP put
router.put('/:id', auth, async (req,res)=>{
    const result = validateGenre(req.body);
    if(result.error){
         return res.status(400).send(result.error.details[0].message);
    }

    const genre = await Genre.findByIdAndUpdate(req.params.id , {name : req.body.name} , {
        new : true 
    })

    if(!genre) return res.status('404').send(`The genre with given Id not found`)
    res.send(genre);
});

//HTTP delete
router.delete('/:id', [auth, admin], async (req,res)=>{
  
    const genre = await Genre.findByIdAndRemove(req.params.id);
    if(!genre) return res.status('404').send(`The genre with given Id ${req.params.id} not found`)
    res.send(genre);
});


module.exports = router;