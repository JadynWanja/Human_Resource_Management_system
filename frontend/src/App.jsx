import React, { useEffect, useState } from 'react';
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';
import EmployeeDashboard from './pages/EmployeeDashboard';
import ManagerDashboard from './pages/ManagerDashboard';
import HrPortal from './pages/HrPortal';
import MobileEmployeeApp from './pages/MobileEmployeeApp';

const TOKEN_KEY = 'hrmsToken';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState('admin');
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem(TOKEN_KEY);

    if (!token) {
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
        setRole(data.user.role || 'admin');
        setIsLoggedIn(true);
      })
      .catch(() => {
        localStorage.removeItem(TOKEN_KEY);
        setUser(null);
        setRole('admin');
        setIsLoggedIn(false);
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
      role: userData.role || 'admin',
      roleLabel: userData.roleLabel || 'Administrator',
    };

    setUser(normalizedUser);
    setRole(normalizedUser.role);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem(TOKEN_KEY);
    setUser(null);
    setRole('admin');
    setIsLoggedIn(false);
  };

  if (loading) {
    return <div className="app-loading">Loading your HRMS workspace...</div>;
  }

  if (!isLoggedIn || !user) {
    return <Login onAuthSuccess={handleAuthSuccess} />;
  }

  switch (role) {
    case 'manager':
      return <ManagerDashboard user={user} onLogout={handleLogout} />;
    case 'employee':
      return <EmployeeDashboard user={user} onLogout={handleLogout} />;
    case 'hr':
      return <HrPortal user={user} onLogout={handleLogout} />;
    case 'mobile':
      return <MobileEmployeeApp user={user} onLogout={handleLogout} />;
    case 'admin':
    default:
      return <AdminDashboard user={user} onLogout={handleLogout} />;
  }
}
