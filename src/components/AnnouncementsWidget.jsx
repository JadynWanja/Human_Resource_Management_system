import React from 'react';
import {
  Megaphone,
  Gift,
  Cake,
  Award,
  Calendar,
  Sparkles,
  ChevronRight
} from 'lucide-react';
import { ANNOUNCEMENTS, UPCOMING_MILESTONES } from '../data/mockData';

export default function AnnouncementsWidget() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
      {/* Company Announcements */}
      <div className="glass-panel" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <h3 style={{ fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Megaphone size={19} style={{ color: 'var(--primary)' }} />
            Department Bulletins
          </h3>
          <span style={{ fontSize: '0.75rem', color: 'var(--primary)', fontWeight: 600, cursor: 'pointer' }}>
            View All
          </span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
          {ANNOUNCEMENTS.map((a) => (
            <div
              key={a.id}
              style={{
                background: 'rgba(15, 22, 36, 0.5)',
                border: '1px solid var(--border-color)',
                borderRadius: '10px',
                padding: '0.85rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.35rem',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span className="badge badge-primary" style={{ fontSize: '0.68rem' }}>{a.tag}</span>
                <span style={{ fontSize: '0.72rem', color: 'var(--text-subtle)' }}>{a.date}</span>
              </div>
              <div style={{ fontWeight: 600, color: '#fff', fontSize: '0.88rem' }}>{a.title}</div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{a.summary}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Upcoming Milestones */}
      <div className="glass-panel" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <h3 style={{ fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Sparkles size={19} style={{ color: 'var(--warning)' }} />
            Upcoming Team Milestones
          </h3>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
          {UPCOMING_MILESTONES.map((m) => (
            <div
              key={m.id}
              style={{
                background: 'rgba(15, 22, 36, 0.5)',
                border: '1px solid var(--border-color)',
                borderRadius: '10px',
                padding: '0.85rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '10px',
                    background: m.type === 'birthday' ? 'var(--danger-bg)' : m.type === 'anniversary' ? 'var(--success-bg)' : 'var(--info-bg)',
                    color: m.type === 'birthday' ? 'var(--danger)' : m.type === 'anniversary' ? 'var(--success)' : 'var(--info)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {m.type === 'birthday' ? <Cake size={18} /> : m.type === 'anniversary' ? <Award size={18} /> : <Calendar size={18} />}
                </div>
                <div>
                  <div style={{ fontWeight: 600, color: '#fff', fontSize: '0.88rem' }}>{m.name}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{m.event}</div>
                </div>
              </div>
              <span className="badge badge-secondary" style={{ fontSize: '0.72rem' }}>{m.date}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
