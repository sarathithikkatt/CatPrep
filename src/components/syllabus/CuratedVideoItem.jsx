import React from 'react';
import { Play, ArrowUpRight } from 'lucide-react';

/**
 * Curated video masterclass item card linking directly to free YouTube lectures.
 */
export const CuratedVideoItem = ({ lecture }) => {
  return (
    <a
      href={lecture.url}
      target="_blank"
      rel="noreferrer"
      className="flex items-center justify-between p-2.5 rounded-xl border border-slate-200 dark:border-slate-700/80 bg-white dark:bg-slate-800 hover:border-red-400 dark:hover:border-red-500/80 transition-all shadow-xs group"
    >
      <div className="flex items-center gap-2.5 overflow-hidden">
        <div className="w-7 h-7 rounded-lg bg-red-50 dark:bg-red-950/60 text-red-600 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
          <Play className="w-3.5 h-3.5 fill-red-600" />
        </div>
        <div className="truncate">
          <span className="text-xs font-bold text-slate-800 dark:text-slate-200 block truncate group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors">
            {lecture.title}
          </span>
          <span className="text-[10px] text-slate-400 font-medium">
            {lecture.educator} • {lecture.duration}
          </span>
        </div>
      </div>
      <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-red-500 shrink-0 ml-1.5 transition-colors" />
    </a>
  );
};
