import React from 'react';
import { useAdminAuth } from '@/context/AdminAuthContext';
import AdminLoginForm from '@/components/admin/AdminLoginForm';

interface AdminProtectedRouteProps {
  children: React.ReactNode;
}

const AdminProtectedRoute: React.FC<AdminProtectedRouteProps> = ({ children }) => {
  const { isAdminAuthenticated } = useAdminAuth();
  
  if (!isAdminAuthenticated) {
    return <AdminLoginForm />;
  }
  
  return <>{children}</>;
};

export default AdminProtectedRoute;