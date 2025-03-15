import { supabase } from "@/lib/supabase";

// خدمة إدارة سير العمل
export const WorkflowService = {
  // الحصول على جميع سير العمل
  getAllWorkflows: async () => {
    try {
      const { data, error } = await supabase
        .from("workflows")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return { success: true, data };
    } catch (error) {
      console.error("خطأ في الحصول على سير العمل:", error);
      return { success: false, error };
    }
  },

  // الحصول على سير عمل محدد
  getWorkflowById: async (workflowId: string) => {
    try {
      const { data, error } = await supabase
        .from("workflows")
        .select("*")
        .eq("workflow_id", workflowId)
        .single();

      if (error) throw error;
      return { success: true, data };
    } catch (error) {
      console.error(`خطأ في الحصول على سير العمل ${workflowId}:`, error);
      return { success: false, error };
    }
  },

  // إنشاء سير عمل جديد
  createWorkflow: async (workflowData: any) => {
    try {
      const { data, error } = await supabase
        .from("workflows")
        .insert([workflowData])
        .select();

      if (error) throw error;
      return { success: true, data: data[0] };
    } catch (error) {
      console.error("خطأ في إنشاء سير العمل:", error);
      return { success: false, error };
    }
  },

  // تحديث سير عمل
  updateWorkflow: async (workflowId: string, updates: any) => {
    try {
      const { data, error } = await supabase
        .from("workflows")
        .update(updates)
        .eq("workflow_id", workflowId)
        .select();

      if (error) throw error;
      return { success: true, data: data[0] };
    } catch (error) {
      console.error(`خطأ في تحديث سير العمل ${workflowId}:`, error);
      return { success: false, error };
    }
  },

  // حذف سير عمل
  deleteWorkflow: async (workflowId: string) => {
    try {
      const { error } = await supabase
        .from("workflows")
        .delete()
        .eq("workflow_id", workflowId);

      if (error) throw error;
      return { success: true };
    } catch (error) {
      console.error(`خطأ في حذف سير العمل ${workflowId}:`, error);
      return { success: false, error };
    }
  },

  // الحصول على سير العمل حسب الفئة
  getWorkflowsByCategory: async (category: string) => {
    try {
      const { data, error } = await supabase
        .from("workflows")
        .select("*")
        .eq("category", category)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return { success: true, data };
    } catch (error) {
      console.error(`خطأ في الحصول على سير العمل للفئة ${category}:`, error);
      return { success: false, error };
    }
  },

  // الحصول على سير العمل حسب الحالة
  getWorkflowsByStatus: async (status: string) => {
    try {
      const { data, error } = await supabase
        .from("workflows")
        .select("*")
        .eq("status", status)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return { success: true, data };
    } catch (error) {
      console.error(`خطأ في الحصول على سير العمل للحالة ${status}:`, error);
      return { success: false, error };
    }
  },
};

