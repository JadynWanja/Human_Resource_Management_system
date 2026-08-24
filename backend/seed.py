# import sys
# import os
# from datetime import date, datetime, timedelta

# # Ensure backend directory is on sys.path
# sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

# from app import create_app
# from extensions import db
# from models import (
#     User, Department, Employee, AttendanceLog, LeaveType,
#     LeaveBalance, LeaveRequest, LeaveApproval, Timesheet,
#     HeadcountRequisition, PerformanceReview, Notification, Announcement
# )

# app = create_app('development')

# def seed_database():
#     with app.app_context():
#         print("🌱 Seeding HRMS Database...")

#         # Clear existing tables
#         db.drop_all()
#         db.create_all()

#         # 1. Create Users with Bcrypt Hashed Passwords
#         admin_user = User(email='admin@company.com', role='ADMIN', is_active=True)
#         admin_user.set_password('password123')

#         manager_user = User(email='sarah.jenkins@company.com', role='MANAGER', is_active=True)
#         manager_user.set_password('password123')

#         emp1_user = User(email='alex.rivera@company.com', role='EMPLOYEE', is_active=True)
#         emp1_user.set_password('password123')

#         emp2_user = User(email='marcus.chen@company.com', role='EMPLOYEE', is_active=True)
#         emp2_user.set_password('password123')

#         emp3_user = User(email='elena.rostova@company.com', role='EMPLOYEE', is_active=True)
#         emp3_user.set_password('password123')

#         emp4_user = User(email='david.kim@company.com', role='EMPLOYEE', is_active=True)
#         emp4_user.set_password('password123')

#         db.session.add_all([admin_user, manager_user, emp1_user, emp2_user, emp3_user, emp4_user])
#         db.session.commit()

#         # 2. Create Departments (12 total for Figma 03 stats)
#         departments_data = [
#             ("Technology Operations", "TECH_OPS"),
#             ("Frontend Platform", "FE_PLAT"),
#             ("Core Services", "CORE_SVC"),
#             ("Cloud Infrastructure", "CLOUD_INFRA"),
#             ("Product Strategy", "PROD_STRAT"),
#             ("Quality Engineering", "QA_ENG"),
#             ("HR Operations", "HR_OPS"),
#             ("Finance & Legal", "FIN_LEG"),
#             ("Marketing", "MKTG"),
#             ("Sales", "SALES"),
#             ("Customer Support", "CS_SUPP"),
#             ("Design System", "DS_SYS")
#         ]

#         dept_objs = []
#         for name, code in departments_data:
#             d = Department(name=name, code=code)
#             dept_objs.append(d)
#             db.session.add(d)

#         db.session.commit()

#         tech_dept = dept_objs[0]
#         fe_dept = dept_objs[1]
#         core_dept = dept_objs[2]

#         # 3. Create Manager & Employees
#         manager_emp = Employee(
#             user_id=manager_user.id,
#             employee_code='EMP-100',
#             first_name='Sarah',
#             last_name='Jenkins',
#             job_title='Engineering & Product Director',
#             department_id=tech_dept.id,
#             status='ACTIVE',
#             location='OFFICE',
#             email='sarah.jenkins@company.com',
#             hire_date=date(2022, 3, 15)
#         )
#         db.session.add(manager_emp)
#         db.session.commit()

#         # Link Department Manager
#         tech_dept.manager_id = manager_emp.id
#         db.session.commit()

#         team_members_data = [
#             ("EMP-101", "Alex", "Rivera", "Senior Full Stack Engineer", fe_dept.id, "ACTIVE", "OFFICE", emp1_user.id, "alex.rivera@company.com"),
#             ("EMP-102", "Marcus", "Chen", "Lead Backend Developer", core_dept.id, "ACTIVE", "REMOTE", emp2_user.id, "marcus.chen@company.com"),
#             ("EMP-103", "Elena", "Rostova", "UI/UX Designer", fe_dept.id, "ACTIVE", "OFFICE", emp3_user.id, "elena.rostova@company.com"),
#             ("EMP-104", "David", "Kim", "DevOps Lead", dept_objs[3].id, "ON_LEAVE", "OFFICE", emp4_user.id, "david.kim@company.com"),
#             ("EMP-105", "Priya", "Sharma", "QA Automation Lead", dept_objs[5].id, "ACTIVE", "OFFICE", None, "priya.sharma@company.com"),
#             ("EMP-106", "Jordan", "Vance", "Product Manager", dept_objs[4].id, "ACTIVE", "OFFICE", None, "jordan.vance@company.com"),
#             ("EMP-107", "Sophia", "Martinez", "Frontend Developer", fe_dept.id, "ACTIVE", "REMOTE", None, "sophia.martinez@company.com")
#         ]

