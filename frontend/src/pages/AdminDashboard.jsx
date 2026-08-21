import React from 'react';
import {
  Bell,
  Building2,
  CalendarCheck,
  ClipboardList,
  LayoutDashboard,
  Search,
  Settings,
  UserRoundCheck,
  UsersRound,
} from 'lucide-react';
import '../styles/hrms.css';

const navItems = [
  { label: 'Dashboard', icon: LayoutDashboard, active: true },
  { label: 'Employees', icon: UsersRound },
  { label: 'Departments', icon: Building2 },
  { label: 'Leave Management', icon: ClipboardList },
  { label: 'Attendance', icon: CalendarCheck },
  { label: 'Reports', icon: UserRoundCheck },
  { label: 'Notifications', icon: Bell },
  { label: 'Settings', icon: Settings },
];

const metrics = [
  { label: 'Total Employees', value: '245', color: 'primary', icon: UsersRound },
  { label: 'Departments', value: '12', color: 'violet', icon: Building2 },
  { label: 'On Leave', value: '18', color: 'warning', icon: ClipboardList },
  { label: 'Present Today', value: '227', color: 'success', icon: CalendarCheck },
];

const bars = [
  { day: 'Mon', height: '48%' },
  { day: 'Tue', height: '74%' },
  { day: 'Wed', height: '98%' },
  { day: 'Thu', height: '48%' },
  { day: 'Fri', height: '74%' },
  { day: 'Sat', height: '98%' },
  { day: 'Sun', height: '48%' },
];

const leaveRequests = [
  { name: 'John Doe', type: 'Annual Leave', status: 'Pending' },
  { name: 'Jane Smith', type: 'Sick Leave', status: 'Approved' },
  { name: 'Michael Brown', type: 'Casual Leave', status: 'Rejected' },
  { name: 'Sarah Johnson', type: 'Annual Leave', status: 'Pending' },
];

export default function AdminDashboard() {
  return (
    <main className='admin-layout' data-node-id='2:42'>
      <aside className='hrms-sidebar' aria-label='Admin navigation'>
        <div>
          <p className='hrms-sidebar-logo'>HRMS</p>
          <p className='hrms-sidebar-subtitle'>Human Resource Management</p>
        </div>

        <nav className='hrms-sidebar-nav'>
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.label}
                type='button'
                className={item.active ? 'hrms-nav-item active' : 'hrms-nav-item'}
              >
                <Icon size={17} aria-hidden='true' />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        <div className='hrms-sidebar-user'>
          <strong>Admin</strong>
          <span>Logged in user</span>
        </div>
      </aside>

      <section className='dashboard-content'>
        <header className='hrms-dashboard-header'>
          <div>
            <h1>02 - Admin Dashboard</h1>
            <p>Here is your organization overview for today.</p>
          </div>
          <label className='search-box'>
            <Search size={17} aria-hidden='true' />
            <input type='search' placeholder='Search anything...' />
          </label>
        </header>

        <section className='hrms-metric-grid' aria-label='Admin metrics'>
          {metrics.map((metric) => {
            const Icon = metric.icon;
            return (
              <article className='hrms-metric-card' key={metric.label}>
                <div>
                  <p>{metric.label}</p>
                  <strong>{metric.value}</strong>
                </div>
                <span className={'hrms-metric-icon ' + metric.color}>
                  <Icon size={16} aria-hidden='true' />
                </span>
              </article>
            );
          })}
        </section>

        <section className='hrms-dashboard-grid'>
          <article className='hrms-panel chart-panel'>
            <h2>Headcount Overview</h2>
            <div className='bar-chart' aria-label='Weekly headcount chart'>
              {bars.map((bar) => (
                <div className='bar-column' key={bar.day}>
                  <span className='hrms-bar' style={{ height: bar.height }} />
                  <span>{bar.day}</span>
                </div>
              ))}
            </div>
          </article>

          <article className='hrms-panel leave-panel'>
            <h2>Leave Summary</h2>
            <div className='leave-row strong'>
              <span>Annual Leave</span>
              <strong>50%</strong>
            </div>
            <div className='leave-row'>
              <span>Sick Leave</span>
              <strong>20%</strong>
            </div>
            <div className='leave-row'>
              <span>Casual Leave</span>
              <strong>20%</strong>
            </div>
          </article>
        </section>

        <section className='hrms-panel requests-panel'>
          <h2>Recent Leave Requests</h2>
          <div className='request-list'>
            {leaveRequests.map((request) => (
              <div className='hrms-request-row' key={request.name + request.type}>
                <span>
                  {request.name} - {request.type} - {request.status}
                </span>
                <strong className={'hrms-status ' + request.status.toLowerCase()}>
                  {request.status}
                </strong>
              </div>
            ))}
          </div>
        </section>
      </section>
    </main>
  );
}
