// API Client for Flask Backend Communication

const API_BASE_URL = 'http://localhost:5000/api';

export const getAuthToken = () => localStorage.getItem('hrms_auth_token') || 'mock-jwt-token-demo';
export const setAuthToken = (token) => localStorage.setItem('hrms_auth_token', token);

export const apiFetch = async (endpoint, options = {}) => {
  const token = getAuthToken();
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
    ...options.headers,
  };

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `HTTP Error ${response.status}`);
    }

    return await response.json();
  } catch (err) {
    console.warn(`[API Client] Error on ${endpoint}:`, err.message);
    throw err;
  }
};

// API Endpoint Helpers
export const hrmsAPI = {
  login: (email, password) => apiFetch('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  }),

  getCurrentUser: () => apiFetch('/auth/me'),

  getEmployees: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return apiFetch(`/employees${query ? '?' + query : ''}`);
  },

  getDepartments: () => apiFetch('/departments'),

  getLeaveRequests: (status = '') => apiFetch(`/leave-requests${status ? '?status=' + status : ''}`),

  approveLeaveRequest: (requestId, notes = '') => apiFetch(`/leave-requests/${requestId}/approve`, {
    method: 'POST',
    body: JSON.stringify({ notes }),
  }),

  rejectLeaveRequest: (requestId, notes = '') => apiFetch(`/leave-requests/${requestId}/reject`, {
    method: 'POST',
    body: JSON.stringify({ notes }),
  }),

  getManagerDashboardStats: () => apiFetch('/dashboard/manager-stats'),

  createRequisition: (data) => apiFetch('/requisitions', {
    method: 'POST',
    body: JSON.stringify(data),
  }),

  clockIn: (employeeId) => apiFetch('/attendance/clock-in', {
    method: 'POST',
    body: JSON.stringify({ employee_id: employeeId }),
  }),

  clockOut: (employeeId) => apiFetch('/attendance/clock-out', {
    method: 'POST',
    body: JSON.stringify({ employee_id: employeeId }),
  })
};
