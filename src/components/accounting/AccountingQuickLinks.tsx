import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  FileText,
  DollarSign,
  CreditCard,
  BarChart3,
  Calculator,
  BookOpen,
  Landmark,
  Receipt,
  Wallet,
  PiggyBank,
  Banknote,
  Coins,
  Clock,
  AlertTriangle,
  CheckCircle,
  Calendar,
  ArrowRightLeft,
  Building,
  Briefcase,
  FileSpreadsheet,
} from "lucide-react";

interface AccountingQuickLinksProps {
  onOpenJournalEntries?: () => void;
  onOpenCashJournal?: () => void;
  onOpenAccountTree?: () => void;
  onOpenFinancialReports?: () => void;
  onOpenCostCenters?: () => void;
  onOpenCurrencyExchange?: () => void;
  onOpenBankAccounts?: () => void;
  onOpenTaxSettings?: () => void;
}

const AccountingQuickLinks: React.FC<AccountingQuickLinksProps> = ({
  onOpenJournalEntries,
  onOpenCashJournal,
  onOpenAccountTree,
  onOpenFinancialReports,
  onOpenCostCenters,
  onOpenCurrencyExchange,
  onOpenBankAccounts,
  onOpenTaxSettings,
}) => {
  // تنفيذ الإجراء مع التحقق من وجود الدالة
  const handleAction = (action?: () => void) => {
    if (action) {
      action();
    }
  };

  return (
    <Card className="bg-white dark:bg-[#1e1e2d] dark:text-white">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-bold">روابط سريعة</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <Button
            variant="outline"
            className="h-auto flex flex-col items-center justify-center p-4 hover:bg-blue-50 hover:text-blue-700 hover:border-blue-200 transition-colors"
            onClick={() => handleAction(onOpenJournalEntries)}
          >
            <BookOpen className="h-8 w-8 mb-2 text-blue-600" />
            <span className="text-sm font-medium">القيود المحاسبية</span>
          </Button>

          <Button
            variant="outline"
            className="h-auto flex flex-col items-center justify-center p-4 hover:bg-green-50 hover:text-green-700 hover:border-green-200 transition-colors"
            onClick={() => handleAction(onOpenCashJournal)}
          >
            <Wallet className="h-8 w-8 mb-2 text-green-600" />
            <span className="text-sm font-medium">يومية الصندوق</span>
          </Button>

          <Button
            variant="outline"
            className="h-auto flex flex-col items-center justify-center p-4 hover:bg-purple-50 hover:text-purple-700 hover:border-purple-200 transition-colors"
            onClick={() => handleAction(onOpenAccountTree)}
          >
            <FileSpreadsheet className="h-8 w-8 mb-2 text-purple-600" />
            <span className="text-sm font-medium">شجرة الحسابات</span>
          </Button>

          <Button
            variant="outline"
            className="h-auto flex flex-col items-center justify-center p-4 hover:bg-amber-50 hover:text-amber-700 hover:border-amber-200 transition-colors"
            onClick={() => handleAction(onOpenFinancialReports)}
          >
            <BarChart3 className="h-8 w-8 mb-2 text-amber-600" />
            <span className="text-sm font-medium">التقارير المالية</span>
          </Button>

          <Button
            variant="outline"
            className="h-auto flex flex-col items-center justify-center p-4 hover:bg-rose-50 hover:text-rose-700 hover:border-rose-200 transition-colors"
            onClick={() => handleAction(onOpenCostCenters)}
          >
            <Building className="h-8 w-8 mb-2 text-rose-600" />
            <span className="text-sm font-medium">مراكز التكلفة</span>
          </Button>

          <Button
            variant="outline"
            className="h-auto flex flex-col items-center justify-center p-4 hover:bg-indigo-50 hover:text-indigo-700 hover:border-indigo-200 transition-colors"
            onClick={() => handleAction(onOpenCurrencyExchange)}
          >
            <ArrowRightLeft className="h-8 w-8 mb-2 text-indigo-600" />
            <span className="text-sm font-medium">أسعار الصرف</span>
          </Button>

          <Button
            variant="outline"
            className="h-auto flex flex-col items-center justify-center p-4 hover:bg-cyan-50 hover:text-cyan-700 hover:border-cyan-200 transition-colors"
            onClick={() => handleAction(onOpenBankAccounts)}
          >
            <Landmark className="h-8 w-8 mb-2 text-cyan-600" />
            <span className="text-sm font-medium">الحسابات البنكية</span>
          </Button>

          <Button
            variant="outline"
            className="h-auto flex flex-col items-center justify-center p-4 hover:bg-teal-50 hover:text-teal-700 hover:border-teal-200 transition-colors"
            onClick={() => handleAction(onOpenTaxSettings)}
          >
            <Calculator className="h-8 w-8 mb-2 text-teal-600" />
            <span className="text-sm font-medium">إعدادات الضرائب</span>
          </Button>
        </div>

        <div className="mt-6">
          <h3 className="text-sm font-medium mb-3">المعاملات الأخيرة</h3>
          <div className="space-y-2">
            <div className="flex items-center justify-between p-2 rounded-md border hover:bg-gray-50 cursor-pointer">
              <div className="flex items-center">
                <div className="p-2 bg-blue-100 rounded-md ml-3">
                  <BookOpen className="h-4 w-4 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium text-sm">
                    قيد محاسبي #JE-2024-0042
                  </p>
                  <p className="text-xs text-muted-foreground">
                    تسجيل مصاريف تشغيلية
                  </p>
                </div>
              </div>
              <div className="text-sm font-medium">₴ 12,500</div>
            </div>

            <div className="flex items-center justify-between p-2 rounded-md border hover:bg-gray-50 cursor-pointer">
              <div className="flex items-center">
                <div className="p-2 bg-green-100 rounded-md ml-3">
                  <Wallet className="h-4 w-4 text-green-600" />
                </div>
                <div>
                  <p className="font-medium text-sm">
                    معاملة نقدية #CT-2024-0078
                  </p>
                  <p className="text-xs text-muted-foreground">
                    استلام دفعة من العميل
                  </p>
                </div>
              </div>
              <div className="text-sm font-medium">₴ 8,750</div>
            </div>

            <div className="flex items-center justify-between p-2 rounded-md border hover:bg-gray-50 cursor-pointer">
              <div className="flex items-center">
                <div className="p-2 bg-purple-100 rounded-md ml-3">
                  <ArrowRightLeft className="h-4 w-4 text-purple-600" />
                </div>
                <div>
                  <p className="font-medium text-sm">
                    تحويل بنكي #BT-2024-0015
                  </p>
                  <p className="text-xs text-muted-foreground">
                    تحويل إلى حساب المشتريات
                  </p>
                </div>
              </div>
              <div className="text-sm font-medium">₴ 15,200</div>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <h3 className="text-sm font-medium mb-3">تنبيهات مالية</h3>
          <div className="space-y-2">
            <div className="flex items-center justify-between p-2 rounded-md border hover:bg-gray-50 cursor-pointer">
              <div className="flex items-center">
                <div className="p-2 bg-red-100 rounded-md ml-3">
                  <AlertTriangle className="h-4 w-4 text-red-600" />
                </div>
                <div>
                  <p className="font-medium text-sm">فواتير مستحقة الدفع</p>
                  <p className="text-xs text-muted-foreground">
                    5 فواتير تستحق الدفع خلال 3 أيام
                  </p>
                </div>
              </div>
              <Button variant="outline" size="sm" className="h-8">
                عرض
              </Button>
            </div>

            <div className="flex items-center justify-between p-2 rounded-md border hover:bg-gray-50 cursor-pointer">
              <div className="flex items-center">
                <div className="p-2 bg-amber-100 rounded-md ml-3">
                  <Clock className="h-4 w-4 text-amber-600" />
                </div>
                <div>
                  <p className="font-medium text-sm">تسوية حساب بنكي</p>
                  <p className="text-xs text-muted-foreground">
                    مطلوب تسوية الحساب البنكي الرئيسي
                  </p>
                </div>
              </div>
              <Button variant="outline" size="sm" className="h-8">
                تسوية
              </Button>
            </div>

            <div className="flex items-center justify-between p-2 rounded-md border hover:bg-gray-50 cursor-pointer">
              <div className="flex items-center">
                <div className="p-2 bg-green-100 rounded-md ml-3">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                </div>
                <div>
                  <p className="font-medium text-sm">اكتمال إقفال الشهر</p>
                  <p className="text-xs text-muted-foreground">
                    تم إقفال الفترة المحاسبية بنجاح
                  </p>
                </div>
              </div>
              <Button variant="outline" size="sm" className="h-8">
                عرض التقرير
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AccountingQuickLinks;
