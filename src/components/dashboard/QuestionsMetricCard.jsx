import React from 'react';
import { Target } from 'lucide-react';
import { ProgressBar } from '../common/ProgressBar';

/**
 * Metric card showing daily questions solved vs target.
 */
export const QuestionsMetricCard = ({ questionsSolved = 0, targetQuestions = 25 }) => {
  const qsRemaining = Math.max(0, targetQuestions - questionsSolved);
  const qsPercent = Math.min(100, Math.round((questionsSolved / targetQuestions) * 100));

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden">
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          Questions Today
        </span>
        <div className="p-2 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400">
          <Target className="w-5 h-5" />
        </div>
      </div>
      <div className="flex items-baseline gap-2 mb-2">
        <span className="text-4xl font-extrabold text-slate-900 dark:text-white">
          {questionsSolved}
        </span>
        <span className="text-slate-400 font-semibold text-lg">/ {targetQuestions}</span>
      </div>
      <ProgressBar percent={qsPercent} height="h-2.5" color="bg-blue-600" className="mb-3" />
      <div className="flex items-center justify-between text-xs">
        <span className={qsRemaining === 0 ? 'text-emerald-600 font-bold' : 'text-slate-500'}>
          {qsRemaining === 0 ? '🎉 Daily Goal Achieved!' : `${qsRemaining} questions remaining`}
        </span>
        <span className="font-semibold text-slate-700 dark:text-slate-300">{qsPercent}% done</span>
      </div>
    </div>
  );
};
