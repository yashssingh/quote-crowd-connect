import { useAuth } from "@/context/AuthContext";
import DashboardLayout from "@/components/layout/DashboardLayout";
import InternDashboard from "@/components/intern/Dashboard";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const renderDashboardContent = () => {
    switch (user?.role) {
      case "customer":
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold">Customer Dashboard</h1>
              <Button onClick={() => navigate("/products")}>
                Submit New Product
              </Button>
            </div>
            
            <div className="p-12 text-center border rounded-lg bg-white">
              <h2 className="text-xl font-medium mb-4">Welcome, {user.first_name}</h2>
              <p className="text-gray-600 mb-6">
                Get started by submitting a new product for quotes or review your past submissions.
              </p>
              <Button onClick={() => navigate("/products")} size="lg">
                Submit New Product
              </Button>
            </div>
          </div>
        );
      case "vendor":
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold">Vendor Dashboard</h1>
              <Button onClick={() => navigate("/quotes")}>
                View Products to Quote
              </Button>
            </div>
            
            <div className="p-12 text-center border rounded-lg bg-white">
              <h2 className="text-xl font-medium mb-4">Welcome, {user.first_name}</h2>
              <p className="text-gray-600 mb-6">
                Review and submit quotes for products assigned to you.
              </p>
              <Button onClick={() => navigate("/quotes")} size="lg">
                View Quote Requests
              </Button>
            </div>
          </div>
        );
      case "intern":
        return (
          <div>
            <h1 className="text-2xl font-bold mb-6">Analytics Dashboard</h1>
            <InternDashboard />
          </div>
        );
      default:
        return <div>Unknown user role</div>;
    }
  };
  
  return (
    <DashboardLayout>{renderDashboardContent()}</DashboardLayout>
  );
};

export default Dashboard;
