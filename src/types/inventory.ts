// Product Category types
export interface ProductCategory {
  id: string;
  name: string;
  description?: string;
  parentId?: string; // For hierarchical categories
  children?: ProductCategory[];
  status: "active" | "inactive";
  createdAt: string;
  updatedAt: string;
}

// Product types
export interface Product {
  id: string;
  name: string;
  description: string;
  sku: string;
  barcode?: string;
  categoryId: string;
  category?: string;
  unit: string;
  price: number;
  cost: number;
  minStock: number;
  currentStock: number;
  warehouse: string;
  warehouseId: string;
  status: "active" | "inactive";
  image?: string;
  createdAt: string;
  updatedAt: string;
}

// Warehouse types
export interface Warehouse {
  id: string;
  name: string;
  location: string;
  manager: string;
  itemCount: number;
  capacity: number;
  status: "active" | "inactive";
  description: string;
  // New fields for warehouse layout
  floors?: number;
  aisles?: number;
  sections?: number;
  shelves?: number;
  layout?: WarehouseLayout;
  createdAt: string;
  updatedAt: string;
}

// Stock Movement types
export interface StockMovementItem {
  product: string;
  productId: string;
  quantity: number;
  unit: string;
}

export interface StockMovement {
  id: string;
  date: string;
  type: "استلام" | "صرف" | "نقل" | "تعديل";
  reference: string;
  sourceWarehouse: string;
  sourceWarehouseId?: string;
  destinationWarehouse: string;
  destinationWarehouseId?: string;
  items: StockMovementItem[];
  notes?: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

// Fabric Roll types
export interface FabricRoll {
  id: string;
  serialNumber: string; // رقم تسلسلي فريد
  barcode: string; // باركود/QR
  name: string;
  type: string; // نوع القماش
  color: string; // لون القماش
  weight: number; // وزن الرولون
  length: number; // طول القماش بالمتر
  width: number; // عرض القماش بالسنتيمتر
  supplier: string; // المورد
  supplierId?: string; // معرف المورد
  receivedDate: string; // تاريخ الاستلام
  expiryDate?: string; // تاريخ انتهاء الصلاحية (اختياري)

  // موقع التخزين
  warehouseId: string;
  shelfNumber: string; // رقم الرف
  sectionNumber: string; // رقم القسم
  aisleNumber: string; // رقم الممر
  floorNumber: string; // رقم الطابق

  status: "available" | "reserved" | "used" | "damaged";
  currentStock: number;
  minStock: number;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

// Warehouse Layout types
export interface WarehouseLayout {
  floors: WarehouseFloor[];
}

export interface WarehouseFloor {
  floorNumber: string;
  aisles: WarehouseAisle[];
}

export interface WarehouseAisle {
  aisleNumber: string;
  sections: WarehouseSection[];
}

export interface WarehouseSection {
  sectionNumber: string;
  shelves: WarehouseShelf[];
}

export interface WarehouseShelf {
  shelfNumber: string;
  items: FabricRoll[];
  capacity: number;
  occupiedSpace: number;
}

// Container types
export interface Container {
  id: string;
  name: string;
  trackingNumber?: string;
  arrivalDate: string;
  expectedArrivalDate?: string;
  status:
    | "pending"
    | "in_transit"
    | "arrived"
    | "cleared"
    | "received"
    | "completed";
  supplier: string;
  supplierId: string;
  origin: string;
  destination: string;
  shippingCompany?: string;
  shippingMethod?: string;
  containerType?: string;
  containerSize?: string;
  weight?: number;
  volume?: number;
  expectedItems: ContainerItem[];
  actualItems?: ContainerItem[];
  linkedInvoices?: ContainerLinkedInvoice[];
  expenses?: ContainerExpense[];
  documents?: ContainerDocument[];
  notes?: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface ContainerItem {
  id: string;
  productId: string;
  productName: string;
  expectedQuantity: number;
  actualQuantity?: number;
  actualWeight?: number;
  actualLength?: number;
  unit: string;
  unitPrice: number;
  totalPrice: number;
  notes?: string;
}

export interface ContainerLinkedInvoice {
  id: string;
  supplier: string;
  date: string;
  amount: number;
  status: string;
}

export interface ContainerExpense {
  id: string;
  date: string;
  expenseType: string;
  description: string;
  amount: number;
  paymentStatus: "paid" | "pending";
  beneficiary: string;
}

export interface ContainerDocument {
  id: string;
  name: string;
  type: string;
  uploadedAt: string;
  size: string;
}
