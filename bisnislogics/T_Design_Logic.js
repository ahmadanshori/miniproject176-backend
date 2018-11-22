const ResponseHelper = require("../helpers/Response_Helper");
const designData = require("../datalayers/T_Design_Data");

const T_Design_Logic = {
  readDesignHandler: (req, res, next) => {
    designData.readUnitData(function(items) {
      ResponseHelper.sendResponse(res, 200, items);
    });
  },

  readOneByIdHandler: (req, res, next) => {
    const id = req.params.designId;

    designData.readOneByIdData(function(items) {
      ResponseHelper.sendResponse(res, 200, items);
    }, id);
  },

  createUnitHandler: (req, res, next) => {
    let data = req.body;
    designData.countAll(item => {
      designData.createUnitData(
        function(items) {
          ResponseHelper.sendResponse(res, 200, items);
        },
        data,
        item
      );
    });
  },
  updateUnitHandler: (req, res, next) => {
    const id = req.params.unitId;
    const data = {
      code: req.body.code,
      name: req.body.name,
      description: req.body.description,
      controller: req.body.controller,
      updated_date: new Date().toDateString()
    };

    designData.updateUnitData(
      function(items) {
        ResponseHelper.sendResponse(res, 200, items);
      },
      data,
      id
    );
  },
  deleteUnitHandler: (req, res, next) => {
    const id = req.params.unitId;
    designData.deleteUnitData(function(items) {
      ResponseHelper.sendResponse(res, 200, items);
    }, id);
  }
};
module.exports = T_Design_Logic;
