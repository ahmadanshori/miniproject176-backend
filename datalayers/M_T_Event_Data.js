const DB = require('../models/Database');
const ObjectId = require('mongodb').ObjectId;
const TEventModel = require('../models/M_T_Event_Model');
const db = DB.getConnection();

const TEventDatalayer = {
	ReadAllHandlerData : (callback) => {
		db.collection("t_event").find({"is_delete" : false}).toArray((err, docs) => {
			let MTEventData = docs.map((row) => {
				return new TEventModel(row)
			})
			callback(MTEventData)
		})
	},

	ReadByIdHandlerData : (callback, param) => {
		db.collection('t_event').find({_id : new ObjectId(param)}, {"is_delete" : false}).toArray((err, docs) => {
			let MTEventData = docs.map((row) => {
				return new TEventModel(row)
			})
			callback(MTEventData)
		})
	},

	countTEvent : (callback, newDate)=>{
		db.collection('t_event').find(
			{ code : { $regex : new RegExp(newDate) } } ).count(
			(err, count)=>{
				callback(count)
			}
		);
	},
	
	CreateHandlerData : (callback, body) => {
		let NewBody = new TEventModel(body)
		db.collection('t_event').insertOne(NewBody, (err, docs) => {
			callback(docs)
		})
	},

	UpdateHandlerData : (callback, param, body) => {
		db.collection('t_event').updateOne({_id : ObjectId(param)}, {$set : body}, (err, docs) => {
				callback(docs)
		})
	},

	DeleteHandlerData : (callback, param) => {
		db.collection('t_event').updateOne({_id : ObjectId(param)}, { $set : {is_delete : true}}, (err, docs) => {
				callback(docs)
		})
	}
}

module.exports = TEventDatalayer;