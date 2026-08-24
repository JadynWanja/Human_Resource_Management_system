from flask import Blueprint, request, jsonify
from extensions import db
from models import Employee, User
from schemas import employee_schema, employees_schema

employee_bp = Blueprint('employees', __name__, url_prefix='/api/employees')

@employee_bp.route('', methods=['GET'])
def get_employees():
    page = request.args.get('page', 1, type=int)
    per_page = request.args.get('per_page', 10, type=int)
    search = request.args.get('search', '', type=str)
    status = request.args.get('status', '', type=str)
    department_id = request.args.get('department_id', '', type=str)

    query = Employee.query

    if search:
        search_filter = f"%{search}%"
        query = query.filter(
            (Employee.first_name.ilike(search_filter)) |
            (Employee.last_name.ilike(search_filter)) |
            (Employee.job_title.ilike(search_filter)) |
            (Employee.email.ilike(search_filter))
        )

    if status and status != 'all':
        query = query.filter_by(status=status)

    if department_id:
        query = query.filter_by(department_id=department_id)

    pagination = query.order_by(Employee.first_name.asc()).paginate(
        page=page, per_page=per_page, error_out=False
    )

    return jsonify({
        'employees': employees_schema.dump(pagination.items),
        'total': pagination.total,
        'page': pagination.page,
        'per_page': pagination.per_page,
        'pages': pagination.pages
    }), 200

@employee_bp.route('/<string:employee_id>', methods=['GET'])
def get_employee(employee_id):
    employee = Employee.query.get(employee_id)
    if not employee:
        return jsonify({'error': 'Employee not found'}), 404
    return jsonify({'employee': employee_schema.dump(employee)}), 200

@employee_bp.route('', methods=['POST'])
def create_employee():
    data = request.get_json() or {}
    
    if not data.get('first_name') or not data.get('last_name') or not data.get('email') or not data.get('job_title'):
        return jsonify({'error': 'First name, last name, email, and job title are required'}), 400

    employee_code = data.get('employee_code', f"EMP-{Employee.query.count() + 101}")

    employee = Employee(
        employee_code=employee_code,
        first_name=data['first_name'],
        last_name=data['last_name'],
        job_title=data['job_title'],
        department_id=data.get('department_id'),
        manager_id=data.get('manager_id'),
        status=data.get('status', 'ACTIVE'),
        location=data.get('location', 'OFFICE'),
        email=data['email']
    )

    db.session.add(employee)
    db.session.commit()

    return jsonify({
        'message': 'Employee created successfully',
        'employee': employee_schema.dump(employee)
    }), 201

@employee_bp.route('/<string:employee_id>', methods=['PUT'])
def update_employee(employee_id):
    employee = Employee.query.get(employee_id)
    if not employee:
        return jsonify({'error': 'Employee not found'}), 404

    data = request.get_json() or {}
    employee.first_name = data.get('first_name', employee.first_name)
    employee.last_name = data.get('last_name', employee.last_name)
    employee.job_title = data.get('job_title', employee.job_title)
    employee.department_id = data.get('department_id', employee.department_id)
    employee.manager_id = data.get('manager_id', employee.manager_id)
    employee.status = data.get('status', employee.status)
    employee.location = data.get('location', employee.location)
    employee.email = data.get('email', employee.email)

    db.session.commit()

    return jsonify({
        'message': 'Employee updated successfully',
        'employee': employee_schema.dump(employee)
    }), 200

@employee_bp.route('/<string:employee_id>', methods=['DELETE'])
def delete_employee(employee_id):
    employee = Employee.query.get(employee_id)
    if not employee:
        return jsonify({'error': 'Employee not found'}), 404

    db.session.delete(employee)
    db.session.commit()

    return jsonify({'message': 'Employee deleted successfully'}), 200
