import React from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ContainerExpense } from "@/types/inventory";

interface ContainerExpenseFormProps {
  open: boolean;
  onClose: () => void;
  onSave: (expense: ContainerExpense) => void;
  containerId: string;
}

// مخطط التحقق من صحة النموذج
const formSchema = z.object({
  expenseType: z.string().min(1, { message: "نوع المصروف مطلوب" }),
  date: z.string().min(1, { message: "التاريخ مطلوب" }),
  description: z
    .string()
    .min(3, { message: "يجب أن يكون الوصف 3 أحرف على الأقل" }),
  amount: z.number().min(1, { message: "المبلغ يجب أن يكون أكبر من صفر" }),
  currency: z.string().default("UAH"),
  paymentStatus: z.enum(["paid", "pending"]),
  beneficiary: z.string().min(1, { message: "المستفيد مطلوب" }),
  notes: z.string().optional(),
});

const ContainerExpenseForm: React.FC<ContainerExpenseFormProps> = ({
  open,
  onClose,
  onSave,
  containerId,
}) => {
  // إعداد نموذج React Hook Form مع التحقق من الصحة باستخدام Zod
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      expenseType: "",
      date: new Date().toISOString().split("T")[0],
      description: "",
      amount: 0,
      currency: "UAH",
      paymentStatus: "pending",
      beneficiary: "",
      notes: "",
    },
  });

  // معالجة تقديم النموذج
  const onSubmit = (values: z.infer<typeof formSchema>) => {
    // إنشاء كائن المصروف الجديد
    const newExpense: ContainerExpense = {
      id: `EXP-${Math.floor(Math.random() * 1000)
        .toString()
        .padStart(3, "0")}`,
      date: values.date,
      expenseType: values.expenseType,
      description: values.description,
      amount: values.amount,
      paymentStatus: values.paymentStatus as "paid" | "pending",
      beneficiary: values.beneficiary,
    };

    // استدعاء دالة الحفظ
    onSave(newExpense);
    form.reset();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            إضافة مصروف جديد
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              {/* نوع المصروف */}
              <FormField
                control={form.control}
                name="expenseType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>نوع المصروف</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="اختر نوع المصروف" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="shipping">شحن</SelectItem>
                        <SelectItem value="customs">جمارك</SelectItem>
                        <SelectItem value="clearance">تخليص</SelectItem>
                        <SelectItem value="transportation">نقل</SelectItem>
                        <SelectItem value="handling">مناولة</SelectItem>
                        <SelectItem value="insurance">تأمين</SelectItem>
                        <SelectItem value="storage">تخزين</SelectItem>
                        <SelectItem value="other">أخرى</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* التاريخ */}
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>التاريخ</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* المبلغ */}
              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>المبلغ</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="أدخل المبلغ"
                        {...field}
                        onChange={(e) =>
                          field.onChange(parseFloat(e.target.value))
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* حالة الدفع */}
              <FormField
                control={form.control}
                name="paymentStatus"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>حالة الدفع</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="اختر حالة الدفع" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="paid">مدفوع</SelectItem>
                        <SelectItem value="pending">قيد الانتظار</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* المستفيد */}
              <FormField
                control={form.control}
                name="beneficiary"
                render={({ field }) => (
                  <FormItem className="col-span-2">
                    <FormLabel>المستفيد</FormLabel>
                    <FormControl>
                      <Input placeholder="اسم المستفيد" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* الوصف */}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>الوصف</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="وصف المصروف"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* ملاحظات */}
            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>ملاحظات</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="ملاحظات إضافية (اختياري)"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter className="mt-6">
              <Button type="button" variant="outline" onClick={onClose}>
                إلغاء
              </Button>
              <Button type="submit">حفظ</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default ContainerExpenseForm;
