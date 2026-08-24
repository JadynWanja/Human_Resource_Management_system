import React from 'react';

export default function Sidebar({ activeTab, setActiveTab }) {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'employees', label: 'Employees' },
    { id: 'departments', label: 'Departments' },
    { id: 'leave', label: 'Leave Management' },
    { id: 'attendance', label: 'Attendance' },
    { id: 'reports', label: 'Reports' },
    { id: 'notifications', label: 'Notifications' },
    { id: 'settings', label: 'Settings' }
  ];

  return (
    <aside className="sidebar">
      {/* Brand Header */}
      <div className="sidebar-logo">
        <h1>HRMS</h1>
        <p>Human Resource Management</p>
      </div>

      {/* Navigation Links */}
      <ul className="nav-list">
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <li key={item.id} className="nav-item">
              <button
                onClick={() => setActiveTab(item.id)}
                className={`nav-link ${isActive ? 'active' : ''}`}
              >
                {item.label}
              </button>
            </li>
          );
        })}
      </ul>

      {/* Sidebar Footer */}
      <div className="sidebar-footer">
        <div className="user-role">Manager</div>
        <div className="user-status">Logged in user</div>
      </div>
    </aside>
  );
}
