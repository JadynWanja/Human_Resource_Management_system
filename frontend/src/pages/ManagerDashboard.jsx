import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import { LogOut, Search, CheckCircle, XCircle, Clock } from 'lucide-react';
import {
  METRIC_CARDS_DATA,
  HEADCOUNT_BARS,
  LEAVE_SUMMARY_DATA,
  PENDING_LEAVE_REQUESTS
} from '../data/mockData';

export default function ManagerDashboard({ user, onLogout }) {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  const [leaveRequests, setLeaveRequests] = useState(PENDING_LEAVE_REQUESTS);
  const [metrics, setMetrics] = useState(METRIC_CARDS_DATA);

  useEffect(() => {
    // Fetch live dashboard metrics & leave requests from backend
    fetch('/api/dashboard')
      .then((res) => res.ok ? res.json() : null)
      .then((data) => {
        if (data && data.leaveRequests) {
          setLeaveRequests(data.leaveRequests);
        }
        if (data && data.metrics) {
          setMetrics(data.metrics);
        }
      })
      .catch((err) => console.warn('[ManagerDashboard] Using fallback mock data:', err));
  }, []);

  const handleApprove = async (id) => {
    try {
      const res = await fetch(`/api/leave-requests/${id}/approve`, { method: 'POST' });
      if (res.ok) {
        const data = await res.json();
        setLeaveRequests(data.leaveRequests);
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
        setLeaveRequests(data.leaveRequests);
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

  return (
    <div className="app-layout">
      {/* Sidebar */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content */}
      <main className="main-wrapper">
        <header className="dashboard-header">
          <div>
            <h2>03 — Manager Dashboard</h2>
            <p>Welcome back, {user ? user.name : 'Department Manager'} • {user ? user.department : 'Engineering'} Overview</p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ position: 'relative' }}>
              <input
                type="text"
                className="search-input-box"
                placeholder="Search requests..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {onLogout && (
              <button
                onClick={onLogout}
                style={{
                  background: '#ef4444',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '10px',
                  padding: '0.6rem 1rem',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem'
                }}
              >
                <LogOut size={16} />
                <span>Logout</span>
              </button>
            )}
          </div>
        </header>

        {/* 4 Summary Metric Cards */}
        <section className="metrics-grid">
          {metrics.map((card) => (
            <div key={card.id} className="metric-card">
              <div>
                <div className="label">{card.label}</div>
                <div className="value">{card.value}</div>
              </div>
              <div
                className="metric-icon-sq"
                style={{ backgroundColor: card.color }}
              />
            </div>
          ))}
        </section>

        {/* Middle Charts Grid */}
        <section className="middle-grid">
          <div className="card-panel">
            <div className="card-title">Headcount Overview</div>
            <div className="chart-days">
              {HEADCOUNT_BARS.map((b) => (
                <span key={b.day} style={{ width: '22px', textAlign: 'center' }}>
                  {b.day}
                </span>
              ))}
            </div>
            <div className="bars-container">
              {HEADCOUNT_BARS.map((b) => (
                <div
                  key={b.day}
                  className="bar-col"
                  style={{ height: b.height }}
                />
              ))}
            </div>
          </div>

          <div className="card-panel">
            <div className="card-title">Leave Summary</div>
            <div className="leave-summary-list">
              {LEAVE_SUMMARY_DATA.map((ls, idx) => (
                <div
                  key={idx}
                  className={`leave-summary-item ${ls.isActive ? 'active' : ''}`}
                >
                  <span className="name">{ls.type}</span>
                  <span className="percentage">{ls.percentage}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pending Requests Table with Interactive Action Buttons */}
        <section className="card-panel">
          <div className="card-title" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span>Pending Leave Requests</span>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Backend Live Sync</span>
          </div>

          <div className="requests-list">
            {leaveRequests.filter(r =>
              searchQuery === '' ||
              (r.employee && r.employee.toLowerCase().includes(searchQuery.toLowerCase())) ||
              (r.type && r.type.toLowerCase().includes(searchQuery.toLowerCase()))
            ).map((req) => (
              <div key={req.id} className="request-row" style={{ padding: '0.6rem 0', borderBottom: '1px solid #f1f5f9' }}>
                <div>
                  <div style={{ fontWeight: 600, color: '#1e2029' }}>
                    {req.employee} — <span style={{ color: '#5e49e2' }}>{req.type}</span>
                  </div>
                  <div style={{ fontSize: '0.78rem', color: '#64748b', marginTop: '2px' }}>
                    Duration: {req.days || 1} day(s) • Status: <span className={`status-${req.status}`}>{req.stateText}</span>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                  {req.status === 'pending' ? (
                    <>
                      <button
                        onClick={() => handleApprove(req.id)}
                        style={{
                          backgroundColor: '#10b981',
                          color: '#fff',
                          border: 'none',
                          borderRadius: '6px',
                          padding: '0.4rem 0.75rem',
                          fontSize: '0.78rem',
                          fontWeight: 700,
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.3rem'
                        }}
                      >
                        <CheckCircle size={14} />
                        Approve
                      </button>
                      <button
                        onClick={() => handleReject(req.id)}
                        style={{
                          backgroundColor: '#ef4444',
                          color: '#fff',
                          border: 'none',
                          borderRadius: '6px',
                          padding: '0.4rem 0.75rem',
                          fontSize: '0.78rem',
                          fontWeight: 700,
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.3rem'
                        }}
                      >
                        <XCircle size={14} />
                        Decline
                      </button>
                    </>
                  ) : (
                    <span className={`status-${req.status}`} style={{ fontSize: '0.82rem', fontWeight: 700 }}>
                      {req.stateText}
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
