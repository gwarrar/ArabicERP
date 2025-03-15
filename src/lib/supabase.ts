import { createClient } from "@supabase/supabase-js";

// استخدام متغيرات البيئة للاتصال بـ Supabase
const supabaseUrl =
  import.meta.env.VITE_SUPABASE_URL || "https://example.supabase.co";
const supabaseAnonKey =
  import.meta.env.VITE_SUPABASE_ANON_KEY || "example-anon-key";

// إنشاء عميل Supabase
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// دالة للتحقق من حالة الاتصال
export const checkSupabaseConnection = async () => {
  try {
    // محاولة إنشاء جدول مؤقت للتحقق من الاتصال
    const { error: createTableError } = await supabase.rpc(
      "create_customers_table_function",
    );
    if (
      createTableError &&
      !createTableError.message.includes("already exists")
    ) {
      console.warn("خطأ في إنشاء وظيفة إنشاء جدول العملاء:", createTableError);
    }

    // محاولة الاتصال بقاعدة البيانات
    const { data, error } = await supabase
      .from("customers")
      .select("count")
      .limit(1);
    if (error && error.code !== "42P01") {
      // 42P01 هو رمز الخطأ عندما لا يوجد جدول
      throw error;
    }
    return { success: true, message: "تم الاتصال بنجاح" };
  } catch (error) {
    console.error("خطأ في الاتصال بـ Supabase:", error);
    return { success: false, message: "فشل الاتصال بقاعدة البيانات" };
  }
};

// دالة لإنشاء جداول قاعدة البيانات
export const setupDatabase = async () => {
  try {
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

    // إنشاء جدول سير العمل
    const { error: workflowsError } = await supabase.rpc(
      "create_workflows_table",
    );
    if (workflowsError && !workflowsError.message.includes("already exists"))
      throw workflowsError;

    // إنشاء جدول قوالب سير العمل
    const { error: templatesError } = await supabase.rpc(
      "create_workflow_templates_table",
    );
    if (templatesError && !templatesError.message.includes("already exists"))
      throw templatesError;

    // إنشاء جدول سجل سير العمل
    const { error: historyError } = await supabase.rpc(
      "create_workflow_history_table",
    );
    if (historyError && !historyError.message.includes("already exists"))
      throw historyError;

    // إنشاء جدول العملاء
    const { error: customersError } = await supabase.rpc(
      "create_customers_table",
    );
    if (customersError && !customersError.message.includes("already exists"))
      throw customersError;

    return { success: true, message: "تم إنشاء الجداول بنجاح" };
  } catch (error) {
    console.error("خطأ في إنشاء الجداول:", error);
    return { success: false, message: "فشل إنشاء الجداول" };
  }
};

// دالة لإدخال البيانات التجريبية
export const insertSampleData = async () => {
  try {
    // إدخال بيانات سير العمل
    const { error: workflowsError } = await supabase.from("workflows").insert([
      {
        workflow_id: "WF-001",
        name: "دورة الموافقة على المشتريات",
        description: "سير عمل للموافقة على طلبات الشراء",
        category: "المشتريات",
        status: "نشط",
        steps: 5,
        created_by: "أحمد محمد",
        created_at: new Date("2024-08-10").toISOString(),
        last_run: new Date("2024-08-15").toISOString(),
        instances: 24,
      },
      {
        workflow_id: "WF-002",
        name: "معالجة طلبات العملاء",
        description: "سير عمل لمعالجة طلبات العملاء الجديدة",
        category: "المبيعات",
        status: "نشط",
        steps: 4,
        created_by: "محمد علي",
        created_at: new Date("2024-08-05").toISOString(),
        last_run: new Date("2024-08-15").toISOString(),
        instances: 56,
      },
      {
        workflow_id: "WF-003",
        name: "الموافقة على الإجازات",
        description: "سير عمل للموافقة على طلبات الإجازات",
        category: "الموارد البشرية",
        status: "نشط",
        steps: 3,
        created_by: "سارة أحمد",
        created_at: new Date("2024-07-20").toISOString(),
        last_run: new Date("2024-08-14").toISOString(),
        instances: 18,
      },
    ]);
    if (workflowsError) throw workflowsError;

    // إدخال بيانات قوالب سير العمل
    const { error: templatesError } = await supabase
      .from("workflow_templates")
      .insert([
        {
          template_id: "TPL-001",
          name: "قالب الموافقة العام",
          description: "قالب عام لعمليات الموافقة متعددة المستويات",
          category: "عام",
          steps: 4,
          created_by: "النظام",
          created_at: new Date("2024-05-01").toISOString(),
          usage_count: 35,
          rating: 4.5,
          is_favorite: true,
          tags: ["موافقة", "متعدد المستويات"],
        },
        {
          template_id: "TPL-002",
          name: "قالب معالجة الطلبات",
          description: "قالب لمعالجة طلبات العملاء والموردين",
          category: "المبيعات",
          steps: 5,
          created_by: "النظام",
          created_at: new Date("2024-05-01").toISOString(),
          usage_count: 28,
          rating: 4.2,
          is_favorite: false,
          tags: ["طلبات", "عملاء", "معالجة"],
        },
      ]);
    if (templatesError) throw templatesError;

    // إدخال بيانات سجل سير العمل
    const { error: historyError } = await supabase
      .from("workflow_history")
      .insert([
        {
          instance_id: "INST-001",
          workflow_id: "WF-001",
          workflow_name: "دورة الموافقة على المشتريات",
          reference: "PO-2024-0125",
          started_at: new Date("2024-08-15 09:30").toISOString(),
          completed_at: new Date("2024-08-15 14:45").toISOString(),
          duration: "5 ساعات 15 دقيقة",
          status: "مكتمل",
          initiated_by: "أحمد محمد",
          current_step: "مكتمل",
        },
        {
          instance_id: "INST-002",
          workflow_id: "WF-002",
          workflow_name: "معالجة طلبات العملاء",
          reference: "ORD-2024-0356",
          started_at: new Date("2024-08-15 10:15").toISOString(),
          status: "قيد التنفيذ",
          initiated_by: "محمد علي",
          current_step: "مراجعة الطلب",
          duration: "6 ساعات 30 دقيقة",
        },
      ]);
    if (historyError) throw historyError;

    return { success: true, message: "تم إدخال البيانات التجريبية بنجاح" };
  } catch (error) {
    console.error("خطأ في إدخال البيانات التجريبية:", error);
    return { success: false, message: "فشل إدخال البيانات التجريبية" };
  }
};

// دالة لمسح جميع البيانات
export const clearAllData = async () => {
  try {
    // مسح البيانات من جدول سجل سير العمل
    const { error: historyError } = await supabase
      .from("workflow_history")
      .delete()
      .gt("id", 0);
    if (historyError) throw historyError;

    // مسح البيانات من جدول قوالب سير العمل
    const { error: templatesError } = await supabase
      .from("workflow_templates")
      .delete()
      .gt("id", 0);
    if (templatesError) throw templatesError;

    // مسح البيانات من جدول سير العمل
    const { error: workflowsError } = await supabase
      .from("workflows")
      .delete()
      .gt("id", 0);
    if (workflowsError) throw workflowsError;

    return { success: true, message: "تم مسح جميع البيانات بنجاح" };
  } catch (error) {
    console.error("خطأ في مسح البيانات:", error);
    return { success: false, message: "فشل مسح البيانات" };
  }
};
