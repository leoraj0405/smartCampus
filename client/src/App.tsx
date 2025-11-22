import { Routes, Route, Navigate } from "react-router-dom";
import AppShellLayout from "./layout/AppShellLayout";

import Login from "./pages/login/login";
import Overview from "./pages/dashboard/Overview";
import Students from "./pages/dashboard/Students";
import Staff from "./pages/dashboard/Staff";
import Attendance from "./pages/dashboard/Attendance";
import Fees from "./pages/dashboard/Fees";
import Chat from "./pages/dashboard/Chat";

import './styles/app.css';


export default function App() {
  return (
    <Routes>

      {/* Public route (NO AppShellLayout) */}
      <Route path="/login" element={<Login />} />

      {/* Protected routes WITH AppShellLayout */}
      <Route element={<AppShellLayout />}>

        <Route path="/" element={<Navigate to="/dashboard" replace />} />

        <Route path="/dashboard" element={<Overview />} />
        <Route path="/dashboard/students" element={<Students />} />
        <Route path="/dashboard/staff" element={<Staff />} />
        <Route path="/dashboard/attendance" element={<Attendance />} />
        <Route path="/dashboard/fees" element={<Fees />} />
        <Route path="/dashboard/chat" element={<Chat />} />
      </Route>

      {/* Fallback */}
      <Route path="*" element={<div>404 - Page not found</div>} />

    </Routes>
  );
}
