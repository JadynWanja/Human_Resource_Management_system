# Human Resource Management System (HRMS) — Group Project

Welcome to the **Human Resource Management System (HRMS)** group project repository.

## 👥 Team Work Division & Structure

| Team Member | Assigned Module | Components & Folder Path |
| :--- | :--- | :--- |
| **Louis** | Design System, Auth & Admin Portal | `src/pages/Login.jsx`<br>`src/pages/AdminDashboard.jsx` |
| **Roy (You)** | Manager Dashboard (Figma 03) | `src/pages/ManagerDashboard.jsx`<br>`src/components/Sidebar.jsx` |
| **Joseph** | Employee Dashboard & Mobile App | `src/pages/EmployeeDashboard.jsx`<br>`src/pages/MobileEmployeeApp.jsx` |
| **Jadyn & Frank** | HR Involvement Portal & Operations | `src/pages/HrPortal.jsx` |

---

## 🚀 Live Presentation & Demo Switcher
The `frontend/` directory includes a **Presentation Navigation Bar** at the top of the screen that allows switching between any group member's module live during presentation:
- **Login Screen** (Louis)
- **Admin Portal** (Louis)
- **03 — Manager Dashboard** (Roy)
- **Employee Dashboard** (Joseph)
- **Mobile Employee App** (Joseph)
- **HR Involvement Portal** (Jadyn & Frank)

---

## 📦 How to Run Locally

```bash
# 1. Navigate to the frontend folder
cd frontend

# 2. Install dependencies
npm install

# 3. Start local dev server
npm run dev
```

Open `http://localhost:3000` in your browser.

---

## 🌐 Deploying to Vercel / Netlify

1. Connect your repository `https://github.com/JadynWanja/Human_Resource_Management_system`.
2. Set **Root Directory** to `frontend`.
3. Build Command: `npm run build`
4. Output Directory: `dist`
