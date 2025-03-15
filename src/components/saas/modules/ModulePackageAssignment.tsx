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
import { Switch } from "@/components/ui/switch";
import {
  Search,
  Filter,
  Save,
  AlertTriangle,
  ShoppingCart,
  Truck,
  Package,
  BarChart3,
  FileText,
  Users,
  Factory,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Module, ModulePackageAssignment } from "@/types/saas";
import {
  modules,
  packagesData,
  modulePackageAssignments,
} from "@/data/modules";

const ModulePackageAssignmentComponent = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [packageFilter, setPackageFilter] = useState("all");
  const [assignments, setAssignments] = useState<ModulePackageAssignment[]>(
    modulePackageAssignments,
  );

  // تصفية الوحدات بناءً على البحث والفلتر
  const filteredModules = modules.filter((module) => {
    const matchesSearch =
      searchTerm === "" ||
      module.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      module.description.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesSearch;
  });

  // الحصول على أيقونة الوحدة المناسبة
  const getModuleIcon = (iconName: string) => {
    switch (iconName) {
      case "shopping-cart":
        return <ShoppingCart className="h-5 w-5 text-blue-500" />;
      case "truck":
        return <Truck className="h-5 w-5 text-green-500" />;
      case "package":
        return <Package className="h-5 w-5 text-amber-500" />;
      case "bar-chart-3":
        return <BarChart3 className="h-5 w-5 text-purple-500" />;
      case "file-text":
        return <FileText className="h-5 w-5 text-gray-500" />;
      case "users":
        return <Users className="h-5 w-5 text-indigo-500" />;
      case "factory":
        return <Factory className="h-5 w-5 text-red-500" />;
      default:
        return <Package className="h-5 w-5 text-blue-500" />;
    }
  };

  // التحقق مما إذا كانت الوحدة متاحة في باقة معينة
  const isModuleEnabledForPackage = (moduleId: string, packageId: string) => {
    const assignment = assignments.find(
      (a) => a.moduleId === moduleId && a.packageId === packageId,
    );
    return assignment ? assignment.isEnabled : false;
  };

  // تحديث حالة تفعيل الوحدة في باقة معينة
  const toggleModuleForPackage = (
    moduleId: string,
    packageId: string,
    enabled: boolean,
  ) => {
    // التحقق مما إذا كانت الوحدة أساسية
    const module = modules.find((m) => m.id === moduleId);
    if (module?.requiredForCore && !enabled) {
      // لا يمكن تعطيل الوحدات الأساسية
      return;
    }

    setAssignments((prev) => {
      const newAssignments = [...prev];
      const index = newAssignments.findIndex(
        (a) => a.moduleId === moduleId && a.packageId === packageId,
      );

      if (index !== -1) {
        newAssignments[index] = {
          ...newAssignments[index],
          isEnabled: enabled,
        };
      } else {
        newAssignments.push({
          moduleId,
          packageId,
          isEnabled: enabled,
        });
      }

      return newAssignments;
    });
  };

  // حفظ التغييرات
  const saveChanges = () => {
    // هنا يمكن إضافة منطق لحفظ التغييرات في قاعدة البيانات
    console.log("Saving assignments:", assignments);
    // عرض رسالة نجاح
    alert("تم حفظ التغييرات بنجاح");
  };

  // الباقات النشطة فقط
  const activePackages = packagesData.filter((pkg) => pkg.status === "نشط");

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">تعيين الوحدات للباقات</h2>
        <Button onClick={saveChanges}>
          <Save className="ml-2 h-4 w-4" />
          حفظ التغييرات
        </Button>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        <div className="relative">
          <Search className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="بحث عن وحدة..."
            className="w-[200px] pr-9"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <Select value={packageFilter} onValueChange={setPackageFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="تصفية حسب الباقة" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">جميع الباقات</SelectItem>
            {activePackages.map((pkg) => (
              <SelectItem key={pkg.id} value={pkg.id}>
                {pkg.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            setSearchTerm("");
            setPackageFilter("all");
          }}
          className="h-10"
        >
          <Filter className="h-4 w-4 ml-1" />
          إعادة ضبط
        </Button>
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-md p-4 mb-4">
        <div className="flex items-start gap-2">
          <AlertTriangle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-medium text-amber-800">ملاحظة هامة</p>
            <p className="text-sm text-amber-700">
              الوحدات الأساسية مطلوبة لعمل النظام ولا يمكن تعطيلها في أي باقة.
              تغيير إعدادات الوحدات سيؤثر على جميع المشتركين في الباقات المعنية.
            </p>
          </div>
        </div>
      </div>

      <Card>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>الوحدة</TableHead>
                <TableHead>الوصف</TableHead>
                <TableHead>أساسية</TableHead>
                {activePackages.map((pkg) => (
                  <TableHead key={pkg.id} className="text-center">
                    {pkg.name}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredModules.map((module) => (
                <TableRow key={module.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {getModuleIcon(module.icon)}
                      <span className="font-medium">{module.name}</span>
                    </div>
                  </TableCell>
                  <TableCell className="max-w-[300px] truncate">
                    {module.description}
                  </TableCell>
                  <TableCell>
                    {module.requiredForCore ? (
                      <span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">
                        أساسية
                      </span>
                    ) : (
                      <span className="px-2 py-1 text-xs bg-gray-100 text-gray-800 rounded-full">
                        إضافية
                      </span>
                    )}
                  </TableCell>
                  {activePackages.map((pkg) => (
                    <TableCell key={pkg.id} className="text-center">
                      <Switch
                        checked={isModuleEnabledForPackage(module.id, pkg.id)}
                        onCheckedChange={(checked) =>
                          toggleModuleForPackage(module.id, pkg.id, checked)
                        }
                        disabled={module.requiredForCore}
                      />
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  );
};

export default ModulePackageAssignmentComponent;
