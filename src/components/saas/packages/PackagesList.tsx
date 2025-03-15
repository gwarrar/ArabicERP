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
  DialogFooter,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Search,
  Plus,
  Edit,
  Trash,
  MoreHorizontal,
  X,
  Check,
  Package,
} from "lucide-react";
import PackageDetails from "./PackageDetails";
import PackageForm from "./PackageForm";

// بيانات تجريبية للباقات
const packagesData = [
  {
    id: "pkg-001",
    name: "الباقة الأساسية",
    description: "باقة أساسية للشركات الصغيرة",
    monthlyPrice: 300,
    yearlyPrice: 3240, // 10% خصم
    status: "نشط",
    features: [
      { name: "المبيعات", included: true },
      { name: "المشتريات", included: true },
      { name: "المخزون", included: true },
      { name: "المحاسبة", included: true },
      { name: "التقارير", included: true },
      { name: "إدارة العملاء", included: true },
      { name: "الموارد البشرية", included: false },
      { name: "التصنيع", included: false },
    ],
    limits: {
      users: 5,
      storage: "5 GB",
      customers: 100,
      products: 500,
    },
    createdAt: "2024-01-01",
    updatedAt: "2024-01-01",
  },
  {
    id: "pkg-002",
    name: "الباقة المتقدمة",
    description: "باقة متقدمة للشركات المتوسطة",
    monthlyPrice: 400,
    yearlyPrice: 4320, // 10% خصم
    status: "نشط",
    features: [
      { name: "المبيعات", included: true },
      { name: "المشتريات", included: true },
      { name: "المخزون", included: true },
      { name: "المحاسبة", included: true },
      { name: "التقارير", included: true },
      { name: "إدارة العملاء", included: true },
      { name: "الموارد البشرية", included: true },
      { name: "التصنيع", included: false },
    ],
    limits: {
      users: 15,
      storage: "20 GB",
      customers: 500,
      products: 2000,
    },
    createdAt: "2024-01-01",
    updatedAt: "2024-02-15",
  },
  {
    id: "pkg-003",
    name: "الباقة المتكاملة",
    description: "باقة شاملة للشركات الكبيرة",
    monthlyPrice: 500,
    yearlyPrice: 5400, // 10% خصم
    status: "نشط",
    features: [
      { name: "المبيعات", included: true },
      { name: "المشتريات", included: true },
      { name: "المخزون", included: true },
      { name: "المحاسبة", included: true },
      { name: "التقارير", included: true },
      { name: "إدارة العملاء", included: true },
      { name: "الموارد البشرية", included: true },
      { name: "التصنيع", included: true },
    ],
    limits: {
      users: 50,
      storage: "100 GB",
      customers: "غير محدود",
      products: "غير محدود",
    },
    createdAt: "2024-01-01",
    updatedAt: "2024-03-10",
  },
  {
    id: "pkg-004",
    name: "باقة المؤسسات",
    description: "باقة مخصصة للمؤسسات الكبرى",
    monthlyPrice: 1000,
    yearlyPrice: 10800, // 10% خصم
    status: "غير نشط",
    features: [
      { name: "المبيعات", included: true },
      { name: "المشتريات", included: true },
      { name: "المخزون", included: true },
      { name: "المحاسبة", included: true },
      { name: "التقارير", included: true },
      { name: "إدارة العملاء", included: true },
      { name: "الموارد البشرية", included: true },
      { name: "التصنيع", included: true },
    ],
    limits: {
      users: 200,
      storage: "500 GB",
      customers: "غير محدود",
      products: "غير محدود",
    },
    createdAt: "2024-02-01",
    updatedAt: "2024-02-01",
  },
];

