const souvenirLogic = require("../bisnislogics/M_Souvenir_Logic");
const MenuBisnisLogic = require("../bisnislogics/M_Menu_Bisnis_Logic");

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

  //== Menu =======
  // authenticate.checkToken,
  server.get("/api/menu", MenuBisnisLogic.readMenuAlHandler); //mengambil seluruh data company
  server.get("/api/menusidebar", MenuBisnisLogic.readMenuSidebar); //mengambil seluruh data company
  server.get("/api/menu/:menuid", MenuBisnisLogic.readMenuOneById); //menhambil 1 data berdasarkan params company
  server.post("/api/menu", MenuBisnisLogic.createMenuHandler); //membuat company baru (body)
  server.put("/api/menu/:menuid", MenuBisnisLogic.updateMenuHandler); //mengupdate berdasarkan params dan body
  server.del("/api/menu/:menuid", MenuBisnisLogic.deleteMenuHandler); //mengubah field delete menjadi true
};
