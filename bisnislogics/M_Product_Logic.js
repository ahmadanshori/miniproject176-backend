const ResponseHelper = require("../helpers/Response_Helper");
const productData = require("../datalayers/M_Product_Data");

const M_Product_Data = {
  readAllHandler: (req, res, next) => {
    productData.readAllHandlerData(items => {
      ResponseHelper.sendResponse(res, 200, items);
    });
  },
  readByIdHandler: (req, res, next) => {
    let id = req.params.productId;

    productData.readByIdHandler(items => {
      ResponseHelper.sendResponse(res, 200, items);
    }, id);
  },
  createHandler: (req, res, next) => {
    let name = req.body.name.toUpperCase();

    productData.readByUsername(docs => {
      if (docs) {
        ResponseHelper.sendResponse(res, 401, "Product Sudah Ada!");
      } else {
        productData.readLastId(companies => {
          if (companies.length > 0) {
            let pattern = companies[0].code.substr(-4);
            let lastestCode = parseInt(pattern) + 1;
            let generatePattern = pattern.substr(
              0,
              pattern.length - lastestCode.toString().length
            );
            var newCode = "PR" + generatePattern + lastestCode;
          } else {
            var newCode = "PR0001";
          }

          const data = {
            code: newCode,
            name: req.body.name.toUpperCase(),
            description: req.body.description,
            is_delete: false,
            created_by: req.body.created_by,
            created_date: new Date().toDateString()
          };

          productData.createHandler(function(items) {
            ResponseHelper.sendResponse(res, 200, items);
          }, data);
        });
      }
    }, name);
  },
  deleteHandler: (req, res, next) => {
    let id = req.params.productId;
    productData.deleteHandler(items => {
      ResponseHelper.sendResponse(res, 200, items);
    }, id);
  },
  updateHandler: (req, res, next) => {
    let id = req.params.productId;

    const data = {
      name: req.body.name.toUpperCase(),
      description: req.body.description,
      updated_by: req.body.updated_by,
      updated_date: new Date().toDateString()
    };

    productData.updateHandler(
      items => {
        ResponseHelper.sendResponse(res, 200, items);
      },
      data,
      id
    );
  }
};

module.exports = M_Product_Data;
