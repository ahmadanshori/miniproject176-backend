const souvenirLogic = require("../bisnislogics/M_Souvenir_Logic");
const menuBisnisLogic = require("../bisnislogics/M_Menu_Bisnis_Logic");
const authenticate = require("../helpers/Auth_Helper");
const productLogic = require("../bisnislogics/M_Product_Logic");
const tSouvernirLogic = require("../bisnislogics/T_Souvernir_Logic");

module.exports = server => {
  // Root Route
  server.get("/", (req, res, next) => {});

  // Souvenir Route
  // Made By: Dian Yuanda
  server.get("/api/souvenir", souvenirLogic.readAllHandler);
  server.get("/api/souvenir/:souvenirId", souvenirLogic.readByIdHandler);
  server.post("/api/souvenir", authenticate, souvenirLogic.createHandler);
  server.put(
    "/api/souvenir/:souvenirId",
    authenticate,
    souvenirLogic.updateHandler
  );
  server.del(
    "/api/souvenir/:souvenirId",
    authenticate,
    souvenirLogic.deleteHandler
  );
  //== End of Souvenir Route

  // Menu Route
  // Made By: Ahmad Anshori
  server.get("/api/menu", menuBisnisLogic.readMenuAlHandler);
  server.get("/api/menusidebar", menuBisnisLogic.readMenuSidebar);
  server.get("/api/menu/:menuid", menuBisnisLogic.readMenuOneById);
  server.post("/api/menu", menuBisnisLogic.createMenuHandler);
  server.put("/api/menu/:menuid", menuBisnisLogic.updateMenuHandler);
  server.del("/api/menu/:menuid", menuBisnisLogic.deleteMenuHandler);
  //== End of Menu Route

  // Product Route
  // Made By: Rio Yudha P
  server.get("/api/product", productLogic.readAllHandler);
  server.get("/api/product/:productId", productLogic.readByIdHandler);
  server.post("/api/product", productLogic.createHandler);
  server.put("/api/product/:productId", productLogic.updateHandler);
  server.del("/api/product/:productId", productLogic.deleteHandler);
  //== End of Product Route

  // Transaksi Souvernir
  // Made By: Rio Yudha
  server.get("/api/tsouvernir", tSouvernirLogic.readSouvernirAllHandler);
  server.get("/api/tsouvernir/:souvernirId", tSouvernirLogic.readByIdHandler);
  server.post("/api/tsouvernir", tSouvernirLogic.createHandler);
  server.put("/api/tsouvernir/:souvernirId", tSouvernirLogic.updateHandler);
  server.del("/api/tsouvernir/:souvernirId",tSouvernirLogic.deleteHandler);
  //==End of Transaksi Souvernir
};
