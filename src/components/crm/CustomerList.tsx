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
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { customers } from "@/data/crmData";
import { Customer } from "@/types/crm";
import CustomerDetails from "./CustomerDetails";

const CustomerList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCity, setSelectedCity] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [showCustomerDetails, setShowCustomerDetails] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(
    null,
  );
  const [showNewCustomerDialog, setShowNewCustomerDialog] = useState(false);

  // Filter customers based on search term, city, status, and category
  const filteredCustomers = customers.filter((customer) => {
    const matchesSearch = searchTerm
      ? customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (customer.phone && customer.phone.includes(searchTerm)) ||
        (customer.email &&
          customer.email.toLowerCase().includes(searchTerm.toLowerCase()))
      : true;

    // Extract city from address (assuming format: "City, Street")
    const customerCity = customer.address
      ? customer.address.split(",")[0].trim()
      : "";
    const matchesCity =
      selectedCity === "all" || customerCity.includes(selectedCity);

    const matchesStatus =
      selectedStatus === "all" || customer.status === selectedStatus;

    const matchesCategory =
      selectedCategory === "all" || customer.category === selectedCategory;

    return matchesSearch && matchesCity && matchesStatus && matchesCategory;
  });

  const handleCustomerClick = (customer: Customer) => {
    setSelectedCustomer(customer);
    setShowCustomerDetails(true);
  };

  // Extract unique cities from customer addresses
  const cities = [
    ...new Set(
      customers
        .map((customer) =>
          customer.address ? customer.address.split(",")[0].trim() : "",
        )
        .filter((city) => city !== ""),
    ),
  ];

  // Extract unique categories
  const categories = [
    ...new Set(customers.map((customer) => customer.category)),
  ];

  return (
    <Card className="p-6 bg-white dark:bg-[#1e1e2d] dark:text-white">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">قائمة العملاء</h2>
        <Button onClick={() => setShowNewCustomerDialog(true)}>
          <Plus className="ml-2 h-4 w-4" />
          عميل جديد
        </Button>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute right-3 top-2.5 h-5 w-5 text-muted-foreground" />
          <Input
            placeholder="بحث باسم العميل، رقم الهاتف، أو البريد الإلكتروني..."
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
                  {category === "new"
                    ? "جديد"
                    : category === "regular"
                      ? "عادي"
                      : category === "vip"
                        ? "VIP"
                        : "غير نشط"}
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
              <TableHead>اسم العميل</TableHead>
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
            {filteredCustomers.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-8">
                  <div className="flex flex-col items-center justify-center text-muted-foreground">
                    <User className="h-12 w-12 mb-2 opacity-20" />
                    <p>لا يوجد عملاء مطابقين للبحث</p>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              filteredCustomers.map((customer) => (
                <TableRow
                  key={customer.id}
                  className="cursor-pointer hover:bg-muted/50"
                  onClick={() => handleCustomerClick(customer)}
                >
                  <TableCell className="font-medium">{customer.name}</TableCell>
                  <TableCell>{customer.phone || "-"}</TableCell>
                  <TableCell>{customer.email || "-"}</TableCell>
                  <TableCell>{customer.address || "-"}</TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 text-xs ${customer.category === "vip" ? "bg-purple-100 text-purple-800" : customer.category === "regular" ? "bg-blue-100 text-blue-800" : customer.category === "new" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"} rounded-full`}
                    >
                      {customer.category === "new"
                        ? "جديد"
                        : customer.category === "regular"
                          ? "عادي"
                          : customer.category === "vip"
                            ? "VIP"
                            : "غير نشط"}
                    </span>
                  </TableCell>
                  <TableCell
                    className={`text-left ${customer.balance > 0 ? "text-green-600" : customer.balance < 0 ? "text-red-600" : ""}`}
                  >
                    {customer.balance.toLocaleString()} ₴
                  </TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 text-xs ${customer.status === "active" ? "bg-green-100 text-green-800" : customer.status === "inactive" ? "bg-amber-100 text-amber-800" : "bg-red-100 text-red-800"} rounded-full`}
                    >
                      {customer.status === "active"
                        ? "نشط"
                        : customer.status === "inactive"
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
                            {customer.status === "active" ? (
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

      {/* Customer Details Dialog */}
      <Dialog open={showCustomerDetails} onOpenChange={setShowCustomerDetails}>
        <DialogContent className="sm:max-w-[900px]">
          <DialogHeader>
            <DialogTitle>تفاصيل العميل</DialogTitle>
          </DialogHeader>
          {selectedCustomer && (
            <CustomerDetails
              customer={selectedCustomer}
              onClose={() => setShowCustomerDetails(false)}
            />
          )}
        </DialogContent>
      </Dialog>

      {/* New Customer Dialog */}
      <Dialog
        open={showNewCustomerDialog}
        onOpenChange={setShowNewCustomerDialog}
      >
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>إضافة عميل جديد</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">اسم العميل</label>
                <Input placeholder="اسم العميل" />
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
                <Input placeholder="الرقم الضريبي (اختياري)" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">فئة العميل</label>
                <select className="w-full h-10 px-3 py-2 rounded-md border border-input bg-background">
                  <option value="new">جديد</option>
                  <option value="regular">عادي</option>
                  <option value="vip">VIP</option>
                </select>
              </div>
              <div className="space-y-2 col-span-2">
                <label className="text-sm font-medium">ملاحظات</label>
                <Input placeholder="ملاحظات (اختياري)" />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-4">
              <Button
                variant="outline"
                onClick={() => setShowNewCustomerDialog(false)}
              >
                إلغاء
              </Button>
              <Button onClick={() => setShowNewCustomerDialog(false)}>
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
          <h3 className="font-medium text-amber-800">تنبيهات العملاء</h3>
        </div>
        <ul className="space-y-2">
          <li className="flex items-center gap-2 text-sm text-amber-700">
            <span className="w-2 h-2 rounded-full bg-red-500"></span>3 عملاء لم
            يتم التواصل معهم منذ أكثر من 30 يوم
          </li>
          <li className="flex items-center gap-2 text-sm text-amber-700">
            <span className="w-2 h-2 rounded-full bg-amber-500"></span>5 عملاء
            لديهم طلبات معلقة
          </li>
          <li className="flex items-center gap-2 text-sm text-amber-700">
            <span className="w-2 h-2 rounded-full bg-blue-500"></span>8 عملاء
            جدد تم تسجيلهم هذا الشهر
          </li>
        </ul>
      </div>
    </Card>
  );
};

export default CustomerList;
