from flask import Blueprint, jsonify, request
from app import db
from app.models import Employee, User

employees_bp = Blueprint('employees_bp', __name__)


def serialize_employee(employee):
    return {
        'id': employee.id,
        'employeeCode': employee.employee_code,
        'firstName': employee.first_name,
        'lastName': employee.last_name,
        'name': f'{employee.first_name} {employee.last_name}',
        'email': employee.email,
        'jobTitle': employee.job_title,
        'status': employee.status,
        'location': employee.location,
        'hireDate': employee.hire_date,
    }


@employees_bp.route('/employees', methods=['GET'])
def get_employees():
    employees = Employee.query.order_by(Employee.id).all()
    return jsonify([serialize_employee(item) for item in employees]), 200


@employees_bp.route('/employees', methods=['POST'])
def create_employee():
    data = request.get_json(silent=True) or {}
    first_name = (data.get('firstName') or '').strip()
    last_name = (data.get('lastName') or '').strip()
    email = (data.get('email') or '').strip().lower()
    job_title = (data.get('jobTitle') or '').strip()
    department_id = data.get('departmentId')

    if not first_name or not last_name or not email or not job_title or not department_id:
        return jsonify({'message': 'Employee details are incomplete.'}), 400

    employee = Employee(
        user_id=data.get('userId', 1),
        employee_code=data.get('employeeCode', f'EMP-{Employee.query.count() + 1:04d}'),
        first_name=first_name,
        last_name=last_name,
        email=email,
        job_title=job_title,
        department_id=department_id,
        manager_id=data.get('managerId'),
        status=data.get('status', 'ACTIVE'),
        location=data.get('location', 'OFFICE'),
        hire_date=data.get('hireDate', '2026-01-01')
    )
    db.session.add(employee)
    db.session.commit()
    return jsonify(serialize_employee(employee)), 201
