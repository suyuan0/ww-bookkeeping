import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, DollarSign, Calendar, FileText } from 'lucide-react';
import { useApp } from '../hooks/useApp';
import GlassCard from '../components/UI/GlassCard';
import GlassButton from '../components/UI/GlassButton';
import GlassInput from '../components/UI/GlassInput';
import { ROUTES, DEFAULT_CATEGORIES } from '../utils/constants';

export default function AddTransaction() {
  const navigate = useNavigate();
  const { addTransaction } = useApp();
  
  const [formData, setFormData] = useState({
    amount: '',
    category: '',
    description: '',
    date: new Date().toISOString().split('T')[0],
    type: 'expense' as 'income' | 'expense'
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // 验证表单
    const newErrors: Record<string, string> = {};
    
    if (!formData.amount || parseFloat(formData.amount) <= 0) {
      newErrors.amount = '请输入有效的金额';
    }
    
    if (!formData.category) {
      newErrors.category = '请选择分类';
    }
    
    if (!formData.description.trim()) {
      newErrors.description = '请输入描述';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      // 提交表单
      const selectedCategory = DEFAULT_CATEGORIES.find(c => c.id === formData.category);
      
      addTransaction({
        amount: parseFloat(formData.amount),
        category: selectedCategory?.icon || '💰',
        description: formData.description.trim(),
        date: formData.date,
        type: formData.type
      });

      // 返回仪表板
      navigate(ROUTES.DASHBOARD);
    }
  };

  const incomeCategories = DEFAULT_CATEGORIES.filter(c => c.type === 'income');
  const expenseCategories = DEFAULT_CATEGORIES.filter(c => c.type === 'expense');
  const currentCategories = formData.type === 'income' ? incomeCategories : expenseCategories;

  return (
    <motion.div
      className="space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* 页面标题 */}
      <div className="flex items-center space-x-4">
        <GlassButton
          variant="secondary"
          size="sm"
          onClick={() => navigate(ROUTES.DASHBOARD)}
          className="flex items-center space-x-2"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>返回</span>
        </GlassButton>
        <div>
          <h1 className="text-3xl font-bold text-white">添加记录</h1>
          <p className="text-white/60">记录您的收入或支出</p>
        </div>
      </div>

      <GlassCard className="max-w-2xl">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* 类型选择 */}
          <div>
            <label className="block text-sm font-medium text-white/80 mb-3">
              交易类型
            </label>
            <div className="flex space-x-4">
              <motion.button
                type="button"
                className={`flex-1 p-4 rounded-xl border transition-all duration-200 ${
                  formData.type === 'income'
                    ? 'bg-green-500/20 border-green-400/50 text-green-100'
                    : 'bg-white/5 border-white/20 text-white/60 hover:bg-white/10'
                }`}
                onClick={() => setFormData(prev => ({ ...prev, type: 'income', category: '' }))}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="text-center">
                  <div className="text-2xl mb-2">💰</div>
                  <div className="font-medium">收入</div>
                </div>
              </motion.button>
              
              <motion.button
                type="button"
                className={`flex-1 p-4 rounded-xl border transition-all duration-200 ${
                  formData.type === 'expense'
                    ? 'bg-red-500/20 border-red-400/50 text-red-100'
                    : 'bg-white/5 border-white/20 text-white/60 hover:bg-white/10'
                }`}
                onClick={() => setFormData(prev => ({ ...prev, type: 'expense', category: '' }))}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="text-center">
                  <div className="text-2xl mb-2">💸</div>
                  <div className="font-medium">支出</div>
                </div>
              </motion.button>
            </div>
          </div>

          {/* 金额输入 */}
          <GlassInput
            label="金额"
            type="number"
            step="0.01"
            min="0"
            placeholder="0.00"
            value={formData.amount}
            onChange={(e) => setFormData(prev => ({ ...prev, amount: e.target.value }))}
            error={errors.amount}
            icon={<DollarSign className="w-5 h-5" />}
          />

          {/* 分类选择 */}
          <div>
            <label className="block text-sm font-medium text-white/80 mb-3">
              分类
            </label>
            {errors.category && (
              <p className="text-sm text-red-300 mb-2">{errors.category}</p>
            )}
            <div className="grid grid-cols-4 gap-3">
              {currentCategories.map((category) => (
                <motion.button
                  key={category.id}
                  type="button"
                  className={`p-3 rounded-xl border transition-all duration-200 ${
                    formData.category === category.id
                      ? 'bg-white/20 border-white/40 text-white'
                      : 'bg-white/5 border-white/20 text-white/60 hover:bg-white/10'
                  }`}
                  onClick={() => setFormData(prev => ({ ...prev, category: category.id }))}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="text-center">
                    <div className="text-2xl mb-1">{category.icon}</div>
                    <div className="text-xs font-medium">{category.name}</div>
                  </div>
                </motion.button>
              ))}
            </div>
          </div>

          {/* 描述输入 */}
          <GlassInput
            label="描述"
            placeholder="请输入交易描述"
            value={formData.description}
            onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
            error={errors.description}
            icon={<FileText className="w-5 h-5" />}
          />

          {/* 日期输入 */}
          <GlassInput
            label="日期"
            type="date"
            value={formData.date}
            onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
            icon={<Calendar className="w-5 h-5" />}
          />

          {/* 提交按钮 */}
          <div className="flex space-x-4 pt-4">
            <GlassButton
              type="submit"
              variant="primary"
              className="flex-1"
            >
              添加记录
            </GlassButton>
            <GlassButton
              type="button"
              variant="secondary"
              onClick={() => navigate(ROUTES.DASHBOARD)}
            >
              取消
            </GlassButton>
          </div>
        </form>
      </GlassCard>
    </motion.div>
  );
}
