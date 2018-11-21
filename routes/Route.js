const authenticate = require("../helpers/Auth_Helper");
const souvenirLogic = require("../bisnislogics/M_Souvenir_Logic");

module.exports = server => {
  // Root Route
  server.get("/", (req, res, next) => {});

  // All Routes Here

  // Souvenir Route
  // Made By: Dian Yuanda
  server.get("/api/souvenir", souvenirLogic.readAllHandler);
  server.get("/api/souvenir/:souvenirId", souvenirLogic.readByIdHandler);
  server.post("/api/souvenir", souvenirLogic.createHandler);
  server.put("/api/souvenir/:souvenirId", souvenirLogic.updateHandler);
  server.del("/api/souvenir/:souvenirId", souvenirLogic.deleteHandler);
  //== End of Souvenir Route
};
