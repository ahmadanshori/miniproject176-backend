const ResponseHelper = require('../helpers/Response_Helper');
const Dtl = require('../datalayers/M_Employee_Data');

const MEmployeeBisnislogic = {
	ReadAllHandler : (req, res, next) => {
		Dtl.ReadAllHandlerData(function (items) {
			ResponseHelper.sendResponse(res, 200, items);
		});
	},

	ReadByIdHandler : (req, res, next) => {
		let param = req.params.employeeId;
		Dtl.ReadByIdHandlerData((items) => {
			ResponseHelper.sendResponse(res, 200, items);
		}, param);
	},

	CreateHandler  : (req, res, next) => {
		let ThisDate = new Date();
		// ambil masing-masing yy, mm, dd
		let date = ThisDate.getDate();
		let month = ThisDate.getMonth()+1;
		let year = ThisDate.getFullYear().toString().substr(2,2);
		// Untuk mendapatkan format yy.mm.dd
		let newDate = year + "." + month + "." + date + ".";

		Dtl.countEmployee(count => {
			let codeEmployee = newDate;
			for (let i = 0; i < 2-(count+1).toString().length; i++) {
				codeEmployee+='0';
			}
			codeEmployee+=count+1;

			let body = req.body;
			body.employee_number = codeEmployee;
	    body.is_delete = false;

			Dtl.CreateHandlerData(function(items) {
				ResponseHelper.sendResponse(res, 200, items);
			}, body);
		}, newDate)
	},

	UpdateHandler : (req, res, next) => {
		let param = req.params.employeeId;
		let body = req.body;

		Dtl.UpdateHandlerData((items) => {
			ResponseHelper.sendResponse(res, 200, items);
		}, param, body);
	},

	DeleteHandler : (req, res, next) => {
		let param = req.params.employeeId;

		Dtl.DeleteHandlerData((items) => {
			ResponseHelper.sendResponse(res, 200, items);
		}, param);

	}

}

module.exports = MEmployeeBisnislogic;