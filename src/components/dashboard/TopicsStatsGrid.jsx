import React from 'react';

/**
 * 4-column summary of topic progress (Total, Mastered, In Progress, Unstarted).
 */
export const TopicsStatsGrid = ({
  totalTopics = 0,
  masteredTopics = 0,
  inProgressTopics = 0
}) => {
  const unstarted = Math.max(0, totalTopics - masteredTopics - inProgressTopics);

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
      <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 text-center">
        <span className="text-xl font-bold text-slate-800 dark:text-slate-100 block">
          {totalTopics}
        </span>
        <span className="text-[11px] font-medium text-slate-400">Total Topics</span>
      </div>
      <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-100 dark:border-emerald-900/40 text-center">
        <span className="text-xl font-bold text-emerald-600 dark:text-emerald-400 block">
          {masteredTopics}
        </span>
        <span className="text-[11px] font-medium text-emerald-600/80 dark:text-emerald-400/80">Mastered</span>
      </div>
      <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-100 dark:border-amber-900/40 text-center">
        <span className="text-xl font-bold text-amber-600 dark:text-amber-400 block">
          {inProgressTopics}
        </span>
        <span className="text-[11px] font-medium text-amber-600/80 dark:text-amber-400/80">In Progress</span>
      </div>
      <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-100 dark:border-blue-900/40 text-center">
        <span className="text-xl font-bold text-blue-600 dark:text-blue-400 block">
          {unstarted}
        </span>
        <span className="text-[11px] font-medium text-blue-600/80 dark:text-blue-400/80">Unstarted</span>
      </div>
    </div>
  );
};
