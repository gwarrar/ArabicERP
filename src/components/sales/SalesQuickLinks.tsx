import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  FileText,
  ShoppingCart,
  Users,
  RotateCcw,
  Tag,
  Bookmark,
  CreditCard,
  BarChart3,
  Plus,
  Truck,
  Package,
  Clock,
} from "lucide-react";

interface SalesQuickLinksProps {
  onOpenReservations?: () => void;
  onCreateInvoice?: () => void;
  onCreateOrder?: () => void;
  onViewCustomers?: () => void;
  onProcessReturn?: () => void;
  onViewReports?: () => void;
  onOpenRFID?: () => void;
}

const SalesQuickLinks: React.FC<SalesQuickLinksProps> = ({
  onOpenReservations,
  onCreateInvoice,
  onCreateOrder,
  onViewCustomers,
  onProcessReturn,
  onViewReports,
  onOpenRFID,
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
            onClick={() => handleAction(onCreateInvoice)}
          >
            <FileText className="h-8 w-8 mb-2 text-blue-600" />
            <span className="text-sm font-medium">فاتورة جديدة</span>
          </Button>

          <Button
            variant="outline"
            className="h-auto flex flex-col items-center justify-center p-4 hover:bg-green-50 hover:text-green-700 hover:border-green-200 transition-colors"
            onClick={() => handleAction(onCreateOrder)}
          >
            <ShoppingCart className="h-8 w-8 mb-2 text-green-600" />
            <span className="text-sm font-medium">طلب جديد</span>
          </Button>

          <Button
            variant="outline"
            className="h-auto flex flex-col items-center justify-center p-4 hover:bg-purple-50 hover:text-purple-700 hover:border-purple-200 transition-colors"
            onClick={() => handleAction(onOpenReservations)}
          >
            <Bookmark className="h-8 w-8 mb-2 text-purple-600" />
            <span className="text-sm font-medium">الحجوزات</span>
          </Button>

          <Button
            variant="outline"
            className="h-auto flex flex-col items-center justify-center p-4 hover:bg-cyan-50 hover:text-cyan-700 hover:border-cyan-200 transition-colors"
            onClick={() => handleAction(onViewCustomers)}
          >
            <Users className="h-8 w-8 mb-2 text-cyan-600" />
            <span className="text-sm font-medium">العملاء</span>
          </Button>

          <Button
            variant="outline"
            className="h-auto flex flex-col items-center justify-center p-4 hover:bg-amber-50 hover:text-amber-700 hover:border-amber-200 transition-colors"
            onClick={() => handleAction(onProcessReturn)}
          >
            <RotateCcw className="h-8 w-8 mb-2 text-amber-600" />
            <span className="text-sm font-medium">مرتجعات</span>
          </Button>

          <Button
            variant="outline"
            className="h-auto flex flex-col items-center justify-center p-4 hover:bg-indigo-50 hover:text-indigo-700 hover:border-indigo-200 transition-colors"
            onClick={() => handleAction(onViewReports)}
          >
            <BarChart3 className="h-8 w-8 mb-2 text-indigo-600" />
            <span className="text-sm font-medium">التقارير</span>
          </Button>

          <Button
            variant="outline"
            className="h-auto flex flex-col items-center justify-center p-4 hover:bg-rose-50 hover:text-rose-700 hover:border-rose-200 transition-colors"
            onClick={() => handleAction(onOpenRFID)}
          >
            <Tag className="h-8 w-8 mb-2 text-rose-600" />
            <span className="text-sm font-medium">نظام RFID</span>
          </Button>

          <Button
            variant="outline"
            className="h-auto flex flex-col items-center justify-center p-4 hover:bg-teal-50 hover:text-teal-700 hover:border-teal-200 transition-colors"
          >
            <CreditCard className="h-8 w-8 mb-2 text-teal-600" />
            <span className="text-sm font-medium">المدفوعات</span>
          </Button>
        </div>

        <div className="mt-6">
          <h3 className="text-sm font-medium mb-3">معاملات حديثة</h3>
          <div className="space-y-2">
            <div className="flex items-center justify-between p-2 rounded-md border hover:bg-gray-50 cursor-pointer">
              <div className="flex items-center">
                <div className="p-2 bg-blue-100 rounded-md ml-3">
                  <FileText className="h-4 w-4 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium text-sm">فاتورة #INV-2024-0042</p>
                  <p className="text-xs text-muted-foreground">
                    شركة الأمل للتجارة
                  </p>
                </div>
              </div>
              <div className="text-sm font-medium">₴ 12,500</div>
            </div>

            <div className="flex items-center justify-between p-2 rounded-md border hover:bg-gray-50 cursor-pointer">
              <div className="flex items-center">
                <div className="p-2 bg-green-100 rounded-md ml-3">
                  <ShoppingCart className="h-4 w-4 text-green-600" />
                </div>
                <div>
                  <p className="font-medium text-sm">طلب #ORD-2024-0078</p>
                  <p className="text-xs text-muted-foreground">
                    مؤسسة النور للأقمشة
                  </p>
                </div>
              </div>
              <div className="text-sm font-medium">₴ 8,750</div>
            </div>

            <div className="flex items-center justify-between p-2 rounded-md border hover:bg-gray-50 cursor-pointer">
              <div className="flex items-center">
                <div className="p-2 bg-purple-100 rounded-md ml-3">
                  <Bookmark className="h-4 w-4 text-purple-600" />
                </div>
                <div>
                  <p className="font-medium text-sm">حجز #RES-2024-0015</p>
                  <p className="text-xs text-muted-foreground">
                    شركة الخليج للملابس
                  </p>
                </div>
              </div>
              <div className="text-sm font-medium">₴ 15,200</div>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <h3 className="text-sm font-medium mb-3">معاملات قيد الانتظار</h3>
          <div className="space-y-2">
            <div className="flex items-center justify-between p-2 rounded-md border hover:bg-gray-50 cursor-pointer">
              <div className="flex items-center">
                <div className="p-2 bg-amber-100 rounded-md ml-3">
                  <Clock className="h-4 w-4 text-amber-600" />
                </div>
                <div>
                  <p className="font-medium text-sm">
                    موافقة على حجز #RES-2024-0018
                  </p>
                  <p className="text-xs text-muted-foreground">
                    بانتظار الموافقة
                  </p>
                </div>
              </div>
              <Button variant="outline" size="sm" className="h-8">
                عرض
              </Button>
            </div>

            <div className="flex items-center justify-between p-2 rounded-md border hover:bg-gray-50 cursor-pointer">
              <div className="flex items-center">
                <div className="p-2 bg-blue-100 rounded-md ml-3">
                  <Truck className="h-4 w-4 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium text-sm">
                    شحنة للعميل #DEL-2024-0035
                  </p>
                  <p className="text-xs text-muted-foreground">قيد التجهيز</p>
                </div>
              </div>
              <Button variant="outline" size="sm" className="h-8">
                متابعة
              </Button>
            </div>

            <div className="flex items-center justify-between p-2 rounded-md border hover:bg-gray-50 cursor-pointer">
              <div className="flex items-center">
                <div className="p-2 bg-green-100 rounded-md ml-3">
                  <Package className="h-4 w-4 text-green-600" />
                </div>
                <div>
                  <p className="font-medium text-sm">
                    تجهيز طلب #ORD-2024-0082
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
      </CardContent>
    </Card>
  );
};

export default SalesQuickLinks;
