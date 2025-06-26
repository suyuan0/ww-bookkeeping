import { motion } from 'framer-motion';
import { clsx } from 'clsx';
import type { ReactNode } from 'react';

interface GlassButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}

export default function GlassButton({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  disabled = false,
  className,
  type = 'button'
}: GlassButtonProps) {
  const baseClasses = 'backdrop-blur-xl border rounded-xl font-medium transition-all duration-200 relative overflow-hidden';
  
  const variantClasses = {
    primary: 'bg-blue-500/20 border-blue-400/30 text-blue-100 hover:bg-blue-500/30 active:bg-blue-500/40',
    secondary: 'bg-white/10 border-white/20 text-white hover:bg-white/20 active:bg-white/30',
    danger: 'bg-red-500/20 border-red-400/30 text-red-100 hover:bg-red-500/30 active:bg-red-500/40'
  };

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg'
  };

  const disabledClasses = 'opacity-50 cursor-not-allowed pointer-events-none';

  return (
    <motion.button
      type={type}
      className={clsx(
        baseClasses,
        variantClasses[variant],
        sizeClasses[size],
        disabled && disabledClasses,
        className
      )}
      onClick={onClick}
      disabled={disabled}
      whileHover={!disabled ? { scale: 1.02 } : undefined}
      whileTap={!disabled ? { scale: 0.98 } : undefined}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
    >
      {/* 内发光效果 */}
      <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-200" />
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
}
