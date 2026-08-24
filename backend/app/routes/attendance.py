from flask import Blueprint, jsonify, request
from app import db
from app.models import AttendanceRecord

attendance_bp = Blueprint('attendance_bp', __name__)


@attendance_bp.route('/attendance', methods=['GET'])
def get_attendance():
    rows = AttendanceRecord.query.order_by(AttendanceRecord.log_date.desc()).all()
    payload = [{
        'id': item.id,
        'employeeId': item.employee_id,
        'logDate': item.log_date,
        'clockIn': item.clock_in,
        'clockOut': item.clock_out,
        'totalHours': item.total_hours,
        'status': item.status,
    } for item in rows]
    return jsonify(payload), 200


@attendance_bp.route('/attendance', methods=['POST'])
def create_attendance():
    data = request.get_json(silent=True) or {}
    employee_id = data.get('employeeId')
    log_date = data.get('logDate')
    if not employee_id or not log_date:
        return jsonify({'message': 'Attendance details are incomplete.'}), 400

    record = AttendanceRecord(
        employee_id=employee_id,
        log_date=log_date,
        clock_in=data.get('clockIn', '08:30'),
        clock_out=data.get('clockOut', '17:00'),
        total_hours=data.get('totalHours', 8.5),
        status=data.get('status', 'PRESENT'),
    )
    db.session.add(record)
    db.session.commit()
    return jsonify({'message': 'Attendance logged', 'id': record.id}), 201
