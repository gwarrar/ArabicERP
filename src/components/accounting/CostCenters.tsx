import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
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
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  Search,
  Plus,
  Edit,
  Trash,
  Building,
  MapPin,
  DollarSign,
  Filter,
  Download,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

// بيانات تجريبية لمراكز التكلفة
const initialCostCenters = [
  {
    id: "CC-001",
    name: "كييف",
    code: "KYV",
    type: "فرع",
    manager: "أحمد محمد",
    status: "نشط",
    description: "مركز تكلفة لفرع كييف",
    address: "شارع خريشاتيك، كييف، أوكرانيا",
    phone: "+380 44 123 4567",
    email: "kyiv@example.com",
    createdAt: "2024-01-15",
    updatedAt: "2024-06-10",
  },
  {
    id: "CC-002",
    name: "خاركيف",
    code: "KHR",
    type: "فرع",
    manager: "محمد علي",
    status: "نشط",
    description: "مركز تكلفة لفرع خاركيف",
    address: "شارع سومسكا، خاركيف، أوكرانيا",
    phone: "+380 57 987 6543",
    email: "kharkiv@example.com",
    createdAt: "2024-02-20",
    updatedAt: "2024-05-15",
  },
  {
    id: "CC-003",
    name: "أوديسا",
    code: "ODS",
    type: "فرع",
    manager: "سارة أحمد",
    status: "نشط",
    description: "مركز تكلفة لفرع أوديسا",
    address: "شارع ديريباسيفسكا، أوديسا، أوكرانيا",
    phone: "+380 48 456 7890",
    email: "odesa@example.com",
    createdAt: "2024-03-10",
    updatedAt: "2024-06-05",
  },
  {
    id: "CC-004",
    name: "دنيبرو",
    code: "DNP",
    type: "فرع",
    manager: "فاطمة حسن",
    status: "نشط",
    description: "مركز تكلفة لفرع دنيبرو",
    address: "شارع كارلا ماركسا، دنيبرو، أوكرانيا",
    phone: "+380 56 234 5678",
    email: "dnipro@example.com",
    createdAt: "2024-04-05",
    updatedAt: "2024-06-15",
  },
  {
    id: "CC-005",
    name: "لفيف",
    code: "LVV",
    type: "فرع",
    manager: "خالد العبدالله",
    status: "غير نشط",
    description: "مركز تكلفة لفرع لفيف",
    address: "ساحة السوق، لفيف، أوكرانيا",
    phone: "+380 32 345 6789",
    email: "lviv@example.com",
    createdAt: "2024-05-01",
    updatedAt: "2024-06-20",
  },
];

