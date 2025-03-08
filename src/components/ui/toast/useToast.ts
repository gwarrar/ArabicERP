import { useState, useCallback } from "react";
import { v4 as uuidv4 } from "uuid";
import { ToastProps } from "./Toast";

export const useToast = () => {
  const [toasts, setToasts] = useState<ToastProps[]>([]);

  const addToast = useCallback(
    ({
      title,
      description,
      variant = "default",
      duration = 5000,
    }: Omit<ToastProps, "id" | "onClose">) => {
      const id = uuidv4();
      const newToast: ToastProps = {
        id,
        title,
        description,
        variant,
        duration,
        onClose: () => removeToast(id),
      };

      setToasts((prevToasts) => [...prevToasts, newToast]);
      return id;
    },
    [],
  );

  const removeToast = useCallback((id: string) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
  }, []);

  const clearToasts = useCallback(() => {
    setToasts([]);
  }, []);

  return {
    toasts,
    addToast,
    removeToast,
    clearToasts,
  };
};
