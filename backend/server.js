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

const dashboardStats = {
  overview: {
    totalEmployees: 2480,
    openRoles: 34,
    payrollThisMonth: 482000,
    attendanceRate: 94.8,
  },
  modules: [
    { title: 'Employees', detail: '2,480 active staff', tone: 'indigo' },
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
  ],
  schedule: [
    { day: 'Mon', title: 'Leadership sync', time: '9:00 AM' },
    { day: 'Tue', title: 'Recruitment review', time: '11:30 AM' },
    { day: 'Wed', title: 'Benefits brief', time: '2:00 PM' },
    { day: 'Thu', title: 'Payroll audit', time: '4:15 PM' },
  ],
  teamMembers: [
    { name: 'Milo Turner', role: 'Head of People', initial: 'MT' },
    { name: 'Keisha Reed', role: 'HR Business Partner', initial: 'KR' },
    { name: 'Lucas Moore', role: 'Finance Lead', initial: 'LM' },
    { name: 'Noah Patel', role: 'Talent Specialist', initial: 'NP' },
  ],
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
  res.json(dashboardStats);
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

app.listen(PORT, () => {
  console.log(`HRMS backend running on http://localhost:${PORT}`);
});
