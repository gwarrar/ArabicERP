import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "lucide-react";
import { Account } from "@/types/accounting";

interface CashTransactionProps {
  type: "receipt" | "payment";
  accounts: Account[];
  onSave: () => void;
}

export const CashTransaction: React.FC<CashTransactionProps> = ({
  type,
  accounts,
  onSave,
}) => {
  const [transactionDate, setTransactionDate] = useState(
    new Date().toISOString().split("T")[0],
  );
  const [reference, setReference] = useState(
    `${type === "receipt" ? "REC" : "PAY"}-${new Date().getFullYear()}-${String(
      Math.floor(Math.random() * 10000),
    ).padStart(4, "0")}`,
  );
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState<number | "">("");
  const [selectedAccount, setSelectedAccount] = useState("");
  const [selectedCashAccount, setSelectedCashAccount] = useState(
    "1-1-1-1", // Default to main cash
  );
  const [costCenter, setCostCenter] = useState("المركز الرئيسي");

  // Flatten accounts for select, excluding cash accounts for payments and excluding non-cash for receipts
  const flattenAccounts = (accounts: Account[], prefix = ""): any[] => {
    let result: any[] = [];

    accounts.forEach((account) => {
      if (!account.isGroup) {
        // For payments, exclude cash accounts
        // For receipts, include only income accounts
        if (
          (type === "payment" &&
            account.type !== "cash" &&
            account.type !== "bank") ||
          (type === "receipt" && account.type === "income")
        ) {
          result.push({
            id: account.id,
            name: prefix + account.nameAr,
            code: account.code,
            type: account.type,
          });
        }
      }

      if (account.children && account.children.length > 0) {
        result = [
          ...result,
          ...flattenAccounts(
            account.children,
            prefix + (account.isGroup ? account.nameAr + " / " : ""),
          ),
        ];
      }
    });

    return result;
  };

  // Get only cash and bank accounts
  const getCashAccounts = (accounts: Account[]): any[] => {
    let result: any[] = [];

    accounts.forEach((account) => {
      if (
        !account.isGroup &&
        (account.type === "cash" || account.type === "bank")
      ) {
        result.push({
          id: account.id,
          name: account.nameAr,
          code: account.code,
        });
      }

      if (account.children && account.children.length > 0) {
        result = [...result, ...getCashAccounts(account.children)];
      }
    });

    return result;
  };

  const flatAccounts = flattenAccounts(accounts);
  const cashAccounts = getCashAccounts(accounts);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">التاريخ</label>
          <div className="relative">
            <Calendar className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="date"
              className="pr-10"
              value={transactionDate}
              onChange={(e) => setTransactionDate(e.target.value)}
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">المرجع</label>
          <Input
            value={reference}
            onChange={(e) => setReference(e.target.value)}
            placeholder="رقم المستند"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">
            {type === "receipt" ? "حساب الإيراد" : "حساب المصروف"}
          </label>
          <Select value={selectedAccount} onValueChange={setSelectedAccount}>
            <SelectTrigger>
              <SelectValue
                placeholder={
                  type === "receipt" ? "اختر حساب الإيراد" : "اختر حساب المصروف"
                }
              />
            </SelectTrigger>
            <SelectContent>
              {flatAccounts.map((account) => (
                <SelectItem key={account.id} value={account.id}>
                  {account.code} - {account.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">
            {type === "receipt" ? "حساب النقدية" : "حساب الدفع"}
          </label>
          <Select
            value={selectedCashAccount}
            onValueChange={setSelectedCashAccount}
          >
            <SelectTrigger>
              <SelectValue
                placeholder={
                  type === "receipt" ? "اختر حساب النقدية" : "اختر حساب الدفع"
                }
              />
            </SelectTrigger>
            <SelectContent>
              {cashAccounts.map((account) => (
                <SelectItem key={account.id} value={account.id}>
                  {account.code} - {account.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">البيان</label>
          <Input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="وصف المعاملة"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">المبلغ</label>
          <Input
            type="number"
            value={amount}
            onChange={(e) =>
              setAmount(e.target.value ? parseFloat(e.target.value) : "")
            }
            placeholder="أدخل المبلغ"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">مركز التكلفة</label>
          <Select value={costCenter} onValueChange={setCostCenter}>
            <SelectTrigger>
              <SelectValue placeholder="اختر مركز التكلفة" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="المركز الرئيسي">المركز الرئيسي</SelectItem>
              <SelectItem value="فرع كييف">فرع كييف</SelectItem>
              <SelectItem value="فرع أوديسا">فرع أوديسا</SelectItem>
              <SelectItem value="فرع خاركيف">فرع خاركيف</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="pt-4 border-t flex justify-end">
        <Button
          onClick={onSave}
          disabled={
            !selectedAccount ||
            !selectedCashAccount ||
            !description ||
            !amount ||
            !reference
          }
        >
          {type === "receipt" ? "حفظ المقبوضات" : "حفظ المدفوعات"}
        </Button>
      </div>
    </div>
  );
};
