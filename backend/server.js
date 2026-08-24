const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'hrms-secret-key-2026';

app.use(cors());
app.use(express.json());

const users = [
  {
    id: 1,
    name: 'Alex Lee',
    email: 'alex.lee@harborone.com',
    password: bcrypt.hashSync('admin123', 10),
    role: 'admin',
    roleLabel: 'Administrator',
    company: 'HarborOne',
    department: 'Operations',
  },
  {
    id: 2,
    name: 'Priya Shah',
    email: 'priya.shah@harborone.com',
    password: bcrypt.hashSync('manager123', 10),
    role: 'manager',
    roleLabel: 'Department Manager',
    company: 'HarborOne',
    department: 'Engineering',
  },
  {
    id: 3,
    name: 'Daniel Cruz',
    email: 'daniel.cruz@harborone.com',
    password: bcrypt.hashSync('employee123', 10),
    role: 'employee',
    roleLabel: 'Employee',
    company: 'HarborOne',
    department: 'Operations',
  },
  {
    id: 4,
    name: 'Aisha Noor',
    email: 'aisha.noor@harborone.com',
    password: bcrypt.hashSync('hr123', 10),
    role: 'hr',
    roleLabel: 'HR Manager',
    company: 'HarborOne',
    department: 'Human Resources',
  },
];

let leaveRequests = [
  { id: 1, employee: 'David Kim', type: 'Annual Leave', days: 5, stateText: 'Pending Approval', status: 'pending', date: '2026-08-24' },
  { id: 2, employee: 'Sophia Martinez', type: 'Sick Leave', days: 1, stateText: 'Pending Approval', status: 'pending', date: '2026-08-25' },
  { id: 3, employee: 'Marcus Chen', type: 'Remote Work', days: 3, stateText: 'Approved by Manager', status: 'approved', date: '2026-08-20' },
  { id: 4, employee: 'Priya Sharma', type: 'Casual Leave', days: 2, stateText: 'Declined by HR', status: 'rejected', date: '2026-08-18' }
];

const dashboardStats = {
  overview: {
    totalEmployees: 245,
    departments: 12,
    onLeave: 18,
    presentToday: 227,
  },
  metrics: [
    { id: 1, label: 'Total Employees', value: '245', color: '#5e49e2' },
    { id: 2, label: 'Departments', value: '12', color: '#5e49e2' },
    { id: 3, label: 'On Leave', value: '18', color: '#f59e0b' },
    { id: 4, label: 'Present Today', value: '227', color: '#10b981' }
  ],
  headcountOverview: [
    { day: 'Mon', height: '45%' },
    { day: 'Tue', height: '65%' },
    { day: 'Wed', height: '85%' },
    { day: 'Thu', height: '45%' },
    { day: 'Fri', height: '65%' },
    { day: 'Sat', height: '85%' },
    { day: 'Sun', height: '45%' }
  ],
  leaveSummary: [
    { type: 'Annual Leave', percentage: '50%', isActive: true },
    { type: 'Sick Leave', percentage: '20%', isActive: false },
    { type: 'Casual Leave', percentage: '20%', isActive: false }
  ],
  modules: [
    { title: 'Employees', detail: '245 active staff', tone: 'indigo' },
    { title: 'Payroll', detail: '$482K this month', tone: 'green' },
    { title: 'Attendance', detail: '94.8% on-time', tone: 'blue' },
    { title: 'Reports', detail: '28 generated this week', tone: 'orange' },
    { title: 'Settings', detail: 'Policies and access', tone: 'purple' },
    { title: 'Performance', detail: 'Team engagement tracking', tone: 'teal' },
  ],
  approvals: [
    { name: 'Anika Morris', team: 'Design', action: 'Leave request', status: 'Pending' },
    { name: 'Daniel Cruz', team: 'Operations', action: 'Expense claim', status: 'Approved' },
    { name: 'Priya Shah', team: 'Engineering', action: 'Recruitment', status: 'Review' },
  ]
};

const sanitizeUser = (user) => ({
  id: user.id,
  name: user.name,
  email: user.email,
  role: user.role,
  roleLabel: user.roleLabel,
  company: user.company,
  department: user.department,
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'HRMS backend is running' });
});

app.post('/api/auth/signup', async (req, res) => {
  const { name, email, password, companyRole } = req.body;

  if (!name || !email || !password || !companyRole) {
    return res.status(400).json({ message: 'Please fill in all fields.' });
  }

  const existingUser = users.find((user) => user.email.toLowerCase() === String(email).toLowerCase());
  if (existingUser) {
    return res.status(409).json({ message: 'User already exists.' });
  }

  const roleMap = {
    admin: 'Administrator',
    hr: 'HR Manager',
    manager: 'Department Manager',
    employee: 'Employee',
    finance: 'Finance Manager',
    recruitment: 'Recruitment Lead',
    operations: 'Operations Lead',
    it: 'IT Support',
  };

  const newUser = {
    id: Date.now(),
    name,
    email,
    password: await bcrypt.hash(password, 10),
    role: companyRole,
    roleLabel: roleMap[companyRole] || 'Employee',
    company: 'HarborOne',
    department: 'General',
  };

  users.push(newUser);

  const token = jwt.sign({ id: newUser.id, email: newUser.email, role: newUser.role }, JWT_SECRET, {
    expiresIn: '8h',
  });

  res.status(201).json({ token, user: sanitizeUser(newUser) });
});

app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required.' });
  }

  const user = users.find((entry) => entry.email.toLowerCase() === String(email).toLowerCase());
  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials.' });
  }

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) {
    return res.status(401).json({ message: 'Invalid credentials.' });
  }

  const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, JWT_SECRET, {
    expiresIn: '8h',
  });

  res.json({ token, user: sanitizeUser(user) });
});

app.get('/api/dashboard', (req, res) => {
  res.json({
    ...dashboardStats,
    leaveRequests
  });
});

app.get('/api/profile', (req, res) => {
  const authHeader = req.headers.authorization || '';
  const token = authHeader.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = users.find((entry) => entry.id === decoded.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ user: sanitizeUser(user) });
  } catch (error) {
    return res.status(401).json({ message: 'Token expired or invalid.' });
  }
});

// Roy's Manager Dashboard API endpoints
app.get('/api/leave-requests', (req, res) => {
  res.json({ leaveRequests });
});

app.post('/api/leave-requests/:id/approve', (req, res) => {
  const reqId = parseInt(req.params.id);
  const target = leaveRequests.find(r => r.id === reqId);
  if (target) {
    target.status = 'approved';
    target.stateText = 'Approved by Manager';
  }
  res.json({ message: 'Leave request approved', leaveRequests });
});

app.post('/api/leave-requests/:id/reject', (req, res) => {
  const reqId = parseInt(req.params.id);
  const target = leaveRequests.find(r => r.id === reqId);
  if (target) {
    target.status = 'rejected';
    target.stateText = 'Declined by Manager';
  }
  res.json({ message: 'Leave request rejected', leaveRequests });
});

app.listen(PORT, () => {
  console.log(`HRMS backend running on http://localhost:${PORT}`);
});
