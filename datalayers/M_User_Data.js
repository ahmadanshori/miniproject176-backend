const DB = require("../models/Database");
const ObjectID = require("mongodb").ObjectID;
const M_user = require("../models/M_User_Model");

const db = DB.getConnection();
const dt = {
  //==================USER=======================
  readUserAlHandlerData: callback => {
    db.collection("m_user")
      .find({ is_delete: false })
      .sort({ code: 1 })
      .toArray((err, docs) => {
        let m_user = docs.map(row => {
          return new M_user(row);
        });
        callback(m_user);
      });
  },

  readUserByUsername: (callback, username) => {
    db.collection("m_user").findOne(
      { is_delete: false, username: username },
      (err, docs) => {
        callback(docs);
      }
    );
  },

  create_User_Handler: (callback, data) => {
    console.log(data);
    db.collection("m_user").insertOne(data, (err, docs) => {
      callback(docs);
    });
  },

  deleteUserHandler: (callback, id) => {
    //console.log(id);
    db.collection("m_user").updateOne(
      {
        _id: new ObjectID(id)
      },
      { $set: { is_delete: true } },
      (err, docs) => {
        callback(docs);
      }
    );
  },

  updateUserHandler: (callback, data, id) => {
    console.log(JSON.stringify(data));
    console.log(id);
    db.collection("m_user").updateOne(
      { _id: new ObjectID(id) },
      { $set: data },
      (err, docs) => {
        callback(docs);
      }
    );
  }
};

module.exports = dt;
