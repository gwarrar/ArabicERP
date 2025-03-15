import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Account } from "@/types/accounting";

interface NewAccountFormProps {
  open: boolean;
  onClose: () => void;
  onSave: (newAccount: Omit<Account, "id">) => void;
  parentAccount?: Account;
  accountTypes: string[];
}

const NewAccountForm: React.FC<NewAccountFormProps> = ({
  open,
  onClose,
  onSave,
  parentAccount,
  accountTypes,
}) => {
  const [code, setCode] = useState("");
  const [nameAr, setNameAr] = useState("");
  const [name, setName] = useState("");
  const [type, setType] = useState<string>(parentAccount?.type || "asset");
  const [balance, setBalance] = useState<number>(0);
  const [isGroup, setIsGroup] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form
    if (!code || !nameAr || !name || !type) {
      alert("يرجى ملء جميع الحقول المطلوبة");
      return;
    }

    // Create new account object
    const newAccount: Omit<Account, "id"> = {
      code,
      name,
      nameAr,
      type: type as any, // Cast to Account type
      balance,
      isGroup,
      children: isGroup ? [] : undefined,
    };

    // Save the new account
    onSave(newAccount);

    // Reset form
    setCode("");
    setNameAr("");
    setName("");
    setType(parentAccount?.type || "asset");
    setBalance(0);
    setIsGroup(false);

    // Close the dialog
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>إضافة حساب جديد</DialogTitle>
          <DialogDescription>
            {parentAccount
              ? `إضافة حساب جديد تحت ${parentAccount.nameAr}`
              : "إضافة حساب جديد في شجرة الحسابات"}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="code">رقم الحساب</Label>
              <Input
                id="code"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="مثال: 1100"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="type">نوع الحساب</Label>
              <Select value={type} onValueChange={setType}>
                <SelectTrigger>
                  <SelectValue placeholder="اختر نوع الحساب" />
                </SelectTrigger>
                <SelectContent>
                  {accountTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type === "asset" && "أصول"}
                      {type === "liability" && "خصوم"}
                      {type === "equity" && "حقوق ملكية"}
                      {type === "income" && "إيرادات"}
                      {type === "expense" && "مصروفات"}
                      {type === "bank" && "بنك"}
                      {type === "cash" && "نقد"}
                      {type === "receivable" && "ذمم مدينة"}
                      {type === "payable" && "ذمم دائنة"}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="nameAr">اسم الحساب (عربي)</Label>
            <Input
              id="nameAr"
              value={nameAr}
              onChange={(e) => setNameAr(e.target.value)}
              placeholder="اسم الحساب باللغة العربية"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="name">اسم الحساب (إنجليزي)</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="اسم الحساب باللغة الإنجليزية"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="balance">الرصيد الافتتاحي</Label>
            <Input
              id="balance"
              type="number"
              value={balance}
              onChange={(e) => setBalance(Number(e.target.value))}
              placeholder="0"
            />
          </div>

          <div className="flex items-center space-x-2 space-x-reverse">
            <input
              type="checkbox"
              id="isGroup"
              checked={isGroup}
              onChange={(e) => setIsGroup(e.target.checked)}
              className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
            />
            <Label htmlFor="isGroup" className="text-sm font-normal">
              حساب رئيسي (يحتوي على حسابات فرعية)
            </Label>
          </div>

          <DialogFooter className="mt-6">
            <Button type="button" variant="outline" onClick={onClose}>
              إلغاء
            </Button>
            <Button type="submit">حفظ</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default NewAccountForm;
