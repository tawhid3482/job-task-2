import ProtectedRoute from "@/components/ProtectedRoute";
import AdminDashboard from "@/components/shared/admin/Admin";

const AdminDashboardContent = () => {

  return (
    <ProtectedRoute>
      <AdminDashboard />
    </ProtectedRoute>
  );
};

export default AdminDashboardContent;
