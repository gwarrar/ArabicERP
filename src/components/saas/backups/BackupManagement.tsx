import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Database, Calendar, RotateCcw, Plus } from "lucide-react";
import BackupsList from "./BackupsList";
import BackupSchedulesList from "./BackupSchedulesList";
import RestoreOperationsList from "./RestoreOperationsList";
import CreateBackupForm from "./CreateBackupForm";

const BackupManagement = () => {
  const [activeTab, setActiveTab] = useState("backups");
  const [showCreateBackupForm, setShowCreateBackupForm] = useState(false);

  // فتح نموذج إنشاء نسخة احتياطية جديدة
  const handleCreateBackup = () => {
    setShowCreateBackupForm(true);
  };

  // حفظ النسخة الاحتياطية الجديدة
  const handleSaveBackup = (backupData: any) => {
    // هنا يمكن إضافة منطق حفظ النسخة الاحتياطية في قاعدة البيانات
    console.log("Creating backup:", backupData);
    setShowCreateBackupForm(false);
    // تحديث واجهة المستخدم بعد الحفظ
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">إدارة النسخ الاحتياطية</h2>
        <Button onClick={handleCreateBackup}>
          <Plus className="ml-2 h-4 w-4" />
          نسخة احتياطية جديدة
        </Button>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-md p-4 mb-4">
        <p className="text-blue-800">
          يمكنك من خلال هذه الصفحة إدارة النسخ الاحتياطية للنظام وقواعد البيانات
          الخاصة بالعملاء، وجدولة عمليات النسخ الاحتياطي التلقائية، واستعادة
          النسخ الاحتياطية عند الحاجة.
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="backups">
            <Database className="h-4 w-4 ml-2" />
            النسخ الاحتياطية
          </TabsTrigger>
          <TabsTrigger value="schedules">
            <Calendar className="h-4 w-4 ml-2" />
            جداول النسخ الاحتياطي
          </TabsTrigger>
          <TabsTrigger value="restore-operations">
            <RotateCcw className="h-4 w-4 ml-2" />
            عمليات الاستعادة
          </TabsTrigger>
        </TabsList>

        <TabsContent value="backups" className="mt-0">
          <BackupsList />
        </TabsContent>

        <TabsContent value="schedules" className="mt-0">
          <BackupSchedulesList />
        </TabsContent>

        <TabsContent value="restore-operations" className="mt-0">
          <RestoreOperationsList />
        </TabsContent>
      </Tabs>

      {/* نموذج إنشاء نسخة احتياطية جديدة */}
      <CreateBackupForm
        open={showCreateBackupForm}
        onClose={() => setShowCreateBackupForm(false)}
        onSave={handleSaveBackup}
      />
    </div>
  );
};

export default BackupManagement;
