const pokeData = require("./data");
const express = require("express");

const setupServer = () => {
  const app = express();
  app.use(express.json());

  app.get("/api/pokemon", (req, res) => {
    res.send(pokeData.pokemon);
  });

  app.get("/api/pokemon/:n", (req, res) => {
    const limit = req.params.n;
    const result = [];
    for (let i = 0; i < limit; i++) {
      result.push(pokeData.pokemon[i]);
    }
    console.log(result);
    res.send(result);
  });

  // app.get("");
  return app;
};

module.exports = { setupServer };
