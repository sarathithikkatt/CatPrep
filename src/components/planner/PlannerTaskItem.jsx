import React from 'react';
import { CheckCircle2, Circle, Clock, Trash2 } from 'lucide-react';
import { getSectionBadge, getPillarBadge } from './plannerConstants';

/**
 * Individual schedule task item with completion toggle, badges, estimated time, and delete button.
 */
export const PlannerTaskItem = ({
  task,
  dayId,
  onToggleTask,
  onDeleteTask
}) => {
  const secBadge = getSectionBadge(task.section);
  const pillarBadge = getPillarBadge(task.pillar);

  return (
    <div
      className={`p-4 sm:p-5 flex items-start justify-between gap-3 transition-colors ${
        task.completed
          ? 'bg-slate-50/50 dark:bg-slate-800/20 text-slate-400'
          : 'hover:bg-slate-50/70 dark:hover:bg-slate-800/40'
      }`}
    >
      <div className="flex items-start gap-3 flex-1">
        {/* Toggle Complete Checkbox */}
        <button
          onClick={() => onToggleTask(dayId, task.id)}
          className="mt-0.5 text-slate-400 hover:text-indigo-600 transition cursor-pointer"
          title={task.completed ? 'Mark incomplete' : 'Mark complete'}
        >
          {task.completed ? (
            <CheckCircle2 className="w-5 h-5 text-emerald-600 fill-emerald-100 dark:fill-emerald-950" />
          ) : (
            <Circle className="w-5 h-5 text-slate-300 dark:text-slate-600 hover:text-indigo-600" />
          )}
        </button>

        <div className="flex-1 space-y-1.5">
          <div className="flex items-center gap-2 flex-wrap">
            <span className={`text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md border ${secBadge.className}`}>
              {secBadge.label}
            </span>

            <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md border ${pillarBadge.className}`}>
              {pillarBadge.label}
            </span>

            <span className="text-[11px] font-medium text-slate-400 flex items-center gap-1">
              <Clock className="w-3 h-3" />
              <span>~{task.minutes} mins</span>
            </span>
          </div>

          <p className={`text-xs sm:text-sm font-semibold leading-relaxed ${
            task.completed
              ? 'line-through text-slate-400 dark:text-slate-500'
              : 'text-slate-800 dark:text-slate-100'
          }`}>
            {task.title}
          </p>
        </div>
      </div>

      {/* Delete Task Button */}
      <button
        onClick={() => onDeleteTask(dayId, task.id)}
        title="Remove task"
        className="p-1.5 text-slate-300 hover:text-rose-600 rounded-lg transition cursor-pointer"
      >
        <Trash2 className="w-4 h-4" />
      </button>
    </div>
  );
};
