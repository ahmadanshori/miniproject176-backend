function M_Unit(unit_data) {
  this._id = unit_data._id;
  this.code = unit_data.code;
  this.name = unit_data.name;
  this.description = unit_data.description;
  this.isDelete = unit_data.is_delete;
  this.createdBy = unit_data.created_by;
  this.createdDate = unit_data.created_date;
  this.updatedBy = unit_data.updated_by;
  this.updatedDate = unit_data.updated_date;
}

M_Unit.prototype.getData = function() {
  return {
    _id: this._id,
    code: this.code,
    name: this.name,
    description: this.description,
    isDelete: this.isDelete,
    createdBy: this.createdBy,
    createdDate: this.createdDate,
    updatedBy: this.updatedBy,
    updatedDate: this.updatedDate
  };
};

module.exports = M_Unit;
