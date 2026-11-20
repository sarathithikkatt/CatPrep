import React from 'react';
import { Target } from 'lucide-react';

/**
 * AptiPrep brand logo and target percentile badge.
 */
export const BrandLogo = () => {
  return (
    <div className="flex items-center gap-2.5">
      <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-blue-500 flex items-center justify-center text-white shadow-md shadow-indigo-500/20">
        <Target className="w-5 h-5" />
      </div>
      <div>
        <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-indigo-600 via-blue-600 to-indigo-800 bg-clip-text text-transparent">
          AptiPrep
        </span>
        <span className="ml-1 text-xs font-semibold px-1.5 py-0.5 rounded bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300">
          99%ile
        </span>
      </div>
    </div>
  );
};
