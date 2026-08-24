import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

export default function StatCard({ title, value, subtext, icon: Icon, trend, trendValue, colorAccent, onClick }) {
  return (
    <div
      className="glass-panel glass-panel-interactive"
      onClick={onClick}
      style={{
        padding: '1.35rem',
        cursor: onClick ? 'pointer' : 'default',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background Accent Glow */}
      <div
        style={{
          position: 'absolute',
          top: '-20px',
          right: '-20px',
          width: '80px',
          height: '80px',
          borderRadius: '50%',
          background: colorAccent || 'var(--primary)',
          opacity: 0.12,
          filter: 'blur(20px)',
          pointerEvents: 'none',
        }}
      />

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.85rem' }}>
        <span style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-muted)' }}>
          {title}
        </span>
        <div
          style={{
            width: '38px',
            height: '38px',
            borderRadius: '10px',
            background: colorAccent ? `${colorAccent}20` : 'var(--primary-light)',
            color: colorAccent || 'var(--primary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Icon size={20} />
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.75rem' }}>
        <h3 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#ffffff' }}>
          {value}
        </h3>
        {trendValue && (
          <span
            className={`badge ${trend === 'up' ? 'badge-success' : 'badge-danger'}`}
            style={{ fontSize: '0.72rem', padding: '0.15rem 0.45rem' }}
          >
            {trend === 'up' ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
            {trendValue}
          </span>
        )}
      </div>

      {subtext && (
        <div style={{ fontSize: '0.78rem', color: 'var(--text-subtle)', marginTop: '0.5rem' }}>
          {subtext}
        </div>
      )}
    </div>
  );
}
