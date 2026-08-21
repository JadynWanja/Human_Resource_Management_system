import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import {
  METRIC_CARDS_DATA,
  HEADCOUNT_BARS,
  LEAVE_SUMMARY_DATA,
  PENDING_LEAVE_REQUESTS
} from './data/mockData';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="app-layout">
      {/* Sidebar Navigation */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content */}
      <main className="main-wrapper">
        <header className="dashboard-header">
          <div>
            <h2>03 — Manager Dashboard</h2>
            <p>Here is your organization overview for today.</p>
          </div>
          <div>
            <input
              type="text"
              className="search-input-box"
              placeholder="Search anything..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </header>

        {/* 4 Summary Metric Cards */}
        <section className="metrics-grid">
          {METRIC_CARDS_DATA.map((card) => (
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

        {/* Pending Requests Table */}
        <section className="card-panel">
          <div className="card-title">Pending Leave Requests</div>
          <div className="requests-list">
            {PENDING_LEAVE_REQUESTS.filter(r =>
              searchQuery === '' ||
              r.employee.toLowerCase().includes(searchQuery.toLowerCase()) ||
              r.type.toLowerCase().includes(searchQuery.toLowerCase())
            ).map((req) => (
              <div key={req.id} className="request-row">
                <div style={{ fontWeight: 500 }}>
                  {req.employee} — {req.type} — {req.stateText}
                </div>
                <div className={`status-${req.status}`}>
                  {req.stateText}
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
