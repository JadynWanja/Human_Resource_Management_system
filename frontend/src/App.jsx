import React, { useState } from 'react';
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';
import ManagerDashboard from './pages/ManagerDashboard';
import EmployeeDashboard from './pages/EmployeeDashboard';
import MobileEmployeeApp from './pages/MobileEmployeeApp';
import HrPortal from './pages/HrPortal';

export default function App() {
  // Available views: 'login', 'admin', 'manager', 'employee', 'mobile', 'hr'
  const [currentView, setCurrentView] = useState('manager');

  const navItems = [
    { id: 'login', label: '🔑 Login (Louis)', author: 'Louis' },
    { id: 'admin', label: '🛡️ Admin Portal (Louis)', author: 'Louis' },
    { id: 'manager', label: '📊 Manager Dashboard (Roy)', author: 'Roy' },
    { id: 'employee', label: '🧑‍💼 Employee Dashboard (Joseph)', author: 'Joseph' },
    { id: 'mobile', label: '📱 Mobile Employee App (Joseph)', author: 'Joseph' },
    { id: 'hr', label: '👥 HR Involvement Portal (Jadyn & Frank)', author: 'Jadyn & Frank' },
  ];

  const renderCurrentView = () => {
    switch (currentView) {
      case 'login':
        return <Login onLoginSuccess={() => setCurrentView('manager')} />;
      case 'admin':
        return <AdminDashboard />;
      case 'manager':
        return <ManagerDashboard />;
      case 'employee':
        return <EmployeeDashboard />;
      case 'mobile':
        return <MobileEmployeeApp />;
      case 'hr':
        return <HrPortal />;
      default:
        return <ManagerDashboard />;
    }
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f4f6fb', fontFamily: "'Inter', sans-serif" }}>
      {/* Top Role Switcher Header for Unified Group Presentation */}
      <header style={{
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
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{
            background: '#5e49e2',
            color: '#ffffff',
            fontWeight: 900,
            fontSize: '0.9rem',
            padding: '0.35rem 0.65rem',
            borderRadius: '6px',
            letterSpacing: '0.05em'
          }}>
            HRMS GROUP
          </div>
          <span style={{ fontSize: '0.9rem', fontWeight: 600, color: '#94a3b8' }}>
            Integrated Team Portal (5 Members)
          </span>
        </div>

        {/* Navigation buttons to switch view */}
        <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap' }}>
          {navItems.map((item) => {
            const isActive = currentView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setCurrentView(item.id)}
                style={{
                  backgroundColor: isActive ? '#5e49e2' : 'transparent',
                  color: isActive ? '#ffffff' : '#cbd5e1',
                  border: isActive ? '1px solid #5e49e2' : '1px solid #334155',
                  borderRadius: '6px',
                  padding: '0.35rem 0.75rem',
                  fontSize: '0.8rem',
                  fontWeight: isActive ? 700 : 500,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                {item.label}
              </button>
            );
          })}
        </div>
      </header>

      {/* Render Active View */}
      <main style={{ minHeight: 'calc(100vh - 46px)' }}>
        {renderCurrentView()}
      </main>
    </div>
  );
}
