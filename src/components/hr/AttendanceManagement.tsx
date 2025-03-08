import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
  Calendar as CalendarIcon,
  Clock,
  Filter,
  Search,
  Plus,
  Download,
  Printer,
  Users,
  CheckCircle,
  XCircle,
  AlertCircle,
  Calendar,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// نموذج بيانات الموظف المختصر
interface Employee {
  id: string;
  name: string;
  position: string;
  department: string;
  avatar?: string;
}

// نموذج بيانات الحضور
interface Attendance {
  id: string;
  employeeId: string;
  date: string;
  checkIn: string;
  checkOut: string;
  status:
    | "present"
    | "absent"
    | "late"
    | "earlyLeave"
    | "vacation"
    | "sickLeave";
  notes?: string;
}

// نموذج بيانات الإجازة
interface Leave {
  id: string;
  employeeId: string;
  type: "annual" | "sick" | "unpaid" | "emergency" | "maternity" | "other";
  startDate: string;
  endDate: string;
  totalDays: number;
  status: "pending" | "approved" | "rejected" | "cancelled";
  reason: string;
  notes?: string;
  approvedBy?: string;
  approvedAt?: string;
}

// بيانات تجريبية للموظفين
const employeesData: Employee[] = [
  {
    id: "EMP001",
    name: "أحمد محمد",
    position: "مدير مبيعات",
    department: "المبيعات",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ahmed",
  },
  {
    id: "EMP002",
    name: "سارة خالد",
    position: "أخصائي تسويق",
    department: "التسويق",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sara",
  },
  {
    id: "EMP003",
    name: "محمد علي",
    position: "مطور برمجيات",
    department: "تقنية المعلومات",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mohammed",
  },
  {
    id: "EMP004",
    name: "فاطمة أحمد",
    position: "محاسب",
    department: "المالية",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Fatima",
  },
  {
    id: "EMP005",
    name: "خالد العتيبي",
    position: "مدير الموارد البشرية",
    department: "الموارد البشرية",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Khalid",
  },
];

// بيانات تجريبية للحضور
const generateAttendanceData = (): Attendance[] => {
  const attendanceData: Attendance[] = [];
  const today = new Date();

  // إنشاء بيانات حضور لآخر 30 يوم
  for (let i = 0; i < 30; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);

    // تخطي أيام الجمعة والسبت (عطلة نهاية الأسبوع)
    if (date.getDay() === 5 || date.getDay() === 6) continue;

    employeesData.forEach((employee) => {
      // إنشاء حالات مختلفة للحضور
      let status: Attendance["status"] = "present";
      let checkIn = "08:00";
      let checkOut = "17:00";

      // إضافة بعض التنوع في البيانات
      const random = Math.random();
      if (random < 0.1) {
        status = "absent";
        checkIn = "";
        checkOut = "";
      } else if (random < 0.2) {
        status = "late";
        checkIn = `0${Math.floor(Math.random() * 2) + 9}:${Math.floor(
          Math.random() * 60,
        )
          .toString()
          .padStart(2, "0")}`;
      } else if (random < 0.3) {
        status = "earlyLeave";
        checkOut = `${Math.floor(Math.random() * 2) + 15}:${Math.floor(
          Math.random() * 60,
        )
          .toString()
          .padStart(2, "0")}`;
      } else if (random < 0.35) {
        status = "vacation";
        checkIn = "";
        checkOut = "";
      } else if (random < 0.4) {
        status = "sickLeave";
        checkIn = "";
        checkOut = "";
      }

      attendanceData.push({
        id: `ATT-${employee.id}-${date.toISOString().split("T")[0]}`,
        employeeId: employee.id,
        date: date.toISOString().split("T")[0],
        checkIn,
        checkOut,
        status,
        notes: status !== "present" ? "ملاحظة تلقائية" : "",
      });
    });
  }

  return attendanceData;
};

