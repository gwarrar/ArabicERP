import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Clock,
  Download,
  Filter,
  Plus,
  Search,
  Users,
  CheckCircle,
  AlertCircle,
  Clock3,
  CalendarDays,
  CalendarRange,
  CalendarCheck,
  User,
  UserPlus,
  ListTodo,
  ClipboardList,
  Eye,
  Edit,
  Trash,
  ArrowUpDown,
} from "lucide-react";
import { format, addDays, isSameDay, isSameMonth, parseISO } from "date-fns";
import { ar } from "date-fns/locale";

// Define interfaces for type safety
interface Event {
  id: string;
  title: string;
  date: string;
  startTime: string;
  endTime: string;
  type: string;
  status: string;
  assignees: string[];
  description: string;
  location: string;
}

interface Employee {
  id: string;
  name: string;
  department: string;
  position: string;
  email: string;
  phone: string;
  avatar?: string;
}

// Sample events data
const eventsData = [
  {
    id: "1",
    title: "اجتماع فريق المبيعات",
    date: "2024-07-20",
    startTime: "10:00",
    endTime: "11:30",
    type: "اجتماع",
    status: "قادم",
    assignees: ["أحمد محمد", "سارة خالد", "محمد علي"],
    description: "مناقشة خطة المبيعات للربع القادم وتحليل نتائج الربع الحالي",
    location: "قاعة الاجتماعات الرئيسية",
  },
  {
    id: "2",
    title: "تسليم طلبية العميل رقم #1234",
    date: "2024-07-21",
    startTime: "14:00",
    endTime: "15:00",
    type: "مهمة",
    status: "قادم",
    assignees: ["خالد عبدالله"],
    description: "تسليم طلبية الملابس للعميل شركة الأمل للتجارة",
    location: "مقر العميل - المنطقة الصناعية",
  },
  {
    id: "3",
    title: "صيانة ماكينات الخياطة",
    date: "2024-07-22",
    startTime: "09:00",
    endTime: "12:00",
    type: "مهمة",
    status: "قادم",
    assignees: ["عمر فاروق", "علي حسن"],
    description: "إجراء الصيانة الدورية لماكينات الخياطة في قسم الإنتاج",
    location: "قسم الإنتاج - الطابق الثاني",
  },
  {
    id: "4",
    title: "تدريب الموظفين الجدد",
    date: "2024-07-23",
    startTime: "13:00",
    endTime: "16:00",
    type: "تدريب",
    status: "قادم",
    assignees: ["نورا أحمد", "سارة خالد"],
    description: "تدريب الموظفين الجدد على نظام المخزون وإدارة الطلبات",
    location: "قاعة التدريب",
  },
  {
    id: "5",
    title: "استلام شحنة المواد الخام",
    date: "2024-07-24",
    startTime: "08:30",
    endTime: "10:30",
    type: "مهمة",
    status: "قادم",
    assignees: ["محمد علي", "خالد عبدالله"],
    description: "استلام وفحص شحنة الأقمشة والخيوط الواردة من المورد",
    location: "مستودع المواد الخام",
  },
  {
    id: "6",
    title: "اجتماع مراجعة الجودة",
    date: "2024-07-25",
    startTime: "11:00",
    endTime: "12:30",
    type: "اجتماع",
    status: "قادم",
    assignees: ["أحمد محمد", "نورا أحمد", "علي حسن"],
    description: "مراجعة معايير الجودة ومناقشة التحسينات المطلوبة",
    location: "قاعة الاجتماعات الفرعية",
  },
  {
    id: "7",
    title: "جرد المخزون الشهري",
    date: "2024-07-26",
    startTime: "09:00",
    endTime: "17:00",
    type: "مهمة",
    status: "قادم",
    assignees: ["خالد عبدالله", "عمر فاروق", "محمد علي", "علي حسن"],
    description: "إجراء الجرد الشهري للمخزون في جميع المستودعات",
    location: "جميع المستودعات",
  },
  {
    id: "8",
    title: "اجتماع مع المورد الجديد",
    date: "2024-07-27",
    startTime: "13:30",
    endTime: "15:00",
    type: "اجتماع",
    status: "قادم",
    assignees: ["أحمد محمد", "سارة خالد"],
    description: "مناقشة شروط التعاقد مع المورد الجديد للأزرار والإكسسوارات",
    location: "قاعة الاجتماعات الرئيسية",
  },
];

