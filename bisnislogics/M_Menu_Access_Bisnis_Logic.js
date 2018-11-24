const responseHelper = require("../helpers/Response_Helper");
const accessData = require("../datalayers/M_Menu_Access_Data");

const accessLogic = {
  readAllAccess: (req, res, next) => {
    accessData.readAllAccess(items => {
      responseHelper.sendResponse(res, 200, items);
    });
  },
  readOneAccess: (req, res, next) => {
    let id = req.params.id;
    accessData.readOneAccess(items => {
      responseHelper.sendResponse(res, 200, items);
    }, id);
  },
  updateAccess: (req, res, next) => {
    let id = req.params.id;
    let data = {
      m_menu_id: req.body.m_menu_id
    };
    accessData.getReqAndDB(
      items => {
        accessData.createAccess(
          itemCreate => {
            accessData.makeFalseIsDelete(
              itemFalse => {
                accessData.deleteAccess(
                  itemTrue => {
                    let message = {
                      "is_delete tobe false": itemFalse,
                      "is_delete tobe true": itemTrue,
                      "create new access": itemCreate
                    };
                    responseHelper.sendResponse(res, 200, message);
                  },
                  id,
                  items[0]
                );
              },
              items[2],
              id
            );
          },
          items[1],
          id
        );
      },
      data,
      id
    );
  }
};

module.exports = accessLogic;
