from flask import Blueprint, request, jsonify
from extensions import db
from models import Timesheet
from schemas import timesheets_schema, timesheet_schema

timesheet_bp = Blueprint('timesheets', __name__, url_prefix='/api/timesheets')

@timesheet_bp.route('', methods=['GET'])
def get_timesheets():
    status = request.args.get('status', '', type=str)
    week_number = request.args.get('week', 34, type=int)

    query = Timesheet.query.filter_by(week_number=week_number)
    if status:
        query = query.filter_by(status=status.upper())

    timesheets_list = query.all()
    return jsonify({'timesheets': timesheets_schema.dump(timesheets_list)}), 200

@timesheet_bp.route('/<string:timesheet_id>/approve', methods=['POST'])
def approve_timesheet(timesheet_id):
    timesheet = Timesheet.query.get(timesheet_id)
    if not timesheet:
        return jsonify({'error': 'Timesheet record not found'}), 404

    data = request.get_json() or {}
    manager_id = data.get('manager_id', 'mgr-default-id')

    timesheet.status = 'APPROVED'
    timesheet.approved_by_manager_id = manager_id
    db.session.commit()

    return jsonify({
        'message': 'Timesheet approved successfully',
        'timesheet': timesheet_schema.dump(timesheet)
    }), 200

@timesheet_bp.route('/bulk-approve', methods=['POST'])
def bulk_approve_timesheets():
    data = request.get_json() or {}
    manager_id = data.get('manager_id', 'mgr-default-id')
    week_number = data.get('week_number', 34)

    timesheets = Timesheet.query.filter_by(week_number=week_number, status='SUBMITTED').all()
    for ts in timesheets:
        ts.status = 'APPROVED'
        ts.approved_by_manager_id = manager_id

    db.session.commit()

    return jsonify({
        'message': f'Successfully approved {len(timesheets)} timesheets for week {week_number}',
        'count': len(timesheets)
    }), 200
