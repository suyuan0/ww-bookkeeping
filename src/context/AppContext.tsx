import type { ReactNode } from "react";
import type { Transaction, Category } from "../types";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { DEFAULT_CATEGORIES } from "../utils/constants";
import { AppContext, type AppContextType } from "./AppContextDefinition";

export function AppProvider({ children }: { children: ReactNode }) {
  const [transactions, setTransactions] = useLocalStorage<Transaction[]>("transactions", []);
  const [categories] = useLocalStorage<Category[]>("categories", DEFAULT_CATEGORIES);

  const addTransaction = (transaction: Omit<Transaction, "id">) => {
    const newTransaction: Transaction = {
      ...transaction,
      id: Date.now().toString() + Math.random().toString(36).substring(2, 11)
    };
    setTransactions(prev => [newTransaction, ...prev]);
  };

  const deleteTransaction = (id: string) => {
    setTransactions(prev => prev.filter(t => t.id !== id));
  };

  const updateTransaction = (id: string, updatedTransaction: Partial<Transaction>) => {
    setTransactions(prev => prev.map(t => (t.id === id ? { ...t, ...updatedTransaction } : t)));
  };

  const value: AppContextType = {
    transactions,
    categories,
    addTransaction,
    deleteTransaction,
    updateTransaction
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}


