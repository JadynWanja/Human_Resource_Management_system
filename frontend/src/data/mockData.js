export const METRIC_CARDS_DATA = [
  { id: 1, label: "Total Employees", value: "245", color: "#5e49e2" },
  { id: 2, label: "Departments", value: "12", color: "#5e49e2" },
  { id: 3, label: "On Leave", value: "18", color: "#f59e0b" },
  { id: 4, label: "Present Today", value: "227", color: "#10b981" }
];

export const HEADCOUNT_BARS = [
  { day: "Mon", height: "45%" },
  { day: "Tue", height: "65%" },
  { day: "Wed", height: "85%" },
  { day: "Thu", height: "45%" },
  { day: "Fri", height: "65%" },
  { day: "Sat", height: "85%" },
  { day: "Sun", height: "45%" }
];

export const LEAVE_SUMMARY_DATA = [
  { type: "Annual Leave", percentage: "50%", isActive: true },
  { type: "Sick Leave", percentage: "20%", isActive: false },
  { type: "Casual Leave", percentage: "20%", isActive: false }
];

export const PENDING_LEAVE_REQUESTS = [
  { id: 1, employee: "John Doe", type: "Annual Leave", stateText: "Pending", status: "pending" },
  { id: 2, employee: "Jane Smith", type: "Sick Leave", stateText: "Approved", status: "approved" },
  { id: 3, employee: "Michael Brown", type: "Casual Leave", stateText: "Rejected", status: "rejected" },
  { id: 4, employee: "Sarah Johnson", type: "Annual Leave", stateText: "Pending", status: "pending" }
];
