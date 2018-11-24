const Database = require("../models/Database");
const ObjectId = require("mongodb").ObjectID;
const M_Design = require("../models/T_Design_Model");
const T_Design_Item = require("../models/T_Design_Item_Model");
const T_Design_File = require("../models/T_Design_Item_File_Model");

const db = Database.getConnection();
const designData = {
  readAllData: callback => {
    db.collection("t_design")
      .find({ is_delete: false })
      .sort({ code: 1 })
      .toArray((err, designs) => {
        let tDesign = designs.map(design => {
          return new M_Design(design);
        });
        callback(tDesign);
      });
  },
  readByIdData: (callback, designId) => {
    db.collection("t_design").findOne(
      { is_delete: false, _id: new ObjectId(designId) },
      (err, design) => {
        callback(design);
      }
    );
  },
  createData: (callback, formdata) => {
    let designData = new M_Design(formdata);
    db.collection("t_design").insertOne(designData, (err, design) => {
      callback(designData);
    });
  },
  updateData: (callback, designId, updateDesign) => {
    db.collection("t_design").updateOne(
      { _id: new ObjectId(designId) },
      { $set: updateDesign },
      (err, souvenir) => {
        callback(updateDesign);
      }
    );
  },
  approveStatus: (callback, data, id) => {
    db.collection("t_design").updateOne(
      { _id: new ObjectID(id) },
      { $set: data },
      (err, docs) => {
        callback(docs);
      }
    );
  },
  createItemFileData: (callback, datas) => {
    let designFile = datas.map(data => new T_Design_File(data));

    db.collection("m_design_item_file").insertMany(designFile, (err, docs) => {
      callback(designFile);
    });
  },
  readDesignItemById: (callback, id) => {
    db.collection("t_design_item")
      .find({ is_delete: false, _id: new ObjectID(id) })
      .sort({ t_design_id: 1 })
      .toArray((err, docs) => {
        let item = docs.map(row => {
          return new T_Design_Item(row);
        });
        callback(item);
      });
  },
  closeRequestData: (callback, data, id) => {
    db.collection("t_design").updateOne(
      { _id: new ObjectID(id) },
      { $set: data },
      (err, docs) => {
        callback(docs);
      }
    );
  },
  readFilebyId: (callback, id) => {
    db.collection("t_design_item_file")
      .find({ is_delete: false, _id: new ObjectID(id) })
      .sort({ t_design_id: 1 })
      .toArray((err, docs) => {
        let file = docs.map(row => {
          return new T_Design_File(row);
        });
        callback(file);
      });
  },
  lastCodeData: callback => {
    db.collection("t_design")
      .find({})
      .sort({ code: -1 })
      .limit(1)
      .toArray((err, docs) => {
        let t_design = docs.map(doc => {
          return new M_Design(doc);
        });
        callback(t_design);
      });
  }
};

module.exports = designData;
