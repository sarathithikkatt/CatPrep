import React from 'react';
import { ProgressBar } from '../common/ProgressBar';

/**
 * Individual section row with name, progress bar, percentage, and topics count.
 */
export const SectionProgressRow = ({ name, percent = 0, mastered = 0, total = 0 }) => {
  return (
    <div className="flex items-center gap-4 text-xs">
      <span className="w-16 font-bold text-slate-700 dark:text-slate-200">
        {name}
      </span>
      <div className="flex-1">
        <ProgressBar percent={percent} height="h-2" color="bg-indigo-500" />
      </div>
      <span className="w-12 text-right font-semibold text-slate-500">
        {percent}%
      </span>
      <span className="text-slate-400 hidden sm:inline">
        ({mastered}/{total} topics)
      </span>
    </div>
  );
};
