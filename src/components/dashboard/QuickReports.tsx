import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";
import {
  ArrowRight,
  Download,
  Filter,
  PieChart as PieChartIcon,
} from "lucide-react";
import DashboardDetailsPopup from "./DashboardDetailsPopup";

interface QuickReportsProps {
  title?: string;
}

const QuickReports = ({ title = "التقارير السريعة" }: QuickReportsProps) => {
  const [showDetailsPopup, setShowDetailsPopup] = useState(false);
  const [selectedDataPoint, setSelectedDataPoint] = useState<any>(null);
  const [selectedReportId, setSelectedReportId] = useState<number | null>(null);

  // بيانات تجريبية للرسم البياني
  const data = [
    { name: "ملابس", value: 45 },
    { name: "أحذية", value: 25 },
    { name: "إكسسوارات", value: 15 },
    { name: "أقمشة", value: 10 },
    { name: "أخرى", value: 5 },
  ];

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"];

  // بيانات تجريبية للتقارير
  const reports = [
    {
      id: 1,
      title: "المبيعات حسب المنتج",
      description: "تقرير تفصيلي عن المبيعات حسب المنتج",
      updated: "منذ 2 ساعة",
      status: "محدث",
    },
    {
      id: 2,
      title: "المبيعات حسب العميل",
      description: "تقرير تفصيلي عن المبيعات حسب العميل",
      updated: "منذ 1 يوم",
      status: "محدث",
    },
    {
      id: 3,
      title: "المخزون المنخفض",
      description: "تقرير بالمنتجات التي وصلت لحد إعادة الطلب",
      updated: "منذ 3 ساعات",
      status: "يحتاج مراجعة",
    },
  ];

  const handleChartClick = (data: any) => {
    if (data && data.activePayload && data.activePayload.length > 0) {
      setSelectedDataPoint(data.activePayload[0].payload);
      setShowDetailsPopup(true);
    }
  };

  const handleReportClick = (reportId: number) => {
    setSelectedReportId(reportId);
    setShowDetailsPopup(true);
  };

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-base font-medium">{title}</CardTitle>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Filter className="ml-2 h-4 w-4" />
            تصفية
          </Button>
          <Button variant="outline" size="sm">
            <Download className="ml-2 h-4 w-4" />
            تصدير
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* الرسم البياني */}
          <div className="md:col-span-1">
            <div className="h-[180px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart onClick={handleChartClick}>
                  <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    nameKey="name"
                    label={({ name, percent }) =>
                      `${name}: ${(percent * 100).toFixed(0)}%`
                    }
                  >
                    {data.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="text-center mt-2">
              <h3 className="text-sm font-medium">المبيعات حسب الفئة</h3>
            </div>
          </div>

          {/* قائمة التقارير */}
          <div className="md:col-span-2">
            <div className="space-y-4">
              {reports.map((report) => (
                <div
                  key={report.id}
                  className="flex justify-between items-center p-3 border rounded-md hover:bg-gray-50 transition-colors cursor-pointer"
                  onClick={() => handleReportClick(report.id)}
                >
                  <div>
                    <h3 className="font-medium">{report.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {report.description}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-muted-foreground">
                        {report.updated}
                      </span>
                      <Badge
                        className={
                          report.status === "محدث"
                            ? "bg-green-100 text-green-800"
                            : "bg-amber-100 text-amber-800"
                        }
                      >
                        {report.status}
                      </Badge>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>

      {/* نافذة التفاصيل */}
      <DashboardDetailsPopup
        open={showDetailsPopup}
        onClose={() => setShowDetailsPopup(false)}
        chartType="products"
        title={
          selectedReportId
            ? reports.find((r) => r.id === selectedReportId)?.title ||
              "تفاصيل التقرير"
            : "المبيعات حسب الفئة"
        }
        dataPoint={selectedDataPoint}
      />
    </Card>
  );
};

export default QuickReports;
