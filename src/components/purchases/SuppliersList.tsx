import React, { useState } from "react";
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
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Search,
  Plus,
  Filter,
  Download,
  MoreHorizontal,
  Edit,
  Trash2,
  ExternalLink,
  Mail,
  Phone,
  MapPin,
  Globe,
  User,
  Package,
  DollarSign,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import SupplierDetails from "./SupplierDetails";

const SuppliersList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showSupplierDetails, setShowSupplierDetails] = useState(false);
  const [selectedSupplier, setSelectedSupplier] = useState<any>(null);

  // بيانات تجريبية للموردين
  const suppliers = [
    {
      id: "SUP-001",
      name: "شركة الصين للملابس",
      contactPerson: "لي وانغ",
      email: "contact@chinafashion.com",
      phone: "+86 123 4567 8901",
      address: "شنغهاي، الصين",
      country: "الصين",
      city: "شنغهاي",
      status: "active",
      balance: 0,
      lastOrderDate: "2023-12-15",
      totalOrders: 12,
      website: "www.chinafashion.com",
      paymentTerms: "30 يوم",
    },
    {
      id: "SUP-002",
      name: "شركة الأحذية العالمية",
      contactPerson: "أحمد محمود",
      email: "info@globalshoes.com",
      phone: "+90 532 123 4567",
      address: "إسطنبول، تركيا",
      country: "تركيا",
      city: "إسطنبول",
      status: "active",
      balance: 15000,
      lastOrderDate: "2023-11-20",
      totalOrders: 8,
      website: "www.globalshoes.com",
      paymentTerms: "45 يوم",
    },
    {
      id: "SUP-003",
      name: "شركة الإكسسوارات الفاخرة",
      contactPerson: "ماركو روسي",
      email: "marco@luxaccessories.com",
      phone: "+39 02 1234 5678",
      address: "ميلانو، إيطاليا",
      country: "إيطاليا",
      city: "ميلانو",
      status: "active",
      balance: 8500,
      lastOrderDate: "2023-12-05",
      totalOrders: 5,
      website: "www.luxaccessories.com",
      paymentTerms: "30 يوم",
    },
    {
      id: "SUP-004",
      name: "شركة الأقمشة العالمية",
      contactPerson: "راجيش باتيل",
      email: "info@globalfabrics.com",
      phone: "+91 98765 43210",
      address: "مومباي، الهند",
      country: "الهند",
      city: "مومباي",
      status: "inactive",
      balance: 0,
      lastOrderDate: "2023-09-10",
      totalOrders: 3,
      website: "www.globalfabrics.com",
      paymentTerms: "60 يوم",
    },
    {
      id: "SUP-005",
      name: "شركة المواد الخام",
      contactPerson: "جون سميث",
      email: "john@rawmaterials.com",
      phone: "+1 555 123 4567",
      address: "نيويورك، الولايات المتحدة",
      country: "الولايات المتحدة",
      city: "نيويورك",
      status: "active",
      balance: 22000,
      lastOrderDate: "2023-12-18",
      totalOrders: 7,
      website: "www.rawmaterials.com",
      paymentTerms: "15 يوم",
    },
  ];

  // تصفية الموردين حسب البحث
  const filteredSuppliers = suppliers.filter((supplier) => {
    if (searchTerm === "") return true;

    // البحث في الاسم والبريد الإلكتروني ورقم الهاتف والعنوان
    return (
      supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      supplier.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      supplier.phone.includes(searchTerm) ||
      supplier.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
      supplier.id.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  // عرض تفاصيل المورد
  const handleViewSupplier = (supplier: any) => {
    setSelectedSupplier(supplier);
    setShowSupplierDetails(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">قائمة الموردين</h2>
        <Button>
          <Plus className="h-4 w-4 ml-2" />
          مورد جديد
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-blue-50 border-blue-100">
          <CardHeader className="pb-2">
            <CardTitle className="text-base text-blue-700 flex justify-between items-center">
              <span>إجمالي الموردين</span>
              <User className="h-5 w-5 text-blue-600" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-800">
              {suppliers.length}
            </div>
            <p className="text-sm text-blue-600 mt-1">مورد</p>
          </CardContent>
        </Card>

        <Card className="bg-green-50 border-green-100">
          <CardHeader className="pb-2">
            <CardTitle className="text-base text-green-700 flex justify-between items-center">
              <span>الموردين النشطين</span>
              <User className="h-5 w-5 text-green-600" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-800">
              {suppliers.filter((s) => s.status === "active").length}
            </div>
            <p className="text-sm text-green-600 mt-1">مورد نشط</p>
          </CardContent>
        </Card>

        <Card className="bg-amber-50 border-amber-100">
          <CardHeader className="pb-2">
            <CardTitle className="text-base text-amber-700 flex justify-between items-center">
              <span>إجمالي الطلبات</span>
              <Package className="h-5 w-5 text-amber-600" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-800">
              {suppliers.reduce((sum, s) => sum + s.totalOrders, 0)}
            </div>
            <p className="text-sm text-amber-600 mt-1">طلب</p>
          </CardContent>
        </Card>

        <Card className="bg-purple-50 border-purple-100">
          <CardHeader className="pb-2">
            <CardTitle className="text-base text-purple-700 flex justify-between items-center">
              <span>الرصيد المستحق</span>
              <DollarSign className="h-5 w-5 text-purple-600" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-800">
              {suppliers
                .reduce((sum, s) => sum + s.balance, 0)
                .toLocaleString()}{" "}
              ₴
            </div>
            <p className="text-sm text-purple-600 mt-1">مستحق للموردين</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="pb-2">
          <div className="flex justify-between items-center">
            <CardTitle className="text-lg">الموردين</CardTitle>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="بحث..."
                  className="w-[250px] pr-9"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon">
                <Download className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">رقم المورد</TableHead>
                  <TableHead>اسم المورد</TableHead>
                  <TableHead>جهة الاتصال</TableHead>
                  <TableHead>البريد الإلكتروني</TableHead>
                  <TableHead>رقم الهاتف</TableHead>
                  <TableHead>البلد</TableHead>
                  <TableHead className="text-center">الحالة</TableHead>
                  <TableHead className="text-center">الرصيد</TableHead>
                  <TableHead className="text-left">الإجراءات</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredSuppliers.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={9}
                      className="h-24 text-center text-muted-foreground"
                    >
                      لا توجد نتائج مطابقة للبحث
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredSuppliers.map((supplier) => (
                    <TableRow
                      key={supplier.id}
                      className="cursor-pointer hover:bg-muted/30"
                      onClick={() => handleViewSupplier(supplier)}
                    >
                      <TableCell className="font-medium">
                        {supplier.id}
                      </TableCell>
                      <TableCell>{supplier.name}</TableCell>
                      <TableCell>{supplier.contactPerson}</TableCell>
                      <TableCell>{supplier.email}</TableCell>
                      <TableCell dir="ltr">{supplier.phone}</TableCell>
                      <TableCell>{supplier.country}</TableCell>
                      <TableCell className="text-center">
                        <Badge
                          className={
                            supplier.status === "active"
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }
                        >
                          {supplier.status === "active" ? "نشط" : "غير نشط"}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-center">
                        {supplier.balance > 0
                          ? supplier.balance.toLocaleString() + " ₴"
                          : "-"}
                      </TableCell>
                      <TableCell>
                        <div
                          className="flex items-center justify-end gap-2"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            title="عرض التفاصيل"
                            onClick={() => handleViewSupplier(supplier)}
                          >
                            <ExternalLink className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            title="تعديل"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8"
                              >
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>خيارات</DropdownMenuLabel>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem>
                                <Mail className="h-4 w-4 ml-2" />
                                إرسال بريد إلكتروني
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Phone className="h-4 w-4 ml-2" />
                                اتصال
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <MapPin className="h-4 w-4 ml-2" />
                                عرض العنوان
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Globe className="h-4 w-4 ml-2" />
                                زيارة الموقع
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-red-600">
                                <Trash2 className="h-4 w-4 ml-2" />
                                حذف
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* نافذة تفاصيل المورد */}
      {selectedSupplier && (
        <SupplierDetails
          open={showSupplierDetails}
          onClose={() => setShowSupplierDetails(false)}
          supplier={selectedSupplier}
        />
      )}
    </div>
  );
};

export default SuppliersList;
