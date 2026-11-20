import React from 'react';
import { Bookmark, CheckCircle2, RotateCcw } from 'lucide-react';
import { MISTAKE_REASONS } from './notebookConstants';

/**
 * Header banner for MistakeNotebook with counters, Start Drill CTA, and root-cause filter buttons.
 */
export const NotebookHeader = ({
  totalCount = 0,
  masteredCount = 0,
  activeReasonFilter,
  onSelectReasonFilter,
  onStartDrill
}) => {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Bookmark className="w-5 h-5 text-amber-500 fill-amber-500" />
            <h1 className="text-xl font-black text-slate-900 dark:text-white">
              Mistake & Revision Notebook
            </h1>
          </div>
          <p className="text-xs text-slate-400">
            The #1 differentiator for 99+ percentile scorers. Re-test errors with answers hidden & confirm true mastery.
          </p>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap">
          <span className="text-xs font-bold px-3 py-1.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
            {totalCount} Questions for Revision
          </span>

          {masteredCount > 0 && (
            <span className="text-xs font-bold px-3 py-1.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>{masteredCount} Mastered on Re-test</span>
            </span>
          )}

          {totalCount > 0 && (
            <button
              onClick={onStartDrill}
              className="px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-sm flex items-center gap-1.5 transition cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Start Re-test Drill</span>
            </button>
          )}
        </div>
      </div>

      {/* Filter by Root Cause */}
      <div className="flex items-center gap-2 pt-4 overflow-x-auto text-xs">
        <span className="text-slate-400 font-bold shrink-0">Filter By Cause:</span>
        <button
          onClick={() => onSelectReasonFilter('all')}
          className={`px-3 py-1 rounded-lg font-bold transition shrink-0 cursor-pointer ${
            activeReasonFilter === 'all'
              ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900'
              : 'text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          All Errors ({totalCount})
        </button>
        {MISTAKE_REASONS.map((r) => (
          <button
            key={r.id}
            onClick={() => onSelectReasonFilter(r.label)}
            className={`px-2.5 py-1 rounded-lg border font-semibold shrink-0 transition cursor-pointer ${
              activeReasonFilter === r.label
                ? `${r.color} font-bold ring-2 ring-indigo-500/20`
                : 'border-slate-200 dark:border-slate-700 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            {r.label}
          </button>
        ))}
      </div>
    </div>
  );
};
