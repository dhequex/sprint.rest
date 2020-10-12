const pokeData = require("./data");
const express = require("express");
const { all } = require("underscore");

const setupServer = () => {
  const app = express();
  app.use(express.json());

  app.get("/api/pokemon", (req, res) => {
    res.send(pokeData.pokemon);
    res.end();
  });

  //this is for returning n number of pokemon
  app.get("/api/pokemon/", (req, res) => {
    const { limit } = req.query;
    const result = pokeData.pokemon.slice(0, Number(limit));

    console.log(result);
    res.send(result);
    res.end();
  });

  //this is for inserting a new pokemon

  app.post("/api/pokemon/"),
    (req, res) => {
      const newPokemon = pokeData.pokemon[1];
      console.log(newPokemon);
      const allPokemon = pokeData.pokemon;
      allPokemon.push(newPokemon);
      res.send(allPokemon);
    };
  //this is for geting a new pokemon by id

  app.get("/api/pokemon/:n", (req, res) => {
    const index = req.params.n;
    let result = pokeData.pokemon[index - 1];
    /* const result = [];
    for (let i = 0; i < limit; i++) {
     result.push(pokeData.pokemon[i]);
    } */
    console.log(result);
    res.send(result);
  });

  return app;
};

module.exports = { setupServer };
