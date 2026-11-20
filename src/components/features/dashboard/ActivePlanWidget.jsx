import React from 'react';
import { ArrowRight, Zap } from 'lucide-react';
import { useStudyPlans } from '../../../hooks/useStudyPlans';
import { ProgressBar } from '../../common/ProgressBar';

/**
 * ActivePlanWidget:
 * Embeds a real-time study plan summary card on the DashboardTracker.
 * Fully responsive on mobile with full-width CTA buttons and enhanced contrast.
 */
export const ActivePlanWidget = ({ onNavigateToPlanner, onNavigateAction }) => {
  const { activeTrackConfig, activeTrackState, progressMetrics } = useStudyPlans();

  // Find next pending task
  const allTasks = activeTrackConfig?.phases?.flatMap((p) => p.tasks) || [];
  const completedIds = activeTrackState.completedTaskIds || [];
  const nextPendingTask = allTasks.find((t) => !completedIds.includes(t.id));

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 sm:p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0">
            <Zap className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 block">
              Active Study Plan
            </span>
            <h3 className="text-base font-black text-slate-900 dark:text-white">
              {activeTrackConfig.title}
            </h3>
          </div>
        </div>

        <div className="flex items-center justify-between sm:justify-end gap-2 w-full sm:w-auto">
          <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-amber-50 dark:bg-amber-950/70 text-amber-800 dark:text-amber-200 border border-amber-300 dark:border-amber-700/80">
            Day {progressMetrics.currentDay} of {progressMetrics.totalDays}
          </span>
          <button
            type="button"
            onClick={onNavigateToPlanner}
            className="inline-flex items-center gap-1 text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 transition cursor-pointer"
          >
            <span>View Plan</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Progress Bar */}
      <div>
        <div className="flex items-baseline justify-between text-xs mb-1.5">
          <span className="text-slate-500 dark:text-slate-400 font-semibold">
            Track Progress: {progressMetrics.completedTasks} / {progressMetrics.totalTasks} Tasks
          </span>
          <span className="font-extrabold text-indigo-600 dark:text-indigo-400">
            {progressMetrics.percent}%
          </span>
        </div>
        <ProgressBar percent={progressMetrics.percent} height="h-2" color="bg-indigo-600" />
      </div>

      {/* Next Up Priority Task */}
      {nextPendingTask && (
        <div className="p-3.5 sm:p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="min-w-0 flex-1">
            <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-0.5">
              Next Priority Task
            </div>
            <div className="text-xs sm:text-sm font-extrabold text-slate-900 dark:text-white leading-snug">
              {nextPendingTask.title}
            </div>
            {nextPendingTask.description && (
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 line-clamp-1">
                {nextPendingTask.description}
              </p>
            )}
          </div>

          {nextPendingTask.targetAction && onNavigateAction && (
            <button
              type="button"
              onClick={() => onNavigateAction(nextPendingTask.targetAction)}
              className="shrink-0 inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-indigo-600 text-white shadow-xs hover:bg-indigo-700 active:scale-[0.98] transition cursor-pointer w-full sm:w-auto"
            >
              <span>{nextPendingTask.targetAction.label}</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          )}
        </div>
      )}
    </div>
  );
};
