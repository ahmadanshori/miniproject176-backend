const response = require('../helpers/Response_Helper');
const datalayer = require('../datalayers/M_Role_Data');

const roleLogic = {
    
    createRole: (req, res, next) => {
        const data = req.body;
        datalayer.countLength((itemLen)=>{
            datalayer.createRole((items)=>{
                response.sendResponse(res,200,items)
            }, data, itemLen)
        });   
    },

    readAllRole: (req, res, next) => {
        datalayer.readAllRole(items=>{
            response.sendResponse(res,200,items);
        });
    },

    readOneRole: (req, res, next) => {
        let id = req.params.id;
        datalayer.readOneRole(items=>{
            response.sendResponse(res,200,items);
        }, id);
    },
    updateRole: (req, res, next) => {
        let id = req.params.id;
        let data = {
            name : req.body.name,
            description : req.body.description,
            updated_date : new Date().toDateString(),
            updated_by : "Randika",
        }
        datalayer.updateRole((items)=>{
            response.sendResponse(res,200,items);
        }, data, id);
    },
    deleteRole: (req, res, next) => {
        let id = req.params.id;
        let data = {
            updated_date : new Date().toDateString(),
            updated_by : "Randika",
            is_delete: true
        }
        datalayer.updateRole((items) => {
            response.sendResponse(res, 200, items);
        }, data, id);
    },
}

module.exports = roleLogic;