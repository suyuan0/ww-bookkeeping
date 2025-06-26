import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Wallet, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../hooks/useApp';
import GlassCard from '../components/UI/GlassCard';
import GlassButton from '../components/UI/GlassButton';
import AnimatedNumber from '../components/UI/AnimatedNumber';
import { ROUTES } from '../utils/constants';
import { staggerAnimation } from '../utils/animations';

export default function Dashboard() {
  const navigate = useNavigate();
  const { transactions } = useApp();
  const statsRef = useRef<HTMLDivElement>(null);

  // 计算统计数据
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();
  
  const monthlyTransactions = transactions.filter(t => {
    const date = new Date(t.date);
    return date.getMonth() === currentMonth && date.getFullYear() === currentYear;
  });

  const monthlyIncome = monthlyTransactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const monthlyExpense = monthlyTransactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = monthlyIncome - monthlyExpense;
  const recentTransactions = transactions.slice(0, 5);

  // GSAP动画效果
  useEffect(() => {
    if (statsRef.current) {
      const cards = statsRef.current.querySelectorAll('.stat-card');
      staggerAnimation(Array.from(cards) as HTMLElement[], 0.15);
    }
  }, [monthlyIncome, monthlyExpense, balance]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.div
      className="space-y-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* 页面标题 */}
      <motion.div variants={itemVariants}>
        <h1 className="text-3xl font-bold text-white mb-2">仪表板</h1>
        <p className="text-white/60">欢迎回来，查看您的财务概况</p>
      </motion.div>

      {/* 统计卡片 */}
      <div
        ref={statsRef}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        <GlassCard className="stat-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/60 text-sm">本月余额</p>
              <AnimatedNumber
                value={balance}
                prefix="¥"
                className={`text-2xl font-bold ${balance >= 0 ? 'text-green-400' : 'text-red-400'}`}
                duration={1.2}
              />
            </div>
            <div className={`p-3 rounded-xl ${balance >= 0 ? 'bg-green-500/20' : 'bg-red-500/20'}`}>
              <Wallet className={`w-6 h-6 ${balance >= 0 ? 'text-green-400' : 'text-red-400'}`} />
            </div>
          </div>
        </GlassCard>

        <GlassCard className="stat-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/60 text-sm">本月收入</p>
              <AnimatedNumber
                value={monthlyIncome}
                prefix="¥"
                className="text-2xl font-bold text-green-400"
                duration={1.2}
              />
            </div>
            <div className="p-3 rounded-xl bg-green-500/20">
              <TrendingUp className="w-6 h-6 text-green-400" />
            </div>
          </div>
        </GlassCard>

        <GlassCard className="stat-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/60 text-sm">本月支出</p>
              <AnimatedNumber
                value={monthlyExpense}
                prefix="¥"
                className="text-2xl font-bold text-red-400"
                duration={1.2}
              />
            </div>
            <div className="p-3 rounded-xl bg-red-500/20">
              <TrendingDown className="w-6 h-6 text-red-400" />
            </div>
          </div>
        </GlassCard>
      </div>

      {/* 快速操作 */}
      <motion.div variants={itemVariants}>
        <GlassCard>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-white">快速操作</h2>
          </div>
          <div className="flex space-x-4">
            <GlassButton
              variant="primary"
              onClick={() => navigate(ROUTES.ADD_TRANSACTION)}
              className="flex items-center space-x-2"
            >
              <Plus className="w-4 h-4" />
              <span>添加记录</span>
            </GlassButton>
            <GlassButton
              variant="secondary"
              onClick={() => navigate(ROUTES.HISTORY)}
            >
              查看历史
            </GlassButton>
            <GlassButton
              variant="secondary"
              onClick={() => navigate(ROUTES.STATISTICS)}
            >
              统计分析
            </GlassButton>
          </div>
        </GlassCard>
      </motion.div>

      {/* 最近交易 */}
      <motion.div variants={itemVariants}>
        <GlassCard>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-white">最近交易</h2>
            <GlassButton
              variant="secondary"
              size="sm"
              onClick={() => navigate(ROUTES.HISTORY)}
            >
              查看全部
            </GlassButton>
          </div>
          
          {recentTransactions.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-white/60">暂无交易记录</p>
              <GlassButton
                variant="primary"
                className="mt-4"
                onClick={() => navigate(ROUTES.ADD_TRANSACTION)}
              >
                添加第一笔记录
              </GlassButton>
            </div>
          ) : (
            <div className="space-y-3">
              {recentTransactions.map((transaction, index) => (
                <motion.div
                  key={transaction.id}
                  className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="flex items-center space-x-3">
                    <div className="text-2xl">{transaction.category}</div>
                    <div>
                      <p className="text-white font-medium">{transaction.description}</p>
                      <p className="text-white/60 text-sm">{new Date(transaction.date).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <div className={`text-lg font-semibold ${
                    transaction.type === 'income' ? 'text-green-400' : 'text-red-400'
                  }`}>
                    {transaction.type === 'income' ? '+' : '-'}¥{transaction.amount.toLocaleString()}
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </GlassCard>
      </motion.div>
    </motion.div>
  );
}
