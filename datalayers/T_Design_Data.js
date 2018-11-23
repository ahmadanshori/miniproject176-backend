const DB = require('../models/Database')
const ObjectID = require('mongodb').ObjectID
const T_Design = require('../models/T_Design_Model')
const T_Design_Item = require('../models/T_Design_Item_Model')
const T_Design_File = require('../models/T_Design_Item_File_Model')


const db = DB.getConnection()

const dt = {
    //<<< APROVE STATUS >>>>>>
    approveStatus: (callback, data, id) => {
        db.collection('t_design').updateOne({
            _id: new ObjectID(id)
        }, {
                $set: data
            }, (err, docs) => {
                callback(docs)
            })
    },

    //<<<  DESIGN ITEM (On Progress) >>>>>>
    readDesignItemById: (callback, id) => {
        db.collection('t_design_item')
            .find({ is_delete: false, _id: new ObjectID(id) })
            .sort({ t_design_id: 1 })
            .toArray((err, docs) => {
                let item =
                    docs.map((row) => {
                        return new T_Design_Item(row)
                    })
                callback(item)
            })
    },

    closeRequestData: (callback, data, id) => {
        db.collection('t_design').updateOne({
            _id: new ObjectID(id)
        }, {
                $set: data
            }, (err, docs) => {
                callback(docs)
            })
    },

    //<<< DESIGN ITEM FILE (On Progress) >>>>>>
    readFilebyId: (callback, id) => {
        db.collection('t_design_item_file')
            .find({ is_delete: false, _id: new ObjectID(id) })
            .sort({ t_design_id: 1 })
            .toArray((err, docs) => {
                let file =
                    docs.map((row) => {
                        return new T_Design_File(row)
                    })
                callback(file)
            })
    },

    //<<< DESIGN ITEM FILE (Close Request) >>>>>>
    createItemFileData: (callback, datas, hasil) => {
        let object = datas.map(data => new T_Design_File(data))
        db.collection('m_design_item_file').insertMany(
            object, (err, docs) => {
                callback(object)
            })
    },
}
module.exports = dt
