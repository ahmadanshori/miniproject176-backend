const responseHelper = require("../helpers/Response_Helper");
const designItemData = require("../datalayers/T_Design_Item_Data");
const moment = require("moment");

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
  updateItemHandler: (req, res, next) => {
    const itemId = req.params.itemId;

    designItemData.readByIdData(item => {
      // validate if selected data exist
      if (item) {
        // validate to empty form will be replaced with existing data
        const m_product_id =
          req.body.m_product_id === ""
            ? item.m_product_id
            : req.body.m_product_id;
        const title_item =
          req.body.title_item === "" ? item.title_item : req.body.title_item;
        const request_due_date =
          req.body.request_due_date === ""
            ? item.request_due_date
            : req.body.request_due_date;
        const note = req.body.note === "" ? item.note : req.body.note;

        // contain inputed data
        let formdata = {
          m_product_id: m_product_id,
          title_item: title_item,
          request_due_date: request_due_date,
          note: note,
          updated_by: req.body.updated_by,
          updated_date: moment().format("DD-MM-YYYY")
        };

        designItemData.updateItemData(
          function(updatedItem) {
            responseHelper.sendResponse(res, 200, updatedItem);
          },
          itemId,
          formdata
        );
      } else {
        responseHelper.sendResponse(res, 404, "404. Design Item NOT Found!");
      }
    }, itemId);
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
