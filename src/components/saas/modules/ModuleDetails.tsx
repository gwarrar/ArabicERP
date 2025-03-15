import React, { useState } from "react";
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
  ShoppingCart,
  Truck,
  Package,
  BarChart3,
  FileText,
  Users,
  Factory,
  Edit,
  Check,
  X,
  AlertTriangle,
  Layers,
  Settings,
} from "lucide-react";
import { Module } from "@/types/saas";
import { packagesData, modulePackageAssignments } from "@/data/modules";

interface ModuleDetailsProps {
  open: boolean;
  onClose: () => void;
  onEdit: () => void;
  module: Module;
}

const ModuleDetails: React.FC<ModuleDetailsProps> = ({
  open,
  onClose,
  onEdit,
  module,
}) => {
  const [activeTab, setActiveTab] = useState("overview");

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

  // الحصول على الباقات التي تتضمن هذه الوحدة
  const getPackagesWithModule = () => {
    const assignments = modulePackageAssignments.filter(
      (assignment) => assignment.moduleId === module.id,
    );

    return assignments.map((assignment) => {
      const packageData = packagesData.find(
        (pkg) => pkg.id === assignment.packageId,
      );
      return {
        ...packageData,
        isEnabled: assignment.isEnabled,
      };
    });
  };

  const packagesWithModule = getPackagesWithModule();

  return (
    <Dialog open={open} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-auto">
        <DialogHeader>
          <div className="flex justify-between items-center">
            <DialogTitle className="text-xl font-bold flex items-center gap-2">
              {getModuleIcon(module.icon)}
              <span>{module.name}</span>
            </DialogTitle>
          </div>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="overview">
              <Layers className="h-4 w-4 ml-2" />
              نظرة عامة
            </TabsTrigger>
            <TabsTrigger value="features">
              <Settings className="h-4 w-4 ml-2" />
              الميزات
            </TabsTrigger>
            <TabsTrigger value="packages">
              <Package className="h-4 w-4 ml-2" />
              الباقات
            </TabsTrigger>
          </TabsList>

          {/* نظرة عامة */}
          <TabsContent value="overview" className="space-y-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">معلومات الوحدة</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">الاسم:</span>
                      <span className="font-medium">{module.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">المعرف:</span>
                      <span className="font-mono text-sm">{module.id}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">الحالة:</span>
                      <span
                        className={`px-2 py-1 text-xs rounded-full ${module.status === "active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}
                      >
                        {module.status === "active" ? "نشط" : "غير نشط"}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        وحدة أساسية:
                      </span>
                      <span>
                        {module.requiredForCore ? (
                          <Check className="h-5 w-5 text-green-600" />
                        ) : (
                          <X className="h-5 w-5 text-red-600" />
                        )}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        عدد الميزات:
                      </span>
                      <span>{module.features.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        الباقات المتاحة:
                      </span>
                      <span>
                        {
                          packagesWithModule.filter((pkg) => pkg.isEnabled)
                            .length
                        }
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  <span className="text-muted-foreground">الوصف:</span>
                  <p className="mt-1">{module.description}</p>
                </div>

                {module.dependencies && module.dependencies.length > 0 && (
                  <div>
                    <span className="text-muted-foreground">الاعتماديات:</span>
                    <div className="flex gap-2 mt-1">
                      {module.dependencies.map((dep) => (
                        <span
                          key={dep}
                          className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full"
                        >
                          {dep}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {module.requiredForCore && (
                  <div className="flex items-start gap-2 p-3 bg-amber-50 text-amber-800 rounded-md">
                    <AlertTriangle className="h-5 w-5 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium">وحدة أساسية</p>
                      <p className="text-sm">
                        هذه الوحدة أساسية لعمل النظام ولا يمكن تعطيلها في أي
                        باقة.
                      </p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* الميزات */}
          <TabsContent value="features">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">ميزات الوحدة</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>المعرف</TableHead>
                      <TableHead>الميزة</TableHead>
                      <TableHead>الوصف</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {module.features.map((feature) => (
                      <TableRow key={feature.id}>
                        <TableCell className="font-mono text-sm">
                          {feature.id}
                        </TableCell>
                        <TableCell className="font-medium">
                          {feature.name}
                        </TableCell>
                        <TableCell>{feature.description}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* الباقات */}
          <TabsContent value="packages">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">
                  الباقات التي تتضمن هذه الوحدة
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>الباقة</TableHead>
                      <TableHead>الوصف</TableHead>
                      <TableHead>السعر الشهري</TableHead>
                      <TableHead>الحالة</TableHead>
                      <TableHead>متاحة</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {packagesWithModule.map((pkg: any) => (
                      <TableRow key={pkg.id}>
                        <TableCell className="font-medium">
                          {pkg.name}
                        </TableCell>
                        <TableCell className="max-w-[300px] truncate">
                          {pkg.description}
                        </TableCell>
                        <TableCell>₴ {pkg.monthlyPrice}</TableCell>
                        <TableCell>
                          <span
                            className={`px-2 py-1 text-xs rounded-full ${pkg.status === "نشط" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}
                          >
                            {pkg.status}
                          </span>
                        </TableCell>
                        <TableCell>
                          {pkg.isEnabled ? (
                            <Check className="h-5 w-5 text-green-600" />
                          ) : (
                            <X className="h-5 w-5 text-red-600" />
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
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

export default ModuleDetails;
