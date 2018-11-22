const ResponseHelper = require('../helpers/Response_Helper')
const dtl = require('../datalayers/M_Unit_Data')


const M_Unit_BisnisLogic = {
    readUnit: (req, res, next) => {
        dtl.readUnitData(function (items) {
            ResponseHelper.sendResponse(res, 200, items)
        })
    },

    readOneById: (req, res, next) => {
        const id = req.params.unitId
        
        dtl.readOneByIdData(function (items) {
            ResponseHelper.sendResponse(res, 200, items)
        }, id)
    },

    create_Unit_Handler: (req, res, next) => {
        let data = req.body
        dtl.countAll(item=>{
            
            dtl.create_Unit_HandlerData(function (items) {
                ResponseHelper.sendResponse(res, 200, items)
            }, data,item)
        })
        
    },

    updateUnitHandler: (req, res, next) => {

        const id = req.params.unitId
        const data = {
            code: req.body.code,
            name: req.body.name,
            description: req.body.description,
            updated_date:new Date().toDateString()
        }

        dtl.updateUnitHandlerData(function (items) {
            ResponseHelper.sendResponse(res, 200, items)
        }, data, id)
    },

    deleteUnitHandler: (req, res, next) => {
        const id = req.params.unitId
        dtl.deleteUnitHandlerData(function (items) {
            ResponseHelper.sendResponse(res, 200, items)
        }, id)
    },
}
module.exports = M_Unit_BisnisLogic