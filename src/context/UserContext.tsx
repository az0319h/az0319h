"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { User } from "firebase/auth";
import { subscribeAuth, getMe, loginWithGoogle, logout } from "@/firebase/auth";

interface UserContextType {
  user: User | null;
  isPending: boolean;
  login: () => Promise<void>;
  logout: () => Promise<void>;
  getMe: () => User | null;
}

const UserContext = createContext<UserContextType>({
  user: null,
  isPending: true,
  login: async () => {},
  logout: async () => {},
  getMe: () => null,
});

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isPending, setIsPending] = useState(true);

  useEffect(() => {
    setIsPending(true);
    const unsubscribe = subscribeAuth((u) => {
      setUser(u);
      setIsPending(false);
    });
    return () => unsubscribe();
  }, []);

  const handleLogin = async () => {
    try {
      const u = await loginWithGoogle();
      setUser(u);
    } catch (err) {
      console.error("Login error:", err);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      setUser(null);
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  return (
    <UserContext.Provider
      value={{
        user,
        isPending,
        login: handleLogin,
        logout: handleLogout,
        getMe,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
