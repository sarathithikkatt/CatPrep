import React from 'react';

/**
 * Numbered step item in Firebase setup instructions.
 */
export const SetupStepItem = ({ stepNumber, title, children }) => {
  return (
    <div className="flex items-start gap-2.5">
      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-indigo-600 text-white flex items-center justify-center text-xs font-bold">
        {stepNumber}
      </span>
      <div>
        <p className="font-semibold text-slate-800 dark:text-slate-200">{title}</p>
        <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
          {children}
        </div>
      </div>
    </div>
  );
};
