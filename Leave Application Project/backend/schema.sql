-- Leave Application Database Schema
CREATE DATABASE IF NOT EXISTS leave_application_db;
USE leave_application_db;

CREATE TABLE IF NOT EXISTS leave_applications (
    id INT AUTO_INCREMENT PRIMARY KEY,

    -- Applicant Details
    applicant_name VARCHAR(255) NOT NULL,
    applicant_designation VARCHAR(255) NOT NULL,
    leave_type VARCHAR(100) NOT NULL,
    reason_for_leave TEXT NOT NULL,
    leave_request_remarks TEXT,
    leave_start_date DATE NOT NULL,
    leave_end_date DATE NOT NULL,

    -- Charge Taken By
    charge_name VARCHAR(255),
    charge_designation VARCHAR(255),
    charge_email VARCHAR(255),
    charge_remarks TEXT,

    -- Department Head
    department_head VARCHAR(255),
    department_head_remarks TEXT,
    department_head_approval ENUM('Pending', 'Approved', 'Rejected') DEFAULT 'Pending',

    -- HR Verification
    hr_verifier_name VARCHAR(255),
    hr_verifier_designation VARCHAR(255),
    hr_verification_remarks TEXT,
    hr_verification_status ENUM('Pending', 'Verified', 'Rejected') DEFAULT 'Pending',
    hr_verification_date DATE,

    -- Director Approval
    director_name VARCHAR(255),
    director_designation VARCHAR(255),
    director_remarks TEXT,
    director_approval ENUM('Pending', 'Approved', 'Rejected') DEFAULT 'Pending',
    director_approval_date DATE,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
