import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import AppShellLayout from "./layout/AppShellLayout";

import Login from "./pages/login/login";
import Students from "./pages/dashboard/Students";
import Staff from "./pages/dashboard/Staff";
import Attendance from "./pages/dashboard/Attendance";
import Fees from "./pages/dashboard/Fees";
import Chat from "./pages/dashboard/Chat";
import AdminDashboard from './pages/dashboard/AdminDashboard'

import { useDispatch } from 'react-redux';
import { checkExpiry, logout } from './redux/authSlice';
import { useSelector } from 'react-redux';


import './styles/app.css';
import { useEffect } from "react";
import StudentDashboard from "./pages/dashboard/StudentDashboard";
import StaffDashboard from "./pages/dashboard/StaffDashboard";
import NotFound404 from "./pages/ErrorPage";


export default function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token, expiresAt }: any = useSelector(state => state);

  useEffect(() => {
    dispatch(checkExpiry());

    if (!token || (expiresAt && Date.now() > expiresAt)) {
      dispatch(logout());
      navigate('/login');
    }
  }, []);

  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        {/* Public route (NO AppShellLayout) */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Protected routes WITH AppShellLayout */}
        <Route element={<AppShellLayout />}>

          <Route path="/admindashboard" element={<AdminDashboard />} />
          <Route path="/studentdasboard" element={<StudentDashboard />} />
          <Route path="/staffdashboard" element={<StaffDashboard />} />
          <Route path="/dashboard/students" element={<Students />} />
          <Route path="/dashboard/staff" element={<Staff />} />
          <Route path="/dashboard/attendance" element={<Attendance />} />
          <Route path="/dashboard/fees" element={<Fees />} />
          <Route path="/dashboard/chat" element={<Chat />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<NotFound404 />} />

      </Routes>
  </>
  );
}
