import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Truck,
  Package,
  ArrowRightLeft,
  Clipboard,
  Tag,
  Warehouse,
  Bookmark,
  BarChart3,
  QrCode,
  FileText,
  Clock,
  AlertTriangle,
  CheckCircle,
  Search,
  Map,
  Boxes,
  DollarSign,
} from "lucide-react";

interface InventoryQuickLinksProps {
  onOpenContainerReceiving?: () => void;
  onOpenStockTransfer?: () => void;
  onOpenInventoryCount?: () => void;
  onOpenReservations?: () => void;
  onOpenRFIDSystem?: () => void;
  onOpenWarehouseMap?: () => void;
  onOpenReports?: () => void;
  onOpenProductCategories?: () => void;
  onOpenPricing?: () => void;
}

const InventoryQuickLinks: React.FC<InventoryQuickLinksProps> = ({
  onOpenContainerReceiving,
  onOpenStockTransfer,
  onOpenInventoryCount,
  onOpenReservations,
  onOpenRFIDSystem,
  onOpenWarehouseMap,
  onOpenReports,
  onOpenProductCategories,
  onOpenPricing,
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
            onClick={() => handleAction(onOpenContainerReceiving)}
          >
            <Truck className="h-8 w-8 mb-2 text-blue-600" />
            <span className="text-sm font-medium">استلام كونتينر</span>
          </Button>

          <Button
            variant="outline"
            className="h-auto flex flex-col items-center justify-center p-4 hover:bg-green-50 hover:text-green-700 hover:border-green-200 transition-colors"
            onClick={() => handleAction(onOpenStockTransfer)}
          >
            <ArrowRightLeft className="h-8 w-8 mb-2 text-green-600" />
            <span className="text-sm font-medium">مناقلة المخزون</span>
          </Button>

          <Button
            variant="outline"
            className="h-auto flex flex-col items-center justify-center p-4 hover:bg-purple-50 hover:text-purple-700 hover:border-purple-200 transition-colors"
            onClick={() => handleAction(onOpenInventoryCount)}
          >
            <Clipboard className="h-8 w-8 mb-2 text-purple-600" />
            <span className="text-sm font-medium">جرد المخزون</span>
          </Button>

          <Button
            variant="outline"
            className="h-auto flex flex-col items-center justify-center p-4 hover:bg-amber-50 hover:text-amber-700 hover:border-amber-200 transition-colors"
            onClick={() => handleAction(onOpenReservations)}
          >
            <Bookmark className="h-8 w-8 mb-2 text-amber-600" />
            <span className="text-sm font-medium">الحجوزات</span>
          </Button>

          <Button
            variant="outline"
            className="h-auto flex flex-col items-center justify-center p-4 hover:bg-rose-50 hover:text-rose-700 hover:border-rose-200 transition-colors"
            onClick={() => handleAction(onOpenRFIDSystem)}
          >
            <Tag className="h-8 w-8 mb-2 text-rose-600" />
            <span className="text-sm font-medium">نظام RFID</span>
          </Button>

          <Button
            variant="outline"
            className="h-auto flex flex-col items-center justify-center p-4 hover:bg-indigo-50 hover:text-indigo-700 hover:border-indigo-200 transition-colors"
            onClick={() => handleAction(onOpenWarehouseMap)}
          >
            <Map className="h-8 w-8 mb-2 text-indigo-600" />
            <span className="text-sm font-medium">خريطة المستودع</span>
          </Button>

          <Button
            variant="outline"
            className="h-auto flex flex-col items-center justify-center p-4 hover:bg-cyan-50 hover:text-cyan-700 hover:border-cyan-200 transition-colors"
            onClick={() => handleAction(onOpenReports)}
          >
            <BarChart3 className="h-8 w-8 mb-2 text-cyan-600" />
            <span className="text-sm font-medium">التقارير</span>
          </Button>

          <Button
            variant="outline"
            className="h-auto flex flex-col items-center justify-center p-4 hover:bg-teal-50 hover:text-teal-700 hover:border-teal-200 transition-colors"
            onClick={() => handleAction(onOpenProductCategories)}
          >
            <Boxes className="h-8 w-8 mb-2 text-teal-600" />
            <span className="text-sm font-medium">مجموعات المنتجات</span>
          </Button>

          <Button
            variant="outline"
            className="h-auto flex flex-col items-center justify-center p-4 hover:bg-orange-50 hover:text-orange-700 hover:border-orange-200 transition-colors"
            onClick={() => handleAction(onOpenPricing)}
          >
            <DollarSign className="h-8 w-8 mb-2 text-orange-600" />
            <span className="text-sm font-medium">الأسعار والعروض</span>
          </Button>
        </div>

        <div className="mt-6">
          <h3 className="text-sm font-medium mb-3">طلبات الحجز والمناقلات</h3>
          <div className="space-y-2">
            <div className="flex items-center justify-between p-2 rounded-md border hover:bg-gray-50 cursor-pointer">
              <div className="flex items-center">
                <div className="p-2 bg-amber-100 rounded-md ml-3">
                  <Bookmark className="h-4 w-4 text-amber-600" />
                </div>
                <div>
                  <p className="font-medium text-sm">حجز #RES-2024-0018</p>
                  <p className="text-xs text-muted-foreground">
                    شركة الأمل للتجارة - قماش قطني أبيض
                  </p>
                </div>
              </div>
              <Button variant="outline" size="sm" className="h-8">
                عرض
              </Button>
            </div>

            <div className="flex items-center justify-between p-2 rounded-md border hover:bg-gray-50 cursor-pointer">
              <div className="flex items-center">
                <div className="p-2 bg-green-100 rounded-md ml-3">
                  <ArrowRightLeft className="h-4 w-4 text-green-600" />
                </div>
                <div>
                  <p className="font-medium text-sm">مناقلة #TRF-2024-0035</p>
                  <p className="text-xs text-muted-foreground">
                    من المستودع الرئيسي إلى مستودع الإنتاج
                  </p>
                </div>
              </div>
              <Button variant="outline" size="sm" className="h-8">
                متابعة
              </Button>
            </div>

            <div className="flex items-center justify-between p-2 rounded-md border hover:bg-gray-50 cursor-pointer">
              <div className="flex items-center">
                <div className="p-2 bg-blue-100 rounded-md ml-3">
                  <Truck className="h-4 w-4 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium text-sm">
                    استلام كونتينر #CNT-2024-0082
                  </p>
                  <p className="text-xs text-muted-foreground">قيد التنفيذ</p>
                </div>
              </div>
              <Button variant="outline" size="sm" className="h-8">
                تفاصيل
              </Button>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <h3 className="text-sm font-medium mb-3">تنبيهات المخزون</h3>
          <div className="space-y-2">
            <div className="flex items-center justify-between p-2 rounded-md border hover:bg-gray-50 cursor-pointer">
              <div className="flex items-center">
                <div className="p-2 bg-red-100 rounded-md ml-3">
                  <AlertTriangle className="h-4 w-4 text-red-600" />
                </div>
                <div>
                  <p className="font-medium text-sm">
                    مخزون منخفض - قماش قطني أبيض
                  </p>
                  <p className="text-xs text-muted-foreground">
                    المخزون الحالي: 15 متر (الحد الأدنى: 20 متر)
                  </p>
                </div>
              </div>
              <Button variant="outline" size="sm" className="h-8">
                طلب شراء
              </Button>
            </div>

            <div className="flex items-center justify-between p-2 rounded-md border hover:bg-gray-50 cursor-pointer">
              <div className="flex items-center">
                <div className="p-2 bg-amber-100 rounded-md ml-3">
                  <Clock className="h-4 w-4 text-amber-600" />
                </div>
                <div>
                  <p className="font-medium text-sm">
                    جرد مستحق - المستودع الرئيسي
                  </p>
                  <p className="text-xs text-muted-foreground">
                    آخر جرد: قبل 30 يوم
                  </p>
                </div>
              </div>
              <Button variant="outline" size="sm" className="h-8">
                بدء الجرد
              </Button>
            </div>

            <div className="flex items-center justify-between p-2 rounded-md border hover:bg-gray-50 cursor-pointer">
              <div className="flex items-center">
                <div className="p-2 bg-green-100 rounded-md ml-3">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                </div>
                <div>
                  <p className="font-medium text-sm">
                    تم استلام كونتينر #CNT-2024-0075
                  </p>
                  <p className="text-xs text-muted-foreground">
                    تم الاستلام بنجاح - 12 صنف
                  </p>
                </div>
              </div>
              <Button variant="outline" size="sm" className="h-8">
                عرض التقرير
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default InventoryQuickLinks;
