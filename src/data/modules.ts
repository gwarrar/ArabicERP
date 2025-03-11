import { Module, ModulePackageAssignment } from "@/types/saas";

export const modules: Module[] = [
  {
    id: "sales",
    name: "المبيعات",
    description: "إدارة المبيعات والفواتير ونقاط البيع والعملاء",
    icon: "shopping-cart",
    status: "active",
    requiredForCore: true,
    features: [
      {
        id: "invoices",
        name: "الفواتير",
        description: "إنشاء وإدارة فواتير المبيعات",
      },
      {
        id: "pos",
        name: "نقاط البيع",
        description: "واجهة نقاط البيع للمعاملات السريعة",
      },
      {
        id: "customers",
        name: "العملاء",
        description: "إدارة بيانات العملاء والحسابات",
      },
      {
        id: "orders",
        name: "الطلبات",
        description: "إدارة طلبات المبيعات والتسليم",
      },
    ],
  },
  {
    id: "purchases",
    name: "المشتريات",
    description: "إدارة المشتريات والموردين وطلبات الشراء",
    icon: "truck",
    status: "active",
    requiredForCore: true,
    features: [
      {
        id: "purchase-orders",
        name: "طلبات الشراء",
        description: "إنشاء وإدارة طلبات الشراء",
      },
      {
        id: "suppliers",
        name: "الموردين",
        description: "إدارة بيانات الموردين والحسابات",
      },
      {
        id: "receiving",
        name: "استلام البضائع",
        description: "إدارة عمليات استلام البضائع",
      },
    ],
  },
  {
    id: "inventory",
    name: "المخزون",
    description: "إدارة المخزون والمستودعات والمنتجات",
    icon: "package",
    status: "active",
    requiredForCore: true,
    features: [
      {
        id: "products",
        name: "المنتجات",
        description: "إدارة قائمة المنتجات والأصناف",
      },
      {
        id: "warehouses",
        name: "المستودعات",
        description: "إدارة المستودعات ومواقع التخزين",
      },
      {
        id: "stock-movements",
        name: "حركة المخزون",
        description: "تتبع حركة المخزون والتحويلات",
      },
      {
        id: "inventory-count",
        name: "جرد المخزون",
        description: "إجراء عمليات الجرد وتسوية الفروقات",
      },
    ],
  },
  {
    id: "accounting",
    name: "المحاسبة",
    description: "النظام المحاسبي وإدارة الحسابات والتقارير المالية",
    icon: "bar-chart-3",
    status: "active",
    requiredForCore: true,
    features: [
      {
        id: "general-ledger",
        name: "دفتر الأستاذ العام",
        description: "إدارة القيود المحاسبية ودفتر الأستاذ",
      },
      {
        id: "accounts",
        name: "شجرة الحسابات",
        description: "إدارة هيكل الحسابات المحاسبية",
      },
      {
        id: "financial-reports",
        name: "التقارير المالية",
        description: "إنشاء وعرض التقارير المالية المختلفة",
      },
    ],
  },
  {
    id: "reports",
    name: "التقارير",
    description: "تقارير شاملة لجميع أقسام النظام",
    icon: "file-text",
    status: "active",
    requiredForCore: true,
    features: [
      {
        id: "sales-reports",
        name: "تقارير المبيعات",
        description: "تقارير تفصيلية عن المبيعات والإيرادات",
      },
      {
        id: "inventory-reports",
        name: "تقارير المخزون",
        description: "تقارير عن حالة المخزون والمنتجات",
      },
      {
        id: "financial-statements",
        name: "القوائم المالية",
        description: "الميزانية وقائمة الدخل والتدفقات النقدية",
      },
    ],
  },
  {
    id: "crm",
    name: "إدارة العملاء",
    description: "إدارة علاقات العملاء والفرص البيعية والحملات",
    icon: "users",
    status: "active",
    requiredForCore: false,
    features: [
      {
        id: "contacts",
        name: "جهات الاتصال",
        description: "إدارة جهات الاتصال والعملاء المحتملين",
      },
      {
        id: "opportunities",
        name: "الفرص البيعية",
        description: "إدارة وتتبع الفرص البيعية",
      },
      {
        id: "campaigns",
        name: "الحملات التسويقية",
        description: "إدارة الحملات التسويقية وقياس أدائها",
      },
      {
        id: "loyalty",
        name: "برامج الولاء",
        description: "إدارة برامج ولاء العملاء والمكافآت",
      },
    ],
  },
  {
    id: "hr",
    name: "الموارد البشرية",
    description: "إدارة الموظفين والرواتب والإجازات والتقييم",
    icon: "users",
    status: "active",
    requiredForCore: false,
    dependencies: [],
    features: [
      {
        id: "employees",
        name: "الموظفين",
        description: "إدارة بيانات الموظفين والملفات الشخصية",
      },
      {
        id: "attendance",
        name: "الحضور والانصراف",
        description: "إدارة سجلات الحضور والانصراف",
      },
      {
        id: "payroll",
        name: "الرواتب",
        description: "إدارة الرواتب والمستحقات والخصومات",
      },
      {
        id: "performance",
        name: "تقييم الأداء",
        description: "إدارة عمليات تقييم أداء الموظفين",
      },
    ],
  },
  {
    id: "manufacturing",
    name: "التصنيع",
    description: "إدارة عمليات التصنيع والإنتاج",
    icon: "factory",
    status: "active",
    requiredForCore: false,
    dependencies: ["inventory"],
    features: [
      {
        id: "bom",
        name: "قوائم المواد",
        description: "إدارة قوائم المواد والمكونات",
      },
      {
        id: "production-orders",
        name: "أوامر الإنتاج",
        description: "إنشاء وإدارة أوامر الإنتاج",
      },
      {
        id: "work-centers",
        name: "مراكز العمل",
        description: "إدارة مراكز العمل وخطوط الإنتاج",
      },
      {
        id: "quality-control",
        name: "مراقبة الجودة",
        description: "إدارة عمليات فحص الجودة والمعايير",
      },
    ],
  },
];

