import React from 'react';
import {
  TrendingUp,
  Award,
  Target,
  CheckCircle2,
  Zap,
  BarChart3
} from 'lucide-react';
import { TEAM_PERFORMANCE_METRICS } from '../data/mockData';

export default function PerformanceChart() {
  const sprintData = [
    { sprint: 'Sprint 31', completion: 82, target: 80 },
    { sprint: 'Sprint 32', completion: 88, target: 80 },
    { sprint: 'Sprint 33', completion: 94, target: 80 },
    { sprint: 'Sprint 34 (Current)', completion: 86, target: 80 },
  ];

  return (
    <div className="glass-panel" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h3 style={{ fontSize: '1.15rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <TrendingUp size={20} style={{ color: 'var(--success)' }} />
            Team OKR & Goal Velocity
          </h3>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '2px' }}>
            Q3 Engineering & Product Deliverables Progress
          </p>
        </div>

        <div className="badge badge-success" style={{ fontSize: '0.82rem', padding: '0.35rem 0.75rem' }}>
          <Award size={15} />
          <span>Overall: {TEAM_PERFORMANCE_METRICS.overallCompletion}% Completed</span>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
        {/* Sprint Completion Visual Bars */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-muted)' }}>
            Sprint Velocity History
          </span>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            {sprintData.map((s, idx) => (
              <div key={idx} style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem' }}>
                  <span style={{ fontWeight: 600, color: '#fff' }}>{s.sprint}</span>
                  <span style={{ color: 'var(--primary)', fontWeight: 700 }}>{s.completion}%</span>
                </div>
                {/* Progress Bar Track */}
                <div
                  style={{
                    height: '10px',
                    width: '100%',
                    backgroundColor: 'rgba(255, 255, 255, 0.06)',
                    borderRadius: '999px',
                    overflow: 'hidden',
                    position: 'relative',
                  }}
                >
                  <div
                    style={{
                      height: '100%',
                      width: `${s.completion}%`,
                      background: 'linear-gradient(90deg, #6366f1 0%, #10b981 100%)',
                      borderRadius: '999px',
                      transition: 'width 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Core KPI Metrics Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.85rem' }}>
          {TEAM_PERFORMANCE_METRICS.categories.map((cat, idx) => (
            <div
              key={idx}
              style={{
                background: 'rgba(15, 22, 36, 0.5)',
                border: '1px solid var(--border-color)',
                borderRadius: '12px',
                padding: '1rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.4rem',
              }}
            >
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 500 }}>
                {cat.title}
              </div>
              <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#ffffff' }}>
                {cat.actual}
              </div>
              <div style={{ fontSize: '0.7rem', color: 'var(--success)', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                <CheckCircle2 size={12} />
                <span>Target: {cat.target}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
