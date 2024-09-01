import React, {
  createContext,
  useState,
  ReactNode,
  useEffect,
  useContext,
} from "react";

import { checkAuthStatus, loginUser } from "../helpers/api-communicator";

// TypeScript types for User and UserAuth
type User = {
  name: string;
  email: string;
};

type UserAuth = {
  isLoggedIn: boolean;
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
};

// Create Context for authentication
const AuthContext = createContext<UserAuth | null>(null);

// AuthProvider component
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Effect to check user authentication status, e.g., from cookies or local storage
  useEffect(() => {
    async function checkStatus() {
      try {
        const data = await checkAuthStatus();
        if (data) {
          setUser({ email: data.email, name: data.name });
          setIsLoggedIn(true);
        }
      } catch (error) {
        console.error("Failed to check authentication status", error);
      }
    }
    checkStatus();
  }, []);

  // Login function
  const login = async (email: string, password: string) => {
    // Implement login logic
    const data = await loginUser(email, password);
    if (data) {
      setUser({ email: data.email, name: data.name });
      setIsLoggedIn(true);
    }
    // Example: const userData = await authenticateUser(email, password);
    // setUser(userData);
    // setIsLoggedIn(true);
  };

  // Signup function
  const signup = async (name: string, email: string, password: string) => {
    // Implement signup logic
    // Example: const newUser = await registerUser(name, email, password);
    // setUser(newUser);
    // setIsLoggedIn(true);
  };

  // Logout function
  const logout = async () => {
    // Implement logout logic
    // Example: await signOutUser();
    // setUser(null);
    // setIsLoggedIn(false);
  };

  // Context value to be provided
  const value = {
    isLoggedIn,
    user,
    login,
    signup,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook to use authentication context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === null) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
