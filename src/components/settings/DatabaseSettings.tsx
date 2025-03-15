import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Database,
  Server,
  HardDrive,
  RefreshCw,
  Download,
  Upload,
  Calendar,
  CheckCircle,
  XCircle,
  Save,
  Plus,
  Edit,
  Trash,
  Search,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const DatabaseSettings = () => {
  const [activeTab, setActiveTab] = useState("connection");
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">
            إعدادات قاعدة البيانات والنسخ الاحتياطي
          </h2>
          <p className="text-muted-foreground">
            إدارة اتصال قاعدة البيانات والنسخ الاحتياطية
          </p>
        </div>
        <Button>
          <Save className="ml-2 h-4 w-4" />
          حفظ الإعدادات
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="connection">
            <Database className="h-4 w-4 ml-2" />
            اتصال قاعدة البيانات
          </TabsTrigger>
          <TabsTrigger value="backup">
            <HardDrive className="h-4 w-4 ml-2" />
            النسخ الاحتياطي
          </TabsTrigger>
          <TabsTrigger value="tables">
            <Server className="h-4 w-4 ml-2" />
            جداول قاعدة البيانات
          </TabsTrigger>
        </TabsList>

        <TabsContent value="connection" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>إعدادات اتصال قاعدة البيانات</CardTitle>
              <CardDescription>
                تكوين اتصال قاعدة البيانات الخاصة بالنظام
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">
                      نوع قاعدة البيانات
                    </label>
                    <Select defaultValue="mysql">
                      <SelectTrigger>
                        <SelectValue placeholder="اختر نوع قاعدة البيانات" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="mysql">MySQL</SelectItem>
                        <SelectItem value="postgresql">PostgreSQL</SelectItem>
                        <SelectItem value="mongodb">MongoDB</SelectItem>
                        <SelectItem value="sqlite">SQLite</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">اسم المضيف</label>
                    <Input placeholder="localhost" defaultValue="localhost" />
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">اسم المستخدم</label>
                    <Input placeholder="root" defaultValue="root" />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">كلمة المرور</label>
                    <Input
                      type="password"
                      placeholder="********"
                      defaultValue="password"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="backup" className="space-y-4">
          <div className="flex justify-between items-center">
            <div className="flex gap-2">
              <Button>
                <Plus className="ml-2 h-4 w-4" />
                إنشاء نسخة احتياطية
              </Button>
              <Button variant="outline">
                <Upload className="ml-2 h-4 w-4" />
                استعادة نسخة احتياطية
              </Button>
            </div>
            <div className="flex gap-2">
              <Button variant="outline">
                <Calendar className="ml-2 h-4 w-4" />
                جدولة النسخ الاحتياطي
              </Button>
            </div>
          </div>

          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>النسخ الاحتياطية</CardTitle>
                  <CardDescription>
                    قائمة النسخ الاحتياطية المتوفرة
                  </CardDescription>
                </div>
                <div className="relative w-64">
                  <Search className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="بحث عن نسخة احتياطية..."
                    className="pr-9"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="border rounded-md overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>الاسم</TableHead>
                      <TableHead>التاريخ</TableHead>
                      <TableHead>الحجم</TableHead>
                      <TableHead>النوع</TableHead>
                      <TableHead>الحالة</TableHead>
                      <TableHead>المستخدم</TableHead>
                      <TableHead>الإجراءات</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">
                        نسخة احتياطية كاملة
                      </TableCell>
                      <TableCell>2024-08-15 09:30</TableCell>
                      <TableCell>1.2 GB</TableCell>
                      <TableCell>كامل</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                          <Badge className="bg-green-100 text-green-800">
                            مكتمل
                          </Badge>
                        </div>
                      </TableCell>
                      <TableCell>أحمد محمد</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Button variant="ghost" size="icon">
                            <Upload className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <Download className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <Trash className="h-4 w-4 text-red-500" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">
                        نسخة احتياطية تزايدية
                      </TableCell>
                      <TableCell>2024-08-14 14:45</TableCell>
                      <TableCell>450 MB</TableCell>
                      <TableCell>تزايدي</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                          <Badge className="bg-green-100 text-green-800">
                            مكتمل
                          </Badge>
                        </div>
                      </TableCell>
                      <TableCell>محمد علي</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Button variant="ghost" size="icon">
                            <Upload className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <Download className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <Trash className="h-4 w-4 text-red-500" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tables" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>جداول قاعدة البيانات</CardTitle>
                  <CardDescription>
                    قائمة الجداول في قاعدة البيانات
                  </CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline">
                    <RefreshCw className="ml-2 h-4 w-4" />
                    تحديث
                  </Button>
                  <Button variant="outline">
                    <Download className="ml-2 h-4 w-4" />
                    تصدير هيكل قاعدة البيانات
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="border rounded-md overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>اسم الجدول</TableHead>
                      <TableHead>عدد الصفوف</TableHead>
                      <TableHead>الحجم</TableHead>
                      <TableHead>آخر تحديث</TableHead>
                      <TableHead>الإجراءات</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">users</TableCell>
                      <TableCell>1,250</TableCell>
                      <TableCell>45 MB</TableCell>
                      <TableCell>2024-08-15 14:30</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Button variant="ghost" size="icon">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <Download className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <RefreshCw className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">products</TableCell>
                      <TableCell>5,430</TableCell>
                      <TableCell>120 MB</TableCell>
                      <TableCell>2024-08-15 12:15</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Button variant="ghost" size="icon">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <Download className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <RefreshCw className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DatabaseSettings;
