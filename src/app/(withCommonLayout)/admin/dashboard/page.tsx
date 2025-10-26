// app/admin/dashboard/page.tsx (updated with ProtectedRoute)
import ProtectedRoute from "@/components/ProtectedRoute";
import AdminDashboard from "@/components/shared/admin/Admin";

const AdminDashboardContent = () => {
  // ... your existing dashboard content

  return (
    <ProtectedRoute>
      <AdminDashboard />
    </ProtectedRoute>
  );
};

export default AdminDashboardContent;
