import React from 'react';

/**
 * Standardized Card wrapper with dark-mode borders and shadow presets.
 */
export const Card = ({
  children,
  className = '',
  hoverEffect = false,
  padding = 'p-5 sm:p-6',
  ...props
}) => {
  return (
    <div
      className={`bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm transition-all ${
        hoverEffect ? 'hover:border-indigo-300 dark:hover:border-indigo-700 hover:shadow-md' : ''
      } ${padding} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};
