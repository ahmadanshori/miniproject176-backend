const authenticate = require("../helpers/Auth_Helper");
const souvenirLogic = require("../bisnislogics/M_Souvenir_Logic");
const designLogic = require("../bisnislogics/T_Design_Logic");
const designItemLogic = require("../bisnislogics/T_Design_Item_Logic.js");

module.exports = server => {
  // Root Route
  server.get("/", (req, res, next) => {});

  // All Routes Here

  // Design Item Route
  // Made By: Dian Yuanda
  server.post("/api/design/item", designItemLogic.createItemHandler);
  server.del("/api/design/item/:itemId", designItemLogic.deleteItemHandler);
  //== End of Design Item Route

  // Souvenir Route
  // Made By: Dian Yuanda
  server.get("/api/souvenir", souvenirLogic.readAllHandler);
  server.get("/api/souvenir/:souvenirId", souvenirLogic.readByIdHandler);
  server.post("/api/souvenir", souvenirLogic.createHandler);
  server.put("/api/souvenir/:souvenirId", souvenirLogic.updateHandler);
  server.del("/api/souvenir/:souvenirId", souvenirLogic.deleteHandler);
  //== End of Souvenir Route

  // Transaction Design Route
  // Made By: Dian Yuanda
  server.get("/api/design", designLogic.readAllDesignHandler);
  server.get("/api/design/:designId", designLogic.readByIdHandler);
  server.post("/api/design", designLogic.createDesignHandler);
  server.put("/api/design/:designId", designLogic.updateDesignHandler);
  //== End of Transaction Design Route
};
