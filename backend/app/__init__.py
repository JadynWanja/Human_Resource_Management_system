import os
from flask import Flask
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from flask_sqlalchemy import SQLAlchemy
from dotenv import load_dotenv

load_dotenv(os.path.join(os.path.dirname(os.path.dirname(__file__)), '.env'))

db = SQLAlchemy()


def create_app():
    app = Flask(__name__)
    app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL', 'sqlite:///hrms.db')
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.config['JWT_SECRET_KEY'] = os.getenv('JWT_SECRET_KEY', 'hrms-secret-key-2026')
    app.config['JSON_SORT_KEYS'] = False

    db.init_app(app)
    JWTManager(app)
    CORS(app, resources={r"/api/*": {"origins": "*"}})

    from app.models import Department, Employee, LeaveRequest, AttendanceRecord, Notification, User
    from app.routes.auth import auth_bp
    from app.routes.dashboard import dashboard_bp
    from app.routes.employees import employees_bp
    from app.routes.departments import departments_bp
    from app.routes.leave import leave_bp
    from app.routes.attendance import attendance_bp
    from app.routes.notifications import notifications_bp

    app.register_blueprint(auth_bp, url_prefix='/api')
    app.register_blueprint(dashboard_bp, url_prefix='/api')
    app.register_blueprint(employees_bp, url_prefix='/api')
    app.register_blueprint(departments_bp, url_prefix='/api')
    app.register_blueprint(leave_bp, url_prefix='/api')
    app.register_blueprint(attendance_bp, url_prefix='/api')
    app.register_blueprint(notifications_bp, url_prefix='/api')

    with app.app_context():
        db.create_all()
        seed_data()

    return app


def seed_data():
    from app.models import User, Department, Employee, LeaveRequest, AttendanceRecord, Notification
    from werkzeug.security import generate_password_hash

    if User.query.first() is not None:
        return

    departments = [
        Department(name='Human Resources', code='HR', manager_name='Aisha Noor'),
        Department(name='Operations', code='OPS', manager_name='Daniel Cruz'),
        Department(name='Engineering', code='ENG', manager_name='Priya Shah'),
        Department(name='Finance', code='FIN', manager_name='Michael Brandt'),
    ]
    for dept in departments:
        db.session.add(dept)
    db.session.flush()

    users = [
        User(name='Alex Lee', email='alex.lee@harborone.com', password_hash=generate_password_hash('admin123'), role='admin', role_label='Administrator'),
        User(name='Aisha Noor', email='aisha.noor@harborone.com', password_hash=generate_password_hash('hr123'), role='hr', role_label='HR Manager'),
        User(name='Priya Shah', email='priya.shah@harborone.com', password_hash=generate_password_hash('manager123'), role='manager', role_label='Department Manager'),
        User(name='Daniel Cruz', email='daniel.cruz@harborone.com', password_hash=generate_password_hash('employee123'), role='employee', role_label='Employee'),
    ]
    for user in users:
        db.session.add(user)
    db.session.flush()

    employees = [
        Employee(user_id=users[0].id, employee_code='HR-001', first_name='Alex', last_name='Lee', email='alex.lee@harborone.com', job_title='System Administrator', department_id=departments[0].id, manager_id=None, status='ACTIVE', location='HYBRID', hire_date='2022-01-10'),
        Employee(user_id=users[1].id, employee_code='HR-002', first_name='Aisha', last_name='Noor', email='aisha.noor@harborone.com', job_title='HR Manager', department_id=departments[0].id, manager_id=None, status='ACTIVE', location='OFFICE', hire_date='2021-04-18'),
        Employee(user_id=users[2].id, employee_code='ENG-010', first_name='Priya', last_name='Shah', email='priya.shah@harborone.com', job_title='Engineering Manager', department_id=departments[2].id, manager_id=None, status='ACTIVE', location='REMOTE', hire_date='2020-11-23'),
        Employee(user_id=users[3].id, employee_code='OPS-004', first_name='Daniel', last_name='Cruz', email='daniel.cruz@harborone.com', job_title='Operations Analyst', department_id=departments[1].id, manager_id=users[2].id, status='ACTIVE', location='HYBRID', hire_date='2023-03-12'),
    ]
    for emp in employees:
        db.session.add(emp)
    db.session.flush()

    leave_requests = [
        LeaveRequest(employee_id=employees[3].id, leave_type='Annual', start_date='2026-09-02', end_date='2026-09-04', total_days=3, reason='Family vacation', status='PENDING'),
        LeaveRequest(employee_id=employees[2].id, leave_type='Sick', start_date='2026-09-06', end_date='2026-09-07', total_days=2, reason='Recovery', status='APPROVED'),
    ]
    for req in leave_requests:
        db.session.add(req)

    attendance = [
        AttendanceRecord(employee_id=employees[0].id, log_date='2026-08-24', clock_in='08:30', clock_out='17:15', total_hours=8.75, status='PRESENT'),
        AttendanceRecord(employee_id=employees[3].id, log_date='2026-08-24', clock_in='08:50', clock_out='17:00', total_hours=8.17, status='PRESENT'),
        AttendanceRecord(employee_id=employees[1].id, log_date='2026-08-24', clock_in='09:00', clock_out='17:30', total_hours=8.5, status='REMOTE'),
    ]
    for record in attendance:
        db.session.add(record)

    notifications = [
        Notification(user_id=users[3].id, title='Leave request submitted', message='Your annual leave request is awaiting manager review.', is_read=False),
        Notification(user_id=users[0].id, title='New approval request', message='Two leave requests require your attention.', is_read=False),
    ]
    for notif in notifications:
        db.session.add(notif)

    db.session.commit()
