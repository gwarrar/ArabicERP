import React from "react";
import { Toast, ToastProps } from "./Toast";
import { motion, AnimatePresence } from "framer-motion";

interface ToastContainerProps {
  toasts: ToastProps[];
  position?: "top-right" | "top-left" | "bottom-right" | "bottom-left";
  onClose: (id: string) => void;
}

const positions = {
  "top-right": "fixed top-4 right-4 flex flex-col gap-2 w-full max-w-sm z-50",
  "top-left": "fixed top-4 left-4 flex flex-col gap-2 w-full max-w-sm z-50",
  "bottom-right":
    "fixed bottom-4 right-4 flex flex-col gap-2 w-full max-w-sm z-50",
  "bottom-left":
    "fixed bottom-4 left-4 flex flex-col gap-2 w-full max-w-sm z-50",
};

export const ToastContainer = ({
  toasts,
  position = "top-right",
  onClose,
}: ToastContainerProps) => {
  // For RTL layouts, swap left/right positions
  const isRTL = document.dir === "rtl";
  let containerPosition = position;

  if (isRTL) {
    if (position === "top-right") containerPosition = "top-left";
    else if (position === "top-left") containerPosition = "top-right";
    else if (position === "bottom-right") containerPosition = "bottom-left";
    else if (position === "bottom-left") containerPosition = "bottom-right";
  }

  return (
    <div className={positions[containerPosition]}>
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 50, scale: 0.3 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
            layout
          >
            <Toast {...toast} onClose={onClose} />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
