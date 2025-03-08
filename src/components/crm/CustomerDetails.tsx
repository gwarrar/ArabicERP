import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
} from "@/components/ui/dialog";
import {
  FileText,
  CreditCard,
  ShoppingCart,
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
  Calendar,
  Upload,
  Paperclip,
  Download,
} from "lucide-react";
import { Customer } from "@/types/crm";
import { communications, tasks } from "@/data/crmData";

interface CustomerDetailsProps {
  customer: Customer;
  onClose?: () => void;
}

const CustomerDetails: React.FC<CustomerDetailsProps> = ({
  customer,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState("info");
  const [showAddNote, setShowAddNote] = useState(false);
  const [showAddFile, setShowAddFile] = useState(false);
  const [showAddCommunication, setShowAddCommunication] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [customerData, setCustomerData] = useState(customer);

  // Filter communications for this customer
  const customerCommunications = communications.filter(
    (comm) => comm.customerId === customer.id,
  );

  // Filter tasks for this customer
  const customerTasks = tasks.filter(
    (task) =>
      task.relatedTo.type === "customer" && task.relatedTo.id === customer.id,
  );

  // Sample notes data
  const notes = [
    {
      id: "1",
      date: "2024-07-15",
      author: "أحمد محمد",
      content:
        "العميل مهتم بالمنتجات الجديدة، يفضل التواصل عبر البريد الإلكتروني.",
    },
    {
      id: "2",
      date: "2024-07-10",
      author: "سارة أحمد",
      content:
        "تم إرسال عرض أسعار للمنتجات الجديدة، العميل سيراجع العرض ويرد خلال أسبوع.",
    },
    {
      id: "3",
      date: "2024-07-05",
      author: "محمد علي",
      content:
        "العميل يبحث عن حلول لتحسين إدارة المخزون، يمكن عرض نظام إدارة المخزون الجديد.",
    },
  ];

  // Sample files data
  const files = [
    {
      id: "1",
      name: "عرض_أسعار_2024.pdf",
      type: "pdf",
      size: "2.5 MB",
      uploadDate: "2024-07-15",
      uploadedBy: "أحمد محمد",
    },
    {
      id: "2",
      name: "عقد_صيانة.docx",
      type: "docx",
      size: "1.2 MB",
      uploadDate: "2024-07-10",
      uploadedBy: "سارة أحمد",
    },
    {
      id: "3",
      name: "صور_المنتجات.zip",
      type: "zip",
      size: "5.8 MB",
      uploadDate: "2024-07-05",
      uploadedBy: "محمد علي",
    },
  ];

  const handleSaveChanges = () => {
    // Here you would typically save the changes to the backend
    setEditMode(false);
    // For now, we'll just update the local state
    // In a real application, you would make an API call here
  };

  const getFileIcon = (type: string) => {
    switch (type) {
      case "pdf":
        return <FileText className="h-5 w-5 text-red-500" />;
      case "docx":
        return <FileText className="h-5 w-5 text-blue-500" />;
      case "zip":
        return <Download className="h-5 w-5 text-yellow-500" />;
      default:
        return <FileText className="h-5 w-5 text-gray-500" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Customer Basic Info */}
      <div className="bg-white p-6 rounded-lg border shadow-sm">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-2xl font-bold">{customer.name}</h2>
            <p className="text-muted-foreground">
              {customer.category === "vip"
                ? "عميل VIP"
                : customer.category === "regular"
                  ? "عميل عادي"
                  : customer.category === "new"
                    ? "عميل جديد"
                    : "غير نشط"}
            </p>
          </div>
          <div className="flex gap-2">
            {!editMode ? (
              <>
                <Button variant="outline" onClick={() => setEditMode(true)}>
                  <Edit className="ml-2 h-4 w-4" />
                  تعديل
                </Button>
                {onClose && (
                  <Button variant="outline" onClick={onClose}>
                    إغلاق
                  </Button>
                )}
              </>
            ) : (
              <>
                <Button variant="outline" onClick={() => setEditMode(false)}>
                  إلغاء
                </Button>
                <Button onClick={handleSaveChanges}>حفظ التغييرات</Button>
              </>
            )}
          </div>
        </div>

        {!editMode ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">معلومات الاتصال</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span>{customer.phone || "غير متوفر"}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span>{customer.email || "غير متوفر"}</span>
                </div>
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <span>{customer.address || "غير متوفر"}</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">معلومات مالية</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">الرصيد الحالي:</span>
                  <span
                    className={`font-medium ${customer.balance > 0 ? "text-green-600" : customer.balance < 0 ? "text-red-600" : ""}`}
                  >
                    {customer.balance.toLocaleString()} ₴
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">
                    إجمالي المشتريات:
                  </span>
                  <span className="font-medium">
                    {customer.totalSpent.toLocaleString()} ₴
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">عدد الطلبات:</span>
                  <span className="font-medium">{customer.orderCount}</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">معلومات إضافية</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">الرقم الضريبي:</span>
                  <span className="font-medium">
                    {customer.taxNumber || "غير متوفر"}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">أول طلب:</span>
                  <span className="font-medium">
                    {customer.firstOrder || "لا يوجد"}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">آخر طلب:</span>
                  <span className="font-medium">
                    {customer.lastOrder || "لا يوجد"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">اسم العميل</label>
              <Input
                value={customerData.name}
                onChange={(e) =>
                  setCustomerData({ ...customerData, name: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">رقم الهاتف</label>
              <Input
                value={customerData.phone || ""}
                onChange={(e) =>
                  setCustomerData({ ...customerData, phone: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">البريد الإلكتروني</label>
              <Input
                value={customerData.email || ""}
                onChange={(e) =>
                  setCustomerData({ ...customerData, email: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">العنوان</label>
              <Input
                value={customerData.address || ""}
                onChange={(e) =>
                  setCustomerData({ ...customerData, address: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">الرقم الضريبي</label>
              <Input
                value={customerData.taxNumber || ""}
                onChange={(e) =>
                  setCustomerData({
                    ...customerData,
                    taxNumber: e.target.value,
                  })
                }
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">فئة العميل</label>
              <select
                className="w-full h-10 px-3 py-2 rounded-md border border-input bg-background"
                value={customerData.category}
                onChange={(e) =>
                  setCustomerData({
                    ...customerData,
                    category: e.target.value as any,
                  })
                }
              >
                <option value="new">جديد</option>
                <option value="regular">عادي</option>
                <option value="vip">VIP</option>
                <option value="inactive">غير نشط</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">الحالة</label>
              <select
                className="w-full h-10 px-3 py-2 rounded-md border border-input bg-background"
                value={customerData.status}
                onChange={(e) =>
                  setCustomerData({
                    ...customerData,
                    status: e.target.value as any,
                  })
                }
              >
                <option value="active">نشط</option>
                <option value="inactive">غير نشط</option>
                <option value="blocked">محظور</option>
              </select>
            </div>
            <div className="space-y-2 col-span-2">
              <label className="text-sm font-medium">ملاحظات</label>
              <Textarea
                value={customerData.notes || ""}
                onChange={(e) =>
                  setCustomerData({ ...customerData, notes: e.target.value })
                }
                placeholder="ملاحظات إضافية عن العميل"
              />
            </div>
          </div>
        )}
      </div>

      {/* Tabs for different sections */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-4 mb-4">
          <TabsTrigger value="info">المعلومات</TabsTrigger>
          <TabsTrigger value="communications">سجل التواصل</TabsTrigger>
          <TabsTrigger value="notes">الملاحظات</TabsTrigger>
          <TabsTrigger value="files">الملفات</TabsTrigger>
        </TabsList>

        <TabsContent value="info" className="space-y-6">
          {customer.notes && (
            <div className="bg-white p-6 rounded-lg border shadow-sm">
              <h3 className="text-lg font-semibold mb-4">ملاحظات</h3>
              <p>{customer.notes}</p>
            </div>
          )}

          <div className="bg-white p-6 rounded-lg border shadow-sm">
            <h3 className="text-lg font-semibold mb-4">المهام المرتبطة</h3>
            {customerTasks.length === 0 ? (
              <p className="text-muted-foreground">
                لا توجد مهام مرتبطة بهذا العميل
              </p>
            ) : (
              <div className="border rounded-lg overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>المهمة</TableHead>
                      <TableHead>تاريخ الاستحقاق</TableHead>
                      <TableHead>المسؤول</TableHead>
                      <TableHead>الأولوية</TableHead>
                      <TableHead>الحالة</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {customerTasks.map((task) => (
                      <TableRow key={task.id} className="hover:bg-muted/50">
                        <TableCell className="font-medium">
                          {task.title}
                        </TableCell>
                        <TableCell>{task.dueDate}</TableCell>
                        <TableCell>{task.assigneeName}</TableCell>
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
                            className={`px-2 py-1 text-xs ${task.status === "completed" ? "bg-green-100 text-green-800" : task.status === "pending" ? "bg-amber-100 text-amber-800" : "bg-red-100 text-red-800"} rounded-full`}
                          >
                            {task.status === "completed"
                              ? "مكتملة"
                              : task.status === "pending"
                                ? "معلقة"
                                : "ملغاة"}
                          </span>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </div>

          <div className="flex justify-end gap-2">
            <Button variant="outline">
              <FileText className="ml-2 h-4 w-4" />
              تقرير كامل
            </Button>
            <Button>
              <ShoppingCart className="ml-2 h-4 w-4" />
              إنشاء طلب جديد
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="communications" className="space-y-6">
          <div className="bg-white p-6 rounded-lg border shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold">سجل التواصل</h3>
              <Button onClick={() => setShowAddCommunication(true)}>
                <Plus className="ml-2 h-4 w-4" />
                إضافة اتصال
              </Button>
            </div>

            {customerCommunications.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <Phone className="h-12 w-12 mx-auto mb-2 opacity-20" />
                <p>لا توجد اتصالات مسجلة مع هذا العميل</p>
              </div>
            ) : (
              <div className="border rounded-lg overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>التاريخ والوقت</TableHead>
                      <TableHead>نوع الاتصال</TableHead>
                      <TableHead>الموظف المسؤول</TableHead>
                      <TableHead>ملخص المحادثة</TableHead>
                      <TableHead>الإجراء المطلوب</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {customerCommunications.map((comm) => (
                      <TableRow key={comm.id} className="hover:bg-muted/50">
                        <TableCell>{comm.date}</TableCell>
                        <TableCell>
                          <span
                            className={`flex items-center gap-1 ${comm.type === "phone" ? "text-blue-600" : comm.type === "email" ? "text-green-600" : comm.type === "visit" ? "text-amber-600" : "text-purple-600"}`}
                          >
                            {comm.type === "phone" ? (
                              <Phone className="h-4 w-4" />
                            ) : comm.type === "email" ? (
                              <Mail className="h-4 w-4" />
                            ) : comm.type === "visit" ? (
                              <User className="h-4 w-4" />
                            ) : (
                              <MessageSquare className="h-4 w-4" />
                            )}
                            {comm.type === "phone"
                              ? "هاتف"
                              : comm.type === "email"
                                ? "بريد إلكتروني"
                                : comm.type === "visit"
                                  ? "زيارة"
                                  : comm.type === "meeting"
                                    ? "اجتماع"
                                    : "آخر"}
                          </span>
                        </TableCell>
                        <TableCell>{comm.employeeName}</TableCell>
                        <TableCell>{comm.summary}</TableCell>
                        <TableCell>{comm.action || "-"}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </div>

          <div className="flex justify-end gap-2">
            <Button variant="outline">
              <Phone className="ml-2 h-4 w-4" />
              اتصال هاتفي
            </Button>
            <Button variant="outline">
              <Mail className="ml-2 h-4 w-4" />
              إرسال بريد إلكتروني
            </Button>
            <Button>
              <Calendar className="ml-2 h-4 w-4" />
              جدولة اجتماع
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="notes" className="space-y-6">
          <div className="bg-white p-6 rounded-lg border shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold">الملاحظات</h3>
              <Button onClick={() => setShowAddNote(true)}>
                <Plus className="ml-2 h-4 w-4" />
                إضافة ملاحظة
              </Button>
            </div>

            {notes.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <MessageSquare className="h-12 w-12 mx-auto mb-2 opacity-20" />
                <p>لا توجد ملاحظات مسجلة لهذا العميل</p>
              </div>
            ) : (
              <div className="space-y-4">
                {notes.map((note) => (
                  <div key={note.id} className="p-4 border rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium">{note.author}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">
                          {note.date}
                        </span>
                      </div>
                    </div>
                    <p>{note.content}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="files" className="space-y-6">
          <div className="bg-white p-6 rounded-lg border shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold">الملفات المرفقة</h3>
              <Button onClick={() => setShowAddFile(true)}>
                <Plus className="ml-2 h-4 w-4" />
                إضافة ملف
              </Button>
            </div>

            {files.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <Paperclip className="h-12 w-12 mx-auto mb-2 opacity-20" />
                <p>لا توجد ملفات مرفقة لهذا العميل</p>
              </div>
            ) : (
              <div className="border rounded-lg overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>اسم الملف</TableHead>
                      <TableHead>النوع</TableHead>
                      <TableHead>الحجم</TableHead>
                      <TableHead>تاريخ الرفع</TableHead>
                      <TableHead>تم الرفع بواسطة</TableHead>
                      <TableHead className="text-left">الإجراءات</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {files.map((file) => (
                      <TableRow key={file.id} className="hover:bg-muted/50">
                        <TableCell>
                          <div className="flex items-center gap-2">
                            {getFileIcon(file.type)}
                            <span className="font-medium">{file.name}</span>
                          </div>
                        </TableCell>
                        <TableCell>{file.type.toUpperCase()}</TableCell>
                        <TableCell>{file.size}</TableCell>
                        <TableCell>{file.uploadDate}</TableCell>
                        <TableCell>{file.uploadedBy}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Button variant="ghost" size="icon">
                              <Download className="h-4 w-4" />
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
            )}
          </div>
        </TabsContent>
      </Tabs>

      {/* Add Note Dialog */}
      <Dialog open={showAddNote} onOpenChange={setShowAddNote}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>إضافة ملاحظة جديدة</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">الملاحظة</label>
              <Textarea placeholder="أدخل الملاحظة هنا..." rows={5} />
            </div>
            <div className="flex justify-end gap-2 pt-4">
              <Button variant="outline" onClick={() => setShowAddNote(false)}>
                إلغاء
              </Button>
              <Button onClick={() => setShowAddNote(false)}>حفظ</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Add File Dialog */}
      <Dialog open={showAddFile} onOpenChange={setShowAddFile}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>إضافة ملف جديد</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
              <p className="text-sm text-muted-foreground mb-2">
                اسحب الملفات هنا أو انقر للتصفح
              </p>
              <Button variant="outline" size="sm">
                اختيار ملف
              </Button>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">وصف الملف (اختياري)</label>
              <Input placeholder="وصف مختصر للملف" />
            </div>
            <div className="flex justify-end gap-2 pt-4">
              <Button variant="outline" onClick={() => setShowAddFile(false)}>
                إلغاء
              </Button>
              <Button onClick={() => setShowAddFile(false)}>رفع</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Add Communication Dialog */}
      <Dialog
        open={showAddCommunication}
        onOpenChange={setShowAddCommunication}
      >
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>تسجيل اتصال جديد</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">نوع الاتصال</label>
                <select className="w-full h-10 px-3 py-2 rounded-md border border-input bg-background">
                  <option value="phone">هاتف</option>
                  <option value="email">بريد إلكتروني</option>
                  <option value="visit">زيارة</option>
                  <option value="meeting">اجتماع</option>
                  <option value="other">آخر</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">التاريخ والوقت</label>
                <Input type="datetime-local" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">الموظف المسؤول</label>
                <select className="w-full h-10 px-3 py-2 rounded-md border border-input bg-background">
                  <option value="ahmed">أحمد محمد</option>
                  <option value="sara">سارة أحمد</option>
                  <option value="mohamed">محمد علي</option>
                </select>
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
                onClick={() => setShowAddCommunication(false)}
              >
                إلغاء
              </Button>
              <Button onClick={() => setShowAddCommunication(false)}>
                حفظ
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CustomerDetails;
