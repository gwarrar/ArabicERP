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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Calendar, Plus, Trash, AlertCircle } from "lucide-react";
import { Account } from "@/types/accounting";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface NewJournalEntryProps {
  accounts: Account[];
  onSave: () => void;
}

interface EntryLine {
  id: string;
  account: string;
  description: string;
  debit: number;
  credit: number;
}

export const NewJournalEntry: React.FC<NewJournalEntryProps> = ({
  accounts,
  onSave,
}) => {
  const [entryDate, setEntryDate] = useState(
    new Date().toISOString().split("T")[0],
  );
  const [reference, setReference] = useState(
    `JE-${new Date().getFullYear()}-${String(
      Math.floor(Math.random() * 10000),
    ).padStart(4, "0")}`,
  );
  const [description, setDescription] = useState("");
  const [lines, setLines] = useState<EntryLine[]>([
    {
      id: "1",
      account: "",
      description: "",
      debit: 0,
      credit: 0,
    },
    {
      id: "2",
      account: "",
      description: "",
      debit: 0,
      credit: 0,
    },
  ]);

  const addLine = () => {
    setLines([
      ...lines,
      {
        id: `${lines.length + 1}`,
        account: "",
        description: "",
        debit: 0,
        credit: 0,
      },
    ]);
  };

  const removeLine = (id: string) => {
    if (lines.length <= 2) return; // Keep at least 2 lines
    setLines(lines.filter((line) => line.id !== id));
  };

  const updateLine = (id: string, field: keyof EntryLine, value: any) => {
    setLines(
      lines.map((line) =>
        line.id === id ? { ...line, [field]: value } : line,
      ),
    );
  };

  const totalDebit = lines.reduce((sum, line) => sum + (line.debit || 0), 0);
  const totalCredit = lines.reduce((sum, line) => sum + (line.credit || 0), 0);
  const isBalanced = totalDebit === totalCredit && totalDebit > 0;
  const difference = Math.abs(totalDebit - totalCredit);

  // Flatten accounts for select
  const flattenAccounts = (accounts: Account[], prefix = ""): any[] => {
    let result: any[] = [];

    accounts.forEach((account) => {
      if (!account.isGroup) {
        result.push({
          id: account.id,
          name: prefix + account.nameAr,
          code: account.code,
        });
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

  const flatAccounts = flattenAccounts(accounts);

  // Check if all required fields are filled
  const hasEmptyRequiredFields = lines.some((line) =>
    line.debit > 0 || line.credit > 0 ? !line.account : false,
  );

  // Handle save with validation
  const handleSave = () => {
    if (isBalanced && !hasEmptyRequiredFields && description && reference) {
      onSave();
    }
  };

  return (
    <div className="space-y-6 bg-white p-6 rounded-lg">
      <h2 className="text-xl font-bold mb-4">إنشاء قيد محاسبي جديد</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">التاريخ</label>
          <div className="relative">
            <Calendar className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="date"
              className="pr-10"
              value={entryDate}
              onChange={(e) => setEntryDate(e.target.value)}
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">المرجع</label>
          <Input
            value={reference}
            onChange={(e) => setReference(e.target.value)}
            placeholder="رقم القيد"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">البيان</label>
          <Input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="وصف القيد"
          />
        </div>
      </div>

      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]">#</TableHead>
              <TableHead>الحساب</TableHead>
              <TableHead>البيان</TableHead>
              <TableHead className="text-left">مدين</TableHead>
              <TableHead className="text-left">دائن</TableHead>
              <TableHead className="w-[80px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {lines.map((line, index) => (
              <TableRow key={line.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>
                  <Select
                    value={line.account}
                    onValueChange={(value) =>
                      updateLine(line.id, "account", value)
                    }
                  >
                    <SelectTrigger
                      className={`w-full ${(line.debit > 0 || line.credit > 0) && !line.account ? "border-red-500" : ""}`}
                    >
                      <SelectValue placeholder="اختر الحساب" />
                    </SelectTrigger>
                    <SelectContent>
                      {flatAccounts.map((account) => (
                        <SelectItem key={account.id} value={account.id}>
                          {account.code} - {account.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </TableCell>
                <TableCell>
                  <Input
                    value={line.description}
                    onChange={(e) =>
                      updateLine(line.id, "description", e.target.value)
                    }
                    placeholder="وصف البند"
                  />
                </TableCell>
                <TableCell>
                  <Input
                    type="number"
                    value={line.debit || ""}
                    onChange={(e) => {
                      const value = parseFloat(e.target.value) || 0;
                      updateLine(line.id, "debit", value);
                      if (value > 0) updateLine(line.id, "credit", 0);
                    }}
                    className="text-left"
                  />
                </TableCell>
                <TableCell>
                  <Input
                    type="number"
                    value={line.credit || ""}
                    onChange={(e) => {
                      const value = parseFloat(e.target.value) || 0;
                      updateLine(line.id, "credit", value);
                      if (value > 0) updateLine(line.id, "debit", 0);
                    }}
                    className="text-left"
                  />
                </TableCell>
                <TableCell>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeLine(line.id)}
                  >
                    <Trash className="h-4 w-4 text-red-500" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            <TableRow className="bg-muted/20">
              <TableCell colSpan={3} className="text-left font-medium">
                الإجمالي
              </TableCell>
              <TableCell className="text-left font-medium text-red-600">
                {totalDebit.toLocaleString()} ₴
              </TableCell>
              <TableCell className="text-left font-medium text-green-600">
                {totalCredit.toLocaleString()} ₴
              </TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>

      <div className="flex justify-between items-center">
        <Button variant="outline" onClick={addLine}>
          <Plus className="ml-2 h-4 w-4" />
          إضافة سطر
        </Button>

        <div className="flex items-center gap-2">
          {!isBalanced && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="flex items-center text-sm text-red-500">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    القيد غير متوازن
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>الفرق: {difference.toLocaleString()} ₴</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
          {hasEmptyRequiredFields && (
            <span className="text-sm text-red-500">
              يجب اختيار حساب لكل سطر
            </span>
          )}
          <Button
            onClick={handleSave}
            disabled={
              !isBalanced ||
              hasEmptyRequiredFields ||
              !description ||
              !reference
            }
            className="bg-primary hover:bg-primary/90"
          >
            حفظ القيد
          </Button>
        </div>
      </div>
    </div>
  );
};
