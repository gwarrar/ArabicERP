import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  Upload,
  Download,
  FileText,
  Database,
  Users,
  Package,
  CreditCard,
  Settings,
  CheckCircle,
  AlertCircle,
  Clock,
  RefreshCw,
  FileSpreadsheet,
  Filter,
  Search,
  Trash,
  Eye,
} from "lucide-react";

const DataImportExport = () => {
  const [activeTab, setActiveTab] = useState("import");
  const [selectedImportType, setSelectedImportType] = useState("customers");
  const [selectedExportType, setSelectedExportType] = useState("customers");
  const [importFile, setImportFile] = useState<File | null>(null);
  const [importProgress, setImportProgress] = useState(0);
  const [isImporting, setIsImporting] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [exportProgress, setExportProgress] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");

  // Sample import history
  const importHistory = [
    {
      id: "1",
      timestamp: "2024-08-22 15:30:25",
      type: "customers",
      filename: "customers_import_20240822.xlsx",
      status: "success",
      records: 150,
      errors: 0,
      warnings: 2,
    },
    {
      id: "2",
      timestamp: "2024-08-20 11:15:40",
      type: "products",
      filename: "products_catalog_q3.csv",
      status: "warning",
      records: 320,
      errors: 0,
      warnings: 15,
    },
    {
      id: "3",
      timestamp: "2024-08-18 09:45:10",
      type: "invoices",
      filename: "invoices_2024_07.xlsx",
      status: "error",
      records: 45,
      errors: 12,
      warnings: 8,
    },
    {
      id: "4",
      timestamp: "2024-08-15 14:20:30",
      type: "inventory",
      filename: "inventory_count_aug.csv",
      status: "success",
      records: 500,
      errors: 0,
      warnings: 0,
    },
  ];

  // Sample export history
  const exportHistory = [
    {
      id: "1",
      timestamp: "2024-08-22 16:45:20",
      type: "customers",
      filename: "customers_export_20240822.xlsx",
      status: "success",
      records: 250,
      format: "xlsx",
    },
    {
      id: "2",
      timestamp: "2024-08-21 10:30:15",
      type: "products",
      filename: "products_full_catalog.csv",
      status: "success",
      records: 420,
      format: "csv",
    },
    {
      id: "3",
      timestamp: "2024-08-19 13:20:45",
      type: "accounting",
      filename: "general_ledger_q2_2024.xlsx",
      status: "success",
      records: 1250,
      format: "xlsx",
    },
    {
      id: "4",
      timestamp: "2024-08-17 09:10:30",
      type: "inventory",
      filename: "inventory_valuation_aug.csv",
      status: "error",
      records: 0,
      format: "csv",
    },
  ];

  // Sample templates
  const importTemplates = [
    {
      id: "1",
      name: "قالب استيراد العملاء",
      description: "قالب لاستيراد بيانات العملاء الأساسية",
      format: "xlsx",
      lastUpdated: "2024-08-01",
    },
    {
      id: "2",
      name: "قالب استيراد المنتجات",
      description: "قالب لاستيراد بيانات المنتجات والأسعار",
      format: "xlsx",
      lastUpdated: "2024-08-01",
    },
    {
      id: "3",
      name: "قالب استيراد المخزون",
      description: "قالب لاستيراد بيانات المخزون والكميات",
      format: "xlsx",
      lastUpdated: "2024-08-01",
    },
    {
      id: "4",
      name: "قالب استيراد الموردين",
      description: "قالب لاستيراد بيانات الموردين",
      format: "xlsx",
      lastUpdated: "2024-08-01",
    },
    {
      id: "5",
      name: "قالب استيراد الفواتير",
      description: "قالب لاستيراد بيانات الفواتير",
      format: "xlsx",
      lastUpdated: "2024-08-01",
    },
  ];

  // Handle file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setImportFile(e.target.files[0]);
    }
  };

  // Handle import
  const handleImport = () => {
    if (!importFile) {
      alert("يرجى اختيار ملف للاستيراد");
      return;
    }

    setIsImporting(true);
    setImportProgress(0);

    // Simulate import progress
    const interval = setInterval(() => {
      setImportProgress((prev) => {
        const newProgress = prev + 10;
        if (newProgress >= 100) {
          clearInterval(interval);
          setIsImporting(false);
          return 100;
        }
        return newProgress;
      });
    }, 500);
  };

  // Handle export
  const handleExport = () => {
    setIsExporting(true);
    setExportProgress(0);

    // Simulate export progress
    const interval = setInterval(() => {
      setExportProgress((prev) => {
        const newProgress = prev + 15;
        if (newProgress >= 100) {
          clearInterval(interval);
          setIsExporting(false);
          return 100;
        }
        return newProgress;
      });
    }, 300);
  };

  // Get icon for data type
  const getDataTypeIcon = (type: string) => {
    switch (type) {
      case "customers":
        return <Users className="h-5 w-5 text-blue-600" />;
      case "products":
        return <Package className="h-5 w-5 text-green-600" />;
      case "invoices":
        return <CreditCard className="h-5 w-5 text-amber-600" />;
      case "inventory":
        return <Database className="h-5 w-5 text-purple-600" />;
      case "accounting":
        return <FileText className="h-5 w-5 text-indigo-600" />;
      default:
        return <FileText className="h-5 w-5 text-gray-600" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">استيراد وتصدير البيانات</h2>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="import">
            <Upload className="h-4 w-4 ml-2" />
            استيراد
          </TabsTrigger>
          <TabsTrigger value="export">
            <Download className="h-4 w-4 ml-2" />
            تصدير
          </TabsTrigger>
          <TabsTrigger value="templates">
            <FileSpreadsheet className="h-4 w-4 ml-2" />
            القوالب
          </TabsTrigger>
          <TabsTrigger value="history">
            <Clock className="h-4 w-4 ml-2" />
            السجل
          </TabsTrigger>
        </TabsList>

        <TabsContent value="import" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>استيراد البيانات</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">اختر نوع البيانات</h3>
                  <div className="grid grid-cols-2 gap-3">
                    <div
                      className={`flex flex-col items-center justify-center p-4 border rounded-lg cursor-pointer transition-colors ${selectedImportType === "customers" ? "bg-blue-50 border-blue-200" : "hover:bg-muted/50"}`}
                      onClick={() => setSelectedImportType("customers")}
                    >
                      <Users className="h-8 w-8 text-blue-600 mb-2" />
                      <span>العملاء</span>
                    </div>
                    <div
                      className={`flex flex-col items-center justify-center p-4 border rounded-lg cursor-pointer transition-colors ${selectedImportType === "products" ? "bg-green-50 border-green-200" : "hover:bg-muted/50"}`}
                      onClick={() => setSelectedImportType("products")}
                    >
                      <Package className="h-8 w-8 text-green-600 mb-2" />
                      <span>المنتجات</span>
                    </div>
                    <div
                      className={`flex flex-col items-center justify-center p-4 border rounded-lg cursor-pointer transition-colors ${selectedImportType === "invoices" ? "bg-amber-50 border-amber-200" : "hover:bg-muted/50"}`}
                      onClick={() => setSelectedImportType("invoices")}
                    >
                      <CreditCard className="h-8 w-8 text-amber-600 mb-2" />
                      <span>الفواتير</span>
                    </div>
                    <div
                      className={`flex flex-col items-center justify-center p-4 border rounded-lg cursor-pointer transition-colors ${selectedImportType === "inventory" ? "bg-purple-50 border-purple-200" : "hover:bg-muted/50"}`}
                      onClick={() => setSelectedImportType("inventory")}
                    >
                      <Database className="h-8 w-8 text-purple-600 mb-2" />
                      <span>المخزون</span>
                    </div>
                  </div>

                  <div className="mt-6">
                    <Button variant="outline" className="w-full">
                      <Download className="ml-2 h-4 w-4" />
                      تحميل قالب{" "}
                      {selectedImportType === "customers"
                        ? "العملاء"
                        : selectedImportType === "products"
                          ? "المنتجات"
                          : selectedImportType === "invoices"
                            ? "الفواتير"
                            : "المخزون"}
                    </Button>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">رفع الملف</h3>
                  <div
                    className="border-2 border-dashed rounded-lg p-8 text-center hover:bg-muted/50 transition-colors cursor-pointer"
                    onClick={() =>
                      document.getElementById("file-upload")?.click()
                    }
                  >
                    <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                    <p className="text-lg font-medium mb-2">
                      اسحب الملف وأفلته هنا أو انقر للاختيار
                    </p>
                    <p className="text-sm text-muted-foreground mb-4">
                      يدعم صيغ XLSX و CSV
                    </p>
                    <Input
                      id="file-upload"
                      type="file"
                      className="hidden"
                      accept=".xlsx,.csv"
                      onChange={handleFileChange}
                    />
                    {importFile && (
                      <div className="mt-4 p-3 bg-blue-50 border border-blue-100 rounded-md text-right">
                        <div className="flex items-center">
                          <FileText className="h-5 w-5 text-blue-600 ml-2" />
                          <span className="font-medium">{importFile.name}</span>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">
                          {(importFile.size / 1024).toFixed(2)} كيلوبايت
                        </p>
                      </div>
                    )}
                  </div>

                  {isImporting && (
                    <div className="space-y-2 mt-4">
                      <div className="flex justify-between text-sm">
                        <span>جاري الاستيراد...</span>
                        <span>{importProgress}%</span>
                      </div>
                      <Progress value={importProgress} className="h-2" />
                    </div>
                  )}

                  <div className="flex justify-end gap-2 mt-6">
                    <Button variant="outline">إلغاء</Button>
                    <Button
                      onClick={handleImport}
                      disabled={!importFile || isImporting}
                    >
                      <Upload className="ml-2 h-4 w-4" />
                      بدء الاستيراد
                    </Button>
                  </div>
                </div>
              </div>

              <div className="p-4 border rounded-lg bg-amber-50 border-amber-200">
                <h4 className="flex items-center text-amber-800 font-medium mb-2">
                  <AlertCircle className="h-5 w-5 ml-2 text-amber-600" />
                  ملاحظات هامة
                </h4>
                <ul className="list-disc list-inside space-y-1 text-sm text-amber-700">
                  <li>
                    تأكد من استخدام القالب الصحيح لنوع البيانات المراد استيرادها
                  </li>
                  <li>
                    يجب أن تكون البيانات بالتنسيق الصحيح لتجنب أخطاء الاستيراد
                  </li>
                  <li>
                    الحقول الإلزامية مميزة في القالب، تأكد من تعبئتها جميعاً
                  </li>
                  <li>سيتم التحقق من البيانات قبل استيرادها وإظهار أي أخطاء</li>
                  <li>يمكنك مراجعة سجل الاستيراد لمعرفة تفاصيل العملية</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="export" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>تصدير البيانات</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">اختر نوع البيانات</h3>
                  <div className="grid grid-cols-2 gap-3">
                    <div
                      className={`flex flex-col items-center justify-center p-4 border rounded-lg cursor-pointer transition-colors ${selectedExportType === "customers" ? "bg-blue-50 border-blue-200" : "hover:bg-muted/50"}`}
                      onClick={() => setSelectedExportType("customers")}
                    >
                      <Users className="h-8 w-8 text-blue-600 mb-2" />
                      <span>العملاء</span>
                    </div>
                    <div
                      className={`flex flex-col items-center justify-center p-4 border rounded-lg cursor-pointer transition-colors ${selectedExportType === "products" ? "bg-green-50 border-green-200" : "hover:bg-muted/50"}`}
                      onClick={() => setSelectedExportType("products")}
                    >
                      <Package className="h-8 w-8 text-green-600 mb-2" />
                      <span>المنتجات</span>
                    </div>
                    <div
                      className={`flex flex-col items-center justify-center p-4 border rounded-lg cursor-pointer transition-colors ${selectedExportType === "invoices" ? "bg-amber-50 border-amber-200" : "hover:bg-muted/50"}`}
                      onClick={() => setSelectedExportType("invoices")}
                    >
                      <CreditCard className="h-8 w-8 text-amber-600 mb-2" />
                      <span>الفواتير</span>
                    </div>
                    <div
                      className={`flex flex-col items-center justify-center p-4 border rounded-lg cursor-pointer transition-colors ${selectedExportType === "inventory" ? "bg-purple-50 border-purple-200" : "hover:bg-muted/50"}`}
                      onClick={() => setSelectedExportType("inventory")}
                    >
                      <Database className="h-8 w-8 text-purple-600 mb-2" />
                      <span>المخزون</span>
                    </div>
                    <div
                      className={`flex flex-col items-center justify-center p-4 border rounded-lg cursor-pointer transition-colors ${selectedExportType === "accounting" ? "bg-indigo-50 border-indigo-200" : "hover:bg-muted/50"}`}
                      onClick={() => setSelectedExportType("accounting")}
                    >
                      <FileText className="h-8 w-8 text-indigo-600 mb-2" />
                      <span>المحاسبة</span>
                    </div>
                    <div
                      className={`flex flex-col items-center justify-center p-4 border rounded-lg cursor-pointer transition-colors ${selectedExportType === "all" ? "bg-gray-50 border-gray-200" : "hover:bg-muted/50"}`}
                      onClick={() => setSelectedExportType("all")}
                    >
                      <Database className="h-8 w-8 text-gray-600 mb-2" />
                      <span>جميع البيانات</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">خيارات التصدير</h3>
                  <div className="space-y-4 p-4 border rounded-lg">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">صيغة الملف</label>
                      <div className="flex gap-2">
                        <Button variant="outline" className="flex-1">
                          <FileText className="ml-2 h-4 w-4" />
                          XLSX
                        </Button>
                        <Button variant="outline" className="flex-1">
                          <FileText className="ml-2 h-4 w-4" />
                          CSV
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">
                        نطاق البيانات
                      </label>
                      <select className="w-full h-10 px-3 py-2 rounded-md border border-input bg-background">
                        <option value="all">جميع البيانات</option>
                        <option value="date-range">نطاق تاريخي</option>
                        <option value="filtered">البيانات المفلترة</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">
                        تضمين البيانات المحذوفة
                      </label>
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="include-deleted"
                          className="ml-2"
                        />
                        <label htmlFor="include-deleted">
                          تضمين العناصر المحذوفة
                        </label>
                      </div>
                    </div>
                  </div>

                  {isExporting && (
                    <div className="space-y-2 mt-4">
                      <div className="flex justify-between text-sm">
                        <span>جاري التصدير...</span>
                        <span>{exportProgress}%</span>
                      </div>
                      <Progress value={exportProgress} className="h-2" />
                    </div>
                  )}

                  <div className="flex justify-end gap-2 mt-6">
                    <Button variant="outline">إلغاء</Button>
                    <Button onClick={handleExport} disabled={isExporting}>
                      <Download className="ml-2 h-4 w-4" />
                      بدء التصدير
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="templates" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>قوالب الاستيراد</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex justify-between items-center">
                <div className="relative w-64">
                  <Search className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="بحث في القوالب..."
                    className="pr-9"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <Button>
                  <Upload className="ml-2 h-4 w-4" />
                  رفع قالب جديد
                </Button>
              </div>

              <div className="border rounded-lg overflow-hidden">
                <table className="w-full">
                  <thead>
                    <tr className="bg-muted/50">
                      <th className="text-right py-3 px-4 font-medium">
                        اسم القالب
                      </th>
                      <th className="text-right py-3 px-4 font-medium">
                        الوصف
                      </th>
                      <th className="text-right py-3 px-4 font-medium">
                        الصيغة
                      </th>
                      <th className="text-right py-3 px-4 font-medium">
                        آخر تحديث
                      </th>
                      <th className="text-right py-3 px-4 font-medium">
                        الإجراءات
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {importTemplates.map((template) => (
                      <tr
                        key={template.id}
                        className="border-t hover:bg-muted/30"
                      >
                        <td className="py-3 px-4 font-medium">
                          {template.name}
                        </td>
                        <td className="py-3 px-4">{template.description}</td>
                        <td className="py-3 px-4">
                          <Badge variant="outline">{template.format}</Badge>
                        </td>
                        <td className="py-3 px-4">{template.lastUpdated}</td>
                        <td className="py-3 px-4">
                          <div className="flex gap-2">
                            <Button variant="ghost" size="icon">
                              <Download className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon">
                              <Trash className="h-4 w-4 text-red-500" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>سجل الاستيراد والتصدير</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <Tabs defaultValue="import-history" className="w-full">
                <TabsList className="mb-4">
                  <TabsTrigger value="import-history">
                    <Upload className="h-4 w-4 ml-2" />
                    سجل الاستيراد
                  </TabsTrigger>
                  <TabsTrigger value="export-history">
                    <Download className="h-4 w-4 ml-2" />
                    سجل التصدير
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="import-history">
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center gap-2">
                      <Badge
                        variant="outline"
                        className="bg-green-100 text-green-800"
                      >
                        نجاح: 2
                      </Badge>
                      <Badge
                        variant="outline"
                        className="bg-amber-100 text-amber-800"
                      >
                        تحذير: 1
                      </Badge>
                      <Badge
                        variant="outline"
                        className="bg-red-100 text-red-800"
                      >
                        خطأ: 1
                      </Badge>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Filter className="ml-1 h-4 w-4" />
                        تصفية
                      </Button>
                      <Button variant="outline" size="sm">
                        <RefreshCw className="ml-1 h-4 w-4" />
                        تحديث
                      </Button>
                    </div>
                  </div>

                  <div className="border rounded-lg overflow-hidden">
                    <table className="w-full">
                      <thead>
                        <tr className="bg-muted/50">
                          <th className="text-right py-3 px-4 font-medium">
                            التاريخ
                          </th>
                          <th className="text-right py-3 px-4 font-medium">
                            نوع البيانات
                          </th>
                          <th className="text-right py-3 px-4 font-medium">
                            اسم الملف
                          </th>
                          <th className="text-right py-3 px-4 font-medium">
                            الحالة
                          </th>
                          <th className="text-right py-3 px-4 font-medium">
                            السجلات
                          </th>
                          <th className="text-right py-3 px-4 font-medium">
                            الإجراءات
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {importHistory.map((item) => (
                          <tr
                            key={item.id}
                            className="border-t hover:bg-muted/30"
                          >
                            <td className="py-3 px-4">{item.timestamp}</td>
                            <td className="py-3 px-4">
                              <div className="flex items-center gap-2">
                                {getDataTypeIcon(item.type)}
                                <span>
                                  {item.type === "customers"
                                    ? "العملاء"
                                    : item.type === "products"
                                      ? "المنتجات"
                                      : item.type === "invoices"
                                        ? "الفواتير"
                                        : item.type === "inventory"
                                          ? "المخزون"
                                          : "المحاسبة"}
                                </span>
                              </div>
                            </td>
                            <td className="py-3 px-4">{item.filename}</td>
                            <td className="py-3 px-4">
                              <Badge
                                variant="outline"
                                className={`${item.status === "success" ? "bg-green-100 text-green-800" : item.status === "warning" ? "bg-amber-100 text-amber-800" : "bg-red-100 text-red-800"}`}
                              >
                                {item.status === "success"
                                  ? "نجاح"
                                  : item.status === "warning"
                                    ? "تحذير"
                                    : "خطأ"}
                              </Badge>
                            </td>
                            <td className="py-3 px-4">
                              <div className="flex flex-col">
                                <span>{item.records} سجل</span>
                                {(item.errors > 0 || item.warnings > 0) && (
                                  <span className="text-xs text-muted-foreground">
                                    {item.errors > 0 && `${item.errors} خطأ`}
                                    {item.errors > 0 &&
                                      item.warnings > 0 &&
                                      " | "}
                                    {item.warnings > 0 &&
                                      `${item.warnings} تحذير`}
                                  </span>
                                )}
                              </div>
                            </td>
                            <td className="py-3 px-4">
                              <div className="flex gap-2">
                                <Button variant="ghost" size="icon">
                                  <Eye className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="icon">
                                  <Download className="h-4 w-4" />
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </TabsContent>

                <TabsContent value="export-history">
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center gap-2">
                      <Badge
                        variant="outline"
                        className="bg-green-100 text-green-800"
                      >
                        نجاح: 3
                      </Badge>
                      <Badge
                        variant="outline"
                        className="bg-red-100 text-red-800"
                      >
                        خطأ: 1
                      </Badge>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Filter className="ml-1 h-4 w-4" />
                        تصفية
                      </Button>
                      <Button variant="outline" size="sm">
                        <RefreshCw className="ml-1 h-4 w-4" />
                        تحديث
                      </Button>
                    </div>
                  </div>

                  <div className="border rounded-lg overflow-hidden">
                    <table className="w-full">
                      <thead>
                        <tr className="bg-muted/50">
                          <th className="text-right py-3 px-4 font-medium">
                            التاريخ
                          </th>
                          <th className="text-right py-3 px-4 font-medium">
                            نوع البيانات
                          </th>
                          <th className="text-right py-3 px-4 font-medium">
                            اسم الملف
                          </th>
                          <th className="text-right py-3 px-4 font-medium">
                            الصيغة
                          </th>
                          <th className="text-right py-3 px-4 font-medium">
                            الحالة
                          </th>
                          <th className="text-right py-3 px-4 font-medium">
                            السجلات
                          </th>
                          <th className="text-right py-3 px-4 font-medium">
                            الإجراءات
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {exportHistory.map((item) => (
                          <tr
                            key={item.id}
                            className="border-t hover:bg-muted/30"
                          >
                            <td className="py-3 px-4">{item.timestamp}</td>
                            <td className="py-3 px-4">
                              <div className="flex items-center gap-2">
                                {getDataTypeIcon(item.type)}
                                <span>
                                  {item.type === "customers"
                                    ? "العملاء"
                                    : item.type === "products"
                                      ? "المنتجات"
                                      : item.type === "invoices"
                                        ? "الفواتير"
                                        : item.type === "inventory"
                                          ? "المخزون"
                                          : "المحاسبة"}
                                </span>
                              </div>
                            </td>
                            <td className="py-3 px-4">{item.filename}</td>
                            <td className="py-3 px-4">
                              <Badge variant="outline">{item.format}</Badge>
                            </td>
                            <td className="py-3 px-4">
                              <Badge
                                variant="outline"
                                className={`${item.status === "success" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}
                              >
                                {item.status === "success" ? "نجاح" : "خطأ"}
                              </Badge>
                            </td>
                            <td className="py-3 px-4">{item.records} سجل</td>
                            <td className="py-3 px-4">
                              <div className="flex gap-2">
                                {item.status === "success" && (
                                  <Button variant="ghost" size="icon">
                                    <Download className="h-4 w-4" />
                                  </Button>
                                )}
                                <Button variant="ghost" size="icon">
                                  <Eye className="h-4 w-4" />
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DataImportExport;
