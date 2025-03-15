import React, { useState, useRef } from "react";
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
  DialogFooter,
} from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
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
  DollarSign,
  ArrowUpRight,
  ArrowDownRight,
  Receipt,
  FileSpreadsheet,
  Bookmark,
  BarChart3,
  History,
  Printer,
  Image as ImageIcon,
  File,
  X,
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
  const [activeTab, setActiveTab] = useState("communication-log");
  const [newNote, setNewNote] = useState("");
  const [showAddCommunication, setShowAddCommunication] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [customerData, setCustomerData] = useState(customer);
  const [showFileUpload, setShowFileUpload] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [uploadProgress, setUploadProgress] = useState<{
    [key: string]: number;
  }>({});
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  // Handle file upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setUploadedFiles([...uploadedFiles, ...newFiles]);

      // Initialize progress for new files
      const newProgress = { ...uploadProgress };
      newFiles.forEach((file) => {
        newProgress[file.name] = 0;
      });
      setUploadProgress(newProgress);

      // Simulate upload progress
      newFiles.forEach((file) => {
        simulateFileUpload(file.name);
      });
    }
  };

  // Simulate file upload progress
  const simulateFileUpload = (fileName: string) => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.floor(Math.random() * 10) + 5;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
      }
      setUploadProgress((prev) => ({
        ...prev,
        [fileName]: progress,
      }));
    }, 300);
  };

  // Handle drag events
  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const newFiles = Array.from(e.dataTransfer.files);
      setUploadedFiles([...uploadedFiles, ...newFiles]);

      // Initialize progress for new files
      const newProgress = { ...uploadProgress };
      newFiles.forEach((file) => {
        newProgress[file.name] = 0;
      });
      setUploadProgress(newProgress);

      // Simulate upload progress
      newFiles.forEach((file) => {
        simulateFileUpload(file.name);
      });
    }
  };

  // Remove file from upload list
  const removeFile = (fileName: string) => {
    setUploadedFiles(uploadedFiles.filter((file) => file.name !== fileName));
    const newProgress = { ...uploadProgress };
    delete newProgress[fileName];
    setUploadProgress(newProgress);
  };

  // Get file icon based on file type
  const getFileIconByType = (fileName: string) => {
    const extension = fileName.split(".").pop()?.toLowerCase();

    if (
      ["jpg", "jpeg", "png", "gif", "svg", "webp"].includes(extension || "")
    ) {
      return <FileText className="h-6 w-6 text-blue-500" />;
    } else if (["pdf"].includes(extension || "")) {
      return <FileText className="h-6 w-6 text-red-500" />;
    } else if (["zip", "rar", "7z", "tar", "gz"].includes(extension || "")) {
      return <FileText className="h-6 w-6 text-yellow-500" />;
    } else if (
      ["mp4", "avi", "mov", "wmv", "flv", "webm"].includes(extension || "")
    ) {
      return <FileText className="h-6 w-6 text-purple-500" />;
    } else if (["mp3", "wav", "ogg", "flac"].includes(extension || "")) {
      return <FileText className="h-6 w-6 text-green-500" />;
    } else if (
      ["html", "css", "js", "jsx", "ts", "tsx", "json", "xml"].includes(
        extension || "",
      )
    ) {
      return <FileText className="h-6 w-6 text-indigo-500" />;
    } else {
      return <File className="h-6 w-6 text-gray-500" />;
    }
  };

  // Format file size
  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

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
    <Dialog open={true} onOpenChange={onClose || (() => {})}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold flex items-center justify-between">
            <div className="flex items-center">
              <span>تفاصيل العميل: {customer.name}</span>
            </div>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 max-h-[75vh] overflow-y-auto pr-2">
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
                    <Button
                      variant="outline"
                      onClick={() => setEditMode(false)}
                    >
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
                  <h3 className="text-lg font-semibold mb-4">
                    معلومات الاتصال
                  </h3>
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
                      <span className="text-muted-foreground">
                        الرصيد الحالي:
                      </span>
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
                      <span className="text-muted-foreground">
                        عدد الطلبات:
                      </span>
                      <span className="font-medium">{customer.orderCount}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-4">معلومات إضافية</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">
                        الرقم الضريبي:
                      </span>
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
                      setCustomerData({
                        ...customerData,
                        phone: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    البريد الإلكتروني
                  </label>
                  <Input
                    value={customerData.email || ""}
                    onChange={(e) =>
                      setCustomerData({
                        ...customerData,
                        email: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">العنوان</label>
                  <Input
                    value={customerData.address || ""}
                    onChange={(e) =>
                      setCustomerData({
                        ...customerData,
                        address: e.target.value,
                      })
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
                      setCustomerData({
                        ...customerData,
                        notes: e.target.value,
                      })
                    }
                    placeholder="ملاحظات إضافية عن العميل"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Tabs for different sections */}
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-3 mb-4 sticky top-0 z-10 bg-background">
              <TabsTrigger value="communication-log">سجل التواصل</TabsTrigger>
              <TabsTrigger value="ledger">دفتر الأستاذ</TabsTrigger>
              <TabsTrigger value="info">المعلومات</TabsTrigger>
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

            <TabsContent value="communication-log" className="space-y-6">
              <div className="bg-white p-6 rounded-lg border shadow-sm">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-semibold">سجل التواصل الموحد</h3>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Filter className="ml-1 h-4 w-4" />
                      تصفية
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setShowFileUpload(true)}
                    >
                      <Upload className="ml-1 h-4 w-4" />
                      رفع ملف
                    </Button>
                    <Button onClick={() => setShowAddCommunication(true)}>
                      <Plus className="ml-2 h-4 w-4" />
                      إضافة تواصل
                    </Button>
                  </div>
                </div>

                {/* Timeline of all communications, notes, files, and events */}
                <div className="relative border-r-2 border-gray-200 pr-8 space-y-6 max-h-[60vh] overflow-y-auto">
                  {/* Combine all timeline items and sort by date */}
                  {(() => {
                    // Create timeline items array with all events
                    const timelineItems = [
                      // Account creation
                      {
                        id: "account-creation",
                        date: customer.createdAt,
                        type: "account-creation",
                        title: "إنشاء الحساب",
                        icon: <User className="h-4 w-4 text-gray-600" />,
                        color: "bg-gray-500",
                        content: (
                          <div className="text-sm mt-1 bg-gray-50 p-3 rounded-lg border border-gray-100">
                            تم إنشاء حساب العميل في النظام
                          </div>
                        ),
                      },
                      // First order
                      {
                        id: "first-order",
                        date: customer.firstOrder || "2024-01-01",
                        type: "first-order",
                        title: "أول طلب",
                        icon: (
                          <ShoppingCart className="h-4 w-4 text-green-600" />
                        ),
                        color: "bg-green-500",
                        content: (
                          <div className="text-sm mt-1 bg-green-50 p-3 rounded-lg border border-green-100">
                            تم تسجيل العميل وإنشاء أول طلب بقيمة{" "}
                            {(customer.totalSpent * 0.2).toLocaleString()} ₴
                          </div>
                        ),
                      },
                      // Status change
                      {
                        id: "status-change",
                        date: "2024-06-15",
                        type: "status-change",
                        title: "تغيير فئة العميل",
                        icon: <User className="h-4 w-4 text-purple-600" />,
                        color: "bg-purple-500",
                        content: (
                          <div className="text-sm mt-1 bg-purple-50 p-3 rounded-lg border border-purple-100">
                            تم ترقية العميل إلى فئة{" "}
                            {customer.category === "vip"
                              ? "VIP"
                              : customer.category === "regular"
                                ? "عادي"
                                : "جديد"}
                          </div>
                        ),
                      },
                      // Last order
                      {
                        id: "last-order",
                        date: customer.lastOrder || "2024-07-01",
                        type: "last-order",
                        title: "آخر طلب",
                        icon: (
                          <ShoppingCart className="h-4 w-4 text-blue-600" />
                        ),
                        color: "bg-blue-500",
                        content: (
                          <div className="text-sm mt-1 bg-blue-50 p-3 rounded-lg border border-blue-100">
                            تم إنشاء طلب بقيمة{" "}
                            {(customer.totalSpent * 0.3).toLocaleString()} ₴
                          </div>
                        ),
                      },
                      // Communications
                      ...customerCommunications.map((comm) => ({
                        id: `comm-${comm.id}`,
                        date: comm.date,
                        type: "communication",
                        commType: comm.type,
                        title:
                          comm.type === "phone"
                            ? "اتصال هاتفي"
                            : comm.type === "email"
                              ? "بريد إلكتروني"
                              : comm.type === "visit"
                                ? "زيارة"
                                : comm.type === "meeting"
                                  ? "اجتماع"
                                  : "آخر",
                        icon:
                          comm.type === "phone" ? (
                            <Phone className="h-4 w-4 text-blue-600" />
                          ) : comm.type === "email" ? (
                            <Mail className="h-4 w-4 text-green-600" />
                          ) : comm.type === "visit" ? (
                            <User className="h-4 w-4 text-amber-600" />
                          ) : (
                            <MessageSquare className="h-4 w-4 text-purple-600" />
                          ),
                        color:
                          comm.type === "phone"
                            ? "bg-blue-500"
                            : comm.type === "email"
                              ? "bg-green-500"
                              : comm.type === "visit"
                                ? "bg-amber-500"
                                : "bg-purple-500",
                        content: (
                          <div className="flex justify-between items-start">
                            <div className="text-sm mt-1 bg-blue-50 p-3 rounded-lg border border-blue-100 flex-1">
                              <div className="text-xs text-muted-foreground mb-1">
                                بواسطة: {comm.employeeName}
                              </div>
                              {comm.summary}
                            </div>
                            <div className="flex items-center gap-1 mr-2">
                              <Button variant="ghost" size="icon">
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon">
                                <Trash className="h-4 w-4 text-red-500" />
                              </Button>
                            </div>
                          </div>
                        ),
                      })),
                      // Notes
                      ...notes.map((note) => ({
                        id: `note-${note.id}`,
                        date: note.date,
                        type: "note",
                        title: "ملاحظة",
                        icon: (
                          <MessageSquare className="h-4 w-4 text-amber-600" />
                        ),
                        color: "bg-amber-500",
                        content: (
                          <div className="flex justify-between items-start">
                            <div className="text-sm mt-1 bg-amber-50 p-3 rounded-lg border border-amber-100 flex-1">
                              <div className="text-xs text-muted-foreground mb-1">
                                بواسطة: {note.author}
                              </div>
                              {note.content}
                            </div>
                            <div className="flex items-center gap-1 mr-2">
                              <Button variant="ghost" size="icon">
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon">
                                <Trash className="h-4 w-4 text-red-500" />
                              </Button>
                            </div>
                          </div>
                        ),
                      })),
                      // Files
                      ...files.map((file) => ({
                        id: `file-${file.id}`,
                        date: file.uploadDate,
                        type: "file",
                        fileType: file.type,
                        title: `ملف ${file.type.toUpperCase()}`,
                        icon: getFileIcon(file.type),
                        color: "bg-blue-500",
                        content: (
                          <div className="flex justify-between items-start">
                            <div className="text-sm mt-1 bg-blue-50 p-3 rounded-lg border border-blue-100 flex-1">
                              <div className="text-xs text-muted-foreground mb-1">
                                تم الرفع بواسطة: {file.uploadedBy}
                              </div>
                              <div className="flex items-center gap-2">
                                {getFileIcon(file.type)}
                                <span className="font-medium">{file.name}</span>
                                <span className="text-xs text-muted-foreground">
                                  ({file.size})
                                </span>
                              </div>
                            </div>
                            <div className="flex items-center gap-1 mr-2">
                              <Button variant="ghost" size="icon">
                                <Download className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon">
                                <Trash className="h-4 w-4 text-red-500" />
                              </Button>
                            </div>
                          </div>
                        ),
                      })),
                    ];

                    // Convert date strings to Date objects for sorting
                    const parseDate = (dateStr: string) => {
                      try {
                        return new Date(dateStr);
                      } catch (e) {
                        return new Date(0); // Default to epoch if invalid
                      }
                    };

                    // Sort items by date (oldest first)
                    const sortedItems = [...timelineItems].sort((a, b) => {
                      return (
                        parseDate(a.date).getTime() -
                        parseDate(b.date).getTime()
                      );
                    });

                    // Render the sorted timeline
                    return sortedItems.map((item) => (
                      <div key={item.id} className="relative">
                        <div
                          className={`absolute right-[-9px] top-0 w-4 h-4 rounded-full ${item.color}`}
                        ></div>
                        <div className="mb-1 font-medium flex items-center gap-2">
                          {item.icon}
                          {item.title}
                          <span className="text-sm text-muted-foreground mr-2">
                            {item.date}
                          </span>
                        </div>
                        {item.content}
                      </div>
                    ));
                  })()}

                  {customerCommunications.length === 0 &&
                    notes.length === 0 &&
                    files.length === 0 && (
                      <div className="text-center py-8 text-muted-foreground">
                        <History className="h-12 w-12 mx-auto mb-2 opacity-20" />
                        <p>لا يوجد سجل تواصل لهذا العميل</p>
                      </div>
                    )}
                </div>
              </div>

              <div className="mt-6 border rounded-lg p-4 bg-white">
                <h3 className="text-lg font-semibold mb-3">
                  إضافة ملاحظة جديدة
                </h3>
                <div className="flex gap-2">
                  <Textarea
                    placeholder="أدخل ملاحظة جديدة هنا..."
                    className="flex-1"
                    value={newNote}
                    onChange={(e) => setNewNote(e.target.value)}
                  />
                  <div className="flex flex-col gap-2">
                    <Button
                      onClick={() => {
                        if (newNote.trim()) {
                          // Here you would add the note to your data store
                          console.log("Adding note:", newNote);
                          setNewNote("");
                        }
                      }}
                    >
                      <MessageSquare className="ml-2 h-4 w-4" />
                      إرسال
                    </Button>
                    <Button variant="outline">
                      <Phone className="ml-2 h-4 w-4" />
                      اتصال
                    </Button>
                    <Button variant="outline">
                      <Mail className="ml-2 h-4 w-4" />
                      بريد
                    </Button>
                    <Button variant="outline">
                      <Calendar className="ml-2 h-4 w-4" />
                      موعد
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => setShowFileUpload(true)}
                    >
                      <Paperclip className="ml-2 h-4 w-4" />
                      إرفاق ملف
                    </Button>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="ledger" className="space-y-6">
              <div className="bg-white p-6 rounded-lg border shadow-sm">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-semibold">دفتر الأستاذ</h3>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Filter className="ml-1 h-4 w-4" />
                      تصفية
                    </Button>
                    <Button variant="outline" size="sm">
                      <Download className="ml-1 h-4 w-4" />
                      تصدير
                    </Button>
                    <Button>
                      <Plus className="ml-2 h-4 w-4" />
                      إضافة معاملة
                    </Button>
                  </div>
                </div>

                {/* Financial summary cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-sm text-blue-700">الرصيد الحالي</p>
                        <h3 className="text-xl font-bold text-blue-800 mt-1">
                          {customer.balance.toLocaleString()} ₴
                        </h3>
                      </div>
                      <div className="p-2 bg-blue-100 rounded-full">
                        <DollarSign className="h-5 w-5 text-blue-600" />
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-green-50 rounded-lg border border-green-100">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-sm text-green-700">
                          إجمالي المدفوعات
                        </p>
                        <h3 className="text-xl font-bold text-green-800 mt-1">
                          {(customer.totalSpent * 0.8).toLocaleString()} ₴
                        </h3>
                      </div>
                      <div className="p-2 bg-green-100 rounded-full">
                        <ArrowUpRight className="h-5 w-5 text-green-600" />
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-amber-50 rounded-lg border border-amber-100">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-sm text-amber-700">
                          إجمالي المقبوضات
                        </p>
                        <h3 className="text-xl font-bold text-amber-800 mt-1">
                          {customer.totalSpent.toLocaleString()} ₴
                        </h3>
                      </div>
                      <div className="p-2 bg-amber-100 rounded-full">
                        <ArrowDownRight className="h-5 w-5 text-amber-600" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Ledger transactions table */}
                <div className="border rounded-lg overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>التاريخ</TableHead>
                        <TableHead>رقم المستند</TableHead>
                        <TableHead>البيان</TableHead>
                        <TableHead>مدين</TableHead>
                        <TableHead>دائن</TableHead>
                        <TableHead>الرصيد</TableHead>
                        <TableHead>الإجراءات</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {/* Sample ledger entries */}
                      <TableRow className="hover:bg-muted/50">
                        <TableCell>2024-07-20</TableCell>
                        <TableCell>INV-2024-0042</TableCell>
                        <TableCell>فاتورة مبيعات</TableCell>
                        <TableCell className="text-red-600">-</TableCell>
                        <TableCell className="text-green-600">
                          12,500 ₴
                        </TableCell>
                        <TableCell className="font-medium">12,500 ₴</TableCell>
                        <TableCell>
                          <Button variant="ghost" size="icon">
                            <FileText className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                      <TableRow className="hover:bg-muted/50">
                        <TableCell>2024-07-15</TableCell>
                        <TableCell>PAY-2024-0038</TableCell>
                        <TableCell>دفعة مستلمة</TableCell>
                        <TableCell className="text-red-600">8,000 ₴</TableCell>
                        <TableCell className="text-green-600">-</TableCell>
                        <TableCell className="font-medium">4,500 ₴</TableCell>
                        <TableCell>
                          <Button variant="ghost" size="icon">
                            <FileText className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                      <TableRow className="hover:bg-muted/50">
                        <TableCell>2024-07-10</TableCell>
                        <TableCell>INV-2024-0039</TableCell>
                        <TableCell>فاتورة مبيعات</TableCell>
                        <TableCell className="text-red-600">-</TableCell>
                        <TableCell className="text-green-600">
                          8,750 ₴
                        </TableCell>
                        <TableCell className="font-medium">12,500 ₴</TableCell>
                        <TableCell>
                          <Button variant="ghost" size="icon">
                            <FileText className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                      <TableRow className="hover:bg-muted/50">
                        <TableCell>2024-07-05</TableCell>
                        <TableCell>PAY-2024-0035</TableCell>
                        <TableCell>دفعة مستلمة</TableCell>
                        <TableCell className="text-red-600">5,000 ₴</TableCell>
                        <TableCell className="text-green-600">-</TableCell>
                        <TableCell className="font-medium">3,750 ₴</TableCell>
                        <TableCell>
                          <Button variant="ghost" size="icon">
                            <FileText className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                      <TableRow className="hover:bg-muted/50">
                        <TableCell>2024-07-01</TableCell>
                        <TableCell>INV-2024-0036</TableCell>
                        <TableCell>فاتورة مبيعات</TableCell>
                        <TableCell className="text-red-600">-</TableCell>
                        <TableCell className="text-green-600">
                          8,750 ₴
                        </TableCell>
                        <TableCell className="font-medium">8,750 ₴</TableCell>
                        <TableCell>
                          <Button variant="ghost" size="icon">
                            <FileText className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </div>

              <div className="flex justify-end gap-2">
                <Button variant="outline">
                  <FileSpreadsheet className="ml-2 h-4 w-4" />
                  تصدير كشف حساب
                </Button>
                <Button variant="outline">
                  <Printer className="ml-2 h-4 w-4" />
                  طباعة
                </Button>
                <Button>
                  <Receipt className="ml-2 h-4 w-4" />
                  إنشاء فاتورة جديدة
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* File Upload Dialog */}
        <Dialog open={showFileUpload} onOpenChange={setShowFileUpload}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>رفع ملفات</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div
                className={`border-2 border-dashed rounded-lg p-8 text-center ${isDragging ? "border-primary bg-primary/10" : "border-gray-300"}`}
                onDragEnter={handleDragEnter}
                onDragLeave={handleDragLeave}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
              >
                <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <p className="text-lg font-medium mb-2">
                  اسحب الملفات وأفلتها هنا
                </p>
                <p className="text-sm text-muted-foreground mb-4">أو</p>
                <Button onClick={() => fileInputRef.current?.click()}>
                  <Paperclip className="ml-2 h-4 w-4" />
                  اختر ملفات
                </Button>
                <input
                  type="file"
                  ref={fileInputRef}
                  className="hidden"
                  multiple
                  onChange={handleFileUpload}
                />
              </div>

              {uploadedFiles.length > 0 && (
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">
                    الملفات المختارة ({uploadedFiles.length})
                  </h3>
                  <div className="space-y-3 max-h-[300px] overflow-y-auto">
                    {uploadedFiles.map((file, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 border rounded-lg"
                      >
                        <div className="flex items-center gap-3">
                          {getFileIconByType(file.name)}
                          <div>
                            <p className="font-medium">{file.name}</p>
                            <p className="text-xs text-muted-foreground">
                              {formatFileSize(file.size)}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {uploadProgress[file.name] < 100 ? (
                            <div className="w-24">
                              <Progress
                                value={uploadProgress[file.name]}
                                className="h-2"
                              />
                              <p className="text-xs text-right mt-1">
                                {uploadProgress[file.name]}%
                              </p>
                            </div>
                          ) : (
                            <CheckCircle className="h-5 w-5 text-green-500" />
                          )}
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => removeFile(file.name)}
                          >
                            <X className="h-4 w-4 text-red-500" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setShowFileUpload(false)}
              >
                إلغاء
              </Button>
              <Button
                onClick={() => {
                  // Here you would typically send the files to your backend
                  console.log("Uploading files:", uploadedFiles);
                  // For demo purposes, we'll just close the dialog
                  setShowFileUpload(false);
                  // In a real app, you would wait for the upload to complete
                }}
                disabled={
                  uploadedFiles.length === 0 ||
                  Object.values(uploadProgress).some((p) => p < 100)
                }
              >
                <Upload className="ml-2 h-4 w-4" />
                رفع الملفات
              </Button>
            </DialogFooter>
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
      </DialogContent>
    </Dialog>
  );
};

export default CustomerDetails;
