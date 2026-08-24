from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from werkzeug.security import generate_password_hash, check_password_hash
from app import db
from app.models import User

auth_bp = Blueprint('auth_bp', __name__)


def serialize_user(user):
    return {
        'id': user.id,
        'name': user.name,
        'email': user.email,
        'role': user.role,
        'roleLabel': user.role_label,
    }


@auth_bp.route('/health', methods=['GET'])
def health():
    return jsonify({'status': 'ok', 'message': 'HRMS backend is running'}), 200


@auth_bp.route('/auth/register', methods=['POST'])
def register():
    data = request.get_json(silent=True) or {}
    name = (data.get('name') or '').strip()
    email = (data.get('email') or '').strip().lower()
    password = data.get('password') or ''
    role = (data.get('role') or 'employee').lower()

    if not name or not email or not password:
        return jsonify({'message': 'Name, email and password are required.'}), 400

    if User.query.filter_by(email=email).first():
        return jsonify({'message': 'User already exists.'}), 409

    role_labels = {
        'admin': 'Administrator',
        'hr': 'HR Manager',
        'manager': 'Department Manager',
        'employee': 'Employee',
    }

    user = User(name=name, email=email, password_hash=generate_password_hash(password), role=role, role_label=role_labels.get(role, 'Employee'))
    db.session.add(user)
    db.session.commit()

    access_token = create_access_token(identity=str(user.id))
    return jsonify({'token': access_token, 'user': serialize_user(user)}), 201


@auth_bp.route('/auth/login', methods=['POST'])
def login():
    data = request.get_json(silent=True) or {}
    email = (data.get('email') or '').strip().lower()
    password = data.get('password') or ''

    user = User.query.filter_by(email=email).first()
    if not user or not check_password_hash(user.password_hash, password):
        return jsonify({'message': 'Invalid credentials.'}), 401

    access_token = create_access_token(identity=str(user.id))
    return jsonify({'token': access_token, 'user': serialize_user(user)}), 200


@auth_bp.route('/profile', methods=['GET'])
@jwt_required()
def profile():
    user_id = int(get_jwt_identity())
    user = User.query.get(user_id)
    if not user:
        return jsonify({'message': 'User not found.'}), 404
    return jsonify({'user': serialize_user(user)}), 200
