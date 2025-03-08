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
import { ukrainianBranches } from "@/data/branches";
import { customers } from "@/data/salesData";
import { CustomerDetails } from "./CustomerDetails";

const CustomerList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCity, setSelectedCity] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedBalanceType, setSelectedBalanceType] = useState("all");
  const [showCustomerDetails, setShowCustomerDetails] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<any>(null);
  const [showNewCustomerDialog, setShowNewCustomerDialog] = useState(false);

  // Filter customers based on search term, city, status, and balance type
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

    const matchesBalanceType =
      selectedBalanceType === "all" ||
      (selectedBalanceType === "credit" && customer.balance > 0) ||
      (selectedBalanceType === "debit" && customer.balance < 0) ||
      (selectedBalanceType === "zero" && customer.balance === 0);

    return matchesSearch && matchesCity && matchesStatus && matchesBalanceType;
  });

  const handleCustomerClick = (customer: any) => {
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
            </select>
          </div>

          <div className="flex items-center gap-1 bg-background border rounded-md px-3 py-1">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <select
              className="bg-transparent border-none text-sm focus:outline-none"
              value={selectedBalanceType}
              onChange={(e) => setSelectedBalanceType(e.target.value)}
            >
              <option value="all">جميع الأرصدة</option>
              <option value="credit">دائن</option>
              <option value="debit">مدين</option>
              <option value="zero">متوازن</option>
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
              <TableHead className="text-left">الرصيد الحالي</TableHead>
              <TableHead>تاريخ آخر معاملة</TableHead>
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
                  <TableCell
                    className={`text-left ${customer.balance > 0 ? "text-green-600" : customer.balance < 0 ? "text-red-600" : ""}`}
                  >
                    {customer.balance.toLocaleString()} ₴
                  </TableCell>
                  <TableCell>{customer.lastOrder || "-"}</TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 text-xs ${customer.status === "active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"} rounded-full`}
                    >
                      {customer.status === "active" ? "نشط" : "غير نشط"}
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
        <DialogContent className="sm:max-w-[800px]">
          <DialogHeader>
            <DialogTitle>تفاصيل العميل</DialogTitle>
          </DialogHeader>
          {selectedCustomer && <CustomerDetails customer={selectedCustomer} />}
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
                  <option value="regular">عادي</option>
                  <option value="vip">VIP</option>
                  <option value="new">جديد</option>
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
            <span className="w-2 h-2 rounded-full bg-red-500"></span>3 عملاء
            تجاوزوا حد الائتمان المسموح
          </li>
          <li className="flex items-center gap-2 text-sm text-amber-700">
            <span className="w-2 h-2 rounded-full bg-amber-500"></span>5 عملاء
            تجاوزوا فترة السداد
          </li>
          <li className="flex items-center gap-2 text-sm text-amber-700">
            <span className="w-2 h-2 rounded-full bg-blue-500"></span>8 عملاء
            غير نشطين منذ أكثر من 3 أشهر
          </li>
        </ul>
      </div>
    </Card>
  );
};

export default CustomerList;
