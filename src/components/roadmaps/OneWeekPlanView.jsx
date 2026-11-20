import React, { useState } from 'react';
import { Clock, ShieldCheck, Flame, Compass, HeartPulse, Luggage } from 'lucide-react';
import { ONE_WEEK_PLAN_DATA } from './sprintPlansData';
import { SprintMilestoneChecklist } from './SprintMilestoneChecklist';

/**
 * 1-Week Protocol View (D-7 to D-Day):
 * Day-by-day countdown protocol to preserve cognitive energy,
 * align circadian rhythms, pack logistics, and execute on exam day.
 */
export const OneWeekPlanView = ({ completedCheckpoints = {}, onToggleCheckpoint }) => {
  const [selectedDayId, setSelectedDayId] = useState('d7');
  const data = ONE_WEEK_PLAN_DATA;
  const currentDay = data.days.find((d) => d.dayId === selectedDayId) || data.days[0];

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center gap-2 text-rose-600 dark:text-rose-400 mb-1">
            <Clock className="w-4 h-4" />
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Total Runway
            </span>
          </div>
          <div className="text-xl font-black text-slate-900 dark:text-white">
            ~{data.overview.totalHours} Hours
          </div>
          <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
            Tapering to 0 hours on D-1
          </div>
        </div>

        <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 mb-1">
            <ShieldCheck className="w-4 h-4" />
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Mock Policy
            </span>
          </div>
          <div className="text-sm font-bold text-slate-900 dark:text-white mt-1">
            Baseline on D-7 Only
          </div>
          <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
            Zero full mocks from D-6 onward
          </div>
        </div>

        <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 mb-1">
            <HeartPulse className="w-4 h-4" />
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Sleep Hygiene
            </span>
          </div>
          <div className="text-sm font-bold text-slate-900 dark:text-white mt-1">
            8 Hours / Night
          </div>
          <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
            Circadian lock to exam slot
          </div>
        </div>

        <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 mb-1">
            <Luggage className="w-4 h-4" />
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Logistics Check
            </span>
          </div>
          <div className="text-sm font-bold text-slate-900 dark:text-white mt-1">
            Admit Card + Photo ID
          </div>
          <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
            Locked on D-3 & D-2
          </div>
        </div>
      </div>

      {/* Mindset Callout */}
      <div className="p-4 rounded-xl bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800 text-xs sm:text-sm text-purple-950 dark:text-purple-200 flex items-start gap-3">
        <span className="text-base">🧘</span>
        <div>
          <strong className="font-bold">Final 7-Day Mindset: </strong>
          <span>{data.overview.mindset}</span>
        </div>
      </div>

      {/* Day by Day Selector Pills */}
      <div className="flex gap-2 border-b border-slate-200 dark:border-slate-800 pb-2 overflow-x-auto scrollbar-none">
        {data.days.map((day) => {
          const isActive = selectedDayId === day.dayId;
          const completedCount = day.checklist.filter((c) => completedCheckpoints[c.id]).length;
          const isDDay = day.dayId === 'dday';

          return (
            <button
              key={day.dayId}
              onClick={() => setSelectedDayId(day.dayId)}
              className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl font-bold text-xs transition-all cursor-pointer whitespace-nowrap ${
                isActive
                  ? isDDay
                    ? 'bg-red-600 text-white shadow-md shadow-red-500/25 ring-2 ring-red-400'
                    : 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20'
                  : isDDay
                    ? 'bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300'
                    : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
              }`}
            >
              <span>{day.dayLabel}</span>
              <span
                className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                  isActive
                    ? 'bg-white/20 text-white'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-500'
                }`}
              >
                {completedCount}/{day.checklist.length}
              </span>
            </button>
          );
        })}
      </div>

      {/* Selected Day Details */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span
                className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold ${currentDay.tagColor}`}
              >
                {currentDay.tag}
              </span>
              <span className="text-xs font-bold text-slate-400">
                • Target: {currentDay.targetHours}
              </span>
            </div>
            <h2 className="text-xl font-black text-slate-900 dark:text-white">
              {currentDay.dayLabel} — {currentDay.theme}
            </h2>
          </div>

          {currentDay.dayId === 'dday' && (
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-red-100 dark:bg-red-950/60 border border-red-300 dark:border-red-800 text-red-900 dark:text-red-200 text-xs font-bold">
              <Flame className="w-4 h-4 text-red-600 animate-pulse" />
              <span>Peak Execution Mode</span>
            </div>
          )}
        </div>

        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
          {currentDay.description}
        </p>

        {/* D-Day Specific Strategy Callout */}
        {currentDay.dayId === 'dday' && (
          <div className="p-4 rounded-xl bg-slate-900 text-white dark:bg-slate-800/80 border border-slate-700 space-y-3">
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-amber-300 flex items-center gap-1.5">
              <Compass className="w-4 h-4" />
              <span>The 120-Minute Exam Hall Playbook</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
              <div className="p-3 rounded-lg bg-white/5 border border-white/10 space-y-1">
                <div className="font-bold text-indigo-300">VARC (0 – 40 min)</div>
                <div className="text-slate-300 text-[11px]">
                  Read first passage with active visualization. Attempt 3 RCs + 8 VA or 4 RCs. Zero
                  wild guesses in MCQs.
                </div>
              </div>
              <div className="p-3 rounded-lg bg-white/5 border border-white/10 space-y-1">
                <div className="font-bold text-emerald-300">DILR (40 – 80 min)</div>
                <div className="text-slate-300 text-[11px]">
                  Take 4 full minutes to skim all 4 sets. Rank easiest to hardest. Crack 2 clean
                  sets (8-10 questions) = 99th percentile!
                </div>
              </div>
              <div className="p-3 rounded-lg bg-white/5 border border-white/10 space-y-1">
                <div className="font-bold text-amber-300">QA (80 – 120 min)</div>
                <div className="text-slate-300 text-[11px]">
                  Round 1: Instant Arithmetic/Algebra sitters (&lt;90s). Round 2: Solvable
                  multi-step. Drop any question exceeding 2.5 min.
                </div>
              </div>
            </div>
            <div className="text-[11px] text-rose-300 font-semibold pt-1">
              ⚡ <strong>Zero-Baggage Golden Rule:</strong> The moment a 40-minute block ends,
              forget it entirely. Never let a tough DILR set taint your Quant score!
            </div>
          </div>
        )}

        {/* Interactive Checklist */}
        <SprintMilestoneChecklist
          title={`${currentDay.dayLabel} Action Directives`}
          checkpoints={currentDay.checklist}
          completedMap={completedCheckpoints}
          onToggleCheckpoint={onToggleCheckpoint}
        />
      </div>
    </div>
  );
};
