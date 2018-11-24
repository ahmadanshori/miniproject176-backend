function M_company(mCompData) {
  this._id = mCompData._id;
  this.code = mCompData.code;
  this.name = mCompData.name;
  this.address = mCompData.address;
  this.phone = mCompData.phone;
  this.email = mCompData.email;
  this.is_delete = mCompData.is_delete;
  this.created_by = mCompData.created_by;
  this.created_date = mCompData.created_date;
  this.updated_by = mCompData.updated_by;
  this.updated_date = mCompData.updated_date;
}

M_company.prototype.getData = function() {
  return {
    _id: this._id,
    code: this.code,
    name: this.name,
    address: this.address,
    phone: this.phone,
    email: this.email,
    is_delete: this.is_delete,
    created_by: this.created_by,
    created_date: this.created_date,
    updated_by: this.updated_by,
    updated_date: this.updated_date
  };
};

module.exports = M_company;
