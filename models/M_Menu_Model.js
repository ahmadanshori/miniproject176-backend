function M_Menu(m_menu_data) {
  this._id = m_menu_data._id;
  this.code = m_menu_data.code;
  this.name = m_menu_data.name;
  this.controller = m_menu_data.controller;
  this.parent_id = m_menu_data.parent_id;
  this.is_delete = m_menu_data.is_delete;
  this.created_by = m_menu_data.created_by;
  this.created_date = m_menu_data.created_date;
  this.updated_by = m_menu_data.updated_by;
  this.updated_date = m_menu_data.updated_date;
}

M_Menu.prototype.getData = function() {
  return {
    _id: this._id,
    code: this.code,
    name: this.name,
    controller: this.controller,
    is_delete: this.is_delete,
    created_by: this.created_by,
    created_date: this.created_date,
    updated_by: this.updated_by,
    updated_date: this.updated_date
  };
};

module.exports = M_Menu;
