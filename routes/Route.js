const authenticate = require("../helpers/Auth_Helper").checkToken;
const souvenirLogic = require("../bisnislogics/M_Souvenir_Logic");
const menuLogic = require("../bisnislogics/M_Menu_Bisnis_Logic");
const productLogic = require("../bisnislogics/M_Product_Logic");
const tSouvernirLogic = require("../bisnislogics/T_Souvernir_Logic");
const employeeLogic = require("../bisnislogics/M_Employee_Logic");
const tEventLogic = require("../bisnislogics/T_Event_Logic");
const userLogic = require("../bisnislogics/M_User_Logic");
const unitLogic = require("../bisnislogics/M_Unit_Logic");
const designLogic = require("../bisnislogics/T_Design_Logic");
const roleLogic = require("../bisnislogics/M_Role_Bisnis_Logic");
const accessLogic = require("../bisnislogics/M_Menu_Access_Bisnis_Logic");
const companyLogic = require("../bisnislogics/M_Company_Bisnis_Logic");
const designItemLogic = require("../bisnislogics/T_Design_Item_Logic.js");

module.exports = server => {
  // Root Route
  server.get("/", (req, res, next) => {});

  // All Routes Here

  // Souvenir Route
  // Made By: Dian Yuanda
  server.get("/api/souvenir", authenticate, souvenirLogic.readAllHandler);
  server.get(
    "/api/souvenir/:souvenirId",
    authenticate,
    souvenirLogic.readByIdHandler
  );
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
  //== End of Master Souvenir Route

  // Master Company Route
  // Made By: Deovani Anugrah
  server.get("/api/company", authenticate, companyLogic.readCompanyAlHandler);
  server.get(
    "/api/company/:companyid",
    authenticate,
    companyLogic.readCompanyOneById
  );
  server.post("/api/company", authenticate, companyLogic.createCompanyHandler);
  server.put(
    "/api/company/:companyid",
    authenticate,
    companyLogic.updateCompanyHandler
  );
  server.del(
    "/api/company/:companyid",
    authenticate,
    companyLogic.deleteCompanyHandler
  );
  //== End of Master Company Route

  // Master Role Route
  // Made By: Randika Alditia
  server.get("/api/role", authenticate, roleLogic.readAllRole);
  server.get("/api/role/:id", authenticate, roleLogic.readOneRole);
  server.post("/api/role", authenticate, roleLogic.createRole);
  server.put("/api/role/:id", authenticate, roleLogic.updateRole);
  server.del("/api/role/:id", authenticate, roleLogic.deleteRole);
  //== End of Master Role Route

  // Master Access Menu Route
  // Made By: Randika Alditia
  server.get("/api/access", authenticate, accessLogic.readAllAccess);
  server.get("/api/access/:id", authenticate, accessLogic.readOneAccess);
  server.put("/api/access/:id", authenticate, accessLogic.updateAccess);
  //== End of Master Access Menu Route

  // Master Menu Route
  // Made By: Ahmad Anshori
  server.get("/api/menu", authenticate, menuLogic.readMenuAlHandler);
  server.get("/api/menusidebar", authenticate, menuLogic.readMenuSidebar);
  server.get("/api/menu/:menuid", authenticate, menuLogic.readMenuOneById);
  server.post("/api/menu", authenticate, menuLogic.createMenuHandler);
  server.put("/api/menu/:menuid", authenticate, menuLogic.updateMenuHandler);
  server.del("/api/menu/:menuid", authenticate, menuLogic.deleteMenuHandler);

  //== End of Master Menu Route

  // Master Product Route
  // Made By: Rio Yudha P
  server.get("/api/product", authenticate, productLogic.readAllHandler);
  server.get(
    "/api/product/:productId",
    authenticate,
    productLogic.readByIdHandler
  );
  server.post("/api/product", authenticate, productLogic.createHandler);
  server.put(
    "/api/product/:productId",
    authenticate,
    productLogic.updateHandler
  );
  server.del(
    "/api/product/:productId",
    authenticate,
    productLogic.deleteHandler
  );
  //== End of Master Product Route

  // Master Employee Route
  // Made By: Purwanto
  server.get("/api/employee", authenticate, employeeLogic.readAllHandler);
  server.get(
    "/api/employee/:employeeId",
    authenticate,
    employeeLogic.readByIdHandler
  );
  server.post("/api/employee", authenticate, employeeLogic.createHandler);
  server.put(
    "/api/employee/:employeeId",
    authenticate,
    employeeLogic.updateHandler
  );
  server.del(
    "/api/employee/:employeeId",
    authenticate,
    employeeLogic.deleteHandler
  );
  //== End of Master Employee Route

  // Transaction Event Route
  // Made By: Purwanto
  server.get("/api/tevent", authenticate, tEventLogic.readAllHandler);
  server.get(
    "/api/tevent/:teventId",
    authenticate,
    tEventLogic.readByIdHandler
  );
  server.post("/api/tevent", authenticate, tEventLogic.createHandler);
  server.put("/api/tevent/:teventId", authenticate, tEventLogic.updateHandler);
  server.del("/api/tevent/:teventId", authenticate, tEventLogic.deleteHandler);
  //== End of Transaction Event Route

  // Transaction Souvernir Route
  // Made By: Rio Yudha
  server.get(
    "/api/tsouvernir",
    authenticate,
    tSouvernirLogic.readSouvernirAllHandler
  );
  server.get(
    "/api/tsouvernir/:souvernirId",
    authenticate,
    tSouvernirLogic.readByIdHandler
  );
  server.post("/api/tsouvernir", authenticate, tSouvernirLogic.createHandler);
  //==End of Transaction Souvernir Route

  // Master User Route - Login Process
  // Made By: Hanif Al Baaits
  server.post("/api/user/login", userLogic.loginUserHandler);
  server.put("/api/user/repass/:userid", userLogic.updatePassword);
  // Master User Route - CRUD
  server.get("/api/useremployee", authenticate, userLogic.readEmployeeFromUser);
  server.get("/api/user", authenticate, userLogic.readUserAllHandler);
  server.get("/api/user/:userid", authenticate, userLogic.readUserByUsername);
  server.post("/api/user", authenticate, userLogic.createUserHandler);
  server.put("/api/user/:userid", authenticate, userLogic.updateUserById);
  server.del("/api/user/:id", authenticate, userLogic.deleteUserHandler);
  //==End of Master User Route

  // Master Unit Route
  // Made By: Fahmi Muzakki
  server.get("/api/unit", authenticate, unitLogic.readUnitHandler);
  server.get("/api/unit/:unitId", authenticate, unitLogic.readOneByIdHandler);
  server.post("/api/unit", authenticate, unitLogic.createUnitHandler);
  server.put("/api/unit/:unitId", authenticate, unitLogic.updateUnitHandler);
  server.del("/api/unit/:unitId", authenticate, unitLogic.deleteUnitHandler);
  //==End of Master Unit Route

  // Transaction Design Route
  // Made By: Dian Yuanda
  server.get("/api/design", authenticate, designLogic.readAllDesignHandler);
  server.get(
    "/api/design/:designId",
    authenticate,
    designLogic.readByIdHandler
  );
  server.post("/api/design", authenticate, designLogic.createDesignHandler);
  server.put(
    "/api/design/:designId",
    authenticate,
    designLogic.updateDesignHandler
  );
  //== End of Transaction Design Route

  // Transaction Souvenir Route
  // Made By: Rio Yudha
  server.put(
    "/api/tsouvernir/:souvernirId",
    authenticate,
    tSouvernirLogic.updateHandler
  );
  server.del(
    "/api/tsouvernir/:souvernirId",
    authenticate,
    tSouvernirLogic.deleteHandler
  );
  //==End of Transaksi Souvernir

  // Transaction Design Item Route
  // Made By: Dian Yuanda
  server.get(
    "/api/design/item/:designId",
    authenticate,
    designItemLogic.readAllItemHandler
  );
  server.post(
    "/api/design/item",
    authenticate,
    designItemLogic.createItemHandler
  );
  server.put(
    "/api/design/item/:itemId",
    authenticate,
    designItemLogic.updateItemHandler
  );
  server.del(
    "/api/design/item/:itemId",
    authenticate,
    designItemLogic.deleteItemHandler
  );
  //== End of Transaction Design Item Route

  // Transaction Design Approve Route
  // Made By: Fahmi Muzakki
  server.put(
    "/api/design/approve/:Id",
    authenticate,
    designLogic.approveHandler
  );
  server.put(
    "/api/design/close_request/:Id",
    authenticate,
    designLogic.closeReqHandler
  );
  //== End of Transaction Design Approve

  // Transaction Design Close Route
  // Made By: Fahmi Muzakki
  server.post("/api/design/item_file", designLogic.createDesignItemFile);
  //== End of Transaction Design Close Route
};
