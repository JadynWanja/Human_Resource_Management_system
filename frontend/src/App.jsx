import React, { useEffect, useState } from 'react';
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';
import EmployeeDashboard from './pages/EmployeeDashboard';
import ManagerDashboard from './pages/ManagerDashboard';
import HrPortal from './pages/HrPortal';
import MobileEmployeeApp from './pages/MobileEmployeeApp';
import './styles/hrms.css';

const TOKEN_KEY = 'hrmsToken';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState('manager');
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
        setRole(data.user.role || 'manager');
        setIsLoggedIn(true);
      })
      .catch(() => {
        localStorage.removeItem(TOKEN_KEY);
        setUser(null);
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
    setRole('manager');
  };

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'grid',
        placeItems: 'center',
        background: '#07111d',
        color: '#f7f9ff',
        fontSize: '1.2rem',
        fontWeight: 600
      }}>
        Loading your HRMS workspace...
      </div>
    );
  }

  // If not logged in, show Louis's Auth Login Page
  if (!isLoggedIn || !user) {
    return <Login onAuthSuccess={handleAuthSuccess} />;
  }

  // Render role-protected dashboard
  switch (role) {
    case 'admin':
      return <AdminDashboard user={user} onLogout={handleLogout} />;
    case 'employee':
      return <EmployeeDashboard user={user} onLogout={handleLogout} />;
    case 'hr':
      return <HrPortal user={user} onLogout={handleLogout} />;
    case 'mobile':
      return <MobileEmployeeApp user={user} onLogout={handleLogout} />;
    case 'manager':
    default:
      return <ManagerDashboard user={user} onLogout={handleLogout} />;
  }
}
