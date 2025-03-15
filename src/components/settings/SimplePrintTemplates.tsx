import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
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
  Printer,
  Plus,
  FileText,
  FileCode,
  Receipt,
  Eye,
  Edit,
  Download,
  Trash,
  Search,
  Filter,
  Upload,
  ChevronRight,
  MoreHorizontal,
  Calendar,
} from "lucide-react";

const SimplePrintTemplates = () => {
  const [activeTab, setActiveTab] = useState("invoices");
  const [searchQuery, setSearchQuery] = useState("");
  const [formatFilter, setFormatFilter] = useState("all");
  const [sortBy, setSortBy] = useState("lastUpdated");
  const [showPreview, setShowPreview] = useState(false);
  const [showNewTemplateForm, setShowNewTemplateForm] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [newTemplate, setNewTemplate] = useState({
    name: "",
    type: "فاتورة",
    format: "PDF",
    description: "",
  });

  // بيانات تجريبية للنماذج
  const templates = {
    invoices: [
      {
        id: "inv-001",
        name: "فاتورة مبيعات قياسية",
        type: "فاتورة",
        format: "PDF",
        lastUpdated: "2024-08-10",
        usageCount: 156,
        description: "نموذج فاتورة مبيعات قياسية للعملاء",
        createdBy: "أحمد محمد",
      },
      {
        id: "inv-002",
        name: "فاتورة مبيعات مفصلة",
        type: "فاتورة",
        format: "PDF",
        lastUpdated: "2024-07-25",
        usageCount: 89,
        description: "نموذج فاتورة مبيعات مفصلة مع تفاصيل إضافية",
        createdBy: "محمد علي",
      },
      {
        id: "inv-003",
        name: "فاتورة ضريبية",
        type: "فاتورة",
        format: "PDF",
        lastUpdated: "2024-08-05",
        usageCount: 124,
        description: "نموذج فاتورة ضريبية متوافقة مع متطلبات الضرائب",
        createdBy: "سارة أحمد",
      },
      {
        id: "inv-004",
        name: "فاتورة مبيعات بسيطة",
        type: "فاتورة",
        format: "DOCX",
        lastUpdated: "2024-08-01",
        usageCount: 45,
        description: "نموذج فاتورة مبيعات بسيطة وسهلة التعديل",
        createdBy: "فاطمة حسن",
      },
    ],
    contracts: [
      {
        id: "cont-001",
        name: "عقد بيع قياسي",
        type: "عقد",
        format: "DOCX",
        lastUpdated: "2024-07-15",
        usageCount: 45,
        description: "نموذج عقد بيع قياسي للمنتجات",
        createdBy: "خالد العبدالله",
      },
      {
        id: "cont-002",
        name: "عقد توريد",
        type: "عقد",
        format: "PDF",
        lastUpdated: "2024-08-03",
        usageCount: 28,
        description: "نموذج عقد توريد للموردين",
        createdBy: "أحمد محمد",
      },
      {
        id: "cont-003",
        name: "اتفاقية خدمات",
        type: "اتفاقية",
        format: "DOCX",
        lastUpdated: "2024-07-20",
        usageCount: 32,
        description: "نموذج اتفاقية تقديم خدمات",
        createdBy: "محمد علي",
      },
    ],
    reports: [
      {
        id: "rep-001",
        name: "تقرير مبيعات شهري",
        type: "تقرير",
        format: "PDF",
        lastUpdated: "2024-08-08",
        usageCount: 18,
        description: "نموذج تقرير المبيعات الشهري",
        createdBy: "سارة أحمد",
      },
      {
        id: "rep-002",
        name: "تقرير مخزون",
        type: "تقرير",
        format: "PDF",
        lastUpdated: "2024-08-02",
        usageCount: 24,
        description: "نموذج تقرير حالة المخزون",
        createdBy: "فاطمة حسن",
      },
      {
        id: "rep-003",
        name: "تقرير أرباح وخسائر",
        type: "تقرير",
        format: "XLSX",
        lastUpdated: "2024-07-28",
        usageCount: 15,
        description: "نموذج تقرير الأرباح والخسائر",
        createdBy: "خالد العبدالله",
      },
    ],
    receipts: [
      {
        id: "rec-001",
        name: "إيصال استلام بضاعة",
        type: "إيصال",
        format: "PDF",
        lastUpdated: "2024-08-07",
        usageCount: 87,
        description: "نموذج إيصال استلام البضائع",
        createdBy: "أحمد محمد",
      },
      {
        id: "rec-002",
        name: "إيصال تسليم بضاعة",
        type: "إيصال",
        format: "PDF",
        lastUpdated: "2024-08-04",
        usageCount: 76,
        description: "نموذج إيصال تسليم البضائع",
        createdBy: "محمد علي",
      },
    ],
  };

  // تصفية النماذج حسب البحث والفلتر
  const getFilteredTemplates = (tabKey) => {
    return templates[tabKey]
      .filter((template) => {
        // تصفية حسب البحث
        const matchesSearch =
          searchQuery === "" ||
          template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          template.id.toLowerCase().includes(searchQuery.toLowerCase());

        // تصفية حسب الصيغة
        const matchesFormat =
          formatFilter === "all" || template.format === formatFilter;

        return matchesSearch && matchesFormat;
      })
      .sort((a, b) => {
        // ترتيب النتائج
        if (sortBy === "name") {
          return a.name.localeCompare(b.name);
        } else if (sortBy === "usageCount") {
          return b.usageCount - a.usageCount;
        } else {
          // ترتيب حسب آخر تحديث (الافتراضي)
          return new Date(b.lastUpdated) - new Date(a.lastUpdated);
        }
      });
  };

  // الحصول على الصيغ المتاحة للتبويب الحالي
  const getAvailableFormats = (tabKey) => {
    const formats = new Set();
    templates[tabKey].forEach((template) => formats.add(template.format));
    return Array.from(formats);
  };

  // إعادة تعيين المرشحات
  const resetFilters = () => {
    setSearchQuery("");
    setFormatFilter("all");
    setSortBy("lastUpdated");
  };

  // معاينة النموذج
  const handlePreviewTemplate = (template) => {
    setSelectedTemplate(template);
    setShowPreview(true);
  };

  // عرض محتوى النموذج حسب نوعه
  const renderTemplatePreview = () => {
    if (!selectedTemplate) return null;

    switch (selectedTemplate.type) {
      case "فاتورة":
        return (
          <div className="p-4">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-xl font-bold">شركة الأفق للتجارة</h2>
                <p className="text-sm text-gray-600">
                  الرياض، المملكة العربية السعودية
                </p>
                <p className="text-sm text-gray-600">هاتف: 966123456789+</p>
                <p className="text-sm text-gray-600">
                  البريد الإلكتروني: info@horizon.com
                </p>
              </div>
              <div className="text-right">
                <h2 className="text-xl font-bold">{selectedTemplate.name}</h2>
                <p className="text-sm text-gray-600">
                  رقم الفاتورة: INV-2024-0125
                </p>
                <p className="text-sm text-gray-600">التاريخ: 10 أغسطس 2024</p>
                <p className="text-sm text-gray-600">
                  تاريخ الاستحقاق: 10 سبتمبر 2024
                </p>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="font-bold mb-2">فاتورة إلى:</h3>
              <p>شركة المستقبل للتقنية</p>
              <p className="text-sm text-gray-600">
                جدة، المملكة العربية السعودية
              </p>
              <p className="text-sm text-gray-600">هاتف: 966987654321+</p>
            </div>

            <table className="w-full border-collapse mb-6">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border p-2 text-right">الوصف</th>
                  <th className="border p-2 text-right">الكمية</th>
                  <th className="border p-2 text-right">السعر</th>
                  <th className="border p-2 text-right">المجموع</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border p-2">قميص قطني</td>
                  <td className="border p-2">10</td>
                  <td className="border p-2">₴ 250</td>
                  <td className="border p-2">₴ 2,500</td>
                </tr>
                <tr>
                  <td className="border p-2">بنطلون جينز</td>
                  <td className="border p-2">5</td>
                  <td className="border p-2">₴ 350</td>
                  <td className="border p-2">₴ 1,750</td>
                </tr>
                <tr>
                  <td className="border p-2">حذاء رياضي</td>
                  <td className="border p-2">3</td>
                  <td className="border p-2">₴ 500</td>
                  <td className="border p-2">₴ 1,500</td>
                </tr>
              </tbody>
            </table>

            <div className="flex justify-end mb-6">
              <div className="w-1/3">
                <div className="flex justify-between mb-2">
                  <span>المجموع الفرعي:</span>
                  <span>₴ 5,750</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span>الضريبة (15%):</span>
                  <span>₴ 862.50</span>
                </div>
                <div className="flex justify-between font-bold">
                  <span>الإجمالي:</span>
                  <span>₴ 6,612.50</span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t">
              <p className="text-sm text-gray-600 mb-2">شروط الدفع: 30 يوم</p>
              <p className="text-sm text-gray-600">
                ملاحظات: شكراً لثقتكم في التعامل معنا.
              </p>
            </div>
          </div>
        );
      case "عقد":
      case "اتفاقية":
        return (
          <div className="p-4">
            <h1 className="text-xl font-bold text-center mb-6">
              {selectedTemplate.name}
            </h1>
            <p className="mb-4">تم الاتفاق في يوم 10 أغسطس 2024 بين كل من:</p>
            <p className="mb-2">
              <strong>الطرف الأول:</strong> شركة الأفق للتجارة، ومقرها الرياض،
              المملكة العربية السعودية.
            </p>
            <p className="mb-4">
              <strong>الطرف الثاني:</strong> شركة المستقبل للتقنية، ومقرها جدة،
              المملكة العربية السعودية.
            </p>

            <h2 className="text-lg font-bold mt-6 mb-2">
              البند الأول: موضوع العقد
            </h2>
            <p className="mb-4">
              اتفق الطرفان على أن يقوم الطرف الأول بتوريد منتجات ملابس للطرف
              الثاني وفقاً للمواصفات والكميات المتفق عليها.
            </p>

            <h2 className="text-lg font-bold mt-4 mb-2">
              البند الثاني: مدة العقد
            </h2>
            <p className="mb-4">
              مدة هذا العقد سنة ميلادية كاملة تبدأ من تاريخ 10 أغسطس 2024 وتنتهي
              في 9 أغسطس 2025.
            </p>

            <h2 className="text-lg font-bold mt-4 mb-2">
              البند الثالث: قيمة العقد
            </h2>
            <p className="mb-4">
              قيمة هذا العقد ₴ 250,000 (مائتان وخمسون ألف) تدفع على أربعة أقساط
              متساوية كل ثلاثة أشهر.
            </p>

            <h2 className="text-lg font-bold mt-4 mb-2">
              البند الرابع: التزامات الطرف الأول
            </h2>
            <p className="mb-4">
              يلتزم الطرف الأول بتوريد المنتجات المتفق عليها وفقاً للمواصفات
              والجودة المطلوبة وفي المواعيد المحددة.
            </p>

            <h2 className="text-lg font-bold mt-4 mb-2">
              البند الخامس: التزامات الطرف الثاني
            </h2>
            <p className="mb-4">
              يلتزم الطرف الثاني بسداد قيمة العقد في المواعيد المتفق عليها
              واستلام البضائع وفحصها.
            </p>

            <div className="mt-8 pt-4 border-t flex justify-between">
              <div>
                <p className="font-bold mb-2">الطرف الأول</p>
                <p>شركة الأفق للتجارة</p>
                <p className="mt-8">التوقيع: ________________</p>
              </div>
              <div>
                <p className="font-bold mb-2">الطرف الثاني</p>
                <p>شركة المستقبل للتقنية</p>
                <p className="mt-8">التوقيع: ________________</p>
              </div>
            </div>
          </div>
        );
      case "تقرير":
        return (
          <div className="p-4">
            <h1 className="text-xl font-bold text-center mb-6">
              {selectedTemplate.name}
            </h1>
            <p className="text-center text-gray-600 mb-6">
              للفترة من 1 يوليو 2024 إلى 31 يوليو 2024
            </p>

            <div className="mb-6">
              <h2 className="text-lg font-bold mb-2">ملخص تنفيذي</h2>
              <p className="mb-4">
                يقدم هذا التقرير تحليلاً شاملاً لأداء المبيعات خلال شهر يوليو
                2024، مع مقارنة بالأشهر السابقة وتحديد الاتجاهات الرئيسية.
              </p>
            </div>

            <div className="mb-6">
              <h2 className="text-lg font-bold mb-2">إجمالي المبيعات</h2>
              <p className="mb-2">إجمالي المبيعات لشهر يوليو: ₴ 325,430</p>
              <p className="mb-2">نسبة النمو عن الشهر السابق: 12.5%</p>
              <p className="mb-2">
                نسبة النمو عن نفس الشهر من العام السابق: 18.7%
              </p>
            </div>

            <div className="mb-6">
              <h2 className="text-lg font-bold mb-2">المبيعات حسب المنتج</h2>
              <table className="w-full border-collapse mb-4">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border p-2 text-right">المنتج</th>
                    <th className="border p-2 text-right">المبيعات</th>
                    <th className="border p-2 text-right">النسبة</th>
                    <th className="border p-2 text-right">التغيير</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border p-2">قميص قطني</td>
                    <td className="border p-2">₴ 125,750</td>
                    <td className="border p-2">38.6%</td>
                    <td className="border p-2 text-green-600">+15.2%</td>
                  </tr>
                  <tr>
                    <td className="border p-2">بنطلون جينز</td>
                    <td className="border p-2">₴ 98,200</td>
                    <td className="border p-2">30.2%</td>
                    <td className="border p-2 text-green-600">+8.5%</td>
                  </tr>
                  <tr>
                    <td className="border p-2">بلوزة حريرية</td>
                    <td className="border p-2">₴ 65,300</td>
                    <td className="border p-2">20.1%</td>
                    <td className="border p-2 text-red-600">-3.2%</td>
                  </tr>
                  <tr>
                    <td className="border p-2">منتجات أخرى</td>
                    <td className="border p-2">₴ 36,180</td>
                    <td className="border p-2">11.1%</td>
                    <td className="border p-2 text-green-600">+5.8%</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mb-6">
              <h2 className="text-lg font-bold mb-2">التوصيات</h2>
              <ul className="list-disc pr-6">
                <li className="mb-1">
                  زيادة المخزون من القمصان القطنية لتلبية الطلب المتزايد
                </li>
                <li className="mb-1">
                  مراجعة استراتيجية تسويق البلوزات الحريرية لتحسين المبيعات
                </li>
                <li className="mb-1">
                  إطلاق عروض ترويجية للمنتجات الأقل مبيعاً
                </li>
              </ul>
            </div>

            <div className="mt-8 pt-4 border-t">
              <p className="text-sm text-gray-600 text-center">
                تم إعداد هذا التقرير بواسطة قسم المبيعات - شركة الأفق للتجارة
              </p>
            </div>
          </div>
        );
      case "إيصال":
        return (
          <div className="p-4">
            <h1 className="text-xl font-bold text-center mb-6">
              {selectedTemplate.name}
            </h1>
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-lg font-bold">شركة الأفق للتجارة</h2>
                <p className="text-sm text-gray-600">
                  الرياض، المملكة العربية السعودية
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600">
                  رقم الإيصال: REC-2024-0125
                </p>
                <p className="text-sm text-gray-600">التاريخ: 10 أغسطس 2024</p>
              </div>
            </div>

            <div className="mb-6">
              <table className="w-full border-collapse mb-4">
                <tbody>
                  <tr>
                    <td className="border p-2 bg-gray-50 font-bold" width="30%">
                      المستلم / المسلم:
                    </td>
                    <td className="border p-2">شركة المستقبل للتقنية</td>
                  </tr>
                  <tr>
                    <td className="border p-2 bg-gray-50 font-bold">
                      العنوان:
                    </td>
                    <td className="border p-2">
                      جدة، المملكة العربية السعودية
                    </td>
                  </tr>
                  <tr>
                    <td className="border p-2 bg-gray-50 font-bold">
                      رقم الطلب المرجعي:
                    </td>
                    <td className="border p-2">PO-2024-0089</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mb-6">
              <h3 className="font-bold mb-2">تفاصيل البضاعة:</h3>
              <table className="w-full border-collapse mb-4">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border p-2 text-right">الصنف</th>
                    <th className="border p-2 text-right">الوصف</th>
                    <th className="border p-2 text-right">الكمية</th>
                    <th className="border p-2 text-right">الوحدة</th>
                    <th className="border p-2 text-right">الحالة</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border p-2">قماش قطني</td>
                    <td className="border p-2">قماش قطني أبيض 100%</td>
                    <td className="border p-2">200</td>
                    <td className="border p-2">متر</td>
                    <td className="border p-2">سليم</td>
                  </tr>
                  <tr>
                    <td className="border p-2">خيوط بوليستر</td>
                    <td className="border p-2">خيوط بوليستر متينة</td>
                    <td className="border p-2">50</td>
                    <td className="border p-2">بكرة</td>
                    <td className="border p-2">سليم</td>
                  </tr>
                  <tr>
                    <td className="border p-2">أزرار بلاستيكية</td>
                    <td className="border p-2">أزرار بلاستيكية بيضاء</td>
                    <td className="border p-2">1000</td>
                    <td className="border p-2">قطعة</td>
                    <td className="border p-2">سليم</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mb-6">
              <h3 className="font-bold mb-2">ملاحظات:</h3>
              <p className="border p-2">
                تم استلام/تسليم البضاعة بحالة جيدة وبدون أي تلف.
              </p>
            </div>

            <div className="mt-8 pt-4 border-t flex justify-between">
              <div>
                <p className="font-bold mb-2">المستلم</p>
                <p className="mt-8">التوقيع: ________________</p>
                <p>الاسم: ________________</p>
              </div>
              <div>
                <p className="font-bold mb-2">المسلم</p>
                <p className="mt-8">التوقيع: ________________</p>
                <p>الاسم: ________________</p>
              </div>
            </div>
          </div>
        );
      default:
        return (
          <div className="p-4 text-center">
            <p>لا توجد معاينة متاحة لهذا النوع من النماذج.</p>
          </div>
        );
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">إدارة النماذج والمطبوعات</h2>
          <p className="text-muted-foreground">
            إنشاء وتعديل نماذج المستندات والمطبوعات
          </p>
        </div>
        <Button onClick={() => setShowNewTemplateForm(true)}>
          <Plus className="ml-2 h-4 w-4" />
          إنشاء نموذج جديد
        </Button>
      </div>

      {/* تبويبات أنواع النماذج */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="invoices">
            <FileText className="h-4 w-4 ml-2" />
            الفواتير
          </TabsTrigger>
          <TabsTrigger value="contracts">
            <FileCode className="h-4 w-4 ml-2" />
            العقود
          </TabsTrigger>
          <TabsTrigger value="reports">
            <FileText className="h-4 w-4 ml-2" />
            التقارير
          </TabsTrigger>
          <TabsTrigger value="receipts">
            <Receipt className="h-4 w-4 ml-2" />
            إيصالات الاستلام والتسليم
          </TabsTrigger>
        </TabsList>

        {/* محتوى كل تبويب */}
        {Object.keys(templates).map((tabKey) => (
          <TabsContent key={tabKey} value={tabKey}>
            <Card>
              <CardHeader className="pb-3">
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle className="text-lg font-semibold">
                      {tabKey === "invoices"
                        ? "نماذج الفواتير"
                        : tabKey === "contracts"
                          ? "نماذج العقود"
                          : tabKey === "reports"
                            ? "نماذج التقارير"
                            : "نماذج الإيصالات"}
                    </CardTitle>
                    <CardDescription>
                      {tabKey === "invoices"
                        ? "قائمة بنماذج الفواتير المتاحة"
                        : tabKey === "contracts"
                          ? "قائمة بنماذج العقود المتاحة"
                          : tabKey === "reports"
                            ? "قائمة بنماذج التقارير المتاحة"
                            : "قائمة بنماذج الإيصالات المتاحة"}
                    </CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className="bg-blue-100 text-blue-800">
                      {getFilteredTemplates(tabKey).length} نموذج
                    </Badge>
                    <Button variant="outline" size="sm" onClick={() => setShowNewTemplateForm(true)}>
                      <Plus className="ml-1 h-3 w-3" />
                      إضافة نموذج
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {/* أدوات البحث والتصفية */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
                  <div className="flex flex-col md:flex-row gap-2 w-full md:w-auto">
                    <div className="relative w-full md:w-64">
                      <Search className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder={`بحث في ${tabKey === "invoices" ? "الفواتير" : tabKey === "contracts" ? "العقود" : tabKey === "reports" ? "التقارير" : "الإيصالات"}...`}
                        className="pr-9"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>

                    <div className="flex gap-2">
                      <Select
                        value={formatFilter}
                        onValueChange={setFormatFilter}
                      >
                        <SelectTrigger className="w-[130px]">
                          <SelectValue placeholder="الصيغة" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">جميع الصيغ</SelectItem>
                          {getAvailableFormats(tabKey).map((format) => (
                            <SelectItem key={format} value={format}>
                              {format}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>

                      <Select value={sortBy} onValueChange={setSortBy}>
                        <SelectTrigger className="w-[130px]">
                          <SelectValue placeholder="الترتيب حسب" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="lastUpdated">آخر تحديث</SelectItem>
                          <SelectItem value="name">الاسم</SelectItem>
                          <SelectItem value="usageCount">الاستخدام</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={resetFilters}>
                      <Filter className="ml-1 h-3 w-3" />
                      إعادة تعيين
                    </Button>
                    <Button variant="outline" size="sm">
                      <Upload className="ml-1 h-3 w-3" />
                      استيراد
                    </Button>
                  </div>
                </div>

                {/* جدول النماذج */}
                {getFilteredTemplates(tabKey).length > 0 ? (
                  <div className="border rounded-lg overflow-hidden">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>اسم النموذج</TableHead>
                          <TableHead>النوع</TableHead>
                          <TableHead>الصيغة</TableHead>
                          <TableHead>آخر تحديث</TableHead>
                          <TableHead>عدد الاستخدامات</TableHead>
                          <TableHead>الإجراءات</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {getFilteredTemplates(tabKey).map((template) => (
                          <TableRow key={template.id}>
                            <TableCell className="font-medium">
                              {template.name}
                            </TableCell>
                            <TableCell>{template.type}</TableCell>
                            <TableCell>
                              <Badge variant="outline">{template.format}</Badge>
                            </TableCell>
                            <TableCell>{template.lastUpdated}</TableCell>
                            <TableCell>{template.usageCount}</TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() =>
                                    handlePreviewTemplate(template)
                                  }
                                >
                                  <Eye className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="icon">
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="icon">
                                  <Download className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="icon">
                                  <Trash className="h-4 w-4 text-red-500" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <Search className="h-12 w-12 text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium mb-2">
                      لا توجد نماذج تطابق معايير البحث
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      جرب تغيير معايير البحث أو إعادة تعيين المرشحات
                    </p>
                    <Button variant="outline" onClick={resetFilters}>
                      إعادة تعيين المرشحات
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>

      {/* نافذة معاينة النموذج */}
      <Dialog open={showPreview} onOpenChange={setShowPreview}>
        <DialogContent className="sm:max-w-[800px]">
          <DialogHeader>
            <DialogTitle>معاينة النموذج</DialogTitle>
            <DialogDescription>
              {selectedTemplate?.name} - {selectedTemplate?.type}
            </DialogDescription>
          </DialogHeader>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* معلومات النموذج */}
            <div className="md:col-span-1 space-y-4">
              <div className="space-y-2">
                <h3 className="text-sm font-medium">معلومات النموذج</h3>
                <div className="bg-gray-50 p-3 rounded-md space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">
                      المعرف:
                    </span>
                    <span className="text-sm font-medium">
                      {selectedTemplate?.id}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">
                      النوع:
                    </span>
                    <span className="text-sm font-medium">
                      {selectedTemplate?.type}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">
                      الصيغة:
                    </span>
                    <Badge variant="outline">{selectedTemplate?.format}</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">
                      آخر تحديث:
                    </span>
                    <span className="text-sm font-medium">
                      {selectedTemplate?.lastUpdated}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">
                      عدد الاستخدامات:
                    </span>
                    <span className="text-sm font-medium">
                      {selectedTemplate?.usageCount}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">
                      تم الإنشاء بواسطة:
                    </span>
                    <span className="text-sm font-medium">
                      {selectedTemplate?.createdBy}
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-medium">الوصف</h3>
                <p className="text-sm bg-gray-50 p-3 rounded-md">
                  {selectedTemplate?.description}
                </p>
              </div>

              <div className="space-y-2 pt-4">
                <Button className="w-full">
                  <Printer className="ml-2 h-4 w-4" />
                  طباعة النموذج
                </Button>
                <Button variant="outline" className="w-full">
                  <Download className="ml-2 h-4 w-4" />
                  تنزيل النموذج
                </Button>
                <Button variant="outline" className="w-full">
                  <Edit className="ml-2 h-4 w-4" />
                  تعديل النموذج
                </Button>
              </div>
            </div>

            {/* معاينة النموذج */}
            <div className="md:col-span-2">
              <div className="border rounded-md h-[500px] overflow-auto bg-white">
                {renderTemplatePreview()}
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowPreview(false)}>
              إغلاق
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* نموذج إنشاء نموذج جديد */}
      <Dialog open={showNewTemplateForm} onOpenChange={setShowNewTemplateForm}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>إنشاء نموذج جديد</DialogTitle>
            <DialogDescription>
              أدخل معلومات النموذج الجديد
            </DialogDescription>
          </DialogHeader>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="template-name" className="text-sm font-medium">
                اسم النموذج *
              </label>
              <Input
                id="template-name"
                value={newTemplate.name}
                onChange={(e) => setNewTemplate({ ...newTemplate, name: e.target.value })}
                placeholder="أدخل اسم النموذج"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="template-type" className="text-sm font-medium">
                نوع النموذج *
              </label>
              <Select
                value={newTemplate.type}
                onValueChange={(value) => setNewTemplate({ ...newTemplate, type: value })}
              >
                <SelectTrigger id="template-type">
                  <SelectValue placeholder="اختر نوع النموذج" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="فاتورة">فاتورة</SelectItem>
                  <SelectItem value="عقد">عقد</SelectItem>
                  <SelectItem value="اتفاقية">اتفاقية</SelectItem>
                  <SelectItem value="تقرير">تقرير</SelectItem>
                  <SelectItem value="إيصال">إيصال</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label htmlFor="template-format" className="text-sm font-medium">
                صيغة النموذج *
              </label>
              <Select
                value={newTemplate.format}
                onValueChange={(value) => setNewTemplate({ ...newTemplate, format: value })}
              >
                <SelectTrigger id="template-format">
                  <SelectValue placeholder="اختر صيغة النموذج" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="PDF">PDF</SelectItem>
                  <SelectItem value="DOCX">DOCX</SelectItem>
                  <SelectItem value="XLSX">XLSX</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2 md:col-span-2">
              <label htmlFor="template-description" className="text-sm font-medium">
                وصف النموذج
              </label>
              <Textarea
                id="template-description"
                value={newTemplate.description}
                onChange={(e) => setNewTemplate({ ...newTemplate, description: e.target.value })}
                placeholder="أدخل وصفاً للنموذج"
                rows={4}
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-medium">
                محتوى النموذج *
              </label>
              <div className="border rounded-md p-4 bg-gray-50">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-sm font-medium">محرر النموذج</span>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Upload className="ml-1 h-3 w-3" />
                      استيراد ملف
                    </Button>
                    <Button variant="outline" size="sm">
                      <Eye className="ml-1 h-3 w-3" />
                      معاينة
                    </Button>
                  </div>
                </div>
                <Textarea
                  className="min-h-[200px] font-mono"
                  placeholder="أدخل محتوى النموذج هنا..."
                />
                <p className="text-xs text-muted-foreground mt-2">
                  يمكنك استخدام المتغيرات المتاحة بالصيغة {{"{{variable_name}}"}}.
                </p>
              </div>
            </div>

            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-medium">المتغيرات المتاحة</label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                <Badge variant="outline" className="justify-start">{{"{{company_name}}"}}</Badge>
                <Badge variant="outline" className="justify-start">{{"{{company_address}}"}}</Badge>
                <Badge variant="outline" className="justify-start">{{"{{date}}"}}</Badge>
                <Badge variant="outline" className="justify-start">{{"{{invoice_number}}"}}</Badge>
                <Badge variant="outline" className="justify-start">{{"{{customer_name}}"}}</Badge>
                <Badge variant="outline" className="justify-start">{{"{{total_amount}}"}}</Badge>
              </div>
            </div>
          </div>

          <DialogFooter className="mt-6">
            <Button variant="outline" onClick={() => setShowNewTemplateForm(false)}>
              إلغاء
            </Button>
            <Button
              onClick={() => {
                // هنا يمكن إضافة منطق حفظ النموذج الجديد
                setShowNewTemplateForm(false);
                // إعادة تعيين نموذج الإدخال
                setNewTemplate({
                  name: "",
                  type: "فاتورة",
                  format: "PDF",
                  description: "",
                });
                // عرض رسالة نجاح
                // toast({
                //   title: "تم إنشاء النموذج",
                //   description: "تم إنشاء النموذج الجديد بنجاح",
                // });
              }}
            >
              إنشاء النموذج
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SimplePrintTemplates;
