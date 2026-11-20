import React, { useState } from 'react';
import { Calendar, Clock, BookOpen, Target, Award } from 'lucide-react';
import { THREE_MONTH_PLAN_DATA } from './sprintPlansData';
import { SprintMilestoneChecklist } from './SprintMilestoneChecklist';

/**
 * 3-Month Master Sprint View:
 * 90-day phase-wise roadmap covering Month 1 (Foundation), Month 2 (Consolidation), Month 3 (Exam Mode).
 */
export const ThreeMonthPlanView = ({ completedCheckpoints = {}, onToggleCheckpoint }) => {
  const [activePhaseIndex, setActivePhaseIndex] = useState(0);
  const data = THREE_MONTH_PLAN_DATA;
  const currentPhase = data.phases[activePhaseIndex];

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 mb-1">
            <Clock className="w-4 h-4" />
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Total Runway
            </span>
          </div>
          <div className="text-xl font-black text-slate-900 dark:text-white">
            ~{data.overview.totalHours} Hours
          </div>
          <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
            {data.overview.weekdayCommitment}
          </div>
        </div>

        <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 mb-1">
            <Target className="w-4 h-4" />
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Weekend Intensity
            </span>
          </div>
          <div className="text-xl font-black text-slate-900 dark:text-white">
            {data.overview.weekendCommitment}
          </div>
          <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
            Deep mock autopsy & marathon drills
          </div>
        </div>

        <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 mb-1">
            <Award className="w-4 h-4" />
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Mock Target
            </span>
          </div>
          <div className="text-xl font-black text-slate-900 dark:text-white">
            {data.overview.targetMockCount}
          </div>
          <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
            With 1:2 test-to-analysis ratio
          </div>
        </div>

        <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center gap-2 text-rose-600 dark:text-rose-400 mb-1">
            <BookOpen className="w-4 h-4" />
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Three-Track Rule
            </span>
          </div>
          <div className="text-sm font-bold text-slate-900 dark:text-white mt-1">
            Parallel Section Mastery
          </div>
          <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
            Never finish QA before touching DILR
          </div>
        </div>
      </div>

      {/* Core Philosophy Banner */}
      <div className="p-4 rounded-xl bg-indigo-50/80 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800 text-xs sm:text-sm text-indigo-950 dark:text-indigo-200 flex items-start gap-3">
        <span className="text-base">💡</span>
        <div>
          <strong className="font-bold">90-Day Golden Rule: </strong>
          <span>{data.overview.corePhilosophy}</span>
        </div>
      </div>

      {/* Month / Phase Selector Tabs */}
      <div className="flex gap-2 border-b border-slate-200 dark:border-slate-800 pb-2 overflow-x-auto">
        {data.phases.map((phase, idx) => {
          const isActive = activePhaseIndex === idx;
          const completedCount = phase.checkpoints.filter((c) => completedCheckpoints[c.id]).length;
          return (
            <button
              key={phase.phaseId}
              onClick={() => setActivePhaseIndex(idx)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all cursor-pointer whitespace-nowrap ${
                isActive
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20'
                  : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
              }`}
            >
              <span>{phase.month}</span>
              <span
                className={`px-1.5 py-0.5 rounded-full text-[10px] ${
                  isActive
                    ? 'bg-white/20 text-white'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                }`}
              >
                {completedCount}/{phase.checkpoints.length}
              </span>
            </button>
          );
        })}
      </div>

      {/* Active Phase Deep Dive */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
        <div>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                {currentPhase.month} • {currentPhase.weeklyTargetHours}h / week
              </span>
              <h2 className="text-xl font-black text-slate-900 dark:text-white">
                {currentPhase.name}
              </h2>
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 dark:bg-amber-950/50 border border-amber-200 dark:border-amber-800/80 text-amber-900 dark:text-amber-200 text-xs font-semibold">
              <Calendar className="w-3.5 h-3.5" />
              <span>{currentPhase.mockFrequency}</span>
            </div>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
            {currentPhase.goal}
          </p>
        </div>

        {/* 3 Sections Parallel Breakdown */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* QA Card */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 space-y-3">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
              <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-900 dark:text-white">
                QA Strategy
              </h3>
            </div>
            <div className="text-xs font-bold text-indigo-600 dark:text-indigo-400">
              {currentPhase.sections.qa.focus}
            </div>
            <ul className="text-xs space-y-1 text-slate-600 dark:text-slate-300 list-disc list-inside">
              {currentPhase.sections.qa.topics.map((t, i) => (
                <li key={i}>{t}</li>
              ))}
            </ul>
            <div className="pt-2 border-t border-slate-200 dark:border-slate-700/60 text-[11px] font-medium text-slate-500 dark:text-slate-400">
              ⚡ <strong>Daily Drill:</strong> {currentPhase.sections.qa.dailyVolume}
            </div>
          </div>

          {/* DILR Card */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 space-y-3">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-900 dark:text-white">
                DILR Strategy
              </h3>
            </div>
            <div className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
              {currentPhase.sections.dilr.focus}
            </div>
            <ul className="text-xs space-y-1 text-slate-600 dark:text-slate-300 list-disc list-inside">
              {currentPhase.sections.dilr.topics.map((t, i) => (
                <li key={i}>{t}</li>
              ))}
            </ul>
            <div className="pt-2 border-t border-slate-200 dark:border-slate-700/60 text-[11px] font-medium text-slate-500 dark:text-slate-400">
              🧩 <strong>Daily Drill:</strong> {currentPhase.sections.dilr.dailyVolume}
            </div>
          </div>

          {/* VARC Card */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 space-y-3">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-indigo-500" />
              <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-900 dark:text-white">
                VARC Strategy
              </h3>
            </div>
            <div className="text-xs font-bold text-purple-600 dark:text-purple-400">
              {currentPhase.sections.varc.focus}
            </div>
            <ul className="text-xs space-y-1 text-slate-600 dark:text-slate-300 list-disc list-inside">
              {currentPhase.sections.varc.topics.map((t, i) => (
                <li key={i}>{t}</li>
              ))}
            </ul>
            <div className="pt-2 border-t border-slate-200 dark:border-slate-700/60 text-[11px] font-medium text-slate-500 dark:text-slate-400">
              📖 <strong>Daily Drill:</strong> {currentPhase.sections.varc.dailyVolume}
            </div>
          </div>
        </div>

        {/* Actionable Checkpoints Checklist */}
        <SprintMilestoneChecklist
          title={`${currentPhase.month} High-Yield Milestones`}
          checkpoints={currentPhase.checkpoints}
          completedMap={completedCheckpoints}
          onToggleCheckpoint={onToggleCheckpoint}
        />
      </div>
    </div>
  );
};
