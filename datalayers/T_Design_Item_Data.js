const Database = require("../models/Database");
const ObjectId = require("mongodb").ObjectID;
const T_Design_Item = require("../models/T_Design_Item_Model");

const db = Database.getConnection();
const designDataItem = {
  readAllItemData: (callback, designId) => {
    db.collection("t_design_item")
      .find({
        t_design_id: designId,
        is_delete: false
      })
      .sort({ request_due_date: 1 })
      .toArray((err, items) => {
        callback(items);
      });
  },
  createData: (callback, formdata) => {
    const newData = formdata.map(data => new T_Design_Item(data));

    db.collection("t_design_item").insertMany(newData, (err, design) => {
      callback(newData);
    });
  },
  readByIdData: (callback, itemId) => {
    db.collection("t_design_item").findOne(
      { is_delete: false, _id: new ObjectId(itemId) },
      (err, item) => {
        callback(item);
      }
    );
  },
  deleteData: (callback, itemId, deleteItem) => {
    db.collection("t_design_item").updateOne(
      { _id: new ObjectId(itemId) },
      { $set: deleteItem },
      (err, item) => {
        callback(deleteItem);
      }
    );
  }
};

module.exports = designDataItem;
