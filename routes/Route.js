const authenticate = require("../helpers/Auth_Helper");
const UnitLogic = require("../bisnislogics/M_Unit_Logic");

module.exports = server => {
  // Root Route
  server.get("/", (req, res, next) => {});

  // All Routes Here
  server.get('/api/unit', UnitLogic.readUnit)
  server.get('/api/unit/:unitId',  UnitLogic.readOneById)
   server.post('/api/unit', UnitLogic.create_Unit_Handler)
   server.put('/api/unit/:unitId', UnitLogic.updateUnitHandler)
   server.del('/api/unit/:unitId' , UnitLogic.deleteUnitHandler)
};
