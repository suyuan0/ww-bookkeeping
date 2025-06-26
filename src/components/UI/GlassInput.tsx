import { forwardRef } from 'react';
import { motion } from 'framer-motion';
import { clsx } from 'clsx';
import type { InputHTMLAttributes, ReactNode } from 'react';

interface GlassInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: ReactNode;
}

const GlassInput = forwardRef<HTMLInputElement, GlassInputProps>(
  ({ label, error, icon, className, ...props }, ref) => {
    return (
      <motion.div
        className="space-y-2"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {label && (
          <label className="block text-sm font-medium text-white/80">
            {label}
          </label>
        )}
        
        <div className="relative">
          {icon && (
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60">
              {icon}
            </div>
          )}
          
          <input
            ref={ref}
            className={clsx(
              // 毛玻璃基础样式
              'w-full backdrop-blur-xl bg-white/10 border border-white/20',
              'rounded-xl px-4 py-3 text-white placeholder-white/50',
              'focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-blue-400/50',
              'transition-all duration-200',
              // 内阴影
              'shadow-[inset_0_2px_4px_0_rgba(0,0,0,0.1)]',
              icon && 'pl-10',
              error && 'border-red-400/50 focus:ring-red-400/50 focus:border-red-400/50',
              className
            )}
            {...props}
          />
        </div>
        
        {error && (
          <motion.p
            className="text-sm text-red-300"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            {error}
          </motion.p>
        )}
      </motion.div>
    );
  }
);

GlassInput.displayName = 'GlassInput';

export default GlassInput;
