import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ChevronDown,
  ChevronRight,
  Search,
  Plus,
  Edit,
  Trash,
  FileText,
} from "lucide-react";
import { defaultAccounts } from "@/data/accounts";
import { Account } from "@/types/accounting";

interface FlattenedAccount extends Account {
  level?: number;
  path?: string;
  isExpanded?: boolean;
}

const AccountTree = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedAccounts, setExpandedAccounts] = useState<
    Record<string, boolean>
  >({});

  // Flatten the account tree for display
  const flattenAccounts = (
    accounts: Account[],
    level = 0,
    path = "",
  ): FlattenedAccount[] => {
    let result: FlattenedAccount[] = [];

    accounts.forEach((account) => {
      const currentPath = path ? `${path}.${account.id}` : account.id;
      const isExpanded = expandedAccounts[currentPath] !== false; // Default to expanded

      // Add the account with its level
      result.push({
        ...account,
        level,
        path: currentPath,
        isExpanded,
      });

      // If the account has children and is expanded, add them too
      if (account.children && account.children.length > 0 && isExpanded) {
        result = [
          ...result,
          ...flattenAccounts(account.children, level + 1, currentPath),
        ];
      }
    });

    return result;
  };

  // Filter accounts based on search term
  const filteredAccounts = flattenAccounts(defaultAccounts).filter(
    (account) => {
      return searchTerm
        ? account.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            account.nameAr.toLowerCase().includes(searchTerm.toLowerCase()) ||
            account.code.includes(searchTerm)
        : true;
    },
  );

  // Toggle account expansion
  const toggleAccountExpansion = (path: string) => {
    setExpandedAccounts((prev) => ({
      ...prev,
      [path]: !prev[path],
    }));
  };

  return (
    <Card className="p-6 bg-white dark:bg-[#1e1e2d] dark:text-white">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">شجرة الحسابات</h2>
        <Button>
          <Plus className="ml-2 h-4 w-4" />
          حساب جديد
        </Button>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute right-3 top-2.5 h-5 w-5 text-muted-foreground" />
          <Input
            placeholder="بحث في الحسابات..."
            className="pr-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex gap-2">
          <Button variant="outline">
            <FileText className="ml-2 h-4 w-4" />
            تصدير
          </Button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[300px]">الحساب</TableHead>
              <TableHead>رقم الحساب</TableHead>
              <TableHead>نوع الحساب</TableHead>
              <TableHead className="text-left">الرصيد</TableHead>
              <TableHead className="text-right">الإجراءات</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAccounts.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8">
                  <div className="flex flex-col items-center justify-center text-muted-foreground">
                    <FileText className="h-12 w-12 mb-2 opacity-20" />
                    <p>لا توجد حسابات مطابقة للبحث</p>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              filteredAccounts.map((account) => {
                const hasChildren =
                  account.children && account.children.length > 0;

                return (
                  <TableRow
                    key={account.path}
                    className={account.isGroup ? "font-medium" : ""}
                  >
                    <TableCell>
                      <div
                        className="flex items-center"
                        style={{
                          paddingRight: `${account.level ? account.level * 1.5 : 0}rem`,
                        }}
                      >
                        {hasChildren && (
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-5 w-5 p-0 mr-1"
                            onClick={() =>
                              toggleAccountExpansion(account.path || "")
                            }
                          >
                            {account.isExpanded ? (
                              <ChevronDown className="h-4 w-4" />
                            ) : (
                              <ChevronRight className="h-4 w-4" />
                            )}
                          </Button>
                        )}
                        <span className={`${hasChildren ? "font-medium" : ""}`}>
                          {account.nameAr}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>{account.code}</TableCell>
                    <TableCell>
                      {account.type === "asset" && "أصول"}
                      {account.type === "liability" && "خصوم"}
                      {account.type === "equity" && "حقوق ملكية"}
                      {account.type === "income" && "إيرادات"}
                      {account.type === "expense" && "مصروفات"}
                      {account.type === "bank" && "بنك"}
                      {account.type === "cash" && "نقد"}
                      {account.type === "receivable" && "ذمم مدينة"}
                      {account.type === "payable" && "ذمم دائنة"}
                    </TableCell>
                    <TableCell className="text-left">
                      {account.balance.toLocaleString()} ₴
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="icon">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
};

export default AccountTree;
