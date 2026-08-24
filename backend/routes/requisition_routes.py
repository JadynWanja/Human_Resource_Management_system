from flask import Blueprint, request, jsonify
from extensions import db
from models import HeadcountRequisition, Department, Employee
from schemas import requisitions_schema, requisition_schema
from utils.auth import token_required, role_required

requisition_bp = Blueprint('requisitions', __name__, url_prefix='/api/requisitions')

@requisition_bp.route('', methods=['GET'])
@token_required
def get_requisitions(current_user):
    reqs = HeadcountRequisition.query.order_by(HeadcountRequisition.created_at.desc()).all()
    return jsonify({'requisitions': requisitions_schema.dump(reqs)}), 200

@requisition_bp.route('', methods=['POST'])
@token_required
@role_required('ADMIN', 'MANAGER')
def create_requisition(current_user):
    data = request.get_json() or {}

    job_title = data.get('job_title')
    department_id = data.get('department_id')
    priority = data.get('priority', 'HIGH')
    justification = data.get('business_justification')

    if not job_title or not justification:
        return jsonify({'error': 'Job title and business justification are required'}), 400

    # Resolve manager ID from current_user employee profile if available
    manager_id = current_user.employee.id if current_user.employee else 'mgr-default-id'

    # Resolve department ID if name passed
    if not department_id and data.get('department_name'):
        dept = Department.query.filter_by(name=data['department_name']).first()
        if dept:
            department_id = dept.id

    if not department_id:
        dept = Department.query.first()
        department_id = dept.id if dept else None

    req = HeadcountRequisition(
        job_title=job_title,
        department_id=department_id,
        requested_by_manager_id=manager_id,
        priority=priority,
        business_justification=justification,
        status='PENDING_APPROVAL'
    )

    db.session.add(req)
    db.session.commit()

    return jsonify({
        'message': 'Headcount requisition submitted successfully',
        'requisition': requisition_schema.dump(req)
    }), 201
