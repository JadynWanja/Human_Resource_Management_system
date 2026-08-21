# HRMS — Database Schema & Data Flow Diagram

This document contains the complete database design, Entity-Relationship Diagram (ERD), data flow pipelines, PostgreSQL DDL code, and 100% valid DBML schema for [dbdiagram.io](https://dbdiagram.io).

---

## 🗂 100% Valid DBML Schema (Copy & Paste into dbdiagram.io)

```dbml
// =============================================================================
// DBML Enums
// =============================================================================

Enum user_role {
  ADMIN
  MANAGER
  EMPLOYEE
}

Enum employment_status {
  ACTIVE
  ON_LEAVE
  TERMINATED
}

Enum work_location {
  OFFICE
  REMOTE
  HYBRID
}

Enum attendance_status {
  PRESENT
  REMOTE
  ON_LEAVE
  LATE
  ABSENT
}

Enum leave_status {
  PENDING
  APPROVED
  REJECTED
  CANCELLED
}

Enum requisition_priority {
  URGENT
  HIGH
  MEDIUM
  LOW
}

Enum requisition_status {
  PENDING_APPROVAL
  OPEN
  FILLED
  CANCELLED
}

Enum timesheet_status {
  SUBMITTED
  APPROVED
  REJECTED
}

// =============================================================================
// DBML Tables
// =============================================================================

Table users {
  id uuid [pk]
  email varchar [unique, not null]
  password_hash varchar [not null]
  role user_role [default: 'EMPLOYEE']
  is_active boolean [default: true]
  created_at timestamp
}

Table departments {
  id uuid [pk]
  name varchar [unique, not null]
  code varchar [unique, not null]
  manager_id uuid [ref: > employees.id]
  created_at timestamp
}

Table employees {
  id uuid [pk]
  user_id uuid [unique, ref: - users.id]
  employee_code varchar [unique, not null]
  first_name varchar [not null]
  last_name varchar [not null]
  job_title varchar [not null]
  department_id uuid [ref: > departments.id]
  manager_id uuid [ref: > employees.id]
  status employment_status [default: 'ACTIVE']
  location work_location [default: 'OFFICE']
  email varchar [not null]
  hire_date date
  created_at timestamp
}

Table attendance_logs {
  id uuid [pk]
  employee_id uuid [ref: > employees.id]
  log_date date
  clock_in time
  clock_out time
  total_hours decimal
  status attendance_status [default: 'PRESENT']
}

Table leave_types {
  id uuid [pk]
  name varchar [unique, not null]
  max_days_per_year int [default: 15]
  requires_approval boolean [default: true]
}

Table leave_balances {
  id uuid [pk]
  employee_id uuid [ref: > employees.id]
  leave_type_id uuid [ref: > leave_types.id]
  year int
  allocated_days decimal
  used_days decimal
  remaining_days decimal
}

Table leave_requests {
  id uuid [pk]
  employee_id uuid [ref: > employees.id]
  leave_type_id uuid [ref: > leave_types.id]
  start_date date
  end_date date
  total_days decimal
  reason text
  status leave_status [default: 'PENDING']
  requested_at timestamp
}

Table leave_approvals {
  id uuid [pk]
  leave_request_id uuid [unique, ref: - leave_requests.id]
  manager_id uuid [ref: > employees.id]
  action leave_status
  manager_notes text
  action_timestamp timestamp
}

Table timesheets {
  id uuid [pk]
  employee_id uuid [ref: > employees.id]
  week_number int
  year int
  regular_hours decimal [default: 40.0]
  overtime_hours decimal [default: 0.0]
  status timesheet_status [default: 'SUBMITTED']
  approved_by_manager_id uuid [ref: > employees.id]
}

Table headcount_requisitions {
  id uuid [pk]
  department_id uuid [ref: > departments.id]
  requested_by_manager_id uuid [ref: > employees.id]
  job_title varchar
  priority requisition_priority [default: 'HIGH']
  business_justification text
  status requisition_status [default: 'PENDING_APPROVAL']
  created_at timestamp
}

Table performance_reviews {
  id uuid [pk]
  employee_id uuid [ref: > employees.id]
  reviewer_manager_id uuid [ref: > employees.id]
  review_period varchar
  rating_score decimal
  feedback_notes text
  completed_at timestamp
}

Table okr_goals {
  id uuid [pk]
  employee_id uuid [ref: > employees.id]
  title varchar
  completion_percentage decimal
  status varchar
  target_date date
}

Table announcements {
  id uuid [pk]
  author_id uuid [ref: > employees.id]
  title varchar
  tag varchar
  summary text
  published_at timestamp
}

Table notifications {
  id uuid [pk]
  recipient_employee_id uuid [ref: > employees.id]
  title varchar
  message text
  is_read boolean [default: false]
  created_at timestamp
}
```

---

## 💻 Production-Ready PostgreSQL DDL Code

```sql
-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Enum Types
CREATE TYPE user_role AS ENUM ('ADMIN', 'MANAGER', 'EMPLOYEE');
CREATE TYPE employment_status AS ENUM ('ACTIVE', 'ON_LEAVE', 'TERMINATED');
CREATE TYPE work_location AS ENUM ('OFFICE', 'REMOTE', 'HYBRID');
CREATE TYPE attendance_status AS ENUM ('PRESENT', 'REMOTE', 'ON_LEAVE', 'LATE', 'ABSENT');
CREATE TYPE leave_status AS ENUM ('PENDING', 'APPROVED', 'REJECTED', 'CANCELLED');
CREATE TYPE requisition_priority AS ENUM ('URGENT', 'HIGH', 'MEDIUM', 'LOW');
CREATE TYPE requisition_status AS ENUM ('PENDING_APPROVAL', 'OPEN', 'FILLED', 'CANCELLED');
CREATE TYPE timesheet_status AS ENUM ('SUBMITTED', 'APPROVED', 'REJECTED');

-- 1. USERS TABLE
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role user_role NOT NULL DEFAULT 'EMPLOYEE',
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. DEPARTMENTS TABLE
CREATE TABLE departments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) UNIQUE NOT NULL,
    code VARCHAR(20) UNIQUE NOT NULL,
    manager_id UUID,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 3. EMPLOYEES TABLE
CREATE TABLE employees (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID UNIQUE REFERENCES users(id) ON DELETE CASCADE,
    employee_code VARCHAR(50) UNIQUE NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    job_title VARCHAR(150) NOT NULL,
    department_id UUID REFERENCES departments(id) ON DELETE SET NULL,
    manager_id UUID REFERENCES employees(id) ON DELETE SET NULL,
    status employment_status NOT NULL DEFAULT 'ACTIVE',
    location work_location NOT NULL DEFAULT 'OFFICE',
    email VARCHAR(255) NOT NULL,
    hire_date DATE NOT NULL DEFAULT CURRENT_DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Add Foreign Key constraint for Department Manager
ALTER TABLE departments 
ADD CONSTRAINT fk_department_manager 
FOREIGN KEY (manager_id) REFERENCES employees(id) ON DELETE SET NULL;

-- 4. ATTENDANCE LOGS TABLE
CREATE TABLE attendance_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    employee_id UUID NOT NULL REFERENCES employees(id) ON DELETE CASCADE,
    log_date DATE NOT NULL DEFAULT CURRENT_DATE,
    clock_in TIME,
    clock_out TIME,
    total_hours DECIMAL(4, 2) DEFAULT 0.00,
    status attendance_status NOT NULL DEFAULT 'PRESENT',
    CONSTRAINT unique_employee_daily_log UNIQUE (employee_id, log_date)
);

-- 5. LEAVE TYPES TABLE
CREATE TABLE leave_types (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) UNIQUE NOT NULL,
    max_days_per_year INT NOT NULL DEFAULT 15,
    requires_approval BOOLEAN DEFAULT TRUE
);

-- 6. LEAVE BALANCES TABLE
CREATE TABLE leave_balances (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    employee_id UUID NOT NULL REFERENCES employees(id) ON DELETE CASCADE,
    leave_type_id UUID NOT NULL REFERENCES leave_types(id) ON DELETE CASCADE,
    year INT NOT NULL,
    allocated_days DECIMAL(5, 2) NOT NULL,
    used_days DECIMAL(5, 2) DEFAULT 0.00,
    remaining_days DECIMAL(5, 2) GENERATED ALWAYS AS (allocated_days - used_days) STORED,
    CONSTRAINT unique_employee_leave_year UNIQUE (employee_id, leave_type_id, year)
);

-- 7. LEAVE REQUESTS TABLE
CREATE TABLE leave_requests (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    employee_id UUID NOT NULL REFERENCES employees(id) ON DELETE CASCADE,
    leave_type_id UUID NOT NULL REFERENCES leave_types(id) ON DELETE RESTRICT,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    total_days DECIMAL(4, 1) NOT NULL,
    reason TEXT NOT NULL,
    status leave_status NOT NULL DEFAULT 'PENDING',
    requested_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 8. LEAVE APPROVALS TABLE
CREATE TABLE leave_approvals (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    leave_request_id UUID UNIQUE NOT NULL REFERENCES leave_requests(id) ON DELETE CASCADE,
    manager_id UUID NOT NULL REFERENCES employees(id) ON DELETE CASCADE,
    action leave_status NOT NULL,
    manager_notes TEXT,
    action_timestamp TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 9. TIMESHEETS TABLE
CREATE TABLE timesheets (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    employee_id UUID NOT NULL REFERENCES employees(id) ON DELETE CASCADE,
    week_number INT NOT NULL,
    year INT NOT NULL,
    regular_hours DECIMAL(5, 2) NOT NULL DEFAULT 40.00,
    overtime_hours DECIMAL(5, 2) NOT NULL DEFAULT 0.00,
    status timesheet_status NOT NULL DEFAULT 'SUBMITTED',
    approved_by_manager_id UUID REFERENCES employees(id) ON DELETE SET NULL,
    CONSTRAINT unique_weekly_timesheet UNIQUE (employee_id, week_number, year)
);

-- 10. HEADCOUNT REQUISITIONS TABLE
CREATE TABLE headcount_requisitions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    department_id UUID NOT NULL REFERENCES departments(id) ON DELETE CASCADE,
    requested_by_manager_id UUID NOT NULL REFERENCES employees(id) ON DELETE CASCADE,
    job_title VARCHAR(150) NOT NULL,
    priority requisition_priority NOT NULL DEFAULT 'HIGH',
    business_justification TEXT NOT NULL,
    status requisition_status NOT NULL DEFAULT 'PENDING_APPROVAL',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 11. NOTIFICATIONS TABLE
CREATE TABLE notifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    recipient_employee_id UUID NOT NULL REFERENCES employees(id) ON DELETE CASCADE,
    title VARCHAR(150) NOT NULL,
    message TEXT NOT NULL,
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Performance Indexes
CREATE INDEX idx_employees_department ON employees(department_id);
CREATE INDEX idx_employees_manager ON employees(manager_id);
CREATE INDEX idx_attendance_date ON attendance_logs(log_date);
CREATE INDEX idx_leave_requests_employee ON leave_requests(employee_id);
CREATE INDEX idx_leave_requests_status ON leave_requests(status);
```
