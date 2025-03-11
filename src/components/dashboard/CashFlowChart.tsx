import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ArrowUpCircle,
  ArrowDownCircle,
  TrendingUp,
  TrendingDown,
  Calendar,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface CashFlowData {
  month: string;
  income: number;
  expenses: number;
}

interface CashFlowChartProps {
  data?: CashFlowData[];
  title?: string;
  subtitle?: string;
  onChartClick?: (chartType: string, period?: string) => void;
}

const defaultData: CashFlowData[] = [
  { month: "يناير", income: 45000, expenses: 32000 },
  { month: "فبراير", income: 52000, expenses: 34000 },
  { month: "مارس", income: 49000, expenses: 36000 },
  { month: "أبريل", income: 63000, expenses: 40000 },
  { month: "مايو", income: 58000, expenses: 45000 },
  { month: "يونيو", income: 71000, expenses: 42000 },
];

const CashFlowChart: React.FC<CashFlowChartProps> = ({
  data = defaultData,
  title = "التدفق النقدي",
  subtitle = "تحليل الإيرادات والمصروفات",
  onChartClick,
}) => {
  const [period, setPeriod] = useState("monthly");
  const [view, setView] = useState("chart");

  // Calculate totals
  const totalIncome = data.reduce((sum, item) => sum + item.income, 0);
  const totalExpenses = data.reduce((sum, item) => sum + item.expenses, 0);
  const netCashFlow = totalIncome - totalExpenses;
  const isPositiveFlow = netCashFlow >= 0;

  // Find max value for chart scaling
  const maxValue = Math.max(
    ...data.map((item) => Math.max(item.income, item.expenses)),
  );

  // معالجة النقر على الرسم البياني
  const handleChartClick = (chartType: string, period?: string) => {
    if (onChartClick) {
      onChartClick(chartType, period);
    }
  };

  // معالجة النقر على شريط الرسم البياني
  const handleBarClick = (month: string) => {
    if (onChartClick) {
      onChartClick("cashflow", month);
    }
  };

  return (
    <Card
      className="w-full h-full bg-white shadow-sm border border-[#e2e8f0] rounded-[0.5rem] cursor-pointer hover:shadow-md transition-shadow"
      dir="rtl"
      onClick={() => handleChartClick("cashflow")}
    >
      <CardHeader className="pb-2 pt-4 px-4">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-[1.125rem] font-bold text-[#1e293b]">
              {title}
            </CardTitle>
            <p className="text-[0.875rem] text-[#64748b]">{subtitle}</p>
          </div>
          <div className="flex space-x-2 space-x-reverse">
            <Select
              defaultValue={period}
              onValueChange={setPeriod}
              onOpenChange={(open) => {
                if (open) {
                  // منع انتشار الحدث عند فتح القائمة المنسدلة
                  event?.stopPropagation();
                }
              }}
            >
              <SelectTrigger
                className="w-[140px] h-9 border-[#e2e8f0]"
                onClick={(e) => e.stopPropagation()}
              >
                <Calendar className="h-4 w-4 ml-2 text-[#64748b]" />
                <SelectValue placeholder="الفترة" />
              </SelectTrigger>
              <SelectContent className="border-[#e2e8f0]">
                <SelectItem value="weekly">أسبوعي</SelectItem>
                <SelectItem value="monthly">شهري</SelectItem>
                <SelectItem value="quarterly">ربع سنوي</SelectItem>
                <SelectItem value="yearly">سنوي</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>
      <CardContent className="px-4 pb-4">
        <Tabs
          defaultValue="chart"
          className="w-full"
          onValueChange={setView}
          onClick={(e) => e.stopPropagation()}
        >
          <TabsList className="mb-4 bg-[#f8fafc]">
            <TabsTrigger
              value="chart"
              className="data-[state=active]:bg-white data-[state=active]:text-[#1e293b] data-[state=active]:shadow-sm text-[0.875rem]"
              onClick={(e) => e.stopPropagation()}
            >
              رسم بياني
            </TabsTrigger>
            <TabsTrigger
              value="summary"
              className="data-[state=active]:bg-white data-[state=active]:text-[#1e293b] data-[state=active]:shadow-sm text-[0.875rem]"
              onClick={(e) => e.stopPropagation()}
            >
              ملخص
            </TabsTrigger>
          </TabsList>

          <TabsContent value="chart" className="space-y-4">
            <div className="h-[250px] w-full relative">
              {/* Chart bars */}
              <div className="flex h-[200px] items-end justify-between px-2">
                {data.map((item, index) => (
                  <div
                    key={index}
                    className="flex flex-col items-center space-y-2 w-1/6"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleBarClick(item.month);
                    }}
                  >
                    <div className="w-full flex justify-center space-x-1 space-x-reverse">
                      {/* Income bar */}
                      <div className="w-6 relative h-[180px] flex items-end cursor-pointer">
                        <div
                          className="w-full bg-[#10b981] rounded-t-sm absolute bottom-0"
                          style={{
                            height: `${(item.income / maxValue) * 180}px`,
                          }}
                        />
                      </div>
                      {/* Expenses bar */}
                      <div className="w-6 relative h-[180px] flex items-end cursor-pointer">
                        <div
                          className="w-full bg-[#ef4444] rounded-t-sm absolute bottom-0"
                          style={{
                            height: `${(item.expenses / maxValue) * 180}px`,
                          }}
                        />
                      </div>
                    </div>
                    <span className="text-[0.75rem] text-[#64748b] mt-1">
                      {item.month}
                    </span>
                  </div>
                ))}
              </div>

              {/* Legend */}
              <div className="flex justify-center mt-2 space-x-4 space-x-reverse">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-[#10b981] rounded-sm mr-1"></div>
                  <span className="text-[0.75rem] text-[#1e293b]">
                    الإيرادات
                  </span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-[#ef4444] rounded-sm mr-1"></div>
                  <span className="text-[0.75rem] text-[#1e293b]">
                    المصروفات
                  </span>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="summary">
            <div className="grid grid-cols-3 gap-4">
              <div
                className="bg-[#f8fafc] p-4 rounded-lg border border-[#e2e8f0] cursor-pointer hover:bg-[#f1f5f9] transition-colors"
                onClick={(e) => {
                  e.stopPropagation();
                  handleChartClick("cashflow", "income");
                }}
              >
                <div className="flex items-center">
                  <ArrowUpCircle className="h-8 w-8 text-[#10b981] ml-2" />
                  <div>
                    <p className="text-[0.875rem] text-[#64748b]">
                      إجمالي الإيرادات
                    </p>
                    <p className="text-[1.25rem] font-bold text-[#1e293b]">
                      {totalIncome.toLocaleString()} ₴
                    </p>
                  </div>
                </div>
              </div>

              <div
                className="bg-[#f8fafc] p-4 rounded-lg border border-[#e2e8f0] cursor-pointer hover:bg-[#f1f5f9] transition-colors"
                onClick={(e) => {
                  e.stopPropagation();
                  handleChartClick("cashflow", "expenses");
                }}
              >
                <div className="flex items-center">
                  <ArrowDownCircle className="h-8 w-8 text-[#ef4444] ml-2" />
                  <div>
                    <p className="text-[0.875rem] text-[#64748b]">
                      إجمالي المصروفات
                    </p>
                    <p className="text-[1.25rem] font-bold text-[#1e293b]">
                      {totalExpenses.toLocaleString()} ₴
                    </p>
                  </div>
                </div>
              </div>

              <div
                className={cn(
                  "p-4 rounded-lg border cursor-pointer hover:opacity-90 transition-opacity",
                  isPositiveFlow
                    ? "bg-[#ecfdf5] border-[#d1fae5]"
                    : "bg-[#fef2f2] border-[#fee2e2]",
                )}
                onClick={(e) => {
                  e.stopPropagation();
                  handleChartClick("cashflow", "net");
                }}
              >
                <div className="flex items-center">
                  {isPositiveFlow ? (
                    <TrendingUp className="h-8 w-8 text-[#10b981] ml-2" />
                  ) : (
                    <TrendingDown className="h-8 w-8 text-[#ef4444] ml-2" />
                  )}
                  <div>
                    <p className="text-[0.875rem] text-[#64748b]">
                      صافي التدفق النقدي
                    </p>
                    <p
                      className={cn(
                        "text-[1.25rem] font-bold",
                        isPositiveFlow ? "text-[#10b981]" : "text-[#ef4444]",
                      )}
                    >
                      {Math.abs(netCashFlow).toLocaleString()} ₴
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default CashFlowChart;
