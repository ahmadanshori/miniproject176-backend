const ResponseHelper = require("../helpers/Response_Helper");
const dtl = require("../datalayers/M_Menu_Data");

const M_Menu_Bisnis_Logic = {
    readMenuAlHandler: (req, res, next) => {
        //console.log("disini");
        dtl.readMenuAlHandlerData(items => {
            ResponseHelper.sendResponse(res, 200, items);
            //console.log(JSON.stringify(items))
        });
    },

    readMenuSidebar: (req, res, next) => {
        dtl.readMenuSidebar(items => {
            ResponseHelper.sendResponse(res, 200, items);
        });
    },

    readMenuOneById: (req, res, next) => {
        let id = req.params.menuid;
        dtl.readMenuOneById(items => {
            ResponseHelper.sendResponse(res, 200, items);
        }, id);
    },
    deleteMenuHandler: (req, res, next) => {
        let id = req.params.menuid;
        dtl.deleteMenuHandler(items => {
            ResponseHelper.sendResponse(res, 200, items);
        }, id);
    },
    updateMenuHandler: (req, res, next) => {
        console.log(req.body);
        let id = req.params.menuid;
        const data = {
            name: req.body.name,
            controller: req.body.controller,
            parent_id: req.body.parentId,
            updated_date: new Date().toDateString(),
            //update_by : req.body.update_by
            updated_by: req.body.name
        };

        dtl.updateMenuHandler(
            items => {
                ResponseHelper.sendResponse(res, 200, items);
            },data,id
        );
    },

    createMenuHandler: (req, res, next) => {
        dtl.readMenuLastId(companies => {
            //console.log(companies);
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
                parent_id: req.body.parentId,
                is_delete: false,
                created_by: req.body.createdBy,
                created_date: new Date().toDateString()
            };

            dtl.createMenuHandler(function (items) {
                ResponseHelper.sendResponse(res, 200, items);
            }, data);
        });
    }
};

module.exports = M_Menu_Bisnis_Logic;
