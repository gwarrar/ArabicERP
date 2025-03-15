import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
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
import {
  Search,
  Filter,
  X,
  ArrowUpCircle,
  ArrowDownCircle,
  CreditCard,
  BarChart2,
  Truck,
  Users,
} from "lucide-react";
import CustomerSupplierQuickView from "@/components/layout/CustomerSupplierQuickView";
import StatusBadge from "./StatusBadge";
import { customersData, suppliersData } from "@/data/customers-suppliers";
import {
  formatDate,
  formatCurrency,
  getBalanceTextClass,
} from "@/utils/formatters";
import { Customer, Supplier } from "@/types/customer-supplier";

interface CustomerSupplierPopupProps {
  open: boolean;
  onClose: () => void;
}

const CustomerSupplierPopup: React.FC<CustomerSupplierPopupProps> = ({
  open,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState("customers");
  const [searchTerm, setSearchTerm] = useState("");
  const [cityFilter, setCityFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [balanceTypeFilter, setBalanceTypeFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [selectedItem, setSelectedItem] = useState<Customer | Supplier | null>(
    null,
  );
  const [detailsOpen, setDetailsOpen] = useState(false);

  // Get unique cities and categories (memoized)
  const {
    customerCities,
    supplierCities,
    customerCategories,
    supplierCategories,
  } = React.useMemo(() => {
    return {
      customerCities: [...new Set(customersData.map((c) => c.city))],
      supplierCities: [...new Set(suppliersData.map((s) => s.city))],
      customerCategories: [...new Set(customersData.map((c) => c.category))],
      supplierCategories: [...new Set(suppliersData.map((s) => s.category))],
    };
  }, []);

  // Filter customers (memoized)
  const filteredCustomers = React.useMemo(() => {
    return customersData.filter((customer) => {
      const matchesSearch = customer.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesCity = cityFilter === "all" || customer.city === cityFilter;
      const matchesStatus =
        statusFilter === "all" || customer.status === statusFilter;
      const matchesBalanceType =
        balanceTypeFilter === "all" ||
        customer.balanceType === balanceTypeFilter;
      const matchesCategory =
        categoryFilter === "all" || customer.category === categoryFilter;

      return (
        matchesSearch &&
        matchesCity &&
        matchesStatus &&
        matchesBalanceType &&
        matchesCategory
      );
    });
  }, [searchTerm, cityFilter, statusFilter, balanceTypeFilter, categoryFilter]);

  // Filter suppliers (memoized)
  const filteredSuppliers = React.useMemo(() => {
    return suppliersData.filter((supplier) => {
      const matchesSearch = supplier.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesCity = cityFilter === "all" || supplier.city === cityFilter;
      const matchesStatus =
        statusFilter === "all" || supplier.status === statusFilter;
      const matchesCategory =
        categoryFilter === "all" || supplier.category === categoryFilter;

      return matchesSearch && matchesCity && matchesStatus && matchesCategory;
    });
  }, [searchTerm, cityFilter, statusFilter, categoryFilter]);

  // Calculate summary statistics (memoized)
  const summaryStats = React.useMemo(() => {
    const customerReceivables = customersData.reduce(
      (sum, customer) =>
        sum + (customer.balanceType === "دائن" ? customer.balance : 0),
      0,
    );

    const customerDebts = customersData.reduce(
      (sum, customer) =>
        sum + (customer.balanceType === "مدين" ? customer.balance : 0),
      0,
    );

    const supplierTotal = suppliersData.reduce(
      (sum, supplier) => sum + supplier.balance,
      0,
    );

    const supplierAvg = Math.round(supplierTotal / suppliersData.length);

    return {
      customerReceivables,
      customerDebts,
      supplierTotal,
      supplierAvg,
    };
  }, []);

  const handleItemClick = (item: Customer | Supplier) => {
    setSelectedItem(item);
    setDetailsOpen(true);
  };

  const resetFilters = () => {
    setSearchTerm("");
    setCityFilter("all");
    setStatusFilter("all");
    setBalanceTypeFilter("all");
    setCategoryFilter("all");
  };

  // Render summary cards based on active tab
  const renderSummaryCards = () => {
    if (activeTab === "customers") {
      return (
        <>
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-blue-700">إجمالي الزبائن</p>
                <h3 className="text-xl font-bold text-blue-800 mt-1">
                  {customersData.length}
                </h3>
              </div>
              <div className="p-2 bg-blue-100 rounded-full">
                <Users className="h-5 w-5 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-green-50 p-4 rounded-lg border border-green-100">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-green-700">إجمالي المستحقات</p>
                <h3 className="text-xl font-bold text-green-800 mt-1">
                  {formatCurrency(summaryStats.customerReceivables)}
                </h3>
              </div>
              <div className="p-2 bg-green-100 rounded-full">
                <ArrowUpCircle className="h-5 w-5 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-red-50 p-4 rounded-lg border border-red-100">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-red-700">إجمالي الديون</p>
                <h3 className="text-xl font-bold text-red-800 mt-1">
                  {formatCurrency(summaryStats.customerDebts)}
                </h3>
              </div>
              <div className="p-2 bg-red-100 rounded-full">
                <ArrowDownCircle className="h-5 w-5 text-red-600" />
              </div>
            </div>
          </div>
        </>
      );
    } else {
      return (
        <>
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-blue-700">إجمالي الموردين</p>
                <h3 className="text-xl font-bold text-blue-800 mt-1">
                  {suppliersData.length}
                </h3>
              </div>
              <div className="p-2 bg-blue-100 rounded-full">
                <Truck className="h-5 w-5 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-amber-50 p-4 rounded-lg border border-amber-100">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-amber-700">
                  إجمالي المستحقات للموردين
                </p>
                <h3 className="text-xl font-bold text-amber-800 mt-1">
                  {formatCurrency(summaryStats.supplierTotal)}
                </h3>
              </div>
              <div className="p-2 bg-amber-100 rounded-full">
                <CreditCard className="h-5 w-5 text-amber-600" />
              </div>
            </div>
          </div>

          <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-100">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-indigo-700">متوسط قيمة المشتريات</p>
                <h3 className="text-xl font-bold text-indigo-800 mt-1">
                  {formatCurrency(summaryStats.supplierAvg)}
                </h3>
              </div>
              <div className="p-2 bg-indigo-100 rounded-full">
                <BarChart2 className="h-5 w-5 text-indigo-600" />
              </div>
            </div>
          </div>
        </>
      );
    }
  };

  // Render customer table
  const renderCustomerTable = () => (
    <Table>
      <TableHeader className="sticky top-0 bg-white">
        <TableRow>
          <TableHead>اسم الزبون</TableHead>
          <TableHead>جهة الاتصال</TableHead>
          <TableHead>المدينة</TableHead>
          <TableHead>التصنيف</TableHead>
          <TableHead>الحالة</TableHead>
          <TableHead>الرصيد</TableHead>
          <TableHead>آخر معاملة</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {filteredCustomers.length > 0 ? (
          filteredCustomers.map((customer) => (
            <TableRow
              key={customer.id}
              className="cursor-pointer hover:bg-gray-50"
              onClick={() => handleItemClick(customer)}
            >
              <TableCell className="font-medium">{customer.name}</TableCell>
              <TableCell>{customer.contactName}</TableCell>
              <TableCell>{customer.city}</TableCell>
              <TableCell>{customer.category}</TableCell>
              <TableCell>
                <StatusBadge status={customer.status} />
              </TableCell>
              <TableCell>
                <span className={getBalanceTextClass(customer.balanceType)}>
                  {formatCurrency(customer.balance)}
                  {customer.balanceType !== "متوازن" &&
                    ` (${customer.balanceType})`}
                </span>
              </TableCell>
              <TableCell>{formatDate(customer.lastTransaction)}</TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell
              colSpan={7}
              className="h-24 text-center text-muted-foreground"
            >
              لا توجد نتائج مطابقة للبحث
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );

  // Render supplier table
  const renderSupplierTable = () => (
    <Table>
      <TableHeader className="sticky top-0 bg-white">
        <TableRow>
          <TableHead>اسم المورد</TableHead>
          <TableHead>جهة الاتصال</TableHead>
          <TableHead>المدينة</TableHead>
          <TableHead>التصنيف</TableHead>
          <TableHead>الحالة</TableHead>
          <TableHead>الرصيد</TableHead>
          <TableHead>آخر معاملة</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {filteredSuppliers.length > 0 ? (
          filteredSuppliers.map((supplier) => (
            <TableRow
              key={supplier.id}
              className="cursor-pointer hover:bg-gray-50"
              onClick={() => handleItemClick(supplier)}
            >
              <TableCell className="font-medium">{supplier.name}</TableCell>
              <TableCell>{supplier.contactName}</TableCell>
              <TableCell>{supplier.city}</TableCell>
              <TableCell>{supplier.category}</TableCell>
              <TableCell>
                <StatusBadge status={supplier.status} />
              </TableCell>
              <TableCell>
                <span className="text-gray-600">
                  {formatCurrency(supplier.balance)}
                </span>
              </TableCell>
              <TableCell>{formatDate(supplier.lastTransaction)}</TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell
              colSpan={7}
              className="h-24 text-center text-muted-foreground"
            >
              لا توجد نتائج مطابقة للبحث
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );

  return (
    <>
      <Dialog open={open} onOpenChange={(open) => !open && onClose()}>
        <DialogContent className="max-w-5xl max-h-[80vh] overflow-hidden flex flex-col">
          <DialogHeader>
            <div className="flex justify-between items-center">
              <DialogTitle className="text-xl font-bold">
                {activeTab === "customers" ? "الزبائن" : "الموردين"}
              </DialogTitle>
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="h-8 w-8"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <DialogDescription>
              {activeTab === "customers"
                ? "إدارة وعرض بيانات الزبائن"
                : "إدارة وعرض بيانات الموردين"}
            </DialogDescription>
          </DialogHeader>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            {renderSummaryCards()}
          </div>

          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="flex-1 flex flex-col overflow-hidden"
          >
            <div className="flex justify-between items-center mb-4">
              <TabsList>
                <TabsTrigger value="customers">الزبائن</TabsTrigger>
                <TabsTrigger value="suppliers">الموردين</TabsTrigger>
              </TabsList>

              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="بحث..."
                    className="w-[200px] pr-9"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={resetFilters}
                  className="h-9"
                >
                  <Filter className="h-4 w-4 ml-1" />
                  إعادة ضبط
                </Button>
              </div>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-2 mb-4">
              <Select value={cityFilter} onValueChange={setCityFilter}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="المدينة" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">جميع المدن</SelectItem>
                  {activeTab === "customers"
                    ? customerCities.map((city) => (
                        <SelectItem key={city} value={city}>
                          {city}
                        </SelectItem>
                      ))
                    : supplierCities.map((city) => (
                        <SelectItem key={city} value={city}>
                          {city}
                        </SelectItem>
                      ))}
                </SelectContent>
              </Select>

              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="الحالة" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">جميع الحالات</SelectItem>
                  <SelectItem value="نشط">نشط</SelectItem>
                  <SelectItem value="غير نشط">غير نشط</SelectItem>
                </SelectContent>
              </Select>

              {activeTab === "customers" && (
                <Select
                  value={balanceTypeFilter}
                  onValueChange={setBalanceTypeFilter}
                >
                  <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="نوع الرصيد" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">جميع الأنواع</SelectItem>
                    <SelectItem value="دائن">دائن</SelectItem>
                    <SelectItem value="مدين">مدين</SelectItem>
                    <SelectItem value="متوازن">متوازن</SelectItem>
                  </SelectContent>
                </Select>
              )}

              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="التصنيف" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">جميع التصنيفات</SelectItem>
                  {activeTab === "customers"
                    ? customerCategories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))
                    : supplierCategories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex-1 overflow-auto border rounded-md">
              <TabsContent
                value="customers"
                className="h-full m-0 overflow-auto"
              >
                <div>{renderCustomerTable()}</div>
              </TabsContent>

              <TabsContent
                value="suppliers"
                className="h-full m-0 overflow-auto"
              >
                <div>{renderSupplierTable()}</div>
              </TabsContent>
            </div>
          </Tabs>
        </DialogContent>
      </Dialog>

      {selectedItem && (
        <CustomerSupplierQuickView
          open={detailsOpen}
          onClose={() => setDetailsOpen(false)}
          data={selectedItem}
          type={activeTab === "customers" ? "customer" : "supplier"}
        />
      )}
    </>
  );
};

export default CustomerSupplierPopup;
