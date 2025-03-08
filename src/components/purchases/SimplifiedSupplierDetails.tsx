import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  User,
  Phone,
  Mail,
  MapPin,
  CreditCard,
  DollarSign,
  Clock,
  ShoppingCart,
  Edit,
} from "lucide-react";

interface SimplifiedSupplierDetailsProps {
  supplier: any;
}

const SimplifiedSupplierDetails: React.FC<SimplifiedSupplierDetailsProps> = ({
  supplier,
}) => {
  if (!supplier) {
    return (
      <div className="py-8 text-center text-muted-foreground">
        لا توجد بيانات للمورد المحدد
      </div>
    );
  }

  return (
    <div className="space-y-6">
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
                <p className="text-sm text-muted-foreground">اسم المورد</p>
                <p className="font-medium">{supplier?.name || "-"}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="bg-primary/10 p-2 rounded-full">
                <Phone className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">رقم الهاتف</p>
                <p className="font-medium">{supplier?.phone || "-"}</p>
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
                <p className="font-medium">{supplier?.email || "-"}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="bg-primary/10 p-2 rounded-full">
                <MapPin className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">العنوان</p>
                <p className="font-medium">{supplier?.address || "-"}</p>
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
                <p className="font-medium">{supplier?.taxNumber || "-"}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="bg-primary/10 p-2 rounded-full">
                <DollarSign className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">الرصيد الحالي</p>
                <p
                  className={`font-medium ${supplier?.balance < 0 ? "text-red-600" : supplier?.balance > 0 ? "text-green-600" : ""}`}
                >
                  {supplier?.balance
                    ? Math.abs(supplier.balance).toLocaleString() + " ₴"
                    : "-"}
                  {supplier?.balance < 0
                    ? " (مستحق للمورد)"
                    : supplier?.balance > 0
                      ? " (مستحق على المورد)"
                      : ""}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="bg-primary/10 p-2 rounded-full">
                <Clock className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">فترة السداد</p>
                <p className="font-medium">
                  {supplier?.paymentTerms
                    ? supplier.paymentTerms + " يوم"
                    : "-"}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="bg-primary/10 p-2 rounded-full">
                <ShoppingCart className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">الفئة</p>
                <p className="font-medium">{supplier?.category || "-"}</p>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Quick Actions */}
      <div className="flex flex-wrap gap-2 mt-6">
        <Button>
          <ShoppingCart className="ml-2 h-4 w-4" />
          طلب شراء جديد
        </Button>
        <Button variant="outline">
          <DollarSign className="ml-2 h-4 w-4" />
          تسجيل دفعة
        </Button>
        <Button variant="outline">
          <Phone className="ml-2 h-4 w-4" />
          اتصال
        </Button>
        <Button variant="outline">
          <Mail className="ml-2 h-4 w-4" />
          إرسال بريد إلكتروني
        </Button>
      </div>
    </div>
  );
};

export default SimplifiedSupplierDetails;
