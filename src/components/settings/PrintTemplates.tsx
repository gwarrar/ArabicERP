import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Printer, FileText, Download, Upload, Edit, Eye, Trash, Plus, Search, Filter, FileCode, Settings, Calendar, ChevronRight, FileUp } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";

const PrintTemplates = () => {
  const [activeTab, setActiveTab] = useState("invoices");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [showPreview, setShowPreview] = useState(false);
  
  // بيانات تجريبية للنماذج
  const templates = {
    invoices: [
      { id: "inv-001", name: "فاتورة مبيعات قياسية", type: "فاتورة", format: "PDF", lastUpdated: "2024-08-10", usageCount: 156 },
      { id: "inv-002", name: "فاتورة مبيعات مفصلة", type: "فاتورة", format: "PDF", lastUpdated: "2024-07-25", usageCount: 89 },
      { id: "inv-003", name: "فاتورة ضريبية", type: "فاتورة", format: "PDF", lastUpdated: "2024-08-05", usageCount: 124 },
      { id: "inv-004", name: "إيصال مبيعات مبسط", type: "إيصال", format: "PDF", lastUpdated: "2024-08-01", usageCount: 210 }
    ],
    contracts: [
      { id: "cont-001", name: "عقد بيع قياسي", type: "عقد", format: "DOCX", lastUpdated: "2024-07-15", usageCount: 45 },
      { id: "cont-002", name: "عقد توريد", type: "عقد", format: "PDF", lastUpdated: "2024-08-03", usageCount: 28 },
      { id: "cont-003", name: "اتفاقية خدمات", type: "اتفاقية", format: "DOCX", lastUpdated: "2024-07-20", usageCount: 32 }
    ],
    reports: [
      { id: "rep-001", name: "تقرير مبيعات شهري", type: "تقرير", format: "PDF", lastUpdated: "2024-08-08", usageCount: 18 },
      { id: "rep-002", name: "تقرير مخزون", type: "تقرير", format: "PDF", lastUpdated: "2024-08-02", usageCount: 24 },
      { id: "rep-003", name: "تقرير أرباح وخسائر", type: "تقرير", format: "PDF", lastUpdated: "2024-07-28", usageCount: 15 }
    ],
    receipts: [
      { id: "rec-001", name: "إيصال استلام بضاعة", type: "إيصال", format: "PDF", lastUpdated: "2024-08-07", usageCount: 87 },
      { id: "rec-002", name: "إيصال تسليم بضاعة", type: "إيصال", format: "PDF", lastUpdated: "2024-08-04", usageCount: 76 }
    ]
  };

  // الحصول على النماذج الحالية حسب التبويب النشط
  const currentTemplates = templates[activeTab] || [];
  
  // تصفية النماذج حسب البحث
  const filteredTemplates = currentTemplates.filter(template => 
    template.name.includes(searchQuery) || 
    template.id.includes(searchQuery)
  );

  // معالجة اختيار نموذج للمعاينة
  const handleTemplateSelect = (template) => {
    setSelectedTemplate(template);
    setShowPreview(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">إدارة النماذج والمطبوعات</h2>
          <p className="text-muted-foreground">إنشاء وتعديل نماذج المستندات والمطبوعات</p>
        </div>
        <Button>
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
            <FileText className="h-4 w-4 ml-2" />
            إيصالات الاستلام والتسليم
          </TabsTrigger>
        </TabsList>

        {/* محتوى كل تبويب */}
        {Object.keys(templates).map(tabKey => (
          <TabsContent key={tabKey} value={tabKey} className="space-y-4">
            {/* أدوات البحث والتصفية */}
            <div className="flex justify-between items-center">
              <div className="relative w-64">
                <Search className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder={`بحث في ${tabKey === 'invoices' ? 'الفواتير' : tabKey === 'contracts' ? 'العقود' : tabKey === 'reports' ? 'التقارير' : 'الإيصالات'}...`}
                  className="pr-9"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 ml-1" />
                  تصفية
                </Button>
                <Button variant="outline" size="sm">
                  <Upload className="h-4 w-4 ml-1" />
                  استيراد نموذج
                </Button>
              </div>
            </div>

            {/* جدول النماذج */}
            <Card>
              <CardContent className="p-0">
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
                    {filteredTemplates.map(template => (
                      <TableRow key={template.id}>
                        <TableCell className="font-medium">{template.name}</TableCell>
                        <TableCell>{template.type}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{template.format}</Badge>
                        </TableCell>
                        <TableCell>{template.lastUpdated}</TableCell>
                        <TableCell>{template.usageCount}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Button variant="ghost" size="icon" onClick={() => handleTemplateSelect(template)}>
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
              </CardContent>
            </Card>

            {/* معاينة النموذج المحدد */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle>معاينة النموذج</CardTitle>
                  <CardDescription>معاينة النموذج قبل الطباعة أو التعديل</CardDescription>
                </CardHeader>
                <CardContent className="flex justify-center">
                  {showPreview && selectedTemplate ? (
                    <div className="border rounded-md p-4 w-full h-[400px] overflow-auto bg-white">
                      {/* هنا يتم عرض معاينة النموذج المحدد */}
                      {selectedTemplate.type === "فاتورة" && (
                        <div className="p-4">
                          <div className="flex justify-between items-start mb-6">
                            <div>
                              <h2 className="text-xl font-bold">شركة الأفق للتجارة</h2>
                              <p className="text-sm text-gray-600">الرياض، المملكة العربية السعودية</p>
                              <p className="text-sm text-gray-600">هاتف: 966123456789+</p>
                              <p className="text-sm text-gray-600">البريد الإلكتروني: info@horizon.com</p>
                            </div>
                            <div className="text-right">
                              <h2 className="text-xl font-bold">{selectedTemplate.name}</h2>
                              <p className="text-sm text-gray-600">رقم الفاتورة: INV-2024-0125</p>
                              <p className="text-sm text-gray-600">التاريخ: 10 أغسطس 2024</p>
                              <p className="text-sm text-gray-600">تاريخ الاستحقاق: 10 سبتمبر 2024</p>
                            </div>
                          </div>
                          
                          <div className="mb-6">
                            <h3 className="font-bold mb-2">فاتورة إلى:</h3>
                            <p>شركة المستقبل للتقنية</p>
                            <p className="text-sm text-gray-600">جدة، المملكة العربية السعودية</p>
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
                            <p className="text-sm text-gray-600">ملاحظات: شكراً لثقتكم في التعامل معنا.</p>
                          </div>
                        </div>
                      )}
                      
                      {selectedTemplate.type === "عقد" && (
                        <div className="p-4">
                          <h1 className="text-xl font-bold text-center mb-6">{selectedTemplate.name}</h1>
                          <p className="mb-4">تم الاتفاق في يوم 10 أغسطس 2024 بين كل من:</p>
                          <p className="mb-2"><strong>الطرف الأول:</strong> شركة الأفق للتجارة، ومقرها الرياض، المملكة العربية السعودية.</p>
                          <p className="mb-4"><strong>الطرف الثاني:</strong> شركة المستقبل للتقنية، ومقرها جدة، المملكة العربية السعودية.</p>
                          
                          <h2 className="text-lg font-bold mt-6 mb-2">البند الأول: موضوع العقد</h2>
                          <p className="mb-4">اتفق الطرفان على أن يقوم الطرف الأول بتوريد منتجات ملابس للطرف الثاني وفقاً للمواصفات والكميات المتفق عليها.</p>
                          
                          <h2 className="text-lg font-bold mt-4 mb-2">البند الثاني: مدة العقد</h2>
                          <p className="mb-4">مدة هذا العقد سنة ميلادية كاملة تبدأ من تاريخ 10 أغسطس 2024 وتنتهي في 9 أغسطس 2025.</p>
                          
                          <h2 className="text-lg font-bold mt-4 mb-2">البند الثالث: قيمة العقد</h2>
                          <p className="mb-4">قيمة هذا العقد ₴ 250,000 (مائتان وخمسون ألف) تدفع على أربعة أقساط متساوية كل ثلاثة أشهر.</p>
                          
                          <h2 className="text-lg font-bold mt-4 mb-2">البند الرابع: التزامات الطرف الأول</h2>
                          <p className="mb-4">يلتزم الطرف الأول بتوريد المنتجات المتفق عليها وفقاً للمواصفات والجودة المطلوبة وفي المواعيد المحددة.</p>
                          
                          <h2 className="text-lg font-bold mt-4 mb-2">البند الخامس: التزامات الطرف الثاني</h2>
                          <p className="mb-4">يلتزم الطرف الثاني بسداد قيمة العقد في المواعيد المتفق عليها واستلام البضائع وفحصها.</p>
                          
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
                      )}
                      
                      {selectedTemplate.type === "تقرير" && (
                        <div className="p-4">
                          <h1 className="text-xl font-bold text-center mb-6">{selectedTemplate.name}</h1>
                          <p className="text-center text-gray-600 mb-6">للفترة من 1 يوليو 2024 إلى 31 يوليو 2024</p>
                          
                          <div className="mb-6">
                            <h2 className="text-lg font-bold mb-2">ملخص تنفيذي</h2>
                            <p className="mb-4">يقدم هذا التقرير تحليلاً شاملاً لأداء المبيعات خلال شهر يوليو 2024، مع مقارنة بالأشهر السابقة وتحديد الاتجاهات الرئيسية.</p>
                          </div>
                          
                          <div className="mb-6">
                            <h2 className="text-lg font-bold mb-2">إجمالي المبيعات</h2>
                            <p className="mb-2">إجمالي المبيعات لشهر يوليو: ₴ 325,430</p>
                            <p className="mb-2">نسبة النمو عن الشهر السابق: 12.5%</p>
                            <p className="mb-2">نسبة النمو عن نفس الشهر من العام السابق: 18.7%</p>
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
                              <li className="mb-1">زيادة المخزون من القمصان القطنية لتلبية الطلب المتزايد</li>
                              <li className="mb-1">مراجعة استراتيجية تسويق البلوزات الحريرية لتحسين المبيعات</li>
                              <li className="mb-1">إطلاق عروض ترويجية للمنتجات الأقل مبيعاً</li>
                            </ul>
                          </div>
                          
                          <div className="mt-8 pt-4 border-t">
                            <p className="text-sm text-gray-600 text-center">تم إعداد هذا التقرير بواسطة قسم المبيعات - شركة الأفق للتجارة</p>
                          </div>
                        </div>
                      )}
                      
                      {selectedTemplate.type === "إيصال" && (
                        <div className="p-4">
                          <h1 className="text-xl font-bold text-center mb-6">{selectedTemplate.name}</h1>
                          <div className="flex justify-between items-start mb-6">
                            <div>
                              <h2 className="text-lg font-bold">شركة الأفق للتجارة</h2>
                              <p className="text-sm text-gray-600">الرياض، المملكة العربية السعودية</p>
                            </div>
                            <div className="text-right">
                              <p className="text-sm text-gray-600">رقم الإيصال: REC-2024-0125</p>
                              <p className="text-sm text-gray-600">التاريخ: 10 أغسطس 2024</p>
                            </div>
                          </div>
                          
                          <div className="mb-6">
                            <table className="w-full border-collapse mb-4">
                              <tbody>
                                <tr>
                                  <td className="border p-2 bg-gray-50 font-bold" width="30%">المستلم / المسلم:</td>
                                  <td className="border p-2">شركة المستقبل للتقنية</td>
                                </tr>
                                <tr>
                                  <td className="border p-2 bg-gray-50 font-bold">العنوان:</td>
                                  <td className="border p-2">جدة، المملكة العربية السعودية</td>
                                </tr>
                                <tr>
                                  <td className="border p-2 bg-gray-50 font-bold">رقم الطلب المرجعي:</td>
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
                            <p className="border p-2">تم استلام/تسليم البضاعة بحالة جيدة وبدون أي تلف.</p>
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
                      )}
                    </div>
                  ) : (
                    <div className="border rounded-md p-4 w-full h-[400px] flex items-center justify-center bg-gray-50">
                      <div className="text-center text-muted-foreground">
                        <Printer className="h-12 w-12 mx-auto mb-4 opacity-20" />
                        <p>اختر نموذجاً لعرض المعاينة</p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>المتغيرات المتاحة</CardTitle>
                  <CardDescription>المتغيرات التي يمكن استخدامها في النموذج</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium">معلومات الشركة</h4>
                      <div className="grid grid-cols-2 gap-2">
                        <Badge variant="outline" className="justify-start">{{"{{company_name}}"}}</Badge>
                        <Badge variant="outline" className="justify-start">{{"{{company_logo}}"}}</Badge>
                        <Badge variant="outline" className="justify-start">{{"{{company_address}}"}}</Badge>
                        <Badge variant="outline" className="justify-start">{{"{{company_phone}}"}}</Badge>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium">معلومات العميل</h4>
                      <div className="grid grid-cols-2 gap-2">
                        <Badge variant="outline" className="justify-start">{{"{{customer_name}}"}}</Badge>
                        <Badge variant="outline" className="justify-start">{{"{{customer_id}}"}}</Badge>
                        <Badge variant="outline" className="justify-start">{{"{{customer_address}}"}}</Badge>
                        <Badge variant="outline" className="justify-start">{{"{{customer_phone}}"}}</Badge>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium">معلومات الفاتورة</h4>
                      <div className="grid grid-cols-2 gap-2">
                        <Badge variant="outline" className="justify-start">{{"{{invoice_number}}"}}</Badge>
                        <Badge variant="outline" className="justify-start">{{"{{invoice_date}}"}}</Badge>
                        <Badge variant="outline" className="justify-start">{{"{{invoice_total}}"}}</Badge>
                        <Badge variant="outline" className="justify-start">{{"{{invoice_tax}}"}}</Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        ))}
      </Tabs>

      {/* إعدادات الطباعة */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>إعدادات الطباعة</CardTitle>
            <Button variant="outline" size="sm">
              <Settings className="h-4 w-4 ml-1" />
              تخصيص
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <h4 className="text-sm font-medium">الطابعات المتاحة</h4>
              <div className="flex items-center justify-between p-2 border rounded-md">
                <div className="flex items-center gap-2">
                  <Printer className="h-4 w-4 text-blue-600" />
                  <span>الطابعة الافتراضية</span>
                </div>
                <Badge className="bg-green-100 text-green-800">متصلة</Badge>
              </div>
            </div>
            
            <div className="space-y-2">
              <h4 className="text-sm font-medium">حجم الورق الافتراضي</h4>
              <div className="flex items-center justify-between p-2 border rounded-md">
                <span>A4 (210 × 297 مم)</span>
                <Button variant="outline" size="sm">تغيير</Button>
              </div>
            </div>
            
            <div className="space-y-2">
              <h4 className="text-sm font-medium">الطباعة التلقائية</h4>
              <div className="flex items-center justify-between p-2 border rounded-md">
                <span>طباعة تلقائية عند إنشاء فاتورة جديدة</span>
                <Badge className="bg-green-100 text-green-800">مفعّل</Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* محرر النماذج */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>محرر النماذج</CardTitle>
            <Button variant="outline" size="sm">
              <FileUp className="h-4 w-4 ml-1" />
              حفظ النموذج
            </Button>
          </div>
          <CardDescription>تحرير وتخصيص النماذج باستخدام محرر النماذج المتقدم</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="template-name" className="text-sm font-medium">اسم النموذج</label>
                <Input id="template-name" placeholder="أدخل اسم النموذج" />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="template-type" className="text-sm font-medium">نوع النموذج</label>
                <select className="w-full p-2 border rounded-md">
                  <option value="invoice">فاتورة</option>
                  <option value="contract">عقد</option>
                  <option value="report">تقرير</option>
                  <option value="receipt">إيصال</option>
                </select>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="template-content" className="text-sm font-medium">محتوى النموذج</label>
                <Textarea id="template-content" className="min-h-[200px] font-mono" placeholder="أدخل محتوى النموذج هنا..."></Textarea>
                <p className="text-xs text-muted-foreground">يمكنك استخدام المتغيرات المتاحة بالصيغة {{"{{variable_name}}"}}.</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">خيارات النموذج</label>
                <div className="p-4 border rounded-md space-y-4">
                  <div className="flex items-center justify-between">
                    <span>إظهار شعار الشركة</span>
                    <input type="checkbox" checked className="h-4 w-4" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span>إظهار توقيع رقمي</span>
                    <input type="checkbox" className="h-4 w-4" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span>إظهار الختم الرسمي</span>
                    <input type="checkbox" className="h-4 w-4" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span>تضمين الشروط والأحكام</span>
                    <input type="checkbox" checked className="h-4 w-4" />
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">الربط بالعمليات</label>
                <div className="p-4 border rounded-md space-y-4">
                  <div className="flex items-center justify-between">
                    <span>طباعة تلقائية عند إنشاء فاتورة</span>
                    <input type="checkbox" checked className="h-4 w-4" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span>إرسال بالبريد الإلكتروني تلقائياً</span>
                    <input type="checkbox" className="h-4 w-4" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span>حفظ نسخة في الأرشيف</span>
                    <input type="checkbox" checked className="h-4 w-4" />
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">معاينة سريعة</label>
                <div className="p-4 border rounded-md h-[100px] flex items-center justify-center bg-gray-50">
                  <Button>
                    <Eye className="h-4 w-4 ml-1" />
                    معاينة النموذج
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PrintTemplates;