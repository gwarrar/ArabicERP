// Customer types
export interface Customer {
  id: string;
  name: string;
  phone?: string;
  email?: string;
  address?: string;
  balance: number;
  totalSpent: number;
  orderCount: number;
  firstOrder?: string;
  lastOrder?: string;
  status: "active" | "inactive";
}

// Product types
export interface Product {
  id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  cost: number;
  stock: number;
  barcode: string;
  image: string;
}

// Sales Order types
export interface SalesOrderItem {
  product: string | Product;
  quantity: number;
  price: number;
  discount: number;
  total: number;
}

export interface SalesOrder {
  id: string;
  customer: string | Customer;
  date: string;
  dueDate: string;
  branch: string;
  amount: number;
  status: "draft" | "pending" | "completed" | "cancelled";
  paymentStatus: "pending" | "partial" | "paid" | "cancelled";
  items: SalesOrderItem[];
}

// Sales Invoice types
export interface SalesInvoice extends SalesOrder {
  invoiceNumber: string;
  paymentMethod: "cash" | "credit" | "card" | "bank";
  notes?: string;
  tax: number;
  subtotal: number;
  totalDiscount: number;
}

// Point of Sale types
export interface POSCartItem {
  id: string;
  product: Product;
  quantity: number;
  price: number;
  discount: number;
  total: number;
}

export interface POSTransaction {
  id: string;
  date: string;
  customer: string | Customer;
  items: POSCartItem[];
  subtotal: number;
  tax: number;
  total: number;
  paymentMethod: "cash" | "card" | "bank";
  amountPaid: number;
  change: number;
  status: "completed" | "cancelled";
}

// Sales Report types
export interface SalesReport {
  period: "daily" | "weekly" | "monthly" | "yearly";
  startDate: string;
  endDate: string;
  totalSales: number;
  totalCost: number;
  grossProfit: number;
  grossMargin: number;
  orderCount: number;
  averageOrderValue: number;
  topProducts: {
    product: string;
    quantity: number;
    sales: number;
  }[];
  topCategories: {
    category: string;
    sales: number;
    percentage: number;
  }[];
  salesByBranch: {
    branch: string;
    sales: number;
    percentage: number;
  }[];
}
