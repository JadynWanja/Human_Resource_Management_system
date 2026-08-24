from flask import Blueprint, request, jsonify
from extensions import db
from models import Department
from schemas import departments_schema, department_schema

department_bp = Blueprint('departments', __name__, url_prefix='/api/departments')

@department_bp.route('', methods=['GET'])
def get_departments():
    departments = Department.query.order_by(Department.name.asc()).all()
    return jsonify({'departments': departments_schema.dump(departments)}), 200

@department_bp.route('', methods=['POST'])
def create_department():
    data = request.get_json() or {}
    if not data.get('name') or not data.get('code'):
        return jsonify({'error': 'Department name and code are required'}), 400

    dept = Department(
        name=data['name'],
        code=data['code'],
        manager_id=data.get('manager_id')
    )

    db.session.add(dept)
    db.session.commit()

    return jsonify({
        'message': 'Department created successfully',
        'department': department_schema.dump(dept)
    }), 201
