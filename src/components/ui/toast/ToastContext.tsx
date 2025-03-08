import React, { createContext, useContext } from "react";
import { useToast } from "./useToast";
import { ToastContainer } from "./ToastContainer";
import { ToastProps } from "./Toast";

type ToastContextType = {
  toast: (props: Omit<ToastProps, "id" | "onClose">) => string;
  success: (props: Omit<ToastProps, "id" | "onClose" | "variant">) => string;
  error: (props: Omit<ToastProps, "id" | "onClose" | "variant">) => string;
  warning: (props: Omit<ToastProps, "id" | "onClose" | "variant">) => string;
  info: (props: Omit<ToastProps, "id" | "onClose" | "variant">) => string;
  remove: (id: string) => void;
  clearAll: () => void;
};

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider = ({
  children,
  position = "top-right",
}: {
  children: React.ReactNode;
  position?: "top-right" | "top-left" | "bottom-right" | "bottom-left";
}) => {
  const { toasts, addToast, removeToast, clearToasts } = useToast();

  const toast = (props: Omit<ToastProps, "id" | "onClose">) => addToast(props);

  const success = (props: Omit<ToastProps, "id" | "onClose" | "variant">) =>
    addToast({ ...props, variant: "success" });

  const error = (props: Omit<ToastProps, "id" | "onClose" | "variant">) =>
    addToast({ ...props, variant: "error" });

  const warning = (props: Omit<ToastProps, "id" | "onClose" | "variant">) =>
    addToast({ ...props, variant: "warning" });

  const info = (props: Omit<ToastProps, "id" | "onClose" | "variant">) =>
    addToast({ ...props, variant: "info" });

  const contextValue: ToastContextType = {
    toast,
    success,
    error,
    warning,
    info,
    remove: removeToast,
    clearAll: clearToasts,
  };

  return (
    <ToastContext.Provider value={contextValue}>
      {children}
      <ToastContainer
        toasts={toasts}
        position={position}
        onClose={removeToast}
      />
    </ToastContext.Provider>
  );
};

export const useToastContext = () => {
  const context = useContext(ToastContext);
  if (context === undefined) {
    throw new Error("useToastContext must be used within a ToastProvider");
  }
  return context;
};
