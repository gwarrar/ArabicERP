// Tipos para el sistema de precios

// Niveles de precios para diferentes tipos de clientes
export interface PriceTier {
  id: string;
  name: string; // Nombre del nivel de precio (ej. "تجزئة", "جملة", "نصف جملة")
  description?: string;
  markup: number; // Porcentaje de margen sobre el costo (ej. 1.5 = 50% de margen)
  minQuantity?: number; // Cantidad mínima para aplicar este nivel
  status: "active" | "inactive";
  createdAt: string;
  updatedAt: string;
}

// Precios específicos para productos
export interface ProductPrice {
  id: string;
  productId: string;
  tierId: string;
  price: number; // Precio específico para este nivel
  minQuantity?: number; // Cantidad mínima para aplicar este precio
  startDate?: string; // Fecha de inicio (para precios temporales)
  endDate?: string; // Fecha de fin (para precios temporales)
  status: "active" | "inactive";
  createdAt: string;
  updatedAt: string;
}

// Tipos de promociones
export type PromotionType =
  | "percentage" // Descuento porcentual
  | "fixed" // Descuento de valor fijo
  | "buy_x_get_y" // Compre X y obtenga Y gratis
  | "bundle" // Paquete de productos con precio especial
  | "second_unit" // Segunda unidad con descuento
  | "free_shipping"; // Envío gratuito

// Promociones
export interface Promotion {
  id: string;
  name: string;
  description?: string;
  type: PromotionType;
  value: number; // Valor del descuento (porcentaje o valor fijo)
  startDate: string;
  endDate: string;
  minPurchaseAmount?: number; // Monto mínimo de compra
  minQuantity?: number; // Cantidad mínima de productos
  maxUsesPerCustomer?: number; // Máximo de usos por cliente
  maxUses?: number; // Máximo de usos en total
  usedCount: number; // Contador de usos
  customerTierIds?: string[]; // Niveles de clientes aplicables
  productIds?: string[]; // Productos específicos
  productGroupIds?: string[]; // Grupos de productos
  excludedProductIds?: string[]; // Productos excluidos
  couponCode?: string; // Código de cupón
  status: "active" | "inactive" | "expired";
  createdAt: string;
  updatedAt: string;
}

// Grupos de productos
export interface ProductGroup {
  id: string;
  name: string;
  description?: string;
  productIds: string[];
  status: "active" | "inactive";
  createdAt: string;
  updatedAt: string;
}

// Tipos de clientes
export interface CustomerType {
  id: string;
  name: string; // Nombre del tipo de cliente (ej. "تجزئة", "جملة")
  description?: string;
  defaultPriceTierId: string; // Nivel de precio predeterminado
  discountPercentage?: number; // Descuento adicional para este tipo
  status: "active" | "inactive";
  createdAt: string;
  updatedAt: string;
}
