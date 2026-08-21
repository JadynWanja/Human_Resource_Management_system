import React from 'react';
import { Phone, Clock, Calendar, CheckCircle2, User } from 'lucide-react';

export default function MobileEmployeeApp() {
  return (
    <div style={{
      minHeight: 'calc(100vh - 46px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#0f172a',
      padding: '2rem'
    }}>
      {/* Mobile Device Simulation Frame */}
      <div style={{
        width: '360px',
        height: '700px',
        background: '#ffffff',
        borderRadius: '40px',
        border: '12px solid #334155',
        boxShadow: '0 25px 50px rgba(0, 0, 0, 0.5)',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        position: 'relative'
      }}>
        {/* Status Bar Header */}
        <div style={{ background: '#5e49e2', padding: '1.25rem 1.25rem 1.5rem 1.25rem', color: '#fff' }}>
          <div style={{ fontSize: '0.72rem', opacity: 0.8, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Mobile Employee App</div>
          <div style={{ fontSize: '1.25rem', fontWeight: 800, marginTop: '2px' }}>Hello, Joseph 👋</div>
          <div style={{ fontSize: '0.8rem', opacity: 0.9 }}>UX Assigned to Joseph</div>
        </div>

        {/* Quick Clock In Button */}
        <div style={{ padding: '1.25rem', flex: 1, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{
            background: '#f8fafc',
            border: '2px dashed #cbd5e1',
            borderRadius: '16px',
            padding: '1.5rem',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            <Clock size={36} style={{ color: '#5e49e2' }} />
            <div style={{ fontWeight: 700, fontSize: '1.1rem', color: '#1e2029' }}>Clock-In Status</div>
            <div style={{ fontSize: '0.8rem', color: '#10b981', fontWeight: 600 }}>Active Shift: 08:45 AM</div>
            <button style={{
              background: '#ef4444',
              color: '#fff',
              border: 'none',
              padding: '0.65rem 1.5rem',
              borderRadius: '20px',
              fontWeight: 700,
              fontSize: '0.85rem',
              marginTop: '0.5rem',
              cursor: 'pointer'
            }}>
              Clock Out
            </button>
          </div>

          <div style={{ background: '#eff6ff', borderRadius: '12px', padding: '1rem', border: '1px solid #bfdbfe' }}>
            <div style={{ fontWeight: 700, color: '#1e40af', fontSize: '0.85rem' }}>Upcoming Leave</div>
            <div style={{ fontSize: '0.78rem', color: '#1e3a8a', marginTop: '2px' }}>Annual Leave: Aug 24 - Aug 28</div>
          </div>
        </div>
      </div>
    </div>
  );
}
