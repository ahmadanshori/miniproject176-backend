const ResponseHelper = require('../helpers/Response_Helper');
const Dtl = require('../datalayers/M_T_Event_Data');

const MTEventBisnislogic = {
	ReadAllHandler : (req, res, next) => {
		Dtl.ReadAllHandlerData(function (items) {
			ResponseHelper.sendResponse(res, 200, items);
		});
	},

	ReadByIdHandler : (req, res, next) => {
		let param = req.params.teventId;
		Dtl.ReadByIdHandlerData((items) => {
			ResponseHelper.sendResponse(res, 200, items);
		}, param);
	},

	CreateHandler  : (req, res, next) => {
		let ThisDate = new Date();
		// ambil masing-masing yy, mm, dd
		let date = ThisDate.getDate().toString();
		let month = (ThisDate.getMonth()+1).toString();
		let year = ThisDate.getFullYear().toString().substr(2,2);
		// Untuk mendapatkan format yy.mm.dd
		let newDate = date + month + year ;

		Dtl.countTEvent(count => {
			let codeTEvent = "TRWOEV" + newDate;
			for (let i = 0; i < 5-(count+1).toString().length; i++) {
				codeTEvent+='0';
			}
			codeTEvent+=count+1;

			let body = req.body;
			body.code = codeTEvent;
			body.is_delete = false;

			Dtl.CreateHandlerData(function(items, newDate) {
				ResponseHelper.sendResponse(res, 200, items);
			}, body);
		}, newDate)
	},

	UpdateHandler : (req, res, next) => {
		let param = req.params.teventId;
		let body = req.body;

		Dtl.UpdateHandlerData((items) => {
			ResponseHelper.sendResponse(res, 200, items);
		}, param, body);
	},

	DeleteHandler : (req, res, next) => {
		let param = req.params.teventId;

		Dtl.DeleteHandlerData((items) => {
			ResponseHelper.sendResponse(res, 200, items);
		}, param);

	}

}

module.exports = MTEventBisnislogic;