function FormSection({ title, children }) {
  return (
    <section className="form-section">
      <h2 className="section-title">{title}</h2>
      <div className="section-grid">{children}</div>
    </section>
  );
}

function FormField({ label, name, value, onChange, type = 'text', required, options, rows }) {
  const id = `field-${name}`;

  if (options) {
    return (
      <div className="form-field">
        <label htmlFor={id}>{label}{required && ' *'}</label>
        <select id={id} name={name} value={value} onChange={onChange} required={required}>
          {options.map((opt) => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
      </div>
    );
  }

  if (type === 'textarea') {
    return (
      <div className="form-field full-width">
        <label htmlFor={id}>{label}{required && ' *'}</label>
        <textarea
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          rows={rows || 3}
          required={required}
        />
      </div>
    );
  }

  return (
    <div className="form-field">
      <label htmlFor={id}>{label}{required && ' *'}</label>
      <input
        id={id}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
      />
    </div>
  );
}

export default function LeaveForm({ formData, onChange, onSubmit, onCancel, submitLabel }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    onChange({ ...formData, [name]: value });
  };

  return (
    <form className="leave-form" onSubmit={onSubmit}>
      <FormSection title="Applicant Details">
        <FormField label="Name" name="applicant_name" value={formData.applicant_name} onChange={handleChange} required />
        <FormField label="Designation" name="applicant_designation" value={formData.applicant_designation} onChange={handleChange} required />
        <FormField label="Leave Type" name="leave_type" value={formData.leave_type} onChange={handleChange} options={['Annual Leave', 'Sick Leave', 'Casual Leave', 'Maternity Leave', 'Paternity Leave', 'Unpaid Leave', 'Compensatory Leave', 'Other']} required />
        <FormField label="Leave Start Date" name="leave_start_date" type="date" value={formData.leave_start_date} onChange={handleChange} required />
        <FormField label="Leave End Date" name="leave_end_date" type="date" value={formData.leave_end_date} onChange={handleChange} required />
        <FormField label="Reason for Leave" name="reason_for_leave" value={formData.reason_for_leave} onChange={handleChange} type="textarea" required />
        <FormField label="Leave Request Remarks" name="leave_request_remarks" value={formData.leave_request_remarks} onChange={handleChange} type="textarea" />
      </FormSection>

      <FormSection title="Charge Taken By">
        <FormField label="Name" name="charge_name" value={formData.charge_name} onChange={handleChange} />
        <FormField label="Designation" name="charge_designation" value={formData.charge_designation} onChange={handleChange} />
        <FormField label="Email" name="charge_email" type="email" value={formData.charge_email} onChange={handleChange} />
        <FormField label="Remarks" name="charge_remarks" value={formData.charge_remarks} onChange={handleChange} type="textarea" />
      </FormSection>

      <FormSection title="Department Head">
        <FormField label="Department Head" name="department_head" value={formData.department_head} onChange={handleChange} />
        <FormField label="Department Head Remarks" name="department_head_remarks" value={formData.department_head_remarks} onChange={handleChange} type="textarea" />
        <FormField label="Department Head Approval" name="department_head_approval" value={formData.department_head_approval} onChange={handleChange} options={['Pending', 'Approved', 'Rejected']} />
      </FormSection>

      <FormSection title="HR Verification">
        <FormField label="HR Verifier Name" name="hr_verifier_name" value={formData.hr_verifier_name} onChange={handleChange} />
        <FormField label="HR Verifier Designation" name="hr_verifier_designation" value={formData.hr_verifier_designation} onChange={handleChange} />
        <FormField label="HR Verification Status" name="hr_verification_status" value={formData.hr_verification_status} onChange={handleChange} options={['Pending', 'Verified', 'Rejected']} />
        <FormField label="HR Verification Date" name="hr_verification_date" type="date" value={formData.hr_verification_date} onChange={handleChange} />
        <FormField label="HR Verification Remarks" name="hr_verification_remarks" value={formData.hr_verification_remarks} onChange={handleChange} type="textarea" />
      </FormSection>

      <FormSection title="Director Approval">
        <FormField label="Director Name" name="director_name" value={formData.director_name} onChange={handleChange} />
        <FormField label="Director Designation" name="director_designation" value={formData.director_designation} onChange={handleChange} />
        <FormField label="Director Approval" name="director_approval" value={formData.director_approval} onChange={handleChange} options={['Pending', 'Approved', 'Rejected']} />
        <FormField label="Director Approval Date" name="director_approval_date" type="date" value={formData.director_approval_date} onChange={handleChange} />
        <FormField label="Director Remarks" name="director_remarks" value={formData.director_remarks} onChange={handleChange} type="textarea" />
      </FormSection>

      <div className="form-actions">
        <button type="button" className="btn btn-secondary" onClick={onCancel}>Cancel</button>
        <button type="submit" className="btn btn-primary">{submitLabel}</button>
      </div>
    </form>
  );
}

export { FormSection, FormField };
