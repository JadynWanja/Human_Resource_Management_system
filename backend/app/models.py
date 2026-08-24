from datetime import datetime
from app import db


class User(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(255), nullable=False)
    role = db.Column(db.String(40), nullable=False, default='employee')
    role_label = db.Column(db.String(80), nullable=False, default='Employee')
    created_at = db.Column(db.DateTime, default=datetime.utcnow)


class Department(db.Model):
    __tablename__ = 'departments'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), unique=True, nullable=False)
    code = db.Column(db.String(20), unique=True, nullable=False)
    manager_name = db.Column(db.String(120), nullable=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)


class Employee(db.Model):
    __tablename__ = 'employees'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), unique=True, nullable=False)
    employee_code = db.Column(db.String(40), unique=True, nullable=False)
    first_name = db.Column(db.String(80), nullable=False)
    last_name = db.Column(db.String(80), nullable=False)
    email = db.Column(db.String(120), nullable=False)
    job_title = db.Column(db.String(120), nullable=False)
    department_id = db.Column(db.Integer, db.ForeignKey('departments.id'), nullable=False)
    manager_id = db.Column(db.Integer, db.ForeignKey('employees.id'), nullable=True)
    status = db.Column(db.String(30), default='ACTIVE')
    location = db.Column(db.String(30), default='OFFICE')
    hire_date = db.Column(db.String(30), nullable=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)


class LeaveRequest(db.Model):
    __tablename__ = 'leave_requests'
    id = db.Column(db.Integer, primary_key=True)
    employee_id = db.Column(db.Integer, db.ForeignKey('employees.id'), nullable=False)
    leave_type = db.Column(db.String(50), nullable=False)
    start_date = db.Column(db.String(30), nullable=False)
    end_date = db.Column(db.String(30), nullable=False)
    total_days = db.Column(db.Float, default=1.0)
    reason = db.Column(db.Text, nullable=True)
    status = db.Column(db.String(20), default='PENDING')
    requested_at = db.Column(db.DateTime, default=datetime.utcnow)


class AttendanceRecord(db.Model):
    __tablename__ = 'attendance_records'
    id = db.Column(db.Integer, primary_key=True)
    employee_id = db.Column(db.Integer, db.ForeignKey('employees.id'), nullable=False)
    log_date = db.Column(db.String(30), nullable=False)
    clock_in = db.Column(db.String(30), nullable=True)
    clock_out = db.Column(db.String(30), nullable=True)
    total_hours = db.Column(db.Float, default=0.0)
    status = db.Column(db.String(30), default='PRESENT')
    created_at = db.Column(db.DateTime, default=datetime.utcnow)


class Notification(db.Model):
    __tablename__ = 'notifications'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    title = db.Column(db.String(120), nullable=False)
    message = db.Column(db.Text, nullable=False)
    is_read = db.Column(db.Boolean, default=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)


class AuditLog(db.Model):
    __tablename__ = 'audit_logs'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=True)
    action = db.Column(db.String(120), nullable=False)
    entity_type = db.Column(db.String(80), nullable=False)
    entity_id = db.Column(db.Integer, nullable=True)
    details = db.Column(db.Text, nullable=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
