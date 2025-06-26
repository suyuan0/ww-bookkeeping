import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Trash2 } from 'lucide-react';
import { useApp } from '../hooks/useApp';
import GlassCard from '../components/UI/GlassCard';
import GlassButton from '../components/UI/GlassButton';
import GlassInput from '../components/UI/GlassInput';

export default function History() {
  const { transactions, deleteTransaction } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'income' | 'expense'>('all');

  // 过滤和搜索交易
  const filteredTransactions = transactions.filter(transaction => {
    const matchesSearch = transaction.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === 'all' || transaction.type === filterType;
    return matchesSearch && matchesFilter;
  });

  const handleDelete = (id: string) => {
    if (window.confirm('确定要删除这条记录吗？')) {
      deleteTransaction(id);
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
        <h1 className="text-3xl font-bold text-white mb-2">历史记录</h1>
        <p className="text-white/60">查看和管理您的所有交易记录</p>
      </div>

      {/* 搜索和过滤 */}
      <GlassCard>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <GlassInput
              placeholder="搜索交易记录..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              icon={<Search className="w-5 h-5" />}
            />
          </div>
          
          <div className="flex space-x-2">
            <GlassButton
              variant={filterType === 'all' ? 'primary' : 'secondary'}
              size="sm"
              onClick={() => setFilterType('all')}
            >
              全部
            </GlassButton>
            <GlassButton
              variant={filterType === 'income' ? 'primary' : 'secondary'}
              size="sm"
              onClick={() => setFilterType('income')}
            >
              收入
            </GlassButton>
            <GlassButton
              variant={filterType === 'expense' ? 'primary' : 'secondary'}
              size="sm"
              onClick={() => setFilterType('expense')}
            >
              支出
            </GlassButton>
          </div>
        </div>
      </GlassCard>

      {/* 交易列表 */}
      <GlassCard>
        {filteredTransactions.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📝</div>
            <h3 className="text-xl font-semibold text-white mb-2">暂无记录</h3>
            <p className="text-white/60">
              {searchTerm || filterType !== 'all' ? '没有找到匹配的记录' : '还没有任何交易记录'}
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredTransactions.map((transaction, index) => (
              <motion.div
                key={transaction.id}
                className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-200"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <div className="flex items-center space-x-4">
                  <div className="text-3xl">{transaction.category}</div>
                  <div>
                    <h3 className="text-white font-medium">{transaction.description}</h3>
                    <p className="text-white/60 text-sm">
                      {new Date(transaction.date).toLocaleDateString('zh-CN', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className={`text-xl font-semibold ${
                    transaction.type === 'income' ? 'text-green-400' : 'text-red-400'
                  }`}>
                    {transaction.type === 'income' ? '+' : '-'}¥{transaction.amount.toLocaleString()}
                  </div>
                  
                  <div className="flex space-x-2">
                    <GlassButton
                      variant="secondary"
                      size="sm"
                      onClick={() => handleDelete(transaction.id)}
                      className="flex items-center space-x-1"
                    >
                      <Trash2 className="w-4 h-4" />
                    </GlassButton>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </GlassCard>

      {/* 统计信息 */}
      {filteredTransactions.length > 0 && (
        <GlassCard>
          <h3 className="text-lg font-semibold text-white mb-4">统计信息</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <p className="text-white/60 text-sm">总记录数</p>
              <p className="text-2xl font-bold text-white">{filteredTransactions.length}</p>
            </div>
            <div className="text-center">
              <p className="text-white/60 text-sm">总收入</p>
              <p className="text-2xl font-bold text-green-400">
                ¥{filteredTransactions
                  .filter(t => t.type === 'income')
                  .reduce((sum, t) => sum + t.amount, 0)
                  .toLocaleString()}
              </p>
            </div>
            <div className="text-center">
              <p className="text-white/60 text-sm">总支出</p>
              <p className="text-2xl font-bold text-red-400">
                ¥{filteredTransactions
                  .filter(t => t.type === 'expense')
                  .reduce((sum, t) => sum + t.amount, 0)
                  .toLocaleString()}
              </p>
            </div>
          </div>
        </GlassCard>
      )}
    </motion.div>
  );
}