// بيانات تجريبية للإجازات
const generateLeaveData = (): Leave[] => {
  const leaveData: Leave[] = [];
  const today = new Date();
  const leaveTypes: Leave["type"][] = [
    "annual",
    "sick",
    "unpaid",
    "emergency",
    "maternity",
    "other",
  ];
  const leaveStatuses: Leave["status"][] = [
    "pending",
    "approved",
    "rejected",
    "cancelled",
  ];

  employeesData.forEach((employee) => {
    // إنشاء 1-3 إجازات لكل موظف
    const leaveCount = Math.floor(Math.random() * 3) + 1;

    for (let i = 0; i < leaveCount; i++) {
      const startDate = new Date(today);
      startDate.setDate(today.getDate() + Math.floor(Math.random() * 30));

      const totalDays = Math.floor(Math.random() * 10) + 1;
      const endDate = new Date(startDate);
      endDate.setDate(startDate.getDate() + totalDays - 1);

      const type = leaveTypes[Math.floor(Math.random() * leaveTypes.length)];
      const status =
        leaveStatuses[Math.floor(Math.random() * leaveStatuses.length)];

      leaveData.push({
        id: `LV-${employee.id}-${i}`,
        employeeId: employee.id,
        type,
        startDate: startDate.toISOString().split("T")[0],
        endDate: endDate.toISOString().split("T")[0],
        totalDays,
        status,
        reason: `سبب الإجازة ${i + 1}`,
        notes: status === "rejected" ? "تم رفض الطلب بسبب ضغط العمل" : "",
        approvedBy: status === "approved" ? "خالد العتيبي" : undefined,
        approvedAt:
          status === "approved" ? new Date().toISOString() : undefined,
      });
    }
  });

  return leaveData;
};

const attendanceData = generateAttendanceData();
const leaveData = generateLeaveData();

