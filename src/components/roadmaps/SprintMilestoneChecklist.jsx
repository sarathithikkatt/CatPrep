import React from 'react';
import { CheckCircle2, Circle } from 'lucide-react';

/**
 * Interactive checklist component for sprint milestones.
 * Tracks completion state in userData.sprintChecklist.
 */
export const SprintMilestoneChecklist = ({
  checkpoints = [],
  completedMap = {},
  onToggleCheckpoint,
  title = 'Actionable Milestones'
}) => {
  const completedCount = checkpoints.filter((c) => completedMap[c.id]).length;
  const totalCount = checkpoints.length;
  const percent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  return (
    <div className="bg-slate-50 dark:bg-slate-900/60 rounded-xl p-4 border border-slate-200 dark:border-slate-800">
      <div className="flex items-center justify-between mb-3">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          {title} ({completedCount}/{totalCount})
        </h4>
        <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400">
          {percent}% Done
        </span>
      </div>

      <div className="space-y-2">
        {checkpoints.map((item) => {
          const isDone = !!completedMap[item.id];
          return (
            <button
              key={item.id}
              onClick={() => onToggleCheckpoint(item.id)}
              className={`w-full text-left flex items-start gap-3 p-2.5 rounded-lg text-xs transition-all cursor-pointer ${
                isDone
                  ? 'bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/80 text-emerald-900 dark:text-emerald-200 line-through opacity-85'
                  : 'bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700/80 text-slate-800 dark:text-slate-200 hover:border-indigo-400 dark:hover:border-indigo-600'
              }`}
            >
              <span className="shrink-0 mt-0.5">
                {isDone ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                ) : (
                  <Circle className="w-4 h-4 text-slate-400 hover:text-indigo-500" />
                )}
              </span>
              <span className="flex-1 leading-relaxed">{item.text}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
