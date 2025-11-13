// import React, { createContext, useContext, useState, ReactNode } from "react";
import { createContext, useContext, useState, type ReactNode } from "react";

type AlertType = "success" | "danger" | "warning" | "info";

interface AlertState {
  message: string | null;
  type: AlertType;
}

interface AlertContextType {
  alert: AlertState;
  showAlert: (message: string, type?: AlertType) => void;
  hideAlert: () => void;
}

// Context
const AlertContext = createContext<AlertContextType | undefined>(undefined);

// Provider
export const AlertProvider = ({ children }: { children: ReactNode }) => {
  const [alert, setAlert] = useState<AlertState>({
    message: null,
    type: "info",
  });

  const showAlert = (message: string, type: AlertType = "info") => {
    setAlert({ message, type });

    // Auto hide setelah 3 detik
    setTimeout(() => setAlert({ message: null, type: "info" }), 3000);
  };

  const hideAlert = () => setAlert({ message: null, type: "info" });

  return (
    <AlertContext.Provider value={{ alert, showAlert, hideAlert }}>
      {children}
    </AlertContext.Provider>
  );
};

// Hook agar mudah dipakai
// eslint-disable-next-line react-refresh/only-export-components
export const useAlert = (): AlertContextType => {
  const context = useContext(AlertContext);
  if (!context) {
    throw new Error("useAlert must be used within an AlertProvider");
  }
  return context;
};