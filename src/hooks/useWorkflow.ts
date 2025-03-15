import { useState, useEffect } from "react";
import { WorkflowService } from "@/services/workflow.service";

// Hook لإدارة سير العمل
export const useWorkflow = () => {
  const [workflows, setWorkflows] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // جلب جميع سير العمل
  const fetchWorkflows = async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await WorkflowService.getAllWorkflows();
      if (result.success) {
        setWorkflows(result.data || []);
      } else {
        setError("فشل في جلب بيانات سير العمل");
      }
    } catch (err) {
      setError("حدث خطأ أثناء جلب بيانات سير العمل");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // إنشاء سير عمل جديد
  const createWorkflow = async (workflowData: any) => {
    try {
      setLoading(true);
      setError(null);
      const result = await WorkflowService.createWorkflow(workflowData);
      if (result.success) {
        await fetchWorkflows(); // إعادة جلب البيانات بعد الإنشاء
        return { success: true, data: result.data };
      } else {
        setError("فشل في إنشاء سير العمل");
        return { success: false, error: "فشل في إنشاء سير العمل" };
      }
    } catch (err) {
      const errorMessage = "حدث خطأ أثناء إنشاء سير العمل";
      setError(errorMessage);
      console.error(err);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  // تحديث سير عمل
  const updateWorkflow = async (workflowId: string, updates: any) => {
    try {
      setLoading(true);
      setError(null);
      const result = await WorkflowService.updateWorkflow(workflowId, updates);
      if (result.success) {
        await fetchWorkflows(); // إعادة جلب البيانات بعد التحديث
        return { success: true, data: result.data };
      } else {
        setError("فشل في تحديث سير العمل");
        return { success: false, error: "فشل في تحديث سير العمل" };
      }
    } catch (err) {
      const errorMessage = "حدث خطأ أثناء تحديث سير العمل";
      setError(errorMessage);
      console.error(err);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  // حذف سير عمل
  const deleteWorkflow = async (workflowId: string) => {
    try {
      setLoading(true);
      setError(null);
      const result = await WorkflowService.deleteWorkflow(workflowId);
      if (result.success) {
        await fetchWorkflows(); // إعادة جلب البيانات بعد الحذف
        return { success: true };
      } else {
        setError("فشل في حذف سير العمل");
        return { success: false, error: "فشل في حذف سير العمل" };
      }
    } catch (err) {
      const errorMessage = "حدث خطأ أثناء حذف سير العمل";
      setError(errorMessage);
      console.error(err);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  // جلب سير عمل محدد
  const getWorkflowById = async (workflowId: string) => {
    try {
      setLoading(true);
      setError(null);
      const result = await WorkflowService.getWorkflowById(workflowId);
      if (result.success) {
        return { success: true, data: result.data };
      } else {
        setError("فشل في جلب بيانات سير العمل");
        return { success: false, error: "فشل في جلب بيانات سير العمل" };
      }
    } catch (err) {
      const errorMessage = "حدث خطأ أثناء جلب بيانات سير العمل";
      setError(errorMessage);
      console.error(err);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  // جلب سير العمل حسب الفئة
  const getWorkflowsByCategory = async (category: string) => {
    try {
      setLoading(true);
      setError(null);
      const result = await WorkflowService.getWorkflowsByCategory(category);
      if (result.success) {
        return { success: true, data: result.data };
      } else {
        setError("فشل في جلب بيانات سير العمل");
        return { success: false, error: "فشل في جلب بيانات سير العمل" };
      }
    } catch (err) {
      const errorMessage = "حدث خطأ أثناء جلب بيانات سير العمل";
      setError(errorMessage);
      console.error(err);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  // جلب سير العمل حسب الحالة
  const getWorkflowsByStatus = async (status: string) => {
    try {
      setLoading(true);
      setError(null);
      const result = await WorkflowService.getWorkflowsByStatus(status);
      if (result.success) {
        return { success: true, data: result.data };
      } else {
        setError("فشل في جلب بيانات سير العمل");
        return { success: false, error: "فشل في جلب بيانات سير العمل" };
      }
    } catch (err) {
      const errorMessage = "حدث خطأ أثناء جلب بيانات سير العمل";
      setError(errorMessage);
      console.error(err);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  // جلب البيانات عند تحميل المكون
  useEffect(() => {
    fetchWorkflows();
  }, []);

  return {
    workflows,
    loading,
    error,
    fetchWorkflows,
    createWorkflow,
    updateWorkflow,
    deleteWorkflow,
    getWorkflowById,
    getWorkflowsByCategory,
    getWorkflowsByStatus,
  };
};

// Hook لإدارة قوالب سير العمل
export const useWorkflowTemplates = () => {
  const [templates, setTemplates] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // جلب جميع القوالب
  const fetchTemplates = async () => {
    try {
      setLoading(true);
      setError(null);
      const { WorkflowTemplateService } = await import(
        "@/services/workflow.service"
      );
      const result = await WorkflowTemplateService.getAllTemplates();
      if (result.success) {
        setTemplates(result.data || []);
      } else {
        setError("فشل في جلب بيانات قوالب سير العمل");
      }
    } catch (err) {
      setError("حدث خطأ أثناء جلب بيانات قوالب سير العمل");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // تبديل حالة المفضلة للقالب
  const toggleFavorite = async (templateId: string, isFavorite: boolean) => {
    try {
      setLoading(true);
      setError(null);
      const { WorkflowTemplateService } = await import(
        "@/services/workflow.service"
      );
      const result = await WorkflowTemplateService.toggleFavorite(
        templateId,
        isFavorite,
      );
      if (result.success) {
        await fetchTemplates(); // إعادة جلب البيانات بعد التحديث
        return { success: true, data: result.data };
      } else {
        setError("فشل في تحديث حالة المفضلة للقالب");
        return { success: false, error: "فشل في تحديث حالة المفضلة للقالب" };
      }
    } catch (err) {
      const errorMessage = "حدث خطأ أثناء تحديث حالة المفضلة للقالب";
      setError(errorMessage);
      console.error(err);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  // جلب البيانات عند تحميل المكون
  useEffect(() => {
    fetchTemplates();
  }, []);

  return {
    templates,
    loading,
    error,
    fetchTemplates,
    toggleFavorite,
  };
};

// Hook لإدارة سجل سير العمل
export const useWorkflowHistory = () => {
  const [history, setHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // جلب جميع السجلات
  const fetchHistory = async () => {
    try {
      setLoading(true);
      setError(null);
      const { WorkflowHistoryService } = await import(
        "@/services/workflow.service"
      );
      const result = await WorkflowHistoryService.getAllHistory();
      if (result.success) {
        setHistory(result.data || []);
      } else {
        setError("فشل في جلب بيانات سجل سير العمل");
      }
    } catch (err) {
      setError("حدث خطأ أثناء جلب بيانات سجل سير العمل");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // جلب سجلات سير عمل محدد
  const getHistoryByWorkflowId = async (workflowId: string) => {
    try {
      setLoading(true);
      setError(null);
      const { WorkflowHistoryService } = await import(
        "@/services/workflow.service"
      );
      const result =
        await WorkflowHistoryService.getHistoryByWorkflowId(workflowId);
      if (result.success) {
        return { success: true, data: result.data };
      } else {
        setError("فشل في جلب بيانات سجل سير العمل");
        return { success: false, error: "فشل في جلب بيانات سجل سير العمل" };
      }
    } catch (err) {
      const errorMessage = "حدث خطأ أثناء جلب بيانات سجل سير العمل";
      setError(errorMessage);
      console.error(err);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  // جلب سجلات حسب الحالة
  const getHistoryByStatus = async (status: string) => {
    try {
      setLoading(true);
      setError(null);
      const { WorkflowHistoryService } = await import(
        "@/services/workflow.service"
      );
      const result = await WorkflowHistoryService.getHistoryByStatus(status);
      if (result.success) {
        return { success: true, data: result.data };
      } else {
        setError("فشل في جلب بيانات سجل سير العمل");
        return { success: false, error: "فشل في جلب بيانات سجل سير العمل" };
      }
    } catch (err) {
      const errorMessage = "حدث خطأ أثناء جلب بيانات سجل سير العمل";
      setError(errorMessage);
      console.error(err);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  // جلب البيانات عند تحميل المكون
  useEffect(() => {
    fetchHistory();
  }, []);

  return {
    history,
    loading,
    error,
    fetchHistory,
    getHistoryByWorkflowId,
    getHistoryByStatus,
  };
};