// مكون إدارة الحضور والإجازات
const AttendanceManagement = () => {
  const [employees] = useState<Employee[]>(employeesData);
  const [attendance] = useState<Attendance[]>(attendanceData);
  const [leaves] = useState<Leave[]>(leaveData);

  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [searchTerm, setSearchTerm] = useState("");
  const [filterDepartment, setFilterDepartment] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [activeTab, setActiveTab] = useState("attendance");
  const [showLeaveDialog, setShowLeaveDialog] = useState(false);
  const [showAttendanceDialog, setShowAttendanceDialog] = useState(false);

  // الأقسام المتاحة
  const departments = Array.from(
    new Set(employees.map((employee) => employee.department)),
  );

  // تصفية الموظفين حسب البحث والقسم
  const filteredEmployees = employees.filter(
    (employee) =>
      (employee.name.includes(searchTerm) ||
        employee.position.includes(searchTerm) ||
        employee.id.includes(searchTerm)) &&
      (filterDepartment === "all" || employee.department === filterDepartment),
  );

  // الحصول على سجلات الحضور ليوم معين
  const getAttendanceForDate = (date: Date) => {
    const dateString = date.toISOString().split("T")[0];
    return attendance.filter((record) => record.date === dateString);
  };

  // تصفية سجلات الحضور حسب الحالة والبحث
  const filteredAttendance = getAttendanceForDate(selectedDate).filter(
    (record) => {
      const employee = employees.find((emp) => emp.id === record.employeeId);
      if (!employee) return false;

      const matchesSearch = searchTerm
        ? employee.name.includes(searchTerm) ||
          employee.position.includes(searchTerm) ||
          employee.id.includes(searchTerm)
        : true;

      const matchesDepartment =
        filterDepartment === "all" || employee.department === filterDepartment;

      const matchesStatus =
        filterStatus === "all" || record.status === filterStatus;

      return matchesSearch && matchesDepartment && matchesStatus;
    },
  );

  // تصفية طلبات الإجازات حسب الحالة والبحث
  const filteredLeaves = leaves.filter((leave) => {
    const employee = employees.find((emp) => emp.id === leave.employeeId);
    if (!employee) return false;

    const matchesSearch = searchTerm
      ? employee.name.includes(searchTerm) ||
        employee.position.includes(searchTerm) ||
        employee.id.includes(searchTerm)
      : true;

    const matchesDepartment =
      filterDepartment === "all" || employee.department === filterDepartment;

    const matchesStatus =
      filterStatus === "all" || leave.status === filterStatus;

    return matchesSearch && matchesDepartment && matchesStatus;
  });

  // الحصول على لون حالة الحضور
  const getAttendanceStatusColor = (status: Attendance["status"]): string => {
    switch (status) {
      case "present":
        return "bg-green-100 text-green-800";
      case "absent":
        return "bg-red-100 text-red-800";
      case "late":
        return "bg-yellow-100 text-yellow-800";
      case "earlyLeave":
        return "bg-orange-100 text-orange-800";
      case "vacation":
        return "bg-blue-100 text-blue-800";
      case "sickLeave":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // الحصول على لون حالة الإجازة
  const getLeaveStatusColor = (status: Leave["status"]): string => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "cancelled":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // الحصول على لون نوع الإجازة
  const getLeaveTypeColor = (type: Leave["type"]): string => {
    switch (type) {
      case "annual":
        return "bg-blue-100 text-blue-800";
      case "sick":
        return "bg-purple-100 text-purple-800";
      case "unpaid":
        return "bg-orange-100 text-orange-800";
      case "emergency":
        return "bg-red-100 text-red-800";
      case "maternity":
        return "bg-pink-100 text-pink-800";
      case "other":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // الحصول على اسم حالة الحضور بالعربية
  const getAttendanceStatusName = (status: Attendance["status"]): string => {
    switch (status) {
      case "present":
        return "حاضر";
      case "absent":
        return "غائب";
      case "late":
        return "متأخر";
      case "earlyLeave":
        return "مغادرة مبكرة";
      case "vacation":
        return "إجازة";
      case "sickLeave":
        return "إجازة مرضية";
      default:
        return "";
    }
  };

  // الحصول على اسم حالة الإجازة بالعربية
  const getLeaveStatusName = (status: Leave["status"]): string => {
    switch (status) {
      case "approved":
        return "موافق عليها";
      case "rejected":
        return "مرفوضة";
      case "pending":
        return "قيد الانتظار";
      case "cancelled":
        return "ملغاة";
      default:
        return "";
    }
  };

  // الحصول على اسم نوع الإجازة بالعربية
  const getLeaveTypeName = (type: Leave["type"]): string => {
    switch (type) {
      case "annual":
        return "سنوية";
      case "sick":
        return "مرضية";
      case "unpaid":
        return "بدون راتب";
      case "emergency":
        return "طارئة";
      case "maternity":
        return "أمومة";
      case "other":
        return "أخرى";
      default:
        return "";
    }
  };

  // تغيير التاريخ المحدد
  const changeDate = (days: number) => {
    const newDate = new Date(selectedDate);
    newDate.setDate(selectedDate.getDate() + days);
    setSelectedDate(newDate);
  };

  // الحصول على اسم اليوم بالعربية
  const getDayName = (date: Date): string => {
    const days = [
      "الأحد",
      "الإثنين",
      "الثلاثاء",
      "الأربعاء",
      "الخميس",
      "الجمعة",
      "السبت",
    ];
    return days[date.getDay()];
  };

  // الحصول على اسم الشهر بالعربية
  const getMonthName = (date: Date): string => {
    const months = [
      "يناير",
      "فبراير",
      "مارس",
      "أبريل",
      "مايو",
      "يونيو",
      "يوليو",
      "أغسطس",
      "سبتمبر",
      "أكتوبر",
      "نوفمبر",
      "ديسمبر",
    ];
    return months[date.getMonth()];
  };

  // تنسيق التاريخ بالعربية
  const formatDate = (date: Date): string => {
    return `${getDayName(date)}، ${date.getDate()} ${getMonthName(date)} ${date.getFullYear()}`;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">نظام إدارة الحضور والإجازات</h2>
        <div className="flex gap-2">
          <Button size="sm" variant="outline">
            <Printer className="ml-1 h-4 w-4" />
            طباعة
          </Button>
          <Button size="sm" variant="outline">
            <Download className="ml-1 h-4 w-4" />
            تصدير
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="attendance">الحضور والانصراف</TabsTrigger>
          <TabsTrigger value="leaves">طلبات الإجازات</TabsTrigger>
        </TabsList>

        {/* قسم الحضور والانصراف */}
        <TabsContent value="attendance" className="space-y-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => changeDate(-1)}
                  >
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                  <div className="flex items-center gap-2">
                    <CalendarIcon className="h-5 w-5 text-muted-foreground" />
                    <span className="font-medium">
                      {formatDate(selectedDate)}
                    </span>
                  </div>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => changeDate(1)}
                  >
                    <ArrowLeft className="h-4 w-4" />
                  </Button>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm">
                        اختر تاريخ
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>اختر تاريخ</DialogTitle>
                      </DialogHeader>
                      <div className="py-4">
                        <CalendarComponent
                          mode="single"
                          selected={selectedDate}
                          onSelect={(date) => date && setSelectedDate(date)}
                          className="rounded-md border mx-auto"
                        />
                      </div>
                      <DialogFooter>
                        <Button type="submit" onClick={() => {}}>
                          تأكيد
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>

                <div className="flex flex-wrap gap-2">
                  <div className="relative">
                    <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                    <Input
                      placeholder="بحث عن موظف..."
                      className="pr-10 w-[200px]"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>

                  <div className="flex items-center gap-1 bg-background border rounded-md px-3 py-1">
                    <Filter className="h-4 w-4 text-muted-foreground" />
                    <select
                      className="bg-transparent border-none text-sm focus:outline-none"
                      value={filterDepartment}
                      onChange={(e) => setFilterDepartment(e.target.value)}
                    >
                      <option value="all">جميع الأقسام</option>
                      {departments.map((dept) => (
                        <option key={dept} value={dept}>
                          {dept}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="flex items-center gap-1 bg-background border rounded-md px-3 py-1">
                    <Filter className="h-4 w-4 text-muted-foreground" />
                    <select
                      className="bg-transparent border-none text-sm focus:outline-none"
                      value={filterStatus}
                      onChange={(e) => setFilterStatus(e.target.value)}
                    >
                      <option value="all">جميع الحالات</option>
                      <option value="present">حاضر</option>
                      <option value="absent">غائب</option>
                      <option value="late">متأخر</option>
                      <option value="earlyLeave">مغادرة مبكرة</option>
                      <option value="vacation">إجازة</option>
                      <option value="sickLeave">إجازة مرضية</option>
                    </select>
                  </div>

                  <Button onClick={() => setShowAttendanceDialog(true)}>
                    <Plus className="ml-1 h-4 w-4" />
                    تسجيل حضور
                  </Button>
                </div>
              </div>

              <div className="border rounded-lg overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>الموظف</TableHead>
                      <TableHead>القسم</TableHead>
                      <TableHead>وقت الحضور</TableHead>
                      <TableHead>وقت الانصراف</TableHead>
                      <TableHead>الحالة</TableHead>
                      <TableHead>ملاحظات</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredAttendance.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-8">
                          <div className="flex flex-col items-center justify-center text-muted-foreground">
                            <Clock className="h-12 w-12 mb-2 opacity-20" />
                            <p>لا توجد سجلات حضور لهذا اليوم</p>
                          </div>
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredAttendance.map((record) => {
                        const employee = employees.find(
                          (emp) => emp.id === record.employeeId,
                        );
                        if (!employee) return null;

                        return (
                          <TableRow key={record.id}>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <img
                                  src={
                                    employee.avatar ||
                                    "https://api.dicebear.com/7.x/avataaars/svg?seed=default"
                                  }
                                  alt={employee.name}
                                  className="w-8 h-8 rounded-full"
                                />
                                <div>
                                  <p className="font-medium">{employee.name}</p>
                                  <p className="text-xs text-muted-foreground">
                                    {employee.position}
                                  </p>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>{employee.department}</TableCell>
                            <TableCell>
                              {record.checkIn ? (
                                <div className="flex items-center">
                                  <Clock className="h-4 w-4 mr-1 text-green-500" />
                                  <span>{record.checkIn}</span>
                                </div>
                              ) : (
                                <span className="text-muted-foreground">-</span>
                              )}
                            </TableCell>
                            <TableCell>
                              {record.checkOut ? (
                                <div className="flex items-center">
                                  <Clock className="h-4 w-4 mr-1 text-red-500" />
                                  <span>{record.checkOut}</span>
                                </div>
                              ) : (
                                <span className="text-muted-foreground">-</span>
                              )}
                            </TableCell>
                            <TableCell>
                              <Badge
                                className={getAttendanceStatusColor(
                                  record.status,
                                )}
                                variant="outline"
                              >
                                {getAttendanceStatusName(record.status)}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              {record.notes || (
                                <span className="text-muted-foreground">-</span>
                              )}
                            </TableCell>
                          </TableRow>
                        );
                      })
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>ملخص الحضور</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="p-4 border rounded-md">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="p-2 bg-green-100 rounded-full">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    </div>
                    <h3 className="font-medium">الحضور</h3>
                  </div>
                  <p className="text-2xl font-bold">
                    {
                      filteredAttendance.filter(
                        (record) => record.status === "present",
                      ).length
                    }
                  </p>
                </div>

                <div className="p-4 border rounded-md">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="p-2 bg-red-100 rounded-full">
                      <XCircle className="h-5 w-5 text-red-600" />
                    </div>
                    <h3 className="font-medium">الغياب</h3>
                  </div>
                  <p className="text-2xl font-bold">
                    {
                      filteredAttendance.filter(
                        (record) => record.status === "absent",
                      ).length
                    }
                  </p>
                </div>

                <div className="p-4 border rounded-md">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="p-2 bg-yellow-100 rounded-full">
                      <AlertCircle className="h-5 w-5 text-yellow-600" />
                    </div>
                    <h3 className="font-medium">التأخير</h3>
                  </div>
                  <p className="text-2xl font-bold">
                    {
                      filteredAttendance.filter(
                        (record) => record.status === "late",
                      ).length
                    }
                  </p>
                </div>

                <div className="p-4 border rounded-md">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="p-2 bg-blue-100 rounded-full">
                      <Calendar className="h-5 w-5 text-blue-600" />
                    </div>
                    <h3 className="font-medium">الإجازات</h3>
                  </div>
                  <p className="text-2xl font-bold">
                    {
                      filteredAttendance.filter(
                        (record) =>
                          record.status === "vacation" ||
                          record.status === "sickLeave",
                      ).length
                    }
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* قسم طلبات الإجازات */}
        <TabsContent value="leaves" className="space-y-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
                <h3 className="text-lg font-semibold">طلبات الإجازات</h3>

                <div className="flex flex-wrap gap-2">
                  <div className="relative">
                    <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                    <Input
                      placeholder="بحث عن موظف..."
                      className="pr-10 w-[200px]"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>

                  <div className="flex items-center gap-1 bg-background border rounded-md px-3 py-1">
                    <Filter className="h-4 w-4 text-muted-foreground" />
                    <select
                      className="bg-transparent border-none text-sm focus:outline-none"
                      value={filterDepartment}
                      onChange={(e) => setFilterDepartment(e.target.value)}
                    >
                      <option value="all">جميع الأقسام</option>
                      {departments.map((dept) => (
                        <option key={dept} value={dept}>
                          {dept}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="flex items-center gap-1 bg-background border rounded-md px-3 py-1">
                    <Filter className="h-4 w-4 text-muted-foreground" />
                    <select
                      className="bg-transparent border-none text-sm focus:outline-none"
                      value={filterStatus}
                      onChange={(e) => setFilterStatus(e.target.value)}
                    >
                      <option value="all">جميع الحالات</option>
                      <option value="pending">قيد الانتظار</option>
                      <option value="approved">موافق عليها</option>
                      <option value="rejected">مرفوضة</option>
                      <option value="cancelled">ملغاة</option>
                    </select>
                  </div>

                  <Button onClick={() => setShowLeaveDialog(true)}>
                    <Plus className="ml-1 h-4 w-4" />
                    طلب إجازة
                  </Button>
                </div>
              </div>

              <div className="border rounded-lg overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>الموظف</TableHead>
                      <TableHead>نوع الإجازة</TableHead>
                      <TableHead>تاريخ البداية</TableHead>
                      <TableHead>تاريخ النهاية</TableHead>
                      <TableHead>عدد الأيام</TableHead>
                      <TableHead>الحالة</TableHead>
                      <TableHead>السبب</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredLeaves.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={7} className="text-center py-8">
                          <div className="flex flex-col items-center justify-center text-muted-foreground">
                            <Calendar className="h-12 w-12 mb-2 opacity-20" />
                            <p>لا توجد طلبات إجازات</p>
                          </div>
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredLeaves.map((leave) => {
                        const employee = employees.find(
                          (emp) => emp.id === leave.employeeId,
                        );
                        if (!employee) return null;

                        return (
                          <TableRow key={leave.id}>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <img
                                  src={
                                    employee.avatar ||
                                    "https://api.dicebear.com/7.x/avataaars/svg?seed=default"
                                  }
                                  alt={employee.name}
                                  className="w-8 h-8 rounded-full"
                                />
                                <div>
                                  <p className="font-medium">{employee.name}</p>
                                  <p className="text-xs text-muted-foreground">
                                    {employee.position}
                                  </p>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <Badge
                                className={getLeaveTypeColor(leave.type)}
                                variant="outline"
                              >
                                {getLeaveTypeName(leave.type)}
                              </Badge>
                            </TableCell>
                            <TableCell>{leave.startDate}</TableCell>
                            <TableCell>{leave.endDate}</TableCell>
                            <TableCell>{leave.totalDays}</TableCell>
                            <TableCell>
                              <Badge
                                className={getLeaveStatusColor(leave.status)}
                                variant="outline"
                              >
                                {getLeaveStatusName(leave.status)}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              {leave.reason || (
                                <span className="text-muted-foreground">-</span>
                              )}
                            </TableCell>
                          </TableRow>
                        );
                      })
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>ملخص الإجازات</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="p-4 border rounded-md">
                  <h3 className="font-medium mb-2">قيد الانتظار</h3>
                  <p className="text-2xl font-bold">
                    {
                      leaves.filter((leave) => leave.status === "pending")
                        .length
                    }
                  </p>
                </div>

                <div className="p-4 border rounded-md">
                  <h3 className="font-medium mb-2">موافق عليها</h3>
                  <p className="text-2xl font-bold">
                    {
                      leaves.filter((leave) => leave.status === "approved")
                        .length
                    }
                  </p>
                </div>

                <div className="p-4 border rounded-md">
                  <h3 className="font-medium mb-2">مرفوضة</h3>
                  <p className="text-2xl font-bold">
                    {
                      leaves.filter((leave) => leave.status === "rejected")
                        .length
                    }
                  </p>
                </div>

                <div className="p-4 border rounded-md">
                  <h3 className="font-medium mb-2">إجمالي أيام الإجازات</h3>
                  <p className="text-2xl font-bold">
                    {leaves.reduce(
                      (total, leave) =>
                        leave.status === "approved"
                          ? total + leave.totalDays
                          : total,
                      0,
                    )}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* حوار تسجيل الحضور */}
      <Dialog
        open={showAttendanceDialog}
        onOpenChange={setShowAttendanceDialog}
      >
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>تسجيل حضور</DialogTitle>
            <DialogDescription>تسجيل حضور أو انصراف لموظف</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <label className="text-right">الموظف</label>
              <Select defaultValue="" className="col-span-3">
                <SelectTrigger>
                  <SelectValue placeholder="اختر الموظف" />
                </SelectTrigger>
                <SelectContent>
                  {employees.map((employee) => (
                    <SelectItem key={employee.id} value={employee.id}>
                      {employee.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label className="text-right">التاريخ</label>
              <Input
                type="date"
                className="col-span-3"
                defaultValue={new Date().toISOString().split("T")[0]}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label className="text-right">وقت الحضور</label>
              <Input type="time" className="col-span-3" defaultValue="08:00" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label className="text-right">وقت الانصراف</label>
              <Input type="time" className="col-span-3" defaultValue="17:00" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label className="text-right">الحالة</label>
              <Select defaultValue="present" className="col-span-3">
                <SelectTrigger>
                  <SelectValue placeholder="اختر الحالة" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="present">حاضر</SelectItem>
                  <SelectItem value="absent">غائب</SelectItem>
                  <SelectItem value="late">متأخر</SelectItem>
                  <SelectItem value="earlyLeave">مغادرة مبكرة</SelectItem>
                  <SelectItem value="vacation">إجازة</SelectItem>
                  <SelectItem value="sickLeave">إجازة مرضية</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label className="text-right">ملاحظات</label>
              <Input className="col-span-3" placeholder="ملاحظات إضافية" />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowAttendanceDialog(false)}
            >
              إلغاء
            </Button>
            <Button onClick={() => setShowAttendanceDialog(false)}>حفظ</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* حوار طلب إجازة */}
      <Dialog open={showLeaveDialog} onOpenChange={setShowLeaveDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>طلب إجازة</DialogTitle>
            <DialogDescription>تقديم طلب إجازة جديد</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <label className="text-right">الموظف</label>
              <Select defaultValue="" className="col-span-3">
                <SelectTrigger>
                  <SelectValue placeholder="اختر الموظف" />
                </SelectTrigger>
                <SelectContent>
                  {employees.map((employee) => (
                    <SelectItem key={employee.id} value={employee.id}>
                      {employee.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label className="text-right">نوع الإجازة</label>
              <Select defaultValue="annual" className="col-span-3">
                <SelectTrigger>
                  <SelectValue placeholder="اختر نوع الإجازة" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="annual">سنوية</SelectItem>
                  <SelectItem value="sick">مرضية</SelectItem>
                  <SelectItem value="unpaid">بدون راتب</SelectItem>
                  <SelectItem value="emergency">طارئة</SelectItem>
                  <SelectItem value="maternity">أمومة</SelectItem>
                  <SelectItem value="other">أخرى</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label className="text-right">تاريخ البداية</label>
              <Input
                type="date"
                className="col-span-3"
                defaultValue={new Date().toISOString().split("T")[0]}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label className="text-right">تاريخ النهاية</label>
              <Input
                type="date"
                className="col-span-3"
                defaultValue={new Date().toISOString().split("T")[0]}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label className="text-right">عدد الأيام</label>
              <Input
                type="number"
                className="col-span-3"
                defaultValue="1"
                min="1"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label className="text-right">السبب</label>
              <Input className="col-span-3" placeholder="سبب طلب الإجازة" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label className="text-right">ملاحظات</label>
              <Input className="col-span-3" placeholder="ملاحظات إضافية" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowLeaveDialog(false)}>
              إلغاء
            </Button>
            <Button onClick={() => setShowLeaveDialog(false)}>
              تقديم الطلب
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AttendanceManagement;
