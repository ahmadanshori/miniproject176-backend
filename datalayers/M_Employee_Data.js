const DB = require('../models/Database');
const ObjectId = require('mongodb').ObjectId;
const EmployeeModel = require('../models/M_Employee_Model');
const db = DB.getConnection();

const EmployeeDatalayer = {
	ReadAllHandlerData : (callback) => {
		db.collection("m_employee").find({"is_delete" : false}).toArray((err, docs) => {
			let MEmployee = docs.map((row) => {
				return new EmployeeModel(row)
			})
			callback(MEmployee)
		})
	},

	ReadByIdHandlerData : (callback, param) => {
		db.collection('m_employee').find({employee_number : param}, {"is_delete" : false}).toArray((err, docs) => {
			let MEmployee = docs.map((row) => {
				return new EmployeeModel(row)
			})
			callback(MEmployee)
		})
	},

	countEmployee : (callback, newDate)=>{
		db.collection('m_employee').find(
			{ employee_number : { $regex : new RegExp(newDate) } } ).count(
			(err, count)=>{
				callback(count)
			}
		);
	},
	
	CreateHandlerData : (callback, body) => {
		let NewBody = new EmployeeModel(body)
		db.collection('m_employee').insert(NewBody, (err, docs) => {
			callback(docs)
		})
	},

	UpdateHandlerData : (callback, param, body) => {
		db.collection('m_employee').updateOne({_id : ObjectId(param)}, {$set : body}, (err, docs) => {
				callback(docs)
		})
	},

	DeleteHandlerData : (callback, param) => {
		db.collection('m_employee').updateOne({_id : ObjectId(param)}, { $set : {is_delete : true}}, (err, docs) => {
				callback(docs)
		})
	}
}

module.exports = EmployeeDatalayer;