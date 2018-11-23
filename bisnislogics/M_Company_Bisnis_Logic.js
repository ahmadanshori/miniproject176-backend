const ResponseHelper = require("../helpers/Response_Helper");
const companyData = require("../datalayers/M_Company_Data");

const M_company_Bisnis_Logic = {
  readCompanyAlHandler: (req, res, next) => {
    companyData.readCompannyAlHandlerData(items => {
      ResponseHelper.sendResponse(res, 200, items);
    });
  },
  readCompanyOneById: (req, res, next) => {
    let id = req.params.companyid;
    companyData.readCompanyOneById(items => {
      ResponseHelper.sendResponse(res, 200, items);
    }, id);
  },
  deleteCompanyHandler: (req, res, next) => {
    let id = req.params.companyid;
    companyData.deleteCompanyHandler(items => {
      ResponseHelper.sendResponse(res, 200, items);
    }, id);
  },
  updateCompanyHandler: (req, res, next) => {
    let id = req.params.companyid;

    const data = {
      name: req.body.name,
      address: req.body.address,
      phone: req.body.phone,
      email: req.body.email,
      updated_date: new Date().toDateString(),
      updated_by: req.body.update_by
    };

    companyData.updateCompanyHandler(
      items => {
        ResponseHelper.sendResponse(res, 200, items);
      },
      data,
      id
    );
  },
  createCompanyHandler: (req, res, next) => {
    companyData.readCompanyLastId(companies => {
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

      companyData.createCompanyHandler(function(items) {
        ResponseHelper.sendResponse(res, 200, items);
      }, data);
    });
  }
};

module.exports = M_company_Bisnis_Logic;
