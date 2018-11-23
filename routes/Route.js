const authenticate = require("../helpers/Auth_Helper");
const souvenirLogic = require("../bisnislogics/M_Souvenir_Logic");
const menuBisnisLogic = require("../bisnislogics/M_Menu_Bisnis_Logic");
const productLogic = require("../bisnislogics/M_Product_Logic");
const tSouvernirLogic = require("../bisnislogics/T_Souvernir_Logic");
const employeeLogic = require("../bisnislogics/M_Employee_Logic");
const tEventLogic = require("../bisnislogics/T_Event_Logic");
const userLogic = require("../bisnislogics/M_User_Logic");
const unitLogic = require("../bisnislogics/M_Unit_Logic");
const designLogic = require("../bisnislogics/T_Design_Logic");

const roleLogic = require("../bisnislogics/M_Role_Bisnis_Logic");
const accessLogic = require("../bisnislogics/M_Menu_Access_Bisnis_Logic");
//const authMiddleware = require("../middleware/authmiddleware");

module.exports = server => {
  // Root Route
  server.get("/", (req, res, next) => {});

  // All Routes Here

  // Master Role Route
  // Made By: Randika Alditia
  server.get("/api/role", roleLogic.readAllRole); // get all role
  server.get("/api/role/:id", roleLogic.readOneRole); //get role by param
  server.post("/api/role", roleLogic.createRole); //create role
  server.put("/api/role/:id", roleLogic.updateRole); //update role by param
  server.del("/api/role/:id", roleLogic.deleteRole); //update is_delete by param
  //== End of Master Role Route

  // Master Access Menu Route
  // Made By: Randika Alditia
  //server.post("/api/access", accessLogic.createAccess);
  server.get("/api/access", accessLogic.readAllAccess);
  server.get("/api/access/:id", accessLogic.readOneAccess);
  server.put("/api/access/:id", accessLogic.updateAccess);
  // server.del("/api/access/:id", accessLogic.deleteAccess);
  //== End of Master Access Menu Route

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
  server.get("/api/tsouvernir/:souvernirId", tSouvernirLogic.readByIdHandler);
  server.post("/api/tsouvernir", tSouvernirLogic.createHandler);
  //==End of Transaction Souvernir Route

  // Master User Route
  // Login Process
  // Made By: Hanif Al Baaits
  server.post("/api/user/login", userLogic.loginUserHandler);
  server.put("/api/user/repass/:userid", userLogic.updatePassword); //untuk update password (user)
  //== End of Logic Process Route

  // CRUD User Route
  //ambil nama employee yg belum memiliki user
  server.get(
    "/api/useremployee",
    authenticate.checkToken,
    userLogic.readEmployeeFromUser
  );
  server.get(
    "/api/user",
    authenticate.checkToken,
    userLogic.readUserAllHandler
  );
  //ambil 1 user dari username
  server.get(
    "/api/user/:userid",
    authenticate.checkToken,
    userLogic.readUserByUsername
  );
  //membuat user baru
  server.post(
    "/api/user",
    authenticate.checkToken,
    userLogic.createUserHandler
  );
  server.put("/api/user/:userid", userLogic.updateUserById);
  server.del(
    "/api/user/:id",
    authenticate.checkToken,
    userLogic.deleteUserHandler
  );
  //==End of Master User Route

  // Master Unit Route
  // Made By: Fahmi Muzakki
  server.get("/api/unit", unitLogic.readUnitHandler);
  server.get("/api/unit/:unitId", unitLogic.readOneByIdHandler);
  server.post("/api/unit", unitLogic.createUnitHandler);
  server.put("/api/unit/:unitId", unitLogic.updateUnitHandler);
  server.del("/api/unit/:unitId", unitLogic.deleteUnitHandler);
  //==End of Master Unit Route

  // Transaction Design Route
  // Made By: Dian Yuanda
  server.get("/api/design", designLogic.readAllDesignHandler);
  server.get("/api/design/:designId", designLogic.readByIdHandler);
  server.post("/api/design", designLogic.createDesignHandler);
  server.put("/api/design/:designId", designLogic.updateDesignHandler);
  //== End of Transaction Design Route

  // Transaction Souvenir Route
  // Made By: Rio Yudha
  server.put("/api/tsouvernir/:souvernirId", tSouvernirLogic.updateHandler);
  server.del("/api/tsouvernir/:souvernirId", tSouvernirLogic.deleteHandler);
  //==End of Transaksi Souvernir
};
