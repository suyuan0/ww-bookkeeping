import type { Category } from "../types";

// 预设的收入和支出分类
export const DEFAULT_CATEGORIES: Category[] = [
  // 收入分类
  { id: "1", name: "工资", icon: "💼", color: "#10B981", type: "income" },
  { id: "2", name: "投资", icon: "📈", color: "#3B82F6", type: "income" },
  { id: "3", name: "副业", icon: "💡", color: "#8B5CF6", type: "income" },
  { id: "4", name: "其他收入", icon: "💰", color: "#F59E0B", type: "income" },

  // 支出分类
  { id: "5", name: "餐饮", icon: "🍽️", color: "#EF4444", type: "expense" },
  { id: "6", name: "交通", icon: "🚗", color: "#F97316", type: "expense" },
  { id: "7", name: "购物", icon: "🛍️", color: "#EC4899", type: "expense" },
  { id: "8", name: "娱乐", icon: "🎮", color: "#8B5CF6", type: "expense" },
  { id: "9", name: "住房", icon: "🏠", color: "#6B7280", type: "expense" },
  { id: "10", name: "医疗", icon: "🏥", color: "#DC2626", type: "expense" },
  { id: "11", name: "教育", icon: "📚", color: "#059669", type: "expense" },
  { id: "12", name: "其他支出", icon: "💸", color: "#6B7280", type: "expense" }
];

// 路由路径
export const ROUTES = {
  DASHBOARD: "/",
  ADD_TRANSACTION: "/add",
  HISTORY: "/history",
  STATISTICS: "/statistics",
  SETTINGS: "/settings"
} as const;

// 动画配置
export const ANIMATION_CONFIG = {
  duration: 0.3,
  ease: "power2.out",
  stagger: 0.1
} as const;
