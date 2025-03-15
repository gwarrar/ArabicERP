import { Container, ContainerItem } from "./inventory";

// Container Expense types
export interface ContainerExpense {
  id: string;
  containerId: string;
  containerName: string;
  date: string;
  expenseType:
    | "shipping"
    | "customs"
    | "clearance"
    | "transportation"
    | "handling"
    | "insurance"
    | "storage"
    | "other";
  description: string;
  amount: number;
  currency: string;
  exchangeRate?: number;
  amountLocal?: number;
  paymentMethod: string;
  paymentStatus: "pending" | "paid" | "partially_paid";
  paymentDate?: string;
  paymentReference?: string;
  beneficiary: string;
  beneficiaryId?: string;
  documents?: ContainerExpenseDocument[];
  notes?: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface ContainerExpenseDocument {
  id: string;
  name: string;
  type: string;
  url: string;
  uploadedAt: string;
  uploadedBy: string;
}

export interface ContainerCostDistribution {
  id: string;
  containerId: string;
  containerName: string;
  distributionDate: string;
  distributionMethod:
    | "by_value"
    | "by_weight"
    | "by_volume"
    | "by_quantity"
    | "custom";
  totalExpenses: number;
  currency: string;
  items: ContainerCostDistributionItem[];
  notes?: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface ContainerCostDistributionItem {
  id: string;
  productId: string;
  productName: string;
  quantity: number;
  unit: string;
  originalUnitCost: number;
  originalTotalCost: number;
  distributionFactor: number;
  distributionAmount: number;
  finalUnitCost: number;
  finalTotalCost: number;
  notes?: string;
}