// Sample employees data
const employeesData = [
  {
    id: "1",
    name: "أحمد محمد",
    department: "الإدارة",
    position: "مدير عام",
    email: "ahmed@example.com",
    phone: "0501234567",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ahmed",
  },
  {
    id: "2",
    name: "سارة خالد",
    department: "الموارد البشرية",
    position: "مديرة الموارد البشرية",
    email: "sara@example.com",
    phone: "0507654321",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sara",
  },
  {
    id: "3",
    name: "محمد علي",
    department: "المخزون",
    position: "مدير المخزون",
    email: "mohamed@example.com",
    phone: "0509876543",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mohamed",
  },
  {
    id: "4",
    name: "نورا أحمد",
    department: "الجودة",
    position: "مديرة الجودة",
    email: "noura@example.com",
    phone: "0503456789",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Noura",
  },
  {
    id: "5",
    name: "خالد عبدالله",
    department: "المبيعات",
    position: "مدير المبيعات",
    email: "khaled@example.com",
    phone: "0508765432",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Khaled",
  },
  {
    id: "6",
    name: "عمر فاروق",
    department: "الصيانة",
    position: "مهندس صيانة",
    email: "omar@example.com",
    phone: "0502345678",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Omar",
  },
  {
    id: "7",
    name: "علي حسن",
    department: "الإنتاج",
    position: "مشرف إنتاج",
    email: "ali@example.com",
    phone: "0504567890",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ali",
  },
];

