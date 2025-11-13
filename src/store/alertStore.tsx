import { create } from "zustand";

interface Alert {
  id: string;
  message: string;
  variant: string;
}

interface AlertStore {
  alerts: Alert[];
  addAlert: (message: string, variant?: string, duration?: number) => void;
  removeAlert: (id: string) => void;
}

const generateId = (): string => Math.random().toString(36).substr(2, 9);

export const useAlertStore = create<AlertStore>((set) => ({
  alerts: [],

  addAlert: (
    message: string,
    variant: string = "info",
    duration: number = 3000
  ): void => {
    const newAlert: Alert = {
      id: generateId(),
      message,
      variant,
    };

    set((state) => ({
      alerts: [...state.alerts, newAlert],
    }));

    if (duration > 0) {
      setTimeout(() => {
        useAlertStore.getState().removeAlert(newAlert.id);
      }, duration);
    }
  },

  removeAlert: (id: string): void => {
    set((state) => ({
      alerts: state.alerts.filter((alert) => alert.id !== id),
    }));
  },
}));
