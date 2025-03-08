import React from "react";
import { Button } from "@/components/ui/button";
import { useToastContext } from "./ToastContext";

const ToastDemo = () => {
  const { success, error, warning, info } = useToastContext();

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">عرض الإشعارات</h2>
      <div className="flex flex-wrap gap-2">
        <Button
          onClick={() =>
            success({
              title: "تم بنجاح",
              description: "تم حفظ البيانات بنجاح في قاعدة البيانات",
            })
          }
          variant="outline"
          className="bg-green-50 text-green-700 border-green-200 hover:bg-green-100"
        >
          إشعار نجاح
        </Button>

        <Button
          onClick={() =>
            error({
              title: "حدث خطأ",
              description:
                "حدث خطأ أثناء محاولة حفظ البيانات، يرجى المحاولة مرة أخرى",
            })
          }
          variant="outline"
          className="bg-red-50 text-red-700 border-red-200 hover:bg-red-100"
        >
          إشعار خطأ
        </Button>

        <Button
          onClick={() =>
            warning({
              title: "تحذير",
              description: "هذا إجراء لا يمكن التراجع عنه، هل أنت متأكد؟",
            })
          }
          variant="outline"
          className="bg-yellow-50 text-yellow-700 border-yellow-200 hover:bg-yellow-100"
        >
          إشعار تحذير
        </Button>

        <Button
          onClick={() =>
            info({
              title: "معلومة",
              description: "تم تحديث النظام إلى الإصدار الجديد",
            })
          }
          variant="outline"
          className="bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100"
        >
          إشعار معلومات
        </Button>
      </div>
    </div>
  );
};

export default ToastDemo;
