import React, { useState } from 'react';
import {
  Search,
  Bell,
  Plus,
  User,
  LogOut,
  Calendar,
  CheckCircle2,
  AlertCircle,
  FileText,
  ChevronDown
} from 'lucide-react';
import { MANAGER_PROFILE } from '../data/mockData';

export default function Header({
  searchQuery,
  setSearchQuery,
  notifications,
  onOpenHeadcountModal,
  onQuickApproveAll
}) {
  const [showNotifMenu, setShowNotifMenu] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [notifList, setNotifList] = useState(notifications);

  const unreadCount = notifList.filter(n => n.unread).length;

  const markAllNotifsRead = () => {
    setNotifList(notifList.map(n => ({ ...n, unread: false })));
  };

  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });

  return (
    <header
      style={{
        height: '72px',
        backgroundColor: 'var(--bg-header)',
        backdropFilter: 'var(--glass-backdrop)',
        WebkitBackdropFilter: 'var(--glass-backdrop)',
        borderBottom: '1px solid var(--border-color)',
        padding: '0 2rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'sticky',
        top: 0,
        zIndex: 30,
      }}
    >
      {/* Left Greeting & Date */}
      <div>
        <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#fff', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          Welcome back, {MANAGER_PROFILE.name.split(' ')[0]} 👋
        </div>
        <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.35rem', marginTop: '2px' }}>
          <Calendar size={13} style={{ color: 'var(--primary)' }} />
          <span>{currentDate}</span>
        </div>
      </div>

      {/* Center Search Bar */}
      <div className="search-box" style={{ maxWidth: '360px', flex: 1, margin: '0 1.5rem' }}>
        <Search className="search-icon" size={17} />
        <input
          type="text"
          placeholder="Search team members, projects, leave requests..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Right Controls */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        {/* Quick Action Button */}
        <button className="btn btn-primary" onClick={onOpenHeadcountModal}>
          <Plus size={16} />
          <span>New Requisition</span>
        </button>

        {/* Notifications Button & Dropdown */}
        <div style={{ position: 'relative' }}>
          <button
            className="btn-icon"
            onClick={() => setShowNotifMenu(!showNotifMenu)}
            style={{
              position: 'relative',
              width: '40px',
              height: '40px',
              borderRadius: '10px',
              border: '1px solid var(--border-color)',
              background: 'rgba(255, 255, 255, 0.03)',
            }}
            title="Notifications"
          >
            <Bell size={19} />
            {unreadCount > 0 && (
              <span
                style={{
                  position: 'absolute',
                  top: '6px',
                  right: '6px',
                  width: '9px',
                  height: '9px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--danger)',
                  border: '2px solid var(--bg-dark)',
                }}
              />
            )}
          </button>

          {/* Notifications Dropdown Panel */}
          {showNotifMenu && (
            <div
              className="glass-panel animate-fade-in"
              style={{
                position: 'absolute',
                right: 0,
                top: '50px',
                width: '340px',
                padding: '1rem',
                zIndex: 50,
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem', paddingBottom: '0.5rem', borderBottom: '1px solid var(--border-color)' }}>
                <span style={{ fontWeight: 700, fontSize: '0.95rem' }}>Notifications</span>
                {unreadCount > 0 && (
                  <button
                    onClick={markAllNotifsRead}
                    style={{ background: 'none', border: 'none', color: 'var(--primary)', fontSize: '0.75rem', fontWeight: 600, cursor: 'pointer' }}
                  >
                    Mark all read
                  </button>
                )}
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', maxHeight: '280px', overflowY: 'auto' }}>
                {notifList.map((notif) => (
                  <div
                    key={notif.id}
                    style={{
                      padding: '0.65rem',
                      borderRadius: '8px',
                      background: notif.unread ? 'rgba(99, 102, 241, 0.08)' : 'transparent',
                      border: '1px solid ' + (notif.unread ? 'rgba(99, 102, 241, 0.2)' : 'transparent'),
                      display: 'flex',
                      gap: '0.6rem',
                    }}
                  >
                    <div style={{ color: notif.type === 'leave' ? 'var(--warning)' : 'var(--primary)', marginTop: '2px' }}>
                      {notif.type === 'leave' ? <AlertCircle size={16} /> : <FileText size={16} />}
                    </div>
                    <div>
                      <div style={{ fontSize: '0.82rem', fontWeight: 600, color: '#fff' }}>{notif.title}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{notif.message}</div>
                      <div style={{ fontSize: '0.68rem', color: 'var(--text-subtle)', marginTop: '3px' }}>{notif.time}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Profile Avatar & Dropdown */}
        <div style={{ position: 'relative' }}>
          <button
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.65rem',
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              padding: '0.25rem',
              borderRadius: '10px',
            }}
          >
            <img
              src={MANAGER_PROFILE.avatar}
              alt={MANAGER_PROFILE.name}
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '50%',
                objectFit: 'cover',
                border: '2px solid var(--primary)',
              }}
            />
            <div style={{ textAlign: 'left', display: 'none', '@media (min-width: 768px)': { display: 'block' } }}>
              <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#fff' }}>{MANAGER_PROFILE.name}</div>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{MANAGER_PROFILE.title}</div>
            </div>
            <ChevronDown size={14} style={{ color: 'var(--text-muted)' }} />
          </button>

          {/* Profile Dropdown */}
          {showProfileMenu && (
            <div
              className="glass-panel animate-fade-in"
              style={{
                position: 'absolute',
                right: 0,
                top: '50px',
                width: '220px',
                padding: '0.5rem',
                zIndex: 50,
              }}
            >
              <div style={{ padding: '0.6rem 0.75rem', borderBottom: '1px solid var(--border-color)', marginBottom: '0.35rem' }}>
                <div style={{ fontWeight: 700, color: '#fff' }}>{MANAGER_PROFILE.name}</div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{MANAGER_PROFILE.email}</div>
              </div>
              <button
                className="tab-btn"
                style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '0.5rem', justifyContent: 'flex-start' }}
              >
                <User size={15} />
                <span>My Profile</span>
              </button>
              <button
                className="tab-btn"
                style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '0.5rem', justifyContent: 'flex-start', color: 'var(--danger)' }}
              >
                <LogOut size={15} />
                <span>Sign Out</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
