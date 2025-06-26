import { motion } from "framer-motion";
import { Settings as SettingsIcon, Download, Trash2, Info } from "lucide-react";
import dayjs from "dayjs";
import { useApp } from "../hooks/useApp";
import GlassCard from "../components/UI/GlassCard";
import GlassButton from "../components/UI/GlassButton";

export default function Settings() {
  const { transactions } = useApp();

  const exportData = () => {
    const dataStr = JSON.stringify(transactions, null, 2);
    const dataBlob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `bookkeeping-data-${new Date().toISOString().split("T")[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const clearAllData = () => {
    if (window.confirm("确定要清除所有数据吗？此操作不可恢复！")) {
      localStorage.clear();
      window.location.reload();
    }
  };

  return (
    <motion.div
      className="space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* 页面标题 */}
      <div>
        <h1 className="mb-2 text-3xl font-bold text-white">设置</h1>
        <p className="text-white/60">管理您的应用设置和数据</p>
      </div>

      {/* 数据管理 */}
      <GlassCard>
        <div className="mb-6 flex items-center space-x-2">
          <Download className="h-5 w-5 text-white" />
          <h2 className="text-xl font-semibold text-white">数据管理</h2>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 p-4">
            <div>
              <h3 className="font-medium text-white">导出数据</h3>
              <p className="text-sm text-white/60">将您的所有交易记录导出为JSON文件</p>
            </div>
            <GlassButton variant="secondary" onClick={exportData} className="flex items-center space-x-2">
              <Download className="h-4 w-4" />
              <span>导出</span>
            </GlassButton>
          </div>

          <div className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 p-4">
            <div>
              <h3 className="font-medium text-white">清除所有数据</h3>
              <p className="text-sm text-white/60">删除所有交易记录和设置（不可恢复）</p>
            </div>
            <GlassButton variant="danger" onClick={clearAllData} className="flex items-center space-x-2">
              <Trash2 className="h-4 w-4" />
              <span>清除</span>
            </GlassButton>
          </div>
        </div>
      </GlassCard>

      {/* 应用信息 */}
      <GlassCard>
        <div className="mb-6 flex items-center space-x-2">
          <Info className="h-5 w-5 text-white" />
          <h2 className="text-xl font-semibold text-white">应用信息</h2>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="rounded-xl border border-white/10 bg-white/5 p-4">
              <h3 className="mb-2 font-medium text-white">版本信息</h3>
              <p className="text-sm text-white/60">版本: 1.0.0</p>
              <p className="text-sm text-white/60">构建日期: 2024-01-01</p>
            </div>

            <div className="rounded-xl border border-white/10 bg-white/5 p-4">
              <h3 className="mb-2 font-medium text-white">数据统计</h3>
              <p className="text-sm text-white/60">总记录数: {transactions.length}</p>
              <p className="text-sm text-white/60">存储大小: {(JSON.stringify(transactions).length / 1024).toFixed(2)} KB</p>
            </div>
          </div>

          <div className="rounded-xl border border-white/10 bg-white/5 p-4">
            <h3 className="mb-2 font-medium text-white">技术栈</h3>
            <div className="flex flex-wrap gap-2">
              {["React", "TypeScript", "Electron", "Tailwind CSS", "Framer Motion", "GSAP"].map(tech => (
                <span key={tech} className="rounded-full bg-blue-500/20 px-3 py-1 text-sm text-blue-200">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </GlassCard>

      {/* 关于 */}
      <GlassCard>
        <div className="space-y-4 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-400 to-purple-500">
            <SettingsIcon className="h-8 w-8 text-white" />
          </div>

          <div>
            <h3 className="mb-2 text-xl font-semibold text-white">ww记账</h3>
            <p className="mx-auto max-w-md text-sm text-white/60">
              一个简洁、现代的个人财务管理应用，帮助您轻松记录和分析收支情况。 采用iOS毛玻璃设计风格，提供流畅的用户体验。
            </p>
          </div>

          <div className="border-t border-white/10 pt-4">
            <p className="text-xs text-white/40">© {dayjs().year()} ww记账. 保留所有权利.</p>
          </div>
        </div>
      </GlassCard>
    </motion.div>
  );
}
