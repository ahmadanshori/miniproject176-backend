const Database = require("../models/Database");
const ObjectID = require("mongodb").ObjectID;
const M_Unit = require("../models/M_Unit_Model");

const db = Database.getConnection();
const unitData = {
  readUnitData: callback => {
    db.collection("m_unit")
      .find({ is_delete: false })
      .sort({ code: 1 })
      .toArray((err, docs) => {
        let m_unit = docs.map(row => {
          return new M_Unit(row);
        });
        callback(m_unit);
      });
  },
  readOneByIdData: (callback, cd) => {
    db.collection("m_unit")
      .find({ is_delete: false, code: cd })
      .sort({ code: 1 })
      .toArray((err, docs) => {
        let m_unit = docs.map(row => {
          return new M_Unit(row);
        });
        callback(m_unit);
      });
  },
  createUnitData: (callback, data, hasil) => {
    let kode = "UN";
    hasil++;
    for (i = 0; i < 4 - hasil.toString().length; i++) {
      kode += "0";
    }
    kode += hasil;

    let unit_object = new M_Unit(data);
    unit_object.code = kode;
    unit_object.is_delete = false;
    unit_object.created_date = new Date().toDateString();

    db.collection("m_unit").insertOne(unit_object, (err, docs) => {
      callback(docs);
    });
  },
  countAll: callback => {
    db.collection("m_unit").count((err, docs) => callback(docs));
  },
  updateUnitData: (callback, data, id) => {
    db.collection("m_unit").updateOne(
      { _id: new ObjectID(id) },
      { $set: data },
      (err, docs) => {
        callback(docs);
      }
    );
  },
  deleteUnitData: (callback, id) => {
    db.collection("m_unit").updateOne(
      { _id: new ObjectID(id) },
      { $set: { is_delete: true } },
      (err, docs) => {
        callback(docs);
      }
    );
  }
};

module.exports = unitData;