const CalendarDashboard = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [activeTab, setActiveTab] = useState("calendar");
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [filterType, setFilterType] = useState("all");
  const [filterEmployee, setFilterEmployee] = useState("all");

  // Filter events based on selected filters
  const filteredEvents = eventsData.filter((event) => {
    const matchesType = filterType === "all" || event.type === filterType;
    const matchesEmployee =
      filterEmployee === "all" ||
      event.assignees.includes(
        employeesData.find((emp) => emp.id === filterEmployee)?.name || "",
      );
    return matchesType && matchesEmployee;
  });

  // Get events for a specific date
  const getEventsForDate = (date: Date) => {
    return filteredEvents.filter((event) =>
      isSameDay(parseISO(event.date), date),
    );
  };

  // Format date for display
  const formatDate = (dateString: string) => {
    return format(parseISO(dateString), "dd MMMM yyyy", { locale: ar });
  };

  // Format time for display
  const formatTime = (timeString: string) => {
    return timeString;
  };

  // Get event type badge class
  const getEventTypeBadgeClass = (type: string) => {
    switch (type) {
      case "اجتماع":
        return "bg-blue-100 text-blue-800";
      case "مهمة":
        return "bg-green-100 text-green-800";
      case "تدريب":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Get event status badge class
  const getEventStatusBadgeClass = (status: string) => {
    switch (status) {
      case "قادم":
        return "bg-amber-100 text-amber-800";
      case "جاري":
        return "bg-blue-100 text-blue-800";
      case "مكتمل":
        return "bg-green-100 text-green-800";
      case "ملغي":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Handle event selection
  const handleEventSelect = (event: Event) => {
    setSelectedEvent(event);
  };

  // Get upcoming events
  const upcomingEvents = filteredEvents
    .filter((event) => new Date(event.date) >= new Date())
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 5);

  // Get events by employee
  const getEventsByEmployee = () => {
    const eventsByEmployee: Record<string, number> = {};

    employeesData.forEach((employee) => {
      eventsByEmployee[employee.name] = filteredEvents.filter((event) =>
        event.assignees.includes(employee.name),
      ).length;
    });

    return eventsByEmployee;
  };

  const eventsByEmployee = getEventsByEmployee();

  // Get events by type
  const getEventsByType = () => {
    const eventsByType: Record<string, number> = {
      اجتماع: 0,
      مهمة: 0,
      تدريب: 0,
    };

    filteredEvents.forEach((event) => {
      if (eventsByType[event.type] !== undefined) {
        eventsByType[event.type]++;
      }
    });

    return eventsByType;
  };

  const eventsByType = getEventsByType();

  // Render employee avatar
  const renderEmployeeAvatar = (assignee: string, index: number) => {
    const employee = employeesData.find((emp) => emp.name === assignee);
    return (
      <div
        key={index}
        className="h-6 w-6 rounded-full border-2 border-background overflow-hidden bg-gray-100 flex items-center justify-center text-xs font-medium"
        title={assignee}
      >
        {employee?.avatar ? (
          <img
            src={employee.avatar}
            alt={assignee}
            className="h-full w-full object-cover"
          />
        ) : (
          assignee.charAt(0)
        )}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">التقويم والمهام</h2>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Filter className="ml-1 h-3 w-3" />
            تصفية
          </Button>
          <Button variant="outline" size="sm">
            <Download className="ml-1 h-3 w-3" />
            تصدير
          </Button>
          <Button>
            <Plus className="ml-1 h-3 w-3" />
            إضافة حدث
          </Button>
        </div>
      </div>

      {/* Calendar Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="calendar">
            <CalendarDays className="h-4 w-4 ml-2" />
            التقويم
          </TabsTrigger>
          <TabsTrigger value="events">
            <CalendarCheck className="h-4 w-4 ml-2" />
            الأحداث والمهام
          </TabsTrigger>
          <TabsTrigger value="employees">
            <Users className="h-4 w-4 ml-2" />
            الموظفين
          </TabsTrigger>
          <TabsTrigger value="analytics">
            <CalendarRange className="h-4 w-4 ml-2" />
            تحليلات
          </TabsTrigger>
        </TabsList>

        {/* Calendar Tab */}
        <TabsContent value="calendar" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Calendar */}
            <div className="md:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>التقويم</CardTitle>
                  <CardDescription>
                    عرض الأحداث والمهام في التقويم
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="p-3">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      locale={ar}
                      className="rounded-md border mx-auto"
                      modifiersClassNames={{
                        selected: "bg-blue-500 text-white",
                      }}
                      modifiers={{
                        booked: filteredEvents.map(
                          (event) => new Date(event.date),
                        ),
                      }}
                      components={{
                        DayContent: ({ date, activeModifiers }) => {
                          const events = getEventsForDate(date);
                          return (
                            <div className="relative h-full w-full p-2">
                              <span>{date.getDate()}</span>
                              {events.length > 0 && (
                                <div className="absolute bottom-1 right-1 left-1 flex justify-center">
                                  <span className="flex space-x-0.5 space-x-reverse">
                                    {events.length <= 3 ? (
                                      events.map((event, i) => (
                                        <span
                                          key={i}
                                          className={`h-1.5 w-1.5 rounded-full ${event.type === "اجتماع" ? "bg-blue-500" : event.type === "مهمة" ? "bg-green-500" : "bg-purple-500"}`}
                                        />
                                      ))
                                    ) : (
                                      <span className="text-xs font-medium">
                                        {events.length}
                                      </span>
                                    )}
                                  </span>
                                </div>
                              )}
                            </div>
                          );
                        },
                      }}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Events for selected date */}
            <div>
              <Card className="h-full">
                <CardHeader>
                  <CardTitle>
                    {date ? format(date, "dd MMMM yyyy", { locale: ar }) : ""}
                  </CardTitle>
                  <CardDescription>
                    الأحداث والمهام لليوم المحدد
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {date && getEventsForDate(date).length > 0 ? (
                      getEventsForDate(date).map((event) => (
                        <div
                          key={event.id}
                          className="p-3 border rounded-lg hover:bg-gray-50 cursor-pointer"
                          onClick={() => handleEventSelect(event)}
                        >
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="font-medium text-sm">
                              {event.title}
                            </h3>
                            <Badge
                              className={getEventTypeBadgeClass(event.type)}
                            >
                              {event.type}
                            </Badge>
                          </div>
                          <div className="flex items-center text-sm text-gray-500 mb-2">
                            <Clock className="h-3 w-3 ml-1" />
                            <span>
                              {formatTime(event.startTime)} -{" "}
                              {formatTime(event.endTime)}
                            </span>
                          </div>
                          <div className="flex flex-wrap gap-1 mt-2">
                            {event.assignees
                              .slice(0, 3)
                              .map((assignee, index) => (
                                <Badge
                                  key={index}
                                  variant="outline"
                                  className="bg-gray-50"
                                >
                                  {assignee}
                                </Badge>
                              ))}
                            {event.assignees.length > 3 && (
                              <Badge variant="outline" className="bg-gray-50">
                                +{event.assignees.length - 3}
                              </Badge>
                            )}
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-8 text-gray-500">
                        <CalendarIcon className="h-10 w-10 mx-auto mb-2 text-gray-400" />
                        <p>لا توجد أحداث لهذا اليوم</p>
                        <Button variant="link" className="mt-2 text-blue-600">
                          إضافة حدث جديد
                        </Button>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Upcoming Events */}
          <Card>
            <CardHeader>
              <CardTitle>الأحداث القادمة</CardTitle>
              <CardDescription>
                الأحداث والمهام القادمة في الأيام المقبلة
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingEvents.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {upcomingEvents.map((event) => (
                      <div
                        key={event.id}
                        className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer"
                        onClick={() => handleEventSelect(event)}
                      >
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-medium">{event.title}</h3>
                          <Badge className={getEventTypeBadgeClass(event.type)}>
                            {event.type}
                          </Badge>
                        </div>
                        <div className="flex items-center text-sm text-gray-500 mb-1">
                          <CalendarIcon className="h-3 w-3 ml-1" />
                          <span>{formatDate(event.date)}</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-500 mb-2">
                          <Clock className="h-3 w-3 ml-1" />
                          <span>
                            {formatTime(event.startTime)} -{" "}
                            {formatTime(event.endTime)}
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {event.assignees
                            .slice(0, 2)
                            .map((assignee, index) => (
                              <Badge
                                key={index}
                                variant="outline"
                                className="bg-gray-50"
                              >
                                {assignee}
                              </Badge>
                            ))}
                          {event.assignees.length > 2 && (
                            <Badge variant="outline" className="bg-gray-50">
                              +{event.assignees.length - 2}
                            </Badge>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <CalendarIcon className="h-10 w-10 mx-auto mb-2 text-gray-400" />
                    <p>لا توجد أحداث قادمة</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Events Tab */}
        <TabsContent value="events" className="space-y-6">
          <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 mb-6">
            <div className="flex flex-col md:flex-row gap-2">
              <div className="relative w-full md:w-64">
                <Search className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <input
                  placeholder="بحث عن الأحداث..."
                  className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 pr-9 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                />
              </div>

              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="نوع الحدث" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">جميع الأنواع</SelectItem>
                  <SelectItem value="اجتماع">اجتماع</SelectItem>
                  <SelectItem value="مهمة">مهمة</SelectItem>
                  <SelectItem value="تدريب">تدريب</SelectItem>
                </SelectContent>
              </Select>

              <Select value={filterEmployee} onValueChange={setFilterEmployee}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="الموظف" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">جميع الموظفين</SelectItem>
                  {employeesData.map((employee) => (
                    <SelectItem key={employee.id} value={employee.id}>
                      {employee.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Button>
              <Plus className="ml-1 h-3 w-3" />
              إضافة حدث جديد
            </Button>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>قائمة الأحداث والمهام</CardTitle>
              <CardDescription>
                جميع الأحداث والمهام المجدولة في النظام
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="border rounded-lg overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[250px]">العنوان</TableHead>
                      <TableHead>التاريخ</TableHead>
                      <TableHead>الوقت</TableHead>
                      <TableHead>النوع</TableHead>
                      <TableHead>الحالة</TableHead>
                      <TableHead>المكلفين</TableHead>
                      <TableHead>الإجراءات</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredEvents.length > 0 ? (
                      filteredEvents.map((event) => (
                        <TableRow key={event.id}>
                          <TableCell className="font-medium">
                            {event.title}
                          </TableCell>
                          <TableCell>{formatDate(event.date)}</TableCell>
                          <TableCell>
                            {formatTime(event.startTime)} -{" "}
                            {formatTime(event.endTime)}
                          </TableCell>
                          <TableCell>
                            <Badge
                              className={getEventTypeBadgeClass(event.type)}
                            >
                              {event.type}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge
                              className={getEventStatusBadgeClass(event.status)}
                            >
                              {event.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex -space-x-2 space-x-reverse rtl:space-x-reverse">
                              {event.assignees
                                .slice(0, 3)
                                .map((assignee, index) =>
                                  renderEmployeeAvatar(assignee, index),
                                )}
                              {event.assignees.length > 3 && (
                                <div className="h-6 w-6 rounded-full border-2 border-background bg-gray-100 flex items-center justify-center text-xs font-medium">
                                  +{event.assignees.length - 3}
                                </div>
                              )}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleEventSelect(event)}
                              >
                                <Eye className="h-4 w-4" />
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
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={7} className="text-center py-8">
                          <div className="flex flex-col items-center justify-center text-muted-foreground">
                            <CalendarIcon className="h-8 w-8 mb-2" />
                            <p>لا توجد أحداث تطابق معايير البحث</p>
                            <Button
                              variant="link"
                              onClick={() => {
                                setFilterType("all");
                                setFilterEmployee("all");
                              }}
                            >
                              إعادة تعيين المرشحات
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>

          {/* Event Details */}
          {selectedEvent && (
            <Card>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>{selectedEvent.title}</CardTitle>
                    <CardDescription>تفاصيل الحدث المحدد</CardDescription>
                  </div>
                  <Badge className={getEventTypeBadgeClass(selectedEvent.type)}>
                    {selectedEvent.type}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground mb-2">
                        معلومات الحدث
                      </h3>
                      <div className="space-y-2">
                        <div className="flex items-center">
                          <CalendarIcon className="h-4 w-4 ml-2 text-muted-foreground" />
                          <span>{formatDate(selectedEvent.date)}</span>
                        </div>
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 ml-2 text-muted-foreground" />
                          <span>
                            {formatTime(selectedEvent.startTime)} -{" "}
                            {formatTime(selectedEvent.endTime)}
                          </span>
                        </div>
                        <div className="flex items-start">
                          <AlertCircle className="h-4 w-4 ml-2 text-muted-foreground mt-0.5" />
                          <span>
                            <Badge
                              className={getEventStatusBadgeClass(
                                selectedEvent.status,
                              )}
                            >
                              {selectedEvent.status}
                            </Badge>
                          </span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground mb-2">
                        الموقع
                      </h3>
                      <p>{selectedEvent.location}</p>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-2">
                      الوصف
                    </h3>
                    <p>{selectedEvent.description}</p>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-2">
                      المكلفين
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedEvent.assignees.map((assignee, index) => {
                        const employee = employeesData.find(
                          (emp) => emp.name === assignee,
                        );
                        return (
                          <div
                            key={index}
                            className="flex items-center gap-2 p-2 border rounded-lg"
                          >
                            <div className="h-8 w-8 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center text-xs font-medium">
                              {employee?.avatar ? (
                                <img
                                  src={employee.avatar}
                                  alt={assignee}
                                  className="h-full w-full object-cover"
                                />
                              ) : (
                                assignee.charAt(0)
                              )}
                            </div>
                            <span>{assignee}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div className="flex justify-end gap-2 pt-4">
                    <Button variant="outline">
                      <Edit className="ml-1 h-3 w-3" />
                      تعديل
                    </Button>
                    {selectedEvent.status === "قادم" && (
                      <Button variant="outline">
                        <CheckCircle className="ml-1 h-3 w-3" />
                        تحديث الحالة
                      </Button>
                    )}
                    <Button variant="destructive">
                      <Trash className="ml-1 h-3 w-3" />
                      حذف
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* Employees Tab */}
        <TabsContent value="employees" className="space-y-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold">الموظفين والمهام</h3>
            <Button>
              <UserPlus className="ml-1 h-3 w-3" />
              إضافة موظف
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {employeesData.map((employee) => (
              <Card key={employee.id}>
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="h-12 w-12 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center text-lg font-medium">
                      {employee.avatar ? (
                        <img
                          src={employee.avatar}
                          alt={employee.name}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        employee.name.charAt(0)
                      )}
                    </div>
                    <div>
                      <h3 className="font-medium">{employee.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {employee.position}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm">
                      <User className="h-3 w-3 ml-2 text-muted-foreground" />
                      <span>{employee.department}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center text-sm">
                        <ListTodo className="h-3 w-3 ml-2 text-muted-foreground" />
                        <span>المهام المكلف بها</span>
                      </div>
                      <Badge className="bg-blue-100 text-blue-800">
                        {eventsByEmployee[employee.name] || 0}
                      </Badge>
                    </div>
                  </div>

                  <div className="flex justify-end gap-2">
                    <Button variant="outline" size="sm">
                      <Eye className="ml-1 h-3 w-3" />
                      عرض المهام
                    </Button>
                    <Button variant="outline" size="sm">
                      <Plus className="ml-1 h-3 w-3" />
                      تكليف بمهمة
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Analytics Tab */}
        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>إحصائيات الأحداث</CardTitle>
                <CardDescription>ملخص إحصائي للأحداث والمهام</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {Object.entries(eventsByType).map(([type, count]) => (
                    <div key={type}>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm">{type}</span>
                        <span className="text-sm font-medium">
                          {count} (
                          {filteredEvents.length > 0
                            ? Math.round((count / filteredEvents.length) * 100)
                            : 0}
                          %)
                        </span>
                      </div>
                      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className={`h-full ${type === "اجتماع" ? "bg-blue-500" : type === "مهمة" ? "bg-green-500" : "bg-purple-500"}`}
                          style={{
                            width:
                              filteredEvents.length > 0
                                ? `${(count / filteredEvents.length) * 100}%`
                                : "0%",
                          }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>توزيع المهام</CardTitle>
                <CardDescription>توزيع المهام على الموظفين</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {Object.entries(eventsByEmployee)
                    .sort(([, a], [, b]) => (b as number) - (a as number))
                    .slice(0, 5)
                    .map(([name, count]) => (
                      <div key={name}>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm">{name}</span>
                          <span className="text-sm font-medium">
                            {count} مهمة
                          </span>
                        </div>
                        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-blue-500"
                            style={{
                              width: `${((count as number) / Math.max(...(Object.values(eventsByEmployee) as number[]))) * 100}%`,
                            }}
                          ></div>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>حالة المهام</CardTitle>
                <CardDescription>توزيع المهام حسب الحالة</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-amber-50 p-4 rounded-lg">
                      <p className="text-sm text-amber-800">قادمة</p>
                      <p className="text-2xl font-bold text-amber-800">
                        {
                          filteredEvents.filter((e) => e.status === "قادم")
                            .length
                        }
                      </p>
                    </div>
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <p className="text-sm text-blue-800">جارية</p>
                      <p className="text-2xl font-bold text-blue-800">
                        {
                          filteredEvents.filter((e) => e.status === "جاري")
                            .length
                        }
                      </p>
                    </div>
                    <div className="bg-green-50 p-4 rounded-lg">
                      <p className="text-sm text-green-800">مكتملة</p>
                      <p className="text-2xl font-bold text-green-800">
                        {
                          filteredEvents.filter((e) => e.status === "مكتمل")
                            .length
                        }
                      </p>
                    </div>
                    <div className="bg-red-50 p-4 rounded-lg">
                      <p className="text-sm text-red-800">ملغاة</p>
                      <p className="text-2xl font-bold text-red-800">
                        {
                          filteredEvents.filter((e) => e.status === "ملغي")
                            .length
                        }
                      </p>
                    </div>
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

export default CalendarDashboard;
