import React from 'react';
import { Filter } from 'lucide-react';

/**
 * Filter pills for syllabus status: All, Mastered, In Progress, Not Started.
 */
export const StatusFilterPills = ({ statusFilter, onSelectStatus }) => {
  const statuses = ['all', 'completed', 'in_progress', 'not_started'];

  return (
    <div className="flex items-center gap-2 pt-4 text-xs">
      <Filter className="w-3.5 h-3.5 text-slate-400" />
      <span className="text-slate-400 font-semibold">Filter:</span>
      {statuses.map((status) => (
        <button
          key={status}
          onClick={() => onSelectStatus(status)}
          className={`px-2.5 py-1 rounded-lg font-semibold capitalize transition cursor-pointer ${
            statusFilter === status
              ? 'bg-slate-800 text-white dark:bg-slate-100 dark:text-slate-900'
              : 'text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          {status.replace('_', ' ')}
        </button>
      ))}
    </div>
  );
};
