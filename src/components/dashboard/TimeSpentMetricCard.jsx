import React from 'react';
import { Clock } from 'lucide-react';
import { ProgressBar } from '../common/ProgressBar';

/**
 * Metric card showing time invested today with quick-log buttons (+15m, +30m, +1h).
 */
export const TimeSpentMetricCard = ({
  minutesSpent = 0,
  targetMinutes = 120,
  onAddMinutes
}) => {
  const minsRemaining = Math.max(0, targetMinutes - minutesSpent);
  const minsPercent = Math.min(100, Math.round((minutesSpent / targetMinutes) * 100));
  const hours = Math.floor(minutesSpent / 60);
  const remMinutes = minutesSpent % 60;

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden">
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          Time Invested Today
        </span>
        <div className="p-2 rounded-xl bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400">
          <Clock className="w-5 h-5" />
        </div>
      </div>
      <div className="flex items-baseline gap-2 mb-2">
        <span className="text-4xl font-extrabold text-slate-900 dark:text-white">
          {minutesSpent}
        </span>
        <span className="text-slate-400 font-semibold text-sm">
          mins ({hours}h {remMinutes}m)
        </span>
      </div>
      <ProgressBar percent={minsPercent} height="h-2.5" color="bg-purple-600" className="mb-3" />
      <div className="flex items-center justify-between text-xs mb-3">
        <span className={minsRemaining === 0 ? 'text-emerald-600 font-bold' : 'text-slate-500'}>
          {minsRemaining === 0 ? 'Target reached' : `${minsRemaining} mins remaining of ${targetMinutes}m goal`}
        </span>
        <span className="font-semibold text-slate-700 dark:text-slate-300">{minsPercent}%</span>
      </div>

      {/* Quick Add Minutes Buttons */}
      <div className="flex items-center gap-1.5 pt-2 border-t border-slate-100 dark:border-slate-800">
        <span className="text-[11px] text-slate-400 font-medium">Log Time:</span>
        <button
          onClick={() => onAddMinutes(15)}
          className="px-2 py-1 rounded bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-semibold transition cursor-pointer"
        >
          +15m
        </button>
        <button
          onClick={() => onAddMinutes(30)}
          className="px-2 py-1 rounded bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-semibold transition cursor-pointer"
        >
          +30m
        </button>
        <button
          onClick={() => onAddMinutes(60)}
          className="px-2 py-1 rounded bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-semibold transition cursor-pointer"
        >
          +1h
        </button>
      </div>
    </div>
  );
};
