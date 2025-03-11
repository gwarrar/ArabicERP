export interface Customer {
  id: string;
  name: string;
  contactName: string;
  phone: string;
  email: string;
  city: string;
  status: "نشط" | "غير نشط";
  balance: number;
  balanceType: "دائن" | "مدين" | "متوازن";
  category: string;
  lastTransaction: string;
}

export interface Supplier {
  id: string;
  name: string;
  contactName: string;
  phone: string;
  email: string;
  city: string;
  status: "نشط" | "غير نشط";
  balance: number;
  category: string;
  lastTransaction: string;
}

export interface LedgerEntry {
  id: string;
  date: string;
  reference: string;
  description: string;
  debit: number;
  credit: number;
  balance: number;
}

export interface Booking {
  id: string;
  date: string;
  status: "قيد التنفيذ" | "مكتمل" | "ملغي";
  amount: number;
  items: number;
  deliveryDate: string;
}

export interface Statistics {
  totalTransactions: number;
  totalAmount: number;
  averageOrderValue: number;
  lastActivity: string;
  paymentTerms: string;
  creditLimit: number;
  returnRate: string;
  onTimeDelivery?: string | null;
  qualityRating?: string | null;
}
