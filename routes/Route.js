const authenticate = require("../helpers/Auth_Helper");
const productLogic = require("../bisnislogics/M_Product_Logic");
const t_souvernir_Logic = require("../bisnislogics/T_Souvernir_Logic");

module.exports = server => {
  // Root Route
  server.get("/", (req, res, next) => {});

  // Product Route
  // Made By: Rio Yudha P
  server.get("/api/product", productLogic.readAllHandler);
  server.get("/api/product/:productId", productLogic.readByIdHandler);
  server.post("/api/product", productLogic.createHandler);
  server.put("/api/product/:productId",productLogic.updateHandler);
  server.del("/api/product/:productId",productLogic.deleteHandler);
  //== End of Product Route

  // Transaksi Souvernir
  server.get("/api/tsouvernir", t_souvernir_Logic.readSouvernirAllHandler);
  //server.get("/api/tsouvernir", t_souvernir_Logic.readSouvernirAllHandler);
  server.post("/api/tsouvernir", t_souvernir_Logic.createHandler);
  

  //==End of Transaksi Souvernir
};
