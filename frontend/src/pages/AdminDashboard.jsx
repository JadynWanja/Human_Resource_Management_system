import React from 'react';
import { Shield, Key, Database, Server, Settings, Users } from 'lucide-react';

export default function AdminDashboard() {
  return (
    <div style={{ padding: '2.5rem', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem' }}>
        <div>
          <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#1e2029' }}>01 — System Admin Portal</h2>
          <p style={{ fontSize: '0.85rem', color: '#64748b', marginTop: '0.2rem' }}>Module assigned to Louis • System Governance & Access Controls</p>
        </div>
        <span style={{ background: '#e0e7ff', color: '#4338ca', padding: '0.35rem 0.75rem', borderRadius: '20px', fontWeight: 700, fontSize: '0.8rem' }}>
          Admin Role Authorized
        </span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.25rem', marginBottom: '2rem' }}>
        <div style={{ background: '#fff', padding: '1.5rem', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
          <Shield size={24} style={{ color: '#5e49e2', marginBottom: '0.5rem' }} />
          <h4 style={{ fontSize: '1.1rem', fontWeight: 700 }}>User Roles & IAM</h4>
          <p style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '0.25rem' }}>14 Active Admin Accounts, SSO Enforced</p>
        </div>

        <div style={{ background: '#fff', padding: '1.5rem', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
          <Database size={24} style={{ color: '#10b981', marginBottom: '0.5rem' }} />
          <h4 style={{ fontSize: '1.1rem', fontWeight: 700 }}>DB Connections</h4>
          <p style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '0.25rem' }}>PostgreSQL Pool Status: Healthy (99.9% Uptime)</p>
        </div>

        <div style={{ background: '#fff', padding: '1.5rem', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
          <Server size={24} style={{ color: '#f59e0b', marginBottom: '0.5rem' }} />
          <h4 style={{ fontSize: '1.1rem', fontWeight: 700 }}>Audit Logs</h4>
          <p style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '0.25rem' }}>Real-time Security Event Stream Active</p>
        </div>
      </div>
    </div>
  );
}
