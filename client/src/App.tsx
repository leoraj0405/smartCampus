import { Route, Routes } from "react-router-dom";
import Layout from "./layouts/AppLayout";
import AdminDashBoard from "./pages/dashboard/AdminPage";
import StaffDashBoard from "./pages/dashboard/StaffPage";
import Login from "./pages/auth/LoginPage";
import Signup from "./pages/auth/SignupForm";

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