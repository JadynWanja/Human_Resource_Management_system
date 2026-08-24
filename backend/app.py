import os
from flask import Flask, jsonify
from config import DevelopmentConfig, TestingConfig, ProductionConfig
from extensions import db, ma, migrate, bcrypt, cors

from routes.auth_routes import auth_bp
from routes.employee_routes import employee_bp
from routes.department_routes import department_bp
from routes.attendance_routes import attendance_bp
from routes.leave_routes import leave_bp
from routes.timesheet_routes import timesheet_bp
from routes.requisition_routes import requisition_bp
from routes.dashboard_routes import dashboard_bp

def create_app(config_name=None):
    if config_name is None:
        config_name = os.getenv('FLASK_ENV', 'development')

    app = Flask(__name__)

    if config_name == 'testing':
        app.config.from_object(TestingConfig)
    elif config_name == 'production':
        app.config.from_object(ProductionConfig)
    else:
        app.config.from_object(DevelopmentConfig)

    # Initialize Extensions
    db.init_app(app)
    ma.init_app(app)
    migrate.init_app(app, db)
    bcrypt.init_app(app)
    cors.init_app(app, resources={r"/api/*": {"origins": "*"}})

    # Register Blueprints
    app.register_blueprint(auth_bp)
    app.register_blueprint(employee_bp)
    app.register_blueprint(department_bp)
    app.register_blueprint(attendance_bp)
    app.register_blueprint(leave_bp)
    app.register_blueprint(timesheet_bp)
    app.register_blueprint(requisition_bp)
    app.register_blueprint(dashboard_bp)

    # Global Error Handlers
    @app.errorhandler(404)
    def not_found_error(error):
        return jsonify({'error': 'Resource not found'}), 404

    @app.errorhandler(500)
    def internal_error(error):
        db.session.rollback()
        return jsonify({'error': 'Internal server error'}), 500

    @app.cli.command('seed')
    def seed_cmd():
        from seed import seed_database
        seed_database()

    return app

if __name__ == '__main__':
    app = create_app()
    app.run(host='0.0.0.0', port=5000, debug=True)
