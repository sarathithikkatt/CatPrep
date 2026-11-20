import React, { useState } from 'react';
import { Calendar, Clock, RotateCcw, Award } from 'lucide-react';
import { ProgressBar } from '../../common/ProgressBar';

/**
 * ProgressBanner: Displays current day in schedule, completion meter,
 * editable start date, focus split breakdown, and reset controls.
 * Fully responsive for mobile viewports.
 */
export const ProgressBanner = ({
  trackConfig,
  trackState,
  metrics,
  onUpdateStartDate,
  onResetTrack
}) => {
  const [isEditingDate, setIsEditingDate] = useState(false);
  const [dateInput, setDateInput] = useState(
    trackState.startDate || new Date().toISOString().split('T')[0]
  );

  const handleSaveDate = (e) => {
    e.preventDefault();
    if (dateInput) {
      onUpdateStartDate(dateInput);
      setIsEditingDate(false);
    }
  };

  const handleReset = () => {
    if (confirm(`Reset all task progress for the ${trackConfig.title}? This cannot be undone.`)) {
      onResetTrack();
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 sm:p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4 sm:space-y-5">
      {/* Top Row: Track Title, Day Counter & Actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 sm:gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
              {trackConfig.durationBadge}
            </span>
            <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              <span>{trackConfig.dailyHours}</span>
            </div>
          </div>

          <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white flex items-center gap-2 flex-wrap">
            <span>{trackConfig.title}</span>
            <span className="text-indigo-600 dark:text-indigo-400 text-base sm:text-lg font-bold">
              • Day {metrics.currentDay} of {metrics.totalDays}
            </span>
          </h2>
        </div>

        {/* Date Selector & Reset (Responsive) */}
        <div className="flex items-center justify-between sm:justify-end gap-2 w-full sm:w-auto">
          {isEditingDate ? (
            <form
              onSubmit={handleSaveDate}
              className="flex items-center gap-1.5 flex-1 sm:flex-initial"
            >
              <input
                type="date"
                value={dateInput}
                onChange={(e) => setDateInput(e.target.value)}
                className="px-2.5 py-1.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 flex-1 sm:flex-initial"
              />
              <button
                type="submit"
                className="px-3 py-1.5 rounded-xl bg-indigo-600 text-white font-bold text-xs shadow-xs hover:bg-indigo-700 transition cursor-pointer"
              >
                Save
              </button>
              <button
                type="button"
                onClick={() => setIsEditingDate(false)}
                className="px-2 py-1.5 rounded-xl text-xs text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer"
              >
                Cancel
              </button>
            </form>
          ) : (
            <button
              type="button"
              onClick={() => setIsEditingDate(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 text-xs font-semibold transition cursor-pointer"
              title="Click to adjust start date"
            >
              <Calendar className="w-3.5 h-3.5 text-indigo-500" />
              <span>Started: {trackState.startDate || 'Today'}</span>
            </button>
          )}

          <button
            type="button"
            onClick={handleReset}
            className="p-1.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition cursor-pointer shrink-0"
            title="Reset track progress"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Focus Split Pills & Mock Cadence */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-[11px] font-bold text-slate-400 mr-1">Focus Split:</span>
          {trackConfig.focusSplit && (
            <div className="flex items-center gap-1.5 text-[10px] sm:text-xs font-bold flex-wrap">
              <span className="px-2 py-0.5 rounded-md bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                {trackConfig.focusSplit.concept}% Concept
              </span>
              <span className="px-2 py-0.5 rounded-md bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                {trackConfig.focusSplit.practice}% Practice
              </span>
              <span className="px-2 py-0.5 rounded-md bg-purple-50 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800">
                {trackConfig.focusSplit.revision}% Revision
              </span>
            </div>
          )}
        </div>

        <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
          <Award className="w-3.5 h-3.5 text-amber-500 shrink-0" />
          <span>Mocks: {trackConfig.mockFrequency}</span>
        </div>
      </div>

      {/* Track Completion Progress Meter */}
      <div>
        <div className="flex items-baseline justify-between text-xs mb-1.5">
          <span className="font-bold text-slate-700 dark:text-slate-300">
            Overall Completion: {metrics.completedTasks} / {metrics.totalTasks} Tasks
          </span>
          <span className="font-black text-indigo-600 dark:text-indigo-400">
            {metrics.percent}%
          </span>
        </div>
        <ProgressBar percent={metrics.percent} height="h-2.5" color="bg-indigo-600" />
      </div>
    </div>
  );
};
