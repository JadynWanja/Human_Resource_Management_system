import React from 'react';
import { Users, FileText, UserPlus, HeartHandshake, Briefcase, Award } from 'lucide-react';

export default function HrPortal() {
  return (
    <div style={{ padding: '2.5rem', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem' }}>
        <div>
          <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#1e2029' }}>02 — HR Involvement & Operations Portal</h2>
          <p style={{ fontSize: '0.85rem', color: '#64748b', marginTop: '0.2rem' }}>Module assigned to Jadyn & Frank • Payroll, Benefits, Onboarding & HR Analytics</p>
        </div>
        <span style={{ background: '#fef3c7', color: '#b45309', padding: '0.35rem 0.75rem', borderRadius: '20px', fontWeight: 700, fontSize: '0.8rem' }}>
          HR Operations Active
        </span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.25rem', marginBottom: '2rem' }}>
        <div style={{ background: '#fff', padding: '1.5rem', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
          <UserPlus size={24} style={{ color: '#5e49e2', marginBottom: '0.5rem' }} />
          <h4 style={{ fontSize: '1.1rem', fontWeight: 700 }}>New Hire Onboarding</h4>
          <p style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '0.25rem' }}>6 Applicants in final interview stage</p>
        </div>

        <div style={{ background: '#fff', padding: '1.5rem', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
          <HeartHandshake size={24} style={{ color: '#ec4899', marginBottom: '0.5rem' }} />
          <h4 style={{ fontSize: '1.1rem', fontWeight: 700 }}>Employee Benefits</h4>
          <p style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '0.25rem' }}>Health Insurance & Retirement Enrollments</p>
        </div>

        <div style={{ background: '#fff', padding: '1.5rem', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
          <FileText size={24} style={{ color: '#10b981', marginBottom: '0.5rem' }} />
          <h4 style={{ fontSize: '1.1rem', fontWeight: 700 }}>Company Payroll</h4>
          <p style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '0.25rem' }}>Monthly Payroll Approval Pipeline</p>
        </div>
      </div>
    </div>
  );
}
