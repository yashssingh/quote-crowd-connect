
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import AuthForm from "@/components/auth/AuthForm";
import { Button } from "@/components/ui/button";

const Index = () => {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  
  // Redirect to dashboard if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-brand-600">
              Quote<span className="text-primary">Connect</span>
            </h1>
            {isAuthenticated && (
              <Button onClick={() => navigate("/dashboard")}>Dashboard</Button>
            )}
          </div>
        </div>
      </header>
      
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-12 lg:gap-8">
            <div className="sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left">
              <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl">
                <span className="block">Streamline Your</span>
                <span className="block text-primary">Product Sourcing</span>
              </h1>
              <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto lg:mx-0">
                QuoteConnect simplifies the process of getting quotes for your products. Upload your products, select vendors, and receive competitive quotes in one streamlined platform.
              </p>
              <div className="mt-8 sm:max-w-lg sm:mx-auto sm:text-center lg:text-left lg:mx-0">
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                  <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                    <div className="text-brand-600 font-bold text-lg">1. Upload</div>
                    <p className="text-gray-500 text-sm">Share product details &amp; images</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                    <div className="text-brand-600 font-bold text-lg">2. Connect</div>
                    <p className="text-gray-500 text-sm">Select trusted vendors</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                    <div className="text-brand-600 font-bold text-lg">3. Receive</div>
                    <p className="text-gray-500 text-sm">Get competitive quotes</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-12 lg:mt-0 lg:col-span-6">
              <AuthForm />
            </div>
          </div>
        </div>
      </section>
      
      <footer className="bg-white border-t border-gray-200 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-gray-500 text-sm">
            &copy; 2025 QuoteConnect. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