// خدمة إدارة قوالب سير العمل
export const WorkflowTemplateService = {
  // الحصول على جميع القوالب
  getAllTemplates: async () => {
    try {
      const { data, error } = await supabase
        .from("workflow_templates")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return { success: true, data };
    } catch (error) {
      console.error("خطأ في الحصول على قوالب سير العمل:", error);
      return { success: false, error };
    }
  },

  // الحصول على قالب محدد
  getTemplateById: async (templateId: string) => {
    try {
      const { data, error } = await supabase
        .from("workflow_templates")
        .select("*")
        .eq("template_id", templateId)
        .single();

      if (error) throw error;
      return { success: true, data };
    } catch (error) {
      console.error(`خطأ في الحصول على قالب سير العمل ${templateId}:`, error);
      return { success: false, error };
    }
  },

  // إنشاء قالب جديد
  createTemplate: async (templateData: any) => {
    try {
      const { data, error } = await supabase
        .from("workflow_templates")
        .insert([templateData])
        .select();

      if (error) throw error;
      return { success: true, data: data[0] };
    } catch (error) {
      console.error("خطأ في إنشاء قالب سير العمل:", error);
      return { success: false, error };
    }
  },

  // تحديث قالب
  updateTemplate: async (templateId: string, updates: any) => {
    try {
      const { data, error } = await supabase
        .from("workflow_templates")
        .update(updates)
        .eq("template_id", templateId)
        .select();

      if (error) throw error;
      return { success: true, data: data[0] };
    } catch (error) {
      console.error(`خطأ في تحديث قالب سير العمل ${templateId}:`, error);
      return { success: false, error };
    }
  },

  // حذف قالب
  deleteTemplate: async (templateId: string) => {
    try {
      const { error } = await supabase
        .from("workflow_templates")
        .delete()
        .eq("template_id", templateId);

      if (error) throw error;
      return { success: true };
    } catch (error) {
      console.error(`خطأ في حذف قالب سير العمل ${templateId}:`, error);
      return { success: false, error };
    }
  },

  // تبديل حالة المفضلة للقالب
  toggleFavorite: async (templateId: string, isFavorite: boolean) => {
    try {
      const { data, error } = await supabase
        .from("workflow_templates")
        .update({ is_favorite: isFavorite })
        .eq("template_id", templateId)
        .select();

      if (error) throw error;
      return { success: true, data: data[0] };
    } catch (error) {
      console.error(`خطأ في تبديل حالة المفضلة للقالب ${templateId}:`, error);
      return { success: false, error };
    }
  },
};

// خدمة إدارة سجل سير العمل
export const WorkflowHistoryService = {
  // الحصول على جميع سجلات سير العمل
  getAllHistory: async () => {
    try {
      const { data, error } = await supabase
        .from("workflow_history")
        .select("*")
        .order("started_at", { ascending: false });

      if (error) throw error;
      return { success: true, data };
    } catch (error) {
      console.error("خطأ في الحصول على سجل سير العمل:", error);
      return { success: false, error };
    }
  },

  // الحصول على سجل محدد
  getHistoryById: async (instanceId: string) => {
    try {
      const { data, error } = await supabase
        .from("workflow_history")
        .select("*")
        .eq("instance_id", instanceId)
        .single();

      if (error) throw error;
      return { success: true, data };
    } catch (error) {
      console.error(`خطأ في الحصول على سجل سير العمل ${instanceId}:`, error);
      return { success: false, error };
    }
  },

  // إنشاء سجل جديد
  createHistoryEntry: async (historyData: any) => {
    try {
      const { data, error } = await supabase
        .from("workflow_history")
        .insert([historyData])
        .select();

      if (error) throw error;
      return { success: true, data: data[0] };
    } catch (error) {
      console.error("خطأ في إنشاء سجل سير العمل:", error);
      return { success: false, error };
    }
  },

  // تحديث سجل
  updateHistoryEntry: async (instanceId: string, updates: any) => {
    try {
      const { data, error } = await supabase
        .from("workflow_history")
        .update(updates)
        .eq("instance_id", instanceId)
        .select();

      if (error) throw error;
      return { success: true, data: data[0] };
    } catch (error) {
      console.error(`خطأ في تحديث سجل سير العمل ${instanceId}:`, error);
      return { success: false, error };
    }
  },

  // الحصول على سجلات سير عمل محدد
  getHistoryByWorkflowId: async (workflowId: string) => {
    try {
      const { data, error } = await supabase
        .from("workflow_history")
        .select("*")
        .eq("workflow_id", workflowId)
        .order("started_at", { ascending: false });

      if (error) throw error;
      return { success: true, data };
    } catch (error) {
      console.error(`خطأ في الحصول على سجلات سير العمل ${workflowId}:`, error);
      return { success: false, error };
    }
  },

  // الحصول على سجلات حسب الحالة
  getHistoryByStatus: async (status: string) => {
    try {
      const { data, error } = await supabase
        .from("workflow_history")
        .select("*")
        .eq("status", status)
        .order("started_at", { ascending: false });

      if (error) throw error;
      return { success: true, data };
    } catch (error) {
      console.error(
        `خطأ في الحصول على سجلات سير العمل للحالة ${status}:`,
        error,
      );
      return { success: false, error };
    }
  },
};
