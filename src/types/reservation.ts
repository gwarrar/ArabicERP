export interface Reservation {
  id: string;
  reservationNumber: string;
  createdAt: string;
  expiresAt: string;
  status: ReservationStatus;
  type: "customer" | "manager";
  customerId?: string;
  customerName?: string;
  managerId?: string;
  managerName?: string;
  approvedById?: string;
  approvedByName?: string;
  approvedAt?: string;
  rejectedById?: string;
  rejectedByName?: string;
  rejectedAt?: string;
  rejectionReason?: string;
  notes?: string;
  items: ReservationItem[];
  totalAmount: number;
}

export interface ReservationItem {
  id: string;
  productId: string;
  productName: string;
  productSku: string;
  quantity: number;
  unit: string;
  price: number;
  warehouseId: string;
  warehouseName: string;
  fabricRollIds?: string[];
  totalAmount: number;
}

export type ReservationStatus =
  | "pending"
  | "approved"
  | "rejected"
  | "canceled"
  | "completed";
