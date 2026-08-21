import React, { useState } from 'react';
import { Eye, EyeOff, LockKeyhole, Mail } from 'lucide-react';
import '../styles/hrms.css';

export default function Login({ onLoginSuccess }) {
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();

    // Authentication will be connected to the backend later.
    onLoginSuccess();
  };

  return (
    <main className="login-shell">
      {/* =====================================================
          HRMS BRANDING / HERO
      ====================================================== */}
      <section
        className="login-brand"
        aria-label="Human Resource Management System overview"
      >
        <div className="brand-mark">
          HRMS
        </div>

        <div>
          <p className="login-kicker">
            Human Resource Management System
          </p>

          <h1>
            Manage your workforce from one intelligent HR hub.
          </h1>

          <p>
            Manage employees, departments, attendance, leave, payroll and
            performance with secure role-based access.
          </p>
        </div>

        <div className="role-strip" aria-label="HRMS user roles">
          <span>Admin</span>
          <span>HR</span>
          <span>Manager</span>
          <span>Employee</span>
        </div>
      </section>

      {/* =====================================================
          LOGIN FORM
      ====================================================== */}
      <section
        className="login-panel"
        aria-labelledby="login-title"
      >
        <div className="login-card">
          <p className="login-logo">
            HRMS
          </p>

          <h2 id="login-title">
            Welcome Back!
          </h2>

          <p className="login-subtitle">
            Sign in to access your HRMS account.
          </p>

          <form
            onSubmit={handleSubmit}
            className="login-form"
          >
            {/* Email */}
            <label htmlFor="email">
              Work Email
            </label>

            <div className="input-wrap">
              <Mail
                size={18}
                aria-hidden="true"
              />

              <input
                id="email"
                type="email"
                placeholder="name@company.com"
                autoComplete="email"
                required
              />
            </div>

            {/* Password */}
            <label htmlFor="password">
              Password
            </label>

            <div className="input-wrap">
              <LockKeyhole
                size={18}
                aria-hidden="true"
              />

              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter your password"
                autoComplete="current-password"
                required
              />

              <button
                type="button"
                className="icon-button"
                onClick={() =>
                  setShowPassword(!showPassword)
                }
                aria-label={
                  showPassword
                    ? 'Hide password'
                    : 'Show password'
                }
              >
                {showPassword ? (
                  <EyeOff size={18} />
                ) : (
                  <Eye size={18} />
                )}
              </button>
            </div>

            {/* Sign In */}
            <button
              type="submit"
              className="primary-button"
            >
              Sign In
            </button>
          </form>

          <p className="access-note">
            Your access is determined by your assigned role
            and department.
          </p>
        </div>
      </section>
    </main>
  );
}