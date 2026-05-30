# Leave Application System

A full-stack leave application system for workers with React frontend, Node.js/Express backend, and MySQL database. Supports full CRUD operations and a multi-stage approval workflow.

## Features

- **Applicant Details**: Name, designation, leave type, reason, remarks, start/end dates
- **Charge Taken By**: Name, designation, email, remarks
- **Department Head**: Name, remarks, approval status
- **HR Verification**: Verifier details, status, date, remarks
- **Director Approval**: Director details, approval status, date, remarks
- **CRUD**: Create, read, update, and delete leave applications

## Prerequisites

- [Node.js](https://nodejs.org/) (v18 or later)
- [MySQL](https://www.mysql.com/) (v8 or later)

## Setup

### 1. Database

Start MySQL and run the schema script:

```bash
mysql -u root -p < backend/schema.sql
```

Or open `backend/schema.sql` in MySQL Workbench and execute it.

### 2. Backend

```bash
cd backend
npm install
```

Copy the environment file and set your MySQL credentials:

```bash
copy .env.example .env
```

Edit `.env`:

```
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=leave_application_db
```

Start the API server:

```bash
npm start
```

The API runs at `http://localhost:5000`.

### 3. Frontend

In a new terminal:

```bash
cd frontend
npm install
npm run dev
```

The app runs at `http://localhost:3000`.

## API Endpoints

| Method | Endpoint           | Description              |
|--------|--------------------|--------------------------|
| GET    | `/api/leaves`      | List all applications    |
| GET    | `/api/leaves/:id`  | Get one application      |
| POST   | `/api/leaves`      | Create application       |
| PUT    | `/api/leaves/:id`  | Update application       |
| DELETE | `/api/leaves/:id`  | Delete application       |
| GET    | `/api/health`      | Health check             |

## Project Structure

```
Leave Application Project/
├── backend/
│   ├── schema.sql          # MySQL database schema
│   ├── server.js           # Express server entry
│   ├── db.js               # MySQL connection pool
│   ├── routes/
│   │   └── leaveRoutes.js  # CRUD API routes
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── App.jsx         # Main app with routing logic
│   │   ├── api.js          # API client
│   │   └── components/
│   │       ├── LeaveForm.jsx
│   │       ├── LeaveList.jsx
│   │       └── LeaveDetail.jsx
│   └── package.json
└── README.md
```

## Usage

1. Click **New Application** to submit a leave request.
2. Fill in applicant details and optional approval sections.
3. Submit the form to save to the database.
4. View, edit, or delete applications from the list table.
5. Use the **View** button to see full application details in a modal.

## Leave Types

Annual Leave, Sick Leave, Casual Leave, Maternity Leave, Paternity Leave, Unpaid Leave, Compensatory Leave, Other.

## Approval Workflow

Each application tracks three approval stages:

1. **Department Head** — Pending / Approved / Rejected
2. **HR Verification** — Pending / Verified / Rejected
3. **Director Approval** — Pending / Approved / Rejected
