const DB = require("../models/Database");
const ObjectID = require("mongodb").ObjectID;
const accessModel = require("../models/M_Menu_Access_Model");

const db = DB.getConnection();


const datalayer = {
    readAllAccess: (callback) => {
        db.collection('m_menu_access').aggregate([
            {
                $lookup:{
                    from            : "m_role",
                    localField      : "m_role_id",
                    foreignField    : "code",
                    as              : "role_doc"
                }
            },
            {$unwind: "$role_doc"},
            {
                $project:{
                    "m_role_id"     : "$m_role_id",
                    "role_name"     : "$role_doc.name",
                    "m_menu_id"     : "$m_menu_id",
                    "is_delete"     : "$is_delete",
                    "created_by"    : "$created_by",
                    "created_date"  : "$created_date",
                    "updated_by"    : "$updated_by",
                    "updated_date"  : "$updated_date"
                }
            }
        ]).sort({ m_role_id: 1 }).toArray((err, docs) => {
            let access = docs.map((row) => {
              return new accessModel(row);
            });
            callback(access);
          });
    },
    
    readOneAccess: (callback, id) => {
        db.collection('m_menu_access').aggregate([
            {
                $lookup:{
                    from            : "m_role",
                    localField      : "m_role_id",
                    foreignField    : "code",
                    as              : "role_doc"
                }
            },
            {$unwind: "$role_doc"},
            {
                $project:{
                    "m_role_id"     : "$m_role_id",
                    "role_name"     : "$role_doc.name",
                    "m_menu_id"     : "$m_menu_id",
                    "is_delete"     : "$is_delete",
                    "created_by"    : "$created_by",
                    "created_date"  : "$created_date",
                    "updated_by"    : "$updated_by",
                    "updated_date"  : "$updated_date"
                }
            },
            {$match:{"m_role_id": id}}
        ]).sort({ m_role_id: 1 }).toArray((err, docs) => {
            let access = docs.map((row) => {
              return new accessModel(row);
            });
            callback(access);
          });
    },

    getReqAndDB:(callback, data, id) => {
        const func = (arrRequest, arrDB)=>{
            let query = [];
            const func2 = ()=>{
                let a = arrDB.filter(lala=>lala!=arrRequest[0]);
                arrRequest.map((content)=>{
                    a =  a.filter(e=>e!=content);
                });
                return a;
            }
            const func4 = ()=>{
                let  b = arrRequest.filter(lala=>lala!=arrDB[0]);
                arrDB.map((content)=>{
                    b = b.filter(e=>e!=content);
                });
                return b
            }    
            if(func2()[0] == null){
                query.push(null);
            }
            else{
                query.push(func2().map((content)=>{
                    return content; 
                    //{"$and":[{"m_role_id": "RO0001"}, {"m_menu_id": content}]};
                }));
            }
            if(func4()[0] == null){
                query.push(null);
            }
            else {
                query.push(func4().map((content)=>{
                    return content; 
                    //{"m_role_id":"RO0001", "m_menu_id": content, "created_by": "Randika", "created_date":new Date().toDateString(), "updated_by": null, "updated_date": null}
                })); 
            }
            return query;
        }
        db.collection('m_menu_access').find({m_role_id: id}).toArray((err, docs)=>{
            let fromDatabase =  docs.map((content)=>{
                return new accessModel(content);
            }).map((val)=>val.m_menu_id);
            let arr = func(data.m_menu_id, fromDatabase);
            callback(arr);
        });
    },

    updateAccess: (callback, data, id) => {
        db.collection('m_menu_access').find({m_role_id: id}).toArray((err, docs)=>{
            let fromDatabase =  docs.map((content)=>{
                return new accessModel(content);
            }).map((val)=>val.m_menu_id);
            let arr = [ data.m_menu_id, fromDatabase];
            callback(fromDatabase);
        });
    },
    
    createAccess: (callback, data, id) => {
        const func2 = (queryData, idData)=>{
            if(queryData === null){
                return null;
            }
            else{
                return queryData.map(content=>{
                    return {"m_role_id":idData, "m_menu_id": content,"is_delete":false, "created_by": "Randika", "created_date":new Date().toDateString(), "updated_by": null, "updated_date": null}
                })
            }
        }
        if(func2(data, id) == null){
            callback(null);
        }
        else{
            db.collection('m_menu_access').insertMany(
                func2(data, id), (err, docs)=>{
                    callback(docs);
            });
        }
    },

    deleteAccess: (callback, id, menu) => {
        const func = (queryData, idData)=>{
            if(queryData == null){
                return null;
            }
            else{
                return queryData.map(content=>{
                    return {"$and":[{"m_role_id": idData}, {"m_menu_id": content}]}
                });
            }            
        }
        if(func(menu, id) == null){
            callback(null);
        }
        else{
            db.collection('m_menu_access').updateMany({$or: func(menu, id)},{$set:{is_delete: true, updated_by: "Randika", updated_date: new Date().toDateString()}}, (err, docs)=>{
                callback(docs);
            });
        }
    },
}
module.exports = datalayer;