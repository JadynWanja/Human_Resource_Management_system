import React, { useState } from 'react';
import {
  FileCheck,
  CheckCircle,
  Clock,
  AlertTriangle,
  Send,
  Zap
} from 'lucide-react';

export default function TimesheetSection({ teamMembers }) {
  const [approvedIds, setApprovedIds] = useState([]);

  const timesheetData = teamMembers.map(m => ({
    id: m.id,
    name: m.name,
    role: m.role,
    avatar: m.avatar,
    regularHours: 40,
    overtimeHours: m.id === 'EMP-101' ? 4.5 : m.id === 'EMP-102' ? 2.0 : 0,
    totalHours: m.id === 'EMP-101' ? 44.5 : m.id === 'EMP-102' ? 42.0 : 40,
    status: approvedIds.includes(m.id) ? 'approved' : 'submitted'
  }));

  const handleApproveAll = () => {
    setApprovedIds(teamMembers.map(m => m.id));
  };

  const handleApproveOne = (id) => {
    setApprovedIds(prev => [...prev, id]);
  };

  return (
    <div className="glass-panel" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h3 style={{ fontSize: '1.15rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <FileCheck size={20} style={{ color: 'var(--primary)' }} />
            Weekly Timesheet Approvals (Week 34)
          </h3>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '2px' }}>
            Review logged work hours, overtime allocations, and approve payroll logs
          </p>
        </div>

        <button className="btn btn-primary" onClick={handleApproveAll}>
          <Zap size={16} />
          <span>Approve All ({timesheetData.filter(t => t.status === 'submitted').length})</span>
        </button>
      </div>

      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.85rem' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border-color)', color: 'var(--text-subtle)', fontWeight: 600 }}>
              <th style={{ padding: '0.75rem 1rem' }}>Employee</th>
              <th style={{ padding: '0.75rem 1rem' }}>Regular Hours</th>
              <th style={{ padding: '0.75rem 1rem' }}>Overtime</th>
              <th style={{ padding: '0.75rem 1rem' }}>Total Hours</th>
              <th style={{ padding: '0.75rem 1rem' }}>Status</th>
              <th style={{ padding: '0.75rem 1rem', textAlign: 'right' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {timesheetData.map((ts) => (
              <tr key={ts.id} style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.04)' }}>
                <td style={{ padding: '0.85rem 1rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <img src={ts.avatar} alt={ts.name} style={{ width: '36px', height: '36px', borderRadius: '50%', objectFit: 'cover' }} />
                    <div>
                      <div style={{ fontWeight: 600, color: '#fff' }}>{ts.name}</div>
                      <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{ts.role}</div>
                    </div>
                  </div>
                </td>
                <td style={{ padding: '0.85rem 1rem', color: 'var(--text-main)' }}>{ts.regularHours} hrs</td>
                <td style={{ padding: '0.85rem 1rem' }}>
                  {ts.overtimeHours > 0 ? (
                    <span className="badge badge-warning">+{ts.overtimeHours} hrs OT</span>
                  ) : (
                    <span style={{ color: 'var(--text-subtle)' }}>0 hrs</span>
                  )}
                </td>
                <td style={{ padding: '0.85rem 1rem', fontWeight: 700, color: '#fff' }}>
                  {ts.totalHours} hrs
                </td>
                <td style={{ padding: '0.85rem 1rem' }}>
                  {ts.status === 'approved' ? (
                    <span className="badge badge-success">Approved</span>
                  ) : (
                    <span className="badge badge-warning">Submitted</span>
                  )}
                </td>
                <td style={{ padding: '0.85rem 1rem', textAlign: 'right' }}>
                  {ts.status === 'submitted' ? (
                    <button className="btn btn-success btn-icon" onClick={() => handleApproveOne(ts.id)} title="Approve Timesheet">
                      <CheckCircle size={16} />
                    </button>
                  ) : (
                    <span style={{ fontSize: '0.75rem', color: 'var(--success)', fontWeight: 600 }}>Verified</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
