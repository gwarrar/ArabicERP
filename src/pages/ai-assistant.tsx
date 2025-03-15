import React from "react";
import MainLayout from "@/components/layout/MainLayout";
import AIAssistant from "@/components/ai/AIAssistant";
import { useToast } from "@/components/ui/use-toast";

const AIAssistantPage = () => {
  const { toast } = useToast();

  const handleCreateInvoice = (data: any) => {
    // In a real application, this would save the invoice to the database
    console.log("Creating invoice:", data);
    toast({
      title: "تم إنشاء الفاتورة",
      description: `تم إنشاء فاتورة للعميل ${data.customer} بقيمة ${data.total.toLocaleString()} ₴`,
    });
  };

  const handleCreateJournalEntry = (data: any) => {
    // In a real application, this would save the journal entry to the database
    console.log("Creating journal entry:", data);
    toast({
      title: "تم تسجيل القيد المحاسبي",
      description: `تم تسجيل قيد محاسبي برقم مرجعي ${data.reference}`,
    });
  };

  const handleGenerateReport = (data: any) => {
    // In a real application, this would generate and save the report
    console.log("Generating report:", data);
    toast({
      title: "تم إنشاء التقرير",
      description: `تم إنشاء تقرير ${data.title} للفترة ${data.period}`,
    });
  };

  return (
    <MainLayout>
      <div className="space-y-6" dir="rtl">
        <div>
          <h2 className="text-2xl font-bold">المساعد الذكي</h2>
          <p className="text-muted-foreground">
            استخدم الذكاء الاصطناعي لإدخال البيانات وإنشاء الفواتير والقيود
            المحاسبية والحصول على التقارير
          </p>
        </div>

        <div className="h-[calc(100vh-220px)]" style={{ background: "white" }}>
          <AIAssistant
            onCreateInvoice={handleCreateInvoice}
            onCreateJournalEntry={handleCreateJournalEntry}
            onGenerateReport={handleGenerateReport}
          />
        </div>
      </div>
    </MainLayout>
  );
};

export default AIAssistantPage;
