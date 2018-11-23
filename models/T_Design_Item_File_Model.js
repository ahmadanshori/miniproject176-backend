function T_Design_File(design_file_data) {
    this._id = design_file_data._id
    this.t_design_item_id = design_file_data.t_design_id
    this.filename = design_file_data.filename
    this.size = design_file_data.size
    this.extention = design_file_data.extention
    this.is_delete = design_file_data.is_delete
    this.created_by = design_file_data.created_by
    this.created_date = design_file_data.created_date
    this.updated_by = design_file_data.updated_by
    this.updated_date = design_file_data.updated_date
   
    
}
T_Design_File.prototype.getData = function () {
    return {
        _id: this._id,
        t_design_item_id: this.t_design_item_id,
        filename: this.filename,
        size: this.size,
        extention: this.extention,
        is_delete: this.is_delete,
        created_by: this.created_by,
        created_date: this.created_date,
        updated_by: this.updated_by,
        updated_date: this.updated_date,
    }
}

module.exports = T_Design_File