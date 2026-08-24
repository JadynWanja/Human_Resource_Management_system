import uuid
from datetime import datetime, date
from extensions import db, bcrypt

def generate_uuid():
    return str(uuid.uuid4())

class User(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.String(36), primary_key=True, default=generate_uuid)
    email = db.Column(db.String(255), unique=True, nullable=False, index=True)
    password_hash = db.Column(db.String(255), nullable=False)
    role = db.Column(db.String(50), nullable=False, default='EMPLOYEE') # ADMIN, MANAGER, EMPLOYEE
    is_active = db.Column(db.Boolean, nullable=False, default=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    employee = db.relationship('Employee', backref='user', uselist=False, cascade='all, delete-orphan')

    def set_password(self, password):
        self.password_hash = bcrypt.generate_password_hash(password).decode('utf-8')

    def check_password(self, password):
        return bcrypt.check_password_hash(self.password_hash, password)


class Department(db.Model):
    __tablename__ = 'departments'

    id = db.Column(db.String(36), primary_key=True, default=generate_uuid)
    name = db.Column(db.String(100), unique=True, nullable=False)
    code = db.Column(db.String(20), unique=True, nullable=False)
    manager_id = db.Column(db.String(36), db.ForeignKey('employees.id', ondelete='SET NULL'), nullable=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    employees = db.relationship('Employee', foreign_keys='Employee.department_id', backref='department')


class Employee(db.Model):
    __tablename__ = 'employees'

    id = db.Column(db.String(36), primary_key=True, default=generate_uuid)
    user_id = db.Column(db.String(36), db.ForeignKey('users.id', ondelete='CASCADE'), unique=True, nullable=True)
    employee_code = db.Column(db.String(50), unique=True, nullable=False)
    first_name = db.Column(db.String(100), nullable=False)
    last_name = db.Column(db.String(100), nullable=False)
    job_title = db.Column(db.String(150), nullable=False)
    department_id = db.Column(db.String(36), db.ForeignKey('departments.id', ondelete='SET NULL'), nullable=True)
    manager_id = db.Column(db.String(36), db.ForeignKey('employees.id', ondelete='SET NULL'), nullable=True)
    status = db.Column(db.String(50), nullable=False, default='ACTIVE') # ACTIVE, ON_LEAVE, TERMINATED
    location = db.Column(db.String(50), nullable=False, default='OFFICE') # OFFICE, REMOTE, HYBRID
    email = db.Column(db.String(255), nullable=False)
    hire_date = db.Column(db.Date, nullable=False, default=date.today)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    direct_reports = db.relationship('Employee', backref=db.backref('manager', remote_side=[id]))
    attendance_logs = db.relationship('AttendanceLog', backref='employee', cascade='all, delete-orphan')
    leave_requests = db.relationship('LeaveRequest', backref='employee', cascade='all, delete-orphan')
    leave_balances = db.relationship('LeaveBalance', backref='employee', cascade='all, delete-orphan')
    timesheets = db.relationship('Timesheet', foreign_keys='Timesheet.employee_id', backref='employee', cascade='all, delete-orphan')

    @property
    def full_name(self):
        return f"{self.first_name} {self.last_name}"


class AttendanceLog(db.Model):
    __tablename__ = 'attendance_logs'

    id = db.Column(db.String(36), primary_key=True, default=generate_uuid)
    employee_id = db.Column(db.String(36), db.ForeignKey('employees.id', ondelete='CASCADE'), nullable=False)
    log_date = db.Column(db.Date, nullable=False, default=date.today)
    clock_in = db.Column(db.String(20), nullable=True)
    clock_out = db.Column(db.String(20), nullable=True)
    total_hours = db.Column(db.Float, default=0.0)
    status = db.Column(db.String(50), nullable=False, default='PRESENT') # PRESENT, REMOTE, ON_LEAVE, LATE


class LeaveType(db.Model):
    __tablename__ = 'leave_types'

    id = db.Column(db.String(36), primary_key=True, default=generate_uuid)
    name = db.Column(db.String(100), unique=True, nullable=False) # Annual Leave, Sick Leave, Casual Leave, Remote Work
    max_days_per_year = db.Column(db.Integer, nullable=False, default=15)
    requires_approval = db.Column(db.Boolean, default=True)


class LeaveBalance(db.Model):
    __tablename__ = 'leave_balances'

    id = db.Column(db.String(36), primary_key=True, default=generate_uuid)
    employee_id = db.Column(db.String(36), db.ForeignKey('employees.id', ondelete='CASCADE'), nullable=False)
    leave_type_id = db.Column(db.String(36), db.ForeignKey('leave_types.id', ondelete='CASCADE'), nullable=False)
    year = db.Column(db.Integer, nullable=False, default=2026)
    allocated_days = db.Column(db.Float, nullable=False, default=15.0)
    used_days = db.Column(db.Float, nullable=False, default=0.0)

    leave_type = db.relationship('LeaveType')

    @property
    def remaining_days(self):
        return self.allocated_days - self.used_days


class LeaveRequest(db.Model):
    __tablename__ = 'leave_requests'

    id = db.Column(db.String(36), primary_key=True, default=generate_uuid)
    employee_id = db.Column(db.String(36), db.ForeignKey('employees.id', ondelete='CASCADE'), nullable=False)
    leave_type_id = db.Column(db.String(36), db.ForeignKey('leave_types.id', ondelete='RESTRICT'), nullable=False)
    start_date = db.Column(db.Date, nullable=False)
    end_date = db.Column(db.Date, nullable=False)
    total_days = db.Column(db.Float, nullable=False)
    reason = db.Column(db.Text, nullable=False)
    status = db.Column(db.String(50), nullable=False, default='PENDING') # PENDING, APPROVED, REJECTED, CANCELLED
    requested_at = db.Column(db.DateTime, default=datetime.utcnow)

    leave_type = db.relationship('LeaveType')
    approval = db.relationship('LeaveApproval', backref='leave_request', uselist=False, cascade='all, delete-orphan')


class LeaveApproval(db.Model):
    __tablename__ = 'leave_approvals'

    id = db.Column(db.String(36), primary_key=True, default=generate_uuid)
    leave_request_id = db.Column(db.String(36), db.ForeignKey('leave_requests.id', ondelete='CASCADE'), unique=True, nullable=False)
    manager_id = db.Column(db.String(36), db.ForeignKey('employees.id', ondelete='CASCADE'), nullable=False)
    action = db.Column(db.String(50), nullable=False) # APPROVED, REJECTED
    manager_notes = db.Column(db.Text, nullable=True)
    action_timestamp = db.Column(db.DateTime, default=datetime.utcnow)


class Timesheet(db.Model):
    __tablename__ = 'timesheets'

    id = db.Column(db.String(36), primary_key=True, default=generate_uuid)
    employee_id = db.Column(db.String(36), db.ForeignKey('employees.id', ondelete='CASCADE'), nullable=False)
    week_number = db.Column(db.Integer, nullable=False)
    year = db.Column(db.Integer, nullable=False, default=2026)
    regular_hours = db.Column(db.Float, nullable=False, default=40.0)
    overtime_hours = db.Column(db.Float, nullable=False, default=0.0)
    status = db.Column(db.String(50), nullable=False, default='SUBMITTED') # SUBMITTED, APPROVED, REJECTED
    approved_by_manager_id = db.Column(db.String(36), db.ForeignKey('employees.id', ondelete='SET NULL'), nullable=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)


class HeadcountRequisition(db.Model):
    __tablename__ = 'headcount_requisitions'

    id = db.Column(db.String(36), primary_key=True, default=generate_uuid)
    department_id = db.Column(db.String(36), db.ForeignKey('departments.id', ondelete='CASCADE'), nullable=False)
    requested_by_manager_id = db.Column(db.String(36), db.ForeignKey('employees.id', ondelete='CASCADE'), nullable=False)
    job_title = db.Column(db.String(150), nullable=False)
    priority = db.Column(db.String(50), nullable=False, default='HIGH') # URGENT, HIGH, MEDIUM, LOW
    business_justification = db.Column(db.Text, nullable=False)
    status = db.Column(db.String(50), nullable=False, default='PENDING_APPROVAL')
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    department_rel = db.relationship('Department')
    manager_rel = db.relationship('Employee')


class PerformanceReview(db.Model):
    __tablename__ = 'performance_reviews'

    id = db.Column(db.String(36), primary_key=True, default=generate_uuid)
    employee_id = db.Column(db.String(36), db.ForeignKey('employees.id', ondelete='CASCADE'), nullable=False)
    reviewer_manager_id = db.Column(db.String(36), db.ForeignKey('employees.id', ondelete='CASCADE'), nullable=False)
    review_period = db.Column(db.String(50), nullable=False) # e.g. '2026-Q3'
    rating_score = db.Column(db.Float, nullable=False, default=4.5)
    feedback_notes = db.Column(db.Text, nullable=True)
    completed_at = db.Column(db.DateTime, default=datetime.utcnow)


class Notification(db.Model):
    __tablename__ = 'notifications'

    id = db.Column(db.String(36), primary_key=True, default=generate_uuid)
    recipient_employee_id = db.Column(db.String(36), db.ForeignKey('employees.id', ondelete='CASCADE'), nullable=False)
    title = db.Column(db.String(150), nullable=False)
    message = db.Column(db.Text, nullable=False)
    is_read = db.Column(db.Boolean, default=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)


class Announcement(db.Model):
    __tablename__ = 'announcements'

    id = db.Column(db.String(36), primary_key=True, default=generate_uuid)
    author_id = db.Column(db.String(36), db.ForeignKey('employees.id', ondelete='SET NULL'), nullable=True)
    title = db.Column(db.String(150), nullable=False)
    tag = db.Column(db.String(50), nullable=False, default='Company Wide')
    summary = db.Column(db.Text, nullable=False)
    published_at = db.Column(db.DateTime, default=datetime.utcnow)
