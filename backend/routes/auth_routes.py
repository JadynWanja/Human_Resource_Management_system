# from flask import Blueprint, request, jsonify
# from extensions import db
# from models import User, Employee
# from schemas import user_schema, employee_schema

# auth_bp = Blueprint('auth', __name__, url_prefix='/api/auth')

# @auth_bp.route('/login', methods=['POST'])
# def login():
#     data = request.get_json() or {}
#     email = data.get('email')
#     password = data.get('password')

#     if not email or not password:
#         return jsonify({'error': 'Email and password are required'}), 400

#     user = User.query.filter_by(email=email).first()
#     if not user or not user.check_password(password):
#         return jsonify({'error': 'Invalid email or password'}), 401

#     if not user.is_active:
#         return jsonify({'error': 'User account is deactivated'}), 403

#     user_data = user_schema.dump(user)
#     employee_data = employee_schema.dump(user.employee) if user.employee else None

#     return jsonify({
#         'message': 'Login successful',
#         'token': f'mock-jwt-token-{user.id}',
#         'user': user_data,
#         'employee': employee_data
#     }), 200

# @auth_bp.route('/me', methods=['GET'])
# def get_current_user():
#     # Return first active manager as default current user for presentation
#     user = User.query.filter_by(role='MANAGER').first() or User.query.first()
#     if not user:
#         return jsonify({'error': 'No active user found'}), 404

#     user_data = user_schema.dump(user)
#     employee_data = employee_schema.dump(user.employee) if user.employee else None

#     return jsonify({
#         'user': user_data,
#         'employee': employee_data
#     }), 200
