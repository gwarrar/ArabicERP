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
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import {
  Database,
  Server,
  HardDrive,
  RefreshCw,
  Download,
  Upload,
  Save,
  Plus,
  Trash,
  CheckCircle,
  XCircle,
  AlertCircle,
  Loader2,
} from "lucide-react";
import {
  checkSupabaseConnection,
  setupDatabase,
  insertSampleData,
  clearAllData,
} from "@/lib/supabase";

const DatabaseSetup = () => {
  const [connectionStatus, setConnectionStatus] = useState<{
    checked: boolean;
    success?: boolean;
    message?: string;
  }>({ checked: false });

  const [setupStatus, setSetupStatus] = useState<{
    inProgress: boolean;
    step: string;
    progress: number;
    success?: boolean;
    message?: string;
    error?: string;
  }>({ inProgress: false, step: "", progress: 0 });

  // التحقق من حالة الاتصال بـ Supabase
  const checkConnection = async () => {
    setConnectionStatus({ checked: true });
    const result = await checkSupabaseConnection();
    setConnectionStatus({
      checked: true,
      success: result.success,
      message: result.message,
    });
  };

  // إعداد قاعدة البيانات
  const handleSetupDatabase = async () => {
    try {
      setSetupStatus({
        inProgress: true,
        step: "جاري التحقق من الاتصال...",
        progress: 10,
      });

      // التحقق من الاتصال
      const connectionResult = await checkSupabaseConnection();
      if (!connectionResult.success) {
        throw new Error("فشل الاتصال بقاعدة البيانات");
      }

      setSetupStatus({
        inProgress: true,
        step: "جاري إنشاء وظائف SQL...",
        progress: 20,
      });

      // إنشاء وظائف SQL لإنشاء الجداول
      const { error: createWorkflowsFunctionError } = await supabase.rpc(
        "create_workflows_table_function",
      );
      if (
        createWorkflowsFunctionError &&
        !createWorkflowsFunctionError.message.includes("already exists")
      ) {
        console.warn(
          "خطأ في إنشاء وظيفة إنشاء جدول سير العمل:",
          createWorkflowsFunctionError,
        );
      }

      const { error: createTemplatesFunctionError } = await supabase.rpc(
        "create_workflow_templates_table_function",
      );
      if (
        createTemplatesFunctionError &&
        !createTemplatesFunctionError.message.includes("already exists")
      ) {
        console.warn(
          "خطأ في إنشاء وظيفة إنشاء جدول قوالب سير العمل:",
          createTemplatesFunctionError,
        );
      }

      const { error: createHistoryFunctionError } = await supabase.rpc(
        "create_workflow_history_table_function",
      );
      if (
        createHistoryFunctionError &&
        !createHistoryFunctionError.message.includes("already exists")
      ) {
        console.warn(
          "خطأ في إنشاء وظيفة إنشاء جدول سجل سير العمل:",
          createHistoryFunctionError,
        );
      }

      const { error: createCustomersFunctionError } = await supabase.rpc(
        "create_customers_table_function",
      );
      if (
        createCustomersFunctionError &&
        !createCustomersFunctionError.message.includes("already exists")
      ) {
        console.warn(
          "خطأ في إنشاء وظيفة إنشاء جدول العملاء:",
          createCustomersFunctionError,
        );
      }

      setSetupStatus({
        inProgress: true,
        step: "جاري إنشاء الجداول...",
        progress: 30,
      });

      // إنشاء الجداول
      const setupResult = await setupDatabase();
      if (!setupResult.success) {
        throw new Error("فشل إنشاء الجداول");
      }

      setSetupStatus({
        inProgress: true,
        step: "جاري إدخال البيانات التجريبية...",
        progress: 60,
      });

      // إدخال البيانات التجريبية
      const sampleDataResult = await insertSampleData();
      if (!sampleDataResult.success) {
        throw new Error("فشل إدخال البيانات التجريبية");
      }

      setSetupStatus({
        inProgress: false,
        step: "تم الإعداد بنجاح",
        progress: 100,
        success: true,
        message: "تم إعداد قاعدة البيانات وإدخال البيانات التجريبية بنجاح",
      });
    } catch (error) {
      console.error("خطأ في إعداد قاعدة البيانات:", error);
      setSetupStatus({
        inProgress: false,
        step: "حدث خطأ",
        progress: 0,
        success: false,
        message: "فشل إعداد قاعدة البيانات",
        error: error instanceof Error ? error.message : "خطأ غير معروف",
      });
    }
  };

  // مسح جميع البيانات
  const handleClearData = async () => {
    if (!confirm("هل أنت متأكد من رغبتك في مسح جميع البيانات؟")) {
      return;
    }

    try {
      setSetupStatus({
        inProgress: true,
        step: "جاري مسح البيانات...",
        progress: 50,
      });

      const result = await clearAllData();
      if (!result.success) {
        throw new Error("فشل مسح البيانات");
      }

      setSetupStatus({
        inProgress: false,
        step: "تم مسح البيانات بنجاح",
        progress: 100,
        success: true,
        message: "تم مسح جميع البيانات بنجاح",
      });
    } catch (error) {
      setSetupStatus({
        inProgress: false,
        step: "حدث خطأ",
        progress: 0,
        success: false,
        message: "فشل مسح البيانات",
        error: error instanceof Error ? error.message : "خطأ غير معروف",
      });
    }
  };

  // إعادة تهيئة البيانات
  const handleResetData = async () => {
    if (
      !confirm(
        "هل أنت متأكد من رغبتك في إعادة تهيئة البيانات؟ سيتم مسح جميع البيانات الحالية وإدخال البيانات التجريبية من جديد.",
      )
    ) {
      return;
    }

    try {
      setSetupStatus({
        inProgress: true,
        step: "جاري مسح البيانات الحالية...",
        progress: 30,
      });

      const clearResult = await clearAllData();
      if (!clearResult.success) {
        throw new Error("فشل مسح البيانات الحالية");
      }

      setSetupStatus({
        inProgress: true,
        step: "جاري إدخال البيانات التجريبية...",
        progress: 60,
      });

      const sampleDataResult = await insertSampleData();
      if (!sampleDataResult.success) {
        throw new Error("فشل إدخال البيانات التجريبية");
      }

      setSetupStatus({
        inProgress: false,
        step: "تم إعادة تهيئة البيانات بنجاح",
        progress: 100,
        success: true,
        message: "تم إعادة تهيئة البيانات بنجاح",
      });
    } catch (error) {
      setSetupStatus({
        inProgress: false,
        step: "حدث خطأ",
        progress: 0,
        success: false,
        message: "فشل إعادة تهيئة البيانات",
        error: error instanceof Error ? error.message : "خطأ غير معروف",
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-xl font-bold">إعداد قاعدة البيانات</h3>
          <p className="text-muted-foreground">
            إعداد الاتصال بـ Supabase وتهيئة قاعدة البيانات
          </p>
        </div>
      </div>

      {/* حالة الاتصال */}
      <Card>
        <CardHeader>
          <CardTitle>حالة الاتصال بـ Supabase</CardTitle>
          <CardDescription>
            التحقق من حالة الاتصال بقاعدة البيانات
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Database className="h-5 w-5 text-blue-600" />
              <span>الاتصال بـ Supabase</span>
            </div>
            <div className="flex items-center gap-2">
              {!connectionStatus.checked ? (
                <Badge variant="outline">لم يتم التحقق</Badge>
              ) : connectionStatus.success ? (
                <Badge className="bg-green-100 text-green-800">
                  <CheckCircle className="h-3 w-3 mr-1" />
                  متصل
                </Badge>
              ) : (
                <Badge className="bg-red-100 text-red-800">
                  <XCircle className="h-3 w-3 mr-1" />
                  غير متصل
                </Badge>
              )}
              <Button variant="outline" size="sm" onClick={checkConnection}>
                <RefreshCw className="h-4 w-4 ml-1" />
                تحقق
              </Button>
            </div>
          </div>

          {connectionStatus.checked && (
            <div className="mt-4">
              <Alert
                variant={connectionStatus.success ? "default" : "destructive"}
              >
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>
                  {connectionStatus.success
                    ? "تم الاتصال بنجاح"
                    : "فشل الاتصال"}
                </AlertTitle>
                <AlertDescription>{connectionStatus.message}</AlertDescription>
              </Alert>
            </div>
          )}
        </CardContent>
        <CardFooter>
          <div className="text-sm text-muted-foreground">
            تأكد من إضافة متغيرات البيئة VITE_SUPABASE_URL و
            VITE_SUPABASE_ANON_KEY
          </div>
        </CardFooter>
      </Card>

      {/* إعداد قاعدة البيانات */}
      <Card>
        <CardHeader>
          <CardTitle>إعداد قاعدة البيانات</CardTitle>
          <CardDescription>
            إنشاء الجداول وإدخال البيانات التجريبية
          </CardDescription>
        </CardHeader>
        <CardContent>
          {setupStatus.inProgress ? (
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Loader2 className="h-5 w-5 animate-spin text-blue-600" />
                <span>{setupStatus.step}</span>
              </div>
              <Progress value={setupStatus.progress} className="h-2" />
            </div>
          ) : setupStatus.success !== undefined ? (
            <Alert
              variant={setupStatus.success ? "default" : "destructive"}
              className="mb-4"
            >
              {setupStatus.success ? (
                <CheckCircle className="h-4 w-4" />
              ) : (
                <XCircle className="h-4 w-4" />
              )}
              <AlertTitle>
                {setupStatus.success ? "تم بنجاح" : "حدث خطأ"}
              </AlertTitle>
              <AlertDescription>
                {setupStatus.message}
                {setupStatus.error && (
                  <div className="mt-2 text-red-500">{setupStatus.error}</div>
                )}
              </AlertDescription>
            </Alert>
          ) : null}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            <Button
              onClick={handleSetupDatabase}
              disabled={setupStatus.inProgress}
            >
              <Server className="ml-2 h-4 w-4" />
              إعداد قاعدة البيانات
            </Button>

            <Button
              variant="outline"
              onClick={handleClearData}
              disabled={setupStatus.inProgress}
            >
              <Trash className="ml-2 h-4 w-4" />
              مسح جميع البيانات
            </Button>

            <Button
              variant="outline"
              onClick={handleResetData}
              disabled={setupStatus.inProgress}
            >
              <RefreshCw className="ml-2 h-4 w-4" />
              إعادة تهيئة البيانات
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* معلومات الجداول */}
      <Card>
        <CardHeader>
          <CardTitle>معلومات الجداول</CardTitle>
          <CardDescription>
            الجداول التي سيتم إنشاؤها في قاعدة البيانات
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 border rounded-md">
              <h3 className="font-medium mb-2 flex items-center gap-2">
                <Database className="h-4 w-4 text-blue-600" />
                جدول سير العمل (workflows)
              </h3>
              <p className="text-sm text-muted-foreground">
                يخزن معلومات سير العمل المعرفة في النظام، مثل الاسم والوصف
                والحالة وعدد الخطوات.
              </p>
            </div>

            <div className="p-4 border rounded-md">
              <h3 className="font-medium mb-2 flex items-center gap-2">
                <Database className="h-4 w-4 text-blue-600" />
                جدول قوالب سير العمل (workflow_templates)
              </h3>
              <p className="text-sm text-muted-foreground">
                يخزن قوالب سير العمل الجاهزة التي يمكن استخدامها لإنشاء سير عمل
                جديد بسرعة.
              </p>
            </div>

            <div className="p-4 border rounded-md">
              <h3 className="font-medium mb-2 flex items-center gap-2">
                <Database className="h-4 w-4 text-blue-600" />
                جدول سجل سير العمل (workflow_history)
              </h3>
              <p className="text-sm text-muted-foreground">
                يخزن سجل تنفيذ سير العمل، بما في ذلك تاريخ البدء والانتهاء
                والحالة والخطوة الحالية.
              </p>
            </div>

            <div className="p-4 border rounded-md">
              <h3 className="font-medium mb-2 flex items-center gap-2">
                <Database className="h-4 w-4 text-blue-600" />
                جدول العملاء (customers)
              </h3>
              <p className="text-sm text-muted-foreground">
                يخزن بيانات العملاء مثل الاسم والبريد الإلكتروني ورقم الهاتف
                والعنوان.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DatabaseSetup;
