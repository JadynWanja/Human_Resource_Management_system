import React, { useState } from 'react';
import RoleSwitcher from './components/RoleSwitcher';
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';
import ManagerDashboard from './pages/ManagerDashboard';
import EmployeeDashboard from './pages/EmployeeDashboard';
import MobileEmployeeApp from './pages/MobileEmployeeApp';
import HrPortal from './pages/HrPortal';

export default function App() {
  // Default to Roy's Manager Dashboard or Louis's Login
  const [activeRole, setActiveRole] = useState('manager');

  const renderActiveView = () => {
    switch (activeRole) {
      case 'login':
        return <Login onLoginSuccess={() => setActiveRole('manager')} />;
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
      {/* Louis's Role Switcher Bar */}
      <RoleSwitcher activeRole={activeRole} setActiveRole={setActiveRole} />

      {/* Main View Area */}
      <main style={{ minHeight: 'calc(100vh - 46px)' }}>
        {renderActiveView()}
      </main>
    </div>
  );
}
