import React from 'react';
import { TrendingUp, ArrowRight } from 'lucide-react';

/**
 * Velocity & completion forecast card with hours left, days to finish, and CTA to practice.
 */
export const VelocityForecastCard = ({
  totalEstimatedHours = 0,
  totalRemainingHours = 0,
  estimatedDaysToFinish = 1,
  avgMinsPerDay = 90,
  onNavigateToPractice
}) => {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between">
      <div>
        <div className="flex items-center gap-2 mb-2">
          <TrendingUp className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
          <h2 className="text-base font-bold text-slate-900 dark:text-white">
            Completion Forecast
          </h2>
        </div>
        <p className="text-xs text-slate-400 mb-6 leading-relaxed">
          Based on your target hours (~{totalEstimatedHours}h curriculum) and current daily pace.
        </p>

        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
            <span className="text-xs text-slate-400 block mb-1">Estimated Hours Remaining</span>
            <span className="text-2xl font-black text-slate-800 dark:text-slate-100">
              ~{totalRemainingHours} Hours
            </span>
          </div>

          <div className="p-4 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900/40">
            <span className="text-xs text-indigo-600 dark:text-indigo-400 font-semibold block mb-1">
              Estimated Days to Complete Syllabus
            </span>
            <span className="text-2xl font-black text-indigo-700 dark:text-indigo-300">
              ~{estimatedDaysToFinish} Days
            </span>
            <span className="text-[11px] text-slate-400 block mt-1">
              At {Math.round((avgMinsPerDay / 60) * 10) / 10} hrs/day average
            </span>
          </div>
        </div>
      </div>

      <div className="pt-6">
        <button
          onClick={onNavigateToPractice}
          className="w-full py-2.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm shadow-indigo-500/20 transition-all cursor-pointer"
        >
          <span>Practice Today's PYQs</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
