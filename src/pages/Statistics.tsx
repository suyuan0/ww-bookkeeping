
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, PieChart, Calendar } from 'lucide-react';
import { useApp } from '../hooks/useApp';
import GlassCard from '../components/UI/GlassCard';

export default function Statistics() {
  const { transactions } = useApp();

  // 计算月度统计
  const getMonthlyStats = () => {
    const monthlyData: Record<string, { income: number; expense: number }> = {};
    
    transactions.forEach(transaction => {
      const date = new Date(transaction.date);
      const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      
      if (!monthlyData[monthKey]) {
        monthlyData[monthKey] = { income: 0, expense: 0 };
      }
      
      if (transaction.type === 'income') {
        monthlyData[monthKey].income += transaction.amount;
      } else {
        monthlyData[monthKey].expense += transaction.amount;
      }
    });

    return Object.entries(monthlyData)
      .sort(([a], [b]) => b.localeCompare(a))
      .slice(0, 6)
      .reverse();
  };

  // 计算分类统计
  const getCategoryStats = () => {
    const categoryData: Record<string, number> = {};
    
    transactions
      .filter(t => t.type === 'expense')
      .forEach(transaction => {
        const category = transaction.category;
        categoryData[category] = (categoryData[category] || 0) + transaction.amount;
      });

    return Object.entries(categoryData)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5);
  };

  const monthlyStats = getMonthlyStats();
  const categoryStats = getCategoryStats();
  
  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);
    
  const totalExpense = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  const maxAmount = Math.max(
    ...monthlyStats.flatMap(([, data]) => [data.income, data.expense]),
    1
  );

  return (
    <motion.div
      className="space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* 页面标题 */}
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">统计分析</h1>
        <p className="text-white/60">深入了解您的财务状况</p>
      </div>

      {/* 总体统计 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <GlassCard>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/60 text-sm">总收入</p>
              <p className="text-2xl font-bold text-green-400">
                ¥{totalIncome.toLocaleString()}
              </p>
            </div>
            <div className="p-3 rounded-xl bg-green-500/20">
              <TrendingUp className="w-6 h-6 text-green-400" />
            </div>
          </div>
        </GlassCard>

        <GlassCard>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/60 text-sm">总支出</p>
              <p className="text-2xl font-bold text-red-400">
                ¥{totalExpense.toLocaleString()}
              </p>
            </div>
            <div className="p-3 rounded-xl bg-red-500/20">
              <TrendingDown className="w-6 h-6 text-red-400" />
            </div>
          </div>
        </GlassCard>

        <GlassCard>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/60 text-sm">净收入</p>
              <p className={`text-2xl font-bold ${
                totalIncome - totalExpense >= 0 ? 'text-green-400' : 'text-red-400'
              }`}>
                ¥{(totalIncome - totalExpense).toLocaleString()}
              </p>
            </div>
            <div className="p-3 rounded-xl bg-blue-500/20">
              <Calendar className="w-6 h-6 text-blue-400" />
            </div>
          </div>
        </GlassCard>
      </div>

      {/* 月度趋势 */}
      <GlassCard>
        <div className="flex items-center space-x-2 mb-6">
          <TrendingUp className="w-5 h-5 text-white" />
          <h2 className="text-xl font-semibold text-white">月度趋势</h2>
        </div>
        
        {monthlyStats.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-white/60">暂无数据</p>
          </div>
        ) : (
          <div className="space-y-4">
            {monthlyStats.map(([month, data]) => (
              <motion.div
                key={month}
                className="space-y-2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex justify-between text-sm text-white/80">
                  <span>{month}</span>
                  <span>收入: ¥{data.income.toLocaleString()} | 支出: ¥{data.expense.toLocaleString()}</span>
                </div>
                
                <div className="flex space-x-2 h-8">
                  {/* 收入条 */}
                  <div className="flex-1 bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-green-400/60 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${(data.income / maxAmount) * 100}%` }}
                      transition={{ duration: 0.8, delay: 0.2 }}
                    />
                  </div>
                  
                  {/* 支出条 */}
                  <div className="flex-1 bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-red-400/60 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${(data.expense / maxAmount) * 100}%` }}
                      transition={{ duration: 0.8, delay: 0.2 }}
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </GlassCard>

      {/* 支出分类 */}
      <GlassCard>
        <div className="flex items-center space-x-2 mb-6">
          <PieChart className="w-5 h-5 text-white" />
          <h2 className="text-xl font-semibold text-white">支出分类</h2>
        </div>
        
        {categoryStats.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-white/60">暂无支出数据</p>
          </div>
        ) : (
          <div className="space-y-4">
            {categoryStats.map(([category, amount], index) => {
              const percentage = (amount / totalExpense) * 100;
              return (
                <motion.div
                  key={category}
                  className="space-y-2"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl">{category}</span>
                      <span className="text-white/80">¥{amount.toLocaleString()}</span>
                    </div>
                    <span className="text-white/60 text-sm">{percentage.toFixed(1)}%</span>
                  </div>
                  
                  <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-red-400 to-red-600 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${percentage}%` }}
                      transition={{ duration: 0.8, delay: 0.3 + index * 0.1 }}
                    />
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </GlassCard>
    </motion.div>
  );
}
