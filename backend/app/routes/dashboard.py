from flask import Blueprint, jsonify


dashboard_bp = Blueprint('dashboard_bp', __name__)


@dashboard_bp.route('/dashboard', methods=['GET'])
def dashboard():
    payload = {
        'overview': {
            'totalEmployees': 2480,
            'openRoles': 34,
            'payrollThisMonth': 482000,
            'attendanceRate': 94.8,
        },
        'modules': [
            {'title': 'Employees', 'detail': '2,480 active staff', 'tone': 'indigo'},
            {'title': 'Payroll', 'detail': '$482K this month', 'tone': 'green'},
            {'title': 'Attendance', 'detail': '94.8% on-time', 'tone': 'blue'},
            {'title': 'Reports', 'detail': '28 generated this week', 'tone': 'orange'},
            {'title': 'Settings', 'detail': 'Policies and access', 'tone': 'purple'},
            {'title': 'Performance', 'detail': 'Team engagement tracking', 'tone': 'teal'},
        ],
        'approvals': [
            {'name': 'Anika Morris', 'team': 'Design', 'action': 'Leave request', 'status': 'Pending'},
            {'name': 'Daniel Cruz', 'team': 'Operations', 'action': 'Expense claim', 'status': 'Approved'},
            {'name': 'Priya Shah', 'team': 'Engineering', 'action': 'Recruitment', 'status': 'Review'},
        ],
        'teamMembers': [
            {'name': 'Milo Turner', 'role': 'Head of People', 'initial': 'MT'},
            {'name': 'Keisha Reed', 'role': 'HR Business Partner', 'initial': 'KR'},
            {'name': 'Lucas Moore', 'role': 'Finance Lead', 'initial': 'LM'},
            {'name': 'Noah Patel', 'role': 'Talent Specialist', 'initial': 'NP'},
        ],
        'schedule': [
            {'day': 'Mon', 'title': 'Leadership sync', 'time': '9:00 AM'},
            {'day': 'Tue', 'title': 'Recruitment review', 'time': '11:30 AM'},
            {'day': 'Wed', 'title': 'Benefits brief', 'time': '2:00 PM'},
            {'day': 'Thu', 'title': 'Payroll audit', 'time': '4:15 PM'},
        ],
    }
    return jsonify(payload), 200