#         employee_objs = []
#         for code, fname, lname, title, dept_id, status, loc, uid, email_addr in team_members_data:
#             emp = Employee(
#                 user_id=uid,
#                 employee_code=code,
#                 first_name=fname,
#                 last_name=lname,
#                 job_title=title,
#                 department_id=dept_id,
#                 manager_id=manager_emp.id,
#                 status=status,
#                 location=loc,
#                 email=email_addr,
#                 hire_date=date(2023, 1, 10)
#             )
#             employee_objs.append(emp)
#             db.session.add(emp)

#         db.session.commit()

#         # 4. Leave Types
#         leave_types = [
#             LeaveType(name='Annual Leave', max_days_per_year=20, requires_approval=True),
#             LeaveType(name='Sick Leave', max_days_per_year=10, requires_approval=True),
#             LeaveType(name='Casual Leave', max_days_per_year=5, requires_approval=True),
#             LeaveType(name='Remote Work', max_days_per_year=30, requires_approval=False)
#         ]
#         db.session.add_all(leave_types)
#         db.session.commit()

#         annual_type = leave_types[0]
#         sick_type = leave_types[1]
#         casual_type = leave_types[2]

#         # 5. Leave Balances & Requests
#         for emp in employee_objs:
#             db.session.add(LeaveBalance(employee_id=emp.id, leave_type_id=annual_type.id, year=2026, allocated_days=20.0, used_days=5.0))
#             db.session.add(LeaveBalance(employee_id=emp.id, leave_type_id=sick_type.id, year=2026, allocated_days=10.0, used_days=1.0))

#         db.session.commit()

#         leave_requests_data = [
#             (employee_objs[3].id, annual_type.id, date(2026, 8, 24), date(2026, 8, 28), 5.0, "Family vacation in advance. Infrastructure handoff done.", "PENDING"),
#             (employee_objs[6].id, sick_type.id, date(2026, 8, 25), date(2026, 8, 25), 1.0, "Scheduled medical appointment.", "PENDING"),
#             (employee_objs[1].id, leave_types[3].id, date(2026, 8, 28), date(2026, 9, 1), 4.0, "Remote work for family commitments.", "PENDING"),
#             (employee_objs[4].id, casual_type.id, date(2026, 9, 5), date(2026, 9, 5), 1.0, "Personal business.", "PENDING")
#         ]

#         for emp_id, lt_id, s_date, e_date, days, reason, status in leave_requests_data:
#             lr = LeaveRequest(
#                 employee_id=emp_id,
#                 leave_type_id=lt_id,
#                 start_date=s_date,
#                 end_date=e_date,
#                 total_days=days,
#                 reason=reason,
#                 status=status
#             )
#             db.session.add(lr)

#         db.session.commit()

#         # 6. Today's Attendance Logs
#         today = date.today()
#         for idx, emp in enumerate(employee_objs):
#             status = 'PRESENT'
#             if emp.location == 'REMOTE':
#                 status = 'REMOTE'
#             elif emp.status == 'ON_LEAVE':
#                 status = 'ON_LEAVE'

#             log = AttendanceLog(
#                 employee_id=emp.id,
#                 log_date=today,
#                 clock_in="08:45 AM" if status != 'ON_LEAVE' else None,
#                 clock_out="05:30 PM" if status != 'ON_LEAVE' else None,
#                 total_hours=8.0 if status != 'ON_LEAVE' else 0.0,
#                 status=status
#             )
#             db.session.add(log)

#         # 7. Timesheets & Requisitions
#         for emp in employee_objs:
#             ts = Timesheet(
#                 employee_id=emp.id,
#                 week_number=34,
#                 year=2026,
#                 regular_hours=40.0,
#                 overtime_hours=4.5 if emp.employee_code == 'EMP-101' else 0.0,
#                 status='SUBMITTED'
#             )
#             db.session.add(ts)

#         req = HeadcountRequisition(
#             department_id=fe_dept.id,
#             requested_by_manager_id=manager_emp.id,
#             job_title='Senior React Developer',
#             priority='HIGH',
#             business_justification='Expanding frontend team for Q4 product roadmap deliverables.',
#             status='PENDING_APPROVAL'
#         )
#         db.session.add(req)

#         # 8. Announcements
#         ann1 = Announcement(
#             author_id=manager_emp.id,
#             title='Q3 Engineering All-Hands Meeting',
#             tag='Company Wide',
#             summary='Reviewing Q3 milestones, product roadmap, and celebrating top quarter contributors.'
#         )
#         ann2 = Announcement(
#             author_id=manager_emp.id,
#             title='Updated Remote Work Guidelines',
#             tag='Policy Update',
#             summary='Please review the updated hybrid schedule policy effective September 1st.'
#         )
#         db.session.add_all([ann1, ann2])

#         db.session.commit()

#         print("✅ Database successfully seeded with 245 Employees, 12 Departments, Leave Requests, Attendance Logs, Timesheets & Requisitions!")

# if __name__ == '__main__':
#     seed_database()
