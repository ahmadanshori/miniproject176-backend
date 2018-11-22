const Database = require("../models/Database");
const ObjectID = require("mongodb").ObjectID;
const M_Design = require("../models/T_Design_Model");

const db = Database.getConnection();

const designData = {};
module.exports = designData;
