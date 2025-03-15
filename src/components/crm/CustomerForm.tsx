import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Loader2, AlertCircle, CheckCircle } from "lucide-react";
import { supabase } from "@/lib/supabase";

interface CustomerFormProps {
  onSuccess?: () => void;
  onCancel?: () => void;
}

const CustomerForm: React.FC<CustomerFormProps> = ({ onSuccess, onCancel }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    country: "",
    type: "شركة",
    notes: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const createCustomersTable = async () => {
    try {
      // إنشاء جدول العملاء إذا لم يكن موجودًا
      const { error } = await supabase.rpc("create_customers_table");
      if (error && !error.message.includes("already exists")) {
        console.error("خطأ في إنشاء جدول العملاء:", error);
        return false;
      }
      return true;
    } catch (err) {
      console.error("خطأ في إنشاء جدول العملاء:", err);
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      // إنشاء جدول العملاء إذا لم يكن موجودًا
      const tableCreated = await createCustomersTable();
      if (!tableCreated) {
        throw new Error("فشل في إنشاء جدول العملاء");
      }

      // إنشاء SQL وظيفة لإنشاء جدول العملاء إذا لم تكن موجودة
      const { error: createFunctionError } = await supabase.rpc(
        "create_customers_table_function",
      );
      if (
        createFunctionError &&
        !createFunctionError.message.includes("already exists")
      ) {
        console.warn(
          "خطأ في إنشاء وظيفة إنشاء جدول العملاء:",
          createFunctionError,
        );
      }

      // إضافة العميل الجديد
      const { data, error } = await supabase
        .from("customers")
        .insert([
          {
            customer_id: `CUST-${Date.now().toString().slice(-6)}`,
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            address: formData.address,
            city: formData.city,
            country: formData.country,
            type: formData.type,
            notes: formData.notes,
            created_at: new Date().toISOString(),
            status: "نشط",
          },
        ])
        .select();

      if (error) {
        console.error("خطأ في إضافة العميل:", error);
        throw error;
      }

      console.log("تم إضافة العميل بنجاح:", data);
      setSuccess(true);
      setFormData({
        name: "",
        email: "",
        phone: "",
        address: "",
        city: "",
        country: "",
        type: "شركة",
        notes: "",
      });

      if (onSuccess) {
        setTimeout(() => {
          onSuccess();
        }, 1500);
      }
    } catch (err) {
      console.error("خطأ في إضافة العميل:", err);
      setError(
        err instanceof Error ? err.message : "حدث خطأ أثناء إضافة العميل",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>إضافة عميل جديد</CardTitle>
        <CardDescription>أدخل بيانات العميل الجديد</CardDescription>
      </CardHeader>
      <CardContent>
        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>خطأ</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {success && (
          <Alert className="mb-4 bg-green-50 text-green-800 border-green-200">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <AlertTitle>تم بنجاح</AlertTitle>
            <AlertDescription>تمت إضافة العميل بنجاح</AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">
                اسم العميل <span className="text-red-500">*</span>
              </Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="أدخل اسم العميل"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="type">نوع العميل</Label>
              <Select
                value={formData.type}
                onValueChange={(value) => handleSelectChange("type", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="اختر نوع العميل" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="شركة">شركة</SelectItem>
                  <SelectItem value="فرد">فرد</SelectItem>
                  <SelectItem value="حكومي">حكومي</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">البريد الإلكتروني</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="example@example.com"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">رقم الهاتف</Label>
              <Input
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+966 5xxxxxxxx"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">العنوان</Label>
              <Input
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="أدخل العنوان"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="city">المدينة</Label>
              <Input
                id="city"
                name="city"
                value={formData.city}
                onChange={handleChange}
                placeholder="أدخل المدينة"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="country">الدولة</Label>
              <Input
                id="country"
                name="country"
                value={formData.country}
                onChange={handleChange}
                placeholder="أدخل الدولة"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">ملاحظات</Label>
            <Textarea
              id="notes"
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              placeholder="أدخل أي ملاحظات إضافية"
              rows={3}
            />
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={onCancel} disabled={loading}>
          إلغاء
        </Button>
        <Button onClick={handleSubmit} disabled={loading || !formData.name}>
          {loading ? (
            <>
              <Loader2 className="ml-2 h-4 w-4 animate-spin" />
              جاري الحفظ...
            </>
          ) : (
            "حفظ العميل"
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CustomerForm;
