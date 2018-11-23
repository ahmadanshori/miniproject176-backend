const authenticate = require("../helpers/Auth_Helper");
const UnitLogic = require("../bisnislogics/M_Unit_Logic");
const DesignLogic= require('../bisnislogics/T_Design_Logic')


module.exports = server => {
  // Root Route
  server.get("/", (req, res, next) => { });

  // All Routes Here
  //  UNIT API By Fahmi
  server.get('/api/unit', UnitLogic.readUnit)
  server.get('/api/unit/:unitId', UnitLogic.readOneById)
  server.post('/api/unit', UnitLogic.create_Unit_Handler)
  server.put('/api/unit/:unitId', UnitLogic.updateUnitHandler)
  server.del('/api/unit/:unitId', UnitLogic.deleteUnitHandler)
  // End OF UNITs 

  //DESIGN APPROVER By Fahmi
  server.put('/api/design/approve/:Id', DesignLogic.approveHandler)
  server.put('/api/design/close_request/:Id', DesignLogic.closeReqHandler)
  server.get('/api/design/item/:Id', DesignLogic.getDesignItem)
  server.get('/api/design/file/:Id', DesignLogic.readFile)

  
  //DESIGN CLOSE REQUEST 
  server.post('/api/design/item_file', DesignLogic.createDesignItemFile)
};
