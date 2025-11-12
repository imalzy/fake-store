import type { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import { useAuth } from "@/hooks/useAuth";

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const location = useLocation();
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated()) {
    // Redirect to the login page if user is not authenticated
    // Use the location.pathname to redirect back after login
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <MainLayout>{children}</MainLayout>;
};

export default ProtectedRoute;
