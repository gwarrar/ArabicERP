import { supabase } from "./supabase";

// دالة لإنشاء جدول العملاء
export const createCustomersTable = async () => {
  try {
    // إنشاء وظيفة SQL لإنشاء جدول العملاء إذا لم يكن موجودًا
    const { error: createFunctionError } = await supabase.rpc(
      "create_customers_table_function",
    );
    if (
      createFunctionError &&
      !createFunctionError.message.includes("already exists")
    ) {
      console.warn(
        "خطأ في إنشاء وظيفة إنشاء جدول العملاء:",
        createFunctionError,
      );
    }

    // إنشاء جدول العملاء
    const { error } = await supabase.rpc("create_customers_table");

    // إذا فشلت العملية لأن الجدول موجود بالفعل، نتجاهل الخطأ
    if (error && !error.message.includes("already exists")) {
      throw error;
    }

    return { success: true, message: "تم إنشاء جدول العملاء بنجاح" };
  } catch (error) {
    console.error("خطأ في إنشاء جدول العملاء:", error);
    return { success: false, message: "فشل إنشاء جدول العملاء" };
  }
};

// دالة لإضافة عميل جديد
export const addCustomer = async (customerData) => {
  try {
    // التأكد من وجود جدول العملاء
    const tableResult = await createCustomersTable();
    if (!tableResult.success) {
      throw new Error("فشل في إنشاء جدول العملاء");
    }

    // إضافة العميل الجديد
    const { data, error } = await supabase
      .from("customers")
      .insert([
        {
          customer_id: `CUST-${Date.now().toString().slice(-6)}`,
          ...customerData,
          created_at: new Date().toISOString(),
          status: customerData.status || "نشط",
        },
      ])
      .select();

    if (error) throw error;

    return { success: true, data: data[0] };
  } catch (error) {
    console.error("خطأ في إضافة العميل:", error);
    return { success: false, error };
  }
};

// دالة لجلب جميع العملاء
export const getCustomers = async () => {
  try {
    // التأكد من وجود جدول العملاء
    const tableResult = await createCustomersTable();
    if (!tableResult.success) {
      throw new Error("فشل في إنشاء جدول العملاء");
    }

    // جلب بيانات العملاء
    const { data, error } = await supabase
      .from("customers")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;

    return { success: true, data };
  } catch (error) {
    console.error("خطأ في جلب بيانات العملاء:", error);
    return { success: false, error };
  }
};

// دالة لحذف عميل
export const deleteCustomer = async (customerId) => {
  try {
    const { error } = await supabase
      .from("customers")
      .delete()
      .eq("customer_id", customerId);

    if (error) throw error;

    return { success: true };
  } catch (error) {
    console.error("خطأ في حذف العميل:", error);
    return { success: false, error };
  }
};

// دالة لتحديث بيانات عميل
export const updateCustomer = async (customerId, updates) => {
  try {
    const { data, error } = await supabase
      .from("customers")
      .update(updates)
      .eq("customer_id", customerId)
      .select();

    if (error) throw error;

    return { success: true, data: data[0] };
  } catch (error) {
    console.error("خطأ في تحديث بيانات العميل:", error);
    return { success: false, error };
  }
};
