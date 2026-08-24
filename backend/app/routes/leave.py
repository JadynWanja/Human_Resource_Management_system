from flask import Blueprint, jsonify, request
from app import db
from app.models import LeaveRequest

leave_bp = Blueprint('leave_bp', __name__)


@leave_bp.route('/leave-requests', methods=['GET'])
def get_leave_requests():
    rows = LeaveRequest.query.order_by(LeaveRequest.requested_at.desc()).all()
    data = [{
        'id': item.id,
        'employeeId': item.employee_id,
        'leaveType': item.leave_type,
        'startDate': item.start_date,
        'endDate': item.end_date,
        'totalDays': item.total_days,
        'reason': item.reason,
        'status': item.status,
    } for item in rows]
    return jsonify(data), 200


@leave_bp.route('/leave-requests', methods=['POST'])
def create_leave_request():
    data = request.get_json(silent=True) or {}
    employee_id = data.get('employeeId')
    leave_type = (data.get('leaveType') or '').strip()
    start_date = data.get('startDate')
    end_date = data.get('endDate')

    if not employee_id or not leave_type or not start_date or not end_date:
        return jsonify({'message': 'Please complete the leave request form.'}), 400

    total_days = (data.get('totalDays') or 1)
    req = LeaveRequest(
        employee_id=employee_id,
        leave_type=leave_type,
        start_date=start_date,
        end_date=end_date,
        total_days=total_days,
        reason=data.get('reason', ''),
        status='PENDING',
    )
    db.session.add(req)
    db.session.commit()
    return jsonify({'message': 'Leave request submitted', 'id': req.id}), 201


@leave_bp.route('/leave-requests/<int:request_id>/status', methods=['PATCH'])
def update_leave_status(request_id):
    data = request.get_json(silent=True) or {}
    status = (data.get('status') or '').upper()
    req = LeaveRequest.query.get_or_404(request_id)
    req.status = status
    db.session.commit()
    return jsonify({'message': 'Leave request updated', 'status': req.status}), 200
