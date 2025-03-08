import React, { useState } from "react";
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
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Customer } from "@/types/sales";

interface CommunicationFollowupProps {
  customer?: Customer;
}

const CommunicationFollowup: React.FC<CommunicationFollowupProps> = ({
  customer,
}) => {
  const [activeTab, setActiveTab] = useState("communications");
  const [showNewCommunication, setShowNewCommunication] = useState(false);
  const [showNewTask, setShowNewTask] = useState(false);
  const [showNewReminder, setShowNewReminder] = useState(false);

  // Sample communications data
  const communications = [
    {
      id: "1",
      date: "2024-07-15 10:30",
      type: "phone",
      employee: "أحمد محمد",
      summary: "اتصال لمتابعة طلب العميل رقم SO-2024-0001",
      action: "إرسال عرض سعر محدث",
    },
    {
      id: "2",
      date: "2024-07-10 14:15",
      type: "email",
      employee: "سارة أحمد",
      summary: "إرسال عرض أسعار للمنتجات الجديدة",
      action: "متابعة بعد 3 أيام",
    },
    {
      id: "3",
      date: "2024-07-05 11:00",
      type: "visit",
      employee: "محمد علي",
      summary: "زيارة لمقر العميل لمناقشة احتياجاته",
      action: "إعداد عرض سعر شامل",
    },
  ];

  // Sample tasks data
  const tasks = [
    {
      id: "1",
      title: "إرسال عرض سعر محدث",
      dueDate: "2024-07-18",
      assignee: "أحمد محمد",
      priority: "high",
      status: "pending",
    },
    {
      id: "2",
      title: "متابعة عرض الأسعار المرسل",
      dueDate: "2024-07-13",
      assignee: "سارة أحمد",
      priority: "medium",
      status: "completed",
    },
    {
      id: "3",
      title: "إعداد عرض سعر شامل",
      dueDate: "2024-07-08",
      assignee: "محمد علي",
      priority: "high",
      status: "completed",
    },
    {
      id: "4",
      title: "تحديث بيانات العميل",
      dueDate: "2024-07-20",
      assignee: "أحمد محمد",
      priority: "low",
      status: "pending",
    },
  ];

  // Sample reminders data
  const reminders = [
    {
      id: "1",
      date: "2024-07-18",
      title: "متابعة عرض السعر المحدث",
      reason: "انتهاء مهلة العرض",
      priority: "high",
    },
    {
      id: "2",
      date: "2024-07-25",
      title: "تذكير بتجديد العقد السنوي",
      reason: "انتهاء العقد الحالي",
      priority: "medium",
    },
    {
      id: "3",
      date: "2024-08-05",
      title: "عرض المنتجات الجديدة",
      reason: "إطلاق تشكيلة جديدة",
      priority: "low",
    },
  ];

  // Filter tasks by status
  const pendingTasks = tasks.filter((task) => task.status === "pending");
  const completedTasks = tasks.filter((task) => task.status === "completed");
  const overdueTasks = tasks.filter(
    (task) => task.status === "pending" && new Date(task.dueDate) < new Date(),
  );

  return (
    <div className="space-y-6">
      {/* Tabs */}
      <div className="flex border-b">
        <button
          className={`px-4 py-2 font-medium ${activeTab === "communications" ? "border-b-2 border-primary text-primary" : "text-muted-foreground"}`}
          onClick={() => setActiveTab("communications")}
        >
          <Phone className="inline-block ml-2 h-4 w-4" />
          سجل الاتصالات
        </button>
        <button
          className={`px-4 py-2 font-medium ${activeTab === "tasks" ? "border-b-2 border-primary text-primary" : "text-muted-foreground"}`}
          onClick={() => setActiveTab("tasks")}
        >
          <CheckCircle className="inline-block ml-2 h-4 w-4" />
          المهام
        </button>
        <button
          className={`px-4 py-2 font-medium ${activeTab === "reminders" ? "border-b-2 border-primary text-primary" : "text-muted-foreground"}`}
          onClick={() => setActiveTab("reminders")}
        >
          <Clock className="inline-block ml-2 h-4 w-4" />
          تذكيرات المتابعة
        </button>
      </div>

      {/* Communications Tab */}
      {activeTab === "communications" && (
        <Card className="p-6 bg-white dark:bg-[#1e1e2d] dark:text-white">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold">سجل الاتصالات</h3>
            <Button onClick={() => setShowNewCommunication(true)}>
              <Plus className="ml-2 h-4 w-4" />
              إضافة اتصال
            </Button>
          </div>

          <div className="border rounded-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>التاريخ والوقت</TableHead>
                  <TableHead>نوع الاتصال</TableHead>
                  <TableHead>الموظف المسؤول</TableHead>
                  <TableHead>ملخص المحادثة</TableHead>
                  <TableHead>الإجراء المطلوب</TableHead>
                  <TableHead className="text-left">الإجراءات</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {communications.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8">
                      <div className="flex flex-col items-center justify-center text-muted-foreground">
                        <Phone className="h-12 w-12 mb-2 opacity-20" />
                        <p>لا توجد اتصالات مسجلة</p>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  communications.map((comm) => (
                    <TableRow key={comm.id} className="hover:bg-muted/50">
                      <TableCell>{comm.date}</TableCell>
                      <TableCell>
                        <span
                          className={`flex items-center gap-1 ${comm.type === "phone" ? "text-blue-600" : comm.type === "email" ? "text-green-600" : "text-amber-600"}`}
                        >
                          {comm.type === "phone" ? (
                            <Phone className="h-4 w-4" />
                          ) : comm.type === "email" ? (
                            <Mail className="h-4 w-4" />
                          ) : (
                            <User className="h-4 w-4" />
                          )}
                          {comm.type === "phone"
                            ? "هاتف"
                            : comm.type === "email"
                              ? "بريد إلكتروني"
                              : "زيارة"}
                        </span>
                      </TableCell>
                      <TableCell>{comm.employee}</TableCell>
                      <TableCell>{comm.summary}</TableCell>
                      <TableCell>{comm.action}</TableCell>
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
        </Card>
      )}

      {/* Tasks Tab */}
      {activeTab === "tasks" && (
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
                  <TableHead>الأولوية</TableHead>
                  <TableHead>الحالة</TableHead>
                  <TableHead className="text-left">الإجراءات</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {tasks.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8">
                      <div className="flex flex-col items-center justify-center text-muted-foreground">
                        <CheckCircle className="h-12 w-12 mb-2 opacity-20" />
                        <p>لا توجد مهام</p>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  tasks.map((task) => (
                    <TableRow key={task.id} className="hover:bg-muted/50">
                      <TableCell className="font-medium">
                        {task.title}
                      </TableCell>
                      <TableCell
                        className={`${task.status === "pending" && new Date(task.dueDate) < new Date() ? "text-red-600 font-medium" : ""}`}
                      >
                        {task.dueDate}
                      </TableCell>
                      <TableCell>{task.assignee}</TableCell>
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
                <h4 className="font-medium text-green-800">المهام المكتملة</h4>
              </div>
              <p className="text-2xl font-bold text-green-700">
                {completedTasks.length}
              </p>
            </Card>
          </div>
        </Card>
      )}

      {/* Reminders Tab */}
      {activeTab === "reminders" && (
        <Card className="p-6 bg-white dark:bg-[#1e1e2d] dark:text-white">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold">تذكيرات المتابعة</h3>
            <Button onClick={() => setShowNewReminder(true)}>
              <Plus className="ml-2 h-4 w-4" />
              إضافة تذكير
            </Button>
          </div>

          <div className="border rounded-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>تاريخ المتابعة</TableHead>
                  <TableHead>العنوان</TableHead>
                  <TableHead>سبب المتابعة</TableHead>
                  <TableHead>الأولوية</TableHead>
                  <TableHead className="text-left">الإجراءات</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {reminders.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-8">
                      <div className="flex flex-col items-center justify-center text-muted-foreground">
                        <Clock className="h-12 w-12 mb-2 opacity-20" />
                        <p>لا توجد تذكيرات</p>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  reminders.map((reminder) => (
                    <TableRow key={reminder.id} className="hover:bg-muted/50">
                      <TableCell
                        className={`${new Date(reminder.date) < new Date() ? "text-red-600 font-medium" : ""}`}
                      >
                        {reminder.date}
                      </TableCell>
                      <TableCell className="font-medium">
                        {reminder.title}
                      </TableCell>
                      <TableCell>{reminder.reason}</TableCell>
                      <TableCell>
                        <span
                          className={`px-2 py-1 text-xs ${reminder.priority === "high" ? "bg-red-100 text-red-800" : reminder.priority === "medium" ? "bg-amber-100 text-amber-800" : "bg-green-100 text-green-800"} rounded-full`}
                        >
                          {reminder.priority === "high"
                            ? "عالية"
                            : reminder.priority === "medium"
                              ? "متوسطة"
                              : "منخفضة"}
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
        </Card>
      )}

      {/* New Communication Dialog */}
      <Dialog
        open={showNewCommunication}
        onOpenChange={setShowNewCommunication}
      >
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>تسجيل اتصال جديد</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">نوع الاتصال</label>
                <Select defaultValue="phone">
                  <SelectTrigger>
                    <SelectValue placeholder="اختر نوع الاتصال" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="phone">هاتف</SelectItem>
                    <SelectItem value="email">بريد إلكتروني</SelectItem>
                    <SelectItem value="visit">زيارة</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">التاريخ والوقت</label>
                <Input type="datetime-local" />
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
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2 col-span-2">
                <label className="text-sm font-medium">ملخص المحادثة</label>
                <Textarea placeholder="ملخص المحادثة" />
              </div>
              <div className="space-y-2 col-span-2">
                <label className="text-sm font-medium">الإجراء المطلوب</label>
                <Input placeholder="الإجراء المطلوب" />
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-4">
              <Button
                variant="outline"
                onClick={() => setShowNewCommunication(false)}
              >
                إلغاء
              </Button>
              <Button onClick={() => setShowNewCommunication(false)}>
                حفظ
              </Button>
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
            <div className="grid grid-cols-1 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">عنوان المهمة</label>
                <Input placeholder="عنوان المهمة" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">تاريخ الاستحقاق</label>
                <Input type="date" />
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

      {/* New Reminder Dialog */}
      <Dialog open={showNewReminder} onOpenChange={setShowNewReminder}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>إضافة تذكير جديد</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">عنوان التذكير</label>
                <Input placeholder="عنوان التذكير" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">تاريخ المتابعة</label>
                <Input type="date" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">سبب المتابعة</label>
                <Input placeholder="سبب المتابعة" />
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
                <label className="text-sm font-medium">ملاحظات</label>
                <Textarea placeholder="ملاحظات إضافية" />
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-4">
              <Button
                variant="outline"
                onClick={() => setShowNewReminder(false)}
              >
                إلغاء
              </Button>
              <Button onClick={() => setShowNewReminder(false)}>حفظ</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CommunicationFollowup;
