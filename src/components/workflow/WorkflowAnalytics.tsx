import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  BarChart2,
  TrendingUp,
  TrendingDown,
  Clock,
  CheckCircle,
  AlertCircle,
  FileText,
  Download,
  Calendar,
  Filter,
  BarChart,
  PieChart,
  LineChart,
  Activity,
} from "lucide-react";
import { Progress } from "@/components/ui/progress";

const WorkflowAnalytics = () => {
  // بيانات تجريبية لإحصائيات سير العمل
  const workflowStats = {
    totalWorkflows: 5,
    activeWorkflows: 3,
    completedToday: 2,
    pendingApprovals: 1,
    averageCompletionTime: "4.5 ساعات",
    successRate: 92,
    totalInstances: 140,
    completedInstances: 98,
    pendingInstances: 32,
    cancelledInstances: 10,
  };

  // بيانات تجريبية لأداء سير العمل
  const workflowPerformance = [
    {
      id: "WF-001",
      name: "دورة الموافقة على المشتريات",
      instances: 24,
      completedInstances: 18,
      averageTime: "6.2 ساعات",
      successRate: 95,
      bottleneck: "الموافقة النهائية",
      trend: "up",
    },
    {
      id: "WF-002",
      name: "معالجة طلبات العملاء",
      instances: 56,
      completedInstances: 42,
      averageTime: "3.8 ساعات",
      successRate: 88,
      bottleneck: "مراجعة الطلب",
      trend: "down",
    },
    {
      id: "WF-003",
      name: "الموافقة على الإجازات",
      instances: 18,
      completedInstances: 15,
      averageTime: "5.1 ساعات",
      successRate: 94,
      bottleneck: "موافقة المدير",
      trend: "up",
    },
  ];

  // بيانات تجريبية لتوزيع الوقت حسب الخطوات
  const stepTimeDistribution = [
    {
      workflowId: "WF-001",
      workflowName: "دورة الموافقة على المشتريات",
      steps: [
        { name: "طلب الشراء", averageTime: "0.5 ساعة", percentage: 8 },
        { name: "الموافقة الأولية", averageTime: "2.1 ساعات", percentage: 34 },
        { name: "الموافقة النهائية", averageTime: "3.2 ساعات", percentage: 52 },
        { name: "إنشاء أمر شراء", averageTime: "0.4 ساعة", percentage: 6 },
      ],
    },
    {
      workflowId: "WF-002",
      workflowName: "معالجة طلبات العملاء",
      steps: [
        { name: "إنشاء الطلب", averageTime: "0.3 ساعة", percentage: 8 },
        { name: "مراجعة الطلب", averageTime: "2.5 ساعات", percentage: 66 },
        { name: "تجهيز الطلب", averageTime: "0.8 ساعة", percentage: 21 },
        { name: "إرسال الطلب", averageTime: "0.2 ساعة", percentage: 5 },
      ],
    },
  ];

  // بيانات تجريبية للاتجاهات الشهرية
  const monthlyTrends = [
    { month: "يناير", instances: 20, completionRate: 85, averageTime: 5.2 },
    { month: "فبراير", instances: 25, completionRate: 88, averageTime: 5.0 },
    { month: "مارس", instances: 30, completionRate: 90, averageTime: 4.8 },
    { month: "أبريل", instances: 28, completionRate: 92, averageTime: 4.5 },
    { month: "مايو", instances: 35, completionRate: 91, averageTime: 4.6 },
    { month: "يونيو", instances: 32, completionRate: 93, averageTime: 4.3 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-xl font-bold">تحليلات سير العمل</h3>
          <p className="text-muted-foreground">
            تحليل أداء سير العمل وتحديد فرص التحسين
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Calendar className="ml-2 h-4 w-4" />
            آخر 30 يوم
          </Button>
          <Button variant="outline">
            <Download className="ml-2 h-4 w-4" />
            تصدير التقرير
          </Button>
        </div>
      </div>

      {/* ملخص الأداء */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-muted-foreground">
                  معدل إكمال سير العمل
                </p>
                <h3 className="text-2xl font-bold mt-2">
                  {Math.round(
                    (workflowStats.completedInstances /
                      workflowStats.totalInstances) *
                      100,
                  )}
                  %
                </h3>
                <div className="mt-2">
                  <Progress
                    value={
                      (workflowStats.completedInstances /
                        workflowStats.totalInstances) *
                      100
                    }
                    className="h-2"
                  />
                </div>
              </div>
              <div className="p-2 bg-green-100 rounded-full">
                <CheckCircle className="h-5 w-5 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-muted-foreground">
                  متوسط وقت الإكمال
                </p>
                <h3 className="text-2xl font-bold mt-2">
                  {workflowStats.averageCompletionTime}
                </h3>
                <p className="text-xs text-green-600 mt-2 flex items-center">
                  <TrendingDown className="h-3 w-3 mr-1" />
                  انخفاض بنسبة 12% عن الشهر الماضي
                </p>
              </div>
              <div className="p-2 bg-blue-100 rounded-full">
                <Clock className="h-5 w-5 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-muted-foreground">
                  عمليات قيد الانتظار
                </p>
                <h3 className="text-2xl font-bold mt-2">
                  {workflowStats.pendingInstances}
                </h3>
                <p className="text-xs text-amber-600 mt-2 flex items-center">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  زيادة بنسبة 5% عن الشهر الماضي
                </p>
              </div>
              <div className="p-2 bg-amber-100 rounded-full">
                <AlertCircle className="h-5 w-5 text-amber-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-muted-foreground">
                  معدل نجاح العمليات
                </p>
                <h3 className="text-2xl font-bold mt-2">
                  {workflowStats.successRate}%
                </h3>
                <p className="text-xs text-green-600 mt-2 flex items-center">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  زيادة بنسبة 3% عن الشهر الماضي
                </p>
              </div>
              <div className="p-2 bg-purple-100 rounded-full">
                <Activity className="h-5 w-5 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* تحليلات مفصلة */}
      <Tabs defaultValue="performance" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="performance">
            <BarChart className="h-4 w-4 ml-2" />
            أداء سير العمل
          </TabsTrigger>
          <TabsTrigger value="bottlenecks">
            <Activity className="h-4 w-4 ml-2" />
            نقاط الاختناق
          </TabsTrigger>
          <TabsTrigger value="trends">
            <LineChart className="h-4 w-4 ml-2" />
            الاتجاهات
          </TabsTrigger>
        </TabsList>

        {/* تبويب أداء سير العمل */}
        <TabsContent value="performance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>أداء سير العمل</CardTitle>
              <CardDescription>
                تحليل أداء كل سير عمل ومعدلات النجاح وأوقات الإكمال
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>سير العمل</TableHead>
                    <TableHead>العمليات</TableHead>
                    <TableHead>المكتملة</TableHead>
                    <TableHead>متوسط الوقت</TableHead>
                    <TableHead>معدل النجاح</TableHead>
                    <TableHead>الاتجاه</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {workflowPerformance.map((workflow) => (
                    <TableRow key={workflow.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{workflow.name}</div>
                          <div className="text-xs text-muted-foreground">
                            {workflow.id}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{workflow.instances}</TableCell>
                      <TableCell>{workflow.completedInstances}</TableCell>
                      <TableCell>{workflow.averageTime}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <span>{workflow.successRate}%</span>
                          <Progress
                            value={workflow.successRate}
                            className="h-2 w-16"
                          />
                        </div>
                      </TableCell>
                      <TableCell>
                        {workflow.trend === "up" ? (
                          <TrendingUp className="h-4 w-4 text-green-600" />
                        ) : (
                          <TrendingDown className="h-4 w-4 text-red-600" />
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* تبويب نقاط الاختناق */}
        <TabsContent value="bottlenecks" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>تحليل نقاط الاختناق</CardTitle>
              <CardDescription>
                تحديد الخطوات التي تستغرق وقتاً أطول في سير العمل
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {stepTimeDistribution.map((workflow) => (
                  <div key={workflow.workflowId} className="space-y-4">
                    <h3 className="text-lg font-medium">
                      {workflow.workflowName}
                    </h3>
                    <div className="space-y-3">
                      {workflow.steps.map((step, index) => (
                        <div key={index} className="space-y-1">
                          <div className="flex justify-between text-sm">
                            <span>{step.name}</span>
                            <span>{step.averageTime}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Progress
                              value={step.percentage}
                              className={`h-2 ${step.percentage > 40 ? "bg-amber-100" : ""}`}
                            />
                            <span className="text-xs">{step.percentage}%</span>
                          </div>
                          {step.percentage > 40 && (
                            <p className="text-xs text-amber-600 flex items-center">
                              <AlertCircle className="h-3 w-3 mr-1" />
                              نقطة اختناق محتملة
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>توصيات التحسين</CardTitle>
              <CardDescription>
                اقتراحات لتحسين أداء سير العمل وتقليل نقاط الاختناق
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 border rounded-md">
                  <h3 className="font-medium mb-2 flex items-center">
                    <TrendingUp className="h-4 w-4 text-green-600 mr-2" />
                    تحسين عملية الموافقة النهائية
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    تقليل وقت الموافقة النهائية في دورة الموافقة على المشتريات
                    من خلال إضافة تذكيرات تلقائية وتحديد مهل زمنية واضحة.
                  </p>
                  <div className="mt-2">
                    <Badge className="bg-green-100 text-green-800">
                      توفير 30% من الوقت
                    </Badge>
                  </div>
                </div>

                <div className="p-4 border rounded-md">
                  <h3 className="font-medium mb-2 flex items-center">
                    <TrendingUp className="h-4 w-4 text-green-600 mr-2" />
                    أتمتة مراجعة الطلبات
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    أتمتة جزء من عملية مراجعة الطلبات في معالجة طلبات العملاء
                    باستخدام قواعد تحقق تلقائية للطلبات البسيطة.
                  </p>
                  <div className="mt-2">
                    <Badge className="bg-green-100 text-green-800">
                      توفير 40% من الوقت
                    </Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* تبويب الاتجاهات */}
        <TabsContent value="trends" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>الاتجاهات الشهرية</CardTitle>
              <CardDescription>
                تحليل اتجاهات أداء سير العمل على مدار الأشهر الماضية
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>الشهر</TableHead>
                    <TableHead>عدد العمليات</TableHead>
                    <TableHead>معدل الإكمال</TableHead>
                    <TableHead>متوسط الوقت (ساعات)</TableHead>
                    <TableHead>التغيير</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {monthlyTrends.map((month, index) => {
                    const prevMonth =
                      index > 0 ? monthlyTrends[index - 1] : null;
                    const timeChange = prevMonth
                      ? ((month.averageTime - prevMonth.averageTime) /
                          prevMonth.averageTime) *
                        100
                      : 0;
                    const rateChange = prevMonth
                      ? month.completionRate - prevMonth.completionRate
                      : 0;

                    return (
                      <TableRow key={month.month}>
                        <TableCell>{month.month}</TableCell>
                        <TableCell>{month.instances}</TableCell>
                        <TableCell>{month.completionRate}%</TableCell>
                        <TableCell>{month.averageTime.toFixed(1)}</TableCell>
                        <TableCell>
                          {timeChange !== 0 && (
                            <div className="flex items-center gap-1">
                              {timeChange < 0 ? (
                                <>
                                  <TrendingDown className="h-4 w-4 text-green-600" />
                                  <span className="text-xs text-green-600">
                                    {Math.abs(timeChange).toFixed(1)}% أسرع
                                  </span>
                                </>
                              ) : (
                                <>
                                  <TrendingUp className="h-4 w-4 text-red-600" />
                                  <span className="text-xs text-red-600">
                                    {timeChange.toFixed(1)}% أبطأ
                                  </span>
                                </>
                              )}
                            </div>
                          )}
                          {rateChange !== 0 && (
                            <div className="flex items-center gap-1 mt-1">
                              {rateChange > 0 ? (
                                <>
                                  <TrendingUp className="h-4 w-4 text-green-600" />
                                  <span className="text-xs text-green-600">
                                    +{rateChange}% معدل إكمال
                                  </span>
                                </>
                              ) : (
                                <>
                                  <TrendingDown className="h-4 w-4 text-red-600" />
                                  <span className="text-xs text-red-600">
                                    {rateChange}% معدل إكمال
                                  </span>
                                </>
                              )}
                            </div>
                          )}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>توزيع حالات سير العمل</CardTitle>
                <CardDescription>
                  توزيع حالات سير العمل حسب الحالة
                </CardDescription>
              </CardHeader>
              <CardContent className="flex justify-center items-center p-6">
                <div className="text-center">
                  <PieChart className="h-32 w-32 mx-auto text-muted-foreground" />
                  <div className="mt-4 grid grid-cols-2 gap-2">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                      <span className="text-sm">
                        مكتمل ({workflowStats.completedInstances})
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                      <span className="text-sm">
                        قيد التنفيذ ({workflowStats.pendingInstances})
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                      <span className="text-sm">
                        معلق ({workflowStats.pendingApprovals})
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                      <span className="text-sm">
                        ملغي ({workflowStats.cancelledInstances})
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>اتجاه وقت الإكمال</CardTitle>
                <CardDescription>
                  متوسط وقت إكمال سير العمل على مدار الوقت
                </CardDescription>
              </CardHeader>
              <CardContent className="flex justify-center items-center p-6">
                <div className="text-center w-full">
                  <LineChart className="h-32 w-full mx-auto text-muted-foreground" />
                  <div className="mt-4 flex justify-between text-sm text-muted-foreground">
                    <span>يناير</span>
                    <span>فبراير</span>
                    <span>مارس</span>
                    <span>أبريل</span>
                    <span>مايو</span>
                    <span>يونيو</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default WorkflowAnalytics;
