import React from 'react';
import { ProgressBar } from '../common/ProgressBar';
import { PlannerTaskItem } from './PlannerTaskItem';

/**
 * Schedule container for a single day (e.g. Monday), showing theme, description, progress, and tasks.
 */
export const DayScheduleCard = ({
  day,
  pillarFilter,
  sectionFilter,
  onToggleTask,
  onDeleteTask,
  onMarkDayComplete
}) => {
  const filteredTasks = day.tasks.filter((t) => {
    if (pillarFilter !== 'all' && t.pillar !== pillarFilter) return false;
    if (sectionFilter !== 'all' && t.section !== sectionFilter) return false;
    return true;
  });

  const dayCompleted = day.tasks.filter((t) => t.completed).length;
  const dayTotal = day.tasks.length;
  const dayProgressPercent = dayTotal > 0 ? Math.round((dayCompleted / dayTotal) * 100) : 0;

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
      {/* Day Header */}
      <div className="px-6 py-4 bg-slate-50/80 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2.5">
            <h2 className="text-base font-black text-slate-900 dark:text-white">{day.dayName}</h2>
            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
              {day.theme}
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">{day.description}</p>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right">
            <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
              {dayCompleted}/{dayTotal} Done ({dayProgressPercent}%)
            </span>
            <div className="w-24 mt-1">
              <ProgressBar percent={dayProgressPercent} height="h-1.5" color="bg-indigo-600" />
            </div>
          </div>

          {dayCompleted < dayTotal && (
            <button
              onClick={() => onMarkDayComplete(day.dayId)}
              className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline cursor-pointer"
            >
              Complete All
            </button>
          )}
        </div>
      </div>

      {/* Day Tasks List */}
      <div className="divide-y divide-slate-100 dark:divide-slate-800">
        {filteredTasks.length === 0 ? (
          <div className="p-8 text-center text-xs text-slate-400">
            No tasks match the active filters for {day.dayName}.
          </div>
        ) : (
          filteredTasks.map((task) => (
            <PlannerTaskItem
              key={task.id}
              task={task}
              dayId={day.dayId}
              onToggleTask={onToggleTask}
              onDeleteTask={onDeleteTask}
            />
          ))
        )}
      </div>
    </div>
  );
};
