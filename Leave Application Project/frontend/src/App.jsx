import { useState, useEffect, useCallback } from 'react';
import LeaveForm from './components/LeaveForm';
import LeaveList from './components/LeaveList';
import LeaveDetail from './components/LeaveDetail';
import {
  fetchLeaves,
  createLeave,
  updateLeave,
  deleteLeave,
  emptyForm,
} from './api';

const VIEWS = { LIST: 'list', FORM: 'form', DETAIL: 'detail' };

export default function App() {
  const [view, setView] = useState(VIEWS.LIST);
  const [leaves, setLeaves] = useState([]);
  const [formData, setFormData] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [selectedLeave, setSelectedLeave] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [saving, setSaving] = useState(false);

  const loadLeaves = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchLeaves();
      setLeaves(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadLeaves();
  }, [loadLeaves]);

  const handleNew = () => {
    setFormData(emptyForm);
    setEditingId(null);
    setView(VIEWS.FORM);
  };

  const handleEdit = (leave) => {
    setFormData({
      ...emptyForm,
      ...leave,
      leave_start_date: leave.leave_start_date?.slice(0, 10) || '',
      leave_end_date: leave.leave_end_date?.slice(0, 10) || '',
      hr_verification_date: leave.hr_verification_date?.slice(0, 10) || '',
      director_approval_date: leave.director_approval_date?.slice(0, 10) || '',
    });
    setEditingId(leave.id);
    setSelectedLeave(null);
    setView(VIEWS.FORM);
  };

  const handleView = (leave) => {
    setSelectedLeave(leave);
    setView(VIEWS.DETAIL);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this leave application?')) return;
    try {
      await deleteLeave(id);
      await loadLeaves();
    } catch (err) {
      alert(err.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (editingId) {
        await updateLeave(editingId, formData);
      } else {
        await createLeave(formData);
      }
      await loadLeaves();
      setView(VIEWS.LIST);
      setFormData(emptyForm);
      setEditingId(null);
    } catch (err) {
      alert(err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setView(VIEWS.LIST);
    setFormData(emptyForm);
    setEditingId(null);
  };

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-content">
          <div className="logo">
            <span className="logo-icon">📋</span>
            <div>
              <h1>Leave Application System</h1>
              <p>Worker leave management with full approval workflow</p>
            </div>
          </div>
          {view === VIEWS.LIST && (
            <button className="btn btn-primary" onClick={handleNew}>
              + New Application
            </button>
          )}
        </div>
      </header>

      <main className="app-main">
        {error && (
          <div className="alert alert-error">
            <strong>Connection error:</strong> {error}. Make sure the backend server and MySQL database are running.
          </div>
        )}

        {view === VIEWS.LIST && (
          <div className="panel">
            <div className="panel-header">
              <h2>All Leave Applications</h2>
              <span className="count-badge">{leaves.length} total</span>
            </div>
            {loading ? (
              <div className="loading">Loading applications...</div>
            ) : (
              <LeaveList
                leaves={leaves}
                onView={handleView}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            )}
          </div>
        )}

        {view === VIEWS.FORM && (
          <div className="panel">
            <div className="panel-header">
              <h2>{editingId ? 'Edit Leave Application' : 'New Leave Application'}</h2>
            </div>
            <LeaveForm
              formData={formData}
              onChange={setFormData}
              onSubmit={handleSubmit}
              onCancel={handleCancel}
              submitLabel={saving ? 'Saving...' : editingId ? 'Update Application' : 'Submit Application'}
            />
          </div>
        )}

        {view === VIEWS.DETAIL && selectedLeave && (
          <LeaveDetail
            leave={selectedLeave}
            onClose={() => setView(VIEWS.LIST)}
            onEdit={handleEdit}
          />
        )}
      </main>
    </div>
  );
}
