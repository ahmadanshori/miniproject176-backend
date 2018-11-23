const authenticate = require("../helpers/Auth_Helper");
const UserBisnisLogic = require("../bisnislogics/M_User_Logic");

module.exports = server => {
  // Root Route
  server.get("/", (req, res, next) => {});

  //ROUTES UNTUK USER
  //ambil semua user
  server.get(
    "/api/user",
    authenticate.checkToken,
    UserBisnisLogic.readUserAlHandler
  );
  //ambil nama employee yg belum memiliki user
  server.get(
    "/api/useremployee",
    authenticate.checkToken,
    UserBisnisLogic.readEmployeeFromUser
  );
  //ambil 1 user dari username
  server.get(
    "/api/user/:userid",
    authenticate.checkToken,
    UserBisnisLogic.readUserByUsername
  );
  //membuat user baru
  server.post(
    "/api/user",
    authenticate.checkToken,
    UserBisnisLogic.create_User_Handler
  );
  server.post("/api/user/login", UserBisnisLogic.Login_User_Handler); //untuk login masuk
  server.put(
    "/api/user/:userid",
    authenticate.checkToken,
    UserBisnisLogic.updateUserById
  ); //untuk update user (admin)
  server.put("/api/user/repass/:userid", UserBisnisLogic.UpdatePassword); //untuk update password (user)
  server.del(
    "/api/user/:id",
    authenticate.checkToken,
    UserBisnisLogic.deleteUserHandler
  ); //ngedelete user pake objec
};
