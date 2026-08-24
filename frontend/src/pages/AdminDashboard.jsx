import React, { useEffect, useState } from 'react';
import {
  ArrowUpRight,
  Bell,
  BriefcaseBusiness,
  CalendarDays,
  CheckCheck,
  ChevronRight,
  CircleDollarSign,
  Clock3,
  FileText,
  Search,
  ShieldCheck,
  TrendingUp,
  Users,
} from 'lucide-react';

const fallbackData = {
  overview: {
    totalEmployees: 2480,
    openRoles: 34,
    payrollThisMonth: 482000,
    attendanceRate: 94.8,
  },
  modules: [
    { title: 'Employees', detail: '2,480 active staff', tone: 'indigo' },
    { title: 'Payroll', detail: '$482K this month', tone: 'green' },
    { title: 'Attendance', detail: '94.8% on-time', tone: 'blue' },
    { title: 'Reports', detail: '28 generated this week', tone: 'orange' },
    { title: 'Settings', detail: 'Policies and access', tone: 'purple' },
    { title: 'Performance', detail: 'Team engagement tracking', tone: 'teal' },
  ],
  approvals: [
    { name: 'Anika Morris', team: 'Design', action: 'Leave request', status: 'Pending' },
    { name: 'Daniel Cruz', team: 'Operations', action: 'Expense claim', status: 'Approved' },
    { name: 'Priya Shah', team: 'Engineering', action: 'Recruitment', status: 'Review' },
  ],
  teamMembers: [
    { name: 'Milo Turner', role: 'Head of People', initial: 'MT' },
    { name: 'Keisha Reed', role: 'HR Business Partner', initial: 'KR' },
    { name: 'Lucas Moore', role: 'Finance Lead', initial: 'LM' },
    { name: 'Noah Patel', role: 'Talent Specialist', initial: 'NP' },
  ],
  schedule: [
    { day: 'Mon', title: 'Leadership sync', time: '9:00 AM' },
    { day: 'Tue', title: 'Recruitment review', time: '11:30 AM' },
    { day: 'Wed', title: 'Benefits brief', time: '2:00 PM' },
    { day: 'Thu', title: 'Payroll audit', time: '4:15 PM' },
  ],
};

const performanceBars = [62, 84, 54, 90, 76, 96, 88];

