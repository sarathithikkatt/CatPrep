import React from 'react';

/**
 * Reusable badge pill for tags, difficulty indicators, and metadata.
 * High-contrast WCAG AA compliant palette for both light and dark modes.
 */
export const Badge = ({ children, variant = 'default', className = '', size = 'md' }) => {
  const sizeStyles = {
    sm: 'text-[10px] px-2 py-0.5',
    md: 'text-xs px-2.5 py-0.5',
    lg: 'text-xs px-3 py-1 font-bold'
  };

  const variantStyles = {
    default:
      'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-700',
    indigo:
      'bg-indigo-50 dark:bg-indigo-950/70 text-indigo-700 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800',
    emerald:
      'bg-emerald-50 dark:bg-emerald-950/70 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800',
    amber:
      'bg-amber-50 dark:bg-amber-950/70 text-amber-800 dark:text-amber-300 border-amber-300 dark:border-amber-700/80',
    rose: 'bg-rose-50 dark:bg-rose-950/70 text-rose-700 dark:text-rose-300 border-rose-200 dark:border-rose-800',
    purple:
      'bg-purple-50 dark:bg-purple-950/70 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-800',
    blue: 'bg-blue-50 dark:bg-blue-950/70 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800'
  };

  return (
    <span
      className={`inline-flex items-center gap-1 font-semibold rounded-md border ${
        sizeStyles[size] || sizeStyles.md
      } ${variantStyles[variant] || variantStyles.default} ${className}`}
    >
      {children}
    </span>
  );
};
