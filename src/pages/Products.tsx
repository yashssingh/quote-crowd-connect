
import DashboardLayout from "@/components/layout/DashboardLayout";
import ProductForm from "@/components/customer/ProductForm";

const Products = () => {
  return (
    <DashboardLayout allowedRoles={["customer"]}>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Submit New Product</h1>
        <ProductForm />
      </div>
    </DashboardLayout>
  );
};

export default Products;
