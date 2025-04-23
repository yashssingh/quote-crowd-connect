
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export default function Navbar() {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  // Get user initials for avatar
  const getInitials = () => {
    if (!user?.name) return "U";
    return user.name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <nav className="bg-white border-b border-gray-200 py-4 px-6 shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center">
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-bold text-brand-600">
              Quote<span className="text-primary">Connect</span>
            </span>
          </Link>
        </div>

        {/* Desktop menu */}
        <div className="hidden md:flex items-center space-x-6">
          {isAuthenticated ? (
            <>
              <Link to="/dashboard" className="text-gray-700 hover:text-primary transition">
                Dashboard
              </Link>
              
              {user?.role === "customer" && (
                <Link to="/products" className="text-gray-700 hover:text-primary transition">
                  Products
                </Link>
              )}
              
              {user?.role === "vendor" && (
                <Link to="/quotes" className="text-gray-700 hover:text-primary transition">
                  Quotes
                </Link>
              )}

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                    <Avatar>
                      <AvatarFallback>{getInitials()}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>
                    <div>{user?.name}</div>
                    <div className="text-xs text-gray-500 capitalize">{user?.role}</div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => navigate("/dashboard")}>
                    Dashboard
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleLogout}>
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <Button onClick={() => navigate("/")}>Sign In</Button>
          )}
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {mobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </Button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-4 pt-2 pb-4 border-t border-gray-200">
          <div className="space-y-2 px-4">
            {isAuthenticated ? (
              <>
                <div className="py-2 px-4 flex items-center space-x-3 mb-2">
                  <Avatar>
                    <AvatarFallback>{getInitials()}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">{user?.name}</div>
                    <div className="text-xs text-gray-500 capitalize">{user?.role}</div>
                  </div>
                </div>
                <Link
                  to="/dashboard"
                  className="block py-2 px-4 rounded hover:bg-gray-100"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Dashboard
                </Link>
                
                {user?.role === "customer" && (
                  <Link
                    to="/products"
                    className="block py-2 px-4 rounded hover:bg-gray-100"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Products
                  </Link>
                )}
                
                {user?.role === "vendor" && (
                  <Link
                    to="/quotes"
                    className="block py-2 px-4 rounded hover:bg-gray-100"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Quotes
                  </Link>
                )}
                
                <Button 
                  variant="ghost" 
                  className="block w-full text-left py-2 px-4 rounded hover:bg-gray-100"
                  onClick={() => {
                    handleLogout();
                    setMobileMenuOpen(false);
                  }}
                >
                  Sign Out
                </Button>
              </>
            ) : (
              <Button 
                className="w-full" 
                onClick={() => {
                  navigate("/");
                  setMobileMenuOpen(false);
                }}
              >
                Sign In
              </Button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
