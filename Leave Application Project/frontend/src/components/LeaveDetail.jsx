import { StatusBadge, formatDate } from './LeaveList';

function DetailRow({ label, value }) {
  if (!value) return null;
  return (
    <div className="detail-row">
      <span className="detail-label">{label}</span>
      <span className="detail-value">{value}</span>
    </div>
  );
}

function DetailSection({ title, children }) {
  return (
    <section className="detail-section">
      <h3>{title}</h3>
      <div className="detail-grid">{children}</div>
    </section>
  );
}

export default function LeaveDetail({ leave, onClose, onEdit }) {
  if (!leave) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal detail-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div>
            <h2>Leave Application #{leave.id}</h2>
            <p className="modal-subtitle">{leave.applicant_name} — {leave.leave_type}</p>
          </div>
          <button className="btn-close" onClick={onClose} aria-label="Close">&times;</button>
        </div>

        <div className="modal-body">
          <DetailSection title="Applicant Details">
            <DetailRow label="Name" value={leave.applicant_name} />
            <DetailRow label="Designation" value={leave.applicant_designation} />
            <DetailRow label="Leave Type" value={leave.leave_type} />
            <DetailRow label="Start Date" value={formatDate(leave.leave_start_date)} />
            <DetailRow label="End Date" value={formatDate(leave.leave_end_date)} />
            <DetailRow label="Reason" value={leave.reason_for_leave} />
            <DetailRow label="Remarks" value={leave.leave_request_remarks} />
          </DetailSection>

          <DetailSection title="Charge Taken By">
            <DetailRow label="Name" value={leave.charge_name} />
            <DetailRow label="Designation" value={leave.charge_designation} />
            <DetailRow label="Email" value={leave.charge_email} />
            <DetailRow label="Remarks" value={leave.charge_remarks} />
          </DetailSection>

          <DetailSection title="Department Head">
            <DetailRow label="Department Head" value={leave.department_head} />
            <DetailRow label="Remarks" value={leave.department_head_remarks} />
            <div className="detail-row">
              <span className="detail-label">Approval</span>
              <StatusBadge status={leave.department_head_approval} />
            </div>
          </DetailSection>

          <DetailSection title="HR Verification">
            <DetailRow label="Verifier Name" value={leave.hr_verifier_name} />
            <DetailRow label="Designation" value={leave.hr_verifier_designation} />
            <DetailRow label="Verification Date" value={formatDate(leave.hr_verification_date)} />
            <DetailRow label="Remarks" value={leave.hr_verification_remarks} />
            <div className="detail-row">
              <span className="detail-label">Status</span>
              <StatusBadge status={leave.hr_verification_status} />
            </div>
          </DetailSection>

          <DetailSection title="Director Approval">
            <DetailRow label="Director Name" value={leave.director_name} />
            <DetailRow label="Designation" value={leave.director_designation} />
            <DetailRow label="Approval Date" value={formatDate(leave.director_approval_date)} />
            <DetailRow label="Remarks" value={leave.director_remarks} />
            <div className="detail-row">
              <span className="detail-label">Approval</span>
              <StatusBadge status={leave.director_approval} />
            </div>
          </DetailSection>
        </div>

        <div className="modal-footer">
          <button className="btn btn-secondary" onClick={onClose}>Close</button>
          <button className="btn btn-primary" onClick={() => onEdit(leave)}>Edit Application</button>
        </div>
      </div>
    </div>
  );
}