export default function AdminDashboard({ user, onLogout }) {
  const [dashboardData, setDashboardData] = useState(fallbackData);

  useEffect(() => {
    fetch('/api/dashboard')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Dashboard API unavailable');
        }
        return response.json();
      })
      .then((data) => setDashboardData(data))
      .catch(() => setDashboardData(fallbackData));
  }, []);

  const currentUser = user || { name: 'Alex Lee', email: 'alex.lee@harborone.com', roleLabel: 'Administrator' };
  const initials = currentUser.name
    .split(' ')
    .map((part) => part[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

  const payrollDisplay = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(dashboardData.overview.payrollThisMonth || 482000);

  const stats = [
    { label: 'Total employees', value: (dashboardData.overview.totalEmployees || 2480).toLocaleString(), change: '+8.2%', tone: 'indigo' },
    { label: 'Open roles', value: String(dashboardData.overview.openRoles || 34), change: '+12 open', tone: 'green' },
    { label: 'Monthly payroll', value: payrollDisplay, change: '+4.3%', tone: 'orange' },
    { label: 'Attendance rate', value: `${dashboardData.overview.attendanceRate || 94.8}%`, change: '+1.6%', tone: 'blue' },
  ];

  return (
    <div className="dashboard-layout">
      <aside className="dashboard-sidebar">
        <div className="brand-lockup">
          <div className="brand-icon">H</div>
          <div>
            <strong>HarborOne</strong>
            <span>HRMS</span>
          </div>
        </div>

        <nav className="side-nav" aria-label="Dashboard navigation">
          {['Overview', 'Employees', 'Payroll', 'Attendance', 'Recruitment', 'Reports', 'Settings'].map(
            (item, index) => (
              <button
                key={item}
                type="button"
                className={index === 0 ? 'nav-item active' : 'nav-item'}
              >
                <span>{item}</span>
                {index < 2 && <ChevronRight size={16} aria-hidden="true" />}
              </button>
            )
          )}
        </nav>

        <div className="sidebar-card">
          <div className="pill-row">
            <ShieldCheck size={16} />
            <span>Compliance</span>
          </div>
          <strong>98.4% policy coverage</strong>
          <p>Policies and training modules are up to date across all departments.</p>
        </div>

        <button type="button" className="logout-button" onClick={onLogout}>
          Log out
        </button>
      </aside>

      <main className="dashboard-main">
        <header className="topbar">
          <div>
            <p className="section-kicker">Welcome back</p>
            <h1>Admin dashboard</h1>
          </div>

          <div className="topbar-actions">
            <label className="search-box" aria-label="Search employees">
              <Search size={16} aria-hidden="true" />
              <input type="search" placeholder="Search employees" />
            </label>

            <button type="button" className="icon-button icon-soft" aria-label="Notifications">
              <Bell size={18} />
            </button>

            <div className="profile-pill">
              <div className="profile-avatar">{initials}</div>
              <div>
                <strong>{currentUser.name}</strong>
                <span>{currentUser.roleLabel || currentUser.role || 'Administrator'}</span>
              </div>
            </div>
          </div>
        </header>

        <section className="stats-grid" aria-label="HR metrics overview">
          {stats.map((stat) => (
            <article className={`stat-card ${stat.tone}`} key={stat.label}>
              <div className="stat-topline">
                <span>{stat.label}</span>
                <div className="stat-icon">
                  {stat.tone === 'indigo' && <Users size={18} />}
                  {stat.tone === 'green' && <BriefcaseBusiness size={18} />}
                  {stat.tone === 'orange' && <CircleDollarSign size={18} />}
                  {stat.tone === 'blue' && <TrendingUp size={18} />}
                </div>
              </div>
              <strong>{stat.value}</strong>
              <div className="stat-trend">
                <ArrowUpRight size={16} />
                <span>{stat.change}</span>
              </div>
            </article>
          ))}
        </section>

        <section className="module-grid" aria-label="HRMS management modules">
          {(dashboardData.modules || fallbackData.modules).map((module) => (
            <article key={module.title} className={`module-card ${module.tone}`}>
              <div className="module-icon">
                {module.title === 'Employees' && <Users size={18} />}
                {module.title === 'Payroll' && <CircleDollarSign size={18} />}
                {module.title === 'Attendance' && <Clock3 size={18} />}
                {module.title === 'Reports' && <FileText size={18} />}
                {module.title === 'Settings' && <ShieldCheck size={18} />}
                {module.title === 'Performance' && <TrendingUp size={18} />}
              </div>
              <strong>{module.title}</strong>
              <span>{module.detail}</span>
            </article>
          ))}
        </section>

        <section className="panel-grid">
          <article className="panel panel-main">
            <div className="panel-header">
              <div>
                <p className="mini-label">Performance</p>
                <h2>Team productivity</h2>
              </div>
              <span className="live-pill">Live</span>
            </div>

            <div className="chart-wrap" aria-label="Team productivity chart">
              <div className="chart-scale">
                <span>100%</span>
                <span>75%</span>
                <span>50%</span>
                <span>25%</span>
              </div>

              <div className="bar-chart">
                {performanceBars.map((bar, index) => (
                  <div className="bar-container" key={index}>
                    <div className="bar-track">
                      <span className="bar-fill" style={{ height: `${bar}%` }} />
                    </div>
                    <small>{['M', 'T', 'W', 'T', 'F', 'S', 'S'][index]}</small>
                  </div>
                ))}
              </div>
            </div>
          </article>

          <article className="panel">
            <div className="panel-header compact">
              <div>
                <p className="mini-label">Compliance</p>
                <h2>Checklist</h2>
              </div>
            </div>

            <ul className="check-list">
              {['Safety training completions', 'Payroll verification review', 'Policy acknowledgment sent', 'Annual benefits enrollment'].map((item, index) => (
                <li key={item} className={index < 3 ? 'done' : ''}>
                  <CheckCheck size={16} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </article>
        </section>

        <section className="lower-grid">
          <article className="panel">
            <div className="panel-header compact">
              <div>
                <p className="mini-label">People</p>
                <h2>Key team members</h2>
              </div>
            </div>

            <div className="member-list">
              {(dashboardData.teamMembers || fallbackData.teamMembers).map((member) => (
                <div className="member-item" key={member.name}>
                  <div className="member-avatar">{member.initial}</div>
                  <div className="member-copy">
                    <strong>{member.name}</strong>
                    <span>{member.role}</span>
                  </div>
                </div>
              ))}
            </div>
          </article>

          <article className="panel">
            <div className="panel-header compact">
              <div>
                <p className="mini-label">Approvals</p>
                <h2>Pending actions</h2>
              </div>
            </div>

            <div className="approval-list">
              {(dashboardData.approvals || fallbackData.approvals).map((item) => (
                <div className="approval-item" key={`${item.name}-${item.action}`}>
                  <div className="approval-copy">
                    <strong>{item.name}</strong>
                    <span>{item.team}</span>
                    <small>{item.action}</small>
                  </div>
                  <span className={`status-badge ${item.status.toLowerCase().replace(/\s+/g, '-')}`}>
                    {item.status}
                  </span>
                </div>
              ))}
            </div>
          </article>

          <article className="panel">
            <div className="panel-header compact">
              <div>
                <p className="mini-label">Agenda</p>
                <h2>Upcoming events</h2>
              </div>
            </div>

            <div className="schedule-list">
              {(dashboardData.schedule || fallbackData.schedule).map((item) => (
                <div className="schedule-item" key={`${item.day}-${item.title}`}>
                  <div className="day-badge">{item.day}</div>
                  <div className="event-copy">
                    <strong>{item.title}</strong>
                    <span>{item.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </article>
        </section>

        <section className="bottom-strip">
          <div className="strip-card highlight">
            <div>
              <p className="mini-label">This month</p>
              <h3>Hiring pipeline</h3>
            </div>
            <div className="strip-value">18 interviews</div>
          </div>
          <div className="strip-card">
            <Clock3 size={18} />
            <div>
              <p className="mini-label">Avg. response time</p>
              <h3>2.4 days</h3>
            </div>
          </div>
          <div className="strip-card">
            <FileText size={18} />
            <div>
              <p className="mini-label">Documents</p>
              <h3>214 files</h3>
            </div>
          </div>
          <div className="strip-card">
            <CalendarDays size={18} />
            <div>
              <p className="mini-label">Next review</p>
              <h3>Friday, 3:00 PM</h3>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
