import { useState } from 'react';
import { Eye, EyeOff, LockKeyhole, Mail } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import '../../styles/hrms.css';

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    navigate('/admin');
  };

  return (
    <main className='login-shell'>
      <section className='login-brand' aria-label='HRMS overview'>
        <div className='brand-mark'>HRMS</div>
        <div>
          <p className='login-kicker'>Human Resource Management</p>
          <h1>Manage your workforce from one calm admin hub.</h1>
          <p>
            Track employees, departments, leave requests, attendance and reports
            with secure role-based access.
          </p>
        </div>
        <div className='role-strip'>
          <span>Admin</span>
          <span>HR</span>
          <span>Manager</span>
          <span>Employee</span>
        </div>
      </section>

      <section className='login-panel' aria-labelledby='login-title'>
        <div className='login-card' data-node-id='2:29'>
          <p className='login-logo'>HRMS</p>
          <h2 id='login-title'>Welcome Back!</h2>
          <p className='login-subtitle'>Sign in to continue to your account</p>

          <form onSubmit={handleSubmit} className='login-form'>
            <label htmlFor='email'>Email</label>
            <div className='input-wrap'>
              <Mail size={18} aria-hidden='true' />
              <input
                id='email'
                type='email'
                placeholder='you@example.com'
                autoComplete='email'
                required
              />
            </div>

            <label htmlFor='password'>Password</label>
            <div className='input-wrap'>
              <LockKeyhole size={18} aria-hidden='true' />
              <input
                id='password'
                type={showPassword ? 'text' : 'password'}
                placeholder='Password'
                autoComplete='current-password'
                required
              />
              <button
                type='button'
                className='icon-button'
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            <button type='submit' className='primary-button'>
              Sign In
            </button>
          </form>

          <p className='access-note'>
            Secure role-based access - Admin - HR - Manager - Employee
          </p>
        </div>
      </section>
    </main>
  );
}

export default Login;
