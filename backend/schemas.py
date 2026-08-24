from extensions import ma
from marshmallow import fields, validate
from models import (
    User, Department, Employee, AttendanceLog, LeaveType,
    LeaveBalance, LeaveRequest, LeaveApproval, Timesheet,
    HeadcountRequisition, PerformanceReview, Notification, Announcement
)

class UserSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = User
        load_instance = True
        exclude = ('password_hash',)

    email = fields.Email(required=True)

class DepartmentSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Department
        load_instance = True

class EmployeeSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Employee
        load_instance = True
        include_fk = True

    full_name = fields.String(dump_only=True)
    department_name = fields.Function(lambda obj: obj.department.name if obj.department else 'Unassigned')

class AttendanceLogSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = AttendanceLog
        load_instance = True
        include_fk = True

class LeaveTypeSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = LeaveType
        load_instance = True

class LeaveBalanceSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = LeaveBalance
        load_instance = True
        include_fk = True

    remaining_days = fields.Float(dump_only=True)
    leave_type_name = fields.Function(lambda obj: obj.leave_type.name if obj.leave_type else '')

class LeaveRequestSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = LeaveRequest
        load_instance = True
        include_fk = True

    employee_name = fields.Function(lambda obj: obj.employee.full_name if obj.employee else '')
    employee_role = fields.Function(lambda obj: obj.employee.job_title if obj.employee else '')
    leave_type_name = fields.Function(lambda obj: obj.leave_type.name if obj.leave_type else '')

class LeaveApprovalSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = LeaveApproval
        load_instance = True
        include_fk = True

class TimesheetSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Timesheet
        load_instance = True
        include_fk = True

    employee_name = fields.Function(lambda obj: obj.employee.full_name if obj.employee else '')
    employee_role = fields.Function(lambda obj: obj.employee.job_title if obj.employee else '')

class HeadcountRequisitionSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = HeadcountRequisition
        load_instance = True
        include_fk = True

    department_name = fields.Function(lambda obj: obj.department_rel.name if obj.department_rel else '')

class PerformanceReviewSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = PerformanceReview
        load_instance = True
        include_fk = True

class NotificationSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Notification
        load_instance = True
        include_fk = True

class AnnouncementSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Announcement
        load_instance = True

# Instantiated schema objects
user_schema = UserSchema()
users_schema = UserSchema(many=True)

employee_schema = EmployeeSchema()
employees_schema = EmployeeSchema(many=True)

department_schema = DepartmentSchema()
departments_schema = DepartmentSchema(many=True)

attendance_schema = AttendanceLogSchema()
attendances_schema = AttendanceLogSchema(many=True)

leave_type_schema = LeaveTypeSchema()
leave_types_schema = LeaveTypeSchema(many=True)

leave_balance_schema = LeaveBalanceSchema()
leave_balances_schema = LeaveBalanceSchema(many=True)

leave_request_schema = LeaveRequestSchema()
leave_requests_schema = LeaveRequestSchema(many=True)

leave_approval_schema = LeaveApprovalSchema()
leave_approvals_schema = LeaveApprovalSchema(many=True)

timesheet_schema = TimesheetSchema()
timesheets_schema = TimesheetSchema(many=True)

requisition_schema = HeadcountRequisitionSchema()
requisitions_schema = HeadcountRequisitionSchema(many=True)

notification_schema = NotificationSchema()
notifications_schema = NotificationSchema(many=True)

announcement_schema = AnnouncementSchema()
announcements_schema = AnnouncementSchema(many=True)
