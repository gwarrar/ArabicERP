import React from "react";
import { AlertCircle, CheckCircle, Info, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface SmartAlertProps {
  title: string;
  message: string;
  type?: "success" | "warning" | "error" | "info";
  onClose?: () => void;
}

const SmartAlert = ({
  title,
  message,
  type = "info",
  onClose,
}: SmartAlertProps) => {
  // Define colors based on alert type
  const getAlertStyles = () => {
    switch (type) {
      case "success":
        return {
          bg: "bg-green-50",
          border: "border-green-200",
          icon: <CheckCircle className="h-5 w-5 text-green-500" />,
          titleColor: "text-green-800",
          messageColor: "text-green-700",
        };
      case "warning":
        return {
          bg: "bg-amber-50",
          border: "border-amber-200",
          icon: <AlertCircle className="h-5 w-5 text-amber-500" />,
          titleColor: "text-amber-800",
          messageColor: "text-amber-700",
        };
      case "error":
        return {
          bg: "bg-red-50",
          border: "border-red-200",
          icon: <AlertCircle className="h-5 w-5 text-red-500" />,
          titleColor: "text-red-800",
          messageColor: "text-red-700",
        };
      case "info":
      default:
        return {
          bg: "bg-blue-50",
          border: "border-blue-200",
          icon: <Info className="h-5 w-5 text-blue-500" />,
          titleColor: "text-blue-800",
          messageColor: "text-blue-700",
        };
    }
  };

  const styles = getAlertStyles();

  return (
    <div
      className={cn(
        "flex items-start p-3 rounded-md border",
        styles.bg,
        styles.border,
      )}
      dir="rtl"
    >
      <div className="flex-shrink-0 ml-3 mt-0.5">{styles.icon}</div>
      <div className="flex-1">
        <h3 className={cn("text-sm font-medium", styles.titleColor)}>
          {title}
        </h3>
        <p className={cn("text-sm mt-1", styles.messageColor)}>{message}</p>
      </div>
      {onClose && (
        <Button
          variant="ghost"
          size="icon"
          className="flex-shrink-0 mr-3 mt-0.5 h-6 w-6 rounded-full hover:bg-transparent"
          onClick={onClose}
        >
          <X className="h-4 w-4 text-gray-500" />
        </Button>
      )}
    </div>
  );
};

export default SmartAlert;
