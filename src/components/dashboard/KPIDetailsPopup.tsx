import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, Filter, Download, Printer, BarChart2, X } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
} from "recharts";

interface KPIDetailsPopupProps {
  open: boolean;
  onClose: () => void;
  kpiType: string;
}

const KPIDetailsPopup: React.FC<KPIDetailsPopupProps> = ({
  open,
  onClose,
  kpiType,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [periodFilter, setPeriodFilter] = useState("all");
  const [branchFilter, setBranchFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [showChart, setShowChart] = useState(true);

  // تحديد عنوان النافذة بناءً على نوع المؤشر
  const getTitle = () => {
    switch (kpiType) {
      case "sales":
      case "sales_tab":
        return "تفاصيل المبيعات";
      case "profits":
        return "تفاصيل الأرباح";
      case "customers":
      case "customers_count":
        return "تفاصيل العملاء الجدد";
      case "inventory":
      case "inventory_value":
      case "total_items":
        return "تفاصيل المخزون";
      case "low_stock":
        return "تفاصيل الأصناف منخفضة المخزون";
      case "inventory_movements":
        return "تفاصيل حركات المخزون";
      case "orders":
      case "purchase_orders":
        return "تفاصيل الطلبات";
      case "avg_order_value":
      case "purchase_avg_value":
        return "تفاصيل متوسط قيمة الطلب";
      case "purchases":
        return "تفاصيل المشتريات";
      case "suppliers":
        return "تفاصيل الموردين";
      default:
        return "تفاصيل المؤشر";
    }
  };

  // بيانات تجريبية للمبيعات
  const getSalesData = () => [
    { month: "يناير", sales: 85000, target: 90000, growth: "-5.6%" },
    { month: "فبراير", sales: 92000, target: 90000, growth: "+2.2%" },
    { month: "مارس", sales: 98000, target: 95000, growth: "+3.2%" },
    { month: "أبريل", sales: 105000, target: 100000, growth: "+5.0%" },
    { month: "مايو", sales: 115000, target: 110000, growth: "+4.5%" },
    { month: "يونيو", sales: 125000, target: 120000, growth: "+4.2%" },
  ];

  // بيانات تجريبية للأرباح
  const getProfitsData = () => [
    {
      month: "يناير",
      revenue: 85000,
      costs: 65000,
      profit: 20000,
      margin: "23.5%",
    },
    {
      month: "فبراير",
      revenue: 92000,
      costs: 70000,
      profit: 22000,
      margin: "23.9%",
    },
    {
      month: "مارس",
      revenue: 98000,
      costs: 74000,
      profit: 24000,
      margin: "24.5%",
    },
    {
      month: "أبريل",
      revenue: 105000,
      costs: 78000,
      profit: 27000,
      margin: "25.7%",
    },
    {
      month: "مايو",
      revenue: 115000,
      costs: 85000,
      profit: 30000,
      margin: "26.1%",
    },
    {
      month: "يونيو",
      revenue: 125000,
      costs: 92000,
      profit: 33000,
      margin: "26.4%",
    },
  ];

  // بيانات تجريبية للعملاء الجدد
  const getCustomersData = () => [
    {
      month: "يناير",
      newCustomers: 8,
      totalCustomers: 120,
      churn: 2,
      retention: "98.3%",
    },
    {
      month: "فبراير",
      newCustomers: 10,
      totalCustomers: 128,
      churn: 3,
      retention: "97.7%",
    },
    {
      month: "مارس",
      newCustomers: 12,
      totalCustomers: 137,
      churn: 2,
      retention: "98.5%",
    },
    {
      month: "أبريل",
      newCustomers: 9,
      totalCustomers: 144,
      churn: 4,
      retention: "97.2%",
    },
    {
      month: "مايو",
      newCustomers: 11,
      totalCustomers: 151,
      churn: 3,
      retention: "98.0%",
    },
    {
      month: "يونيو",
      newCustomers: 14,
      totalCustomers: 162,
      churn: 2,
      retention: "98.8%",
    },
  ];

  // بيانات تجريبية للمخزون
  const getInventoryData = () => [
    {
      category: "الملابس",
      inStock: 450,
      lowStock: 20,
      outOfStock: 5,
      turnoverRate: "4.2",
    },
    {
      category: "الأحذية",
      inStock: 320,
      lowStock: 15,
      outOfStock: 3,
      turnoverRate: "3.8",
    },
    {
      category: "الإكسسوارات",
      inStock: 280,
      lowStock: 12,
      outOfStock: 2,
      turnoverRate: "5.1",
    },
    {
      category: "الحقائب",
      inStock: 180,
      lowStock: 8,
      outOfStock: 1,
      turnoverRate: "3.5",
    },
    {
      category: "المنتجات المنزلية",
      inStock: 210,
      lowStock: 10,
      outOfStock: 2,
      turnoverRate: "2.9",
    },
  ];

  // بيانات تجريبية للإيرادات
  const getRevenueData = () => [
    {
      month: "يناير",
      revenue: 380000,
      lastMonth: 350000,
      growth: "+8.6%",
      category: "المبيعات",
      percentage: 78,
    },
    {
      month: "فبراير",
      revenue: 410000,
      lastMonth: 380000,
      growth: "+7.9%",
      category: "المبيعات",
      percentage: 80,
    },
    {
      month: "مارس",
      revenue: 395000,
      lastMonth: 410000,
      growth: "-3.7%",
      category: "المبيعات",
      percentage: 75,
    },
    {
      month: "أبريل",
      revenue: 450000,
      lastMonth: 395000,
      growth: "+13.9%",
      category: "المبيعات",
      percentage: 82,
    },
    {
      month: "مايو",
      revenue: 480000,
      lastMonth: 450000,
      growth: "+6.7%",
      category: "المبيعات",
      percentage: 84,
    },
    {
      month: "يونيو",
      revenue: 520000,
      lastMonth: 480000,
      growth: "+8.3%",
      category: "المبيعات",
      percentage: 85,
    },
    {
      month: "يناير",
      revenue: 85000,
      lastMonth: 80000,
      growth: "+6.3%",
      category: "الخدمات",
      percentage: 17,
    },
    {
      month: "فبراير",
      revenue: 90000,
      lastMonth: 85000,
      growth: "+5.9%",
      category: "الخدمات",
      percentage: 18,
    },
    {
      month: "مارس",
      revenue: 88000,
      lastMonth: 90000,
      growth: "-2.2%",
      category: "الخدمات",
      percentage: 17,
    },
    {
      month: "أبريل",
      revenue: 95000,
      lastMonth: 88000,
      growth: "+8.0%",
      category: "الخدمات",
      percentage: 17,
    },
    {
      month: "مايو",
      revenue: 100000,
      lastMonth: 95000,
      growth: "+5.3%",
      category: "الخدمات",
      percentage: 18,
    },
    {
      month: "يونيو",
      revenue: 105000,
      lastMonth: 100000,
      growth: "+5.0%",
      category: "الخدمات",
      percentage: 17,
    },
    {
      month: "يناير",
      revenue: 25000,
      lastMonth: 22000,
      growth: "+13.6%",
      category: "الاستثمارات",
      percentage: 5,
    },
    {
      month: "فبراير",
      revenue: 28000,
      lastMonth: 25000,
      growth: "+12.0%",
      category: "الاستثمارات",
      percentage: 5,
    },
    {
      month: "مارس",
      revenue: 30000,
      lastMonth: 28000,
      growth: "+7.1%",
      category: "الاستثمارات",
      percentage: 6,
    },
    {
      month: "أبريل",
      revenue: 32000,
      lastMonth: 30000,
      growth: "+6.7%",
      category: "الاستثمارات",
      percentage: 6,
    },
    {
      month: "مايو",
      revenue: 35000,
      lastMonth: 32000,
      growth: "+9.4%",
      category: "الاستثمارات",
      percentage: 6,
    },
    {
      month: "يونيو",
      revenue: 38000,
      lastMonth: 35000,
      growth: "+8.6%",
      category: "الاستثمارات",
      percentage: 6,
    },
  ];

  // بيانات تجريبية للمصروفات
  const getExpensesData = () => [
    {
      month: "يناير",
      expenses: 280000,
      lastMonth: 260000,
      growth: "+7.7%",
      category: "التشغيلية",
      percentage: 65,
    },
    {
      month: "فبراير",
      expenses: 290000,
      lastMonth: 280000,
      growth: "+3.6%",
      category: "التشغيلية",
      percentage: 64,
    },
    {
      month: "مارس",
      expenses: 295000,
      lastMonth: 290000,
      growth: "+1.7%",
      category: "التشغيلية",
      percentage: 63,
    },
    {
      month: "أبريل",
      expenses: 310000,
      lastMonth: 295000,
      growth: "+5.1%",
      category: "التشغيلية",
      percentage: 62,
    },
    {
      month: "مايو",
      expenses: 320000,
      lastMonth: 310000,
      growth: "+3.2%",
      category: "التشغيلية",
      percentage: 62,
    },
    {
      month: "يونيو",
      expenses: 335000,
      lastMonth: 320000,
      growth: "+4.7%",
      category: "التشغيلية",
      percentage: 63,
    },
    {
      month: "يناير",
      expenses: 85000,
      lastMonth: 80000,
      growth: "+6.3%",
      category: "الإدارية",
      percentage: 20,
    },
    {
      month: "فبراير",
      expenses: 90000,
      lastMonth: 85000,
      growth: "+5.9%",
      category: "الإدارية",
      percentage: 20,
    },
    {
      month: "مارس",
      expenses: 95000,
      lastMonth: 90000,
      growth: "+5.6%",
      category: "الإدارية",
      percentage: 20,
    },
    {
      month: "أبريل",
      expenses: 100000,
      lastMonth: 95000,
      growth: "+5.3%",
      category: "الإدارية",
      percentage: 20,
    },
    {
      month: "مايو",
      expenses: 105000,
      lastMonth: 100000,
      growth: "+5.0%",
      category: "الإدارية",
      percentage: 20,
    },
    {
      month: "يونيو",
      expenses: 110000,
      lastMonth: 105000,
      growth: "+4.8%",
      category: "الإدارية",
      percentage: 21,
    },
    {
      month: "يناير",
      expenses: 65000,
      lastMonth: 60000,
      growth: "+8.3%",
      category: "التسويقية",
      percentage: 15,
    },
    {
      month: "فبراير",
      expenses: 70000,
      lastMonth: 65000,
      growth: "+7.7%",
      category: "التسويقية",
      percentage: 16,
    },
    {
      month: "مارس",
      expenses: 75000,
      lastMonth: 70000,
      growth: "+7.1%",
      category: "التسويقية",
      percentage: 16,
    },
    {
      month: "أبريل",
      expenses: 80000,
      lastMonth: 75000,
      growth: "+6.7%",
      category: "التسويقية",
      percentage: 16,
    },
    {
      month: "مايو",
      expenses: 85000,
      lastMonth: 80000,
      growth: "+6.3%",
      category: "التسويقية",
      percentage: 16,
    },
    {
      month: "يونيو",
      expenses: 90000,
      lastMonth: 85000,
      growth: "+5.9%",
      category: "التسويقية",
      percentage: 17,
    },
  ];

  // بيانات تجريبية لصافي الربح
  const getNetProfitData = () => [
    {
      month: "يناير",
      revenue: 490000,
      expenses: 430000,
      profit: 60000,
      margin: "12.2%",
    },
    {
      month: "فبراير",
      revenue: 528000,
      expenses: 450000,
      profit: 78000,
      margin: "14.8%",
    },
    {
      month: "مارس",
      revenue: 513000,
      expenses: 465000,
      profit: 48000,
      margin: "9.4%",
    },
    {
      month: "أبريل",
      revenue: 577000,
      expenses: 490000,
      profit: 87000,
      margin: "15.1%",
    },
    {
      month: "مايو",
      revenue: 615000,
      expenses: 510000,
      profit: 105000,
      margin: "17.1%",
    },
    {
      month: "يونيو",
      revenue: 663000,
      expenses: 535000,
      profit: 128000,
      margin: "19.3%",
    },
  ];

  // بيانات تجريبية للرصيد النقدي
  const getCashBalanceData = () => [
    {
      month: "يناير",
      opening: 750000,
      inflow: 490000,
      outflow: 430000,
      closing: 810000,
    },
    {
      month: "فبراير",
      opening: 810000,
      inflow: 528000,
      outflow: 450000,
      closing: 888000,
    },
    {
      month: "مارس",
      opening: 888000,
      inflow: 513000,
      outflow: 465000,
      closing: 936000,
    },
    {
      month: "أبريل",
      opening: 936000,
      inflow: 577000,
      outflow: 490000,
      closing: 1023000,
    },
    {
      month: "مايو",
      opening: 1023000,
      inflow: 615000,
      outflow: 510000,
      closing: 1128000,
    },
    {
      month: "يونيو",
      opening: 1128000,
      inflow: 663000,
      outflow: 535000,
      closing: 1256000,
    },
  ];

  // بيانات تجريبية للطلبات
  const getOrdersData = () => [
    {
      id: "ORD-1001",
      date: "2023-06-01",
      customer: "شركة الأمل",
      value: 25000,
      status: "مكتمل",
    },
    {
      id: "ORD-1002",
      date: "2023-06-03",
      customer: "مؤسسة النور",
      value: 18500,
      status: "مكتمل",
    },
    {
      id: "ORD-1003",
      date: "2023-06-05",
      customer: "شركة الإبداع",
      value: 32000,
      status: "مكتمل",
    },
    {
      id: "ORD-1004",
      date: "2023-06-08",
      customer: "مؤسسة الريادة",
      value: 15000,
      status: "قيد التنفيذ",
    },
    {
      id: "ORD-1005",
      date: "2023-06-10",
      customer: "شركة التقدم",
      value: 28000,
      status: "قيد التنفيذ",
    },
    {
      id: "ORD-1006",
      date: "2023-06-12",
      customer: "مؤسسة الإنجاز",
      value: 22000,
      status: "قيد التنفيذ",
    },
  ];

  // بيانات تجريبية لمتوسط قيمة الطلب
  const getAvgOrderValueData = () => [
    { month: "يناير", orders: 120, totalValue: 960000, avgValue: 8000 },
    { month: "فبراير", orders: 135, totalValue: 1080000, avgValue: 8000 },
    { month: "مارس", orders: 142, totalValue: 1136000, avgValue: 8000 },
    { month: "أبريل", orders: 150, totalValue: 1200000, avgValue: 8000 },
    { month: "مايو", orders: 155, totalValue: 1240000, avgValue: 8000 },
    { month: "يونيو", orders: 160, totalValue: 1280000, avgValue: 8000 },
  ];

  // بيانات تجريبية للمشتريات
  const getPurchasesData = () => [
    {
      id: "PO-1001",
      date: "2023-06-01",
      supplier: "شركة التوريدات",
      value: 45000,
      status: "مستلم",
    },
    {
      id: "PO-1002",
      date: "2023-06-04",
      supplier: "مؤسسة الإمداد",
      value: 38000,
      status: "مستلم",
    },
    {
      id: "PO-1003",
      date: "2023-06-07",
      supplier: "شركة المواد",
      value: 52000,
      status: "مستلم",
    },
    {
      id: "PO-1004",
      date: "2023-06-10",
      supplier: "مؤسسة التجهيزات",
      value: 35000,
      status: "قيد التنفيذ",
    },
    {
      id: "PO-1005",
      date: "2023-06-13",
      supplier: "شركة اللوازم",
      value: 48000,
      status: "قيد التنفيذ",
    },
    {
      id: "PO-1006",
      date: "2023-06-16",
      supplier: "مؤسسة التوريد",
      value: 42000,
      status: "قيد التنفيذ",
    },
  ];

  // بيانات تجريبية للموردين
  const getSuppliersData = () => [
    {
      id: "SUP-001",
      name: "شركة التوريدات",
      category: "مواد خام",
      orders: 12,
      totalValue: 540000,
      rating: 4.8,
    },
    {
      id: "SUP-002",
      name: "مؤسسة الإمداد",
      category: "مواد تعبئة",
      orders: 8,
      totalValue: 320000,
      rating: 4.5,
    },
    {
      id: "SUP-003",
      name: "شركة المواد",
      category: "مواد خام",
      orders: 15,
      totalValue: 750000,
      rating: 4.7,
    },
    {
      id: "SUP-004",
      name: "مؤسسة التجهيزات",
      category: "معدات",
      orders: 5,
      totalValue: 180000,
      rating: 4.2,
    },
    {
      id: "SUP-005",
      name: "شركة اللوازم",
      category: "مواد تعبئة",
      orders: 10,
      totalValue: 420000,
      rating: 4.6,
    },
    {
      id: "SUP-006",
      name: "مؤسسة التوريد",
      category: "معدات",
      orders: 7,
      totalValue: 280000,
      rating: 4.4,
    },
  ];

  // بيانات تجريبية لحجم الإنتاج
  const getProductionVolumeData = () => [
    {
      month: "يناير",
      volume: 1200,
      target: 1300,
      efficiency: "92.3%",
      defects: "1.5%",
    },
    {
      month: "فبراير",
      volume: 1350,
      target: 1400,
      efficiency: "96.4%",
      defects: "1.3%",
    },
    {
      month: "مارس",
      volume: 1280,
      target: 1400,
      efficiency: "91.4%",
      defects: "1.4%",
    },
    {
      month: "أبريل",
      volume: 1420,
      target: 1450,
      efficiency: "97.9%",
      defects: "1.2%",
    },
    {
      month: "مايو",
      volume: 1650,
      target: 1600,
      efficiency: "103.1%",
      defects: "1.1%",
    },
    {
      month: "يونيو",
      volume: 1850,
      target: 1800,
      efficiency: "102.8%",
      defects: "1.0%",
    },
  ];

  // بيانات تجريبية لكفاءة الإنتاج
  const getProductionEfficiencyData = () => [
    {
      line: "خط الإنتاج 1",
      efficiency: 92,
      target: 90,
      downtime: "3.5%",
      output: 620,
    },
    {
      line: "خط الإنتاج 2",
      efficiency: 87,
      target: 90,
      downtime: "5.2%",
      output: 580,
    },
    {
      line: "خط الإنتاج 3",
      efficiency: 78,
      target: 85,
      downtime: "8.1%",
      output: 520,
    },
    {
      line: "خط التجميع",
      efficiency: 95,
      target: 92,
      downtime: "2.8%",
      output: 640,
    },
    {
      line: "قسم التغليف",
      efficiency: 88,
      target: 88,
      downtime: "4.5%",
      output: 590,
    },
  ];

  // بيانات تجريبية لمعدل العيوب
  const getDefectRateData = () => [
    {
      product: "المنتج أ",
      produced: 850,
      defects: 10,
      rate: "1.2%",
      cost: 5000,
    },
    {
      product: "المنتج ب",
      produced: 720,
      defects: 8,
      rate: "1.1%",
      cost: 4200,
    },
    {
      product: "المنتج ج",
      produced: 650,
      defects: 9,
      rate: "1.4%",
      cost: 4800,
    },
    {
      product: "المنتج د",
      produced: 580,
      defects: 6,
      rate: "1.0%",
      cost: 3500,
    },
    {
      product: "المنتج هـ",
      produced: 480,
      defects: 5,
      rate: "1.0%",
      cost: 2800,
    },
  ];

  // بيانات تجريبية للتسليم في الموعد
  const getOnTimeDeliveryData = () => [
    {
      month: "يناير",
      orders: 120,
      onTime: 115,
      rate: "95.8%",
      delay: "1.2 يوم",
    },
    {
      month: "فبراير",
      orders: 135,
      onTime: 128,
      rate: "94.8%",
      delay: "1.3 يوم",
    },
    {
      month: "مارس",
      orders: 142,
      onTime: 135,
      rate: "95.1%",
      delay: "1.2 يوم",
    },
    {
      month: "أبريل",
      orders: 150,
      onTime: 144,
      rate: "96.0%",
      delay: "1.1 يوم",
    },
    {
      month: "مايو",
      orders: 155,
      onTime: 149,
      rate: "96.1%",
      delay: "1.0 يوم",
    },
    {
      month: "يونيو",
      orders: 160,
      onTime: 154,
      rate: "96.3%",
      delay: "0.9 يوم",
    },
  ];

  // بيانات تجريبية للعملاء الجدد
  const getNewCustomersData = () => [
    {
      month: "يناير",
      newCustomers: 18,
      source: "التسويق الرقمي",
      conversionRate: "3.2%",
      value: 85000,
    },
    {
      month: "فبراير",
      newCustomers: 22,
      source: "الإحالات",
      conversionRate: "4.1%",
      value: 95000,
    },
    {
      month: "مارس",
      newCustomers: 20,
      source: "المعارض",
      conversionRate: "3.8%",
      value: 90000,
    },
    {
      month: "أبريل",
      newCustomers: 25,
      source: "التسويق الرقمي",
      conversionRate: "4.5%",
      value: 110000,
    },
    {
      month: "مايو",
      newCustomers: 28,
      source: "الإحالات",
      conversionRate: "4.8%",
      value: 125000,
    },
    {
      month: "يونيو",
      newCustomers: 30,
      source: "المعارض",
      conversionRate: "5.2%",
      value: 135000,
    },
  ];

  // بيانات تجريبية لمعدل الاحتفاظ بالعملاء
  const getCustomerRetentionData = () => [
    {
      month: "يناير",
      activeCustomers: 120,
      churn: 3,
      retention: "97.5%",
      reactivated: 1,
    },
    {
      month: "فبراير",
      activeCustomers: 138,
      churn: 4,
      retention: "97.1%",
      reactivated: 2,
    },
    {
      month: "مارس",
      activeCustomers: 154,
      churn: 3,
      retention: "98.1%",
      reactivated: 1,
    },
    {
      month: "أبريل",
      activeCustomers: 176,
      churn: 5,
      retention: "97.2%",
      reactivated: 2,
    },
    {
      month: "مايو",
      activeCustomers: 199,
      churn: 4,
      retention: "98.0%",
      reactivated: 3,
    },
    {
      month: "يونيو",
      activeCustomers: 225,
      churn: 3,
      retention: "98.7%",
      reactivated: 2,
    },
  ];

  // بيانات تجريبية لمعدل التحويل
  const getConversionRateData = () => [
    {
      month: "يناير",
      leads: 550,
      conversions: 18,
      rate: "3.3%",
      avgValue: 4700,
    },
    {
      month: "فبراير",
      leads: 580,
      conversions: 22,
      rate: "3.8%",
      avgValue: 4300,
    },
    {
      month: "مارس",
      leads: 620,
      conversions: 20,
      rate: "3.2%",
      avgValue: 4500,
    },
    {
      month: "أبريل",
      leads: 650,
      conversions: 25,
      rate: "3.8%",
      avgValue: 4400,
    },
    {
      month: "مايو",
      leads: 680,
      conversions: 28,
      rate: "4.1%",
      avgValue: 4450,
    },
    {
      month: "يونيو",
      leads: 720,
      conversions: 30,
      rate: "4.2%",
      avgValue: 4500,
    },
  ];

  // بيانات تجريبية لقيمة خط أنابيب المبيعات
  const getSalesPipelineData = () => [
    {
      stage: "العملاء المحتملين",
      count: 120,
      value: 2400000,
      conversionRate: "15%",
    },
    {
      stage: "الاتصال الأولي",
      count: 85,
      value: 1800000,
      conversionRate: "25%",
    },
    { stage: "الاجتماع", count: 64, value: 1500000, conversionRate: "35%" },
    { stage: "العرض", count: 42, value: 1200000, conversionRate: "45%" },
    { stage: "التفاوض", count: 28, value: 850000, conversionRate: "65%" },
    { stage: "مغلق/فوز", count: 18, value: 650000, conversionRate: "100%" },
  ];

  // بيانات تجريبية لإجمالي الموظفين
  const getTotalEmployeesData = () => [
    {
      department: "المبيعات",
      employees: 45,
      newHires: 2,
      turnover: "3.5%",
      cost: 225000,
    },
    {
      department: "التسويق",
      employees: 20,
      newHires: 1,
      turnover: "2.8%",
      cost: 100000,
    },
    {
      department: "تقنية المعلومات",
      employees: 25,
      newHires: 3,
      turnover: "4.2%",
      cost: 150000,
    },
    {
      department: "المالية",
      employees: 12,
      newHires: 0,
      turnover: "1.5%",
      cost: 72000,
    },
    {
      department: "الإنتاج",
      employees: 18,
      newHires: 1,
      turnover: "3.0%",
      cost: 90000,
    },
    {
      department: "أخرى",
      employees: 8,
      newHires: 0,
      turnover: "2.0%",
      cost: 40000,
    },
  ];

  // بيانات تجريبية لمعدل دوران الموظفين
  const getEmployeeTurnoverData = () => [
    { month: "يناير", employees: 125, left: 2, hired: 3, rate: "1.6%" },
    { month: "فبراير", employees: 126, left: 1, hired: 2, rate: "0.8%" },
    { month: "مارس", employees: 127, left: 3, hired: 4, rate: "2.4%" },
    { month: "أبريل", employees: 128, left: 2, hired: 3, rate: "1.6%" },
    { month: "مايو", employees: 129, left: 1, hired: 2, rate: "0.8%" },
    { month: "يونيو", employees: 130, left: 2, hired: 3, rate: "1.5%" },
  ];

  // بيانات تجريبية لمتوسط درجة الأداء
  const getAvgPerformanceData = () => [
    {
      department: "المبيعات",
      current: 92,
      previous: 88,
      target: 90,
      bonus: "105%",
    },
    {
      department: "التسويق",
      current: 87,
      previous: 85,
      target: 88,
      bonus: "98%",
    },
    {
      department: "تقنية المعلومات",
      current: 90,
      previous: 86,
      target: 88,
      bonus: "102%",
    },
    {
      department: "المالية",
      current: 85,
      previous: 82,
      target: 85,
      bonus: "100%",
    },
    {
      department: "الإنتاج",
      current: 88,
      previous: 84,
      target: 86,
      bonus: "102%",
    },
  ];

  // بيانات تجريبية لساعات التدريب
  const getTrainingHoursData = () => [
    {
      department: "المبيعات",
      employees: 45,
      hours: 180,
      avgHours: 4.0,
      cost: 36000,
    },
    {
      department: "التسويق",
      employees: 20,
      hours: 90,
      avgHours: 4.5,
      cost: 18000,
    },
    {
      department: "تقنية المعلومات",
      employees: 25,
      hours: 125,
      avgHours: 5.0,
      cost: 25000,
    },
    {
      department: "المالية",
      employees: 12,
      hours: 48,
      avgHours: 4.0,
      cost: 9600,
    },
    {
      department: "الإنتاج",
      employees: 18,
      hours: 72,
      avgHours: 4.0,
      cost: 14400,
    },
    { department: "أخرى", employees: 8, hours: 32, avgHours: 4.0, cost: 6400 },
  ];

  // تحديد البيانات المناسبة بناءً على نوع المؤشر
  const getData = () => {
    switch (kpiType) {
      case "sales":
      case "sales_tab":
        return getSalesData();
      case "profits":
        return getProfitsData();
      case "customers":
      case "customers_count":
        return getCustomersData();
      case "inventory":
      case "inventory_value":
      case "total_items":
      case "low_stock":
      case "inventory_movements":
        return getInventoryData();
      case "total_revenue":
        return getRevenueData();
      case "total_expenses":
        return getExpensesData();
      case "net_profit":
        return getNetProfitData();
      case "cash_balance":
        return getCashBalanceData();
      case "orders":
        return getOrdersData();
      case "purchase_orders":
        return getPurchasesData();
      case "avg_order_value":
      case "purchase_avg_value":
        return getAvgOrderValueData();
      case "purchases":
        return getPurchasesData();
      case "suppliers":
        return getSuppliersData();
      case "production_volume":
        return getProductionVolumeData();
      case "production_efficiency":
        return getProductionEfficiencyData();
      case "defect_rate":
        return getDefectRateData();
      case "on_time_delivery":
        return getOnTimeDeliveryData();
      case "new_customers":
        return getNewCustomersData();
      case "customer_retention":
        return getCustomerRetentionData();
      case "conversion_rate":
        return getConversionRateData();
      case "sales_pipeline":
        return getSalesPipelineData();
      case "total_employees":
        return getTotalEmployeesData();
      case "employee_turnover":
        return getEmployeeTurnoverData();
      case "avg_performance":
        return getAvgPerformanceData();
      case "training_hours":
        return getTrainingHoursData();
      default:
        return [];
    }
  };

  // تصفية البيانات بناءً على معايير البحث
  const filteredData = getData().filter((item: any) => {
    // تنفيذ منطق التصفية حسب نوع المؤشر
    if (
      kpiType !== "inventory" &&
      periodFilter !== "all" &&
      item.month !== periodFilter
    ) {
      return false;
    }

    if (
      kpiType === "inventory" &&
      categoryFilter !== "all" &&
      item.category !== categoryFilter
    ) {
      return false;
    }

    if (searchTerm === "") {
      return true;
    }

    // البحث في جميع الحقول النصية
    return Object.values(item).some(
      (value) =>
        typeof value === "string" &&
        value.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  });

  // تحديد أعمدة الجدول بناءً على نوع المؤشر
  const renderTableHeaders = () => {
    switch (kpiType) {
      case "sales":
      case "sales_tab":
        return (
          <TableRow>
            <TableHead>الشهر</TableHead>
            <TableHead>المبيعات</TableHead>
            <TableHead>المستهدف</TableHead>
            <TableHead>نسبة النمو</TableHead>
          </TableRow>
        );
      case "profits":
        return (
          <TableRow>
            <TableHead>الشهر</TableHead>
            <TableHead>الإيرادات</TableHead>
            <TableHead>التكاليف</TableHead>
            <TableHead>الأرباح</TableHead>
            <TableHead>هامش الربح</TableHead>
          </TableRow>
        );
      case "customers":
      case "customers_count":
        return (
          <TableRow>
            <TableHead>الشهر</TableHead>
            <TableHead>العملاء الجدد</TableHead>
            <TableHead>إجمالي العملاء</TableHead>
            <TableHead>العملاء المفقودين</TableHead>
            <TableHead>معدل الاحتفاظ</TableHead>
          </TableRow>
        );
      case "inventory":
      case "inventory_value":
      case "total_items":
      case "low_stock":
        return (
          <TableRow>
            <TableHead>الفئة</TableHead>
            <TableHead>المنتجات المتوفرة</TableHead>
            <TableHead>منتجات منخفضة المخزون</TableHead>
            <TableHead>منتجات نفذت من المخزون</TableHead>
            <TableHead>معدل دوران المخزون</TableHead>
          </TableRow>
        );
      case "total_revenue":
        return (
          <TableRow>
            <TableHead>الشهر</TableHead>
            <TableHead>الفئة</TableHead>
            <TableHead>الإيرادات</TableHead>
            <TableHead>الشهر السابق</TableHead>
            <TableHead>نسبة النمو</TableHead>
            <TableHead>النسبة من الإجمالي</TableHead>
          </TableRow>
        );
      case "total_expenses":
        return (
          <TableRow>
            <TableHead>الشهر</TableHead>
            <TableHead>الفئة</TableHead>
            <TableHead>المصروفات</TableHead>
            <TableHead>الشهر السابق</TableHead>
            <TableHead>نسبة النمو</TableHead>
            <TableHead>النسبة من الإجمالي</TableHead>
          </TableRow>
        );
      case "net_profit":
        return (
          <TableRow>
            <TableHead>الشهر</TableHead>
            <TableHead>الإيرادات</TableHead>
            <TableHead>المصروفات</TableHead>
            <TableHead>صافي الربح</TableHead>
            <TableHead>هامش الربح</TableHead>
          </TableRow>
        );
      case "cash_balance":
        return (
          <TableRow>
            <TableHead>الشهر</TableHead>
            <TableHead>الرصيد الافتتاحي</TableHead>
            <TableHead>التدفقات الواردة</TableHead>
            <TableHead>التدفقات الصادرة</TableHead>
            <TableHead>الرصيد الختامي</TableHead>
          </TableRow>
        );
      case "orders":
        return (
          <TableRow>
            <TableHead>رقم الطلب</TableHead>
            <TableHead>التاريخ</TableHead>
            <TableHead>العميل</TableHead>
            <TableHead>القيمة</TableHead>
            <TableHead>الحالة</TableHead>
          </TableRow>
        );
      case "purchase_orders":
        return (
          <TableRow>
            <TableHead>رقم الطلب</TableHead>
            <TableHead>التاريخ</TableHead>
            <TableHead>المورد</TableHead>
            <TableHead>القيمة</TableHead>
            <TableHead>الحالة</TableHead>
          </TableRow>
        );
      case "avg_order_value":
      case "purchase_avg_value":
        return (
          <TableRow>
            <TableHead>الشهر</TableHead>
            <TableHead>عدد الطلبات</TableHead>
            <TableHead>إجمالي القيمة</TableHead>
            <TableHead>متوسط القيمة</TableHead>
          </TableRow>
        );
      case "purchases":
        return (
          <TableRow>
            <TableHead>رقم الطلب</TableHead>
            <TableHead>التاريخ</TableHead>
            <TableHead>المورد</TableHead>
            <TableHead>القيمة</TableHead>
            <TableHead>الحالة</TableHead>
          </TableRow>
        );
      case "suppliers":
        return (
          <TableRow>
            <TableHead>رقم المورد</TableHead>
            <TableHead>اسم المورد</TableHead>
            <TableHead>الفئة</TableHead>
            <TableHead>عدد الطلبات</TableHead>
            <TableHead>إجمالي القيمة</TableHead>
            <TableHead>التقييم</TableHead>
          </TableRow>
        );
      case "production_volume":
        return (
          <TableRow>
            <TableHead>الشهر</TableHead>
            <TableHead>حجم الإنتاج</TableHead>
            <TableHead>المستهدف</TableHead>
            <TableHead>الكفاءة</TableHead>
            <TableHead>معدل العيوب</TableHead>
          </TableRow>
        );
      case "production_efficiency":
        return (
          <TableRow>
            <TableHead>خط الإنتاج</TableHead>
            <TableHead>الكفاءة</TableHead>
            <TableHead>المستهدف</TableHead>
            <TableHead>وقت التوقف</TableHead>
            <TableHead>الإنتاج</TableHead>
          </TableRow>
        );
      case "defect_rate":
        return (
          <TableRow>
            <TableHead>المنتج</TableHead>
            <TableHead>الكمية المنتجة</TableHead>
            <TableHead>العيوب</TableHead>
            <TableHead>معدل العيوب</TableHead>
            <TableHead>تكلفة العيوب</TableHead>
          </TableRow>
        );
      case "on_time_delivery":
        return (
          <TableRow>
            <TableHead>الشهر</TableHead>
            <TableHead>عدد الطلبات</TableHead>
            <TableHead>التسليم في الموعد</TableHead>
            <TableHead>معدل التسليم في الموعد</TableHead>
            <TableHead>متوسط التأخير</TableHead>
          </TableRow>
        );
      case "new_customers":
        return (
          <TableRow>
            <TableHead>الشهر</TableHead>
            <TableHead>العملاء الجدد</TableHead>
            <TableHead>مصدر العميل</TableHead>
            <TableHead>معدل التحويل</TableHead>
            <TableHead>القيمة</TableHead>
          </TableRow>
        );
      case "customer_retention":
        return (
          <TableRow>
            <TableHead>الشهر</TableHead>
            <TableHead>العملاء النشطين</TableHead>
            <TableHead>العملاء المفقودين</TableHead>
            <TableHead>معدل الاحتفاظ</TableHead>
            <TableHead>العملاء المعاد تنشيطهم</TableHead>
          </TableRow>
        );
      case "conversion_rate":
        return (
          <TableRow>
            <TableHead>الشهر</TableHead>
            <TableHead>العملاء المحتملين</TableHead>
            <TableHead>التحويلات</TableHead>
            <TableHead>معدل التحويل</TableHead>
            <TableHead>متوسط القيمة</TableHead>
          </TableRow>
        );
      case "sales_pipeline":
        return (
          <TableRow>
            <TableHead>المرحلة</TableHead>
            <TableHead>عدد العملاء</TableHead>
            <TableHead>القيمة المتوقعة</TableHead>
            <TableHead>معدل التحويل</TableHead>
          </TableRow>
        );
      case "total_employees":
        return (
          <TableRow>
            <TableHead>القسم</TableHead>
            <TableHead>عدد الموظفين</TableHead>
            <TableHead>التعيينات الجديدة</TableHead>
            <TableHead>معدل الدوران</TableHead>
            <TableHead>تكلفة الرواتب</TableHead>
          </TableRow>
        );
      case "employee_turnover":
        return (
          <TableRow>
            <TableHead>الشهر</TableHead>
            <TableHead>إجمالي الموظفين</TableHead>
            <TableHead>المغادرين</TableHead>
            <TableHead>التعيينات الجديدة</TableHead>
            <TableHead>معدل الدوران</TableHead>
          </TableRow>
        );
      case "avg_performance":
        return (
          <TableRow>
            <TableHead>القسم</TableHead>
            <TableHead>الأداء الحالي</TableHead>
            <TableHead>الأداء السابق</TableHead>
            <TableHead>المستهدف</TableHead>
            <TableHead>نسبة المكافأة</TableHead>
          </TableRow>
        );
      case "training_hours":
        return (
          <TableRow>
            <TableHead>القسم</TableHead>
            <TableHead>عدد الموظفين</TableHead>
            <TableHead>ساعات التدريب</TableHead>
            <TableHead>متوسط الساعات للموظف</TableHead>
            <TableHead>تكلفة التدريب</TableHead>
          </TableRow>
        );
      default:
        return <TableRow></TableRow>;
    }
  };

  // عرض صفوف الجدول بناءً على نوع المؤشر
  const renderTableRows = () => {
    if (filteredData.length === 0) {
      return (
        <TableRow>
          <TableCell
            colSpan={7}
            className="h-24 text-center text-muted-foreground"
          >
            لا توجد بيانات متاحة
          </TableCell>
        </TableRow>
      );
    }

    switch (kpiType) {
      case "sales":
      case "sales_tab":
        return filteredData.map((item: any, index) => (
          <TableRow key={index}>
            <TableCell>{item.month}</TableCell>
            <TableCell>₴ {item.sales.toLocaleString()}</TableCell>
            <TableCell>₴ {item.target.toLocaleString()}</TableCell>
            <TableCell>
              <span
                className={
                  item.growth.startsWith("+")
                    ? "text-green-600"
                    : "text-red-600"
                }
              >
                {item.growth}
              </span>
            </TableCell>
          </TableRow>
        ));
      case "profits":
        return filteredData.map((item: any, index) => (
          <TableRow key={index}>
            <TableCell>{item.month}</TableCell>
            <TableCell>₴ {item.revenue.toLocaleString()}</TableCell>
            <TableCell>₴ {item.costs.toLocaleString()}</TableCell>
            <TableCell>₴ {item.profit.toLocaleString()}</TableCell>
            <TableCell>{item.margin}</TableCell>
          </TableRow>
        ));
      case "customers":
      case "customers_count":
        return filteredData.map((item: any, index) => (
          <TableRow key={index}>
            <TableCell>{item.month}</TableCell>
            <TableCell>{item.newCustomers}</TableCell>
            <TableCell>{item.totalCustomers}</TableCell>
            <TableCell>{item.churn}</TableCell>
            <TableCell>{item.retention}</TableCell>
          </TableRow>
        ));
      case "inventory":
      case "inventory_value":
      case "total_items":
      case "low_stock":
        return filteredData.map((item: any, index) => (
          <TableRow key={index}>
            <TableCell>{item.category}</TableCell>
            <TableCell>{item.inStock}</TableCell>
            <TableCell>
              <span className="text-amber-600">{item.lowStock}</span>
            </TableCell>
            <TableCell>
              <span className="text-red-600">{item.outOfStock}</span>
            </TableCell>
            <TableCell>{item.turnoverRate}</TableCell>
          </TableRow>
        ));
      case "total_revenue":
        return filteredData.map((item: any, index) => (
          <TableRow key={index}>
            <TableCell>{item.month}</TableCell>
            <TableCell>{item.category}</TableCell>
            <TableCell>₴ {item.revenue.toLocaleString()}</TableCell>
            <TableCell>₴ {item.lastMonth.toLocaleString()}</TableCell>
            <TableCell>
              <span
                className={
                  item.growth.startsWith("+")
                    ? "text-green-600"
                    : "text-red-600"
                }
              >
                {item.growth}
              </span>
            </TableCell>
            <TableCell>{item.percentage}%</TableCell>
          </TableRow>
        ));
      case "total_expenses":
        return filteredData.map((item: any, index) => (
          <TableRow key={index}>
            <TableCell>{item.month}</TableCell>
            <TableCell>{item.category}</TableCell>
            <TableCell>₴ {item.expenses.toLocaleString()}</TableCell>
            <TableCell>₴ {item.lastMonth.toLocaleString()}</TableCell>
            <TableCell>
              <span
                className={
                  item.growth.startsWith("+")
                    ? "text-red-600"
                    : "text-green-600"
                }
              >
                {item.growth}
              </span>
            </TableCell>
            <TableCell>{item.percentage}%</TableCell>
          </TableRow>
        ));
      case "net_profit":
        return filteredData.map((item: any, index) => (
          <TableRow key={index}>
            <TableCell>{item.month}</TableCell>
            <TableCell>₴ {item.revenue.toLocaleString()}</TableCell>
            <TableCell>₴ {item.expenses.toLocaleString()}</TableCell>
            <TableCell>₴ {item.profit.toLocaleString()}</TableCell>
            <TableCell>{item.margin}</TableCell>
          </TableRow>
        ));
      case "cash_balance":
        return filteredData.map((item: any, index) => (
          <TableRow key={index}>
            <TableCell>{item.month}</TableCell>
            <TableCell>₴ {item.opening.toLocaleString()}</TableCell>
            <TableCell>₴ {item.inflow.toLocaleString()}</TableCell>
            <TableCell>₴ {item.outflow.toLocaleString()}</TableCell>
            <TableCell>₴ {item.closing.toLocaleString()}</TableCell>
          </TableRow>
        ));
      case "orders":
        return filteredData.map((item: any, index) => (
          <TableRow key={index}>
            <TableCell>{item.id}</TableCell>
            <TableCell>{item.date}</TableCell>
            <TableCell>{item.customer}</TableCell>
            <TableCell>₴ {item.value.toLocaleString()}</TableCell>
            <TableCell>
              <span
                className={
                  item.status === "مكتمل" ? "text-green-600" : "text-amber-600"
                }
              >
                {item.status}
              </span>
            </TableCell>
          </TableRow>
        ));
      case "purchase_orders":
      case "purchases":
        return filteredData.map((item: any, index) => (
          <TableRow key={index}>
            <TableCell>{item.id}</TableCell>
            <TableCell>{item.date}</TableCell>
            <TableCell>{item.supplier}</TableCell>
            <TableCell>₴ {item.value.toLocaleString()}</TableCell>
            <TableCell>
              <span
                className={
                  item.status === "مستلم" ? "text-green-600" : "text-amber-600"
                }
              >
                {item.status}
              </span>
            </TableCell>
          </TableRow>
        ));
      case "avg_order_value":
      case "purchase_avg_value":
        return filteredData.map((item: any, index) => (
          <TableRow key={index}>
            <TableCell>{item.month}</TableCell>
            <TableCell>{item.orders}</TableCell>
            <TableCell>₴ {item.totalValue.toLocaleString()}</TableCell>
            <TableCell>₴ {item.avgValue.toLocaleString()}</TableCell>
          </TableRow>
        ));
      case "suppliers":
        return filteredData.map((item: any, index) => (
          <TableRow key={index}>
            <TableCell>{item.id}</TableCell>
            <TableCell>{item.name}</TableCell>
            <TableCell>{item.category}</TableCell>
            <TableCell>{item.orders}</TableCell>
            <TableCell>₴ {item.totalValue.toLocaleString()}</TableCell>
            <TableCell>
              <span className="text-amber-600">{item.rating}</span>
            </TableCell>
          </TableRow>
        ));
      case "production_volume":
        return filteredData.map((item: any, index) => (
          <TableRow key={index}>
            <TableCell>{item.month}</TableCell>
            <TableCell>{item.volume}</TableCell>
            <TableCell>{item.target}</TableCell>
            <TableCell>
              <span
                className={
                  parseFloat(item.efficiency) >= 95
                    ? "text-green-600"
                    : "text-amber-600"
                }
              >
                {item.efficiency}
              </span>
            </TableCell>
            <TableCell>
              <span className="text-red-600">{item.defects}</span>
            </TableCell>
          </TableRow>
        ));
      case "production_efficiency":
        return filteredData.map((item: any, index) => (
          <TableRow key={index}>
            <TableCell>{item.line}</TableCell>
            <TableCell>
              <span
                className={
                  item.efficiency >= item.target
                    ? "text-green-600"
                    : "text-amber-600"
                }
              >
                {item.efficiency}%
              </span>
            </TableCell>
            <TableCell>{item.target}%</TableCell>
            <TableCell>
              <span className="text-red-600">{item.downtime}</span>
            </TableCell>
            <TableCell>{item.output}</TableCell>
          </TableRow>
        ));
      case "defect_rate":
        return filteredData.map((item: any, index) => (
          <TableRow key={index}>
            <TableCell>{item.product}</TableCell>
            <TableCell>{item.produced}</TableCell>
            <TableCell>
              <span className="text-red-600">{item.defects}</span>
            </TableCell>
            <TableCell>
              <span
                className={
                  parseFloat(item.rate) <= 1.0
                    ? "text-green-600"
                    : "text-amber-600"
                }
              >
                {item.rate}
              </span>
            </TableCell>
            <TableCell>₴ {item.cost.toLocaleString()}</TableCell>
          </TableRow>
        ));
      case "on_time_delivery":
        return filteredData.map((item: any, index) => (
          <TableRow key={index}>
            <TableCell>{item.month}</TableCell>
            <TableCell>{item.orders}</TableCell>
            <TableCell>{item.onTime}</TableCell>
            <TableCell>
              <span
                className={
                  parseFloat(item.rate) >= 95
                    ? "text-green-600"
                    : "text-amber-600"
                }
              >
                {item.rate}
              </span>
            </TableCell>
            <TableCell>{item.delay}</TableCell>
          </TableRow>
        ));
      case "new_customers":
        return filteredData.map((item: any, index) => (
          <TableRow key={index}>
            <TableCell>{item.month}</TableCell>
            <TableCell>{item.newCustomers}</TableCell>
            <TableCell>{item.source}</TableCell>
            <TableCell>{item.conversionRate}</TableCell>
            <TableCell>₴ {item.value.toLocaleString()}</TableCell>
          </TableRow>
        ));
      case "customer_retention":
        return filteredData.map((item: any, index) => (
          <TableRow key={index}>
            <TableCell>{item.month}</TableCell>
            <TableCell>{item.activeCustomers}</TableCell>
            <TableCell>
              <span className="text-red-600">{item.churn}</span>
            </TableCell>
            <TableCell>
              <span className="text-green-600">{item.retention}</span>
            </TableCell>
            <TableCell>{item.reactivated}</TableCell>
          </TableRow>
        ));
      case "conversion_rate":
        return filteredData.map((item: any, index) => (
          <TableRow key={index}>
            <TableCell>{item.month}</TableCell>
            <TableCell>{item.leads}</TableCell>
            <TableCell>{item.conversions}</TableCell>
            <TableCell>
              <span
                className={
                  parseFloat(item.rate) >= 4.0
                    ? "text-green-600"
                    : "text-amber-600"
                }
              >
                {item.rate}
              </span>
            </TableCell>
            <TableCell>₴ {item.avgValue.toLocaleString()}</TableCell>
          </TableRow>
        ));
      case "sales_pipeline":
        return filteredData.map((item: any, index) => (
          <TableRow key={index}>
            <TableCell>{item.stage}</TableCell>
            <TableCell>{item.count}</TableCell>
            <TableCell>₴ {item.value.toLocaleString()}</TableCell>
            <TableCell>{item.conversionRate}</TableCell>
          </TableRow>
        ));
      case "total_employees":
        return filteredData.map((item: any, index) => (
          <TableRow key={index}>
            <TableCell>{item.department}</TableCell>
            <TableCell>{item.employees}</TableCell>
            <TableCell>{item.newHires}</TableCell>
            <TableCell>{item.turnover}</TableCell>
            <TableCell>₴ {item.cost.toLocaleString()}</TableCell>
          </TableRow>
        ));
      case "employee_turnover":
        return filteredData.map((item: any, index) => (
          <TableRow key={index}>
            <TableCell>{item.month}</TableCell>
            <TableCell>{item.employees}</TableCell>
            <TableCell>
              <span className="text-red-600">{item.left}</span>
            </TableCell>
            <TableCell>
              <span className="text-green-600">{item.hired}</span>
            </TableCell>
            <TableCell>{item.rate}</TableCell>
          </TableRow>
        ));
      case "avg_performance":
        return filteredData.map((item: any, index) => (
          <TableRow key={index}>
            <TableCell>{item.department}</TableCell>
            <TableCell>
              <span
                className={
                  item.current >= item.target
                    ? "text-green-600"
                    : "text-amber-600"
                }
              >
                {item.current}%
              </span>
            </TableCell>
            <TableCell>{item.previous}%</TableCell>
            <TableCell>{item.target}%</TableCell>
            <TableCell>{item.bonus}</TableCell>
          </TableRow>
        ));
      case "training_hours":
        return filteredData.map((item: any, index) => (
          <TableRow key={index}>
            <TableCell>{item.department}</TableCell>
            <TableCell>{item.employees}</TableCell>
            <TableCell>{item.hours}</TableCell>
            <TableCell>{item.avgHours}</TableCell>
            <TableCell>₴ {item.cost.toLocaleString()}</TableCell>
          </TableRow>
        ));
      default:
        return null;
    }
  };

  // عرض الرسم البياني المناسب بناءً على نوع المؤشر
  const renderChart = () => {
    switch (kpiType) {
      case "sales":
      case "sales_tab":
        return (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={filteredData}>
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                opacity={0.3}
              />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip
                formatter={(value) => [`₴ ${value.toLocaleString()}`, "القيمة"]}
              />
              <Legend />
              <Bar dataKey="sales" name="المبيعات" fill="#3b82f6" />
              <Bar dataKey="target" name="المستهدف" fill="#e2e8f0" />
            </BarChart>
          </ResponsiveContainer>
        );
      case "profits":
        return (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={filteredData}>
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                opacity={0.3}
              />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip
                formatter={(value) => [`₴ ${value.toLocaleString()}`, "القيمة"]}
              />
              <Legend />
              <Bar dataKey="revenue" name="الإيرادات" fill="#3b82f6" />
              <Bar dataKey="costs" name="التكاليف" fill="#ef4444" />
              <Bar dataKey="profit" name="الأرباح" fill="#10b981" />
            </BarChart>
          </ResponsiveContainer>
        );
      case "customers":
      case "customers_count":
        return (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={filteredData}>
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                opacity={0.3}
              />
              <XAxis dataKey="month" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" domain={[0, 10]} />
              <Tooltip />
              <Legend />
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="newCustomers"
                name="العملاء الجدد"
                stroke="#8b5cf6"
                strokeWidth={2}
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="churn"
                name="العملاء المفقودين"
                stroke="#ef4444"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        );
      case "inventory":
      case "inventory_value":
      case "total_items":
      case "low_stock":
        return (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={filteredData} layout="vertical">
              <CartesianGrid
                strokeDasharray="3 3"
                horizontal={false}
                opacity={0.3}
              />
              <XAxis type="number" />
              <YAxis type="category" dataKey="category" width={150} />
              <Tooltip />
              <Legend />
              <Bar dataKey="inStock" name="المنتجات المتوفرة" fill="#f59e0b" />
              <Bar
                dataKey="lowStock"
                name="منتجات منخفضة المخزون"
                fill="#f97316"
              />
              <Bar
                dataKey="outOfStock"
                name="منتجات نفذت من المخزون"
                fill="#ef4444"
              />
            </BarChart>
          </ResponsiveContainer>
        );
      case "total_revenue":
        // تجميع البيانات حسب الشهر والفئة
        const revenueByMonth = filteredData.reduce((acc: any, item: any) => {
          if (!acc[item.month]) {
            acc[item.month] = { month: item.month };
          }
          acc[item.month][item.category] = item.revenue;
          return acc;
        }, {});

        // تحويل البيانات إلى مصفوفة
        const revenueChartData = Object.values(revenueByMonth);

        return (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={revenueChartData}>
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                opacity={0.3}
              />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip
                formatter={(value) => [`₴ ${value.toLocaleString()}`, "القيمة"]}
              />
              <Legend />
              <Bar
                dataKey="المبيعات"
                name="المبيعات"
                stackId="a"
                fill="#3b82f6"
              />
              <Bar
                dataKey="الخدمات"
                name="الخدمات"
                stackId="a"
                fill="#10b981"
              />
              <Bar
                dataKey="الاستثمارات"
                name="الاستثمارات"
                stackId="a"
                fill="#f59e0b"
              />
            </BarChart>
          </ResponsiveContainer>
        );
      case "total_expenses":
        // تجميع البيانات حسب الشهر والفئة
        const expensesByMonth = filteredData.reduce((acc: any, item: any) => {
          if (!acc[item.month]) {
            acc[item.month] = { month: item.month };
          }
          acc[item.month][item.category] = item.expenses;
          return acc;
        }, {});

        // تحويل البيانات إلى مصفوفة
        const expensesChartData = Object.values(expensesByMonth);

        return (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={expensesChartData}>
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                opacity={0.3}
              />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip
                formatter={(value) => [`₴ ${value.toLocaleString()}`, "القيمة"]}
              />
              <Legend />
              <Bar
                dataKey="التشغيلية"
                name="التشغيلية"
                stackId="a"
                fill="#ef4444"
              />
              <Bar
                dataKey="الإدارية"
                name="الإدارية"
                stackId="a"
                fill="#f59e0b"
              />
              <Bar
                dataKey="التسويقية"
                name="التسويقية"
                stackId="a"
                fill="#8b5cf6"
              />
            </BarChart>
          </ResponsiveContainer>
        );
      case "net_profit":
        return (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={filteredData}>
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                opacity={0.3}
              />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip
                formatter={(value) => [`₴ ${value.toLocaleString()}`, "القيمة"]}
              />
              <Legend />
              <Bar dataKey="revenue" name="الإيرادات" fill="#3b82f6" />
              <Bar dataKey="expenses" name="المصروفات" fill="#ef4444" />
              <Bar dataKey="profit" name="صافي الربح" fill="#10b981" />
            </BarChart>
          </ResponsiveContainer>
        );
      case "cash_balance":
        return (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={filteredData}>
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                opacity={0.3}
              />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip
                formatter={(value) => [`₴ ${value.toLocaleString()}`, "القيمة"]}
              />
              <Legend />
              <Area
                type="monotone"
                dataKey="closing"
                name="الرصيد النقدي"
                fill="#3b82f6"
                stroke="#3b82f6"
                fillOpacity={0.3}
              />
              <Area
                type="monotone"
                dataKey="inflow"
                name="التدفقات الواردة"
                fill="#10b981"
                stroke="#10b981"
                fillOpacity={0.3}
              />
              <Area
                type="monotone"
                dataKey="outflow"
                name="التدفقات الصادرة"
                fill="#ef4444"
                stroke="#ef4444"
                fillOpacity={0.3}
              />
            </AreaChart>
          </ResponsiveContainer>
        );
      case "orders":
      case "purchase_orders":
      case "purchases":
        // تجميع البيانات حسب الحالة
        const ordersByStatus = filteredData.reduce((acc: any, item: any) => {
          if (!acc[item.status]) {
            acc[item.status] = 0;
          }
          acc[item.status] += item.value;
          return acc;
        }, {});

        // تحويل البيانات إلى مصفوفة
        const orderChartData = Object.entries(ordersByStatus).map(
          ([status, value]) => ({
            status,
            value,
          }),
        );

        return (
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={orderChartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                nameKey="status"
                label={({ name, percent }) =>
                  `${name}: ${(percent * 100).toFixed(0)}%`
                }
              >
                {orderChartData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={
                      entry.status === "مكتمل" || entry.status === "مستلم"
                        ? "#10b981"
                        : "#f59e0b"
                    }
                  />
                ))}
              </Pie>
              <Tooltip
                formatter={(value) => [
                  `₴ ${(value as number).toLocaleString()}`,
                  "القيمة",
                ]}
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        );
      case "avg_order_value":
      case "purchase_avg_value":
        return (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={filteredData}>
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                opacity={0.3}
              />
              <XAxis dataKey="month" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip
                formatter={(value) => [`₴ ${value.toLocaleString()}`, "القيمة"]}
              />
              <Legend />
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="totalValue"
                name="إجمالي القيمة"
                stroke="#3b82f6"
                strokeWidth={2}
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="avgValue"
                name="متوسط القيمة"
                stroke="#10b981"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        );
      case "suppliers":
        // تجميع البيانات حسب الفئة
        const suppliersByCategory = filteredData.reduce(
          (acc: any, item: any) => {
            if (!acc[item.category]) {
              acc[item.category] = 0;
            }
            acc[item.category] += item.totalValue;
            return acc;
          },
          {},
        );

        // تحويل البيانات إلى مصفوفة
        const supplierChartData = Object.entries(suppliersByCategory).map(
          ([category, value]) => ({
            category,
            value,
          }),
        );

        return (
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={supplierChartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                nameKey="category"
                label={({ name, percent }) =>
                  `${name}: ${(percent * 100).toFixed(0)}%`
                }
              >
                {supplierChartData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={["#3b82f6", "#10b981", "#f59e0b"][index % 3]}
                  />
                ))}
              </Pie>
              <Tooltip
                formatter={(value) => [
                  `₴ ${(value as number).toLocaleString()}`,
                  "القيمة",
                ]}
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        );
      case "production_volume":
        return (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={filteredData}>
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                opacity={0.3}
              />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="volume" name="حجم الإنتاج" fill="#8b5cf6" />
              <Bar dataKey="target" name="المستهدف" fill="#e2e8f0" />
            </BarChart>
          </ResponsiveContainer>
        );
      case "production_efficiency":
        return (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={filteredData} layout="vertical">
              <CartesianGrid
                strokeDasharray="3 3"
                horizontal={false}
                opacity={0.3}
              />
              <XAxis type="number" domain={[0, 100]} />
              <YAxis type="category" dataKey="line" width={150} />
              <Tooltip />
              <Legend />
              <Bar dataKey="efficiency" name="الكفاءة" fill="#10b981" />
              <Bar dataKey="target" name="المستهدف" fill="#e2e8f0" />
            </BarChart>
          </ResponsiveContainer>
        );
      case "defect_rate":
        return (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={filteredData} layout="vertical">
              <CartesianGrid
                strokeDasharray="3 3"
                horizontal={false}
                opacity={0.3}
              />
              <XAxis type="number" />
              <YAxis type="category" dataKey="product" width={150} />
              <Tooltip />
              <Legend />
              <Bar dataKey="produced" name="الكمية المنتجة" fill="#3b82f6" />
              <Bar dataKey="defects" name="العيوب" fill="#ef4444" />
            </BarChart>
          </ResponsiveContainer>
        );
      case "on_time_delivery":
        return (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={filteredData}>
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                opacity={0.3}
              />
              <XAxis dataKey="month" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" domain={[90, 100]} />
              <Tooltip />
              <Legend />
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="orders"
                name="عدد الطلبات"
                stroke="#3b82f6"
                strokeWidth={2}
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="onTime"
                name="التسليم في الموعد"
                stroke="#10b981"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        );
      case "new_customers":
        // تجميع البيانات حسب المصدر
        const customersBySource = filteredData.reduce((acc: any, item: any) => {
          if (!acc[item.source]) {
            acc[item.source] = 0;
          }
          acc[item.source] += item.newCustomers;
          return acc;
        }, {});

        // تحويل البيانات إلى مصفوفة
        const customerSourceData = Object.entries(customersBySource).map(
          ([source, value]) => ({
            source,
            value,
          }),
        );

        return (
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={customerSourceData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                nameKey="source"
                label={({ name, percent }) =>
                  `${name}: ${(percent * 100).toFixed(0)}%`
                }
              >
                {customerSourceData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={["#3b82f6", "#10b981", "#f59e0b"][index % 3]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        );
      case "customer_retention":
        return (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={filteredData}>
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                opacity={0.3}
              />
              <XAxis dataKey="month" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" domain={[90, 100]} />
              <Tooltip />
              <Legend />
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="activeCustomers"
                name="العملاء النشطين"
                stroke="#3b82f6"
                strokeWidth={2}
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="churn"
                name="العملاء المفقودين"
                stroke="#ef4444"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        );
      case "conversion_rate":
        return (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={filteredData}>
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                opacity={0.3}
              />
              <XAxis dataKey="month" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip />
              <Legend />
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="leads"
                name="العملاء المحتملين"
                stroke="#3b82f6"
                strokeWidth={2}
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="conversions"
                name="التحويلات"
                stroke="#10b981"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        );
      case "sales_pipeline":
        return (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={filteredData} layout="vertical">
              <CartesianGrid
                strokeDasharray="3 3"
                horizontal={false}
                opacity={0.3}
              />
              <XAxis type="number" />
              <YAxis type="category" dataKey="stage" width={150} />
              <Tooltip
                formatter={(value) => [`₴ ${value.toLocaleString()}`, "القيمة"]}
              />
              <Legend />
              <Bar dataKey="value" name="القيمة المتوقعة" fill="#3b82f6" />
              <Bar dataKey="count" name="عدد العملاء" fill="#10b981" />
            </BarChart>
          </ResponsiveContainer>
        );
      case "total_employees":
        return (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={filteredData} layout="vertical">
              <CartesianGrid
                strokeDasharray="3 3"
                horizontal={false}
                opacity={0.3}
              />
              <XAxis type="number" />
              <YAxis type="category" dataKey="department" width={150} />
              <Tooltip formatter={(value) => [`${value}`, "العدد"]} />
              <Legend />
              <Bar dataKey="employees" name="عدد الموظفين" fill="#3b82f6" />
              <Bar dataKey="newHires" name="التعيينات الجديدة" fill="#10b981" />
            </BarChart>
          </ResponsiveContainer>
        );
      case "employee_turnover":
        return (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={filteredData}>
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                opacity={0.3}
              />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="employees"
                name="إجمالي الموظفين"
                stroke="#3b82f6"
                strokeWidth={2}
              />
              <Line
                type="monotone"
                dataKey="left"
                name="المغادرين"
                stroke="#ef4444"
                strokeWidth={2}
              />
              <Line
                type="monotone"
                dataKey="hired"
                name="التعيينات الجديدة"
                stroke="#10b981"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        );
      case "avg_performance":
        return (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={filteredData} layout="vertical">
              <CartesianGrid
                strokeDasharray="3 3"
                horizontal={false}
                opacity={0.3}
              />
              <XAxis type="number" domain={[0, 100]} />
              <YAxis type="category" dataKey="department" width={150} />
              <Tooltip />
              <Legend />
              <Bar dataKey="current" name="الأداء الحالي" fill="#3b82f6" />
              <Bar dataKey="previous" name="الأداء السابق" fill="#8b5cf6" />
              <Bar dataKey="target" name="المستهدف" fill="#e2e8f0" />
            </BarChart>
          </ResponsiveContainer>
        );
      case "training_hours":
        return (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={filteredData} layout="vertical">
              <CartesianGrid
                strokeDasharray="3 3"
                horizontal={false}
                opacity={0.3}
              />
              <XAxis type="number" />
              <YAxis type="category" dataKey="department" width={150} />
              <Tooltip />
              <Legend />
              <Bar dataKey="hours" name="ساعات التدريب" fill="#3b82f6" />
              <Bar
                dataKey="avgHours"
                name="متوسط الساعات للموظف"
                fill="#10b981"
              />
            </BarChart>
          </ResponsiveContainer>
        );
      default:
        return null;
    }
  };

  return (
    <Dialog open={open} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-5xl max-h-[80vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <div className="flex justify-between items-center">
            <DialogTitle className="text-xl font-bold">
              {getTitle()}
            </DialogTitle>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="h-8 w-8"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>

        {/* Filters */}
        <div className="flex flex-col md:flex-row justify-between gap-4 mb-4">
          <div className="flex flex-wrap gap-2">
            <div className="relative">
              <Search className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="بحث..."
                className="w-[200px] pr-9"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {kpiType !== "inventory" && (
              <Select value={periodFilter} onValueChange={setPeriodFilter}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="الفترة" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">جميع الفترات</SelectItem>
                  <SelectItem value="يناير">يناير</SelectItem>
                  <SelectItem value="فبراير">فبراير</SelectItem>
                  <SelectItem value="مارس">مارس</SelectItem>
                  <SelectItem value="أبريل">أبريل</SelectItem>
                  <SelectItem value="مايو">مايو</SelectItem>
                  <SelectItem value="يونيو">يونيو</SelectItem>
                </SelectContent>
              </Select>
            )}

            {kpiType === "inventory" && (
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="الفئة" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">جميع الفئات</SelectItem>
                  <SelectItem value="الملابس">الملابس</SelectItem>
                  <SelectItem value="الأحذية">الأحذية</SelectItem>
                  <SelectItem value="الإكسسوارات">الإكسسوارات</SelectItem>
                  <SelectItem value="الحقائب">الحقائب</SelectItem>
                  <SelectItem value="المنتجات المنزلية">
                    المنتجات المنزلية
                  </SelectItem>
                </SelectContent>
              </Select>
            )}

            <Select value={branchFilter} onValueChange={setBranchFilter}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="الفرع" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">جميع الفروع</SelectItem>
                <SelectItem value="main">الفرع الرئيسي</SelectItem>
                <SelectItem value="north">الفرع الشمالي</SelectItem>
                <SelectItem value="south">الفرع الجنوبي</SelectItem>
                <SelectItem value="east">الفرع الشرقي</SelectItem>
                <SelectItem value="west">الفرع الغربي</SelectItem>
              </SelectContent>
            </Select>

            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setSearchTerm("");
                setBranchFilter("all");
                setCategoryFilter("all");
                setPeriodFilter("all");
              }}
              className="h-10"
            >
              <Filter className="h-4 w-4 ml-1" />
              إعادة ضبط
            </Button>
          </div>

          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowChart(!showChart)}
              className="h-10"
            >
              <BarChart2 className="h-4 w-4 ml-1" />
              {showChart ? "إخفاء الرسم البياني" : "عرض الرسم البياني"}
            </Button>
            <Button variant="outline" size="sm" className="h-10">
              <Printer className="h-4 w-4 ml-1" />
              طباعة
            </Button>
            <Button variant="outline" size="sm" className="h-10">
              <Download className="h-4 w-4 ml-1" />
              تصدير
            </Button>
          </div>
        </div>

        {/* Chart (if enabled) */}
        {showChart && (
          <div className="h-64 mb-4 border rounded-md">{renderChart()}</div>
        )}

        {/* Data Table */}
        <div className="flex-1 overflow-auto border rounded-md">
          <Table>
            <TableHeader className="sticky top-0 bg-white">
              {renderTableHeaders()}
            </TableHeader>
            <TableBody>{renderTableRows()}</TableBody>
          </Table>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default KPIDetailsPopup;
