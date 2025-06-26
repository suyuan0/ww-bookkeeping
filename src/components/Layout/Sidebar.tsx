import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import dayjs from "dayjs";
import { Home, Plus, History, BarChart3, Settings, Wallet } from "lucide-react";
import { ROUTES } from "../../utils/constants";
import GlassCard from "../UI/GlassCard";
import pkg from "../../../package.json"

const navItems = [
  { path: ROUTES.DASHBOARD, icon: Home, label: "仪表板" },
  { path: ROUTES.ADD_TRANSACTION, icon: Plus, label: "添加记录" },
  { path: ROUTES.HISTORY, icon: History, label: "历史记录" },
  { path: ROUTES.STATISTICS, icon: BarChart3, label: "统计分析" },
  { path: ROUTES.SETTINGS, icon: Settings, label: "设置" }
];

export default function Sidebar() {
  return (
    <motion.aside
      className="w-64 border-r border-white/10 p-4"
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <GlassCard className="h-full">
        {/* Logo */}
        <motion.div
          className="mb-8 flex items-center space-x-3 p-2"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-400 to-purple-500">
            <Wallet className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">ww记账</h1>
            <p className="text-sm text-white/60">智能财务管理</p>
          </div>
        </motion.div>

        {/* 导航菜单 */}
        <nav className="space-y-2">
          {navItems.map((item, index) => (
            <motion.div
              key={item.path}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
            >
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `group flex items-center space-x-3 rounded-xl px-4 py-3 transition-all duration-200 ${
                    isActive
                      ? "border border-white/30 bg-white/20 text-white"
                      : "text-white/70 hover:bg-white/10 hover:text-white"
                  }`
                }
              >
                <item.icon className="h-5 w-5 transition-transform duration-200 group-hover:scale-110" />
                <span className="font-medium">{item.label}</span>
              </NavLink>
            </motion.div>
          ))}
        </nav>

        {/* 底部信息 */}
        <motion.div
          className="mt-auto border-t border-white/10 pt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          <div className="text-center text-sm text-white/50">
            <p>版本 {pkg.version}</p>
            <p className="mt-1">© {dayjs().year()} ww记账</p>
          </div>
        </motion.div>
      </GlassCard>
    </motion.aside>
  );
}
