const Database = require("../models/Database");
const ObjectID = require("mongodb").ObjectID;
const M_Role = require("../models/M_Role_Model");

const db = Database.getConnection();
const roleData = {
  readAllRole: callback => {
    db.collection("m_role")
      .find({ is_delete: false })
      .sort({ code: 1 })
      .toArray((err, docs) => {
        let role = docs.map(row => {
          return new M_Role(row);
        });
        callback(role);
      });
  },
  readOneRole: (callback, id) => {
    db.collection("m_role")
      .find({ code: id })
      .sort({ code: 1 })
      .toArray((err, docs) => {
        let role = docs.map(row => {
          return new M_Role(row);
        });
        callback(role);
      });
  },
  countLength: callback => {
    db.collection("m_role").count((err, docs) => {
      callback(docs);
    });
  },
  updateRole: (callback, data, id) => {
    db.collection("m_role").updateOne(
      { _id: new ObjectID(id) },
      { $set: data },
      (err, docs) => {
        callback(data);
      }
    );
  },
  createRole: (callback, data, itemLen) => {
    let prototypeCode = "RO";
    for (i = 0; i < 4 - (itemLen + 1).toString().length; i++) {
      prototypeCode += "0";
    }
    prototypeCode += itemLen + 1;
    let roleObject = new M_Role(data);
    roleObject.code = prototypeCode;

    db.collection("m_role").insertOne(roleObject, (err, docs) => {
      callback(data);
    });
  }
};

module.exports = roleData;
