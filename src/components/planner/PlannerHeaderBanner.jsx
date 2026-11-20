import React from 'react';
import { Calendar, Plus, RotateCcw } from 'lucide-react';
import { ProgressBar } from '../common/ProgressBar';

/**
 * Top banner of StudyPlanner with title, quick actions, and task/time completion meters.
 */
export const PlannerHeaderBanner = ({
  completedTasks = 0,
  totalTasks = 0,
  weeklyProgressPercent = 0,
  completedMinutes = 0,
  totalMinutesPlanned = 0,
  onOpenAddModal,
  onResetToDefault,
  onClearCompleted
}) => {
  const completedHours = Math.round((completedMinutes / 60) * 10) / 10;
  const targetHours = Math.round((totalMinutesPlanned / 60) * 10) / 10;
  const timeProgressPercent = totalMinutesPlanned > 0
    ? Math.min(100, Math.round((completedMinutes / totalMinutesPlanned) * 100))
    : 0;

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Calendar className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            <h1 className="text-xl font-black text-slate-900 dark:text-white">
              Weekly Study Planner (R-E-S-T Framework)
            </h1>
          </div>
          <p className="text-xs text-slate-400">
            Structured multi-week schedule: Revise fundamentals, Enhance via targeted drills, Strategize pacing & Test in real conditions.
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={onOpenAddModal}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md shadow-indigo-500/20 transition cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add Custom Task</span>
          </button>

          <button
            onClick={onResetToDefault}
            title="Reset schedule to recommended R-E-S-T blueprint"
            className="px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 font-semibold text-xs flex items-center gap-1 transition cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5 text-slate-500" />
            <span>Reset Template</span>
          </button>
        </div>
      </div>

      {/* Weekly Completion Progress Meter */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-100 dark:border-slate-800/80">
        <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
            Weekly Task Completion
          </span>
          <div className="flex items-baseline justify-between mb-2">
            <span className="text-lg font-black text-slate-900 dark:text-white">
              {completedTasks} / {totalTasks} Tasks
            </span>
            <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400">
              {weeklyProgressPercent}%
            </span>
          </div>
          <ProgressBar percent={weeklyProgressPercent} height="h-2" color="bg-indigo-600" />
        </div>

        <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
            Study Time Logged
          </span>
          <div className="flex items-baseline justify-between mb-2">
            <span className="text-lg font-black text-slate-900 dark:text-white">
              {completedHours} hrs done
            </span>
            <span className="text-xs text-slate-400 font-medium">
              of {targetHours} hrs target
            </span>
          </div>
          <ProgressBar percent={timeProgressPercent} height="h-2" color="bg-emerald-500" />
        </div>

        <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
              Quick Actions
            </span>
            <span className="text-xs text-slate-600 dark:text-slate-300 font-semibold block">
              Manage weekly checkpoints
            </span>
          </div>
          <button
            onClick={onClearCompleted}
            className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition cursor-pointer"
          >
            Clear Completed
          </button>
        </div>
      </div>
    </div>
  );
};
