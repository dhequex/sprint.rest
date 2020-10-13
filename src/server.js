const pokeData = require("./data");
const express = require("express");
const { all } = require("underscore");

const setupServer = () => {
  const app = express();
  app.use(express.json());

  app.get("/api/pokemon/", (req, res) => {
    if (req.query === {}) {
      res.send(pokeData.pokemon);
    } else {
      const limit = req.query.limit;
      const result = pokeData.pokemon.slice(0, limit);
      res.send(result);
    }
  });

  app.get("/api/pokemon/", (req, res) => {
    res.sendStatus(200);
  });

  app.post("/api/pokemon/:name", (req, res) => {
    const newPokemon = req.params;
    pokeData.pokemon.push(newPokemon);
    //console.log(newPokemon);
    //res.end();
    res.send(pokeData.pokemon);
  });

  //get pokemon by id
  app.get("/api/pokemon/:id", (req, res) => {
    const searchPokemon = req.params;
    searchPokemon.id = parseInt(searchPokemon.id);
    let result;
    for (const pokemon of pokeData.pokemon) {
      if (parseInt(pokemon.id) === searchPokemon.id) {
        result = pokemon;
      }
    }
    //console.log(result);
    //res.end();
    res.send(result);
  });

  return app;
};

module.exports = { setupServer };
