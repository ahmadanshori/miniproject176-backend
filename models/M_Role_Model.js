function M_Role(mRoleData) {
  this._id = mRoleData._id;
  this.code = mRoleData.code;
  this.name = mRoleData.name;
  this.description = mRoleData.description;
  this.is_delete = mRoleData.is_delete;
  this.created_by = mRoleData.created_by;
  this.created_date = mRoleData.created_date;
  this.updated_by = mRoleData.updated_by;
  this.updated_date = mRoleData.updated_date;
}

M_Role.prototype.getData = function() {
  return {
    _id: this._id,
    code: this.code,
    name: this.name,
    description: this.description,
    is_delete: this.is_delete,
    created_by: this.created_by,
    created_date: this.created_date,
    updated_by: this.updated_by,
    updated_date: this.updated_date
  };
};

module.exports = M_Role;
