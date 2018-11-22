function T_Design(design_data) {
    this._id = design_data._id
    this.code = design_data.code
    this.tEventId = design_data.t_event_id
    this.titleHeader = design_data.title_header
    this.requestBy = design_data.request_by
    this.requestDate = design_data.request_date
    this.approvedBy = design_data.approved_by
    this.approvedDate = design_data.approved_date
    this.assignTo = design_data.assign_to
    this.closeDate = design_data.closed_date
    this.note = design_data.note
    this.status = design_data.status
    this.rejectReason = design_data.reject_reason
    this.isDelete = design_data.is_delete
    this.createdBy = design_data.created_by
    this.createdDate = design_data.created_date
    this.updatedBy = design_data.updated_by
    this.updatedDate = design_data.updated_date


}
T_Design.prototype.getData = function () {
    return {
        _id: this._id,
        code: this.code,
        tEventId: this.tEventId,
        titleHeader: this.titleHeader,
        requestBy: this.requestBy,
        requestDate: this.requestDate,
        approvedBy: this.approvedBy,
        approvedDate: this.approvedDate,
        assignTo: this.assignTo,
        closeDate: this.closeDate,
        note: this.note,
        status: this.status,
        rejectReason: this.rejectReason,
        isDelete: this.isDelete,
        createdBy: this.createdBy,
        createdDate: this.createdDate,
        updatedBy: this.updatedBy,
        updatedDate: this.updatedDate,
    }
}

module.exports = T_Design