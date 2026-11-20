import React from 'react';

/**
 * Inline customizable form to adjust daily target questions and minutes.
 */
export const DailyTargetEditor = ({
  targetQsInput,
  setTargetQsInput,
  targetMinsInput,
  setTargetMinsInput,
  onSaveTarget
}) => {
  return (
    <div className="p-5 bg-indigo-50 dark:bg-indigo-950/30 rounded-2xl border border-indigo-200 dark:border-indigo-900/60 flex flex-wrap items-center gap-4">
      <div className="flex-1 min-w-[200px]">
        <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
          Target Questions / Day:
        </label>
        <input
          type="number"
          min="5"
          max="150"
          value={targetQsInput}
          onChange={(e) => setTargetQsInput(e.target.value)}
          className="w-full px-3 py-1.5 rounded-lg border border-indigo-300 dark:border-indigo-700 bg-white dark:bg-slate-900 text-sm font-semibold"
        />
      </div>
      <div className="flex-1 min-w-[200px]">
        <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
          Target Study Minutes / Day:
        </label>
        <input
          type="number"
          min="15"
          max="600"
          value={targetMinsInput}
          onChange={(e) => setTargetMinsInput(e.target.value)}
          className="w-full px-3 py-1.5 rounded-lg border border-indigo-300 dark:border-indigo-700 bg-white dark:bg-slate-900 text-sm font-semibold"
        />
      </div>
      <div className="pt-5">
        <button
          onClick={onSaveTarget}
          className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-sm cursor-pointer transition"
        >
          Save New Targets
        </button>
      </div>
    </div>
  );
};
