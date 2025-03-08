import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  User,
  Phone,
  Mail,
  MapPin,
  CreditCard,
  Clock,
  DollarSign,
  ShoppingCart,
  TrendingUp,
  Edit,
  AlertTriangle,
} from "lucide-react";
import { Customer } from "@/types/sales";

interface CustomerCardProps {
  customer: Customer;
}

const CustomerCard: React.FC<CustomerCardProps> = ({ customer }) => {
  // Calculate growth percentage (mock data for now)
  const growthPercentage = 12.5;

  return (
    <div className="space-y-6">
      {/* Basic Information */}
      <Card className="p-6">
        <div className="flex justify-between items-start mb-6">
          <h3 className="text-lg font-semibold">المعلومات الأساسية</h3>
          <Button variant="outline" size="sm">
            <Edit className="h-4 w-4 ml-2" />
            تعديل
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="bg-primary/10 p-2 rounded-full">
                <User className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">الاسم الكامل</p>
                <p className="font-medium">{customer.name}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="bg-primary/10 p-2 rounded-full">
                <Phone className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">رقم الهاتف</p>
                <p className="font-medium">{customer.phone || "غير متوفر"}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="bg-primary/10 p-2 rounded-full">
                <Mail className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">
                  البريد الإلكتروني
                </p>
                <p className="font-medium">{customer.email || "غير متوفر"}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="bg-primary/10 p-2 rounded-full">
                <MapPin className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">العنوان</p>
                <p className="font-medium">{customer.address || "غير متوفر"}</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="bg-primary/10 p-2 rounded-full">
                <CreditCard className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">الرقم الضريبي</p>
                <p className="font-medium">TAX-123456789</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="bg-primary/10 p-2 rounded-full">
                <User className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">فئة العميل</p>
                <p className="font-medium">
                  {customer.status === "active" ? "VIP" : "عادي"}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="bg-primary/10 p-2 rounded-full">
                <Clock className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">تاريخ التسجيل</p>
                <p className="font-medium">
                  {customer.firstOrder || "غير متوفر"}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="bg-primary/10 p-2 rounded-full">
                <Clock className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">آخر معاملة</p>
                <p className="font-medium">
                  {customer.lastOrder || "غير متوفر"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Financial Information */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-6">المعلومات المالية</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="bg-primary/10 p-2 rounded-full">
                <DollarSign className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">الرصيد الحالي</p>
                <p
                  className={`font-medium ${customer.balance > 0 ? "text-green-600" : customer.balance < 0 ? "text-red-600" : ""}`}
                >
                  {customer.balance.toLocaleString()} ₴
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="bg-primary/10 p-2 rounded-full">
                <CreditCard className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">
                  حد الائتمان المسموح
                </p>
                <p className="font-medium">50,000 ₴</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="bg-primary/10 p-2 rounded-full">
                <Clock className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">
                  فترة السداد الافتراضية
                </p>
                <p className="font-medium">30 يوم</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="bg-primary/10 p-2 rounded-full">
                <CreditCard className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">
                  طريقة الدفع المفضلة
                </p>
                <p className="font-medium">تحويل بنكي</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            {customer.balance > 40000 && (
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-4">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-amber-600" />
                  <p className="text-amber-800 font-medium">
                    تنبيه: العميل يقترب من حد الائتمان
                  </p>
                </div>
                <p className="text-sm text-amber-700 mt-1">
                  الرصيد الحالي يمثل{" "}
                  {Math.round((customer.balance / 50000) * 100)}% من حد الائتمان
                  المسموح
                </p>
              </div>
            )}

            <div className="flex items-center gap-3">
              <div className="bg-primary/10 p-2 rounded-full">
                <ShoppingCart className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">
                  إجمالي المشتريات
                </p>
                <p className="font-medium">
                  {customer.totalSpent.toLocaleString()} ₴
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="bg-primary/10 p-2 rounded-full">
                <ShoppingCart className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">عدد الفواتير</p>
                <p className="font-medium">{customer.orderCount} فاتورة</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="bg-primary/10 p-2 rounded-full">
                <DollarSign className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">
                  متوسط قيمة الفاتورة
                </p>
                <p className="font-medium">
                  {customer.orderCount > 0
                    ? Math.round(
                        customer.totalSpent / customer.orderCount,
                      ).toLocaleString()
                    : 0}{" "}
                  ₴
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="bg-primary/10 p-2 rounded-full">
                <TrendingUp className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">نسبة النمو</p>
                <p className="font-medium text-green-600">
                  +{growthPercentage}% مقارنة بالفترة السابقة
                </p>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Quick Actions */}
      <div className="flex flex-wrap gap-2">
        <Button>
          <ShoppingCart className="ml-2 h-4 w-4" />
          إنشاء فاتورة جديدة
        </Button>
        <Button variant="outline">
          <DollarSign className="ml-2 h-4 w-4" />
          تسجيل دفعة
        </Button>
        <Button variant="outline">
          <Phone className="ml-2 h-4 w-4" />
          تسجيل اتصال
        </Button>
        <Button variant="outline">
          <Mail className="ml-2 h-4 w-4" />
          إرسال بريد إلكتروني
        </Button>
      </div>
    </div>
  );
};

export default CustomerCard;
