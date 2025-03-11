import React, { useState } from "react";
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
import { Container, ContainerItem } from "@/types/inventory";
import { v4 as uuidv4 } from "uuid";

interface NewContainerFormProps {
  open: boolean;
  onClose: () => void;
  onSave: (container: Container) => void;
}

// مخطط التحقق من صحة النموذج
const formSchema = z.object({
  name: z.string().min(3, { message: "يجب أن يكون الاسم 3 أحرف على الأقل" }),
  trackingNumber: z.string().optional(),
  expectedArrivalDate: z
    .string()
    .min(1, { message: "تاريخ الوصول المتوقع مطلوب" }),
  supplier: z.string().min(1, { message: "المورد مطلوب" }),
  supplierId: z.string().min(1, { message: "معرف المورد مطلوب" }),
  origin: z.string().min(1, { message: "بلد المنشأ مطلوب" }),
  destination: z.string().min(1, { message: "الوجهة مطلوبة" }),
  shippingCompany: z.string().optional(),
  containerType: z.string().optional(),
  containerSize: z.string().optional(),
  notes: z.string().optional(),
});

const NewContainerForm: React.FC<NewContainerFormProps> = ({
  open,
  onClose,
  onSave,
}) => {
  // إعداد نموذج React Hook Form مع التحقق من الصحة باستخدام Zod
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      trackingNumber: "",
      expectedArrivalDate: new Date().toISOString().split("T")[0],
      supplier: "",
      supplierId: "",
      origin: "",
      destination: "",
      shippingCompany: "",
      containerType: "Standard",
      containerSize: "40ft",
      notes: "",
    },
  });

  // معالجة تقديم النموذج
  const onSubmit = (values: z.infer<typeof formSchema>) => {
    // إنشاء كائن الكونتينر الجديد
    const newContainer: Container = {
      id: `CNT-${Math.floor(Math.random() * 1000)
        .toString()
        .padStart(3, "0")}`,
      name: values.name,
      trackingNumber: values.trackingNumber,
      arrivalDate: "", // سيتم تحديثه عند وصول الكونتينر
      expectedArrivalDate: values.expectedArrivalDate,
      status: "pending",
      supplier: values.supplier,
      supplierId: values.supplierId,
      origin: values.origin,
      destination: values.destination,
      shippingCompany: values.shippingCompany,
      containerType: values.containerType,
      containerSize: values.containerSize,
      expectedItems: [], // سيتم إضافتها في مرحلة لاحقة
      notes: values.notes,
      createdBy: "المستخدم الحالي", // يجب استبداله بمعرف المستخدم الحالي
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    // استدعاء دالة الحفظ
    onSave(newContainer);
    form.reset();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            إضافة كونتينر جديد
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              {/* اسم الكونتينر */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>اسم الكونتينر</FormLabel>
                    <FormControl>
                      <Input placeholder="اسم الكونتينر" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* رقم التتبع */}
              <FormField
                control={form.control}
                name="trackingNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>رقم التتبع</FormLabel>
                    <FormControl>
                      <Input placeholder="رقم التتبع (اختياري)" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* تاريخ الوصول المتوقع */}
              <FormField
                control={form.control}
                name="expectedArrivalDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>تاريخ الوصول المتوقع</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* المورد */}
              <FormField
                control={form.control}
                name="supplier"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>المورد</FormLabel>
                    <FormControl>
                      <Input placeholder="اسم المورد" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* معرف المورد */}
              <FormField
                control={form.control}
                name="supplierId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>معرف المورد</FormLabel>
                    <FormControl>
                      <Input placeholder="معرف المورد" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* بلد المنشأ */}
              <FormField
                control={form.control}
                name="origin"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>بلد المنشأ</FormLabel>
                    <FormControl>
                      <Input placeholder="بلد المنشأ" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* الوجهة */}
              <FormField
                control={form.control}
                name="destination"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>الوجهة</FormLabel>
                    <FormControl>
                      <Input placeholder="الوجهة" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* شركة الشحن */}
              <FormField
                control={form.control}
                name="shippingCompany"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>شركة الشحن</FormLabel>
                    <FormControl>
                      <Input placeholder="شركة الشحن (اختياري)" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* نوع الكونتينر */}
              <FormField
                control={form.control}
                name="containerType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>نوع الكونتينر</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="اختر نوع الكونتينر" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Standard">
                          قياسي (Standard)
                        </SelectItem>
                        <SelectItem value="Refrigerated">
                          مبرد (Refrigerated)
                        </SelectItem>
                        <SelectItem value="Open Top">
                          مفتوح من الأعلى (Open Top)
                        </SelectItem>
                        <SelectItem value="Flat Rack">
                          مسطح (Flat Rack)
                        </SelectItem>
                        <SelectItem value="Tank">خزان (Tank)</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* حجم الكونتينر */}
              <FormField
                control={form.control}
                name="containerSize"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>حجم الكونتينر</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="اختر حجم الكونتينر" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="20ft">20 قدم</SelectItem>
                        <SelectItem value="40ft">40 قدم</SelectItem>
                        <SelectItem value="40ft HC">
                          40 قدم عالي (HC)
                        </SelectItem>
                        <SelectItem value="45ft">45 قدم</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

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

export default NewContainerForm;
