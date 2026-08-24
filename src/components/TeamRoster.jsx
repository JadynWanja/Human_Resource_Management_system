import React, { useState } from 'react';
import {
  Users,
  Search,
  Filter,
  MoreVertical,
  Star,
  MapPin,
  Clock,
  Eye,
  CheckCircle,
  XCircle,
  AlertCircle
} from 'lucide-react';

export default function TeamRoster({ teamMembers, searchQuery, onSelectEmployee }) {
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredMembers = teamMembers.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          member.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          member.department.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === 'all' || member.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status) => {
    switch (status) {
      case 'present':
        return <span className="badge badge-success"><span className="badge-dot" />Present</span>;
      case 'remote':
        return <span className="badge badge-info"><span className="badge-dot" />Remote</span>;
      case 'on_leave':
        return <span className="badge badge-warning"><span className="badge-dot" />On Leave</span>;
      case 'late':
        return <span className="badge badge-danger"><span className="badge-dot" />Late Clock-in</span>;
      default:
        return <span className="badge badge-secondary">Offline</span>;
    }
  };

  return (
    <div className="glass-panel" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      {/* Table Header Controls */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h3 style={{ fontSize: '1.15rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Users size={20} style={{ color: 'var(--primary)' }} />
            Direct Reports & Team Roster
          </h3>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '2px' }}>
            Real-time status, clock-ins, and performance overview ({filteredMembers.length} members showing)
          </p>
        </div>

        {/* Status Filters */}
        <div className="tabs-container">
          <button
            className={`tab-btn ${statusFilter === 'all' ? 'active' : ''}`}
            onClick={() => setStatusFilter('all')}
          >
            All ({teamMembers.length})
          </button>
          <button
            className={`tab-btn ${statusFilter === 'present' ? 'active' : ''}`}
            onClick={() => setStatusFilter('present')}
          >
            Present ({teamMembers.filter(m => m.status === 'present').length})
          </button>
          <button
            className={`tab-btn ${statusFilter === 'remote' ? 'active' : ''}`}
            onClick={() => setStatusFilter('remote')}
          >
            Remote ({teamMembers.filter(m => m.status === 'remote').length})
          </button>
          <button
            className={`tab-btn ${statusFilter === 'on_leave' ? 'active' : ''}`}
            onClick={() => setStatusFilter('on_leave')}
          >
            On Leave ({teamMembers.filter(m => m.status === 'on_leave').length})
          </button>
        </div>
      </div>

      {/* Roster Table */}
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.85rem' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border-color)', color: 'var(--text-subtle)', fontWeight: 600 }}>
              <th style={{ padding: '0.75rem 1rem' }}>Team Member</th>
              <th style={{ padding: '0.75rem 1rem' }}>Department & Project</th>
              <th style={{ padding: '0.75rem 1rem' }}>Status</th>
              <th style={{ padding: '0.75rem 1rem' }}>Clock-In / Out</th>
              <th style={{ padding: '0.75rem 1rem' }}>Hours Today</th>
              <th style={{ padding: '0.75rem 1rem' }}>Rating</th>
              <th style={{ padding: '0.75rem 1rem', textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredMembers.length === 0 ? (
              <tr>
                <td colSpan={7} style={{ textAlign: 'center', padding: '3rem 1rem', color: 'var(--text-muted)' }}>
                  No team members found matching criteria.
                </td>
              </tr>
            ) : (
              filteredMembers.map((member) => (
                <tr
                  key={member.id}
                  style={{
                    borderBottom: '1px solid rgba(255, 255, 255, 0.04)',
                    transition: 'background-color 0.15s ease',
                  }}
                  className="table-row-hover"
                >
                  {/* Name & Avatar */}
                  <td style={{ padding: '0.9rem 1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <img
                        src={member.avatar}
                        alt={member.name}
                        style={{ width: '38px', height: '38px', borderRadius: '50%', objectFit: 'cover' }}
                      />
                      <div>
                        <div style={{ fontWeight: 600, color: '#fff' }}>{member.name}</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{member.role}</div>
                      </div>
                    </div>
                  </td>

                  {/* Department & Project */}
                  <td style={{ padding: '0.9rem 1rem' }}>
                    <div style={{ color: 'var(--text-main)', fontWeight: 500 }}>{member.department}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--primary)', opacity: 0.9 }}>{member.project}</div>
                  </td>

                  {/* Status Badge */}
                  <td style={{ padding: '0.9rem 1rem' }}>
                    {getStatusBadge(member.status)}
                  </td>

                  {/* Clock In / Out */}
                  <td style={{ padding: '0.9rem 1rem', color: 'var(--text-muted)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                      <Clock size={13} style={{ color: 'var(--text-subtle)' }} />
                      <span>{member.clockIn} - {member.clockOut}</span>
                    </div>
                  </td>

                  {/* Hours Today */}
                  <td style={{ padding: '0.9rem 1rem', fontWeight: 600, color: '#fff' }}>
                    {member.hoursToday}
                  </td>

                  {/* Rating */}
                  <td style={{ padding: '0.9rem 1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: '#f59e0b', fontWeight: 700 }}>
                      <Star size={14} fill="#f59e0b" />
                      <span>{member.performanceScore}</span>
                    </div>
                  </td>

                  {/* Actions */}
                  <td style={{ padding: '0.9rem 1rem', textAlign: 'right' }}>
                    <button
                      className="btn btn-secondary btn-icon"
                      onClick={() => onSelectEmployee(member)}
                      title="View Full Employee Profile"
                    >
                      <Eye size={16} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
