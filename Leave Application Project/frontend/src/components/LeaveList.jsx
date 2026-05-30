function StatusBadge({ status }) {
  const className = `status-badge status-${(status || 'Pending').toLowerCase()}`;
  return <span className={className}>{status || 'Pending'}</span>;
}

function formatDate(dateStr) {
  if (!dateStr) return '—';
  return new Date(dateStr).toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
}

export default function LeaveList({ leaves, onView, onEdit, onDelete }) {
  if (leaves.length === 0) {
    return (
      <div className="empty-state">
        <p>No leave applications yet.</p>
        <p className="empty-hint">Click "New Application" to submit your first leave request.</p>
      </div>
    );
  }

  return (
    <div className="leave-list">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Applicant</th>
            <th>Leave Type</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Dept. Head</th>
            <th>HR Status</th>
            <th>Director</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {leaves.map((leave) => (
            <tr key={leave.id}>
              <td>#{leave.id}</td>
              <td>
                <strong>{leave.applicant_name}</strong>
                <span className="cell-sub">{leave.applicant_designation}</span>
              </td>
              <td>{leave.leave_type}</td>
              <td>{formatDate(leave.leave_start_date)}</td>
              <td>{formatDate(leave.leave_end_date)}</td>
              <td><StatusBadge status={leave.department_head_approval} /></td>
              <td><StatusBadge status={leave.hr_verification_status} /></td>
              <td><StatusBadge status={leave.director_approval} /></td>
              <td className="actions-cell">
                <button className="btn btn-sm btn-outline" onClick={() => onView(leave)}>View</button>
                <button className="btn btn-sm btn-outline" onClick={() => onEdit(leave)}>Edit</button>
                <button className="btn btn-sm btn-danger" onClick={() => onDelete(leave.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export { StatusBadge, formatDate };
