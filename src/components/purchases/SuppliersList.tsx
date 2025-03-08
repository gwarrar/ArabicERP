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
  Search,
  Plus,
  Filter,
  FileText,
  Download,
  Printer,
  MoreHorizontal,
  MapPin,
  User,
  Phone,
  Mail,
  AlertCircle,
  Edit,
  Ban,
  CheckCircle,
  Star,
  ShoppingCart,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { suppliers } from "@/data/purchasesData";
import SimplifiedSupplierDetails from "./SimplifiedSupplierDetails";

const SuppliersList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCity, setSelectedCity] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [showSupplierDetails, setShowSupplierDetails] = useState(false);
  const [selectedSupplier, setSelectedSupplier] = useState<any>(null);
  const [showNewSupplierDialog, setShowNewSupplierDialog] = useState(false);

  // Filter suppliers based on search term, city, status, and category
  const filteredSuppliers = suppliers.filter((supplier) => {
    const matchesSearch = searchTerm
      ? supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        supplier.phone.includes(searchTerm) ||
        supplier.email.toLowerCase().includes(searchTerm.toLowerCase())
      : true;

    // Extract city from address (assuming format: "City, Street")
    const supplierCity = supplier.address
      ? supplier.address.split(",")[0].trim()
      : "";
    const matchesCity =
      selectedCity === "all" || supplierCity.includes(selectedCity);

    const matchesStatus =
      selectedStatus === "all" || supplier.status === selectedStatus;

    const matchesCategory =
      selectedCategory === "all" || supplier.category === selectedCategory;

    return matchesSearch && matchesCity && matchesStatus && matchesCategory;
  });

  const handleSupplierClick = (supplier: any) => {
    if (supplier) {
      setSelectedSupplier({ ...supplier });
      setShowSupplierDetails(true);
    }
  };

  // Extract unique cities from supplier addresses
  const cities = [
    ...new Set(
      suppliers
        .map((supplier) =>
          supplier.address ? supplier.address.split(",")[0].trim() : "",
        )
        .filter((city) => city !== ""),
    ),
  ];

  // Extract unique categories
  const categories = [
    ...new Set(suppliers.map((supplier) => supplier.category)),
  ];

  return (
    <Card className="p-6 bg-white dark:bg-[#1e1e2d] dark:text-white">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">قائمة الموردين</h2>
        <Button onClick={() => setShowNewSupplierDialog(true)}>
          <Plus className="ml-2 h-4 w-4" />
          مورد جديد
        </Button>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute right-3 top-2.5 h-5 w-5 text-muted-foreground" />
          <Input
            placeholder="بحث باسم المورد، رقم الهاتف، أو البريد الإلكتروني..."
            className="pr-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex flex-wrap gap-2">
          <div className="flex items-center gap-1 bg-background border rounded-md px-3 py-1">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            <select
              className="bg-transparent border-none text-sm focus:outline-none"
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
            >
              <option value="all">جميع المدن</option>
              {cities.map((city, index) => (
                <option key={index} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-1 bg-background border rounded-md px-3 py-1">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <select
              className="bg-transparent border-none text-sm focus:outline-none"
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
            >
              <option value="all">جميع الحالات</option>
              <option value="active">نشط</option>
              <option value="inactive">غير نشط</option>
              <option value="blocked">محظور</option>
            </select>
          </div>

          <div className="flex items-center gap-1 bg-background border rounded-md px-3 py-1">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <select
              className="bg-transparent border-none text-sm focus:outline-none"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="all">جميع الفئات</option>
              {categories.map((category, index) => (
                <option key={index} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          <Button variant="outline">
            <Download className="ml-1 h-4 w-4" />
            تصدير
          </Button>

          <Button variant="outline">
            <Printer className="ml-1 h-4 w-4" />
            طباعة
          </Button>
        </div>
      </div>

      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>اسم المورد</TableHead>
              <TableHead>رقم الهاتف</TableHead>
              <TableHead>البريد الإلكتروني</TableHead>
              <TableHead>العنوان</TableHead>
              <TableHead>الفئة</TableHead>
              <TableHead className="text-left">الرصيد الحالي</TableHead>
              <TableHead>الحالة</TableHead>
              <TableHead className="text-left">الإجراءات</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredSuppliers.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-8">
                  <div className="flex flex-col items-center justify-center text-muted-foreground">
                    <User className="h-12 w-12 mb-2 opacity-20" />
                    <p>لا يوجد موردين مطابقين للبحث</p>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              filteredSuppliers.map((supplier) => (
                <TableRow
                  key={supplier.id}
                  className="cursor-pointer hover:bg-muted/50"
                  onClick={() => handleSupplierClick(supplier)}
                >
                  <TableCell className="font-medium">{supplier.name}</TableCell>
                  <TableCell>{supplier.phone}</TableCell>
                  <TableCell>{supplier.email}</TableCell>
                  <TableCell>{supplier.address}</TableCell>
                  <TableCell>{supplier.category}</TableCell>
                  <TableCell
                    className={`text-left ${supplier.balance < 0 ? "text-red-600" : supplier.balance > 0 ? "text-green-600" : ""}`}
                  >
                    {Math.abs(supplier.balance).toLocaleString()} ₴
                    {supplier.balance < 0
                      ? " (مستحق للمورد)"
                      : supplier.balance > 0
                        ? " (مستحق على المورد)"
                        : ""}
                  </TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 text-xs ${supplier.status === "active" ? "bg-green-100 text-green-800" : supplier.status === "inactive" ? "bg-amber-100 text-amber-800" : "bg-red-100 text-red-800"} rounded-full`}
                    >
                      {supplier.status === "active"
                        ? "نشط"
                        : supplier.status === "inactive"
                          ? "غير نشط"
                          : "محظور"}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div
                      className="flex items-center gap-2"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Button variant="ghost" size="icon">
                        <Phone className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Mail className="h-4 w-4" />
                      </Button>
                      <div className="relative">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Edit className="mr-2 h-4 w-4" />
                              تعديل
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <ShoppingCart className="mr-2 h-4 w-4" />
                              طلب شراء جديد
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Star className="mr-2 h-4 w-4" />
                              تقييم المورد
                            </DropdownMenuItem>
                            {supplier.status === "active" ? (
                              <DropdownMenuItem className="text-red-600">
                                <Ban className="mr-2 h-4 w-4" />
                                تعطيل
                              </DropdownMenuItem>
                            ) : (
                              <DropdownMenuItem className="text-green-600">
                                <CheckCircle className="mr-2 h-4 w-4" />
                                تفعيل
                              </DropdownMenuItem>
                            )}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Supplier Details Dialog */}
      <Dialog open={showSupplierDetails} onOpenChange={setShowSupplierDetails}>
        <DialogContent className="sm:max-w-[800px]">
          <DialogHeader>
            <DialogTitle>تفاصيل المورد</DialogTitle>
          </DialogHeader>
          {selectedSupplier ? (
            <SimplifiedSupplierDetails supplier={selectedSupplier} />
          ) : (
            <div className="py-8 text-center text-muted-foreground">
              لا توجد بيانات للمورد المحدد
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* New Supplier Dialog */}
      <Dialog
        open={showNewSupplierDialog}
        onOpenChange={setShowNewSupplierDialog}
      >
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>إضافة مورد جديد</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">اسم المورد</label>
                <Input placeholder="اسم المورد" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">رقم الهاتف</label>
                <Input placeholder="رقم الهاتف" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">البريد الإلكتروني</label>
                <Input placeholder="البريد الإلكتروني" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">العنوان</label>
                <Input placeholder="العنوان" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">الرقم الضريبي</label>
                <Input placeholder="الرقم الضريبي" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">فئة المورد</label>
                <select className="w-full h-10 px-3 py-2 rounded-md border border-input bg-background">
                  <option value="">اختر الفئة</option>
                  {categories.map((category, index) => (
                    <option key={index} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">حد الائتمان</label>
                <Input type="number" placeholder="حد الائتمان" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">
                  فترة السداد (بالأيام)
                </label>
                <Input type="number" placeholder="فترة السداد" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">جهة الاتصال</label>
                <Input placeholder="اسم جهة الاتصال" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">ملاحظات</label>
                <Input placeholder="ملاحظات" />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-4">
              <Button
                variant="outline"
                onClick={() => setShowNewSupplierDialog(false)}
              >
                إلغاء
              </Button>
              <Button onClick={() => setShowNewSupplierDialog(false)}>
                حفظ
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Alerts Section */}
      <div className="mt-6 border rounded-lg p-4 bg-amber-50">
        <div className="flex items-center gap-2 mb-2">
          <AlertCircle className="h-5 w-5 text-amber-600" />
          <h3 className="font-medium text-amber-800">تنبيهات الموردين</h3>
        </div>
        <ul className="space-y-2">
          <li className="flex items-center gap-2 text-sm text-amber-700">
            <span className="w-2 h-2 rounded-full bg-red-500"></span>2 موردين
            تجاوزوا حد الائتمان المسموح
          </li>
          <li className="flex items-center gap-2 text-sm text-amber-700">
            <span className="w-2 h-2 rounded-full bg-amber-500"></span>3 موردين
            لديهم فواتير متأخرة السداد
          </li>
          <li className="flex items-center gap-2 text-sm text-amber-700">
            <span className="w-2 h-2 rounded-full bg-blue-500"></span>5 موردين
            بحاجة إلى تقييم
          </li>
        </ul>
      </div>
    </Card>
  );
};

export default SuppliersList;
