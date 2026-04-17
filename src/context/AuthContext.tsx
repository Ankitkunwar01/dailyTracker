"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

type AuthContextType = {
  isAuthenticated: boolean;
  login: (email: string, pass: string) => boolean;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check for auth cookie on mount
    const authCookie = document.cookie.split('; ').find(row => row.startsWith('aiOS_auth='));
    if (authCookie && authCookie.split('=')[1] === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const login = (email: string, pass: string) => {
    if (email === "user@gmail.com" && pass === "user123@") {
      setIsAuthenticated(true);
      // Set a cookie for 24 hours
      document.cookie = "aiOS_auth=true; path=/; max-age=86400; SameSite=Lax";
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    // Clear the cookie
    document.cookie = "aiOS_auth=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) throw new Error("useAuth must be used within AuthProvider");
  return context;
}
