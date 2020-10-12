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
      const res = await request.get("/api/pokemon/5");
      //res.should.have.status(200);
      res.body.should.have.lengthOf(5);
      //res[5].should.deep.equal("Charmeleon");
    });
  });
});
