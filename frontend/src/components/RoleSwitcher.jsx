import React from 'react';
import { Shield, User, Briefcase, Users, Phone, Lock } from 'lucide-react';

export default function RoleSwitcher({ activeRole, setActiveRole }) {
  const roles = [
    { id: 'login', label: 'Login Screen', author: 'Louis', icon: Lock },
    { id: 'admin', label: 'Admin Portal', author: 'Louis', icon: Shield },
    { id: 'manager', label: '03 — Manager Dashboard', author: 'Roy', icon: Briefcase },
    { id: 'employee', label: 'Employee Dashboard', author: 'Joseph', icon: User },
    { id: 'mobile', label: 'Mobile Employee App', author: 'Joseph', icon: Phone },
    { id: 'hr', label: 'HR Involvement Portal', author: 'Jadyn & Frank', icon: Users }
  ];

  return (
    <div className="demo-switcher-bar">
      <div className="demo-title">
        <span style={{ color: '#818cf8' }}>HRMS Group Presentation</span>
        <span style={{ opacity: 0.5 }}>|</span>
        <span style={{ fontSize: '0.78rem', color: '#94a3b8' }}>5 Team Members Integration</span>
      </div>

      <div className="demo-nav-btns">
        {roles.map((r) => {
          const Icon = r.icon;
          const isActive = activeRole === r.id;
          return (
            <button
              key={r.id}
              onClick={() => setActiveRole(r.id)}
              className={`role-tab-btn ${isActive ? 'active' : ''}`}
            >
              <Icon size={14} />
              <span>{r.label}</span>
              <span className="author-pill">{r.author}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
