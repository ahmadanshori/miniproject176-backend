const ObjectId = require("mongodb").ObjectID;
const Database = require("../models/Database");
const M_Souvenir = require("../models/M_Souvenir_Model");

const db = Database.getConnection();
const SouvenirData = {
  readAllData: callback => {
    db.collection("m_souvenir")
      .find({ is_delete: false })
      .sort({ code: 1 })
      .toArray((err, souvenirs) => {
        let mSouvenir = souvenirs.map(souvenir => {
          return new M_Souvenir(souvenir);
        });
        callback(mSouvenir);
      });
  },
  readByIdData: (callback, souvenirId) => {
    db.collection("m_souvenir").findOne(
      { is_delete: false, _id: new ObjectId(souvenirId) },
      (err, souvenir) => {
        callback(souvenir);
      }
    );
  },
  createData: (callback, newSouvenir) => {
    let SouvenirData = new M_Souvenir(newSouvenir);
    db.collection("m_souvenir").insertOne(SouvenirData, (err, souvenir) => {
      callback(SouvenirData);
    });
  },
  updateData: (callback, souvenirId, updateSouvenir) => {
    db.collection("m_souvenir").updateOne(
      { _id: new ObjectId(souvenirId) },
      { $set: updateSouvenir },
      (err, souvenir) => {
        callback(updateSouvenir);
      }
    );
  },
  deleteData: (callback, souvenirId, deleteSouvenir) => {
    db.collection("m_souvenir").updateOne(
      { _id: new ObjectId(souvenirId) },
      { $set: deleteSouvenir },
      (err, souvenir) => {
        callback(deleteSouvenir);
      }
    );
  },
  lastCodeData: callback => {
    db.collection("m_souvenir")
      .find({})
      .sort({ code: -1 })
      .limit(1)
      .toArray((err, souvenirs) => {
        let mSouvenir = souvenirs.map(doc => {
          return new M_Souvenir(doc);
        });
        callback(mSouvenir);
      });
  }
};

module.exports = SouvenirData;
