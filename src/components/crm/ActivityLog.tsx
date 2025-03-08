import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
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
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Calendar,
  Phone,
  Mail,
  User,
  Plus,
  Clock,
  CheckCircle,
  AlertCircle,
  Filter,
  MessageSquare,
  Edit,
  Trash,
  Video,
  Users,
  Search,
  FileText,
  Download,
  ExternalLink,
  Link as LinkIcon,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { communications, tasks } from "@/data/crmData";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface ActivityLogProps {
  customerId?: string;
  opportunityId?: string;
}

const ActivityLog: React.FC<ActivityLogProps> = ({
  customerId,
  opportunityId,
}) => {
  const [activeTab, setActiveTab] = useState("activities");
  const [showNewActivity, setShowNewActivity] = useState(false);
  const [showNewTask, setShowNewTask] = useState(false);
  const [showNewMeeting, setShowNewMeeting] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("all");
  const [selectedEmployee, setSelectedEmployee] = useState("all");
  const [selectedDateRange, setSelectedDateRange] = useState("all");
  const [showCalendarIntegration, setShowCalendarIntegration] = useState(false);

  const [filteredActivities, setFilteredActivities] = useState(communications);
  const [filteredTasks, setFilteredTasks] = useState(tasks);

  // Sample calendar events
  const calendarEvents = [
    {
      id: "1",
      title: "اجتماع مع شركة الأفق للتجارة",
      date: "2024-07-20 10:00",
      duration: "60",
      location: "مكتب الشركة",
      attendees: ["أحمد محمد", "سارة أحمد", "محمد علي"],
      description: "مناقشة عرض السعر المقدم للمعدات المكتبية",
      calendar: "Google Calendar",
    },
    {
      id: "2",
      title: "مكالمة هاتفية مع مؤسسة النور",
      date: "2024-07-21 14:30",
      duration: "30",
      attendees: ["سارة أحمد"],
      description: "متابعة عرض الصيانة السنوي",
      calendar: "Outlook",
    },
    {
      id: "3",
      title: "عرض تقديمي لشركة الرياض للمقاولات",
      date: "2024-07-22 11:00",
      duration: "90",
      location: "مقر العميل - أوديسا",
      attendees: ["محمد علي", "خالد عبدالله"],
      description: "عرض نظام إدارة المخزون الجديد",
      calendar: "Google Calendar",
    },
  ];

  // Filter activities based on search term, type, employee, and date range
  const filterActivities = () => {
    const filtered = communications.filter((activity) => {
      if (customerId && activity.customerId !== customerId) {
        return false;
      }

      const matchesSearch = searchTerm
        ? activity.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
          activity.customerName
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          activity.employeeName.toLowerCase().includes(searchTerm.toLowerCase())
        : true;

      const matchesType =
        selectedType === "all" || activity.type === selectedType;

      const matchesEmployee =
        selectedEmployee === "all" ||
        activity.employeeName === selectedEmployee;

      // Date range filtering
      const activityDate = new Date(activity.date.split(" ")[0]);
      const today = new Date();
      const lastWeek = new Date(today);
      lastWeek.setDate(today.getDate() - 7);
      const lastMonth = new Date(today);
      lastMonth.setMonth(today.getMonth() - 1);

      const matchesDateRange =
        selectedDateRange === "all" ||
        (selectedDateRange === "today" &&
          activityDate.toDateString() === today.toDateString()) ||
        (selectedDateRange === "week" && activityDate >= lastWeek) ||
        (selectedDateRange === "month" && activityDate >= lastMonth);

      return (
        matchesSearch && matchesType && matchesEmployee && matchesDateRange
      );
    });

    setFilteredActivities(filtered);

    // Also filter tasks
    const filteredTasksList = tasks.filter((task) => {
      if (
        customerId &&
        (task.relatedTo.type !== "customer" || task.relatedTo.id !== customerId)
      ) {
        return false;
      }

      if (
        opportunityId &&
        (task.relatedTo.type !== "opportunity" ||
          task.relatedTo.id !== opportunityId)
      ) {
        return false;
      }

      const matchesSearch = searchTerm
        ? task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          task.assigneeName.toLowerCase().includes(searchTerm.toLowerCase())
        : true;

      const matchesEmployee =
        selectedEmployee === "all" || task.assigneeName === selectedEmployee;

      // Date range filtering for tasks
      const taskDate = new Date(task.dueDate);
      const today = new Date();
      const lastWeek = new Date(today);
      lastWeek.setDate(today.getDate() - 7);
      const lastMonth = new Date(today);
      lastMonth.setMonth(today.getMonth() - 1);

      const matchesDateRange =
        selectedDateRange === "all" ||
        (selectedDateRange === "today" &&
          taskDate.toDateString() === today.toDateString()) ||
        (selectedDateRange === "week" && taskDate >= lastWeek) ||
        (selectedDateRange === "month" && taskDate >= lastMonth);

      return matchesSearch && matchesEmployee && matchesDateRange;
    });

    setFilteredTasks(filteredTasksList);
  };

  useEffect(() => {
    filterActivities();
  }, [
    searchTerm,
    selectedType,
    selectedEmployee,
    selectedDateRange,
    customerId,
    opportunityId,
  ]);

  const getActivityTypeIcon = (type: string) => {
    switch (type) {
      case "phone":
        return <Phone className="h-4 w-4 text-blue-500" />;
      case "email":
        return <Mail className="h-4 w-4 text-green-500" />;
      case "visit":
        return <User className="h-4 w-4 text-amber-500" />;
      case "meeting":
        return <Users className="h-4 w-4 text-purple-500" />;
      case "video":
        return <Video className="h-4 w-4 text-red-500" />;
      default:
        return <MessageSquare className="h-4 w-4 text-gray-500" />;
    }
  };

  const getActivityTypeName = (type: string) => {
    switch (type) {
      case "phone":
        return "هاتف";
      case "email":
        return "بريد إلكتروني";
      case "visit":
        return "زيارة";
      case "meeting":
        return "اجتماع";
      case "video":
        return "مكالمة فيديو";
      default:
        return "آخر";
    }
  };

  // Filter tasks by status
  const pendingTasks = filteredTasks.filter(
    (task) => task.status === "pending",
  );
  const completedTasks = filteredTasks.filter(
    (task) => task.status === "completed",
  );
  const overdueTasks = filteredTasks.filter(
    (task) => task.status === "pending" && new Date(task.dueDate) < new Date(),
  );

  return (
    <div className="space-y-6">
      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute right-3 top-2.5 h-5 w-5 text-muted-foreground" />
          <Input
            placeholder="بحث في سجل النشاط..."
            className="pr-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex flex-wrap gap-2">
          <div className="flex items-center gap-1 bg-background border rounded-md px-3 py-1">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <select
              className="bg-transparent border-none text-sm focus:outline-none"
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
            >
              <option value="all">جميع الأنواع</option>
              <option value="phone">هاتف</option>
              <option value="email">بريد إلكتروني</option>
              <option value="visit">زيارة</option>
              <option value="meeting">اجتماع</option>
              <option value="video">مكالمة فيديو</option>
            </select>
          </div>

          <div className="flex items-center gap-1 bg-background border rounded-md px-3 py-1">
            <User className="h-4 w-4 text-muted-foreground" />
            <select
              className="bg-transparent border-none text-sm focus:outline-none"
              value={selectedEmployee}
              onChange={(e) => setSelectedEmployee(e.target.value)}
            >
              <option value="all">جميع الموظفين</option>
              <option value="أحمد محمد">أحمد محمد</option>
              <option value="سارة أحمد">سارة أحمد</option>
              <option value="محمد علي">محمد علي</option>
              <option value="خالد عبدالله">خالد عبدالله</option>
            </select>
          </div>

          <div className="flex items-center gap-1 bg-background border rounded-md px-3 py-1">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <select
              className="bg-transparent border-none text-sm focus:outline-none"
              value={selectedDateRange}
              onChange={(e) => setSelectedDateRange(e.target.value)}
            >
              <option value="all">جميع الفترات</option>
              <option value="today">اليوم</option>
              <option value="week">آخر أسبوع</option>
              <option value="month">آخر شهر</option>
            </select>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <Tabs
        defaultValue="activities"
        onValueChange={setActiveTab}
        className="w-full"
      >
        <TabsList className="grid grid-cols-3 mb-4">
          <TabsTrigger value="activities">
            <MessageSquare className="h-4 w-4 ml-2" />
            سجل النشاط
          </TabsTrigger>
          <TabsTrigger value="tasks">
            <CheckCircle className="h-4 w-4 ml-2" />
            المهام
          </TabsTrigger>
          <TabsTrigger value="calendar">
            <Calendar className="h-4 w-4 ml-2" />
            التقويم
          </TabsTrigger>
        </TabsList>

        {/* Activities Tab */}
        <TabsContent value="activities">
          <Card className="p-6 bg-white dark:bg-[#1e1e2d] dark:text-white">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold">سجل النشاط والتواصل</h3>
              <Button onClick={() => setShowNewActivity(true)}>
                <Plus className="ml-2 h-4 w-4" />
                إضافة نشاط
              </Button>
            </div>

            <div className="border rounded-lg overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>التاريخ والوقت</TableHead>
                    <TableHead>نوع النشاط</TableHead>
                    <TableHead>العميل</TableHead>
                    <TableHead>الموظف المسؤول</TableHead>
                    <TableHead>ملخص النشاط</TableHead>
                    <TableHead>الإجراء المطلوب</TableHead>
                    <TableHead className="text-left">الإجراءات</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredActivities.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-8">
                        <div className="flex flex-col items-center justify-center text-muted-foreground">
                          <MessageSquare className="h-12 w-12 mb-2 opacity-20" />
                          <p>لا توجد أنشطة مسجلة</p>
                        </div>
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredActivities.map((activity) => (
                      <TableRow key={activity.id} className="hover:bg-muted/50">
                        <TableCell>{activity.date}</TableCell>
                        <TableCell>
                          <span
                            className={`flex items-center gap-1 ${activity.type === "phone" ? "text-blue-600" : activity.type === "email" ? "text-green-600" : activity.type === "visit" ? "text-amber-600" : activity.type === "meeting" ? "text-purple-600" : "text-red-600"}`}
                          >
                            {getActivityTypeIcon(activity.type)}
                            {getActivityTypeName(activity.type)}
                          </span>
                        </TableCell>
                        <TableCell>{activity.customerName}</TableCell>
                        <TableCell>{activity.employeeName}</TableCell>
                        <TableCell>{activity.summary}</TableCell>
                        <TableCell>{activity.action || "-"}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Button variant="ghost" size="icon">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon">
                              <Trash className="h-4 w-4 text-red-500" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>

            <div className="flex justify-end gap-2 mt-4">
              <Button variant="outline">
                <Download className="ml-2 h-4 w-4" />
                تصدير السجل
              </Button>
              <Button variant="outline">
                <FileText className="ml-2 h-4 w-4" />
                تقرير النشاط
              </Button>
            </div>
          </Card>
        </TabsContent>

        {/* Tasks Tab */}
        <TabsContent value="tasks">
          <Card className="p-6 bg-white dark:bg-[#1e1e2d] dark:text-white">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold">المهام</h3>
              <div className="flex gap-2">
                <div className="flex items-center gap-1 bg-background border rounded-md px-3 py-1">
                  <Filter className="h-4 w-4 text-muted-foreground" />
                  <select className="bg-transparent border-none text-sm focus:outline-none">
                    <option value="all">جميع المهام</option>
                    <option value="pending">المهام المعلقة</option>
                    <option value="completed">المهام المكتملة</option>
                    <option value="overdue">المهام المتأخرة</option>
                  </select>
                </div>
                <Button onClick={() => setShowNewTask(true)}>
                  <Plus className="ml-2 h-4 w-4" />
                  مهمة جديدة
                </Button>
              </div>
            </div>

            <div className="border rounded-lg overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>المهمة</TableHead>
                    <TableHead>تاريخ الاستحقاق</TableHead>
                    <TableHead>المسؤول</TableHead>
                    <TableHead>متعلقة بـ</TableHead>
                    <TableHead>الأولوية</TableHead>
                    <TableHead>الحالة</TableHead>
                    <TableHead className="text-left">الإجراءات</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredTasks.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-8">
                        <div className="flex flex-col items-center justify-center text-muted-foreground">
                          <CheckCircle className="h-12 w-12 mb-2 opacity-20" />
                          <p>لا توجد مهام</p>
                        </div>
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredTasks.map((task) => (
                      <TableRow key={task.id} className="hover:bg-muted/50">
                        <TableCell className="font-medium">
                          {task.title}
                        </TableCell>
                        <TableCell
                          className={`${task.status === "pending" && new Date(task.dueDate) < new Date() ? "text-red-600 font-medium" : ""}`}
                        >
                          {task.dueDate}
                        </TableCell>
                        <TableCell>{task.assigneeName}</TableCell>
                        <TableCell>
                          <span
                            className={`px-2 py-1 text-xs ${task.relatedTo.type === "customer" ? "bg-blue-100 text-blue-800" : task.relatedTo.type === "opportunity" ? "bg-purple-100 text-purple-800" : "bg-amber-100 text-amber-800"} rounded-full`}
                          >
                            {task.relatedTo.type === "customer"
                              ? "عميل"
                              : task.relatedTo.type === "opportunity"
                                ? "فرصة"
                                : "حملة"}
                            : {task.relatedTo.name}
                          </span>
                        </TableCell>
                        <TableCell>
                          <span
                            className={`px-2 py-1 text-xs ${task.priority === "high" ? "bg-red-100 text-red-800" : task.priority === "medium" ? "bg-amber-100 text-amber-800" : "bg-green-100 text-green-800"} rounded-full`}
                          >
                            {task.priority === "high"
                              ? "عالية"
                              : task.priority === "medium"
                                ? "متوسطة"
                                : "منخفضة"}
                          </span>
                        </TableCell>
                        <TableCell>
                          <span
                            className={`px-2 py-1 text-xs ${task.status === "completed" ? "bg-green-100 text-green-800" : task.status === "pending" && new Date(task.dueDate) < new Date() ? "bg-red-100 text-red-800" : "bg-amber-100 text-amber-800"} rounded-full`}
                          >
                            {task.status === "completed"
                              ? "مكتملة"
                              : task.status === "pending" &&
                                  new Date(task.dueDate) < new Date()
                                ? "متأخرة"
                                : "معلقة"}
                          </span>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Button variant="ghost" size="icon">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon">
                              <CheckCircle className="h-4 w-4 text-green-500" />
                            </Button>
                            <Button variant="ghost" size="icon">
                              <Trash className="h-4 w-4 text-red-500" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>

            {/* Task Summary */}
            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="p-4 bg-amber-50 border-amber-200">
                <div className="flex items-center gap-2 mb-2">
                  <AlertCircle className="h-5 w-5 text-amber-600" />
                  <h4 className="font-medium text-amber-800">المهام المعلقة</h4>
                </div>
                <p className="text-2xl font-bold text-amber-700">
                  {pendingTasks.length}
                </p>
              </Card>
              <Card className="p-4 bg-red-50 border-red-200">
                <div className="flex items-center gap-2 mb-2">
                  <AlertCircle className="h-5 w-5 text-red-600" />
                  <h4 className="font-medium text-red-800">المهام المتأخرة</h4>
                </div>
                <p className="text-2xl font-bold text-red-700">
                  {overdueTasks.length}
                </p>
              </Card>
              <Card className="p-4 bg-green-50 border-green-200">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <h4 className="font-medium text-green-800">
                    المهام المكتملة
                  </h4>
                </div>
                <p className="text-2xl font-bold text-green-700">
                  {completedTasks.length}
                </p>
              </Card>
            </div>
          </Card>
        </TabsContent>

        {/* Calendar Tab */}
        <TabsContent value="calendar">
          <Card className="p-6 bg-white dark:bg-[#1e1e2d] dark:text-white">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold">التقويم والمواعيد</h3>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={() => setShowCalendarIntegration(true)}
                >
                  <LinkIcon className="ml-2 h-4 w-4" />
                  ربط مع تقويم خارجي
                </Button>
                <Button onClick={() => setShowNewMeeting(true)}>
                  <Plus className="ml-2 h-4 w-4" />
                  موعد جديد
                </Button>
              </div>
            </div>

            <div className="border rounded-lg overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>العنوان</TableHead>
                    <TableHead>التاريخ والوقت</TableHead>
                    <TableHead>المدة (دقيقة)</TableHead>
                    <TableHead>المكان</TableHead>
                    <TableHead>الحضور</TableHead>
                    <TableHead>التقويم</TableHead>
                    <TableHead className="text-left">الإجراءات</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {calendarEvents.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-8">
                        <div className="flex flex-col items-center justify-center text-muted-foreground">
                          <Calendar className="h-12 w-12 mb-2 opacity-20" />
                          <p>لا توجد مواعيد مسجلة</p>
                        </div>
                      </TableCell>
                    </TableRow>
                  ) : (
                    calendarEvents.map((event) => (
                      <TableRow key={event.id} className="hover:bg-muted/50">
                        <TableCell className="font-medium">
                          {event.title}
                        </TableCell>
                        <TableCell>{event.date}</TableCell>
                        <TableCell>{event.duration}</TableCell>
                        <TableCell>{event.location || "-"}</TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-1">
                            {event.attendees.map((attendee, index) => (
                              <span
                                key={index}
                                className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full"
                              >
                                {attendee}
                              </span>
                            ))}
                          </div>
                        </TableCell>
                        <TableCell>
                          <span
                            className={`flex items-center gap-1 ${event.calendar === "Google Calendar" ? "text-red-600" : "text-blue-600"}`}
                          >
                            <Calendar className="h-4 w-4" />
                            {event.calendar}
                          </span>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Button variant="ghost" size="icon">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon">
                              <ExternalLink className="h-4 w-4 text-blue-500" />
                            </Button>
                            <Button variant="ghost" size="icon">
                              <Trash className="h-4 w-4 text-red-500" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>

            <div className="flex justify-end gap-2 mt-4">
              <Button variant="outline">
                <Download className="ml-2 h-4 w-4" />
                تصدير المواعيد
              </Button>
              <Button variant="outline">
                <Calendar className="ml-2 h-4 w-4" />
                عرض التقويم الشهري
              </Button>
            </div>
          </Card>
        </TabsContent>
      </Tabs>

      {/* New Activity Dialog */}
      <Dialog open={showNewActivity} onOpenChange={setShowNewActivity}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>تسجيل نشاط جديد</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">نوع النشاط</label>
                <Select defaultValue="phone">
                  <SelectTrigger>
                    <SelectValue placeholder="اختر نوع النشاط" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="phone">هاتف</SelectItem>
                    <SelectItem value="email">بريد إلكتروني</SelectItem>
                    <SelectItem value="visit">زيارة</SelectItem>
                    <SelectItem value="meeting">اجتماع</SelectItem>
                    <SelectItem value="video">مكالمة فيديو</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">التاريخ والوقت</label>
                <Input type="datetime-local" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">العميل</label>
                <Select defaultValue="">
                  <SelectTrigger>
                    <SelectValue placeholder="اختر العميل" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">شركة الأفق للتجارة</SelectItem>
                    <SelectItem value="2">مؤسسة النور</SelectItem>
                    <SelectItem value="3">شركة الرياض للمقاولات</SelectItem>
                    <SelectItem value="4">مؤسسة السلام التجارية</SelectItem>
                    <SelectItem value="5">شركة الخليج للتوريدات</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">الموظف المسؤول</label>
                <Select defaultValue="ahmed">
                  <SelectTrigger>
                    <SelectValue placeholder="اختر الموظف" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ahmed">أحمد محمد</SelectItem>
                    <SelectItem value="sara">سارة أحمد</SelectItem>
                    <SelectItem value="mohamed">محمد علي</SelectItem>
                    <SelectItem value="khaled">خالد عبدالله</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2 col-span-2">
                <label className="text-sm font-medium">ملخص النشاط</label>
                <Textarea placeholder="ملخص النشاط" />
              </div>
              <div className="space-y-2 col-span-2">
                <label className="text-sm font-medium">الإجراء المطلوب</label>
                <Input placeholder="الإجراء المطلوب" />
              </div>
              <div className="space-y-2 col-span-2">
                <label className="text-sm font-medium">
                  المرفقات (اختياري)
                </label>
                <Input type="file" />
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-4">
              <Button
                variant="outline"
                onClick={() => setShowNewActivity(false)}
              >
                إلغاء
              </Button>
              <Button onClick={() => setShowNewActivity(false)}>حفظ</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* New Task Dialog */}
      <Dialog open={showNewTask} onOpenChange={setShowNewTask}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>إضافة مهمة جديدة</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2 col-span-2">
                <label className="text-sm font-medium">عنوان المهمة</label>
                <Input placeholder="عنوان المهمة" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">تاريخ الاستحقاق</label>
                <Input type="date" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">وقت الاستحقاق</label>
                <Input type="time" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">المسؤول</label>
                <Select defaultValue="ahmed">
                  <SelectTrigger>
                    <SelectValue placeholder="اختر المسؤول" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ahmed">أحمد محمد</SelectItem>
                    <SelectItem value="sara">سارة أحمد</SelectItem>
                    <SelectItem value="mohamed">محمد علي</SelectItem>
                    <SelectItem value="khaled">خالد عبدالله</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">الأولوية</label>
                <Select defaultValue="medium">
                  <SelectTrigger>
                    <SelectValue placeholder="اختر الأولوية" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="high">عالية</SelectItem>
                    <SelectItem value="medium">متوسطة</SelectItem>
                    <SelectItem value="low">منخفضة</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">متعلقة بـ</label>
                <Select defaultValue="customer">
                  <SelectTrigger>
                    <SelectValue placeholder="اختر النوع" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="customer">عميل</SelectItem>
                    <SelectItem value="opportunity">فرصة بيعية</SelectItem>
                    <SelectItem value="campaign">حملة تسويقية</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">اختر العنصر</label>
                <Select defaultValue="">
                  <SelectTrigger>
                    <SelectValue placeholder="اختر العنصر" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">شركة الأفق للتجارة</SelectItem>
                    <SelectItem value="2">مؤسسة النور</SelectItem>
                    <SelectItem value="3">شركة الرياض للمقاولات</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">تذكير قبل</label>
                <div className="flex gap-2">
                  <Input type="number" placeholder="المدة" className="w-1/2" />
                  <Select defaultValue="hours">
                    <SelectTrigger className="w-1/2">
                      <SelectValue placeholder="الوحدة" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="minutes">دقائق</SelectItem>
                      <SelectItem value="hours">ساعات</SelectItem>
                      <SelectItem value="days">أيام</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">التكرار</label>
                <Select defaultValue="none">
                  <SelectTrigger>
                    <SelectValue placeholder="اختر التكرار" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">بدون تكرار</SelectItem>
                    <SelectItem value="daily">يومي</SelectItem>
                    <SelectItem value="weekly">أسبوعي</SelectItem>
                    <SelectItem value="monthly">شهري</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2 col-span-2">
                <label className="text-sm font-medium">الوصف</label>
                <Textarea placeholder="وصف المهمة" />
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-4">
              <Button variant="outline" onClick={() => setShowNewTask(false)}>
                إلغاء
              </Button>
              <Button onClick={() => setShowNewTask(false)}>حفظ</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* New Meeting Dialog */}
      <Dialog open={showNewMeeting} onOpenChange={setShowNewMeeting}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>إضافة موعد جديد</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2 col-span-2">
                <label className="text-sm font-medium">عنوان الموعد</label>
                <Input placeholder="عنوان الموعد" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">التاريخ</label>
                <Input type="date" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">الوقت</label>
                <Input type="time" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">المدة (دقيقة)</label>
                <Input type="number" placeholder="المدة بالدقائق" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">المكان</label>
                <Input placeholder="المكان" />
              </div>
              <div className="space-y-2 col-span-2">
                <label className="text-sm font-medium">الحضور</label>
                <Select defaultValue="" isMulti>
                  <SelectTrigger>
                    <SelectValue placeholder="اختر الحضور" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ahmed">أحمد محمد</SelectItem>
                    <SelectItem value="sara">سارة أحمد</SelectItem>
                    <SelectItem value="mohamed">محمد علي</SelectItem>
                    <SelectItem value="khaled">خالد عبدالله</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2 col-span-2">
                <label className="text-sm font-medium">العميل</label>
                <Select defaultValue="">
                  <SelectTrigger>
                    <SelectValue placeholder="اختر العميل" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">شركة الأفق للتجارة</SelectItem>
                    <SelectItem value="2">مؤسسة النور</SelectItem>
                    <SelectItem value="3">شركة الرياض للمقاولات</SelectItem>
                    <SelectItem value="4">مؤسسة السلام التجارية</SelectItem>
                    <SelectItem value="5">شركة الخليج للتوريدات</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2 col-span-2">
                <label className="text-sm font-medium">الوصف</label>
                <Textarea placeholder="وصف الموعد" />
              </div>
              <div className="space-y-2 col-span-2">
                <label className="text-sm font-medium">إضافة إلى التقويم</label>
                <Select defaultValue="google">
                  <SelectTrigger>
                    <SelectValue placeholder="اختر التقويم" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="google">Google Calendar</SelectItem>
                    <SelectItem value="outlook">Outlook</SelectItem>
                    <SelectItem value="none">بدون إضافة</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2 col-span-2">
                <label className="text-sm font-medium">تذكير قبل</label>
                <div className="flex gap-2">
                  <Input type="number" placeholder="المدة" className="w-1/2" />
                  <Select defaultValue="minutes">
                    <SelectTrigger className="w-1/2">
                      <SelectValue placeholder="الوحدة" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="minutes">دقائق</SelectItem>
                      <SelectItem value="hours">ساعات</SelectItem>
                      <SelectItem value="days">أيام</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-4">
              <Button
                variant="outline"
                onClick={() => setShowNewMeeting(false)}
              >
                إلغاء
              </Button>
              <Button onClick={() => setShowNewMeeting(false)}>حفظ</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Calendar Integration Dialog */}
      <Dialog
        open={showCalendarIntegration}
        onOpenChange={setShowCalendarIntegration}
      >
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>ربط مع تقويم خارجي</DialogTitle>
          </DialogHeader>
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 flex items-center justify-center bg-red-100 rounded-full">
                    <Calendar className="h-6 w-6 text-red-600" />
                  </div>
                  <div>
                    <h4 className="font-medium">Google Calendar</h4>
                    <p className="text-sm text-muted-foreground">
                      ربط مع حساب Google الخاص بك
                    </p>
                  </div>
                </div>
                <Button variant="outline">ربط</Button>
              </div>

              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 flex items-center justify-center bg-blue-100 rounded-full">
                    <Calendar className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-medium">Outlook Calendar</h4>
                    <p className="text-sm text-muted-foreground">
                      ربط مع حساب Microsoft الخاص بك
                    </p>
                  </div>
                </div>
                <Button variant="outline">ربط</Button>
              </div>

              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 flex items-center justify-center bg-gray-100 rounded-full">
                    <Calendar className="h-6 w-6 text-gray-600" />
                  </div>
                  <div>
                    <h4 className="font-medium">Apple Calendar</h4>
                    <p className="text-sm text-muted-foreground">
                      ربط مع حساب Apple الخاص بك
                    </p>
                  </div>
                </div>
                <Button variant="outline">ربط</Button>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="font-medium">إعدادات المزامنة</h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm">مزامنة تلقائية كل</label>
                  <div className="flex gap-2 items-center">
                    <Input type="number" className="w-20" defaultValue="15" />
                    <span className="text-sm">دقيقة</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <label className="text-sm">مزامنة الأحداث القديمة حتى</label>
                  <div className="flex gap-2 items-center">
                    <Input type="number" className="w-20" defaultValue="30" />
                    <span className="text-sm">يوم</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <label className="text-sm">
                    مزامنة الأحداث المستقبلية حتى
                  </label>
                  <div className="flex gap-2 items-center">
                    <Input type="number" className="w-20" defaultValue="90" />
                    <span className="text-sm">يوم</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-4">
              <Button
                variant="outline"
                onClick={() => setShowCalendarIntegration(false)}
              >
                إلغاء
              </Button>
              <Button onClick={() => setShowCalendarIntegration(false)}>
                حفظ الإعدادات
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ActivityLog;
