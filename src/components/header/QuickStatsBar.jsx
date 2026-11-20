import React from 'react';
import { Flame } from 'lucide-react';
import { ProgressBar } from '../common/ProgressBar';

/**
 * Quick progress stats in header: Daily questions progress pill and streak count.
 */
export const QuickStatsBar = ({ questionsSolved = 0, targetQuestions = 25, streakCount = 1 }) => {
  const questionsProgressPercent = Math.min(
    100,
    Math.round((questionsSolved / targetQuestions) * 100)
  );

  return (
    <div className="flex items-center gap-2 sm:gap-3">
      {/* Daily Target Pill */}
      <div className="hidden sm:flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/60">
        <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
        <div className="text-xs">
          <span className="font-bold text-slate-700 dark:text-slate-200">{questionsSolved}</span>
          <span className="text-slate-400">/{targetQuestions} Qs Today</span>
        </div>
        <div className="w-16">
          <ProgressBar percent={questionsProgressPercent} height="h-1.5" color="bg-indigo-600" />
        </div>
      </div>

      {/* Streak Counter */}
      <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-orange-50 dark:bg-orange-950/40 border border-orange-200 dark:border-orange-900/50 text-orange-600 dark:text-orange-400 font-bold text-xs">
        <Flame className="w-4 h-4 fill-orange-500" />
        <span>{streakCount}d Streak</span>
      </div>
    </div>
  );
};
