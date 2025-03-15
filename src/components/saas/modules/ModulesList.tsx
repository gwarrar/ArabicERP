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
import { Switch } from "@/components/ui/switch";
import {
  Search,
  Plus,
  Edit,
  Trash,
  Eye,
  ShoppingCart,
  Truck,
  Package,
  BarChart3,
  FileText,
  Users,
  Factory,
  AlertTriangle,
  Check,
  X,
} from "lucide-react";
import { Module } from "@/types/saas";
import { modules } from "@/data/modules";
import ModuleDetails from "./ModuleDetails";

const ModulesList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showModuleDetails, setShowModuleDetails] = useState(false);
  const [selectedModule, setSelectedModule] = useState<Module | null>(null);
  const [showEditDialog, setShowEditDialog] = useState(false);

  // تصفية الوحدات بناءً على البحث
  const filteredModules = modules.filter((module) => {
    return (
      module.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      module.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  // عرض تفاصيل الوحدة
  const handleModuleClick = (module: Module) => {
    setSelectedModule(module);
    setShowModuleDetails(true);
  };

  // فتح نموذج تعديل الوحدة
  const handleEditModule = (module: Module, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedModule(module);
    setShowEditDialog(true);
  };

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

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">إدارة الوحدات</h2>
        <Button>
          <Plus className="ml-2 h-4 w-4" />
          وحدة جديدة
        </Button>
      </div>

      {/* شريط البحث */}
      <div className="flex items-center gap-2">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="بحث عن وحدة..."
            className="pr-9"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* جدول الوحدات */}
      <Card>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>الوحدة</TableHead>
                <TableHead>الوصف</TableHead>
                <TableHead>الميزات</TableHead>
                <TableHead>الحالة</TableHead>
                <TableHead>أساسية</TableHead>
                <TableHead>الإجراءات</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredModules.length > 0 ? (
                filteredModules.map((module) => (
                  <TableRow
                    key={module.id}
                    className="cursor-pointer hover:bg-muted/30"
                    onClick={() => handleModuleClick(module)}
                  >
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {getModuleIcon(module.icon)}
                        <span className="font-medium">{module.name}</span>
                      </div>
                    </TableCell>
                    <TableCell className="max-w-[300px] truncate">
                      {module.description}
                    </TableCell>
                    <TableCell>{module.features.length}</TableCell>
                    <TableCell>
                      <span
                        className={`px-2 py-1 text-xs rounded-full ${module.status === "active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}
                      >
                        {module.status === "active" ? "نشط" : "غير نشط"}
                      </span>
                    </TableCell>
                    <TableCell>
                      {module.requiredForCore ? (
                        <Check className="h-5 w-5 text-green-600" />
                      ) : (
                        <X className="h-5 w-5 text-red-600" />
                      )}
                    </TableCell>
                    <TableCell>
                      <div
                        className="flex items-center gap-2"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={(e) => handleEditModule(module, e)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    className="h-24 text-center text-muted-foreground"
                  >
                    <div className="flex flex-col items-center justify-center">
                      <Package className="h-12 w-12 mb-2 opacity-20" />
                      <p>لا توجد وحدات مطابقة للبحث</p>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </Card>

      {/* مربع حوار تفاصيل الوحدة */}
      {selectedModule && (
        <ModuleDetails
          open={showModuleDetails}
          onClose={() => setShowModuleDetails(false)}
          onEdit={() => {
            setShowModuleDetails(false);
            setShowEditDialog(true);
          }}
          module={selectedModule}
        />
      )}

      {/* نموذج تعديل الوحدة */}
      {selectedModule && (
        <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="text-xl font-bold">
                تعديل وحدة {selectedModule.name}
              </DialogTitle>
            </DialogHeader>
            <div className="py-4 space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">اسم الوحدة</label>
                <Input defaultValue={selectedModule.name} />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">الوصف</label>
                <Input defaultValue={selectedModule.description} />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">الحالة</label>
                <div className="flex items-center gap-2">
                  <Switch defaultChecked={selectedModule.status === "active"} />
                  <span>
                    {selectedModule.status === "active" ? "نشط" : "غير نشط"}
                  </span>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">وحدة أساسية</label>
                <div className="flex items-center gap-2">
                  <Switch defaultChecked={selectedModule.requiredForCore} />
                  <span>
                    {selectedModule.requiredForCore
                      ? "وحدة أساسية"
                      : "وحدة إضافية"}
                  </span>
                </div>
                {selectedModule.requiredForCore && (
                  <p className="text-xs text-amber-600 flex items-center gap-1 mt-1">
                    <AlertTriangle className="h-3 w-3" />
                    الوحدات الأساسية مطلوبة لعمل النظام ولا يمكن تعطيلها
                  </p>
                )}
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setShowEditDialog(false)}
              >
                إلغاء
              </Button>
              <Button onClick={() => setShowEditDialog(false)}>حفظ</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default ModulesList;
