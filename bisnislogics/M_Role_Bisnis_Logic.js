const responseHelper = require("../helpers/Response_Helper");
const roleData = require("../datalayers/M_Role_Data");

const roleLogic = {
  createRole: (req, res, next) => {
    const formdata = {
      name: req.body.name,
      description: req.body.description,
      created_by: req.body.created_by,
      created_date: new Date().toDateString(),
      is_delete: false
    };

    roleData.countLength(itemLen => {
      roleData.createRole(
        items => {
          responseHelper.sendResponse(res, 200, items);
        },
        formdata,
        itemLen
      );
    });
  },
  readAllRole: (req, res, next) => {
    roleData.readAllRole(items => {
      responseHelper.sendResponse(res, 200, items);
    });
  },
  readOneRole: (req, res, next) => {
    let id = req.params.id;
    roleData.readOneRole(items => {
      responseHelper.sendResponse(res, 200, items);
    }, id);
  },
  updateRole: (req, res, next) => {
    let id = req.params.id;
    let data = {
      name: req.body.name,
      description: req.body.description,
      updated_by: req.body.updated_by,
      updated_date: new Date().toDateString()
    };

    roleData.updateRole(
      items => {
        responseHelper.sendResponse(res, 200, items);
      },
      data,
      id
    );
  },
  deleteRole: (req, res, next) => {
    let id = req.params.id;
    let data = {
      updated_by: req.body.updated_by,
      updated_date: new Date().toDateString(),
      is_delete: true
    };

    roleData.updateRole(
      items => {
        responseHelper.sendResponse(res, 200, items);
      },
      data,
      id
    );
  }
};

module.exports = roleLogic;
