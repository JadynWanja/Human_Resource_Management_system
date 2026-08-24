import React, { useEffect, useState } from 'react';
import RoleSwitcher from './components/RoleSwitcher';
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';
import EmployeeDashboard from './pages/EmployeeDashboard';
import ManagerDashboard from './pages/ManagerDashboard';
import HrPortal from './pages/HrPortal';
import MobileEmployeeApp from './pages/MobileEmployeeApp';

const TOKEN_KEY = 'hrmsToken';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState('manager');
  const [user, setUser] = useState({
    name: 'Priya Shah',
    email: 'priya.shah@harborone.com',
    role: 'manager',
    roleLabel: 'Department Manager',
    department: 'Engineering'
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem(TOKEN_KEY);

    if (!token) {
      setIsLoggedIn(true); // Default to logged in as Manager for seamless presentation
      setLoading(false);
      return;
    }

    fetch('/api/profile', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(async (response) => {
        if (!response.ok) {
          throw new Error('Unauthorized');
        }

        const data = await response.json();
        setUser(data.user);
        setRole(data.user.role || 'manager');
        setIsLoggedIn(true);
      })
      .catch(() => {
        setIsLoggedIn(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleAuthSuccess = (userData, token) => {
    if (token) {
      localStorage.setItem(TOKEN_KEY, token);
    }

    const normalizedUser = {
      ...userData,
      role: userData.role || 'manager',
      roleLabel: userData.roleLabel || 'Department Manager',
    };

    setUser(normalizedUser);
    setRole(normalizedUser.role);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem(TOKEN_KEY);
    setUser(null);
    setIsLoggedIn(false);
    setRole('login');
  };

  if (loading) {
    return <div className="app-loading">Loading your HRMS workspace...</div>;
  }

  const renderContent = () => {
    if (role === 'login' || (!isLoggedIn && role !== 'manager')) {
      return <Login onAuthSuccess={handleAuthSuccess} />;
    }

    switch (role) {
      case 'admin':
        return <AdminDashboard user={user} onLogout={handleLogout} />;
      case 'manager':
        return <ManagerDashboard user={user} onLogout={handleLogout} />;
      case 'employee':
        return <EmployeeDashboard user={user} onLogout={handleLogout} />;
      case 'hr':
        return <HrPortal user={user} onLogout={handleLogout} />;
      case 'mobile':
        return <MobileEmployeeApp user={user} onLogout={handleLogout} />;
      default:
        return <ManagerDashboard user={user} onLogout={handleLogout} />;
    }
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f4f6fb' }}>
      {/* Louis's Role Switcher Bar */}
      <RoleSwitcher activeRole={role} setActiveRole={(newRole) => {
        setRole(newRole);
        if (newRole === 'login') {
          setIsLoggedIn(false);
        } else {
          setIsLoggedIn(true);
        }
      }} />

      {/* Main View */}
      {renderContent()}
    </div>
  );
}
