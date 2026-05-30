const express = require('express');
const router = express.Router();
const pool = require('../db');

const LEAVE_FIELDS = [
  'applicant_name', 'applicant_designation', 'leave_type', 'reason_for_leave',
  'leave_request_remarks', 'leave_start_date', 'leave_end_date',
  'charge_name', 'charge_designation', 'charge_email', 'charge_remarks',
  'department_head', 'department_head_remarks', 'department_head_approval',
  'hr_verifier_name', 'hr_verifier_designation', 'hr_verification_remarks',
  'hr_verification_status', 'hr_verification_date',
  'director_name', 'director_designation', 'director_remarks',
  'director_approval', 'director_approval_date',
];

// GET all leave applications
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query(
      'SELECT * FROM leave_applications ORDER BY created_at DESC'
    );
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET single leave application
router.get('/:id', async (req, res) => {
  try {
    const [rows] = await pool.query(
      'SELECT * FROM leave_applications WHERE id = ?',
      [req.params.id]
    );
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Leave application not found' });
    }
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// CREATE leave application
router.post('/', async (req, res) => {
  try {
    const data = req.body;
    const placeholders = LEAVE_FIELDS.map(() => '?').join(', ');
    const values = LEAVE_FIELDS.map((field) => data[field] ?? null);

    const [result] = await pool.query(
      `INSERT INTO leave_applications (${LEAVE_FIELDS.join(', ')}) VALUES (${placeholders})`,
      values
    );

    const [rows] = await pool.query(
      'SELECT * FROM leave_applications WHERE id = ?',
      [result.insertId]
    );
    res.status(201).json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// UPDATE leave application
router.put('/:id', async (req, res) => {
  try {
    const data = req.body;
    const setClause = LEAVE_FIELDS.map((field) => `${field} = ?`).join(', ');
    const values = [...LEAVE_FIELDS.map((field) => data[field] ?? null), req.params.id];

    const [result] = await pool.query(
      `UPDATE leave_applications SET ${setClause} WHERE id = ?`,
      values
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Leave application not found' });
    }

    const [rows] = await pool.query(
      'SELECT * FROM leave_applications WHERE id = ?',
      [req.params.id]
    );
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE leave application
router.delete('/:id', async (req, res) => {
  try {
    const [result] = await pool.query(
      'DELETE FROM leave_applications WHERE id = ?',
      [req.params.id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Leave application not found' });
    }
    res.json({ message: 'Leave application deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
