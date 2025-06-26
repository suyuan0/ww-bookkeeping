import { createContext } from 'react';
import type { Transaction, Category } from '../types';

export interface AppContextType {
  transactions: Transaction[];
  categories: Category[];
  addTransaction: (transaction: Omit<Transaction, 'id'>) => void;
  deleteTransaction: (id: string) => void;
  updateTransaction: (id: string, transaction: Partial<Transaction>) => void;
}

export const AppContext = createContext<AppContextType | undefined>(undefined);
