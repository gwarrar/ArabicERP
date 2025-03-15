// بيانات تجريبية للتقارير

// بيانات الاشتراكات الشهرية
export const subscriptionsByMonthData = [
  { month: "يناير", new: 12, cancelled: 3, total: 45 },
  { month: "فبراير", new: 15, cancelled: 4, total: 56 },
  { month: "مارس", new: 18, cancelled: 5, total: 69 },
  { month: "أبريل", new: 22, cancelled: 6, total: 85 },
  { month: "مايو", new: 25, cancelled: 4, total: 106 },
  { month: "يونيو", new: 30, cancelled: 7, total: 129 },
];

// بيانات الإيرادات الشهرية
export const revenueByMonthData = [
  { month: "يناير", mrr: 13500, arr: 162000 },
  { month: "فبراير", mrr: 16800, cancelled: 201600 },
  { month: "مارس", mrr: 20700, arr: 248400 },
  { month: "أبريل", mrr: 25500, arr: 306000 },
  { month: "مايو", mrr: 31800, arr: 381600 },
  { month: "يونيو", mrr: 38700, arr: 464400 },
];

// بيانات الإيرادات حسب الباقة
export const revenueByPackageData = [
  { name: "الباقة الأساسية", value: 13500, percentage: 35 },
  { name: "الباقة المتقدمة", value: 16000, percentage: 41 },
  { name: "الباقة المتكاملة", value: 9200, percentage: 24 },
];

// بيانات العملاء حسب الباقة
export const customersByPackageData = [
  { name: "الباقة الأساسية", value: 45, percentage: 35 },
  { name: "الباقة المتقدمة", value: 53, percentage: 41 },
  { name: "الباقة المتكاملة", value: 31, percentage: 24 },
];

// بيانات معدل الاحتفاظ بالعملاء
export const customerRetentionData = [
  { month: "يناير", retention: 92 },
  { month: "فبراير", retention: 93 },
  { month: "مارس", retention: 91 },
  { month: "أبريل", retention: 94 },
  { month: "مايو", retention: 95 },
  { month: "يونيو", retention: 93 },
];

// بيانات استخدام الوحدات
export const moduleUsageData = [
  { name: "المبيعات", usage: 95 },
  { name: "المشتريات", usage: 87 },
  { name: "المخزون", usage: 92 },
  { name: "المحاسبة", usage: 98 },
  { name: "التقارير", usage: 85 },
  { name: "إدارة العملاء", usage: 78 },
  { name: "الموارد البشرية", usage: 65 },
  { name: "التصنيع", usage: 52 },
];

// بيانات أداء النظام
export const systemPerformanceData = [
  { day: "الأحد", uptime: 99.8, responseTime: 120, errors: 5 },
  { day: "الإثنين", uptime: 99.9, responseTime: 115, errors: 3 },
  { day: "الثلاثاء", uptime: 100, responseTime: 110, errors: 0 },
  { day: "الأربعاء", uptime: 99.7, responseTime: 125, errors: 8 },
  { day: "الخميس", uptime: 99.9, responseTime: 118, errors: 2 },
  { day: "الجمعة", uptime: 99.8, responseTime: 122, errors: 4 },
  { day: "السبت", uptime: 99.9, responseTime: 117, errors: 1 },
];

// بيانات العملاء الجدد
export const newCustomersData = [
  {
    id: "cust-101",
    name: "شركة الفارس للتجارة",
    package: "الباقة المتقدمة",
    date: "2024-06-15",
    revenue: 400,
  },
  {
    id: "cust-102",
    name: "مؤسسة الريادة",
    package: "الباقة الأساسية",
    date: "2024-06-12",
    revenue: 300,
  },
  {
    id: "cust-103",
    name: "شركة المستقبل للتقنية",
    package: "الباقة المتكاملة",
    date: "2024-06-10",
    revenue: 500,
  },
  {
    id: "cust-104",
    name: "مؤسسة الإبداع",
    package: "الباقة الأساسية",
    date: "2024-06-08",
    revenue: 300,
  },
  {
    id: "cust-105",
    name: "شركة النخبة للاستشارات",
    package: "الباقة المتقدمة",
    date: "2024-06-05",
    revenue: 400,
  },
];

// بيانات العملاء المنتهية اشتراكاتهم
export const churnedCustomersData = [
  {
    id: "cust-056",
    name: "شركة الأفق للتجارة",
    package: "الباقة الأساسية",
    date: "2024-06-14",
    reason: "ارتفاع التكلفة",
  },
  {
    id: "cust-042",
    name: "مؤسسة الصفوة",
    package: "الباقة المتقدمة",
    date: "2024-06-10",
    reason: "انتقال لمنافس",
  },
  {
    id: "cust-078",
    name: "شركة الإنجاز للمقاولات",
    package: "الباقة الأساسية",
    date: "2024-06-07",
    reason: "توقف النشاط",
  },
];

// بيانات الاستخدام اليومي
export const dailyUsageData = [
  { hour: "00:00", users: 12 },
  { hour: "02:00", users: 8 },
  { hour: "04:00", users: 5 },
  { hour: "06:00", users: 10 },
  { hour: "08:00", users: 45 },
  { hour: "10:00", users: 78 },
  { hour: "12:00", users: 85 },
  { hour: "14:00", users: 92 },
  { hour: "16:00", users: 75 },
  { hour: "18:00", users: 48 },
  { hour: "20:00", users: 32 },
  { hour: "22:00", users: 18 },
];

// بيانات توزيع العملاء حسب المنطقة
export const customersByRegionData = [
  { name: "المنطقة الشرقية", value: 35 },
  { name: "المنطقة الغربية", value: 40 },
  { name: "المنطقة الشمالية", value: 15 },
  { name: "المنطقة الجنوبية", value: 20 },
  { name: "المنطقة الوسطى", value: 45 },
];

// بيانات تقرير الفواتير
export const invoicesReportData = [
  {
    month: "يناير",
    issued: 120,
    paid: 105,
    overdue: 15,
    total: 36000,
  },
  {
    month: "فبراير",
    issued: 135,
    paid: 122,
    overdue: 13,
    total: 42000,
  },
  {
    month: "مارس",
    issued: 150,
    paid: 140,
    overdue: 10,
    total: 48000,
  },
  {
    month: "أبريل",
    issued: 165,
    paid: 155,
    overdue: 10,
    total: 54000,
  },
  {
    month: "مايو",
    issued: 180,
    paid: 165,
    overdue: 15,
    total: 60000,
  },
  {
    month: "يونيو",
    issued: 195,
    paid: 175,
    overdue: 20,
    total: 66000,
  },
];
