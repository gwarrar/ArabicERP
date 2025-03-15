import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Search,
  Plus,
  Filter,
  Download,
  Edit,
  Trash,
  Eye,
  FileText,
  Package,
  Layers,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  Printer,
  Copy,
  CheckCircle,
  XCircle,
  AlertCircle,
  List,
  Workflow,
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import BillOfMaterialsDetails from "./BillOfMaterialsDetails";

// بيانات تجريبية لقوائم المواد
const billOfMaterialsData = [
  {
    id: "BOM-001",
    productName: "قميص رجالي أبيض",
    sku: "SHR-MEN-WHT",
    version: "V1.2",
    category: "ملابس رجالية",
    type: "تصنيع",
    level: "متعدد المستويات",
    status: "نشط",
    componentsCount: 6,
    operationsCount: 6,
    uom: "قطعة",
    batchSize: 100,
    createdAt: "2024-01-15",
    createdBy: "أحمد محمد",
    updatedAt: "2024-05-10",
    updatedBy: "محمد علي",
    approvedBy: "خالد العبدالله",
    approvedAt: "2024-05-12",
    notes: "قائمة مواد معتمدة للإنتاج",
  },
  {
    id: "BOM-002",
    productName: "بنطلون جينز رجالي",
    sku: "PNT-MEN-JNS",
    version: "V1.0",
    category: "ملابس رجالية",
    type: "تصنيع",
    level: "متعدد المستويات",
    status: "نشط",
    componentsCount: 8,
    operationsCount: 7,
    uom: "قطعة",
    batchSize: 50,
    createdAt: "2024-02-20",
    createdBy: "سارة أحمد",
    updatedAt: "2024-02-20",
    updatedBy: "سارة أحمد",
    approvedBy: "خالد العبدالله",
    approvedAt: "2024-02-25",
    notes: "",
  },
  {
    id: "BOM-003",
    productName: "فستان نسائي صيفي",
    sku: "DRS-WMN-SMR",
    version: "V1.1",
    category: "ملابس نسائية",
    type: "تصنيع",
    level: "متعدد المستويات",
    status: "نشط",
    componentsCount: 5,
    operationsCount: 5,
    uom: "قطعة",
    batchSize: 50,
    createdAt: "2024-03-10",
    createdBy: "فاطمة حسن",
    updatedAt: "2024-04-15",
    updatedBy: "فاطمة حسن",
    approvedBy: "خالد العبدالله",
    approvedAt: "2024-04-18",
    notes: "",
  },
  {
    id: "BOM-004",
    productName: "بلوزة نسائية حريرية",
    sku: "BLS-WMN-SLK",
    version: "V2.0",
    category: "ملابس نسائية",
    type: "تصنيع",
    level: "متعدد المستويات",
    status: "مسودة",
    componentsCount: 4,
    operationsCount: 6,
    uom: "قطعة",
    batchSize: 30,
    createdAt: "2024-05-05",
    createdBy: "فاطمة حسن",
    updatedAt: "2024-05-05",
    updatedBy: "فاطمة حسن",
    approvedBy: "",
    approvedAt: "",
    notes: "قائمة مواد قيد المراجعة",
  },
  {
    id: "BOM-005",
    productName: "جاكيت رجالي شتوي",
    sku: "JKT-MEN-WNT",
    version: "V1.0",
    category: "ملابس رجالية",
    type: "تصنيع",
    level: "متعدد المستويات",
    status: "مسودة",
    componentsCount: 10,
    operationsCount: 8,
    uom: "قطعة",
    batchSize: 25,
    createdAt: "2024-05-20",
    createdBy: "أحمد محمد",
    updatedAt: "2024-05-20",
    updatedBy: "أحمد محمد",
    approvedBy: "",
    approvedAt: "",
    notes: "قائمة مواد جديدة قيد الإعداد",
  },
  {
    id: "BOM-006",
    productName: "قميص رجالي أزرق",
    sku: "SHR-MEN-BLU",
    version: "V1.0",
    category: "ملابس رجالية",
    type: "تصنيع",
    level: "متعدد المستويات",
    status: "متوقف",
    componentsCount: 6,
    operationsCount: 6,
    uom: "قطعة",
    batchSize: 100,
    createdAt: "2024-01-25",
    createdBy: "أحمد محمد",
    updatedAt: "2024-04-10",
    updatedBy: "محمد علي",
    approvedBy: "خالد العبدالله",
    approvedAt: "2024-02-01",
    notes: "تم إيقاف الإنتاج",
  },
];

