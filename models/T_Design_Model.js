function T_Design(design_data) {
  this._id = design_data._id;
  this.code = design_data.code;
  this.t_event_id = design_data.t_event_id;
  this.title_header = design_data.title_header;
  this.request_by = design_data.request_by;
  this.request_date = design_data.request_date;
  this.approved_by = design_data.approved_by;
  this.approved_date = design_data.approved_date;
  this.assign_to = design_data.assign_to;
  this.closed_date = design_data.closed_date;
  this.note = design_data.note;
  this.status = design_data.status;
  this.reject_reason = design_data.reject_reason;
  this.is_delete = design_data.is_delete;
  this.created_by = design_data.created_by;
  this.created_date = design_data.created_date;
  this.updated_by = design_data.updated_by;
  this.updated_date = design_data.updated_date;
}

T_Design.prototype.getData = function() {
  return {
    _id: this._id,
    code: this.code,
    t_event_id: this.t_event_id,
    title_header: this.title_header,
    request_by: this.request_by,
    request_date: this.request_date,
    approved_by: this.approved_by,
    approved_date: this.approved_date,
    assign_to: this.assign_to,
    closed_date: this.closed_date,
    note: this.note,
    status: this.status,
    reject_reason: this.reject_reason,
    is_delete: this.is_delete,
    created_by: this.created_by,
    created_date: this.created_date,
    updated_by: this.updated_by,
    updated_date: this.updated_date
  };
};

module.exports = T_Design;
