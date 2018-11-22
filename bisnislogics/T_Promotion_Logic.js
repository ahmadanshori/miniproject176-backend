const ResponseHelper = require("../helpers/Response_Helper");
const dtl = require("../datalayers/M_Promotion_Data");

const M_Promotion_Logic = {
  readPromotionAll: (req, res, next) => {
    //console.log("disini");
    dtl.readPromotionAll(items => {
      ResponseHelper.sendResponse(res, 200, items);
      //console.log(JSON.stringify(items))
    });
  },
  readPromotionById: (req, res, next) => {
    let id = req.params.promotionid;
    dtl.readPromotionById(items => {
      ResponseHelper.sendResponse(res, 200, items);
    }, id);
  },
  deletePromotion: (req, res, next) => {
    let id = req.params.promotionid;
    dtl.deletePromotion(items => {
      ResponseHelper.sendResponse(res, 200, items);
    }, id);
  },
  updatePromotion: (req, res, next) => {
    let id = req.params.promotionid;
    const data = {
      flag_design: req.body.flag_design,
      title: req.body.title,
      request_by: req.body.request_by,
      request_date: new Date().toDateString(),
      assign_to: req.body.assign_to,
      note: req.body.note,
      updated_date: new Date().toDateString(),
      updated_by: req.userdata.username
    };

    dtl.updatePromotionHandler(
      items => {
        ResponseHelper.sendResponse(res, 200, items);
      },
      data,
      id
    );
  },

  create_company_Handler: (req, res, next) => {
    dtl.readPromotionLastId(companies => {
      if (companies.length > 0) {
        let pattern = companies[0].code.substr(-4);
        let lastestCode = parseInt(pattern) + 1;
        let generatePattern = pattern.substr(
          0,
          pattern.length - lastestCode.toString().length
        );
        var newCode = "CP" + generatePattern + lastestCode;
      } else {
        var newCode = "CP0001";
      }

      const data = {
        code: newCode,
        name: req.body.name,
        email: req.body.email,
        address: req.body.address,
        phone: req.body.phone,
        is_delete: false,
        created_by: req.body.created_by,
        created_date: new Date().toDateString()
      };

      dtl.create_company_Handler(function(items) {
        ResponseHelper.sendResponse(res, 200, items);
      }, data);
    });
  }
};

module.exports = M_company_BisnisLogic;
