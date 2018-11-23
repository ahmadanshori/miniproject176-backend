const ObjectID = require("mongodb").ObjectID;
const Database = require("../models/Database");
const M_user = require("../models/M_User_Model");

const db = Database.getConnection();
const userData = {
  readUserAllData: callback => {
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
  createUserData: (callback, data) => {
    db.collection("m_user").insertOne(data, (err, docs) => {
      callback(docs);
    });
  },
  readEmployeeFromUser: (callback, username) => {
    db.collection("m_employee")
      .aggregate([
        {
          $lookup: {
            from: "m_user",
            localField: "employee_number",
            foreignField: "m_employee_id",
            as: "key"
          }
        },
        { $match: { key: [] } },
        {
          $project: {
            employee_number: "$employee_number",
            name: { $concat: ["$first_name", " ", "$last_name"] }
          }
        }
      ])
      .toArray((err, docs) => {
        callback(docs);
      });
  },
  deleteUserData: (callback, id) => {
    db.collection("m_user").updateOne(
      { _id: new ObjectID(id) },
      { $set: { is_delete: true } },
      (err, docs) => {
        callback(docs);
      }
    );
  },
  updateUserData: (callback, data, id) => {
    db.collection("m_user").updateOne(
      { _id: new ObjectID(id) },
      { $set: data },
      (err, docs) => {
        callback(docs);
      }
    );
  }
};

module.exports = userData;