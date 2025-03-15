import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Package,
  Warehouse,
  TrendingUp,
  AlertTriangle,
  Search,
  Filter,
  Edit,
} from "lucide-react";

interface ProductDetailsProps {
  open: boolean;
  onClose: () => void;
  product: any;
}

const ProductDetails: React.FC<ProductDetailsProps> = ({
  open,
  onClose,
  product,
}) => {
  const [activeTab, setActiveTab] = useState("summary");
  const [cityFilter, setCityFilter] = useState("all");
  const [currencyFilter, setCurrencyFilter] = useState("uah");
  const [dateFilter, setDateFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  // Sample data for warehouse quantities
  const warehouseQuantities = [
    {
      id: "WH-001",
      name: "المستودع الرئيسي",
      city: "كييف",
      quantity: 100,
      minQuantity: 20,
      status: "متوفر",
    },
    {
      id: "WH-002",
      name: "مستودع المواد الخام",
      city: "خاركيف",
      quantity: 50,
      minQuantity: 15,
      status: "متوفر",
    },
    {
      id: "WH-003",
      name: "مستودع الفرع الغربي",
      city: "لفيف",
      quantity: 10,
      minQuantity: 15,
      status: "منخفض",
    },
  ];

  // Sample data for product movements
  const productMovements = [
    {
      id: "MOV-001",
      date: "2024-07-20",
      type: "استلام",
      document: "PO-2024-001",
      warehouse: "المستودع الرئيسي",
      city: "كييف",
      quantity: 50,
      balance: 150,
      currency: "UAH",
      user: "أحمد محمد",
    },
    {
      id: "MOV-002",
      date: "2024-07-18",
      type: "صرف",
      document: "SO-2024-005",
      warehouse: "المستودع الرئيسي",
      city: "كييف",
      quantity: -20,
      balance: 100,
      currency: "UAH",
      user: "سارة خالد",
    },
    {
      id: "MOV-003",
      date: "2024-07-15",
      type: "تحويل",
      document: "TR-2024-002",
      warehouse: "مستودع المواد الخام",
      city: "خاركيف",
      quantity: 30,
      balance: 50,
      currency: "UAH",
      user: "محمد علي",
    },
    {
      id: "MOV-004",
      date: "2024-07-10",
      type: "استلام",
      document: "PO-2024-002",
      warehouse: "مستودع الفرع الغربي",
      city: "لفيف",
      quantity: 15,
      balance: 15,
      currency: "USD",
      user: "أحمد محمد",
    },
    {
      id: "MOV-005",
      date: "2024-07-05",
      type: "صرف",
      document: "SO-2024-010",
      warehouse: "مستودع الفرع الغربي",
      city: "لفيف",
      quantity: -5,
      balance: 10,
      currency: "USD",
      user: "سارة خالد",
    },
  ];

  // Filter product movements based on selected filters
  const filteredMovements = productMovements.filter((movement) => {
    const matchesCity = cityFilter === "all" || movement.city === cityFilter;
    const matchesCurrency =
      currencyFilter === "all" ||
      movement.currency.toLowerCase() === currencyFilter;
    const matchesSearch =
      searchTerm === "" ||
      movement.document.toLowerCase().includes(searchTerm.toLowerCase()) ||
      movement.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      movement.warehouse.toLowerCase().includes(searchTerm.toLowerCase());
    // Add date filtering logic if needed
    const matchesDate = dateFilter === "all" || true;

    return matchesCity && matchesCurrency && matchesSearch && matchesDate;
  });

  // Get unique cities and currencies for filters
  const cities = ["all", ...new Set(productMovements.map((m) => m.city))];
  const currencies = [
    "all",
    ...new Set(productMovements.map((m) => m.currency.toLowerCase())),
  ];

  // Calculate total quantity across all warehouses
  const totalQuantity = warehouseQuantities.reduce(
    (sum, wh) => sum + wh.quantity,
    0,
  );

  // Calculate low stock warehouses
  const lowStockWarehouses = warehouseQuantities.filter(
    (wh) => wh.quantity < wh.minQuantity,
  ).length;

  if (!product) return null;

  return (
    <Dialog open={open} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold flex justify-between items-center">
            <span>{product.name}</span>
            <span className="text-sm font-normal text-muted-foreground">
              رمز المنتج: {product.sku}
            </span>
          </DialogTitle>
        </DialogHeader>

        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full mt-4"
        >
          <TabsList className="mb-6 w-full justify-start bg-gray-100 dark:bg-gray-800 p-1 rounded-lg">
            <TabsTrigger value="summary">
              <Package className="h-4 w-4 ml-2" />
              ملخص المنتج
            </TabsTrigger>
            <TabsTrigger value="warehouses">
              <Warehouse className="h-4 w-4 ml-2" />
              المستودعات
            </TabsTrigger>
            <TabsTrigger value="movements">
              <TrendingUp className="h-4 w-4 ml-2" />
              حركة المادة
            </TabsTrigger>
          </TabsList>

          {/* Summary Tab */}
          <TabsContent value="summary" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader className="pb-2 pt-4">
                  <CardTitle className="text-sm font-bold text-gray-800 dark:text-gray-200">
                    تفاصيل المنتج
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500 dark:text-gray-400">
                      الفئة:
                    </span>
                    <span>{product.category}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500 dark:text-gray-400">
                      وحدة القياس:
                    </span>
                    <span>{product.unit}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500 dark:text-gray-400">
                      الحالة:
                    </span>
                    <span
                      className={`px-2 py-0.5 text-xs ${product.status === "active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"} rounded-full`}
                    >
                      {product.status === "active" ? "نشط" : "غير نشط"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500 dark:text-gray-400">
                      الوصف:
                    </span>
                    <span className="truncate max-w-[200px]">
                      {product.description}
                    </span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2 pt-4">
                  <CardTitle className="text-sm font-bold text-gray-800 dark:text-gray-200">
                    ملخص المخزون
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500 dark:text-gray-400">
                      إجمالي المخزون:
                    </span>
                    <span className="font-medium">{totalQuantity}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500 dark:text-gray-400">
                      الحد الأدنى للمخزون:
                    </span>
                    <span>{product.minStock}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500 dark:text-gray-400">
                      عدد المستودعات:
                    </span>
                    <span>{warehouseQuantities.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500 dark:text-gray-400">
                      مستودعات منخفضة المخزون:
                    </span>
                    <span
                      className={`${lowStockWarehouses > 0 ? "text-red-600 font-medium" : ""}`}
                    >
                      {lowStockWarehouses}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="mt-4">
              <CardHeader className="pb-2 pt-4">
                <CardTitle className="text-sm font-bold text-gray-800 dark:text-gray-200">
                  آخر الحركات
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <Table className="border-collapse">
                  <TableHeader className="bg-gray-50 dark:bg-gray-800">
                    <TableRow>
                      <TableHead>التاريخ</TableHead>
                      <TableHead>النوع</TableHead>
                      <TableHead>المستند</TableHead>
                      <TableHead>المستودع</TableHead>
                      <TableHead>الكمية</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {productMovements.slice(0, 3).map((movement) => (
                      <TableRow key={movement.id}>
                        <TableCell>{movement.date}</TableCell>
                        <TableCell>
                          <span
                            className={`px-2 py-0.5 text-xs ${movement.type === "استلام" ? "bg-green-100 text-green-800" : movement.type === "صرف" ? "bg-red-100 text-red-800" : "bg-blue-100 text-blue-800"} rounded-full`}
                          >
                            {movement.type}
                          </span>
                        </TableCell>
                        <TableCell>{movement.document}</TableCell>
                        <TableCell>{movement.warehouse}</TableCell>
                        <TableCell
                          className={`${movement.quantity > 0 ? "text-green-600" : "text-red-600"} font-medium`}
                        >
                          {movement.quantity > 0
                            ? `+${movement.quantity}`
                            : movement.quantity}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Warehouses Tab */}
          <TabsContent value="warehouses" className="mt-0">
            <Card>
              <CardHeader className="pb-2 pt-4">
                <CardTitle className="text-sm font-bold text-gray-800 dark:text-gray-200 flex items-center">
                  <Warehouse className="h-4 w-4 ml-2" />
                  الكميات في المستودعات
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <Table className="border-collapse">
                  <TableHeader className="bg-gray-50 dark:bg-gray-800">
                    <TableRow>
                      <TableHead>رمز المستودع</TableHead>
                      <TableHead>اسم المستودع</TableHead>
                      <TableHead>المدينة</TableHead>
                      <TableHead>الكمية</TableHead>
                      <TableHead>الحد الأدنى</TableHead>
                      <TableHead>الحالة</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {warehouseQuantities.map((warehouse) => (
                      <TableRow key={warehouse.id}>
                        <TableCell>{warehouse.id}</TableCell>
                        <TableCell>{warehouse.name}</TableCell>
                        <TableCell>{warehouse.city}</TableCell>
                        <TableCell
                          className={`${warehouse.quantity < warehouse.minQuantity ? "text-red-600 font-medium" : ""}`}
                        >
                          {warehouse.quantity}
                        </TableCell>
                        <TableCell>{warehouse.minQuantity}</TableCell>
                        <TableCell>
                          <span
                            className={`px-2 py-0.5 text-xs ${warehouse.status === "متوفر" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"} rounded-full`}
                          >
                            {warehouse.status}
                          </span>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            <div className="mt-4 flex items-center justify-between">
              <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                <AlertTriangle className="h-4 w-4 ml-1 text-amber-500" />
                المستودعات التي تظهر باللون الأحمر تحتاج إلى إعادة تعبئة
              </div>
              <div className="text-sm">
                إجمالي الكمية:{" "}
                <span className="font-medium">{totalQuantity}</span>
              </div>
            </div>
          </TabsContent>

          {/* Movements Tab */}
          <TabsContent value="movements" className="mt-0">
            <div className="flex flex-wrap gap-2 mb-4">
              <div className="relative">
                <Search className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="بحث..."
                  className="w-[200px] pr-9"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <Select value={cityFilter} onValueChange={setCityFilter}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="المدينة" />
                </SelectTrigger>
                <SelectContent>
                  {cities.map((city) => (
                    <SelectItem key={city} value={city}>
                      {city === "all" ? "جميع المدن" : city}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={currencyFilter} onValueChange={setCurrencyFilter}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="العملة" />
                </SelectTrigger>
                <SelectContent>
                  {currencies.map((currency) => (
                    <SelectItem key={currency} value={currency}>
                      {currency === "all"
                        ? "جميع العملات"
                        : currency.toUpperCase()}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={dateFilter} onValueChange={setDateFilter}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="الفترة" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">جميع الفترات</SelectItem>
                  <SelectItem value="today">اليوم</SelectItem>
                  <SelectItem value="week">هذا الأسبوع</SelectItem>
                  <SelectItem value="month">هذا الشهر</SelectItem>
                  <SelectItem value="year">هذا العام</SelectItem>
                </SelectContent>
              </Select>

              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setSearchTerm("");
                  setCityFilter("all");
                  setCurrencyFilter("all");
                  setDateFilter("all");
                }}
                className="h-10"
              >
                <Filter className="h-4 w-4 ml-1" />
                إعادة ضبط
              </Button>
            </div>

            <Card>
              <CardContent className="p-0">
                <Table className="border-collapse">
                  <TableHeader className="bg-gray-50 dark:bg-gray-800">
                    <TableRow>
                      <TableHead>التاريخ</TableHead>
                      <TableHead>النوع</TableHead>
                      <TableHead>المستند</TableHead>
                      <TableHead>المستودع</TableHead>
                      <TableHead>المدينة</TableHead>
                      <TableHead>الكمية</TableHead>
                      <TableHead>الرصيد</TableHead>
                      <TableHead>العملة</TableHead>
                      <TableHead>المستخدم</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredMovements.length > 0 ? (
                      filteredMovements.map((movement) => (
                        <TableRow key={movement.id}>
                          <TableCell>{movement.date}</TableCell>
                          <TableCell>
                            <span
                              className={`px-2 py-0.5 text-xs ${movement.type === "استلام" ? "bg-green-100 text-green-800" : movement.type === "صرف" ? "bg-red-100 text-red-800" : "bg-blue-100 text-blue-800"} rounded-full`}
                            >
                              {movement.type}
                            </span>
                          </TableCell>
                          <TableCell>{movement.document}</TableCell>
                          <TableCell>{movement.warehouse}</TableCell>
                          <TableCell>{movement.city}</TableCell>
                          <TableCell
                            className={`${movement.quantity > 0 ? "text-green-600" : "text-red-600"} font-medium`}
                          >
                            {movement.quantity > 0
                              ? `+${movement.quantity}`
                              : movement.quantity}
                          </TableCell>
                          <TableCell>{movement.balance}</TableCell>
                          <TableCell>{movement.currency}</TableCell>
                          <TableCell>{movement.user}</TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell
                          colSpan={9}
                          className="h-24 text-center text-muted-foreground"
                        >
                          لا توجد نتائج مطابقة للبحث
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end gap-2 mt-6">
          <Button variant="outline" onClick={onClose}>
            إغلاق
          </Button>
          <Button variant="outline">
            <Edit className="ml-2 h-4 w-4" />
            تعديل
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProductDetails;
