import { motion } from 'framer-motion';
import { clsx } from 'clsx';
import type { ReactNode } from 'react';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  hover?: boolean;
  padding?: 'sm' | 'md' | 'lg';
}

export default function GlassCard({ 
  children, 
  className, 
  onClick, 
  hover = false,
  padding = 'md'
}: GlassCardProps) {
  const paddingClasses = {
    sm: 'p-3',
    md: 'p-4',
    lg: 'p-6'
  };

  return (
    <motion.div
      className={clsx(
        // 毛玻璃基础样式
        'backdrop-blur-xl bg-white/10 border border-white/20',
        'rounded-2xl shadow-xl',
        // 内阴影效果
        'shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)]',
        // 外发光效果
        'before:absolute before:inset-0 before:rounded-2xl before:bg-gradient-to-br before:from-white/10 before:to-transparent before:pointer-events-none',
        'relative overflow-hidden',
        paddingClasses[padding],
        hover && 'cursor-pointer',
        className
      )}
      onClick={onClick}
      whileHover={hover ? { 
        scale: 1.02,
        backgroundColor: 'rgba(255, 255, 255, 0.15)'
      } : undefined}
      whileTap={hover ? { scale: 0.98 } : undefined}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  );
}
