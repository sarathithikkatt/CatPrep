import React from 'react';
import { TrendingUp, Settings } from 'lucide-react';

/**
 * Metric card showing today's accuracy percentage and correct/wrong breakdown.
 */
export const AccuracyMetricCard = ({
  accuracy = 0,
  correctCount = 0,
  incorrectCount = 0,
  isEditingTarget = false,
  onToggleEditTarget
}) => {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden">
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          Today's Accuracy
        </span>
        <div className="p-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400">
          <TrendingUp className="w-5 h-5" />
        </div>
      </div>
      <div className="flex items-baseline gap-2 mb-2">
        <span className="text-4xl font-extrabold text-slate-900 dark:text-white">{accuracy}%</span>
        <span className="text-xs font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300">
          Target: 80%+
        </span>
      </div>
      <div className="text-xs text-slate-500 mb-4">
        <span className="text-emerald-600 dark:text-emerald-400 font-bold">
          {correctCount} Correct
        </span>
        {' • '}
        <span className="text-rose-500 font-bold">{incorrectCount} Wrong</span>
      </div>
      <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
        <span className="text-slate-400">Customize Daily Target</span>
        <button
          onClick={onToggleEditTarget}
          className="inline-flex items-center gap-1 text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 font-semibold cursor-pointer"
        >
          <Settings className="w-3.5 h-3.5" />
          <span>{isEditingTarget ? 'Close' : 'Adjust Target'}</span>
        </button>
      </div>
    </div>
  );
};
