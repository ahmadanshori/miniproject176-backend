const authenticate = require("../helpers/Auth_Helper");
const souvenirLogic = require("../bisnislogics/M_Souvenir_Logic");

const roleLogic = require("../bisnislogics/M_Role_Bisnis_Logic");
const accessLogic = require("../bisnislogics/M_Menu_Access_Bisnis_Logic");
//const authMiddleware = require("../middleware/authmiddleware");

module.exports = server => {
  // Root Route
  server.get("/", (req, res, next) => {});

  // All Routes Here
  
//<<----------------------------------------ROLE'S ROUTES-------------------------------------->>
server.get("/api/role", roleLogic.readAllRole); // get all role
server.get("/api/role/:id", roleLogic.readOneRole); //get role by param
server.post("/api/role", roleLogic.createRole); //create role
server.put("/api/role/:id", roleLogic.updateRole); //update role by param
server.del("/api/role/:id", roleLogic.deleteRole); //update is_delete by param

//<<---------------------------------------ACCESSMENU'S ROUTES--------------------------------->>

//server.post("/api/access", accessLogic.createAccess);
server.get("/api/access", accessLogic.readAllAccess);
server.get("/api/access/:id", accessLogic.readOneAccess);
server.put("/api/access/:id", accessLogic.updateAccess);
// server.del("/api/access/:id", accessLogic.deleteAccess); 

};
