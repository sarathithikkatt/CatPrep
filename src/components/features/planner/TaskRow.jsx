import React from 'react';
import { CheckCircle2, Circle, ArrowRight } from 'lucide-react';
import { Badge } from '../../common/Badge';

/**
 * TaskRow: Individual interactive study plan task with deep-link navigation.
 * Standardized touch-target sizes and responsive mobile layout.
 */
export const TaskRow = ({ task, isCompleted = false, onToggle, onNavigateAction }) => {
  const sectionBadgeConfig = {
    qa: { label: 'QA', variant: 'amber' },
    dilr: { label: 'DILR', variant: 'emerald' },
    varc: { label: 'VARC', variant: 'purple' },
    mock: { label: 'Mock', variant: 'rose' },
    review: { label: 'Review', variant: 'indigo' }
  };

  const badgeInfo = sectionBadgeConfig[task.section] || { label: 'General', variant: 'default' };

  return (
    <div
      className={`group flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 rounded-xl border transition-all ${
        isCompleted
          ? 'bg-slate-50/60 dark:bg-slate-900/40 border-slate-200/60 dark:border-slate-800/60 opacity-80'
          : 'bg-white dark:bg-slate-800/80 border-slate-200/90 dark:border-slate-700/80 hover:border-indigo-400 dark:hover:border-indigo-600 shadow-xs'
      }`}
    >
      {/* Checkbox & Task Information */}
      <div className="flex items-start gap-3 flex-1 min-w-0">
        <button
          type="button"
          onClick={() => onToggle(task.id)}
          className="mt-0.5 shrink-0 text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition cursor-pointer"
          title={isCompleted ? 'Mark as incomplete' : 'Mark as completed'}
        >
          {isCompleted ? (
            <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
          ) : (
            <Circle className="w-5 h-5" />
          )}
        </button>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <Badge variant={badgeInfo.variant} size="sm">
              {badgeInfo.label}
            </Badge>
            <h4
              className={`text-xs sm:text-sm font-bold text-slate-900 dark:text-white leading-snug ${
                isCompleted ? 'line-through text-slate-400 dark:text-slate-500' : ''
              }`}
            >
              {task.title}
            </h4>
          </div>

          {task.description && (
            <p className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-2">
              {task.description}
            </p>
          )}
        </div>
      </div>

      {/* Deep-Link Action Button */}
      {task.targetAction && onNavigateAction && (
        <button
          type="button"
          onClick={() => onNavigateAction(task.targetAction)}
          className="shrink-0 inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 hover:bg-indigo-600 hover:text-white dark:hover:bg-indigo-600 transition cursor-pointer self-start sm:self-center ml-8 sm:ml-0"
        >
          <span>{task.targetAction.label}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      )}
    </div>
  );
};
