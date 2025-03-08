import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AccountingDashboard from "./AccountingDashboard";
import JournalEntries from "./JournalEntries";
import AccountTree from "./AccountTree";
import FinancialReports from "./FinancialReports";
import {
  Calculator,
  FileText,
  CreditCard,
  DollarSign,
  BarChart3,
} from "lucide-react";

const AccountingTabs = () => {
  return (
    <Tabs defaultValue="dashboard" className="w-full" dir="rtl">
      <TabsList className="mb-4">
        <TabsTrigger value="dashboard">
          <BarChart3 className="h-4 w-4 ml-2" />
          لوحة التحكم
        </TabsTrigger>
        <TabsTrigger value="journal">
          <FileText className="h-4 w-4 ml-2" />
          دفتر اليومية
        </TabsTrigger>
        <TabsTrigger value="accounts">
          <Calculator className="h-4 w-4 ml-2" />
          شجرة الحسابات
        </TabsTrigger>
        <TabsTrigger value="reports">
          <DollarSign className="h-4 w-4 ml-2" />
          التقارير المالية
        </TabsTrigger>
      </TabsList>

      <TabsContent value="dashboard">
        <AccountingDashboard />
      </TabsContent>

      <TabsContent value="journal">
        <JournalEntries />
      </TabsContent>

      <TabsContent value="accounts">
        <AccountTree />
      </TabsContent>

      <TabsContent value="reports">
        <FinancialReports />
      </TabsContent>
    </Tabs>
  );
};

export default AccountingTabs;
