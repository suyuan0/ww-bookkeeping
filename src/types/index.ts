// 记账应用的类型定义

export interface Transaction {
  id: string;
  amount: number;
  category: string;
  description: string;
  date: string;
  type: "income" | "expense";
  tags?: string[];
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  color: string;
  type: "income" | "expense";
}

export interface MonthlyStats {
  month: string;
  totalIncome: number;
  totalExpense: number;
  balance: number;
  transactionCount: number;
}

export interface DashboardData {
  currentBalance: number;
  monthlyIncome: number;
  monthlyExpense: number;
  recentTransactions: Transaction[];
  monthlyStats: MonthlyStats[];
}
