const Database = require("../models/Database");
const ObjectId = require("mongodb").ObjectID;
const T_Design_Item = require("../models/T_Design_Item_Model");

const db = Database.getConnection();
const designDataItem = {
  createData: (callback, formdata) => {
    const newData = formdata.map(data => new T_Design_Item(data));

    db.collection("t_design_item").insertMany(newData, (err, design) => {
      callback(newData);
    });
  }
};

module.exports = designDataItem;
