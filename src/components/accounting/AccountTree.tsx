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
  BookOpen,
} from "lucide-react";
import { defaultAccounts } from "@/data/accounts";
import { Account } from "@/types/accounting";
import NewAccountForm from "./NewAccountForm";
import AccountLedger from "./AccountLedger";

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
  const [accounts, setAccounts] = useState<Account[]>(defaultAccounts);
  const [showNewAccountForm, setShowNewAccountForm] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState<Account | null>(null);
  const [showAccountLedger, setShowAccountLedger] = useState(false);
  const [ledgerAccount, setLedgerAccount] = useState<Account | null>(null);

  // Available account types
  const accountTypes = [
    "asset",
    "liability",
    "equity",
    "income",
    "expense",
    "bank",
    "cash",
    "receivable",
    "payable",
  ];

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
  const filteredAccounts = flattenAccounts(accounts).filter((account) => {
    return searchTerm
      ? account.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          account.nameAr.toLowerCase().includes(searchTerm.toLowerCase()) ||
          account.code.includes(searchTerm)
      : true;
  });

  // Toggle account expansion
  const toggleAccountExpansion = (path: string) => {
    setExpandedAccounts((prev) => ({
      ...prev,
      [path]: !prev[path],
    }));
  };

  // Open new account form
  const handleAddAccount = (parentAccount?: Account) => {
    setSelectedAccount(parentAccount || null);
    setShowNewAccountForm(true);
  };

  // Open account ledger
  const handleViewLedger = (account: Account) => {
    setLedgerAccount(account);
    setShowAccountLedger(true);
  };

  // Add new account to the tree
  const addNewAccount = (newAccountData: Omit<Account, "id">) => {
    // Generate a unique ID
    const newId = `${Date.now()}`;
    const newAccount: Account = {
      ...newAccountData,
      id: newId,
    };

    if (selectedAccount) {
      // Add as a child to the selected account
      const updatedAccounts = addAccountToParent(
        accounts,
        selectedAccount.id,
        newAccount,
      );
      setAccounts(updatedAccounts);
    } else {
      // Add as a top-level account
      setAccounts([...accounts, newAccount]);
    }
  };

  // Helper function to add an account to a parent account
  const addAccountToParent = (
    accounts: Account[],
    parentId: string,
    newAccount: Account,
  ): Account[] => {
    return accounts.map((account) => {
      if (account.id === parentId) {
        // Add to this parent's children
        return {
          ...account,
          children: [...(account.children || []), newAccount],
        };
      } else if (account.children && account.children.length > 0) {
        // Check in children
        return {
          ...account,
          children: addAccountToParent(account.children, parentId, newAccount),
        };
      }
      return account;
    });
  };

  // Translate account type to Arabic
  const getAccountTypeArabic = (type: string) => {
    switch (type) {
      case "asset":
        return "أصول";
      case "liability":
        return "خصوم";
      case "equity":
        return "حقوق ملكية";
      case "income":
        return "إيرادات";
      case "expense":
        return "مصروفات";
      case "bank":
        return "بنك";
      case "cash":
        return "نقد";
      case "receivable":
        return "ذمم مدينة";
      case "payable":
        return "ذمم دائنة";
      default:
        return type;
    }
  };

  return (
    <Card className="p-6 bg-white dark:bg-[#1e1e2d] dark:text-white">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">شجرة الحسابات</h2>
        <Button onClick={() => handleAddAccount()}>
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
                    className={`${account.isGroup ? "font-medium" : ""} hover:bg-gray-50 cursor-pointer`}
                    onClick={() => handleViewLedger(account)}
                  >
                    <TableCell
                      onClick={(e) => {
                        if (hasChildren) {
                          e.stopPropagation();
                        }
                      }}
                    >
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
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleAccountExpansion(account.path || "");
                            }}
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
                    <TableCell>{getAccountTypeArabic(account.type)}</TableCell>
                    <TableCell className="text-left">
                      {account.balance.toLocaleString()} ₴
                    </TableCell>
                    <TableCell
                      className="text-right"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleViewLedger(account);
                          }}
                          title="عرض دفتر الأستاذ"
                        >
                          <BookOpen className="h-4 w-4" />
                        </Button>
                        {(account.isGroup || !account.children) && (
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleAddAccount(account);
                            }}
                            title={
                              account.isGroup
                                ? "إضافة حساب فرعي"
                                : "إضافة حساب في نفس المستوى"
                            }
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        )}
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={(e) => e.stopPropagation()}
                        >
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

      {/* New Account Form Dialog */}
      <NewAccountForm
        open={showNewAccountForm}
        onClose={() => setShowNewAccountForm(false)}
        onSave={addNewAccount}
        parentAccount={selectedAccount || undefined}
        accountTypes={accountTypes}
      />

      {/* Account Ledger Dialog */}
      {ledgerAccount && (
        <AccountLedger
          open={showAccountLedger}
          onClose={() => setShowAccountLedger(false)}
          account={ledgerAccount}
        />
      )}
    </Card>
  );
};

export default AccountTree;
