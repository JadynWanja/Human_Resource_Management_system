import React, { useState } from 'react';
import {
  X,
  User,
  Mail,
  MapPin,
  Briefcase,
  Star,
  Clock,
  Calendar,
  CheckCircle,
  AlertCircle,
  Send
} from 'lucide-react';

export function EmployeeDetailModal({ employee, onClose }) {
  if (!employee) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.75)',
        backdropFilter: 'blur(8px)',
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem',
      }}
      onClick={onClose}
    >
      <div
        className="glass-panel animate-fade-in"
        style={{
          maxWidth: '560px',
          width: '100%',
          padding: '1.75rem',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.25rem',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="btn-icon"
          onClick={onClose}
          style={{ position: 'absolute', top: '1rem', right: '1rem' }}
        >
          <X size={20} />
        </button>

        {/* Profile Card Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <img
            src={employee.avatar}
            alt={employee.name}
            style={{ width: '64px', height: '64px', borderRadius: '50%', objectFit: 'cover', border: '3px solid var(--primary)' }}
          />
          <div>
            <h3 style={{ fontSize: '1.3rem', color: '#fff' }}>{employee.name}</h3>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{employee.role}</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--primary)', marginTop: '2px', fontWeight: 600 }}>
              {employee.department}
            </div>
          </div>
        </div>

        {/* Info Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.85rem' }}>
          <div style={{ background: 'rgba(15, 22, 36, 0.6)', padding: '0.85rem', borderRadius: '10px' }}>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-subtle)' }}>Email</div>
            <div style={{ fontSize: '0.85rem', color: '#fff', fontWeight: 500, overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {employee.email}
            </div>
          </div>
          <div style={{ background: 'rgba(15, 22, 36, 0.6)', padding: '0.85rem', borderRadius: '10px' }}>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-subtle)' }}>Location</div>
            <div style={{ fontSize: '0.85rem', color: '#fff', fontWeight: 500 }}>
              {employee.location}
            </div>
          </div>
          <div style={{ background: 'rgba(15, 22, 36, 0.6)', padding: '0.85rem', borderRadius: '10px' }}>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-subtle)' }}>Clock-In Today</div>
            <div style={{ fontSize: '0.85rem', color: 'var(--success)', fontWeight: 600 }}>
              {employee.clockIn}
            </div>
          </div>
          <div style={{ background: 'rgba(15, 22, 36, 0.6)', padding: '0.85rem', borderRadius: '10px' }}>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-subtle)' }}>Performance Rating</div>
            <div style={{ fontSize: '0.85rem', color: '#f59e0b', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
              <Star size={14} fill="#f59e0b" />
              <span>{employee.performanceScore} / 5.0</span>
            </div>
          </div>
        </div>

        {/* Assigned Project */}
        <div style={{ background: 'rgba(99, 102, 241, 0.08)', border: '1px solid rgba(99, 102, 241, 0.2)', padding: '0.85rem', borderRadius: '10px' }}>
          <div style={{ fontSize: '0.75rem', color: 'var(--primary)', fontWeight: 600 }}>Active Project Allocation</div>
          <div style={{ fontSize: '0.95rem', color: '#fff', fontWeight: 700, marginTop: '2px' }}>
            {employee.project}
          </div>
        </div>

        <div style={{ display: 'flex', justifySelf: 'flex-end', marginTop: '0.5rem' }}>
          <button className="btn btn-secondary" style={{ width: '100%' }} onClick={onClose}>
            Close Profile
          </button>
        </div>
      </div>
    </div>
  );
}

export function HeadcountModal({ isOpen, onClose, onSubmit }) {
  const [roleTitle, setRoleTitle] = useState('');
  const [department, setDepartment] = useState('Frontend Platform');
  const [priority, setPriority] = useState('High');
  const [reason, setReason] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ roleTitle, department, priority, reason });
    onClose();
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.75)',
        backdropFilter: 'blur(8px)',
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem',
      }}
      onClick={onClose}
    >
      <div
        className="glass-panel animate-fade-in"
        style={{
          maxWidth: '520px',
          width: '100%',
          padding: '1.75rem',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.25rem',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button className="btn-icon" onClick={onClose} style={{ position: 'absolute', top: '1rem', right: '1rem' }}>
          <X size={20} />
        </button>

        <div>
          <h3 style={{ fontSize: '1.25rem', color: '#fff' }}>New Headcount Requisition</h3>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Submit a recruitment request for team expansion</p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600, display: 'block', marginBottom: '0.35rem' }}>
              Job Position Title
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Senior React Developer"
              value={roleTitle}
              onChange={(e) => setRoleTitle(e.target.value)}
              style={{
                width: '100%',
                background: 'rgba(15, 22, 36, 0.8)',
                border: '1px solid var(--border-color)',
                borderRadius: '8px',
                padding: '0.6rem 0.85rem',
                color: '#fff',
                outline: 'none',
              }}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.85rem' }}>
            <div>
              <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600, display: 'block', marginBottom: '0.35rem' }}>
                Department
              </label>
              <select
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                style={{
                  width: '100%',
                  background: 'rgba(15, 22, 36, 0.8)',
                  border: '1px solid var(--border-color)',
                  borderRadius: '8px',
                  padding: '0.6rem 0.85rem',
                  color: '#fff',
                  outline: 'none',
                }}
              >
                <option value="Frontend Platform">Frontend Platform</option>
                <option value="Core Services">Core Services</option>
                <option value="Cloud Infrastructure">Cloud Infrastructure</option>
                <option value="Product Strategy">Product Strategy</option>
              </select>
            </div>

            <div>
              <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600, display: 'block', marginBottom: '0.35rem' }}>
                Priority
              </label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                style={{
                  width: '100%',
                  background: 'rgba(15, 22, 36, 0.8)',
                  border: '1px solid var(--border-color)',
                  borderRadius: '8px',
                  padding: '0.6rem 0.85rem',
                  color: '#fff',
                  outline: 'none',
                }}
              >
                <option value="Urgent">Urgent</option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
              </select>
            </div>
          </div>

          <div>
            <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600, display: 'block', marginBottom: '0.35rem' }}>
              Business Justification / Notes
            </label>
            <textarea
              rows={3}
              required
              placeholder="Explain project workload demands..."
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              style={{
                width: '100%',
                background: 'rgba(15, 22, 36, 0.8)',
                border: '1px solid var(--border-color)',
                borderRadius: '8px',
                padding: '0.6rem 0.85rem',
                color: '#fff',
                outline: 'none',
                resize: 'none',
              }}
            />
          </div>

          <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.5rem' }}>
            <button type="button" className="btn btn-secondary" style={{ flex: 1 }} onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>
              Submit Requisition
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
