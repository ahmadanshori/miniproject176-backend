const DB = require("../models/Database");
const ObjectID = require("mongodb").ObjectID;
const T_souvernir = require("../models/T_Souvernir_Model")
const db = DB.getConnection()

const dt = {
     //GET TRANSACTION SOUVERNIR
     readSouvernirAllHandler: callback => {
        db.collection("t_souvernir")
          .find({ is_delete: false })
          .sort({ code: 1 })
          .toArray((err, docs) => {
            let t_souvernir = docs.map(row => {
              return new T_souvernir(row);
            });
            callback(t_souvernir);
        });
    },

    //POST TRANSACTION SOUVERNIR
     createHandler: (callback, data) => {
        db.collection("t_souvernir").insert(data, (err, docs) => {
          callback(docs);
        });
    },
}

module.exports = dt