// بيانات تجريبية لتعيين الوحدات للباقات
export const modulePackageAssignments: ModulePackageAssignment[] = [
  // الباقة الأساسية
  { moduleId: "sales", packageId: "pkg-001", isEnabled: true },
  { moduleId: "purchases", packageId: "pkg-001", isEnabled: true },
  { moduleId: "inventory", packageId: "pkg-001", isEnabled: true },
  { moduleId: "accounting", packageId: "pkg-001", isEnabled: true },
  { moduleId: "reports", packageId: "pkg-001", isEnabled: true },
  { moduleId: "crm", packageId: "pkg-001", isEnabled: true },
  { moduleId: "hr", packageId: "pkg-001", isEnabled: false },
  { moduleId: "manufacturing", packageId: "pkg-001", isEnabled: false },

  // الباقة المتقدمة
  { moduleId: "sales", packageId: "pkg-002", isEnabled: true },
  { moduleId: "purchases", packageId: "pkg-002", isEnabled: true },
  { moduleId: "inventory", packageId: "pkg-002", isEnabled: true },
  { moduleId: "accounting", packageId: "pkg-002", isEnabled: true },
  { moduleId: "reports", packageId: "pkg-002", isEnabled: true },
  { moduleId: "crm", packageId: "pkg-002", isEnabled: true },
  { moduleId: "hr", packageId: "pkg-002", isEnabled: true },
  { moduleId: "manufacturing", packageId: "pkg-002", isEnabled: false },

  // الباقة المتكاملة
  { moduleId: "sales", packageId: "pkg-003", isEnabled: true },
  { moduleId: "purchases", packageId: "pkg-003", isEnabled: true },
  { moduleId: "inventory", packageId: "pkg-003", isEnabled: true },
  { moduleId: "accounting", packageId: "pkg-003", isEnabled: true },
  { moduleId: "reports", packageId: "pkg-003", isEnabled: true },
  { moduleId: "crm", packageId: "pkg-003", isEnabled: true },
  { moduleId: "hr", packageId: "pkg-003", isEnabled: true },
  { moduleId: "manufacturing", packageId: "pkg-003", isEnabled: true },

  // باقة المؤسسات
  { moduleId: "sales", packageId: "pkg-004", isEnabled: true },
  { moduleId: "purchases", packageId: "pkg-004", isEnabled: true },
  { moduleId: "inventory", packageId: "pkg-004", isEnabled: true },
  { moduleId: "accounting", packageId: "pkg-004", isEnabled: true },
  { moduleId: "reports", packageId: "pkg-004", isEnabled: true },
  { moduleId: "crm", packageId: "pkg-004", isEnabled: true },
  { moduleId: "hr", packageId: "pkg-004", isEnabled: true },
  { moduleId: "manufacturing", packageId: "pkg-004", isEnabled: true },
];

