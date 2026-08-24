from flask import Blueprint, request, jsonify
from datetime import datetime, date
from extensions import db
from models import LeaveRequest, LeaveApproval, LeaveType, LeaveBalance, Employee
from schemas import (
    leave_requests_schema, leave_request_schema,
    leave_types_schema, leave_balances_schema, leave_approval_schema
)

leave_bp = Blueprint('leaves', __name__, url_prefix='/api')

@leave_bp.route('/leave-requests', methods=['GET'])
def get_leave_requests():
    status = request.args.get('status', '', type=str)
    employee_id = request.args.get('employee_id', '', type=str)

    query = LeaveRequest.query

    if status and status != 'all':
        query = query.filter_by(status=status.upper())

    if employee_id:
        query = query.filter_by(employee_id=employee_id)

    requests_list = query.order_by(LeaveRequest.requested_at.desc()).all()
    return jsonify({'leave_requests': leave_requests_schema.dump(requests_list)}), 200

@leave_bp.route('/leave-requests', methods=['POST'])
def create_leave_request():
    data = request.get_json() or {}

    employee_id = data.get('employee_id')
    leave_type_id = data.get('leave_type_id')
    start_date_str = data.get('start_date')
    end_date_str = data.get('end_date')
    reason = data.get('reason')

    if not all([employee_id, leave_type_id, start_date_str, end_date_str, reason]):
        return jsonify({'error': 'employee_id, leave_type_id, start_date, end_date, and reason are required'}), 400

    try:
        start_date = datetime.strptime(start_date_str, '%Y-%m-%d').date()
        end_date = datetime.strptime(end_date_str, '%Y-%m-%d').date()
    except ValueError:
        return jsonify({'error': 'Dates must be formatted YYYY-MM-DD'}), 400

    total_days = max(1, (end_date - start_date).days + 1)

    req = LeaveRequest(
        employee_id=employee_id,
        leave_type_id=leave_type_id,
        start_date=start_date,
        end_date=end_date,
        total_days=total_days,
        reason=reason,
        status='PENDING'
    )

    db.session.add(req)
    db.session.commit()

    return jsonify({
        'message': 'Leave request submitted successfully',
        'leave_request': leave_request_schema.dump(req)
    }), 201

@leave_bp.route('/leave-requests/<string:request_id>/approve', methods=['POST'])
def approve_leave_request(request_id):
    req = LeaveRequest.query.get(request_id)
    if not req:
        return jsonify({'error': 'Leave request not found'}), 404

    data = request.get_json() or {}
    manager_id = data.get('manager_id', 'mgr-default-id')
    manager_notes = data.get('notes', 'Approved by manager')

    req.status = 'APPROVED'

    # Create Approval Record
    approval = LeaveApproval(
        leave_request_id=req.id,
        manager_id=manager_id,
        action='APPROVED',
        manager_notes=manager_notes
    )
    db.session.add(approval)

    # Update Employee Leave Balance if balance exists
    balance = LeaveBalance.query.filter_by(
        employee_id=req.employee_id,
        leave_type_id=req.leave_type_id
    ).first()

    if balance:
        balance.used_days += req.total_days

    db.session.commit()

    return jsonify({
        'message': 'Leave request approved successfully',
        'leave_request': leave_request_schema.dump(req)
    }), 200

@leave_bp.route('/leave-requests/<string:request_id>/reject', methods=['POST'])
def reject_leave_request(request_id):
    req = LeaveRequest.query.get(request_id)
    if not req:
        return jsonify({'error': 'Leave request not found'}), 404

    data = request.get_json() or {}
    manager_id = data.get('manager_id', 'mgr-default-id')
    manager_notes = data.get('notes', 'Declined due to sprint schedule')

    req.status = 'REJECTED'

    approval = LeaveApproval(
        leave_request_id=req.id,
        manager_id=manager_id,
        action='REJECTED',
        manager_notes=manager_notes
    )
    db.session.add(approval)
    db.session.commit()

    return jsonify({
        'message': 'Leave request declined',
        'leave_request': leave_request_schema.dump(req)
    }), 200

@leave_bp.route('/leave-types', methods=['GET'])
def get_leave_types():
    types_list = LeaveType.query.all()
    return jsonify({'leave_types': leave_types_schema.dump(types_list)}), 200

@leave_bp.route('/leave-balances', methods=['GET'])
def get_leave_balances():
    employee_id = request.args.get('employee_id')
    if employee_id:
        balances = LeaveBalance.query.filter_by(employee_id=employee_id).all()
    else:
        balances = LeaveBalance.query.all()
    return jsonify({'leave_balances': leave_balances_schema.dump(balances)}), 200
