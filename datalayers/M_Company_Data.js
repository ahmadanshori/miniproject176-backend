const Database = require("../models/Database");
const ObjectID = require("mongodb").ObjectID;
const mCompany = require("../models/M_Company_Model");

const db = Database.getConnection();
const companyData = {
  readCompannyAlHandlerData: callback => {
    db.collection("m_company")
      .find({ is_delete: null })
      .sort({ code: 1 })
      .toArray((err, docs) => {
        let m_comp = docs.map(row => {
          return new mCompany(row);
        });
        callback(m_comp);
      });
  },
  readCompanyOneById: (callback, id) => {
    db.collection("m_company")
      .find({ code: id })
      .sort({ code: 1 })
      .toArray((err, docs) => {
        let m_comp = docs.map(row => {
          return new mCompany(row);
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
          return new mCompany(row);
        });
        callback(m_comp);
      });
  },
  deleteCompanyHandler: (callback, id) => {
    db.collection("m_company").updateOne(
      { code: id },
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
        callback(docs);
      }
    );
  },
  create_company_Handler: (callback, data) => {
    db.collection("m_company").insert(data, (err, docs) => {
      callback(docs);
    });
  }
};

module.exports = companyData;
