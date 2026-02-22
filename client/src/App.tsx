import { Route, Routes } from "react-router-dom";
import Layout from "./layouts/AppLayout";
import AdminDashBoard from "./components/dashboard/AdminPage";
import StaffDashBoard from "./components/dashboard/StaffPage";
import Login from "./components/auth/LoginPage";
import Signup from "./components/auth/SignupForm";

export default function App() {
  return (
    <>
      <Routes>
        {/* Public */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Layout route */}
        <Route element={<Layout />}>
          <Route path="/admin" element={<AdminDashBoard />} />
          <Route path="/staff" element={<StaffDashBoard />} />
        </Route>
      </Routes>
    </>
  );
}