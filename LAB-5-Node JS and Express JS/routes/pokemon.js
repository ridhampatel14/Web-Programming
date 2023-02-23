//You will code the route in this file
//Lecture Code Refernece -> https://github.com/stevens-cs546-cs554/CS-546/tree/master/lecture_05/code/routes
const express = require('express');
const router = express.Router();
const data = require('../data');
const pokemonData = data.pokemon;
//const validateID=data.pokemon.validateID;
router
  .route('/pokemon')
  .get(async (req,res) => {
    try{
      const pokemon=await pokemonData.pokemon();
      res.json(pokemon);
    }catch(e){
      res.status(500).send(e);
    }
  })
  .post(async (req, res) => {
    // Not implemented
    res.send('POST request to http://localhost:3000/pokemon');
  })
  .delete(async (req, res) => {
    // Not implemented
    res.send('DELETE request to http://localhost:3000/pokemon');
  });
  
//Request Method

router
  .route('/pokemon/:id')
  .get(async (req,res) => {
    try{
      req.params.id=pokemonData.validateID(req.params.id);
      const pokemon=await pokemonData.pokemonById(req.params.id);
      res.json(pokemon);
    }catch(e){
      if(e=='Pokémon Not Found!'){
        res.status(404).json(e);
      }else{
        res.status(400).json('Invalid URL Parameter');
      }
    }
  })
  .post(async (req, res) => {
    res.send(`POST request to http://localhost:3000/pokemon/${req.params.id}`);
  })
  .delete(async (req, res) => {
    res.send(`DELETE request to http://localhost:3000/pokemon/${req.params.id}`);
  });
//Request Method

module.exports = router;