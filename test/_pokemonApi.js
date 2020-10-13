const chai = require("chai");
const chaiHttp = require("chai-http");
chai.use(chaiHttp);
const { setupServer } = require("../src/server");
chai.should();
const pokeData = require("../src/data");

/*
 * This sprint you will have to create all tests yourself, TDD style.
 * For this you will want to get familiar with chai-http https://www.chaijs.com/plugins/chai-http/
 * The same kind of structure that you encountered in lecture.express will be provided here.
 */
const server = setupServer();
describe("Pokemon API Server", () => {
  let request;
  beforeEach(() => {
    request = chai.request(server);
  });

  describe("Pokemon", () => {
    it("It should return the full list of Pokemon", async () => {
      const res = await request.get("/api/pokemon");
      res.should.have.status(200);
      res.body.should.deep.equal(pokeData.pokemon);
      res.body.should.have.lengthOf(151);
    });

    it("It should only return N number of Pokemon", async () => {
      const res = await request.get("/api/pokemon/?limit=5");
      res.should.have.status(200);
      res.body.should.have.lengthOf(5);
      res.body[4].name.should.deep.equal("Charmeleon");
    });

    it("It add a Pokemon with POST", async () => {
      const res = await request.post("/api/pokemon/Chikorita");
      res.body.should.have.lengthOf(152);
      res.body[151].name.should.deep.equal("Chikorita");
    });

    it("It should get a Pokemon's ID", async () => {
      const res = await request.get("/api/pokemon/006");
      res.body.name.should.deep.equal("Charizard");
    });

    it("It should get a Pokemon by name", async () => {
      const res = await request.get("/api/pokemon/mew");
      res.body.name.should.deep.equal("Mew");
    });

    it("It should be able to Modify a Pokemon", async () => {
      const res = await request.patch("/api/pokemon/Mewtwo");
      res.body.name.should.deep.equal("Mewthree");
    });

    it("It should be able to Delete a Pokemon", async () => {
      const res = await request.delete("/api/pokemon/Pikachu");
      res.body.should.have.lengthOf(151);
      res.body[150].name.should.deep.equal("Chikorita");
    });

    it("It should be get a Pokemon's evolutions", async () => {
      const res = await request.get("/api/pokemon/bulbasaur/evolutions");
      res.body.should.have.lengthOf(2);
    });
  });
});
