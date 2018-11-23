const responseHelper = require("../helpers/Response_Helper");
const designItemData = require("../datalayers/T_Design_Item_Data");

const T_Design_Item_Logic = {
  createItemHandler: (req, res, next) => {
    let formdata = req.body.design_item_data;

    designItemData.createData(function(designItem) {
      responseHelper.sendResponse(res, 200, designItem);
    }, formdata);
  }
};

module.exports = T_Design_Item_Logic;
