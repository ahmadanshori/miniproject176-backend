const Database = require("../models/Database");
<<<<<<< HEAD
const ObjectID = require("mongodb").ObjectID;
const M_Design = require("../models/T_Design_Model");

const db = Database.getConnection();

const designData = {};
=======
const ObjectId = require("mongodb").ObjectID;
const M_Design = require("../models/T_Design_Model");

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

>>>>>>> e0e4c53581d04a327f28b29d671b4a2e058d4e47
module.exports = designData;
