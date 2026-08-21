import React from 'react';
import { User, Clock, CalendarCheck, Award, FileText } from 'lucide-react';

export default function EmployeeDashboard() {
  return (
    <div style={{ padding: '2.5rem', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem' }}>
        <div>
          <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#1e2029' }}>04 — Employee Self-Service Dashboard</h2>
          <p style={{ fontSize: '0.85rem', color: '#64748b', marginTop: '0.2rem' }}>Module assigned to Joseph • Employee Attendance, Payslips & Leaves</p>
        </div>
        <span style={{ background: '#dcfce7', color: '#15803d', padding: '0.35rem 0.75rem', borderRadius: '20px', fontWeight: 700, fontSize: '0.8rem' }}>
          Clocked In: 08:45 AM
        </span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.25rem' }}>
        <div style={{ background: '#fff', padding: '1.5rem', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
          <Clock size={24} style={{ color: '#5e49e2', marginBottom: '0.5rem' }} />
          <h4 style={{ fontSize: '1.1rem', fontWeight: 700 }}>Today's Hours</h4>
          <p style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '0.25rem' }}>7h 45m logged • Shift ends at 5:00 PM</p>
        </div>

        <div style={{ background: '#fff', padding: '1.5rem', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
          <CalendarCheck size={24} style={{ color: '#f59e0b', marginBottom: '0.5rem' }} />
          <h4 style={{ fontSize: '1.1rem', fontWeight: 700 }}>My Annual Leave Balance</h4>
          <p style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '0.25rem' }}>14 Days Remaining of 20 Days</p>
        </div>

        <div style={{ background: '#fff', padding: '1.5rem', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
          <FileText size={24} style={{ color: '#3b82f6', marginBottom: '0.5rem' }} />
          <h4 style={{ fontSize: '1.1rem', fontWeight: 700 }}>Latest Payslip</h4>
          <p style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '0.25rem' }}>August 2026 Salary Processed</p>
        </div>
      </div>
    </div>
  );
}
