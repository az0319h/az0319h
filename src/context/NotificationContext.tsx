// src/context/NotificationContext.tsx
"use client";

import Notification from "@/components/common/Notification";
import { AnimatePresence } from "framer-motion";
import { createContext, useContext, useState, ReactNode } from "react";

type NotificationData = {
  message: string;
  success: boolean;
};

type NotificationContextType = {
  showNotification: (message: string, success: boolean) => void;
};

const NotificationContext = createContext<NotificationContextType | undefined>(
  undefined
);

export function NotificationProvider({ children }: { children: ReactNode }) {
  const [notification, setNotification] = useState<NotificationData | null>(
    null
  );

  const showNotification = (message: string, success: boolean) => {
    setNotification({ message, success });

    // 5초 뒤 자동 닫기
    setTimeout(() => setNotification(null), 5000);
  };

  return (
    <NotificationContext.Provider value={{ showNotification }}>
      {children}
      <AnimatePresence mode="wait">
        {notification && (
          <Notification
            message={notification.message}
            success={notification.success}
          />
        )}
      </AnimatePresence>
    </NotificationContext.Provider>
  );
}

export function useNotification() {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error("useNotification must be used within NotificationProvider");
  }
  return context;
}
