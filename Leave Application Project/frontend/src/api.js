const API_BASE = '/api/leaves';

export async function fetchLeaves() {
  const res = await fetch(API_BASE);
  if (!res.ok) throw new Error('Failed to fetch leave applications');
  return res.json();
}

export async function fetchLeave(id) {
  const res = await fetch(`${API_BASE}/${id}`);
  if (!res.ok) throw new Error('Failed to fetch leave application');
  return res.json();
}

export async function createLeave(data) {
  const res = await fetch(API_BASE, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to create leave application');
  return res.json();
}

export async function updateLeave(id, data) {
  const res = await fetch(`${API_BASE}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to update leave application');
  return res.json();
}

export async function deleteLeave(id) {
  const res = await fetch(`${API_BASE}/${id}`, { method: 'DELETE' });
  if (!res.ok) throw new Error('Failed to delete leave application');
  return res.json();
}

export const emptyForm = {
  applicant_name: '',
  applicant_designation: '',
  leave_type: 'Annual Leave',
  reason_for_leave: '',
  leave_request_remarks: '',
  leave_start_date: '',
  leave_end_date: '',
  charge_name: '',
  charge_designation: '',
  charge_email: '',
  charge_remarks: '',
  department_head: '',
  department_head_remarks: '',
  department_head_approval: 'Pending',
  hr_verifier_name: '',
  hr_verifier_designation: '',
  hr_verification_remarks: '',
  hr_verification_status: 'Pending',
  hr_verification_date: '',
  director_name: '',
  director_designation: '',
  director_remarks: '',
  director_approval: 'Pending',
  director_approval_date: '',
};

export const LEAVE_TYPES = [
  'Annual Leave',
  'Sick Leave',
  'Casual Leave',
  'Maternity Leave',
  'Paternity Leave',
  'Unpaid Leave',
  'Compensatory Leave',
  'Other',
];

export const APPROVAL_STATUS = ['Pending', 'Approved', 'Rejected'];
export const HR_STATUS = ['Pending', 'Verified', 'Rejected'];
