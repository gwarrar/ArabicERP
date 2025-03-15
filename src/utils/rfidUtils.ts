/**
 * وظائف مساعدة لمعالجة بيانات RFID
 */

// معالجة البيانات الممسوحة من RFID ومقارنتها بالمخزون المتوقع
export const processRFIDData = (
  scannedItems: any[],
  expectedInventory: any[],
) => {
  // تحويل البيانات الممسوحة إلى تنسيق مناسب للمقارنة
  const scannedMap = new Map();

  // تجميع العناصر الممسوحة حسب رقم المنتج
  scannedItems.forEach((item) => {
    const productId = item.productId;

    if (scannedMap.has(productId)) {
      scannedMap.set(productId, scannedMap.get(productId) + 1);
    } else {
      scannedMap.set(productId, 1);
    }
  });

  // مقارنة البيانات الممسوحة مع المخزون المتوقع
  const results = expectedInventory.map((item) => {
    const scannedQty = scannedMap.get(item.productId) || 0;
    const difference = scannedQty - item.expectedQty;

    return {
      ...item,
      actualQty: scannedQty,
      difference,
      status:
        difference === 0
          ? "مطابق"
          : Math.abs(difference) <= Math.max(1, item.expectedQty * 0.05)
            ? "فرق بسيط"
            : "فرق كبير",
    };
  });

  return results;
};

// تحويل بيانات RFID إلى تنسيق CSV للتصدير
export const convertRFIDDataToCSV = (scannedItems: any[]) => {
  // رؤوس الأعمدة
  const headers = ["رقم التاج", "رقم المنتج", "وقت المسح"];

  // تحويل البيانات إلى صفوف
  const rows = scannedItems.map((item) => [
    item.tagId,
    item.productId,
    new Date(item.timestamp).toLocaleString(),
  ]);

  // دمج الرؤوس والصفوف
  const csvContent = [
    headers.join(","),
    ...rows.map((row) => row.join(",")),
  ].join("\n");

  return csvContent;
};

// تصدير بيانات RFID كملف CSV
export const exportRFIDDataToCSV = (
  scannedItems: any[],
  fileName: string = "rfid-scan-data.csv",
) => {
  const csvContent = convertRFIDDataToCSV(scannedItems);

  // إنشاء رابط تنزيل
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);

  // إنشاء عنصر رابط وتنزيل الملف
  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", fileName);
  link.style.visibility = "hidden";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

// تحليل بيانات RFID للحصول على إحصائيات
export const analyzeRFIDData = (
  scannedItems: any[],
  expectedInventory: any[],
) => {
  const processedData = processRFIDData(scannedItems, expectedInventory);

  // حساب الإحصائيات
  const stats = {
    totalScanned: scannedItems.length,
    uniqueProducts: new Set(scannedItems.map((item) => item.productId)).size,
    matchingItems: processedData.filter((item) => item.status === "مطابق")
      .length,
    minorDiscrepancies: processedData.filter(
      (item) => item.status === "فرق بسيط",
    ).length,
    majorDiscrepancies: processedData.filter(
      (item) => item.status === "فرق كبير",
    ).length,
    scanDuration: 0, // يتم حسابها من بيانات الوقت الفعلية
  };

  // حساب مدة المسح إذا كانت هناك عناصر
  if (scannedItems.length > 0) {
    const startTime = new Date(scannedItems[0].timestamp).getTime();
    const endTime = new Date(
      scannedItems[scannedItems.length - 1].timestamp,
    ).getTime();
    stats.scanDuration = Math.round((endTime - startTime) / 1000); // بالثواني
  }

  return stats;
};
