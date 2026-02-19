import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

// Define User type
interface User {
  id: number;
  email: string;
  role: string;
  name?: string;
  likes: any[];
  bookings: any[];
  phone?: string;
  address?: string;
  city?: string;
  country?: string;
  bio?: string;
}

// Define AuthContext type
interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (email: string, password: string) => Promise<User>;
  register: (username: string, email: string, password: string) => Promise<User>;
  logout: () => void;
}

// Create context with proper typing
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  // Check if user is logged in on mount
  useEffect(() => {
    const checkAuth = () => {
      const storedUser = localStorage.getItem("user");
      const token = localStorage.getItem("token");
      
      console.log("AuthContext - Checking stored user:", storedUser);
      console.log("AuthContext - Checking stored token:", token);
      
      if (storedUser && token) {
        try {
          const parsedUser: User = JSON.parse(storedUser);
          setUser(parsedUser);
          setIsAuthenticated(true);
          console.log("AuthContext - User restored from storage:", parsedUser);
        } catch (error) {
          console.error("Failed to parse stored user:", error);
          localStorage.removeItem("user");
          localStorage.removeItem("token");
        }
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string): Promise<User> => {
    try {
      const response = await fetch("http://localhost:18090/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Login failed");
      }

      const data = await response.json();
      console.log("Login response:", data);

      // Store user and token
      const userData: User = {
        id: data.id,
        email: data.email,
        role: data.role,
        name: data.name,
        likes: data.likes || [],
        bookings: data.bookings || [],
      };

      localStorage.setItem("user", JSON.stringify(userData));
      localStorage.setItem("token", data.token || "mock-token");

      setUser(userData);
      setIsAuthenticated(true);

      console.log("AuthContext - User logged in:", userData);
      
      return userData;
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  };

  const register = async (username: string, email: string, password: string): Promise<User> => {
    try {
      const response = await fetch("http://localhost:18090/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Registration failed");
      }

      const data = await response.json();
      console.log("Register response:", data);

      // Store user and token
      const userData: User = {
        id: data.id,
        email: data.email,
        role: data.role || "GUEST",
        name: data.name || username,
        likes: data.likes || [],
        bookings: data.bookings || [],
      };

      localStorage.setItem("user", JSON.stringify(userData));
      localStorage.setItem("token", data.token || "mock-token");

      setUser(userData);
      setIsAuthenticated(true);

      console.log("AuthContext - User registered:", userData);

      return userData;
    } catch (error) {
      console.error("Register error:", error);
      throw error;
    }
  };

  const logout = (): void => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    setIsAuthenticated(false);
    console.log("AuthContext - User logged out");
  };

  const value: AuthContextType = {
    user,
    isAuthenticated,
    loading,
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};