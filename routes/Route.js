const souvenirLogic = require("../bisnislogics/M_Souvenir_Logic");
const menuBisnisLogic = require("../bisnislogics/M_Menu_Bisnis_Logic");
const productLogic = require("../bisnislogics/M_Product_Logic");
const tSouvernirLogic = require("../bisnislogics/T_Souvernir_Logic");
const employeeLogic = require("../bisnislogics/M_Employee_Logic");
const tEventLogic = require("../bisnislogics/T_Event_Logic");

module.exports = server => {
  // Root Route
  server.get("/", (req, res, next) => {});

  // Master Souvenir Route
  // Made By: Dian Yuanda
  server.get("/api/souvenir", souvenirLogic.readAllHandler);
  server.get("/api/souvenir/:souvenirId", souvenirLogic.readByIdHandler);
  server.post("/api/souvenir", souvenirLogic.createHandler);
  server.put("/api/souvenir/:souvenirId", souvenirLogic.updateHandler);
  server.del("/api/souvenir/:souvenirId", souvenirLogic.deleteHandler);
  //== End of Master Souvenir Route

  // Master Menu Route
  // Made By: Ahmad Anshori
  server.get("/api/menu", menuBisnisLogic.readMenuAlHandler);
  server.get("/api/menusidebar", menuBisnisLogic.readMenuSidebar);
  server.get("/api/menu/:menuid", menuBisnisLogic.readMenuOneById);
  server.post("/api/menu", menuBisnisLogic.createMenuHandler);
  server.put("/api/menu/:menuid", menuBisnisLogic.updateMenuHandler);
  server.del("/api/menu/:menuid", menuBisnisLogic.deleteMenuHandler);
  //== End of Master Menu Route

  // Master Product Route
  // Made By: Rio Yudha P
  server.get("/api/product", productLogic.readAllHandler);
  server.get("/api/product/:productId", productLogic.readByIdHandler);
  server.post("/api/product", productLogic.createHandler);
  server.put("/api/product/:productId", productLogic.updateHandler);
  server.del("/api/product/:productId", productLogic.deleteHandler);
  //== End of Master Product Route

  // Master Employee Route
  // Made By: Purwanto
  server.get("/api/employee", employeeLogic.readAllHandler);
  server.get("/api/employee/:employeeId", employeeLogic.readByIdHandler);
  server.post("/api/employee", employeeLogic.createHandler);
  server.put("/api/employee/:employeeId", employeeLogic.updateHandler);
  server.del("/api/employee/:employeeId", employeeLogic.deleteHandler);
  //== End of Master Employee Route

  // Transaction Event Route
  // Made By: Purwanto
  server.get("/api/tevent", tEventLogic.readAllHandler);
  server.get("/api/tevent/:teventId", tEventLogic.readByIdHandler);
  server.post("/api/tevent", tEventLogic.createHandler);
  server.put("/api/tevent/:teventId", tEventLogic.updateHandler);
  server.del("/api/tevent/:teventId", tEventLogic.deleteHandler);
  //== End of Transaction Event Route

  // Transaction Souvernir Route
  // Made By: Rio Yudha
  server.get("/api/tsouvernir", tSouvernirLogic.readSouvernirAllHandler);
  server.post("/api/tsouvernir", tSouvernirLogic.createHandler);
  //==End of Transaction Souvernir Route
};
