import {
  CustomerType,
  PriceTier,
  ProductGroup,
  ProductPrice,
  Promotion,
} from "@/types/pricing";

// Niveles de precios predefinidos
export const priceTiers: PriceTier[] = [
  {
    id: "retail",
    name: "سعر التجزئة",
    description: "سعر البيع للعملاء العاديين",
    markup: 1.8, // 80% margen sobre el costo
    status: "active",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "wholesale",
    name: "سعر الجملة",
    description: "سعر البيع لتجار الجملة",
    markup: 1.4, // 40% margen sobre el costo
    minQuantity: 10,
    status: "active",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "semi-wholesale",
    name: "سعر نصف الجملة",
    description: "سعر البيع لتجار نصف الجملة",
    markup: 1.6, // 60% margen sobre el costo
    minQuantity: 5,
    status: "active",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "bulk",
    name: "سعر الكميات الكبيرة",
    description: "سعر خاص للكميات الكبيرة",
    markup: 1.3, // 30% margen sobre el costo
    minQuantity: 20,
    status: "active",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "vip",
    name: "سعر كبار العملاء",
    description: "سعر خاص لكبار العملاء",
    markup: 1.5, // 50% margen sobre el costo
    status: "active",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

// Tipos de clientes
export const customerTypes: CustomerType[] = [
  {
    id: "regular",
    name: "عميل عادي",
    description: "عملاء التجزئة العاديين",
    defaultPriceTierId: "retail",
    status: "active",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "wholesale",
    name: "تاجر جملة",
    description: "تجار الجملة",
    defaultPriceTierId: "wholesale",
    status: "active",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "semi-wholesale",
    name: "تاجر نصف جملة",
    description: "تجار نصف الجملة",
    defaultPriceTierId: "semi-wholesale",
    status: "active",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "vip",
    name: "عميل مميز",
    description: "كبار العملاء المميزين",
    defaultPriceTierId: "vip",
    discountPercentage: 5, // 5% descuento adicional
    status: "active",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

// Precios específicos para productos
export const productPrices: ProductPrice[] = [
  // Precios para قميص قطني (ID: 1)
  {
    id: "1-retail",
    productId: "1",
    tierId: "retail",
    price: 450, // Precio normal de venta
    status: "active",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "1-wholesale",
    productId: "1",
    tierId: "wholesale",
    price: 350, // Precio mayorista
    minQuantity: 10,
    status: "active",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "1-semi-wholesale",
    productId: "1",
    tierId: "semi-wholesale",
    price: 400, // Precio semi-mayorista
    minQuantity: 5,
    status: "active",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "1-bulk",
    productId: "1",
    tierId: "bulk",
    price: 325, // Precio para grandes cantidades
    minQuantity: 20,
    status: "active",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },

  // Precios para بنطلون جينز (ID: 2)
  {
    id: "2-retail",
    productId: "2",
    tierId: "retail",
    price: 650,
    status: "active",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "2-wholesale",
    productId: "2",
    tierId: "wholesale",
    price: 490,
    minQuantity: 10,
    status: "active",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

// Grupos de productos
export const productGroups: ProductGroup[] = [
  {
    id: "summer-collection",
    name: "تشكيلة الصيف",
    description: "منتجات تشكيلة الصيف",
    productIds: ["1", "6", "9", "10"], // قميص قطني, تي شيرت, نظارة شمسية, قبعة
    status: "active",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "winter-collection",
    name: "تشكيلة الشتاء",
    description: "منتجات تشكيلة الشتاء",
    productIds: ["7", "8"], // سترة, حذاء كلاسيكي
    status: "active",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "accessories",
    name: "إكسسوارات",
    description: "جميع الإكسسوارات",
    productIds: ["4", "5", "9", "10"], // حقيبة يد, ساعة يد, نظارة شمسية, قبعة
    status: "active",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

// Promociones
export const promotions: Promotion[] = [
  {
    id: "summer-sale",
    name: "تخفيضات الصيف",
    description: "خصم 15% على تشكيلة الصيف",
    type: "percentage",
    value: 15, // 15% descuento
    startDate: "2024-06-01T00:00:00Z",
    endDate: "2024-08-31T23:59:59Z",
    productGroupIds: ["summer-collection"],
    usedCount: 0,
    status: "active",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "buy-one-get-one",
    name: "اشتري واحد واحصل على الثاني بنصف السعر",
    description: "اشتري قميص واحصل على الثاني بنصف السعر",
    type: "second_unit",
    value: 50, // 50% descuento en la segunda unidad
    startDate: "2024-07-01T00:00:00Z",
    endDate: "2024-07-31T23:59:59Z",
    productIds: ["1", "6", "11"], // قميص قطني, تي شيرت, قميص رسمي
    minQuantity: 2,
    usedCount: 0,
    status: "active",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "vip-discount",
    name: "خصم كبار العملاء",
    description: "خصم إضافي 10% لكبار العملاء",
    type: "percentage",
    value: 10, // 10% descuento adicional
    startDate: "2024-01-01T00:00:00Z",
    endDate: "2024-12-31T23:59:59Z",
    customerTierIds: ["vip"],
    usedCount: 0,
    status: "active",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "bundle-discount",
    name: "عرض الحقيبة والساعة",
    description: "خصم 200 عند شراء حقيبة وساعة معاً",
    type: "fixed",
    value: 200, // Descuento fijo de 200
    startDate: "2024-07-01T00:00:00Z",
    endDate: "2024-08-15T23:59:59Z",
    productIds: ["4", "5"], // حقيبة يد, ساعة يد
    minQuantity: 2,
    usedCount: 0,
    status: "active",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

// Función para calcular el precio según el tipo de cliente y cantidad
export const calculatePrice = (
  productId: string,
  customerTypeId: string = "regular",
  quantity: number = 1,
): number => {
  // Obtener el tipo de cliente
  const customerType =
    customerTypes.find((ct) => ct.id === customerTypeId) || customerTypes[0];

  // Obtener el nivel de precio predeterminado para este tipo de cliente
  const defaultTierId = customerType.defaultPriceTierId;

  // Buscar si hay un precio específico para este producto y nivel
  let productPrice = productPrices.find(
    (pp) =>
      pp.productId === productId &&
      pp.tierId === defaultTierId &&
      (!pp.minQuantity || quantity >= pp.minQuantity),
  );

  // Si no hay precio específico, buscar otros niveles de precio basados en la cantidad
  if (!productPrice) {
    // Ordenar niveles de precio por cantidad mínima (de mayor a menor)
    const applicablePrices = productPrices
      .filter(
        (pp) =>
          pp.productId === productId &&
          (!pp.minQuantity || quantity >= pp.minQuantity),
      )
      .sort((a, b) => (b.minQuantity || 0) - (a.minQuantity || 0));

    if (applicablePrices.length > 0) {
      productPrice = applicablePrices[0];
    }
  }

  // Si aún no hay precio específico, calcular basado en el costo y el margen
  if (!productPrice) {
    const product = products.find((p) => p.id === productId);
    if (!product) return 0;

    const tier =
      priceTiers.find((t) => t.id === defaultTierId) || priceTiers[0];
    return Math.round(product.cost * tier.markup);
  }

  // Aplicar descuento adicional del tipo de cliente si existe
  let finalPrice = productPrice.price;
  if (customerType.discountPercentage) {
    finalPrice = finalPrice * (1 - customerType.discountPercentage / 100);
  }

  return Math.round(finalPrice);
};

// Función para aplicar promociones al carrito
export const applyPromotions = (
  items: Array<{ productId: string; quantity: number; price: number }>,
  customerTypeId: string = "regular",
): {
  items: Array<{
    productId: string;
    quantity: number;
    price: number;
    discount: number;
  }>;
  totalDiscount: number;
} => {
  // Clonar los items para no modificar el original
  const processedItems = items.map((item) => ({
    ...item,
    discount: 0,
  }));

  let totalDiscount = 0;

  // Filtrar promociones activas
  const activePromotions = promotions.filter((promo) => {
    const now = new Date();
    const startDate = new Date(promo.startDate);
    const endDate = new Date(promo.endDate);
    return (
      promo.status === "active" &&
      now >= startDate &&
      now <= endDate &&
      (!promo.customerTierIds || promo.customerTierIds.includes(customerTypeId))
    );
  });

  // Aplicar cada promoción
  activePromotions.forEach((promo) => {
    // Promociones de porcentaje
    if (promo.type === "percentage") {
      processedItems.forEach((item, index) => {
        // Verificar si el producto está incluido en la promoción
        const isIncluded =
          (!promo.productIds && !promo.productGroupIds) || // Aplica a todos los productos
          (promo.productIds && promo.productIds.includes(item.productId)) || // Producto específico
          (promo.productGroupIds &&
            promo.productGroupIds.some((groupId) => {
              // Grupo de productos
              const group = productGroups.find((g) => g.id === groupId);
              return group && group.productIds.includes(item.productId);
            }));

        if (isIncluded) {
          const discount = Math.round(
            item.price * (promo.value / 100) * item.quantity,
          );
          processedItems[index].discount += discount;
          totalDiscount += discount;
        }
      });
    }

    // Promociones de valor fijo
    else if (promo.type === "fixed" && promo.productIds) {
      // Verificar si todos los productos requeridos están en el carrito
      const allProductsInCart = promo.productIds.every((prodId) =>
        processedItems.some((item) => item.productId === prodId),
      );

      if (allProductsInCart) {
        // Distribuir el descuento proporcionalmente entre los productos
        const includedItems = processedItems.filter((item) =>
          promo.productIds!.includes(item.productId),
        );

        const totalValue = includedItems.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0,
        );

        includedItems.forEach((item) => {
          const itemIndex = processedItems.findIndex(
            (i) => i.productId === item.productId,
          );
          const proportion = (item.price * item.quantity) / totalValue;
          const discount = Math.round(promo.value * proportion);

          processedItems[itemIndex].discount += discount;
          totalDiscount += discount;
        });
      }
    }

    // Promoción de segunda unidad
    else if (promo.type === "second_unit" && promo.productIds) {
      promo.productIds.forEach((prodId) => {
        const itemIndex = processedItems.findIndex(
          (item) => item.productId === prodId,
        );

        if (itemIndex >= 0 && processedItems[itemIndex].quantity >= 2) {
          const item = processedItems[itemIndex];
          const pairs = Math.floor(item.quantity / 2);
          const discount = Math.round(item.price * (promo.value / 100) * pairs);

          processedItems[itemIndex].discount += discount;
          totalDiscount += discount;
        }
      });
    }
  });

  return { items: processedItems, totalDiscount };
};

// Importar productos para la función calculatePrice
import { products } from "./products";
