import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Calendar as CalendarIcon,
  Search,
  Plus,
  Edit,
  Trash,
  Calendar,
  BarChart,
  Users,
  Target,
  Mail,
  MessageSquare,
  Share2,
  FileText,
  Download,
  Filter,
  ChevronDown,
  Check,
  Clock,
  AlertCircle,
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
  Youtube,
} from "lucide-react";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { ar } from "date-fns/locale";
import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts";

// Sample campaign data
const campaignsData = [
  {
    id: "1",
    name: "حملة العودة إلى المدارس",
    type: "email",
    status: "active",
    startDate: "2024-08-15",
    endDate: "2024-09-15",
    budget: 5000,
    expectedRevenue: 25000,
    targetAudience: "أولياء الأمور والطلاب",
    description: "حملة ترويجية للمستلزمات المكتبية والأثاث المدرسي",
  },
  {
    id: "2",
    name: "عروض نهاية العام",
    type: "social",
    status: "scheduled",
    startDate: "2024-12-01",
    endDate: "2024-12-31",
    budget: 8000,
    expectedRevenue: 40000,
    targetAudience: "جميع العملاء",
    description: "تخفيضات وعروض خاصة بمناسبة نهاية العام",
  },
  {
    id: "3",
    name: "حملة الشركات الصغيرة",
    type: "email",
    status: "completed",
    startDate: "2024-05-01",
    endDate: "2024-06-15",
    budget: 3500,
    expectedRevenue: 18000,
    actualRevenue: 22000,
    targetAudience: "الشركات الصغيرة والمتوسطة",
    description: "عروض خاصة للشركات الصغيرة والمتوسطة",
  },
  {
    id: "4",
    name: "إطلاق المنتج الجديد",
    type: "event",
    status: "draft",
    startDate: "2024-10-15",
    endDate: "2024-10-15",
    budget: 12000,
    expectedRevenue: 60000,
    targetAudience: "العملاء الحاليين والمحتملين",
    description: "حدث إطلاق المنتج الجديد في فندق الريتز",
  },
  {
    id: "5",
    name: "حملة رمضان",
    type: "sms",
    status: "cancelled",
    startDate: "2025-03-01",
    endDate: "2025-04-01",
    budget: 2500,
    expectedRevenue: 15000,
    targetAudience: "جميع العملاء",
    description: "عروض وتخفيضات خاصة بشهر رمضان",
  },
];

// Sample campaign performance data
const campaignPerformanceData = [
  { name: "الأسبوع 1", مشاهدات: 1200, نقرات: 350, تحويلات: 45 },
  { name: "الأسبوع 2", مشاهدات: 1800, نقرات: 520, تحويلات: 68 },
  { name: "الأسبوع 3", مشاهدات: 2400, نقرات: 680, تحويلات: 92 },
  { name: "الأسبوع 4", مشاهدات: 3000, نقرات: 820, تحويلات: 120 },
];

