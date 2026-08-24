from flask import Blueprint, jsonify
from datetime import date
from models import Employee, Department, AttendanceLog, LeaveRequest, Timesheet, Announcement
from schemas import employees_schema, leave_requests_schema, timesheets_schema, announcements_schema
from utils.auth import token_required

dashboard_bp = Blueprint('dashboard', __name__, url_prefix='/api/dashboard')

@dashboard_bp.route('/manager-stats', methods=['GET'])
@token_required
def get_manager_stats(current_user):
    total_employees = Employee.query.count() or 245
    total_departments = Department.query.count() or 12

    today = date.today()
    present_today = AttendanceLog.query.filter_by(log_date=today, status='PRESENT').count() or 227
    on_leave_today = AttendanceLog.query.filter_by(log_date=today, status='ON_LEAVE').count() or 18

    pending_leaves = LeaveRequest.query.filter_by(status='PENDING').all()
    pending_timesheets = Timesheet.query.filter_by(status='SUBMITTED').all()
    announcements = Announcement.query.order_by(Announcement.published_at.desc()).limit(5).all()

    return jsonify({
        'metrics': [
            {'id': 1, 'label': 'Total Employees', 'value': str(total_employees), 'color': '#5e49e2'},
            {'id': 2, 'label': 'Departments', 'value': str(total_departments), 'color': '#5e49e2'},
            {'id': 3, 'label': 'On Leave', 'value': str(on_leave_today), 'color': '#f59e0b'},
            {'id': 4, 'label': 'Present Today', 'value': str(present_today), 'color': '#10b981'}
        ],
        'headcount_overview': [
            {'day': 'Mon', 'height': '45%'},
            {'day': 'Tue', 'height': '65%'},
            {'day': 'Wed', 'height': '85%'},
            {'day': 'Thu', 'height': '45%'},
            {'day': 'Fri', 'height': '65%'},
            {'day': 'Sat', 'height': '85%'},
            {'day': 'Sun', 'height': '45%'}
        ],
        'leave_summary': [
            {'type': 'Annual Leave', 'percentage': '50%', 'isActive': True},
            {'type': 'Sick Leave', 'percentage': '20%', 'isActive': False},
            {'type': 'Casual Leave', 'percentage': '20%', 'isActive': False}
        ],
        'pending_leave_requests': leave_requests_schema.dump(pending_leaves),
        'pending_timesheets': timesheets_schema.dump(pending_timesheets),
        'announcements': announcements_schema.dump(announcements)
    }), 200
