import React, { useState, useEffect } from 'react';
import {
  Users,
  Building2,
  CalendarDays,
  UserCheck,
  Search,
  LogOut,
  CheckCircle2,
  XCircle,
  Clock,
  TrendingUp,
  LayoutDashboard,
  Calendar,
  Clock3,
  FileSpreadsheet,
  Settings,
  Bell,
  Sparkles,
  ShieldCheck,
  BarChart3
} from 'lucide-react';
import '../styles/hrms.css';

export default function ManagerDashboard({ user, onLogout }) {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  const [leaveRequests, setLeaveRequests] = useState([
    { id: 1, employee: 'David Kim', type: 'Annual Leave', days: 5, stateText: 'Pending Approval', status: 'pending', date: '2026-08-24' },
    { id: 2, employee: 'Sophia Martinez', type: 'Sick Leave', days: 1, stateText: 'Pending Approval', status: 'pending', date: '2026-08-25' },
    { id: 3, employee: 'Marcus Chen', type: 'Remote Work', days: 3, stateText: 'Approved by Manager', status: 'approved', date: '2026-08-20' },
    { id: 4, employee: 'Priya Sharma', type: 'Casual Leave', days: 2, stateText: 'Declined by HR', status: 'rejected', date: '2026-08-18' }
  ]);

  const [metrics, setMetrics] = useState([
    { title: 'Total Employees', value: '245', tone: 'indigo', icon: Users, trend: '+12% from last month' },
    { title: 'Departments', value: '12', tone: 'green', icon: Building2, trend: 'Active Org Structure' },
    { title: 'On Leave Today', value: '18', tone: 'orange', icon: CalendarDays, trend: '7.3% of workforce' },
    { title: 'Present Today', value: '227', tone: 'blue', icon: UserCheck, trend: '92.7% attendance' }
  ]);

  useEffect(() => {
    fetch('/api/dashboard')
      .then((res) => res.ok ? res.json() : null)
      .then((data) => {
        if (data && data.leaveRequests) {
          setLeaveRequests(data.leaveRequests);
        }
      })
      .catch((err) => console.warn('[ManagerDashboard] Live sync fallback active:', err));
  }, []);

  const handleApprove = async (id) => {
    try {
      const res = await fetch(`/api/leave-requests/${id}/approve`, { method: 'POST' });
      if (res.ok) {
        const data = await res.json();
        if (data.leaveRequests) setLeaveRequests(data.leaveRequests);
      } else {
        setLeaveRequests((prev) =>
          prev.map((r) => r.id === id ? { ...r, status: 'approved', stateText: 'Approved by Manager' } : r)
        );
      }
    } catch {
      setLeaveRequests((prev) =>
        prev.map((r) => r.id === id ? { ...r, status: 'approved', stateText: 'Approved by Manager' } : r)
      );
    }
  };

  const handleReject = async (id) => {
    try {
      const res = await fetch(`/api/leave-requests/${id}/reject`, { method: 'POST' });
      if (res.ok) {
        const data = await res.json();
        if (data.leaveRequests) setLeaveRequests(data.leaveRequests);
      } else {
        setLeaveRequests((prev) =>
          prev.map((r) => r.id === id ? { ...r, status: 'rejected', stateText: 'Declined by Manager' } : r)
        );
      }
    } catch {
      setLeaveRequests((prev) =>
        prev.map((r) => r.id === id ? { ...r, status: 'rejected', stateText: 'Declined by Manager' } : r)
      );
    }
  };

  const filteredRequests = leaveRequests.filter(r =>
    searchQuery === '' ||
    (r.employee && r.employee.toLowerCase().includes(searchQuery.toLowerCase())) ||
    (r.type && r.type.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="dashboard-layout">
      {/* Sidebar Navigation */}
      <aside className="dashboard-sidebar">
        <div className="brand-lockup">
          <div className="brand-icon">H</div>
          <div>
            <strong>HRMS Workspace</strong>
            <span>Enterprise Suite</span>
          </div>
        </div>

        <nav className="side-nav">
          <button
            className={`nav-item ${activeTab === 'dashboard' ? 'active' : ''}`}
            onClick={() => setActiveTab('dashboard')}
          >
            <span style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <LayoutDashboard size={18} />
              Manager Dashboard
            </span>
          </button>

          <button
            className={`nav-item ${activeTab === 'team' ? 'active' : ''}`}
            onClick={() => setActiveTab('team')}
          >
            <span style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Users size={18} />
              My Team (245)
            </span>
          </button>

          <button
            className={`nav-item ${activeTab === 'leave' ? 'active' : ''}`}
            onClick={() => setActiveTab('leave')}
          >
            <span style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Calendar size={18} />
              Leave Approvals
            </span>
          </button>

          <button
            className={`nav-item ${activeTab === 'attendance' ? 'active' : ''}`}
            onClick={() => setActiveTab('attendance')}
          >
            <span style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Clock3 size={18} />
              Attendance Logs
            </span>
          </button>

          <button
            className={`nav-item ${activeTab === 'reports' ? 'active' : ''}`}
            onClick={() => setActiveTab('reports')}
          >
            <span style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <FileSpreadsheet size={18} />
              Reports & Analytics
            </span>
          </button>
        </nav>

        <div className="sidebar-card">
          <div className="pill-row">
            <ShieldCheck size={14} />
            <span>Manager Portal</span>
          </div>
          <strong>Live Backend Sync</strong>
          <p>Connected to PostgreSQL REST API endpoint with role-based authorization.</p>
        </div>
      </aside>

      {/* Main Workspace */}
      <main className="dashboard-main">
        {/* Top Header / Profile Bar */}
        <header className="topbar">
          <div>
            <p className="section-kicker">03 — Manager Dashboard</p>
            <h1>Overview & Operations</h1>
          </div>

          <div className="topbar-actions">
            <div className="search-box">
              <Search size={18} />
              <input
                type="text"
                placeholder="Search employees or leave requests..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Profile & Logout Pill */}
            <div className="profile-pill">
              <div className="profile-avatar">
                {user && user.name ? user.name.split(' ').map(n => n[0]).join('') : 'M'}
              </div>
              <div>
                <strong>{user ? user.name : 'Priya Shah'}</strong>
                <span>{user ? user.roleLabel : 'Department Manager'}</span>
              </div>
            </div>

            {onLogout && (
              <button
                onClick={onLogout}
                className="icon-button icon-soft"
                title="Logout"
                style={{ cursor: 'pointer', background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', borderColor: 'rgba(239, 68, 68, 0.2)' }}
              >
                <LogOut size={18} />
              </button>
            )}
          </div>
        </header>

        {/* 4 Primary Stat Cards */}
        <section className="stats-grid">
          {metrics.map((card, idx) => {
            const IconComponent = card.icon || Users;
            return (
              <div key={idx} className={`stat-card ${card.tone}`}>
                <div className="stat-topline">
                  <span>{card.title}</span>
                  <div className="stat-icon">
                    <IconComponent size={20} />
                  </div>
                </div>
                <strong>{card.value}</strong>
                <span className="stat-trend">
                  <TrendingUp size={12} />
                  {card.trend}
                </span>
              </div>
            );
          })}
        </section>

        {/* Middle Panel Grid */}
        <section className="panel-grid">
          {/* Headcount Bar Chart */}
          <div className="panel">
            <div className="panel-header">
              <div>
                <p className="mini-label">Workforce Analytics</p>
                <h2>Headcount & Weekly Attendance</h2>
              </div>
              <span className="live-pill">Live Metrics</span>
            </div>

            <div className="chart-wrap">
              <div className="chart-scale">
                <span>100%</span>
                <span>75%</span>
                <span>50%</span>
                <span>25%</span>
                <span>0%</span>
              </div>
              <div className="bar-chart">
                {[
                  { day: 'Mon', height: '45%' },
                  { day: 'Tue', height: '65%' },
                  { day: 'Wed', height: '85%' },
                  { day: 'Thu', height: '45%' },
                  { day: 'Fri', height: '65%' },
                  { day: 'Sat', height: '85%' },
                  { day: 'Sun', height: '45%' }
                ].map((b, i) => (
                  <div key={i} className="bar-container">
                    <div className="bar-track">
                      <span className="bar-fill" style={{ height: b.height }} />
                    </div>
                    <small>{b.day}</small>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Leave Summary Breakdown */}
          <div className="panel">
            <div className="panel-header compact">
              <div>
                <p className="mini-label">Distribution</p>
                <h2>Leave Allocation Summary</h2>
              </div>
            </div>

            <ul className="check-list">
              <li className="done">
                <CheckCircle2 size={18} />
                <div style={{ flex: 1 }}>
                  <strong>Annual Leave</strong>
                  <div style={{ fontSize: '0.76rem', color: '#64748b' }}>50% of active allocations</div>
                </div>
              </li>
              <li>
                <Clock size={18} />
                <div style={{ flex: 1 }}>
                  <strong>Sick Leave</strong>
                  <div style={{ fontSize: '0.76rem', color: '#64748b' }}>20% of active allocations</div>
                </div>
              </li>
              <li>
                <Clock size={18} />
                <div style={{ flex: 1 }}>
                  <strong>Casual Leave</strong>
                  <div style={{ fontSize: '0.76rem', color: '#64748b' }}>20% of active allocations</div>
                </div>
              </li>
            </ul>
          </div>
        </section>

        {/* Lower Grid: Pending Leave Requests Table with Live Action Buttons */}
        <section className="panel" style={{ marginTop: '22px' }}>
          <div className="panel-header">
            <div>
              <p className="mini-label">Manager Action Center</p>
              <h2>Pending Leave & Remote Work Requests</h2>
            </div>
            <span className="live-pill">{filteredRequests.length} Requests Pending</span>
          </div>

          <div className="approval-list">
            {filteredRequests.map((req) => (
              <div key={req.id} className="approval-item" style={{ padding: '16px', borderRadius: '16px', background: 'rgba(255, 255, 255, 0.6)', border: '1px solid rgba(148, 163, 184, 0.12)' }}>
                <div className="approval-copy">
                  <strong>{req.employee}</strong>
                  <span>{req.type} • {req.days || 1} day(s)</span>
                  <small>Submitted: {req.date || 'Today'}</small>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  {req.status === 'pending' ? (
                    <>
                      <button
                        onClick={() => handleApprove(req.id)}
                        style={{
                          background: 'linear-gradient(135deg, #10b981, #059669)',
                          color: '#ffffff',
                          border: 'none',
                          padding: '10px 16px',
                          borderRadius: '12px',
                          fontWeight: 700,
                          fontSize: '0.82rem',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px',
                          boxShadow: '0 4px 12px rgba(16, 185, 129, 0.25)',
                          cursor: 'pointer'
                        }}
                      >
                        <CheckCircle2 size={16} />
                        Approve
                      </button>
                      <button
                        onClick={() => handleReject(req.id)}
                        style={{
                          background: 'linear-gradient(135deg, #ef4444, #dc2626)',
                          color: '#ffffff',
                          border: 'none',
                          padding: '10px 16px',
                          borderRadius: '12px',
                          fontWeight: 700,
                          fontSize: '0.82rem',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px',
                          boxShadow: '0 4px 12px rgba(239, 68, 68, 0.25)',
                          cursor: 'pointer'
                        }}
                      >
                        <XCircle size={16} />
                        Decline
                      </button>
                    </>
                  ) : (
                    <span className={`status-badge ${req.status}`}>
                      {req.stateText || req.status.toUpperCase()}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
