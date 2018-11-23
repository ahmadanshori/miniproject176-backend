const ResponseHelper = require("../helpers/Response_Helper");
const dtl = require("../datalayers/M_Company_Data");

const M_company_Bisnis_Logic = {
  readCompanyAlHandler: (req, res, next) => {
    //console.log("disini");
    dtl.readCompannyAlHandlerData(items => {
      ResponseHelper.sendResponse(res, 200, items);
      //console.log(JSON.stringify(items))
    });
  },
  readCompanyOneById: (req, res, next) => {
    let id = req.params.companyid;
    dtl.readCompanyOneById(items => {
      ResponseHelper.sendResponse(res, 200, items);
    }, id);
  },
  deleteCompanyHandler: (req, res, next) => {
    let id = req.params.companyid;
    dtl.deleteCompanyHandler(items => {
      ResponseHelper.sendResponse(res, 200, items);
    }, id);
  },
  updateCompanyHandler: (req, res, next) => {
    console.log(req.body);
    let id = req.params.companyid;
    const data = {
      name: req.body.name,
      address: req.body.address,
      phone: req.body.phone,
      email: req.body.email,
      updated_date: new Date().toDateString(),
      //update_by : req.body.update_by
      updated_by: req.userdata.username
    };

    dtl.updateCompanyHandler(
      items => {
        ResponseHelper.sendResponse(res, 200, items);
      },
      data,
      id
    );
  },

  create_company_Handler: (req, res, next) => {
    dtl.readCompanyLastId(companies => {
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
        is_delete: null,
        created_by: req.body.created_by,
        created_date: new Date().toDateString()
      };

      dtl.create_company_Handler(function(items) {
        ResponseHelper.sendResponse(res, 200, items);
      }, data);
    });
  }
};

module.exports = M_company_Bisnis_Logic;
