const responseHelper = require("../helpers/Response_Helper");
const menuData = require("../datalayers/M_Menu_Data");

const M_Menu_Bisnis_Logic = {
  readMenuAlHandler: (req, res, next) => {
    menuData.readMenuAlHandlerData(items => {
      responseHelper.sendResponse(res, 200, items);
    });
  },
  readMenuSidebar: (req, res, next) => {
    menuData.readMenuSidebar(items => {
      responseHelper.sendResponse(res, 200, items);
    });
  },
  readMenuOneById: (req, res, next) => {
    let id = req.params.menuid;

    menuData.readMenuOneById(items => {
      responseHelper.sendResponse(res, 200, items);
    }, id);
  },
  deleteMenuHandler: (req, res, next) => {
    let id = req.params.menuid;

    menuData.deleteMenuHandler(items => {
      responseHelper.sendResponse(res, 200, items);
    }, id);
  },
  updateMenuHandler: (req, res, next) => {
    let id = req.params.menuid;
    const data = {
      name: req.body.name,
      controller: req.body.controller,
      parent_id: req.body.parent_id,
      updated_by: req.body.updated_by,
      updated_date: new Date().toDateString()
    };

    menuData.updateMenuHandler(
      items => {
        responseHelper.sendResponse(res, 200, items);
      },
      data,
      id
    );
  },
  createMenuHandler: (req, res, next) => {
    menuData.readMenuLastId(companies => {
      if (companies.length > 0) {
        let pattern = companies[0].code.substr(-4);
        let lastestCode = parseInt(pattern) + 1;
        let generatePattern = pattern.substr(
          0,
          pattern.length - lastestCode.toString().length
        );
        var newCode = "ME" + generatePattern + lastestCode;
      } else {
        var newCode = "ME0001";
      }

      const data = {
        code: newCode,
        name: req.body.name,
        controller: req.body.controller,
        parent_id: req.body.parent_id,
        is_delete: false,
        created_by: req.body.created_by,
        created_date: new Date().toDateString()
      };

      menuData.createMenuHandler(function(items) {
        responseHelper.sendResponse(res, 200, items);
      }, data);
    });
  }
};

module.exports = M_Menu_Bisnis_Logic;