// Sample campaign channel distribution data
const channelDistributionData = [
  { name: "البريد الإلكتروني", value: 40 },
  { name: "وسائل التواصل", value: 30 },
  { name: "الرسائل النصية", value: 15 },
  { name: "الفعاليات", value: 15 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const Campaigns = () => {
  const [activeTab, setActiveTab] = useState("list");
  const [showAddCampaign, setShowAddCampaign] = useState(false);
  const [showCampaignDetails, setShowCampaignDetails] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [campaignType, setCampaignType] = useState("all");
  const [campaignStatus, setCampaignStatus] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Filter campaigns based on search, type, and status
  const filteredCampaigns = campaignsData.filter((campaign) => {
    const matchesSearch = campaign.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesType =
      campaignType === "all" || campaign.type === campaignType;
    const matchesStatus =
      campaignStatus === "all" || campaign.status === campaignStatus;
    return matchesSearch && matchesType && matchesStatus;
  });

  // Handle campaign selection for details view
  const handleCampaignSelect = (campaign) => {
    setSelectedCampaign(campaign);
    setShowCampaignDetails(true);
  };

  // Format date for display
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return format(date, "dd MMMM yyyy", { locale: ar });
  };

  // Get status badge class
  const getStatusBadgeClass = (status) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "scheduled":
        return "bg-blue-100 text-blue-800";
      case "completed":
        return "bg-purple-100 text-purple-800";
      case "draft":
        return "bg-gray-100 text-gray-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Get status text in Arabic
  const getStatusText = (status) => {
    switch (status) {
      case "active":
        return "نشطة";
      case "scheduled":
        return "مجدولة";
      case "completed":
        return "مكتملة";
      case "draft":
        return "مسودة";
      case "cancelled":
        return "ملغاة";
      default:
        return status;
    }
  };

  // Get campaign type icon
  const getCampaignTypeIcon = (type) => {
    switch (type) {
      case "email":
        return <Mail className="h-4 w-4 text-blue-500" />;
      case "sms":
        return <MessageSquare className="h-4 w-4 text-purple-500" />;
      case "social":
        return <Share2 className="h-4 w-4 text-green-500" />;
      case "event":
        return <Calendar className="h-4 w-4 text-amber-500" />;
      default:
        return <Mail className="h-4 w-4" />;
    }
  };

  // Get campaign type text in Arabic
  const getCampaignTypeText = (type) => {
    switch (type) {
      case "email":
        return "بريد إلكتروني";
      case "sms":
        return "رسائل نصية";
      case "social":
        return "وسائل التواصل";
      case "event":
        return "فعالية";
      case "other":
        return "أخرى";
      default:
        return type;
    }
  };

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="list">
            <FileText className="h-4 w-4 ml-2" />
            قائمة الحملات
          </TabsTrigger>
          <TabsTrigger value="calendar">
            <Calendar className="h-4 w-4 ml-2" />
            تقويم الحملات
          </TabsTrigger>
          <TabsTrigger value="analytics">
            <BarChart className="h-4 w-4 ml-2" />
            تحليل الأداء
          </TabsTrigger>
        </TabsList>

        {/* Campaigns List Tab */}
        <TabsContent value="list" className="space-y-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="flex flex-col md:flex-row gap-2 w-full md:w-auto">
              <div className="relative w-full md:w-64">
                <Search className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="بحث عن حملة..."
                  className="pr-9"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <div className="flex gap-2">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full md:w-auto">
                      <Filter className="h-4 w-4 ml-2" />
                      تصفية
                      <ChevronDown className="h-4 w-4 mr-2" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-80">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label>نوع الحملة</Label>
                        <Select
                          value={campaignType}
                          onValueChange={setCampaignType}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="جميع الأنواع" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">جميع الأنواع</SelectItem>
                            <SelectItem value="email">بريد إلكتروني</SelectItem>
                            <SelectItem value="sms">رسائل نصية</SelectItem>
                            <SelectItem value="social">
                              وسائل التواصل
                            </SelectItem>
                            <SelectItem value="event">فعالية</SelectItem>
                            <SelectItem value="other">أخرى</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label>حالة الحملة</Label>
                        <Select
                          value={campaignStatus}
                          onValueChange={setCampaignStatus}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="جميع الحالات" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">جميع الحالات</SelectItem>
                            <SelectItem value="active">نشطة</SelectItem>
                            <SelectItem value="scheduled">مجدولة</SelectItem>
                            <SelectItem value="completed">مكتملة</SelectItem>
                            <SelectItem value="draft">مسودة</SelectItem>
                            <SelectItem value="cancelled">ملغاة</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label>الفترة الزمنية</Label>
                        <div className="flex gap-2">
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button
                                variant="outline"
                                className="w-full justify-start text-right font-normal"
                              >
                                {startDate ? (
                                  format(startDate, "dd/MM/yyyy")
                                ) : (
                                  <span>تاريخ البدء</span>
                                )}
                                <CalendarIcon className="mr-auto h-4 w-4" />
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                              <CalendarComponent
                                mode="single"
                                selected={startDate}
                                onSelect={setStartDate}
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button
                                variant="outline"
                                className="w-full justify-start text-right font-normal"
                              >
                                {endDate ? (
                                  format(endDate, "dd/MM/yyyy")
                                ) : (
                                  <span>تاريخ الانتهاء</span>
                                )}
                                <CalendarIcon className="mr-auto h-4 w-4" />
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                              <CalendarComponent
                                mode="single"
                                selected={endDate}
                                onSelect={setEndDate}
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                        </div>
                      </div>

                      <div className="flex justify-end gap-2">
                        <Button
                          variant="outline"
                          onClick={() => {
                            setCampaignType("all");
                            setCampaignStatus("all");
                            setStartDate(null);
                            setEndDate(null);
                          }}
                        >
                          إعادة تعيين
                        </Button>
                        <Button>
                          <Check className="ml-2 h-4 w-4" />
                          تطبيق
                        </Button>
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            <Button onClick={() => setShowAddCampaign(true)}>
              <Plus className="ml-2 h-4 w-4" />
              إنشاء حملة جديدة
            </Button>
          </div>

          <div className="border rounded-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>اسم الحملة</TableHead>
                  <TableHead>النوع</TableHead>
                  <TableHead>الحالة</TableHead>
                  <TableHead>تاريخ البدء</TableHead>
                  <TableHead>تاريخ الانتهاء</TableHead>
                  <TableHead>الميزانية</TableHead>
                  <TableHead>الإيرادات المتوقعة</TableHead>
                  <TableHead className="text-left">الإجراءات</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCampaigns.map((campaign) => (
                  <TableRow key={campaign.id}>
                    <TableCell className="font-medium">
                      {campaign.name}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        {getCampaignTypeIcon(campaign.type)}
                        <span>{getCampaignTypeText(campaign.type)}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span
                        className={`px-2 py-1 text-xs rounded-full ${getStatusBadgeClass(
                          campaign.status,
                        )}`}
                      >
                        {getStatusText(campaign.status)}
                      </span>
                    </TableCell>
                    <TableCell>{formatDate(campaign.startDate)}</TableCell>
                    <TableCell>{formatDate(campaign.endDate)}</TableCell>
                    <TableCell>{campaign.budget.toLocaleString()} ₴</TableCell>
                    <TableCell>
                      {campaign.expectedRevenue.toLocaleString()} ₴
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleCampaignSelect(campaign)}
                        >
                          <FileText className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Trash className="h-4 w-4 text-red-500" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>

        {/* Campaign Calendar Tab */}
        <TabsContent value="calendar" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>تقويم الحملات التسويقية</CardTitle>
                <div className="flex gap-2">
                  <Select defaultValue="month">
                    <SelectTrigger className="w-[150px]">
                      <SelectValue placeholder="اختر العرض" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="day">يوم</SelectItem>
                      <SelectItem value="week">أسبوع</SelectItem>
                      <SelectItem value="month">شهر</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline">
                    <Plus className="ml-2 h-4 w-4" />
                    إضافة حدث
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="border rounded-lg p-4 h-[600px] bg-gray-50">
                <div className="text-center p-8">
                  <Calendar className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium">تقويم الحملات</h3>
                  <p className="text-sm text-muted-foreground mt-2">
                    سيتم عرض تقويم الحملات هنا مع إمكانية إضافة وتعديل الأحداث
                    والمواعيد المتعلقة بالحملات التسويقية.
                  </p>
                  <Button className="mt-4">
                    <Plus className="ml-2 h-4 w-4" />
                    إضافة حدث جديد
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>الحملات القادمة</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {campaignsData
                    .filter((campaign) => campaign.status === "scheduled")
                    .slice(0, 3)
                    .map((campaign) => (
                      <div
                        key={campaign.id}
                        className="flex items-start gap-3 border-b pb-3 last:border-0"
                      >
                        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                          {getCampaignTypeIcon(campaign.type)}
                        </div>
                        <div>
                          <h4 className="font-medium">{campaign.name}</h4>
                          <p className="text-sm text-muted-foreground">
                            {formatDate(campaign.startDate)}
                          </p>
                          <div className="flex items-center gap-2 mt-1">
                            <Clock className="h-3 w-3 text-muted-foreground" />
                            <span className="text-xs text-muted-foreground">
                              {getCampaignTypeText(campaign.type)}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>الحملات النشطة</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {campaignsData
                    .filter((campaign) => campaign.status === "active")
                    .slice(0, 3)
                    .map((campaign) => (
                      <div
                        key={campaign.id}
                        className="flex items-start gap-3 border-b pb-3 last:border-0"
                      >
                        <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                          {getCampaignTypeIcon(campaign.type)}
                        </div>
                        <div>
                          <h4 className="font-medium">{campaign.name}</h4>
                          <p className="text-sm text-muted-foreground">
                            {formatDate(campaign.startDate)} -{" "}
                            {formatDate(campaign.endDate)}
                          </p>
                          <div className="flex items-center gap-2 mt-1">
                            <Target className="h-3 w-3 text-muted-foreground" />
                            <span className="text-xs text-muted-foreground">
                              {campaign.targetAudience}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>الحملات المكتملة مؤخراً</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {campaignsData
                    .filter((campaign) => campaign.status === "completed")
                    .slice(0, 3)
                    .map((campaign) => (
                      <div
                        key={campaign.id}
                        className="flex items-start gap-3 border-b pb-3 last:border-0"
                      >
                        <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                          {getCampaignTypeIcon(campaign.type)}
                        </div>
                        <div>
                          <h4 className="font-medium">{campaign.name}</h4>
                          <p className="text-sm text-muted-foreground">
                            {formatDate(campaign.startDate)} -{" "}
                            {formatDate(campaign.endDate)}
                          </p>
                          <div className="flex items-center gap-2 mt-1">
                            <BarChart className="h-3 w-3 text-green-500" />
                            <span className="text-xs text-green-500">
                              {campaign.actualRevenue
                                ? `الإيرادات: ${campaign.actualRevenue.toLocaleString()} ₴`
                                : "لا توجد بيانات"}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Campaign Analytics Tab */}
        <TabsContent value="analytics" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      إجمالي الحملات
                    </p>
                    <h3 className="text-2xl font-bold mt-2">
                      {campaignsData.length}
                    </h3>
                  </div>
                  <div className="p-2 bg-blue-100 rounded-full">
                    <FileText className="h-5 w-5 text-blue-600" />
                  </div>
                </div>
                <div className="mt-4 flex items-center text-sm">
                  <span className="text-green-600 font-medium">+3</span>
                  <span className="text-muted-foreground mr-1">
                    مقارنة بالشهر السابق
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      الميزانية الإجمالية
                    </p>
                    <h3 className="text-2xl font-bold mt-2">
                      {campaignsData
                        .reduce((sum, campaign) => sum + campaign.budget, 0)
                        .toLocaleString()}{" "}
                      ₴
                    </h3>
                  </div>
                  <div className="p-2 bg-green-100 rounded-full">
                    <BarChart className="h-5 w-5 text-green-600" />
                  </div>
                </div>
                <div className="mt-4 flex items-center text-sm">
                  <span className="text-green-600 font-medium">+15%</span>
                  <span className="text-muted-foreground mr-1">
                    مقارنة بالشهر السابق
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      الإيرادات المتوقعة
                    </p>
                    <h3 className="text-2xl font-bold mt-2">
                      {campaignsData
                        .reduce(
                          (sum, campaign) => sum + campaign.expectedRevenue,
                          0,
                        )
                        .toLocaleString()}{" "}
                      ₴
                    </h3>
                  </div>
                  <div className="p-2 bg-purple-100 rounded-full">
                    <Target className="h-5 w-5 text-purple-600" />
                  </div>
                </div>
                <div className="mt-4 flex items-center text-sm">
                  <span className="text-green-600 font-medium">+22%</span>
                  <span className="text-muted-foreground mr-1">
                    مقارنة بالشهر السابق
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>أداء الحملة الحالية</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={campaignPerformanceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <RechartsTooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="مشاهدات"
                      stroke="#8884d8"
                      activeDot={{ r: 8 }}
                    />
                    <Line type="monotone" dataKey="نقرات" stroke="#82ca9d" />
                    <Line type="monotone" dataKey="تحويلات" stroke="#ffc658" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>توزيع الحملات حسب القناة</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={channelDistributionData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) =>
                        `${name}: ${(percent * 100).toFixed(0)}%`
                      }
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {channelDistributionData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <RechartsTooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>مقارنة أداء الحملات</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="border rounded-lg overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>اسم الحملة</TableHead>
                      <TableHead>النوع</TableHead>
                      <TableHead>الميزانية</TableHead>
                      <TableHead>الإيرادات المتوقعة</TableHead>
                      <TableHead>الإيرادات الفعلية</TableHead>
                      <TableHead>ROI</TableHead>
                      <TableHead>معدل التحويل</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {campaignsData
                      .filter(
                        (campaign) =>
                          campaign.status === "completed" ||
                          campaign.status === "active",
                      )
                      .map((campaign) => {
                        const actualRevenue = campaign.actualRevenue || 0;
                        const roi =
                          campaign.budget > 0
                            ? ((actualRevenue - campaign.budget) /
                                campaign.budget) *
                              100
                            : 0;
                        return (
                          <TableRow key={campaign.id}>
                            <TableCell className="font-medium">
                              {campaign.name}
                            </TableCell>
                            <TableCell>
                              {getCampaignTypeText(campaign.type)}
                            </TableCell>
                            <TableCell>
                              {campaign.budget.toLocaleString()} ₴
                            </TableCell>
                            <TableCell>
                              {campaign.expectedRevenue.toLocaleString()} ₴
                            </TableCell>
                            <TableCell>
                              {actualRevenue
                                ? actualRevenue.toLocaleString() + " ₴"
                                : "جارية"}
                            </TableCell>
                            <TableCell>
                              {actualRevenue ? roi.toFixed(1) + "%" : "جارية"}
                            </TableCell>
                            <TableCell>
                              {actualRevenue ? "4.2%" : "جارية"}
                            </TableCell>
                          </TableRow>
                        );
                      })}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Add Campaign Dialog */}
      <Dialog open={showAddCampaign} onOpenChange={setShowAddCampaign}>
        <DialogContent className="sm:max-w-[700px]">
          <DialogHeader>
            <DialogTitle>إنشاء حملة تسويقية جديدة</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="campaign-name">اسم الحملة</Label>
              <Input id="campaign-name" placeholder="اسم الحملة التسويقية" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="campaign-type">نوع الحملة</Label>
              <Select defaultValue="email">
                <SelectTrigger id="campaign-type">
                  <SelectValue placeholder="اختر نوع الحملة" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="email">بريد إلكتروني</SelectItem>
                  <SelectItem value="sms">رسائل نصية</SelectItem>
                  <SelectItem value="social">وسائل التواصل</SelectItem>
                  <SelectItem value="event">فعالية</SelectItem>
                  <SelectItem value="other">أخرى</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="campaign-start-date">تاريخ البدء</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-right font-normal"
                  >
                    <span>اختر تاريخ البدء</span>
                    <CalendarIcon className="mr-auto h-4 w-4" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <CalendarComponent mode="single" initialFocus />
                </PopoverContent>
              </Popover>
            </div>
            <div className="space-y-2">
              <Label htmlFor="campaign-end-date">تاريخ الانتهاء</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-right font-normal"
                  >
                    <span>اختر تاريخ الانتهاء</span>
                    <CalendarIcon className="mr-auto h-4 w-4" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <CalendarComponent mode="single" initialFocus />
                </PopoverContent>
              </Popover>
            </div>
            <div className="space-y-2">
              <Label htmlFor="campaign-budget">الميزانية</Label>
              <div className="flex items-center gap-2">
                <Input
                  id="campaign-budget"
                  type="number"
                  placeholder="الميزانية"
                />
                <span>₴</span>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="campaign-expected-revenue">
                الإيرادات المتوقعة
              </Label>
              <div className="flex items-center gap-2">
                <Input
                  id="campaign-expected-revenue"
                  type="number"
                  placeholder="الإيرادات المتوقعة"
                />
                <span>₴</span>
              </div>
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="campaign-target-audience">الجمهور المستهدف</Label>
              <Input
                id="campaign-target-audience"
                placeholder="وصف الجمهور المستهدف"
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="campaign-description">وصف الحملة</Label>
              <Textarea
                id="campaign-description"
                placeholder="وصف تفصيلي للحملة التسويقية"
                rows={4}
              />
            </div>
          </div>

          <Separator className="my-4" />

          <div className="space-y-4">
            <h3 className="text-sm font-medium">قنوات التوزيع</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="border rounded-lg p-4 flex flex-col items-center gap-2 cursor-pointer hover:bg-gray-50">
                <Mail className="h-8 w-8 text-blue-500" />
                <span className="text-sm font-medium">البريد الإلكتروني</span>
              </div>
              <div className="border rounded-lg p-4 flex flex-col items-center gap-2 cursor-pointer hover:bg-gray-50">
                <MessageSquare className="h-8 w-8 text-purple-500" />
                <span className="text-sm font-medium">الرسائل النصية</span>
              </div>
              <div className="border rounded-lg p-4 flex flex-col items-center gap-2 cursor-pointer hover:bg-gray-50">
                <Facebook className="h-8 w-8 text-blue-600" />
                <span className="text-sm font-medium">فيسبوك</span>
              </div>
              <div className="border rounded-lg p-4 flex flex-col items-center gap-2 cursor-pointer hover:bg-gray-50">
                <Instagram className="h-8 w-8 text-pink-500" />
                <span className="text-sm font-medium">انستغرام</span>
              </div>
              <div className="border rounded-lg p-4 flex flex-col items-center gap-2 cursor-pointer hover:bg-gray-50">
                <Twitter className="h-8 w-8 text-blue-400" />
                <span className="text-sm font-medium">تويتر</span>
              </div>
              <div className="border rounded-lg p-4 flex flex-col items-center gap-2 cursor-pointer hover:bg-gray-50">
                <Linkedin className="h-8 w-8 text-blue-700" />
                <span className="text-sm font-medium">لينكد إن</span>
              </div>
              <div className="border rounded-lg p-4 flex flex-col items-center gap-2 cursor-pointer hover:bg-gray-50">
                <Youtube className="h-8 w-8 text-red-600" />
                <span className="text-sm font-medium">يوتيوب</span>
              </div>
              <div className="border rounded-lg p-4 flex flex-col items-center gap-2 cursor-pointer hover:bg-gray-50">
                <Plus className="h-8 w-8 text-gray-500" />
                <span className="text-sm font-medium">أخرى</span>
              </div>
            </div>
          </div>

          <DialogFooter className="mt-6">
            <Button variant="outline" onClick={() => setShowAddCampaign(false)}>
              إلغاء
            </Button>
            <Button onClick={() => setShowAddCampaign(false)}>
              إنشاء الحملة
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Campaign Details Dialog */}
      {selectedCampaign && (
        <Dialog
          open={showCampaignDetails}
          onOpenChange={setShowCampaignDetails}
        >
          <DialogContent className="sm:max-w-[700px]">
            <DialogHeader>
              <DialogTitle>تفاصيل الحملة التسويقية</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold">{selectedCampaign.name}</h2>
                <span
                  className={`px-2 py-1 text-xs rounded-full ${getStatusBadgeClass(
                    selectedCampaign.status,
                  )}`}
                >
                  {getStatusText(selectedCampaign.status)}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">نوع الحملة</p>
                  <p className="font-medium">
                    {getCampaignTypeText(selectedCampaign.type)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">
                    الفترة الزمنية
                  </p>
                  <p className="font-medium">
                    {formatDate(selectedCampaign.startDate)} -{" "}
                    {formatDate(selectedCampaign.endDate)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">الميزانية</p>
                  <p className="font-medium">
                    {selectedCampaign.budget.toLocaleString()} ₴
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">
                    الإيرادات المتوقعة
                  </p>
                  <p className="font-medium">
                    {selectedCampaign.expectedRevenue.toLocaleString()} ₴
                  </p>
                </div>
                {selectedCampaign.actualRevenue && (
                  <div>
                    <p className="text-sm text-muted-foreground">
                      الإيرادات الفعلية
                    </p>
                    <p className="font-medium text-green-600">
                      {selectedCampaign.actualRevenue.toLocaleString()} ₴
                    </p>
                  </div>
                )}
              </div>

              <div>
                <p className="text-sm text-muted-foreground">
                  الجمهور المستهدف
                </p>
                <p className="font-medium">{selectedCampaign.targetAudience}</p>
              </div>

              <div>
                <p className="text-sm text-muted-foreground">وصف الحملة</p>
                <p className="font-medium">{selectedCampaign.description}</p>
              </div>

              <Separator />

              <div className="space-y-2">
                <h3 className="text-sm font-medium">الأداء</h3>
                <div className="grid grid-cols-3 gap-4">
                  <div className="border rounded-lg p-4 text-center">
                    <p className="text-sm text-muted-foreground">المشاهدات</p>
                    <p className="text-xl font-bold">3,245</p>
                  </div>
                  <div className="border rounded-lg p-4 text-center">
                    <p className="text-sm text-muted-foreground">النقرات</p>
                    <p className="text-xl font-bold">856</p>
                  </div>
                  <div className="border rounded-lg p-4 text-center">
                    <p className="text-sm text-muted-foreground">
                      معدل التحويل
                    </p>
                    <p className="text-xl font-bold">4.2%</p>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-medium">الملاحظات</h3>
                <div className="border rounded-lg p-4">
                  <p className="text-sm">
                    {selectedCampaign.status === "completed"
                      ? "تم إكمال الحملة بنجاح وتحقيق الأهداف المرجوة. يمكن الاطلاع على التقرير التفصيلي من خلال قسم التقارير."
                      : selectedCampaign.status === "active"
                        ? "الحملة نشطة حالياً وتسير وفق الخطة الموضوعة. يتم متابعة الأداء بشكل يومي."
                        : selectedCampaign.status === "scheduled"
                          ? "تم جدولة الحملة وستبدأ في التاريخ المحدد. جميع المواد التسويقية جاهزة."
                          : selectedCampaign.status === "draft"
                            ? "الحملة في مرحلة الإعداد. يجب استكمال جميع المتطلبات قبل إطلاقها."
                            : "تم إلغاء الحملة لأسباب داخلية."}
                  </p>
                </div>
              </div>
            </div>

            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setShowCampaignDetails(false)}
              >
                إغلاق
              </Button>
              <Button>تعديل الحملة</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default Campaigns;
