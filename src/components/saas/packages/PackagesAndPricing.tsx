import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Package, ListFilter, LineChart } from "lucide-react";
import PackagesList from "./PackagesList";
import PackageComparison from "./PackageComparison";
import PricingAnalytics from "./PricingAnalytics";

// بيانات تجريبية للباقات
const packagesData = [
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

const PackagesAndPricing = () => {
  const [activeTab, setActiveTab] = useState("packages");

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="packages">
            <Package className="h-4 w-4 ml-2" />
            إدارة الباقات
          </TabsTrigger>
          <TabsTrigger value="comparison">
            <ListFilter className="h-4 w-4 ml-2" />
            مقارنة الباقات
          </TabsTrigger>
          <TabsTrigger value="analytics">
            <LineChart className="h-4 w-4 ml-2" />
            تحليلات التسعير
          </TabsTrigger>
        </TabsList>

        <TabsContent value="packages" className="mt-0">
          <PackagesList />
        </TabsContent>

        <TabsContent value="comparison" className="mt-0">
          <PackageComparison packages={packagesData} />
        </TabsContent>

        <TabsContent value="analytics" className="mt-0">
          <PricingAnalytics packages={packagesData} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PackagesAndPricing;
