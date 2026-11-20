import React from 'react';

/**
 * Reusable animated progress bar component with configurable track and fill styling.
 */
export const ProgressBar = ({
  percent = 0,
  height = 'h-2',
  color = 'bg-indigo-600',
  trackColor = 'bg-slate-100 dark:bg-slate-800',
  className = ''
}) => {
  const clamped = Math.max(0, Math.min(100, Math.round(percent)));

  return (
    <div className={`w-full ${trackColor} rounded-full ${height} overflow-hidden ${className}`}>
      <div
        className={`${color} ${height} rounded-full transition-all duration-500`}
        style={{ width: `${clamped}%` }}
      />
    </div>
  );
};
