const response = require('../helpers/Response_Helper');
const datalayer = require('../datalayers/M_Menu_Access_Data');

const accessLogic = {
    readAllAccess: (req, res, next) => {
        datalayer.readAllAccess(items=>{
            response.sendResponse(res,200,items);
        });
    },
    readOneAccess: (req, res, next) => {
        let id = req.params.id;
        datalayer.readOneAccess(items=>{
            response.sendResponse(res,200,items);
        }, id);
    },
    updateAccess: (req, res, next) => {
        let id = req.params.id;
        let data = {
            m_menu_id : req.body.m_menu_id
        }
        
        datalayer.getReqAndDB((items)=>{
            datalayer.createAccess((item)=>{
                datalayer.deleteAccess((lala)=>{
                    let message = '';
                    if(lala == null){
                        message = item;
                    }
                    if(item == null){
                        message = lala;
                    }
                    response.sendResponse(res, 200, message);
                }, id, items[0]);     
            }, items[1], id);
        }, data, id);
    }
}

module.exports = accessLogic;