const responseHelper = require("../helpers/Response_Helper");
const designItemData = require("../datalayers/T_Design_Item_Data");

const T_Design_Item_Logic = {
  readAllItemHandler: (req, res, next) => {
    const designId = req.params.designId;

    designItemData.readAllItemData(items => {
      responseHelper.sendResponse(res, 200, items);
    }, designId);
  },
  createItemHandler: (req, res, next) => {
    let formdata = req.body.design_item_data;

    designItemData.createData(function(designItem) {
      responseHelper.sendResponse(res, 200, designItem);
    }, formdata);
  },
  deleteItemHandler: (req, res, next) => {
    const itemId = req.params.itemId;
    const deleteItem = { is_delete: true };

    designItemData.readByIdData(item => {
      if (item) {
        designItemData.deleteData(
          item => {
            responseHelper.sendResponse(res, 200, item);
          },
          itemId,
          deleteItem
        );
      } else {
        responseHelper.sendResponse(
          res,
          404,
          "404. Design Item Data Not Found!"
        );
      }
    }, itemId);
  }
};

module.exports = T_Design_Item_Logic;
