const pokeData = require("./data");
const express = require("express");
//const { all } = require("underscore");

const setupServer = () => {
  const app = express();
  app.use(express.json());

  app.get("/api/pokemon/", (req, res) => {
    if (req.query !== {}) {
      const limit = req.query.limit;
      const result = pokeData.pokemon.slice(0, limit);
      res.send(result);
    } else {
      res.send(pokeData.pokemon);
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
  app.get("/api/pokemon/:idOrName", (req, res) => {
    let idOrName = req.params.idOrName;
    let targetPokemon;
    if (isNaN(Number(idOrName))) {
      idOrName =
        idOrName.charAt(0).toUpperCase() + idOrName.slice(1).toLowerCase();
      for (const pokemon of pokeData.pokemon) {
        if (idOrName === pokemon.name) {
          targetPokemon = pokemon;
        }
      }
      res.send(targetPokemon);
    } else if (!isNaN(Number(idOrName))) {
      for (const pokemon of pokeData.pokemon) {
        if (Number(pokemon.id) === Number(idOrName)) {
          targetPokemon = pokemon;
        }
      }
      res.send(targetPokemon);
    }
  });

  return app;
};

module.exports = { setupServer };
