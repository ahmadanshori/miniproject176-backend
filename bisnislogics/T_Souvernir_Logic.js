const ResponseHelper = require("../helpers/Response_Helper");
const dtl = require("../datalayers/T_Souvernir_Data");

const T_Souvernir_Data = {
     //GET TRANSACTION SOUVERNIR
     readSouvernirAllHandler: (req, res, next) => {
        //console.log("disini");
        dtl.readSouvernirAllHandler(items => {
          ResponseHelper.sendResponse(res, 200, items);
          //console.log(JSON.stringify(items))
        });
    },

    //ADD TRANSACTION SOUVERNIER
     //ADD PRODUCT TABLE
     createHandler: (req, res, next) => {
        dtl.readLastId(companies => {
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
            name: req.body.name,
            email: req.body.email,
            description: req.body.description,
            is_delete: null,
            created_by: req.body.created_by,
            created_date: new Date().toDateString()
          }
    
          dtl.createHandler(function(items) {
            ResponseHelper.sendResponse(res, 200, items);
          }, data);
        });
    },
}

module.exports = T_Souvernir_Data