const PackagesList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showPackageDetails, setShowPackageDetails] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<any>(null);
  const [showPackageForm, setShowPackageForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  // تصفية الباقات بناءً على البحث
  const filteredPackages = packagesData.filter((pkg) => {
    return (
      pkg.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pkg.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  // فتح نموذج إضافة باقة جديدة
  const handleAddPackage = () => {
    setIsEditing(false);
    setSelectedPackage(null);
    setShowPackageForm(true);
  };

  // فتح نموذج تعديل باقة
  const handleEditPackage = (pkg: any, e: React.MouseEvent) => {
    e.stopPropagation();
    setIsEditing(true);
    setSelectedPackage(pkg);
    setShowPackageForm(true);
  };

  // فتح مربع حوار تأكيد الحذف
  const handleDeleteClick = (pkg: any, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedPackage(pkg);
    setShowDeleteConfirm(true);
  };

  // تنفيذ حذف الباقة
  const confirmDelete = () => {
    // هنا يمكن إضافة منطق حذف الباقة من قاعدة البيانات
    setShowDeleteConfirm(false);
    // تحديث واجهة المستخدم بعد الحذف
  };

  // عرض تفاصيل الباقة
  const handlePackageClick = (pkg: any) => {
    setSelectedPackage(pkg);
    setShowPackageDetails(true);
  };

  // حفظ الباقة (إضافة أو تعديل)
  const handleSavePackage = (packageData: any) => {
    // هنا يمكن إضافة منطق حفظ الباقة في قاعدة البيانات
    setShowPackageForm(false);
    // تحديث واجهة المستخدم بعد الحفظ
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">إدارة الباقات والتسعير</h2>
        <Button onClick={handleAddPackage}>
          <Plus className="ml-2 h-4 w-4" />
          باقة جديدة
        </Button>
      </div>

      {/* شريط البحث */}
      <div className="flex items-center gap-2">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="بحث عن باقة..."
            className="pr-9"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* جدول الباقات */}
      <Card>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>اسم الباقة</TableHead>
                <TableHead>الوصف</TableHead>
                <TableHead>السعر الشهري</TableHead>
                <TableHead>السعر السنوي</TableHead>
                <TableHead>الحالة</TableHead>
                <TableHead>الوحدات المتاحة</TableHead>
                <TableHead>الإجراءات</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPackages.length > 0 ? (
                filteredPackages.map((pkg) => (
                  <TableRow
                    key={pkg.id}
                    className="cursor-pointer hover:bg-muted/30"
                    onClick={() => handlePackageClick(pkg)}
                  >
                    <TableCell className="font-medium">{pkg.name}</TableCell>
                    <TableCell className="max-w-[200px] truncate">
                      {pkg.description}
                    </TableCell>
                    <TableCell>₴ {pkg.monthlyPrice.toLocaleString()}</TableCell>
                    <TableCell>₴ {pkg.yearlyPrice.toLocaleString()}</TableCell>
                    <TableCell>
                      <span
                        className={`px-2 py-1 text-xs rounded-full ${pkg.status === "نشط" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}
                      >
                        {pkg.status}
                      </span>
                    </TableCell>
                    <TableCell>
                      {pkg.features.filter((f: any) => f.included).length} من{" "}
                      {pkg.features.length}
                    </TableCell>
                    <TableCell>
                      <div
                        className="flex items-center gap-2"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={(e) => handleEditPackage(pkg, e)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={(e) => handleDeleteClick(pkg, e)}
                        >
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={7}
                    className="h-24 text-center text-muted-foreground"
                  >
                    <div className="flex flex-col items-center justify-center">
                      <Package className="h-12 w-12 mb-2 opacity-20" />
                      <p>لا توجد باقات مطابقة للبحث</p>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </Card>

      {/* مربع حوار تفاصيل الباقة */}
      {selectedPackage && (
        <PackageDetails
          open={showPackageDetails}
          onClose={() => setShowPackageDetails(false)}
          onEdit={() => {
            setShowPackageDetails(false);
            setIsEditing(true);
            setShowPackageForm(true);
          }}
          packageData={selectedPackage}
        />
      )}

      {/* نموذج إضافة/تعديل باقة */}
      <PackageForm
        open={showPackageForm}
        onClose={() => setShowPackageForm(false)}
        onSave={handleSavePackage}
        packageData={isEditing ? selectedPackage : null}
        isEditing={isEditing}
      />

      {/* مربع حوار تأكيد الحذف */}
      <Dialog open={showDeleteConfirm} onOpenChange={setShowDeleteConfirm}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">تأكيد الحذف</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p>
              هل أنت متأكد من رغبتك في حذف الباقة{" "}
              <span className="font-bold">{selectedPackage?.name || ""}</span>؟
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              سيؤدي هذا الإجراء إلى حذف الباقة بشكل نهائي وقد يؤثر على المشتركين
              الحاليين.
            </p>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowDeleteConfirm(false)}
            >
              إلغاء
            </Button>
            <Button variant="destructive" onClick={confirmDelete}>
              تأكيد الحذف
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PackagesList;
