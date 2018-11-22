const ObjectId = require("mongodb").ObjectId;
const Database = require("../models/Database");
const employeeModel = require("../models/M_Employee_Model");

const db = Database.getConnection();
const employeeData = {
  readAllData: callback => {
    db.collection("m_employee")
      .find({ is_delete: false })
      .toArray((err, docs) => {
        let MEmployee = docs.map(row => {
          return new employeeModel(row);
        });
        callback(MEmployee);
      });
  },
  readByIdData: (callback, param) => {
    db.collection("m_employee")
      .find({ _id: new ObjectId(param) }, { is_delete: false })
      .toArray((err, docs) => {
        let MEmployee = docs.map(row => {
          return new employeeModel(row);
        });
        callback(MEmployee);
      });
  },
  countEmployee: (callback, newDate) => {
    db.collection("m_employee")
      .find({ employee_number: { $regex: new RegExp(newDate) } })
      .count((err, count) => {
        callback(count);
      });
  },
  createData: (callback, body) => {
    let NewBody = new employeeModel(body);
    db.collection("m_employee").insert(NewBody, (err, docs) => {
      callback(NewBody);
    });
  },
  updateData: (callback, param, body) => {
    db.collection("m_employee").updateOne(
      { _id: ObjectId(param) },
      { $set: body },
      (err, docs) => {
        callback(body);
      }
    );
  },
  deleteData: (callback, param) => {
    db.collection("m_employee").updateOne(
      { _id: ObjectId(param) },
      { $set: { is_delete: true } },
      (err, docs) => {
        callback(docs);
      }
    );
  }
};

module.exports = employeeData;
