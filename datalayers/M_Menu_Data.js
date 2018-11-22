const DB = require("../models/Database");
const ObjectID = require("mongodb").ObjectID;

const mMenu = require("../models/M_Menu_Model");

const db = DB.getConnection();
const dt = {
    //==================Menu=======================
    readMenuAlHandlerData: callback => {
        db.collection("m_menu")
            .find({
                is_delete: false
            })
            .sort({
                code: 1
            })
            .toArray((err, docs) => {
                let m_menu = docs.map(row => {
                    return new mMenu(row);
                });
                callback(m_menu);
            });
    },

    readMenuSidebar: callback => {
        db.collection("m_menu")
            .aggregate([{
                    $lookup: {
                        from: "m_menu",
                        localField: "parentId",
                        foreignField: "code",
                        as: "new"
                    }
                },
                {
                    $match: {
                        parent_id: {
                            $ne: null
                        }
                    }
                },
                {
                    $group: {
                        _id: "$new.name",
                        name: {
                            $push: "$name"
                        },
                        controller: {
                            $push: "$controller"
                        }
                    }
                }
            ])
            .toArray((err, docs) => {
                let m_menu = docs.map(row => {
                    return new mMenu(row);
                });
                callback(m_menu);
            });
    },

    readMenuOneById: (callback, id) => {
        db.collection("m_menu")
            .find({
                code: id
            })
            .sort({
                code: 1
            })
            .toArray((err, docs) => {
                let m_menu = docs.map(row => {
                    return new mMenu(row);
                });
                callback(m_menu);
            });
    },

    readMenuLastId: callback => {
        db.collection("m_menu")
            .find({})
            .sort({
                code: -1
            })
            .limit(1)
            .toArray((err, docs) => {
                let m_menu = docs.map(row => {
                    return new mMenu(row);
                });
                callback(m_menu);
            });
    },

    deleteMenuHandler: (callback, id) => {
        db.collection("m_menu").updateOne({
                code: id
            }, {
                $set: {
                    is_delete: true
                }
            },
            (err, docs) => {
                callback(docs);
            }
        );
    },

    updateMenuHandler: (callback, data, id) => {
        console.log(data);
        db.collection("m_menu").updateOne({
                code: id
            }, {
                $set: data
            },
            (err, docs) => {
                callback(docs);
            }
        );
    },

    createMenuHandler: (callback, data) => {
        db.collection("m_menu").insert(data, (err, docs) => {
            callback(docs);
        });
    }
}

module.exports = dt;