const CostCenters = () => {
  const [costCenters, setCostCenters] = useState(initialCostCenters);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [showAddCostCenter, setShowAddCostCenter] = useState(false);
  const [showEditCostCenter, setShowEditCostCenter] = useState(false);
  const [selectedCostCenter, setSelectedCostCenter] = useState<any>(null);
  const [sortField, setSortField] = useState("id");
  const [sortDirection, setSortDirection] = useState("asc");
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const { toast } = useToast();

  // نموذج مركز تكلفة جديد
  const [newCostCenter, setNewCostCenter] = useState({
    id: "",
    name: "",
    code: "",
    type: "فرع",
    manager: "",
    status: "نشط",
    description: "",
    address: "",
    phone: "",
    email: "",
  });

  // تصفية مراكز التكلفة
  const filteredCostCenters = costCenters
    .filter((center) => {
      const matchesSearch =
        center.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        center.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
        center.id.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus =
        statusFilter === "all" || center.status === statusFilter;

      const matchesType = typeFilter === "all" || center.type === typeFilter;

      return matchesSearch && matchesStatus && matchesType;
    })
    .sort((a, b) => {
      let comparison = 0;
      if (sortField === "id") {
        comparison = a.id.localeCompare(b.id);
      } else if (sortField === "name") {
        comparison = a.name.localeCompare(b.name);
      } else if (sortField === "code") {
        comparison = a.code.localeCompare(b.code);
      } else if (sortField === "updatedAt") {
        comparison =
          new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime();
      }

      return sortDirection === "asc" ? comparison : -comparison;
    });

  // معالجة تغيير الترتيب
  const handleSortChange = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  // الحصول على أيقونة الترتيب
  const getSortIcon = (field: string) => {
    if (sortField !== field) return <ArrowUpDown className="h-4 w-4" />;
    return sortDirection === "asc" ? (
      <ArrowUp className="h-4 w-4" />
    ) : (
      <ArrowDown className="h-4 w-4" />
    );
  };

  // معالجة تغيير حقول النموذج
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    if (showEditCostCenter) {
      setSelectedCostCenter({ ...selectedCostCenter, [name]: value });
    } else {
      setNewCostCenter({ ...newCostCenter, [name]: value });
    }
  };

  // معالجة تغيير القائمة المنسدلة
  const handleSelectChange = (name: string, value: string) => {
    if (showEditCostCenter) {
      setSelectedCostCenter({ ...selectedCostCenter, [name]: value });
    } else {
      setNewCostCenter({ ...newCostCenter, [name]: value });
    }
  };

  // إضافة مركز تكلفة جديد
  const handleAddCostCenter = () => {
    const newId = `CC-${String(costCenters.length + 1).padStart(3, "0")}`;
    const now = new Date().toISOString().split("T")[0];
    const newCenter = {
      ...newCostCenter,
      id: newId,
      createdAt: now,
      updatedAt: now,
    };

    setCostCenters([...costCenters, newCenter]);
    setShowAddCostCenter(false);
    setNewCostCenter({
      id: "",
      name: "",
      code: "",
      type: "فرع",
      manager: "",
      status: "نشط",
      description: "",
      address: "",
      phone: "",
      email: "",
    });

    toast({
      title: "تم إضافة مركز التكلفة",
      description: `تم إضافة مركز التكلفة ${newCenter.name} بنجاح`,
    });
  };

  // تحديث مركز تكلفة
  const handleUpdateCostCenter = () => {
    const now = new Date().toISOString().split("T")[0];
    const updatedCenter = {
      ...selectedCostCenter,
      updatedAt: now,
    };

    setCostCenters(
      costCenters.map((center) =>
        center.id === updatedCenter.id ? updatedCenter : center,
      ),
    );
    setShowEditCostCenter(false);
    setSelectedCostCenter(null);

    toast({
      title: "تم تحديث مركز التكلفة",
      description: `تم تحديث مركز التكلفة ${updatedCenter.name} بنجاح`,
    });
  };

  // حذف مركز تكلفة
  const handleDeleteCostCenter = () => {
    setCostCenters(
      costCenters.filter((center) => center.id !== selectedCostCenter.id),
    );
    setShowDeleteConfirm(false);
    setSelectedCostCenter(null);

    toast({
      title: "تم حذف مركز التكلفة",
      description: `تم حذف مركز التكلفة ${selectedCostCenter.name} بنجاح`,
    });
  };

  // تحرير مركز تكلفة
  const handleEditCostCenter = (center: any) => {
    setSelectedCostCenter(center);
    setShowEditCostCenter(true);
  };

  // الحصول على لون الحالة
  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case "نشط":
        return "bg-green-100 text-green-800";
      case "غير نشط":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // الحصول على أيقونة الحالة
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "نشط":
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case "غير نشط":
        return <XCircle className="h-4 w-4 text-red-600" />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">مراكز التكلفة</h2>
        <Button onClick={() => setShowAddCostCenter(true)}>
          <Plus className="ml-2 h-4 w-4" />
          إضافة مركز تكلفة
        </Button>
      </div>

      {/* فلاتر البحث */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="بحث عن مركز تكلفة..."
            className="pr-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="flex gap-2">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[130px]">
              <SelectValue placeholder="الحالة" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">جميع الحالات</SelectItem>
              <SelectItem value="نشط">نشط</SelectItem>
              <SelectItem value="غير نشط">غير نشط</SelectItem>
            </SelectContent>
          </Select>

          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="w-[130px]">
              <SelectValue placeholder="النوع" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">جميع الأنواع</SelectItem>
              <SelectItem value="فرع">فرع</SelectItem>
              <SelectItem value="قسم">قسم</SelectItem>
              <SelectItem value="مشروع">مشروع</SelectItem>
            </SelectContent>
          </Select>

          <Button variant="outline">
            <Download className="ml-2 h-4 w-4" />
            تصدير
          </Button>
        </div>
      </div>

      {/* ملخص مراكز التكلفة */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-muted-foreground">
                  إجمالي مراكز التكلفة
                </p>
                <h3 className="text-2xl font-bold mt-2">
                  {costCenters.length}
                </h3>
              </div>
              <div className="p-2 bg-blue-100 rounded-full">
                <Building className="h-5 w-5 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-muted-foreground">
                  مراكز تكلفة نشطة
                </p>
                <h3 className="text-2xl font-bold mt-2">
                  {
                    costCenters.filter((center) => center.status === "نشط")
                      .length
                  }
                </h3>
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
                  مراكز تكلفة غير نشطة
                </p>
                <h3 className="text-2xl font-bold mt-2">
                  {
                    costCenters.filter((center) => center.status === "غير نشط")
                      .length
                  }
                </h3>
              </div>
              <div className="p-2 bg-red-100 rounded-full">
                <XCircle className="h-5 w-5 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-muted-foreground">آخر تحديث</p>
                <h3 className="text-lg font-bold mt-2">
                  {costCenters.length > 0
                    ? new Date(
                        Math.max(
                          ...costCenters.map((center) =>
                            new Date(center.updatedAt).getTime(),
                          ),
                        ),
                      ).toLocaleDateString("ar-EG")
                    : "-"}
                </h3>
              </div>
              <div className="p-2 bg-purple-100 rounded-full">
                <DollarSign className="h-5 w-5 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* جدول مراكز التكلفة */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle>قائمة مراكز التكلفة</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="border rounded-lg overflow-hidden">
            <Table dir="rtl">
              <TableHeader>
                <TableRow>
                  <TableHead
                    className="cursor-pointer"
                    onClick={() => handleSortChange("id")}
                  >
                    <div className="flex items-center">
                      الرمز {getSortIcon("id")}
                    </div>
                  </TableHead>
                  <TableHead
                    className="cursor-pointer"
                    onClick={() => handleSortChange("name")}
                  >
                    <div className="flex items-center">
                      الاسم {getSortIcon("name")}
                    </div>
                  </TableHead>
                  <TableHead
                    className="cursor-pointer"
                    onClick={() => handleSortChange("code")}
                  >
                    <div className="flex items-center">
                      الكود {getSortIcon("code")}
                    </div>
                  </TableHead>
                  <TableHead>النوع</TableHead>
                  <TableHead>المدير</TableHead>
                  <TableHead>الحالة</TableHead>
                  <TableHead
                    className="cursor-pointer"
                    onClick={() => handleSortChange("updatedAt")}
                  >
                    <div className="flex items-center">
                      آخر تحديث {getSortIcon("updatedAt")}
                    </div>
                  </TableHead>
                  <TableHead>الإجراءات</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCostCenters.length > 0 ? (
                  filteredCostCenters.map((center) => (
                    <TableRow key={center.id}>
                      <TableCell className="font-medium">{center.id}</TableCell>
                      <TableCell>{center.name}</TableCell>
                      <TableCell>{center.code}</TableCell>
                      <TableCell>{center.type}</TableCell>
                      <TableCell>{center.manager}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          {getStatusIcon(center.status)}
                          <Badge className={getStatusBadgeClass(center.status)}>
                            {center.status}
                          </Badge>
                        </div>
                      </TableCell>
                      <TableCell>{center.updatedAt}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleEditCostCenter(center)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => {
                              setSelectedCostCenter(center);
                              setShowDeleteConfirm(true);
                            }}
                          >
                            <Trash className="h-4 w-4 text-red-500" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-8">
                      <div className="flex flex-col items-center justify-center text-muted-foreground">
                        <Building className="h-8 w-8 mb-2" />
                        <p>لا توجد مراكز تكلفة تطابق معايير البحث</p>
                        <Button
                          variant="link"
                          onClick={() => {
                            setSearchQuery("");
                            setStatusFilter("all");
                            setTypeFilter("all");
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

      {/* نافذة إضافة مركز تكلفة جديد */}
      <Dialog open={showAddCostCenter} onOpenChange={setShowAddCostCenter}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>إضافة مركز تكلفة جديد</DialogTitle>
            <DialogDescription>
              أدخل بيانات مركز التكلفة الجديد
            </DialogDescription>
          </DialogHeader>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium">
                اسم مركز التكلفة *
              </label>
              <Input
                id="name"
                name="name"
                placeholder="أدخل اسم مركز التكلفة"
                value={newCostCenter.name}
                onChange={handleInputChange}
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="code" className="text-sm font-medium">
                الكود *
              </label>
              <Input
                id="code"
                name="code"
                placeholder="أدخل كود مركز التكلفة"
                value={newCostCenter.code}
                onChange={handleInputChange}
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="type" className="text-sm font-medium">
                النوع *
              </label>
              <Select
                value={newCostCenter.type}
                onValueChange={(value) => handleSelectChange("type", value)}
              >
                <SelectTrigger id="type">
                  <SelectValue placeholder="اختر النوع" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="فرع">فرع</SelectItem>
                  <SelectItem value="قسم">قسم</SelectItem>
                  <SelectItem value="مشروع">مشروع</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label htmlFor="manager" className="text-sm font-medium">
                المدير المسؤول *
              </label>
              <Input
                id="manager"
                name="manager"
                placeholder="أدخل اسم المدير المسؤول"
                value={newCostCenter.manager}
                onChange={handleInputChange}
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="status" className="text-sm font-medium">
                الحالة *
              </label>
              <Select
                value={newCostCenter.status}
                onValueChange={(value) => handleSelectChange("status", value)}
              >
                <SelectTrigger id="status">
                  <SelectValue placeholder="اختر الحالة" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="نشط">نشط</SelectItem>
                  <SelectItem value="غير نشط">غير نشط</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label htmlFor="phone" className="text-sm font-medium">
                رقم الهاتف
              </label>
              <Input
                id="phone"
                name="phone"
                placeholder="أدخل رقم الهاتف"
                value={newCostCenter.phone}
                onChange={handleInputChange}
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">
                البريد الإلكتروني
              </label>
              <Input
                id="email"
                name="email"
                placeholder="أدخل البريد الإلكتروني"
                value={newCostCenter.email}
                onChange={handleInputChange}
              />
            </div>

            <div className="space-y-2 col-span-2">
              <label htmlFor="address" className="text-sm font-medium">
                العنوان
              </label>
              <Input
                id="address"
                name="address"
                placeholder="أدخل العنوان"
                value={newCostCenter.address}
                onChange={handleInputChange}
              />
            </div>

            <div className="space-y-2 col-span-2">
              <label htmlFor="description" className="text-sm font-medium">
                الوصف
              </label>
              <Textarea
                id="description"
                name="description"
                placeholder="أدخل وصف مركز التكلفة"
                value={newCostCenter.description}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowAddCostCenter(false)}
            >
              إلغاء
            </Button>
            <Button onClick={handleAddCostCenter}>إضافة</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* نافذة تعديل مركز تكلفة */}
      {selectedCostCenter && (
        <Dialog open={showEditCostCenter} onOpenChange={setShowEditCostCenter}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>تعديل مركز التكلفة</DialogTitle>
              <DialogDescription>
                تعديل بيانات مركز التكلفة {selectedCostCenter.name}
              </DialogDescription>
            </DialogHeader>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="edit-name" className="text-sm font-medium">
                  اسم مركز التكلفة *
                </label>
                <Input
                  id="edit-name"
                  name="name"
                  placeholder="أدخل اسم مركز التكلفة"
                  value={selectedCostCenter.name}
                  onChange={handleInputChange}
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="edit-code" className="text-sm font-medium">
                  الكود *
                </label>
                <Input
                  id="edit-code"
                  name="code"
                  placeholder="أدخل كود مركز التكلفة"
                  value={selectedCostCenter.code}
                  onChange={handleInputChange}
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="edit-type" className="text-sm font-medium">
                  النوع *
                </label>
                <Select
                  value={selectedCostCenter.type}
                  onValueChange={(value) => handleSelectChange("type", value)}
                >
                  <SelectTrigger id="edit-type">
                    <SelectValue placeholder="اختر النوع" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="فرع">فرع</SelectItem>
                    <SelectItem value="قسم">قسم</SelectItem>
                    <SelectItem value="مشروع">مشروع</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label htmlFor="edit-manager" className="text-sm font-medium">
                  المدير المسؤول *
                </label>
                <Input
                  id="edit-manager"
                  name="manager"
                  placeholder="أدخل اسم المدير المسؤول"
                  value={selectedCostCenter.manager}
                  onChange={handleInputChange}
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="edit-status" className="text-sm font-medium">
                  الحالة *
                </label>
                <Select
                  value={selectedCostCenter.status}
                  onValueChange={(value) => handleSelectChange("status", value)}
                >
                  <SelectTrigger id="edit-status">
                    <SelectValue placeholder="اختر الحالة" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="نشط">نشط</SelectItem>
                    <SelectItem value="غير نشط">غير نشط</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label htmlFor="edit-phone" className="text-sm font-medium">
                  رقم الهاتف
                </label>
                <Input
                  id="edit-phone"
                  name="phone"
                  placeholder="أدخل رقم الهاتف"
                  value={selectedCostCenter.phone}
                  onChange={handleInputChange}
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="edit-email" className="text-sm font-medium">
                  البريد الإلكتروني
                </label>
                <Input
                  id="edit-email"
                  name="email"
                  placeholder="أدخل البريد الإلكتروني"
                  value={selectedCostCenter.email}
                  onChange={handleInputChange}
                />
              </div>

              <div className="space-y-2 col-span-2">
                <label htmlFor="edit-address" className="text-sm font-medium">
                  العنوان
                </label>
                <Input
                  id="edit-address"
                  name="address"
                  placeholder="أدخل العنوان"
                  value={selectedCostCenter.address}
                  onChange={handleInputChange}
                />
              </div>

              <div className="space-y-2 col-span-2">
                <label
                  htmlFor="edit-description"
                  className="text-sm font-medium"
                >
                  الوصف
                </label>
                <Textarea
                  id="edit-description"
                  name="description"
                  placeholder="أدخل وصف مركز التكلفة"
                  value={selectedCostCenter.description}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setShowEditCostCenter(false)}
              >
                إلغاء
              </Button>
              <Button onClick={handleUpdateCostCenter}>حفظ التغييرات</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* نافذة تأكيد الحذف */}
      {selectedCostCenter && (
        <Dialog open={showDeleteConfirm} onOpenChange={setShowDeleteConfirm}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>تأكيد حذف مركز التكلفة</DialogTitle>
              <DialogDescription>
                هل أنت متأكد من رغبتك في حذف مركز التكلفة{" "}
                {selectedCostCenter.name}؟ لا يمكن التراجع عن هذا الإجراء.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setShowDeleteConfirm(false)}
              >
                إلغاء
              </Button>
              <Button variant="destructive" onClick={handleDeleteCostCenter}>
                حذف
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default CostCenters;
