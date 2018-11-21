function M_T_Event(m_t_event_data) {
	this._id           = m_t_event_data._id;
	this.code          = m_t_event_data.code;
	this.event_name    = m_t_event_data.event_name;
	this.start_date    = m_t_event_data.start_date;
	this.end_date      = m_t_event_data.end_date;
	this.place         = m_t_event_data.place;
	this.budget        = m_t_event_data.budget;
	this.request_by    = m_t_event_data.request_by;
	this.request_date  = m_t_event_data.request_date;
	this.approved_by   = m_t_event_data.approved_by;
	this.approved_date = m_t_event_data.approved_date;
	this.assign_to     = m_t_event_data.assign_to;
	this.closed_date   = m_t_event_data.closed_date;
	this.note          = m_t_event_data.note;
	this.status        = m_t_event_data.status;
	this.reject_reason = m_t_event_data.reject_reason;
	this.is_delete     = m_t_event_data.false;
	this.created_by    = m_t_event_data.created_by;
	this.created_date  = m_t_event_data.created_date;
	this.updated_by    = m_t_event_data.updated_by;
	this.updated_date  = m_t_event_data.updated_date;	
}

M_T_Event.prototype.getData = function() {
	return {
		_id           : this._id,
		code          : this.code,
		event_name    : this.event_name,
		start_date    : this.start_date,
		end_date      : this.end_date,
		place         : this.place,
		budget        : this.budget,
		request_by    : this.request_by,
		request_date  : this.request_date,
		approved_by   : this.approved_by,
		approved_date : this.approved_date,
		assign_to     : this.assign_to,
		closed_date   : this.closed_date,
		note          : this.note,
		status        : this.status,
		reject_reason : this.reject_reason,
		is_delete     : this.false,
		created_by    : this.created_by,
		created_date  : this.created_date,
		updated_by    : this.updated_by,
		updated_date  : this.updated_date,
	}
}

module.exports = M_T_Event;