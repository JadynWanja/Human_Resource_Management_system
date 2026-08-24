from flask import Blueprint, jsonify
from app.models import Notification

notifications_bp = Blueprint('notifications_bp', __name__)


@notifications_bp.route('/notifications', methods=['GET'])
def get_notifications():
    items = Notification.query.order_by(Notification.created_at.desc()).all()
    payload = [{
        'id': item.id,
        'title': item.title,
        'message': item.message,
        'isRead': item.is_read,
        'createdAt': item.created_at.isoformat() if item.created_at else None,
    } for item in items]
    return jsonify(payload), 200
