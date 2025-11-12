import { Navigate, Route, Routes, Outlet } from "react-router-dom";
import ProtectedRoute from "../components/ProtectedRoute";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import UserPage from "../pages/UserPage";
import NotFound from "../pages/NotFound";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="/login" element={<Login />} />

      {/* Protected Routes */}
      <Route
        element={
          <ProtectedRoute>
            <Outlet />
          </ProtectedRoute>
        }
      >
        {/* Add all protected routes as children here */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/products" element={<Dashboard />} /> {/* Placeholder */}
        <Route path="/categories" element={<Dashboard />} /> {/* Placeholder */}
        <Route path="/orders" element={<Dashboard />} /> {/* Placeholder */}
        <Route path="/users" element={<UserPage />} />
      </Route>

      {/* Catch all route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
