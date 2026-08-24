import React, { useState } from 'react';
import {
  CalendarCheck,
  CheckCircle,
  XCircle,
  Clock,
  FileText,
  User,
  AlertCircle
} from 'lucide-react';

export default function LeaveApprovals({ leaveRequests, onApproveLeave, onRejectLeave }) {
  const [activeTab, setActiveTab] = useState('pending');

  const filteredRequests = leaveRequests.filter(req => req.status === activeTab);

  const getLeaveTypeBadge = (type) => {
    switch (type) {
      case 'Annual Leave':
        return <span className="badge badge-primary">{type}</span>;
      case 'Sick Leave':
        return <span className="badge badge-danger">{type}</span>;
      case 'Remote Work':
        return <span className="badge badge-info">{type}</span>;
      default:
        return <span className="badge badge-warning">{type}</span>;
    }
  };

  return (
    <div className="glass-panel" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      {/* Header & Tabs */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h3 style={{ fontSize: '1.15rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <CalendarCheck size={20} style={{ color: 'var(--warning)' }} />
            Leave & Time-Off Requests
          </h3>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '2px' }}>
            Review, approve, or decline team member leave applications
          </p>
        </div>

        <div className="tabs-container">
          <button
            className={`tab-btn ${activeTab === 'pending' ? 'active' : ''}`}
            onClick={() => setActiveTab('pending')}
          >
            Pending ({leaveRequests.filter(r => r.status === 'pending').length})
          </button>
          <button
            className={`tab-btn ${activeTab === 'approved' ? 'active' : ''}`}
            onClick={() => setActiveTab('approved')}
          >
            Approved ({leaveRequests.filter(r => r.status === 'approved').length})
          </button>
          <button
            className={`tab-btn ${activeTab === 'rejected' ? 'active' : ''}`}
            onClick={() => setActiveTab('rejected')}
          >
            Rejected ({leaveRequests.filter(r => r.status === 'rejected').length})
          </button>
        </div>
      </div>

      {/* Requests Grid / Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.25rem' }}>
        {filteredRequests.length === 0 ? (
          <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '3rem 1rem', color: 'var(--text-muted)' }}>
            <CheckCircle size={36} style={{ color: 'var(--success)', opacity: 0.8, marginBottom: '0.5rem' }} />
            <div style={{ fontWeight: 600, fontSize: '0.95rem' }}>No {activeTab} leave requests</div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-subtle)' }}>All pending requests have been processed.</div>
          </div>
        ) : (
          filteredRequests.map((req) => (
            <div
              key={req.id}
              style={{
                background: 'rgba(15, 22, 36, 0.6)',
                border: '1px solid var(--border-color)',
                borderRadius: '12px',
                padding: '1.25rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
                position: 'relative',
              }}
            >
              {/* Employee Header */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <img
                    src={req.avatar}
                    alt={req.name}
                    style={{ width: '42px', height: '42px', borderRadius: '50%', objectFit: 'cover' }}
                  />
                  <div>
                    <div style={{ fontWeight: 700, color: '#fff', fontSize: '0.95rem' }}>{req.name}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{req.role}</div>
                  </div>
                </div>
                {getLeaveTypeBadge(req.leaveType)}
              </div>

              {/* Dates & Duration */}
              <div
                style={{
                  background: 'rgba(255, 255, 255, 0.03)',
                  padding: '0.65rem 0.85rem',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  fontSize: '0.82rem',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: 'var(--text-muted)' }}>
                  <Clock size={14} style={{ color: 'var(--primary)' }} />
                  <span>{req.startDate} to {req.endDate}</span>
                </div>
                <div style={{ fontWeight: 700, color: 'var(--primary)' }}>
                  {req.totalDays} {req.totalDays === 1 ? 'Day' : 'Days'}
                </div>
              </div>

              {/* Reason Note */}
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: 1.4 }}>
                <span style={{ color: 'var(--text-subtle)', fontWeight: 600 }}>Reason: </span>
                "{req.reason}"
              </div>

              {/* Action Buttons for Pending requests */}
              {req.status === 'pending' && (
                <div style={{ display: 'flex', gap: '0.75rem', marginTop: 'auto', paddingTop: '0.5rem' }}>
                  <button
                    className="btn btn-success"
                    style={{ flex: 1 }}
                    onClick={() => onApproveLeave(req)}
                  >
                    <CheckCircle size={15} />
                    <span>Approve</span>
                  </button>
                  <button
                    className="btn btn-danger"
                    style={{ flex: 1 }}
                    onClick={() => onRejectLeave(req)}
                  >
                    <XCircle size={15} />
                    <span>Decline</span>
                  </button>
                </div>
              )}

              {/* Status footer for Approved / Rejected */}
              {req.status !== 'pending' && (
                <div
                  style={{
                    marginTop: 'auto',
                    textAlign: 'center',
                    padding: '0.4rem',
                    borderRadius: '6px',
                    fontSize: '0.78rem',
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    background: req.status === 'approved' ? 'var(--success-bg)' : 'var(--danger-bg)',
                    color: req.status === 'approved' ? 'var(--success)' : 'var(--danger)',
                  }}
                >
                  {req.status === 'approved' ? 'Approved by You' : 'Declined'}
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
