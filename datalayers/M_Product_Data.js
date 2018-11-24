const Database = require("../models/Database");
const ObjectId = require("mongodb").ObjectID;
const M_Product = require("../models/M_Product_Model");

const db = Database.getConnection();
const productData = {
  readAllHandlerData: callback => {
    db.collection("m_product")
      .find({ is_delete: false })
      .sort({ code: 1 })
      .toArray((err, docs) => {
        let m_product = docs.map(row => {
          return new M_Product(row);
        });
        callback(m_product);
      });
  },
  readByIdHandler: (callback, id) => {
    db.collection("m_product")
      .find({ _id: new ObjectId(id) })
      .sort({ code: 1 })
      .toArray((err, docs) => {
        let m_product = docs.map(row => {
          return new M_Product(row);
        });
        callback(m_product);
      });
  },
  readLastId: callback => {
    db.collection("m_product")
      .find({})
      .sort({ code: -1 })
      .limit(1)
      .toArray((err, docs) => {
        let m_product = docs.map(row => {
          return new M_Product(row);
        });
        callback(m_product);
      });
  },
  readByUsername: (callback, name) => {
    db.collection("m_product").findOne(
      { is_delete: false, name: name },
      (err, docs) => {
        callback(docs);
      }
    );
  },
  createHandler: (callback, data) => {
    db.collection("m_product").insert(data, (err, docs) => {
      callback(data);
    });
  },
  deleteHandler: (callback, id) => {
    db.collection("m_product").updateOne(
      { _id: new ObjectId(id) },
      { $set: { is_delete: true } },
      (err, docs) => {
        callback(docs);
      }
    );
  },
  updateHandler: (callback, data, id) => {
    db.collection("m_product").updateOne(
      { _id: new ObjectId(id) },
      { $set: data },
      (err, docs) => {
        callback(data);
      }
    );
  }
};

module.exports = productData;
