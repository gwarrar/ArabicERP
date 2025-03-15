import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Factory,
  FileText,
  Package,
  Clipboard,
  Settings,
  BarChart3,
  Layers,
  Wrench,
  Calendar,
  Users,
  Truck,
  ShoppingCart,
  Workflow,
  Gauge,
  Boxes,
  AlertTriangle,
  CheckCircle,
  Clock,
  PlusCircle,
  ListChecks,
  Cog,
} from "lucide-react";

interface ManufacturingQuickLinksProps {
  onOpenProductionOrder?: () => void;
  onOpenBOM?: () => void;
  onOpenWorkCenters?: () => void;
  onOpenOperations?: () => void;
  onOpenPlanning?: () => void;
  onOpenMRP?: () => void;
  onOpenInventory?: () => void;
  onOpenPerformance?: () => void;
}

const ManufacturingQuickLinks: React.FC<ManufacturingQuickLinksProps> = ({
  onOpenProductionOrder,
  onOpenBOM,
  onOpenWorkCenters,
  onOpenOperations,
  onOpenPlanning,
  onOpenMRP,
  onOpenInventory,
  onOpenPerformance,
}) => {
  // تنفيذ الإجراء مع التحقق من وجود الدالة
  const handleAction = (action?: () => void) => {
    if (action) {
      action();
    }
  };

  return (
    <Card className="bg-white dark:bg-[#1e1e2d] dark:text-white">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-bold">روابط سريعة</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <Button
            variant="outline"
            className="h-auto flex flex-col items-center justify-center p-4 hover:bg-blue-50 hover:text-blue-700 hover:border-blue-200 transition-colors"
            onClick={() => handleAction(onOpenProductionOrder)}
          >
            <Clipboard className="h-8 w-8 mb-2 text-blue-600" />
            <span className="text-sm font-medium">أمر إنتاج جديد</span>
          </Button>

          <Button
            variant="outline"
            className="h-auto flex flex-col items-center justify-center p-4 hover:bg-green-50 hover:text-green-700 hover:border-green-200 transition-colors"
            onClick={() => handleAction(onOpenBOM)}
          >
            <Layers className="h-8 w-8 mb-2 text-green-600" />
            <span className="text-sm font-medium">قائمة المواد</span>
          </Button>

          <Button
            variant="outline"
            className="h-auto flex flex-col items-center justify-center p-4 hover:bg-purple-50 hover:text-purple-700 hover:border-purple-200 transition-colors"
            onClick={() => handleAction(onOpenWorkCenters)}
          >
            <Factory className="h-8 w-8 mb-2 text-purple-600" />
            <span className="text-sm font-medium">مراكز العمل</span>
          </Button>

          <Button
            variant="outline"
            className="h-auto flex flex-col items-center justify-center p-4 hover:bg-amber-50 hover:text-amber-700 hover:border-amber-200 transition-colors"
            onClick={() => handleAction(onOpenOperations)}
          >
            <Wrench className="h-8 w-8 mb-2 text-amber-600" />
            <span className="text-sm font-medium">عمليات الإنتاج</span>
          </Button>

          <Button
            variant="outline"
            className="h-auto flex flex-col items-center justify-center p-4 hover:bg-rose-50 hover:text-rose-700 hover:border-rose-200 transition-colors"
            onClick={() => handleAction(onOpenPlanning)}
          >
            <Calendar className="h-8 w-8 mb-2 text-rose-600" />
            <span className="text-sm font-medium">تخطيط الإنتاج</span>
          </Button>

          <Button
            variant="outline"
            className="h-auto flex flex-col items-center justify-center p-4 hover:bg-indigo-50 hover:text-indigo-700 hover:border-indigo-200 transition-colors"
            onClick={() => handleAction(onOpenMRP)}
          >
            <Truck className="h-8 w-8 mb-2 text-indigo-600" />
            <span className="text-sm font-medium">تخطيط المواد</span>
          </Button>

          <Button
            variant="outline"
            className="h-auto flex flex-col items-center justify-center p-4 hover:bg-cyan-50 hover:text-cyan-700 hover:border-cyan-200 transition-colors"
            onClick={() => handleAction(onOpenInventory)}
          >
            <Package className="h-8 w-8 mb-2 text-cyan-600" />
            <span className="text-sm font-medium">المخزون</span>
          </Button>

          <Button
            variant="outline"
            className="h-auto flex flex-col items-center justify-center p-4 hover:bg-teal-50 hover:text-teal-700 hover:border-teal-200 transition-colors"
            onClick={() => handleAction(onOpenPerformance)}
          >
            <Gauge className="h-8 w-8 mb-2 text-teal-600" />
            <span className="text-sm font-medium">أداء الإنتاج</span>
          </Button>
        </div>

        <div className="mt-6">
          <h3 className="text-sm font-medium mb-3">أوامر الإنتاج النشطة</h3>
          <div className="space-y-2">
            <div className="flex items-center justify-between p-2 rounded-md border hover:bg-gray-50 cursor-pointer">
              <div className="flex items-center">
                <div className="p-2 bg-blue-100 rounded-md ml-3">
                  <Clipboard className="h-4 w-4 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium text-sm">
                    أمر إنتاج #PRO-2024-0042
                  </p>
                  <p className="text-xs text-muted-foreground">
                    قميص رجالي - كمية: 500
                  </p>
                </div>
              </div>
              <Badge className="bg-amber-100 text-amber-800 border-amber-200">
                قيد التنفيذ
              </Badge>
            </div>

            <div className="flex items-center justify-between p-2 rounded-md border hover:bg-gray-50 cursor-pointer">
              <div className="flex items-center">
                <div className="p-2 bg-green-100 rounded-md ml-3">
                  <Clipboard className="h-4 w-4 text-green-600" />
                </div>
                <div>
                  <p className="font-medium text-sm">
                    أمر إنتاج #PRO-2024-0038
                  </p>
                  <p className="text-xs text-muted-foreground">
                    بنطلون جينز - كمية: 300
                  </p>
                </div>
              </div>
              <Badge className="bg-blue-100 text-blue-800 border-blue-200">
                مرحلة القص
              </Badge>
            </div>

            <div className="flex items-center justify-between p-2 rounded-md border hover:bg-gray-50 cursor-pointer">
              <div className="flex items-center">
                <div className="p-2 bg-purple-100 rounded-md ml-3">
                  <Clipboard className="h-4 w-4 text-purple-600" />
                </div>
                <div>
                  <p className="font-medium text-sm">
                    أمر إنتاج #PRO-2024-0035
                  </p>
                  <p className="text-xs text-muted-foreground">
                    فستان نسائي - كمية: 200
                  </p>
                </div>
              </div>
              <Badge className="bg-purple-100 text-purple-800 border-purple-200">
                مرحلة الخياطة
              </Badge>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <h3 className="text-sm font-medium mb-3">تنبيهات الإنتاج</h3>
          <div className="space-y-2">
            <div className="flex items-center justify-between p-2 rounded-md border hover:bg-gray-50 cursor-pointer">
              <div className="flex items-center">
                <div className="p-2 bg-red-100 rounded-md ml-3">
                  <AlertTriangle className="h-4 w-4 text-red-600" />
                </div>
                <div>
                  <p className="font-medium text-sm">
                    نقص في المواد - أمر إنتاج #PRO-2024-0042
                  </p>
                  <p className="text-xs text-muted-foreground">
                    نقص في القماش القطني الأبيض
                  </p>
                </div>
              </div>
              <Button variant="outline" size="sm" className="h-8">
                طلب مواد
              </Button>
            </div>

            <div className="flex items-center justify-between p-2 rounded-md border hover:bg-gray-50 cursor-pointer">
              <div className="flex items-center">
                <div className="p-2 bg-amber-100 rounded-md ml-3">
                  <Clock className="h-4 w-4 text-amber-600" />
                </div>
                <div>
                  <p className="font-medium text-sm">
                    تأخير في الإنتاج - أمر إنتاج #PRO-2024-0038
                  </p>
                  <p className="text-xs text-muted-foreground">
                    تأخير بمقدار 2 يوم عن الجدول الزمني
                  </p>
                </div>
              </div>
              <Button variant="outline" size="sm" className="h-8">
                تعديل الجدول
              </Button>
            </div>

            <div className="flex items-center justify-between p-2 rounded-md border hover:bg-gray-50 cursor-pointer">
              <div className="flex items-center">
                <div className="p-2 bg-green-100 rounded-md ml-3">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                </div>
                <div>
                  <p className="font-medium text-sm">
                    اكتمال مرحلة - أمر إنتاج #PRO-2024-0035
                  </p>
                  <p className="text-xs text-muted-foreground">
                    اكتملت مرحلة القص بنجاح
                  </p>
                </div>
              </div>
              <Button variant="outline" size="sm" className="h-8">
                المرحلة التالية
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ManufacturingQuickLinks;
