/**
 * Format a date to Arabic locale
 */
export const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString("ar-SA");
};

/**
 * Format a number as currency
 */
export const formatCurrency = (amount: number): string => {
  return `${amount.toLocaleString()} ₴`;
};

/**
 * Get badge class based on status
 */
export const getStatusBadgeClass = (status: string): string => {
  switch (status) {
    case "نشط":
      return "bg-green-50 text-green-700 border-green-200";
    case "غير نشط":
      return "bg-gray-50 text-gray-700 border-gray-200";
    case "مكتمل":
      return "bg-green-50 text-green-700 border-green-200";
    case "قيد التنفيذ":
      return "bg-blue-50 text-blue-700 border-blue-200";
    case "ملغي":
      return "bg-amber-50 text-amber-700 border-amber-200";
    default:
      return "bg-gray-50 text-gray-700 border-gray-200";
  }
};

/**
 * Get balance text class based on balance type
 */
export const getBalanceTextClass = (balanceType: string): string => {
  switch (balanceType) {
    case "دائن":
      return "text-green-600";
    case "مدين":
      return "text-red-600";
    default:
      return "text-gray-600";
  }
};

/**
 * Get credit limit usage color
 */
export const getCreditLimitUsageColor = (usagePercentage: number): string => {
  if (usagePercentage > 80) return "bg-red-500";
  if (usagePercentage > 50) return "bg-amber-500";
  return "bg-green-500";
};
