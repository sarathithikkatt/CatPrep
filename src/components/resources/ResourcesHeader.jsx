import React from 'react';

/**
 * Header banner for Resources Guide.
 */
export const ResourcesHeader = () => {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm">
      <h1 className="text-xl font-black text-slate-900 dark:text-white mb-1">
        CAT Preparation Resources & Official Repositories
      </h1>
      <p className="text-xs text-slate-400">
        Curated authentic previous year papers, top video lectures, reading lists & percentile
        benchmarks
      </p>
    </div>
  );
};
