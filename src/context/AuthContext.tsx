
import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { useToast } from "@/components/ui/use-toast";

export type UserRole = 'customer' | 'vendor' | 'intern' | null;

interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, name: string, role: UserRole) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const mockUsers = [
  { id: '1', email: 'customer@example.com', password: 'password', name: 'Demo Customer', role: 'customer' as UserRole },
  { id: '2', email: 'vendor@example.com', password: 'password', name: 'Demo Vendor', role: 'vendor' as UserRole },
  { id: '3', email: 'intern@example.com', password: 'password', name: 'Demo Intern', role: 'intern' as UserRole }
];

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  // Check for saved auth on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error("Failed to parse saved user:", error);
        localStorage.removeItem('user');
      }
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      // In a real app, this would be an API call to Supabase
      const foundUser = mockUsers.find(u => u.email === email && u.password === password);
      
      if (!foundUser) {
        toast({
          title: "Login Failed",
          description: "Invalid email or password",
          variant: "destructive",
        });
        throw new Error('Invalid credentials');
      }

      // Create a copy without the password
      const { password: _, ...userWithoutPassword } = foundUser;
      setUser(userWithoutPassword);
      localStorage.setItem('user', JSON.stringify(userWithoutPassword));
      
      toast({
        title: "Login Successful",
        description: `Welcome back, ${userWithoutPassword.name}!`,
      });
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signup = async (email: string, password: string, name: string, role: UserRole) => {
    setLoading(true);
    try {
      // In a real app, this would be an API call to Supabase
      if (mockUsers.some(u => u.email === email)) {
        toast({
          title: "Signup Failed",
          description: "Email already in use",
          variant: "destructive",
        });
        throw new Error('Email already in use');
      }

      const newUser = {
        id: Math.random().toString(36).substring(2, 9),
        email,
        name, 
        role
      };

      setUser(newUser);
      localStorage.setItem('user', JSON.stringify(newUser));
      
      toast({
        title: "Account Created",
        description: `Welcome to Quote-Connect, ${name}!`,
      });
    } catch (error) {
      console.error("Signup error:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out",
    });
  };

  const value = {
    user,
    loading,
    login,
    signup,
    logout,
    isAuthenticated: !!user
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