// بيانات تجريبية للباقات
export const packagesData = [
  {
    id: "pkg-001",
    name: "الباقة الأساسية",
    description: "باقة أساسية للشركات الصغيرة",
    monthlyPrice: 300,
    yearlyPrice: 3240, // 10% خصم
    status: "نشط",
    features: [
      { name: "المبيعات", included: true },
      { name: "المشتريات", included: true },
      { name: "المخزون", included: true },
      { name: "المحاسبة", included: true },
      { name: "التقارير", included: true },
      { name: "إدارة العملاء", included: true },
      { name: "الموارد البشرية", included: false },
      { name: "التصنيع", included: false },
    ],
    limits: {
      users: 5,
      storage: "5 GB",
      customers: 100,
      products: 500,
    },
    createdAt: "2024-01-01",
    updatedAt: "2024-01-01",
  },
  {
    id: "pkg-002",
    name: "الباقة المتقدمة",
    description: "باقة متقدمة للشركات المتوسطة",
    monthlyPrice: 400,
    yearlyPrice: 4320, // 10% خصم
    status: "نشط",
    features: [
      { name: "المبيعات", included: true },
      { name: "المشتريات", included: true },
      { name: "المخزون", included: true },
      { name: "المحاسبة", included: true },
      { name: "التقارير", included: true },
      { name: "إدارة العملاء", included: true },
      { name: "الموارد البشرية", included: true },
      { name: "التصنيع", included: false },
    ],
    limits: {
      users: 15,
      storage: "20 GB",
      customers: 500,
      products: 2000,
    },
    createdAt: "2024-01-01",
    updatedAt: "2024-02-15",
  },
  {
    id: "pkg-003",
    name: "الباقة المتكاملة",
    description: "باقة شاملة للشركات الكبيرة",
    monthlyPrice: 500,
    yearlyPrice: 5400, // 10% خصم
    status: "نشط",
    features: [
      { name: "المبيعات", included: true },
      { name: "المشتريات", included: true },
      { name: "المخزون", included: true },
      { name: "المحاسبة", included: true },
      { name: "التقارير", included: true },
      { name: "إدارة العملاء", included: true },
      { name: "الموارد البشرية", included: true },
      { name: "التصنيع", included: true },
    ],
    limits: {
      users: 50,
      storage: "100 GB",
      customers: "غير محدود",
      products: "غير محدود",
    },
    createdAt: "2024-01-01",
    updatedAt: "2024-03-10",
  },
  {
    id: "pkg-004",
    name: "باقة المؤسسات",
    description: "باقة مخصصة للمؤسسات الكبرى",
    monthlyPrice: 1000,
    yearlyPrice: 10800, // 10% خصم
    status: "غير نشط",
    features: [
      { name: "المبيعات", included: true },
      { name: "المشتريات", included: true },
      { name: "المخزون", included: true },
      { name: "المحاسبة", included: true },
      { name: "التقارير", included: true },
      { name: "إدارة العملاء", included: true },
      { name: "الموارد البشرية", included: true },
      { name: "التصنيع", included: true },
    ],
    limits: {
      users: 200,
      storage: "500 GB",
      customers: "غير محدود",
      products: "غير محدود",
    },
    createdAt: "2024-02-01",
    updatedAt: "2024-02-01",
  },
];
