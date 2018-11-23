// const authenticate = require("../helpers/Auth_Helper");
// const souvenirLogic = require("../bisnislogics/M_Souvenir_Logic");
const companyBisnisLogic = require("../bisnislogics/M_Company_Bisnis_Logic");

module.exports = server => {
  // Root Route
  // server.get("/", (req, res, next) => {});

  // Souvenir Route
  // Made By: Dian Yuanda
  // server.get("/api/souvenir", souvenirLogic.readAllHandler);
  // server.get("/api/souvenir/:souvenirId", souvenirLogic.readByIdHandler);
  // server.post("/api/souvenir", authenticate, souvenirLogic.createHandler);
  // server.put(
  //   "/api/souvenir/:souvenirId",
  //   authenticate,
  //   souvenirLogic.updateHandler
  // );
  // server.del(
  //   "/api/souvenir/:souvenirId",
  //   authenticate,
  //   souvenirLogic.deleteHandler
  // );
  //== End of Souvenir Route
  
  //== Company =======
  // authenticate.checkToken,
  server.get("/api/company",companyBisnisLogic.readCompanyAlHandler); //mengambil seluruh data company
  server.get("/api/company/:companyid",companyBisnisLogic.readCompanyOneById); //menhambil 1 data berdasarkan params company
  server.post("/api/company",companyBisnisLogic.create_company_Handler); //membuat company baru (body)
  server.put("/api/company/:companyid",companyBisnisLogic.updateCompanyHandler); //mengupdate berdasarkan params dan body
  server.del("/api/company/:companyid",companyBisnisLogic.deleteCompanyHandler); //mengubah field delete menjadi true

};
