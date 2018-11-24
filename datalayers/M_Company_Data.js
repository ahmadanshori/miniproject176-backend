const Database = require("../models/Database");
const ObjectID = require("mongodb").ObjectID;
const M_Company = require("../models/M_Company_Model");

const db = Database.getConnection();
const companyData = {
  readCompannyAlHandlerData: callback => {
    db.collection("m_company")
      .find({ is_delete: false })
      .sort({ code: 1 })
      .toArray((err, docs) => {
        let m_comp = docs.map(row => {
          return new M_Company(row);
        });
        callback(m_comp);
      });
  },
  readCompanyOneById: (callback, id) => {
    db.collection("m_company")
      .find({ _id: new ObjectID(id) })
      .sort({ code: 1 })
      .toArray((err, docs) => {
        let m_comp = docs.map(row => {
          return new M_Company(row);
        });
        callback(m_comp);
      });
  },
  readCompanyLastId: callback => {
    db.collection("m_company")
      .find({})
      .sort({ code: -1 })
      .limit(1)
      .toArray((err, docs) => {
        let m_comp = docs.map(row => {
          return new M_Company(row);
        });
        callback(m_comp);
      });
  },
  deleteCompanyHandler: (callback, id) => {
    db.collection("m_company").updateOne(
      { _id: new ObjectID(id) },
      { $set: { is_delete: true } },
      (err, docs) => {
        callback(docs);
      }
    );
  },
  updateCompanyHandler: (callback, data, id) => {
    db.collection("m_company").updateOne(
      { _id: new ObjectID(id) },
      { $set: data },
      (err, docs) => {
        callback(data);
      }
    );
  },
  createCompanyHandler: (callback, data) => {
    db.collection("m_company").insertOne(data, (err, docs) => {
      callback(data);
    });
  }
};

module.exports = companyData;
