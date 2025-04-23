
import DashboardLayout from "@/components/layout/DashboardLayout";
import QuoteList from "@/components/vendor/QuoteList";

const Quotes = () => {
  return (
    <DashboardLayout allowedRoles={["vendor"]}>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Product Quote Requests</h1>
        <QuoteList />
      </div>
    </DashboardLayout>
  );
};

export default Quotes;
