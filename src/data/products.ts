// Sample products data
export const products = [
  {
    id: "1",
    name: "قميص قطني",
    description: "قميص قطني بأكمام طويلة",
    category: "ملابس",
    price: 450,
    cost: 250,
    stock: 120,
    barcode: "1000001",
    image:
      "https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?w=300&q=80",
  },
  {
    id: "2",
    name: "بنطلون جينز",
    description: "بنطلون جينز كلاسيكي",
    category: "ملابس",
    price: 650,
    cost: 350,
    stock: 85,
    barcode: "1000002",
    image:
      "https://images.unsplash.com/photo-1542272604-787c3835535d?w=300&q=80",
  },
  {
    id: "3",
    name: "حذاء رياضي",
    description: "حذاء رياضي مريح",
    category: "أحذية",
    price: 850,
    cost: 450,
    stock: 60,
    barcode: "1000003",
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&q=80",
  },
  {
    id: "4",
    name: "حقيبة يد",
    description: "حقيبة يد جلدية أنيقة",
    category: "إكسسوارات",
    price: 850,
    cost: 450,
    stock: 40,
    barcode: "1000004",
    image:
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=300&q=80",
  },
  {
    id: "5",
    name: "ساعة يد",
    description: "ساعة يد فاخرة",
    category: "إكسسوارات",
    price: 1250,
    cost: 750,
    stock: 25,
    barcode: "1000005",
    image:
      "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=300&q=80",
  },
  {
    id: "6",
    name: "تي شيرت",
    description: "تي شيرت قطني بأكمام قصيرة",
    category: "ملابس",
    price: 350,
    cost: 180,
    stock: 150,
    barcode: "1000006",
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300&q=80",
  },
  {
    id: "7",
    name: "سترة",
    description: "سترة شتوية دافئة",
    category: "ملابس",
    price: 950,
    cost: 550,
    stock: 45,
    barcode: "1000007",
    image:
      "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=300&q=80",
  },
  {
    id: "8",
    name: "حذاء كلاسيكي",
    description: "حذاء كلاسيكي جلدي",
    category: "أحذية",
    price: 950,
    cost: 550,
    stock: 35,
    barcode: "1000008",
    image:
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=300&q=80",
  },
  {
    id: "9",
    name: "نظارة شمسية",
    description: "نظارة شمسية عصرية",
    category: "إكسسوارات",
    price: 550,
    cost: 250,
    stock: 55,
    barcode: "1000009",
    image:
      "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=300&q=80",
  },
  {
    id: "10",
    name: "قبعة",
    description: "قبعة أنيقة",
    category: "إكسسوارات",
    price: 350,
    cost: 150,
    stock: 70,
    barcode: "1000010",
    image:
      "https://images.unsplash.com/photo-1521369909029-2afed882baee?w=300&q=80",
  },
  {
    id: "11",
    name: "قميص رسمي",
    description: "قميص رسمي للمناسبات",
    category: "ملابس",
    price: 550,
    cost: 300,
    stock: 65,
    barcode: "1000011",
    image:
      "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?w=300&q=80",
  },
  {
    id: "12",
    name: "بنطلون رياضي",
    description: "بنطلون رياضي مريح",
    category: "ملابس",
    price: 450,
    cost: 220,
    stock: 90,
    barcode: "1000012",
    image:
      "https://images.unsplash.com/photo-1552902865-b72c031ac5ea?w=300&q=80",
  },
];

// Product categories
export const productCategories = [
  { id: "1", name: "ملابس", count: 5 },
  { id: "2", name: "أحذية", count: 2 },
  { id: "3", name: "إكسسوارات", count: 4 },
];

// Product inventory movements
export const inventoryMovements = [
  {
    id: "1",
    date: "2024-07-15",
    type: "purchase",
    product: "قميص قطني",
    quantity: 50,
    reference: "PO-2024-0125",
  },
  {
    id: "2",
    date: "2024-07-14",
    type: "sale",
    product: "قميص قطني",
    quantity: -5,
    reference: "SO-2024-0001",
  },
  {
    id: "3",
    date: "2024-07-14",
    type: "sale",
    product: "بنطلون جينز",
    quantity: -3,
    reference: "SO-2024-0001",
  },
  {
    id: "4",
    date: "2024-07-13",
    type: "adjustment",
    product: "حذاء رياضي",
    quantity: -2,
    reference: "ADJ-2024-0015",
  },
  {
    id: "5",
    date: "2024-07-12",
    type: "purchase",
    product: "حقيبة يد",
    quantity: 20,
    reference: "PO-2024-0124",
  },
];
