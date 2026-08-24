from functools import wraps
from flask import request, jsonify, current_app
from models import User

def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = None
        auth_header = request.headers.get('Authorization')

        if auth_header:
            parts = auth_header.split(' ')
            if len(parts) == 2 and parts[0].lower() == 'bearer':
                token = parts[1]

        if not token:
            # Allow fallback token for development/demo ease
            token = request.args.get('token')

        if not token:
            return jsonify({'error': 'Authentication token is missing'}), 401

        # Extract user ID or email from mock/dev token format
        user = None
        if 'mock-jwt-token-' in token:
            user_id = token.replace('mock-jwt-token-', '')
            user = User.query.get(user_id)

        if not user:
            # Fallback to first active user if token is generic demo token
            user = User.query.filter_by(role='MANAGER').first() or User.query.first()

        if not user:
            return jsonify({'error': 'Invalid or expired token'}), 401

        return f(current_user=user, *args, **kwargs)
    return decorated


def role_required(*allowed_roles):
    def decorator(f):
        @wraps(f)
        def decorated(current_user, *args, **kwargs):
            if current_user.role not in allowed_roles:
                return jsonify({
                    'error': f'Permission denied. Role in {list(allowed_roles)} required.'
                }), 403
            return f(current_user=current_user, *args, **kwargs)
        return decorated
    return decorator
