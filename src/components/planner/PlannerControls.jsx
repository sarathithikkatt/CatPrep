import React from 'react';
import { Filter } from 'lucide-react';

/**
 * Filter controls row for StudyPlanner: day pills and section dropdown.
 */
export const PlannerControls = ({
  weeklyPlan,
  totalTasks,
  selectedDay,
  onSelectDay,
  sectionFilter,
  onSelectSection
}) => {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      {/* Day Pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
        <button
          onClick={() => onSelectDay('all')}
          className={`px-3 py-1.5 rounded-xl font-bold text-xs whitespace-nowrap transition cursor-pointer ${
            selectedDay === 'all'
              ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          All Week ({totalTasks})
        </button>

        {weeklyPlan.map((d) => {
          const isSelected = selectedDay === d.dayId;
          const dayDone = d.tasks.filter((t) => t.completed).length;
          const dayTotal = d.tasks.length;

          return (
            <button
              key={d.dayId}
              onClick={() => onSelectDay(d.dayId)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-bold text-xs whitespace-nowrap transition cursor-pointer ${
                isSelected
                  ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-500/20'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <span>{d.dayName.slice(0, 3)}</span>
              <span
                className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                  isSelected
                    ? 'bg-white/20 text-white'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-500'
                }`}
              >
                {dayDone}/{dayTotal}
              </span>
            </button>
          );
        })}
      </div>

      {/* Section Filter Dropdown */}
      <div className="flex items-center gap-2 shrink-0">
        <Filter className="w-3.5 h-3.5 text-slate-400" />
        <span className="text-xs font-semibold text-slate-400">Section:</span>
        <select
          value={sectionFilter}
          onChange={(e) => onSelectSection(e.target.value)}
          className="text-xs font-semibold px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-200 focus:outline-none cursor-pointer"
        >
          <option value="all">All Sections</option>
          <option value="qa">QA (Quant)</option>
          <option value="dilr">DILR</option>
          <option value="varc">VARC</option>
          <option value="mock">Mock Test</option>
          <option value="general">General / Review</option>
        </select>
      </div>
    </div>
  );
};
