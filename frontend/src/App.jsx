import React, { useState } from 'react';
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';
import EmployeeDashboard from './pages/EmployeeDashboard';
import ManagerDashboard from './pages/ManagerDashboard';
import HrPortal from './pages/HrPortal';
import MobileEmployeeApp from './pages/MobileEmployeeApp';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState('admin');

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  if (!isLoggedIn) {
    return <Login onLoginSuccess={handleLoginSuccess} />;
  }

  switch (role) {
    case 'manager':
      return <ManagerDashboard />;

    case 'employee':
      return <EmployeeDashboard />;

    case 'hr':
      return <HrPortal />;

    case 'mobile':
      return <MobileEmployeeApp />;

    case 'admin':
    default:
      return <AdminDashboard />;
  }
}
