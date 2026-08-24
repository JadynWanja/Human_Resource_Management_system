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
    <div className="demo-switcher-bar" style={{
      backgroundColor: '#0f172a',
      color: '#ffffff',
      padding: '0.65rem 1.5rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      borderBottom: '2px solid #5e49e2',
      position: 'sticky',
      top: 0,
      zIndex: 1000,
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
    }}>
      <div className="demo-title" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <span style={{ color: '#818cf8', fontWeight: 800, fontSize: '0.9rem' }}>HRMS Group Integration</span>
        <span style={{ opacity: 0.5 }}>|</span>
        <span style={{ fontSize: '0.78rem', color: '#94a3b8' }}>5 Team Members Portal</span>
      </div>

      <div className="demo-nav-btns" style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap' }}>
        {roles.map((r) => {
          const Icon = r.icon;
          const isActive = activeRole === r.id;
          return (
            <button
              key={r.id}
              onClick={() => setActiveRole(r.id)}
              style={{
                backgroundColor: isActive ? '#5e49e2' : 'transparent',
                color: isActive ? '#ffffff' : '#cbd5e1',
                border: isActive ? '1px solid #5e49e2' : '1px solid #334155',
                borderRadius: '6px',
                padding: '0.35rem 0.75rem',
                fontSize: '0.8rem',
                fontWeight: isActive ? 700 : 500,
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                transition: 'all 0.2s ease'
              }}
            >
              <Icon size={14} />
              <span>{r.label}</span>
              <span style={{
                backgroundColor: isActive ? 'rgba(255, 255, 255, 0.2)' : 'rgba(255, 255, 255, 0.1)',
                padding: '0.1rem 0.35rem',
                borderRadius: '4px',
                fontSize: '0.68rem',
                fontWeight: 600,
                marginLeft: '0.2rem'
              }}>{r.author}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
