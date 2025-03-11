import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
  Package,
  Check,
  X,
  Users,
  Database,
  ShoppingCart,
  Edit,
  Calendar,
} from "lucide-react";

interface PackageDetailsProps {
  open: boolean;
  onClose: () => void;
  onEdit: () => void;
  packageData: any;
}

const PackageDetails: React.FC<PackageDetailsProps> = ({
  open,
  onClose,
  onEdit,
  packageData,
}) => {
  const [activeTab, setActiveTab] = React.useState("overview");

  if (!packageData) return null;

  // حساب عدد المشتركين (بيانات تجريبية)
  const subscribersCount = Math.floor(Math.random() * 50) + 1;

  // بيانات تجريبية للمشتركين
  const subscribers = Array.from({ length: subscribersCount }, (_, i) => ({
    id: `sub-${i + 1}`,
    name: `شركة ${i + 1}`,
    startDate: new Date(
      2024,
      Math.floor(Math.random() * 6),
      Math.floor(Math.random() * 28) + 1,
    ).toISOString(),
    endDate: new Date(
      2025,
      Math.floor(Math.random() * 6),
      Math.floor(Math.random() * 28) + 1,
    ).toISOString(),
    status: Math.random() > 0.2 ? "نشط" : "منتهي",
  }));

  // تنسيق التاريخ
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("ar-SA");
  };

  return (
    <Dialog open={open} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-auto">
        <DialogHeader>
          <div className="flex justify-between items-center">
            <DialogTitle className="text-xl font-bold">
              {packageData.name}
            </DialogTitle>
          </div>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="overview">
              <Package className="h-4 w-4 ml-2" />
              نظرة عامة
            </TabsTrigger>
            <TabsTrigger value="features">
              <Check className="h-4 w-4 ml-2" />
              الميزات والوحدات
            </TabsTrigger>
            <TabsTrigger value="subscribers">
              <Users className="h-4 w-4 ml-2" />
              المشتركين
            </TabsTrigger>
          </TabsList>

          {/* نظرة عامة */}
          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">معلومات الباقة</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">الاسم:</span>
                    <span className="font-medium">{packageData.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">الوصف:</span>
                    <span>{packageData.description}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">الحالة:</span>
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${packageData.status === "نشط" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}
                    >
                      {packageData.status}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      تاريخ الإنشاء:
                    </span>
                    <span>{formatDate(packageData.createdAt)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">آخر تحديث:</span>
                    <span>{formatDate(packageData.updatedAt)}</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">معلومات التسعير</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">السعر الشهري:</span>
                    <span className="font-medium">
                      ₴ {packageData.monthlyPrice.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">السعر السنوي:</span>
                    <span className="font-medium">
                      ₴ {packageData.yearlyPrice.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">الخصم السنوي:</span>
                    <span className="text-green-600">
                      {Math.round(
                        100 -
                          (packageData.yearlyPrice /
                            (packageData.monthlyPrice * 12)) *
                            100,
                      )}
                      %
                    </span>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">حدود الاستخدام</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="border rounded-md p-3 text-center">
                    <Users className="h-5 w-5 mx-auto mb-1 text-blue-500" />
                    <p className="text-sm text-muted-foreground">المستخدمين</p>
                    <p className="font-medium">{packageData.limits.users}</p>
                  </div>
                  <div className="border rounded-md p-3 text-center">
                    <Database className="h-5 w-5 mx-auto mb-1 text-blue-500" />
                    <p className="text-sm text-muted-foreground">المساحة</p>
                    <p className="font-medium">{packageData.limits.storage}</p>
                  </div>
                  <div className="border rounded-md p-3 text-center">
                    <Users className="h-5 w-5 mx-auto mb-1 text-blue-500" />
                    <p className="text-sm text-muted-foreground">العملاء</p>
                    <p className="font-medium">
                      {packageData.limits.customers}
                    </p>
                  </div>
                  <div className="border rounded-md p-3 text-center">
                    <ShoppingCart className="h-5 w-5 mx-auto mb-1 text-blue-500" />
                    <p className="text-sm text-muted-foreground">المنتجات</p>
                    <p className="font-medium">{packageData.limits.products}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">إحصائيات الباقة</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="border rounded-md p-3 text-center">
                    <Users className="h-5 w-5 mx-auto mb-1 text-blue-500" />
                    <p className="text-sm text-muted-foreground">
                      عدد المشتركين
                    </p>
                    <p className="text-xl font-medium">{subscribersCount}</p>
                  </div>
                  <div className="border rounded-md p-3 text-center">
                    <Calendar className="h-5 w-5 mx-auto mb-1 text-blue-500" />
                    <p className="text-sm text-muted-foreground">
                      متوسط مدة الاشتراك
                    </p>
                    <p className="text-xl font-medium">9.5 شهر</p>
                  </div>
                  <div className="border rounded-md p-3 text-center">
                    <ShoppingCart className="h-5 w-5 mx-auto mb-1 text-blue-500" />
                    <p className="text-sm text-muted-foreground">
                      الإيرادات الشهرية
                    </p>
                    <p className="text-xl font-medium">
                      ₴{" "}
                      {(
                        packageData.monthlyPrice * subscribersCount
                      ).toLocaleString()}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* الميزات والوحدات */}
          <TabsContent value="features">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">الوحدات المتاحة</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {packageData.features.map((feature: any, index: number) => (
                    <div
                      key={index}
                      className={`flex items-center justify-between p-3 border rounded-md ${feature.included ? "bg-green-50" : "bg-gray-50"}`}
                    >
                      <span>{feature.name}</span>
                      {feature.included ? (
                        <Check className="h-5 w-5 text-green-600" />
                      ) : (
                        <X className="h-5 w-5 text-red-600" />
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* المشتركين */}
          <TabsContent value="subscribers">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">قائمة المشتركين</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>اسم المشترك</TableHead>
                      <TableHead>تاريخ البدء</TableHead>
                      <TableHead>تاريخ الانتهاء</TableHead>
                      <TableHead>الحالة</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {subscribers.length > 0 ? (
                      subscribers.map((subscriber) => (
                        <TableRow key={subscriber.id}>
                          <TableCell className="font-medium">
                            {subscriber.name}
                          </TableCell>
                          <TableCell>
                            {formatDate(subscriber.startDate)}
                          </TableCell>
                          <TableCell>
                            {formatDate(subscriber.endDate)}
                          </TableCell>
                          <TableCell>
                            <span
                              className={`px-2 py-1 text-xs rounded-full ${subscriber.status === "نشط" ? "bg-green-100 text-green-800" : "bg-amber-100 text-amber-800"}`}
                            >
                              {subscriber.status}
                            </span>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell
                          colSpan={4}
                          className="text-center py-4 text-muted-foreground"
                        >
                          لا يوجد مشتركين في هذه الباقة
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <DialogFooter className="mt-6">
          <div className="flex gap-2 w-full justify-end">
            <Button variant="outline" onClick={onClose}>
              إغلاق
            </Button>
            <Button onClick={onEdit}>
              <Edit className="ml-2 h-4 w-4" />
              تعديل
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PackageDetails;
