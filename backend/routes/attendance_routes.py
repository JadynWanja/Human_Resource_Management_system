from flask import Blueprint, request, jsonify
from datetime import date, datetime
from extensions import db
from models import AttendanceLog, Employee
from schemas import attendances_schema, attendance_schema

attendance_bp = Blueprint('attendance', __name__, url_prefix='/api/attendance')

@attendance_bp.route('', methods=['GET'])
def get_attendance_logs():
    log_date_str = request.args.get('date')
    if log_date_str:
        try:
            log_date = datetime.strptime(log_date_str, '%Y-%m-%d').date()
        except ValueError:
            log_date = date.today()
    else:
        log_date = date.today()

    logs = AttendanceLog.query.filter_by(log_date=log_date).all()
    return jsonify({
        'date': log_date.isoformat(),
        'attendance_logs': attendances_schema.dump(logs)
    }), 200

@attendance_bp.route('/clock-in', methods=['POST'])
def clock_in():
    data = request.get_json() or {}
    employee_id = data.get('employee_id')

    if not employee_id:
        return jsonify({'error': 'employee_id is required'}), 400

    employee = Employee.query.get(employee_id)
    if not employee:
        return jsonify({'error': 'Employee not found'}), 404

    today = date.today()
    log = AttendanceLog.query.filter_by(employee_id=employee_id, log_date=today).first()

    now_str = datetime.now().strftime('%I:%M %p')

    if not log:
        log = AttendanceLog(
            employee_id=employee_id,
            log_date=today,
            clock_in=now_str,
            status='PRESENT'
        )
        db.session.add(log)
    else:
        log.clock_in = now_str
        log.status = 'PRESENT'

    db.session.commit()

    return jsonify({
        'message': f'Clocked in successfully at {now_str}',
        'attendance_log': attendance_schema.dump(log)
    }), 200

@attendance_bp.route('/clock-out', methods=['POST'])
def clock_out():
    data = request.get_json() or {}
    employee_id = data.get('employee_id')

    if not employee_id:
        return jsonify({'error': 'employee_id is required'}), 400

    today = date.today()
    log = AttendanceLog.query.filter_by(employee_id=employee_id, log_date=today).first()

    if not log:
        return jsonify({'error': 'No clock-in record found for today'}), 404

    now_str = datetime.now().strftime('%I:%M %p')
    log.clock_out = now_str
    log.total_hours = 8.0 # Standard 8 hours for log

    db.session.commit()

    return jsonify({
        'message': f'Clocked out successfully at {now_str}',
        'attendance_log': attendance_schema.dump(log)
    }), 200
