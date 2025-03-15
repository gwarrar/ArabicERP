import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Search,
  Plus,
  Eye,
  Edit,
  Trash,
  MoreHorizontal,
  Loader2,
  AlertCircle,
  RefreshCw,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import CustomerForm from "./CustomerForm";
import { supabase } from "@/lib/supabase";

interface Customer {
  id: string;
  customer_id: string;
  name: string;
  email: string;
  phone: string;
  type: string;
  status: string;
  created_at: string;
}

const CustomersList = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);

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

  const fetchCustomers = async () => {
    setLoading(true);
    setError(null);

    try {
      // التحقق من وجود جدول العملاء
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

      // جلب بيانات العملاء
      const { data, error } = await supabase
        .from("customers")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("خطأ في جلب بيانات العملاء:", error);
        throw error;
      }

      console.log("تم جلب بيانات العملاء بنجاح:", data);
      setCustomers(data || []);
    } catch (err) {
      console.error("خطأ في جلب بيانات العملاء:", err);
      setError(
        err instanceof Error ? err.message : "حدث خطأ أثناء جلب بيانات العملاء",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const handleDeleteCustomer = async (customerId: string) => {
    if (!confirm("هل أنت متأكد من حذف هذا العميل؟")) return;

    try {
      const { error } = await supabase
        .from("customers")
        .delete()
        .eq("customer_id", customerId);

      if (error) {
        console.error("خطأ في حذف العميل:", error);
        throw error;
      }

      console.log("تم حذف العميل بنجاح");
      // تحديث القائمة بعد الحذف
      setCustomers(customers.filter((c) => c.customer_id !== customerId));
    } catch (err) {
      console.error("خطأ في حذف العميل:", err);
      alert("حدث خطأ أثناء حذف العميل");
    }
  };

  const filteredCustomers = customers.filter((customer) => {
    const searchLower = searchQuery.toLowerCase();
    return (
      customer.name?.toLowerCase().includes(searchLower) ||
      customer.customer_id?.toLowerCase().includes(searchLower) ||
      (customer.email && customer.email.toLowerCase().includes(searchLower)) ||
      (customer.phone && customer.phone.toLowerCase().includes(searchLower))
    );
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "نشط":
        return <Badge className="bg-green-100 text-green-800">نشط</Badge>;
      case "غير نشط":
        return <Badge className="bg-red-100 text-red-800">غير نشط</Badge>;
      case "معلق":
        return <Badge className="bg-amber-100 text-amber-800">معلق</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">قائمة العملاء</h2>
        <Dialog open={showAddForm} onOpenChange={setShowAddForm}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="ml-2 h-4 w-4" />
              إضافة عميل جديد
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>إضافة عميل جديد</DialogTitle>
            </DialogHeader>
            <CustomerForm
              onSuccess={() => {
                setShowAddForm(false);
                fetchCustomers();
              }}
              onCancel={() => setShowAddForm(false)}
            />
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader className="pb-2">
          <div className="flex justify-between items-center">
            <CardTitle>العملاء</CardTitle>
            <div className="flex items-center gap-2">
              <div className="relative w-64">
                <Search className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="بحث عن عميل..."
                  className="pr-9"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button variant="outline" size="icon" onClick={fetchCustomers}>
                <RefreshCw className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>خطأ</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {loading ? (
            <div className="flex justify-center items-center p-8">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <span className="mr-2">جاري تحميل البيانات...</span>
            </div>
          ) : (
            <div className="border rounded-md overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>رقم العميل</TableHead>
                    <TableHead>الاسم</TableHead>
                    <TableHead>البريد الإلكتروني</TableHead>
                    <TableHead>الهاتف</TableHead>
                    <TableHead>النوع</TableHead>
                    <TableHead>الحالة</TableHead>
                    <TableHead>تاريخ الإضافة</TableHead>
                    <TableHead>الإجراءات</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredCustomers.length > 0 ? (
                    filteredCustomers.map((customer) => (
                      <TableRow key={customer.id || customer.customer_id}>
                        <TableCell className="font-medium">
                          {customer.customer_id}
                        </TableCell>
                        <TableCell>{customer.name}</TableCell>
                        <TableCell>{customer.email || "-"}</TableCell>
                        <TableCell>{customer.phone || "-"}</TableCell>
                        <TableCell>{customer.type}</TableCell>
                        <TableCell>{getStatusBadge(customer.status)}</TableCell>
                        <TableCell>
                          {new Date(customer.created_at).toLocaleDateString(
                            "ar-SA",
                          )}
                        </TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>الإجراءات</DropdownMenuLabel>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem>
                                <Eye className="ml-2 h-4 w-4" />
                                عرض التفاصيل
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Edit className="ml-2 h-4 w-4" />
                                تعديل
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem
                                className="text-red-600"
                                onClick={() =>
                                  handleDeleteCustomer(customer.customer_id)
                                }
                              >
                                <Trash className="ml-2 h-4 w-4" />
                                حذف
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={8} className="text-center py-8">
                        {searchQuery ? (
                          <div className="text-muted-foreground">
                            لا توجد نتائج تطابق بحثك
                          </div>
                        ) : (
                          <div className="text-muted-foreground">
                            لا يوجد عملاء حتى الآن. قم بإضافة عميل جديد.
                          </div>
                        )}
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default CustomersList;
