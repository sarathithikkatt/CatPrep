import React from 'react';
import { Award, Plus } from 'lucide-react';

/**
 * Top header of MockScorecard with title and action button.
 */
export const MockScorecardHeader = ({ onOpenAddModal }) => {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <div className="flex items-center gap-2 mb-1">
          <Award className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
          <h1 className="text-xl font-black text-slate-900 dark:text-white">
            Mock Test Scorecards & Capability Analysis
          </h1>
        </div>
        <p className="text-xs text-slate-400">
          Log sectional & full-length mock exams (IMS, TIME, CL, Cracku), track percentiles &
          measure your Panic Delta
        </p>
      </div>

      <button
        onClick={onOpenAddModal}
        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md shadow-indigo-500/20 transition-all cursor-pointer"
      >
        <Plus className="w-4 h-4" />
        <span>Log Mock Score</span>
      </button>
    </div>
  );
};
