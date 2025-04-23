
import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth, UserRole } from "@/context/AuthContext";
import Navbar from "./Navbar";

interface DashboardLayoutProps {
  children: ReactNode;
  allowedRoles?: UserRole[];
}

export default function DashboardLayout({ 
  children, 
  allowedRoles 
}: DashboardLayoutProps) {
  const { user, isAuthenticated, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }
  
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  
  if (allowedRoles && user?.role && !allowedRoles.includes(user.role)) {
    return (
      <>
        <Navbar />
        <div className="container mx-auto py-12 px-4">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-red-500 mb-4">
              Access Restricted
            </h1>
            <p className="text-gray-600 mb-6">
              You don't have permission to access this section.
            </p>
          </div>
        </div>
      </>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto py-8 px-4">
        {children}
      </div>
    </div>
  );
}
