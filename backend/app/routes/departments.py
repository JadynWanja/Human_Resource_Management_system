from flask import Blueprint, jsonify
from app.models import Department

departments_bp = Blueprint('departments_bp', __name__)


@departments_bp.route('/departments', methods=['GET'])
def get_departments():
    rows = Department.query.order_by(Department.name).all()
    data = [
        {'id': item.id, 'name': item.name, 'code': item.code, 'managerName': item.manager_name}
        for item in rows
    ]
    return jsonify(data), 200
