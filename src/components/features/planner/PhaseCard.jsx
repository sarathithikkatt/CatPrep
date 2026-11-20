import React, { useState } from 'react';
import { ChevronDown, ChevronUp, CheckCheck, Sparkles } from 'lucide-react';
import { TaskRow } from './TaskRow';
import { ProgressBar } from '../../common/ProgressBar';

/**
 * PhaseCard: Collapsible phase container with active indicator, progress meter,
 * and bulk phase task toggle. Fully responsive on mobile viewports.
 */
export const PhaseCard = ({
  phase,
  completedTaskIds = [],
  isCurrentPhase = false,
  onToggleTask,
  onNavigateAction,
  onMarkPhaseTasks
}) => {
  const [isExpanded, setIsExpanded] = useState(isCurrentPhase);

  const tasks = phase.tasks || [];
  const completedCount = tasks.filter((t) => completedTaskIds.includes(t.id)).length;
  const totalCount = tasks.length;
  const percent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;
  const isAllDone = totalCount > 0 && completedCount === totalCount;

  return (
    <div
      className={`rounded-2xl border transition-all ${
        isCurrentPhase
          ? 'bg-white dark:bg-slate-900 border-indigo-300 dark:border-indigo-800 ring-2 ring-indigo-500/15 shadow-md'
          : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 shadow-xs'
      }`}
    >
      {/* Phase Header */}
      <div
        onClick={() => setIsExpanded(!isExpanded)}
        className="p-4 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 cursor-pointer select-none"
      >
        <div className="space-y-1 flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
              {phase.daysLabel}
            </span>
            {isCurrentPhase && (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-indigo-100 dark:bg-indigo-950/80 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
                <Sparkles className="w-3 h-3 text-indigo-600 dark:text-indigo-400" />
                <span>Active Phase</span>
              </span>
            )}
          </div>

          <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white leading-snug">
            {phase.name}
          </h3>

          {phase.goal && (
            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-2xl leading-relaxed">
              {phase.goal}
            </p>
          )}
        </div>

        {/* Phase Progress & Controls (Responsive row on mobile) */}
        <div
          className="flex items-center justify-between sm:justify-end gap-3 w-full sm:w-auto shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100 dark:border-slate-800/80"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center gap-3">
            <div className="text-left sm:text-right min-w-[90px]">
              <div className="text-xs font-bold text-slate-800 dark:text-slate-200">
                {completedCount} / {totalCount} Done
              </div>
              <div className="w-20 sm:w-24 mt-1">
                <ProgressBar percent={percent} height="h-1.5" color="bg-indigo-600" />
              </div>
            </div>

            <button
              type="button"
              onClick={() => onMarkPhaseTasks(phase.id, !isAllDone)}
              className="p-2 rounded-xl text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer"
              title={isAllDone ? 'Mark all incomplete' : 'Mark all complete'}
            >
              <CheckCheck className={`w-4 h-4 ${isAllDone ? 'text-emerald-500' : ''}`} />
            </button>
          </div>

          <button
            type="button"
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer"
          >
            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Collapsible Tasks List */}
      {isExpanded && (
        <div className="px-4 sm:px-6 pb-5 sm:pb-6 pt-1 border-t border-slate-100 dark:border-slate-800/80 space-y-2">
          {tasks.map((task) => (
            <TaskRow
              key={task.id}
              task={task}
              isCompleted={completedTaskIds.includes(task.id)}
              onToggle={() => onToggleTask(task.id)}
              onNavigateAction={onNavigateAction}
            />
          ))}
        </div>
      )}
    </div>
  );
};
