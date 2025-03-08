export interface Account {
  id: string;
  code: string;
  name: string;
  nameAr: string;
  type:
    | "asset"
    | "liability"
    | "equity"
    | "income"
    | "expense"
    | "bank"
    | "cash"
    | "receivable"
    | "payable";
  balance: number;
  isGroup?: boolean;
  children?: Account[];
}

export interface JournalEntry {
  id: string;
  date: string;
  reference: string;
  description: string;
  debitTotal: number;
  creditTotal: number;
  status: "draft" | "posted" | "cancelled";
  entries: JournalEntryLine[];
}

export interface JournalEntryLine {
  id: string;
  account: {
    id: string;
    name: string;
    nameAr: string;
  };
  description: string;
  debit: number;
  credit: number;
}

export interface CashTransaction {
  id: string;
  date: string;
  type: "receipt" | "payment";
  account: string;
  description: string;
  amount: number;
  reference: string;
  costCenter?: string;
}
