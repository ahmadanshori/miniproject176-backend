const ResponseHelper = require('../helpers/Response_Helper')
const dtl = require('../datalayers/T_Design_Data')


const T_Design = {

    // <<<< PHASE 2 APPROVE >>>
    approveHandler: (req, res, next) => {
        let data=req.body
        const id = req.params.Id 
        if(req.body.status != 0)
        {
            data = {status: parseInt(req.body.status)+1,
            assign_to:req.body.assign_to}
        }else{  
            data = {status: 0,
            assign_to:null}}
            dtl.approveStatus(function (items) {
                ResponseHelper.sendResponse(res, 200, items)
            }, data, id)
    },

    closeReqHandler: (req, res, next) => {
        let data=req.body
            dtl.closeRequestData(function (items) {
                ResponseHelper.sendResponse(res, 200, items)
            }, data, id)
    },

    // <<<< PHASE 3 REQUEST PROGRESS  >>>
    getDesignItem:(req,res,next)=>
    {
        const id = req.params.Id
        dtl.readDesignItemById(function (items) {
            ResponseHelper.sendResponse(res, 200, items)
        }, id)
    },

    readFile:(req,res,next)=>
    {
        const id = req.params.Id
        dtl.readFilebyId(function (items) {
            ResponseHelper.sendResponse(res, 200, items)
        }, id)
    },
}
module.exports = T_Design