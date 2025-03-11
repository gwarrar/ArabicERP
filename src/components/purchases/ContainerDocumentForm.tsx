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
import { ContainerDocument } from "@/types/inventory";
import { Upload } from "lucide-react";

interface ContainerDocumentFormProps {
  open: boolean;
  onClose: () => void;
  onSave: (document: ContainerDocument) => void;
  containerId: string;
}

// مخطط التحقق من صحة النموذج
const formSchema = z.object({
  name: z.string().min(3, { message: "يجب أن يكون الاسم 3 أحرف على الأقل" }),
  type: z.string().min(1, { message: "نوع المستند مطلوب" }),
  file: z.any().optional(),
});

const ContainerDocumentForm: React.FC<ContainerDocumentFormProps> = ({
  open,
  onClose,
  onSave,
  containerId,
}) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  // إعداد نموذج React Hook Form مع التحقق من الصحة باستخدام Zod
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      type: "",
      file: undefined,
    },
  });

  // معالجة تغيير الملف
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setSelectedFile(file);
  };

  // معالجة تقديم النموذج
  const onSubmit = (values: z.infer<typeof formSchema>) => {
    // إنشاء كائن المستند الجديد
    const newDocument: ContainerDocument = {
      id: `DOC-${Math.floor(Math.random() * 1000)
        .toString()
        .padStart(3, "0")}`,
      name: values.name,
      type: values.type,
      uploadedAt: new Date().toISOString().split("T")[0],
      size: selectedFile
        ? `${(selectedFile.size / (1024 * 1024)).toFixed(2)} MB`
        : "0 KB",
    };

    // استدعاء دالة الحفظ
    onSave(newDocument);
    form.reset();
    setSelectedFile(null);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            إضافة مستند جديد
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {/* اسم المستند */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>اسم المستند</FormLabel>
                  <FormControl>
                    <Input placeholder="اسم المستند" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* نوع المستند */}
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>نوع المستند</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="اختر نوع المستند" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="PDF">PDF</SelectItem>
                      <SelectItem value="DOCX">DOCX</SelectItem>
                      <SelectItem value="XLSX">XLSX</SelectItem>
                      <SelectItem value="JPG">JPG</SelectItem>
                      <SelectItem value="PNG">PNG</SelectItem>
                      <SelectItem value="OTHER">أخرى</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* الملف */}
            <FormField
              control={form.control}
              name="file"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>الملف</FormLabel>
                  <FormControl>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                      <input
                        type="file"
                        id="file-upload"
                        className="hidden"
                        onChange={handleFileChange}
                      />
                      <label
                        htmlFor="file-upload"
                        className="cursor-pointer flex flex-col items-center justify-center"
                      >
                        <Upload className="h-10 w-10 text-gray-400 mb-2" />
                        <span className="text-sm font-medium">
                          اسحب الملف هنا أو انقر للتصفح
                        </span>
                        <span className="text-xs text-gray-500 mt-1">
                          يدعم PDF، DOCX، XLSX، JPG، PNG
                        </span>
                      </label>
                      {selectedFile && (
                        <div className="mt-4 text-sm">
                          <p className="font-medium">{selectedFile.name}</p>
                          <p className="text-gray-500">
                            {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
                          </p>
                        </div>
                      )}
                    </div>
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

export default ContainerDocumentForm;
