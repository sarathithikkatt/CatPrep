import React from 'react';
import { Search } from 'lucide-react';

/**
 * Top header of SyllabusManager with search bar.
 */
export const SyllabusHeader = ({ examName, searchQuery, onSearchChange }) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
      <div>
        <h1 className="text-xl font-black text-slate-900 dark:text-white">
          {examName} Syllabus & Topic Planner
        </h1>
        <p className="text-xs text-slate-400">
          Structured topic breakdown, historical question weightage & mastery tracking
        </p>
      </div>

      {/* Search Bar */}
      <div className="relative w-full sm:w-64">
        <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5 pointer-events-none" />
        <input
          type="text"
          placeholder="Search topics or concepts..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-9 pr-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-800 dark:text-slate-100 focus:outline-none focus:border-indigo-500 transition-all"
        />
      </div>
    </div>
  );
};
