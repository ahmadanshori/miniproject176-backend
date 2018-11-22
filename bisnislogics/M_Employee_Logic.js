const responseHelper = require("../helpers/Response_Helper");
const employeeData = require("../datalayers/M_Employee_Data");

const M_Employee_Logic = {
  readAllHandler: (req, res, next) => {
    employeeData.readAllData(function(items) {
      responseHelper.sendResponse(res, 200, items);
    });
  },
  readByIdHandler: (req, res, next) => {
    let param = req.params.employeeId;
    employeeData.readByIdData(items => {
      responseHelper.sendResponse(res, 200, items);
    }, param);
  },
  createHandler: (req, res, next) => {
    let ThisDate = new Date();
    // ambil masing-masing yy, mm, dd
    let date = ThisDate.getDate();
    let month = ThisDate.getMonth() + 1;
    let year = ThisDate.getFullYear()
      .toString()
      .substr(2, 2);
    // Untuk mendapatkan format yy.mm.dd
    let newDate = year + "." + month + "." + date + ".";

    employeeData.countEmployee(count => {
      let codeEmployee = newDate;
      for (let i = 0; i < 2 - (count + 1).toString().length; i++) {
        codeEmployee += "0";
      }
      codeEmployee += count + 1;

      let body = req.body;
      body.employee_number = codeEmployee;
      body.is_delete = false;

      employeeData.createData(function(items) {
        responseHelper.sendResponse(res, 200, items);
      }, body);
    }, newDate);
  },
  updateHandler: (req, res, next) => {
    let param = req.params.employeeId;
    let body = req.body;

    employeeData.updateData(
      items => {
        responseHelper.sendResponse(res, 200, items);
      },
      param,
      body
    );
  },
  deleteHandler: (req, res, next) => {
    let param = req.params.employeeId;

    employeeData.deleteData(items => {
      responseHelper.sendResponse(res, 200, items);
    }, param);
  }
};

module.exports = M_Employee_Logic;
