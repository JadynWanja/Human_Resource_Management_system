import React, { useState } from 'react';
import {
  ArrowRight,
  BriefcaseBusiness,
  CheckCircle2,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  UserRound,
} from 'lucide-react';
import '../styles/hrms.css';

const featureCards = [
  {
    title: 'People-first workflows',
    text: 'Approve payroll, leave, onboarding and performance cycles from one place.',
  },
  {
    title: 'Secure access',
    text: 'Role-based permissions make every employee, manager and HR action traceable.',
  },
  {
    title: 'Real-time insights',
    text: 'Track metrics, engagement and hiring performance with live executive views.',
  },
];

export default function Login({ onLoginSuccess }) {
  const [mode, setMode] = useState('signin');
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onLoginSuccess();
  };

  const isSignUp = mode === 'signup';

  return (
    <main className="auth-page">
      <video
        className="auth-video"
        autoPlay
        muted
        loop
        playsInline
        poster="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80"
      >
        <source
          src="https://videos.pexels.com/video-files/3195394/3195394-hd_1920_1080.mp4"
          type="video/mp4"
        />
      </video>

      <div className="auth-overlay" />

      <div className="auth-shell">
        <aside className="auth-visual" aria-label="HRMS overview">
          <div className="auth-brand-row">
            <div className="auth-mini-logo">HR</div>
            <span>HarborOne HRMS</span>
          </div>

          <div className="visual-copy">
            <p className="eyebrow">People operations platform</p>
            <h1>Build a stronger workforce with smarter HR decisions.</h1>
            <p className="visual-text">
              Coordinate talent, payroll, attendance and engagement in one connected system built
              for modern teams.
            </p>
          </div>

          <div className="stat-pills" aria-label="HRMS highlights">
            <div>
              <strong>6,200+</strong>
              <span>People managed</span>
            </div>
            <div>
              <strong>96%</strong>
              <span>Retention rate</span>
            </div>
          </div>

          <div className="feature-grid">
            {featureCards.map((feature) => (
              <article key={feature.title} className="feature-card">
                <CheckCircle2 size={18} />
                <div>
                  <h3>{feature.title}</h3>
                  <p>{feature.text}</p>
                </div>
              </article>
            ))}
          </div>

          <div className="visual-image-card">
            <img
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=900&q=80"
              alt="HR professionals collaborating"
            />
          </div>
        </aside>

        <section className="auth-panel" aria-labelledby="auth-title">
          <div className="auth-card">
            <div className="auth-header">
              <p className="eyebrow">Secure access</p>

              <div className="auth-toggle" role="tablist" aria-label="Authentication mode selector">
                <button
                  type="button"
                  className={mode === 'signin' ? 'active' : ''}
                  onClick={() => setMode('signin')}
                >
                  Sign in
                </button>
                <button
                  type="button"
                  className={mode === 'signup' ? 'active' : ''}
                  onClick={() => setMode('signup')}
                >
                  Sign up
                </button>
              </div>
            </div>

            <h2 id="auth-title">
              {isSignUp ? 'Create your workspace' : 'Welcome back'}
            </h2>
            <p className="auth-subtitle">
              {isSignUp
                ? 'Get started with a compliant and connected HR platform.'
                : 'Sign in to access your HRMS dashboard and daily operations.'}
            </p>

            <form className="auth-form" onSubmit={handleSubmit}>
              {isSignUp && (
                <div className="input-group">
                  <label htmlFor="fullName">Full name</label>
                  <div className="input-wrap">
                    <UserRound size={18} aria-hidden="true" />
                    <input
                      id="fullName"
                      name="fullName"
                      type="text"
                      placeholder="Jane Williams"
                      value={formData.fullName}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              )}

              <div className="input-group">
                <label htmlFor="email">Work email</label>
                <div className="input-wrap">
                  <Mail size={18} aria-hidden="true" />
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="name@company.com"
                    autoComplete="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="input-group">
                <label htmlFor="password">Password</label>
                <div className="input-wrap">
                  <LockKeyhole size={18} aria-hidden="true" />
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder={isSignUp ? 'Create a secure password' : 'Enter your password'}
                    autoComplete={isSignUp ? 'new-password' : 'current-password'}
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                  <button
                    type="button"
                    className="icon-button"
                    onClick={() => setShowPassword((current) => !current)}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {isSignUp && (
                <div className="input-group">
                  <label htmlFor="company">Company role</label>
                  <div className="input-wrap select-wrap">
                    <BriefcaseBusiness size={18} aria-hidden="true" />
                    <select id="company" defaultValue="admin">
                      <option value="admin">Administrator</option>
                      <option value="hr">HR Manager</option>
                      <option value="manager">Department Manager</option>
                      <option value="employee">Employee</option>
                    </select>
                  </div>
                </div>
              )}

              {!isSignUp && (
                <div className="form-meta">
                  <label className="checkbox-row">
                    <input type="checkbox" defaultChecked />
                    <span>Remember me</span>
                  </label>
                  <button type="button" className="text-button">
                    Forgot password?
                  </button>
                </div>
              )}

              <button type="submit" className="primary-button">
                {isSignUp ? 'Create account' : 'Sign in'}
                <ArrowRight size={18} aria-hidden="true" />
              </button>
            </form>

            <div className="service-note">
              <CheckCircle2 size={16} />
              <span>Trusted by global teams for compliant employee management.</span>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
