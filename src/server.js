const pokeData = require("./data");
const express = require("express");
//const { _ } = require("underscore");
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

  app.patch("/api/pokemon/:idOrName", (req, res) => {
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
      targetPokemon.name = "Mewthree";
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

  app.delete("/api/pokemon/:idOrName", (req, res) => {
    let idOrName = req.params.idOrName;
    let result;
    if (isNaN(Number(idOrName))) {
      idOrName =
        idOrName.charAt(0).toUpperCase() + idOrName.slice(1).toLowerCase();
      result = pokeData.pokemon.filter((pokemon) => pokemon.name !== idOrName);
      res.send(result);
    } else if (!isNaN(Number(idOrName))) {
      result = pokeData.pokemon.filter((pokemon) => pokemon.id !== idOrName);
      res.send(result);
    }
  });

  // get a pokemon's evolutions
  app.get("/api/pokemon/:idOrName/evolutions", (req, res) => {
    let idOrName = req.params.idOrName;
    let result;
    if (isNaN(Number(idOrName))) {
      idOrName =
        idOrName.charAt(0).toUpperCase() + idOrName.slice(1).toLowerCase();
      for (const pokemon of pokeData.pokemon) {
        if (idOrName === pokemon.name && pokemon.evolutions !== undefined) {
          result = pokemon.evolutions;
        } else if (
          idOrName === pokemon.name &&
          pokemon.evolutions === undefined
        ) {
          result = [];
        }
      }

      res.send(result);
    } else if (!isNaN(Number(idOrName))) {
      for (const pokemon of pokeData.pokemon) {
        if (
          Number(pokemon.id) === Number(idOrName) &&
          pokemon.evolutions !== undefined
        ) {
          result = pokemon.evolutions;
        } else {
          result = [];
        }
      }
      res.send(result);
    }
  });

  app.get("/api/pokemon/:idOrName/evolutions/previous", (req, res) => {
    let idOrName = req.params.idOrName;
    let result;
    if (isNaN(Number(idOrName))) {
      idOrName =
        idOrName.charAt(0).toUpperCase() + idOrName.slice(1).toLowerCase();
      for (const pokemon of pokeData.pokemon) {
        if (
          idOrName === pokemon.name &&
          ["Previous evolution(s)"] !== undefined
        ) {
          result = pokemon["Previous evolution(s)"];
        }
      }
      res.send(result);
    } else if (!isNaN(Number(idOrName))) {
      for (const pokemon of pokeData.pokemon) {
        if (
          Number(pokemon.id) === Number(idOrName) &&
          pokemon["Previous evolution(s)"] !== undefined
        ) {
          result = pokemon["Previous evolution(s)"];
        }
      }
      res.send(result);
    }
  });
  app.get("/api/types/", (req, res) => {
    if (req.query !== {}) {
      const limit = req.query.limit;
      res.send(pokeData.types.slice(0, limit));
    } else {
      res.send(pokeData.types);
    }
  });

  app.post("/api/types/:type", (req, res) => {
    const newType = req.params.type;
    pokeData.types.push(newType);
    res.send(pokeData.types);
  });

  app.delete("/api/types/:type", (req, res) => {
    const typetoRemove = req.params.type;
    const result = pokeData.types.filter((type) => type !== typetoRemove);
    res.send(result);
  });

  app.get("/api/types/:type/pokemon", (req, res) => {
    const targetType = req.params.type;
    const result = [];

    for (const pokemon of pokeData.pokemon) {
      if (pokemon.types !== undefined) {
        if (pokemon.types.includes(targetType)) {
          result.push({ id: pokemon.id, name: pokemon.name });
        }
      }
    }
    res.send(result);
  });

  app.get("/api/attacks/", (req, res) => {
    //console.log(req.query);
    if (req.query === {}) {
      res.send(pokeData.attacks);
    } else if (req.query !== {}) {
      let arrayOfAttacks = [];
      const limit = req.query.limit;
      for (let i = 0; i < limit; i++) {
        arrayOfAttacks.push(pokeData.attacks.fast[i]);
      }
      res.send(arrayOfAttacks);
    }
  });

  app.get("/api/attacks/fast", (req, res) => {
    res.send(pokeData.attacks.fast);
  });

  app.get("/api/attacks/special", (req, res) => {
    res.send(pokeData.attacks.special);
  });

  return app;
};

module.exports = { setupServer };
