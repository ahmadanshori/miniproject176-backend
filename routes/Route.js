const authenticate = require("../helpers/Auth_Helper");
const EmployeeLogic = require("../bisnislogics/M_Employee_Logic");
const TEvent = require("../bisnislogics/M_T_Event_Logic");

module.exports = server => {
  // Root Route
  server.get("/", (req, res, next) => {});

  // Employee Route
  // Made By: Purwanto
  server.get("/api/employee", EmployeeLogic.ReadAllHandler);
  server.get("/api/employee/:employeeId", EmployeeLogic.ReadByIdHandler);
  server.post("/api/employee", EmployeeLogic.CreateHandler);
  server.put(
    "/api/employee/:employeeId",
    EmployeeLogic.UpdateHandler
  );
  server.del(
    "/api/employee/:employeeId",
    EmployeeLogic.DeleteHandler
  );
  //== End of Employee Route

  // T Event Route
  // Made By: Purwanto
  server.get("/api/tevent", TEvent.ReadAllHandler);
  server.get("/api/tevent/:teventId", TEvent.ReadByIdHandler);
  server.post("/api/tevent", TEvent.CreateHandler);
  server.put(
    "/api/tevent/:teventId",
    TEvent.UpdateHandler
  );
  server.del(
    "/api/tevent/:teventId",
    TEvent.DeleteHandler
  );
  //== End of T Event Route

};
