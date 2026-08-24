import pytest
from datetime import date
from app import create_app
from extensions import db
from models import User, Employee, Department, LeaveType, LeaveRequest, Timesheet

@pytest.fixture
def app():
    app = create_app('testing')

    with app.app_context():
        db.create_all()

        # Seed test data
        dept = Department(name='Engineering', code='ENG')
        db.session.add(dept)

        user = User(email='test.manager@company.com', role='MANAGER')
        user.set_password('password123')
        db.session.add(user)
        db.session.commit()

        emp = Employee(
            user_id=user.id,
            employee_code='EMP-TEST-1',
            first_name='Test',
            last_name='Manager',
            job_title='Tech Lead',
            department_id=dept.id,
            email='test.manager@company.com'
        )
        db.session.add(emp)

        leave_type = LeaveType(name='Annual Leave', max_days_per_year=20)
        db.session.add(leave_type)
        db.session.commit()

        leave_req = LeaveRequest(
            employee_id=emp.id,
            leave_type_id=leave_type.id,
            start_date=date(2026, 8, 24),
            end_date=date(2026, 8, 28),
            total_days=5.0,
            reason='Vacation',
            status='PENDING'
        )
        db.session.add(leave_req)

        timesheet = Timesheet(
            employee_id=emp.id,
            week_number=34,
            year=2026,
            regular_hours=40.0,
            overtime_hours=2.0,
            status='SUBMITTED'
        )
        db.session.add(timesheet)
        db.session.commit()

        yield app

        db.session.remove()
        db.drop_all()

@pytest.fixture
def client(app):
    return app.test_client()

def test_login_success(client):
    res = client.post('/api/auth/login', json={
        'email': 'test.manager@company.com',
        'password': 'password123'
    })
    assert res.status_code == 200
    data = res.get_json()
    assert 'token' in data
    assert data['user']['email'] == 'test.manager@company.com'

def test_login_failure(client):
    res = client.post('/api/auth/login', json={
        'email': 'test.manager@company.com',
        'password': 'wrongpassword'
    })
    assert res.status_code == 401
    assert 'error' in res.get_json()

def test_get_employees_pagination(client):
    res = client.get('/api/employees?page=1&per_page=5')
    assert res.status_code == 200
    data = res.get_json()
    assert 'employees' in data
    assert 'total' in data
    assert data['page'] == 1

def test_create_employee(client):
    res = client.post('/api/employees', json={
        'first_name': 'John',
        'last_name': 'Doe',
        'email': 'john.doe@company.com',
        'job_title': 'Developer'
    })
    assert res.status_code == 201
    data = res.get_json()
    assert data['employee']['first_name'] == 'John'

def test_get_departments(client):
    res = client.get('/api/departments')
    assert res.status_code == 200
    data = res.get_json()
    assert len(data['departments']) >= 1

def test_approve_leave_request(client):
    req = LeaveRequest.query.first()
    res = client.post(f'/api/leave-requests/{req.id}/approve', json={
        'notes': 'Approved by Tech Lead'
    })
    assert res.status_code == 200
    assert res.get_json()['leave_request']['status'] == 'APPROVED'

def test_approve_timesheet(client):
    ts = Timesheet.query.first()
    res = client.post(f'/api/timesheets/{ts.id}/approve', json={})
    assert res.status_code == 200
    assert res.get_json()['timesheet']['status'] == 'APPROVED'

def test_manager_dashboard_stats(client):
    res = client.get('/api/dashboard/manager-stats', headers={'Authorization': 'Bearer mock-jwt-token-123'})
    assert res.status_code == 200
    data = res.get_json()
    assert 'metrics' in data
    assert len(data['metrics']) == 4

def test_404_handler(client):
    res = client.get('/api/invalid-route')
    assert res.status_code == 404