// بيانات تجريبية للفئات
const categoriesData = [
  { id: "CAT-001", name: "ملابس رجالية" },
  { id: "CAT-002", name: "ملابس نسائية" },
  { id: "CAT-003", name: "ملابس أطفال" },
  { id: "CAT-004", name: "إكسسوارات" },
];

const BillOfMaterialsList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [showAddBOM, setShowAddBOM] = useState(false);
  const [showBOMDetails, setShowBOMDetails] = useState(false);
  const [selectedBOM, setSelectedBOM] = useState(null);
  const [sortField, setSortField] = useState("id");
  const [sortDirection, setSortDirection] = useState("asc");
  const { toast } = useToast();

  // تصفية قوائم المواد
  const filteredBOMs = billOfMaterialsData
    .filter((bom) => {
      const matchesSearch =
        bom.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        bom.productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        bom.sku.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus =
        statusFilter === "all" || bom.status === statusFilter;

      const matchesCategory =
        categoryFilter === "all" || bom.category === categoryFilter;

      return matchesSearch && matchesStatus && matchesCategory;
    })
    .sort((a, b) => {
      let comparison = 0;
      if (sortField === "id") {
        comparison = a.id.localeCompare(b.id);
      } else if (sortField === "productName") {
        comparison = a.productName.localeCompare(b.productName);
      } else if (sortField === "version") {
        comparison = a.version.localeCompare(b.version);
      } else if (sortField === "componentsCount") {
        comparison = a.componentsCount - b.componentsCount;
      } else if (sortField === "operationsCount") {
        comparison = a.operationsCount - b.operationsCount;
      } else if (sortField === "updatedAt") {
        comparison = new Date(a.updatedAt) - new Date(b.updatedAt);
      }

      return sortDirection === "asc" ? comparison : -comparison;
    });

  // معالجة تغيير الترتيب
  const handleSortChange = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  // الحصول على أيقونة الترتيب
  const getSortIcon = (field) => {
    if (sortField !== field) return <ArrowUpDown className="h-4 w-4" />;
    return sortDirection === "asc" ? (
      <ArrowUp className="h-4 w-4" />
    ) : (
      <ArrowDown className="h-4 w-4" />
    );
  };

  // معالجة اختيار قائمة المواد لعرض التفاصيل
  const handleBOMSelect = (bom) => {
    setSelectedBOM(bom);
    setShowBOMDetails(true);
  };

  // معالجة حذف قائمة المواد
  const handleDeleteBOM = (bomId) => {
    toast({
      title: "تم حذف قائمة المواد",
      description: `تم حذف قائمة المواد ${bomId} بنجاح`,
    });
  };

  // معالجة إضافة قائمة مواد جديدة
  const handleAddBOM = () => {
    setShowAddBOM(false);
    toast({
      title: "تم إنشاء قائمة المواد",
      description: "تم إنشاء قائمة المواد الجديدة بنجاح",
    });
  };

  // الحصول على لون الحالة
  const getStatusBadgeClass = (status) => {
    switch (status) {
      case "نشط":
        return "bg-green-100 text-green-800";
      case "مسودة":
        return "bg-amber-100 text-amber-800";
      case "متوقف":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // الحصول على أيقونة الحالة
  const getStatusIcon = (status) => {
    switch (status) {
      case "نشط":
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case "مسودة":
        return <AlertCircle className="h-4 w-4 text-amber-600" />;
      case "متوقف":
        return <XCircle className="h-4 w-4 text-red-600" />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* رأس الصفحة مع المرشحات */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex flex-col md:flex-row gap-2 w-full md:w-auto">
          <div className="relative w-full md:w-64">
            <Search className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="بحث عن قائمة مواد..."
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
                <SelectItem value="مسودة">مسودة</SelectItem>
                <SelectItem value="متوقف">متوقف</SelectItem>
              </SelectContent>
            </Select>

            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-[130px]">
                <SelectValue placeholder="الفئة" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">جميع الفئات</SelectItem>
                {categoriesData.map((category) => (
                  <SelectItem key={category.id} value={category.name}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="ml-2 h-4 w-4" />
            تصدير
          </Button>
          <Button onClick={() => setShowAddBOM(true)}>
            <Plus className="ml-2 h-4 w-4" />
            قائمة مواد جديدة
          </Button>
        </div>
      </div>

      {/* ملخص قوائم المواد */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-muted-foreground">
                  إجمالي قوائم المواد
                </p>
                <h3 className="text-2xl font-bold mt-2">
                  {billOfMaterialsData.length}
                </h3>
              </div>
              <div className="p-2 bg-blue-100 rounded-full">
                <List className="h-5 w-5 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-muted-foreground">قوائم مواد نشطة</p>
                <h3 className="text-2xl font-bold mt-2">
                  {
                    billOfMaterialsData.filter((bom) => bom.status === "نشط")
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
                  قوائم مواد مسودة
                </p>
                <h3 className="text-2xl font-bold mt-2">
                  {
                    billOfMaterialsData.filter((bom) => bom.status === "مسودة")
                      .length
                  }
                </h3>
              </div>
              <div className="p-2 bg-amber-100 rounded-full">
                <AlertCircle className="h-5 w-5 text-amber-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-muted-foreground">متوسط المكونات</p>
                <h3 className="text-2xl font-bold mt-2">
                  {Math.round(
                    billOfMaterialsData.reduce(
                      (sum, bom) => sum + bom.componentsCount,
                      0,
                    ) / billOfMaterialsData.length,
                  )}
                </h3>
              </div>
              <div className="p-2 bg-purple-100 rounded-full">
                <Package className="h-5 w-5 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* جدول قوائم المواد */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-lg font-semibold">
                قوائم المواد
              </CardTitle>
              <CardDescription>
                قائمة بجميع قوائم المواد وتفاصيلها
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Badge className="bg-blue-100 text-blue-800">
                {filteredBOMs.length} قائمة
              </Badge>
              <Button
                variant="outline"
                size="sm"
                onClick={() => window.print()}
              >
                <Printer className="ml-1 h-3 w-3" />
                طباعة
              </Button>
            </div>
          </div>
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
                      رقم القائمة {getSortIcon("id")}
                    </div>
                  </TableHead>
                  <TableHead
                    className="cursor-pointer"
                    onClick={() => handleSortChange("productName")}
                  >
                    <div className="flex items-center">
                      المنتج {getSortIcon("productName")}
                    </div>
                  </TableHead>
                  <TableHead>الرمز</TableHead>
                  <TableHead
                    className="cursor-pointer"
                    onClick={() => handleSortChange("version")}
                  >
                    <div className="flex items-center">
                      الإصدار {getSortIcon("version")}
                    </div>
                  </TableHead>
                  <TableHead>الفئة</TableHead>
                  <TableHead
                    className="cursor-pointer"
                    onClick={() => handleSortChange("componentsCount")}
                  >
                    <div className="flex items-center">
                      المكونات {getSortIcon("componentsCount")}
                    </div>
                  </TableHead>
                  <TableHead
                    className="cursor-pointer"
                    onClick={() => handleSortChange("operationsCount")}
                  >
                    <div className="flex items-center">
                      العمليات {getSortIcon("operationsCount")}
                    </div>
                  </TableHead>
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
                {filteredBOMs.length > 0 ? (
                  filteredBOMs.map((bom) => (
                    <TableRow
                      key={bom.id}
                      className="cursor-pointer hover:bg-muted/50"
                      onClick={() => handleBOMSelect(bom)}
                    >
                      <TableCell className="font-medium">{bom.id}</TableCell>
                      <TableCell>{bom.productName}</TableCell>
                      <TableCell>{bom.sku}</TableCell>
                      <TableCell>{bom.version}</TableCell>
                      <TableCell>{bom.category}</TableCell>
                      <TableCell className="text-center">
                        {bom.componentsCount}
                      </TableCell>
                      <TableCell className="text-center">
                        {bom.operationsCount}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          {getStatusIcon(bom.status)}
                          <Badge className={getStatusBadgeClass(bom.status)}>
                            {bom.status}
                          </Badge>
                        </div>
                      </TableCell>
                      <TableCell>{bom.updatedAt}</TableCell>
                      <TableCell>
                        <div
                          className="flex items-center gap-1"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleBOMSelect(bom);
                            }}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <Copy className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteBOM(bom.id);
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
                    <TableCell colSpan={10} className="text-center py-8">
                      <div className="flex flex-col items-center justify-center text-muted-foreground">
                        <Search className="h-8 w-8 mb-2" />
                        <p>لا توجد قوائم مواد تطابق معايير البحث</p>
                        <Button
                          variant="link"
                          onClick={() => {
                            setSearchQuery("");
                            setStatusFilter("all");
                            setCategoryFilter("all");
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

      {/* تفاصيل قائمة المواد */}
      {selectedBOM && (
        <BillOfMaterialsDetails
          open={showBOMDetails}
          onClose={() => setShowBOMDetails(false)}
          bom={selectedBOM}
        />
      )}
    </div>
  );
};

export default BillOfMaterialsList;
