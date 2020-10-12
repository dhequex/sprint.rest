const pokeData = require("./data");
const express = require("express");

const setupServer = () => {
  const app = express();
  app.use(express.json());

  app.get("/api/pokemon", (req, res) => {
    res.send(pokeData.pokemon);
  });

  app.get("/api/pokemon", (req, res) => {
    res.sendStatus(200);
  });

  return app;
};

module.exports = { setupServer };
