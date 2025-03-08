import React, { useEffect } from "react";
import { X, CheckCircle, AlertCircle, AlertTriangle, Info } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const toastVariants = cva(
  "group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md border p-6 pr-8 shadow-lg transition-all data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full",
  {
    variants: {
      variant: {
        default: "border bg-background text-foreground",
        success:
          "border-green-500 bg-green-50 text-green-900 dark:bg-green-900/20 dark:text-green-300",
        error:
          "border-red-500 bg-red-50 text-red-900 dark:bg-red-900/20 dark:text-red-300",
        warning:
          "border-yellow-500 bg-yellow-50 text-yellow-900 dark:bg-yellow-900/20 dark:text-yellow-300",
        info: "border-blue-500 bg-blue-50 text-blue-900 dark:bg-blue-900/20 dark:text-blue-300",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

const icons = {
  success: (
    <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
  ),
  error: <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400" />,
  warning: (
    <AlertTriangle className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
  ),
  info: <Info className="h-5 w-5 text-blue-600 dark:text-blue-400" />,
  default: <Info className="h-5 w-5" />,
};

export interface ToastProps extends VariantProps<typeof toastVariants> {
  id: string;
  title?: string;
  description?: string;
  variant?: "default" | "success" | "error" | "warning" | "info";
  duration?: number;
  onClose: (id: string) => void;
}

export const Toast = ({
  id,
  title,
  description,
  variant = "default",
  duration = 5000,
  onClose,
}: ToastProps) => {
  useEffect(() => {
    if (duration) {
      const timer = setTimeout(() => {
        onClose(id);
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [duration, id, onClose]);

  return (
    <div
      className={cn(
        toastVariants({ variant }),
        "max-w-md",
        "rtl:space-x-reverse",
      )}
      data-state="open"
    >
      <div className="flex items-start gap-3 rtl:flex-row-reverse">
        <div className="shrink-0">{icons[variant]}</div>
        <div className="flex-1">
          {title && <div className="font-medium">{title}</div>}
          {description && (
            <div className="mt-1 text-sm opacity-90">{description}</div>
          )}
        </div>
      </div>
      <button
        onClick={() => onClose(id)}
        className="absolute left-2 top-2 rtl:left-auto rtl:right-2 rounded-md p-1 text-foreground/50 opacity-0 transition-opacity hover:text-foreground focus:opacity-100 focus:outline-none focus:ring-2 group-hover:opacity-100"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
};
