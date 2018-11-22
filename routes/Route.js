const authenticate = require("../helpers/Auth_Helper");
const UserBisnisLogic = require("../bisnislogics/M_User_Logic");

module.exports = server => {
  // Root Route
  server.get("/", (req, res, next) => {});

  // All Routes Here
  //ROUTES UNTUK USER
  server.get(
    "/api/user",
    authenticate.checkToken,
    UserBisnisLogic.readUserAlHandler
  );
  server.get(
    "/api/user/:userid",
    authenticate.checkToken,
    UserBisnisLogic.readUserByUsername
  );
  server.post(
    "/api/user",
    authenticate.checkToken,
    UserBisnisLogic.create_User_Handler
  );
  server.post("/api/user/login", UserBisnisLogic.Login_User_Handler);
  server.put("/api/user/:userid", UserBisnisLogic.updateUserById);
  server.del(
    "/api/user/:id",
    authenticate.checkToken,
    UserBisnisLogic.deleteUserHandler
  );
};
