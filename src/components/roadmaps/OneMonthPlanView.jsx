import React, { useState } from 'react';
import { Calendar, Clock, AlertTriangle, ShieldAlert, Zap, Compass } from 'lucide-react';
import { ONE_MONTH_PLAN_DATA } from './sprintPlansData';
import { SprintMilestoneChecklist } from './SprintMilestoneChecklist';

/**
 * 1-Month Lockdown Plan View:
 * 30-day intensive execution roadmap with slot biological rhythm alignment,
 * 5-minute DILR rule, ABC question triage, and confidence taper phase.
 */
export const OneMonthPlanView = ({ completedCheckpoints = {}, onToggleCheckpoint }) => {
  const [activeStageIndex, setActiveStageIndex] = useState(0);
  const data = ONE_MONTH_PLAN_DATA;
  const currentStage = data.stages[activeStageIndex];

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
            {data.overview.totalHours} Hours
          </div>
          <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
            {data.overview.dailyCommitment}
          </div>
        </div>

        <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 mb-1">
            <Zap className="w-4 h-4" />
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Mock Cadence
            </span>
          </div>
          <div className="text-xl font-black text-slate-900 dark:text-white">
            {data.overview.targetMockCount}
          </div>
          <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
            Strict slot timing simulation
          </div>
        </div>

        <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center gap-2 text-purple-600 dark:text-purple-400 mb-1">
            <Compass className="w-4 h-4" />
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              DILR 5-Min Rule
            </span>
          </div>
          <div className="text-sm font-bold text-slate-900 dark:text-white mt-1">
            Set Selection Discipline
          </div>
          <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
            Never solve set #1 without scanning
          </div>
        </div>

        <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 mb-1">
            <ShieldAlert className="w-4 h-4" />
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              The Golden Rule
            </span>
          </div>
          <div className="text-sm font-bold text-slate-900 dark:text-white mt-1">
            Zero New Chapters
          </div>
          <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
            Consolidate what you know
          </div>
        </div>
      </div>

      {/* Warning Box */}
      <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-xs sm:text-sm text-amber-950 dark:text-amber-200 flex items-start gap-3">
        <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
        <div>
          <strong className="font-bold">Final 30-Day Paradigm: </strong>
          <span>{data.overview.goldenRule}</span>
        </div>
      </div>

      {/* Stage Selector */}
      <div className="flex gap-2 border-b border-slate-200 dark:border-slate-800 pb-2 overflow-x-auto">
        {data.stages.map((stage, idx) => {
          const isActive = activeStageIndex === idx;
          const completedCount = stage.checkpoints.filter((c) => completedCheckpoints[c.id]).length;
          return (
            <button
              key={stage.stageId}
              onClick={() => setActiveStageIndex(idx)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all cursor-pointer whitespace-nowrap ${
                isActive
                  ? 'bg-rose-600 text-white shadow-md shadow-rose-500/20'
                  : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
              }`}
            >
              <span>{stage.period}</span>
              <span
                className={`px-1.5 py-0.5 rounded-full text-[10px] ${
                  isActive
                    ? 'bg-white/20 text-white'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                }`}
              >
                {completedCount}/{stage.checkpoints.length}
              </span>
            </button>
          );
        })}
      </div>

      {/* Stage Content */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400">
            {currentStage.period}
          </span>
          <h2 className="text-xl font-black text-slate-900 dark:text-white mt-0.5">
            {currentStage.name}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1">
            {currentStage.focus}
          </p>
        </div>

        {/* Key Actions List */}
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-3">
            🎯 Strategic Action Directives
          </h3>
          <ul className="space-y-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
            {currentStage.keyActions.map((action, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-rose-600 dark:text-rose-400 font-bold shrink-0">▸</span>
                <span>{action}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Daily Schedule Template (if available in this stage) */}
        {currentStage.dailyScheduleTemplate && (
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-3 flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
              <span>Recommended Daily Execution Template</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {currentStage.dailyScheduleTemplate.map((slot, i) => (
                <div
                  key={i}
                  className="p-3 rounded-lg bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700/80 text-xs"
                >
                  <div className="font-extrabold text-indigo-600 dark:text-indigo-400 mb-1">
                    {slot.time}
                  </div>
                  <div className="text-slate-700 dark:text-slate-300 leading-relaxed">
                    {slot.activity}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Interactive Checklist */}
        <SprintMilestoneChecklist
          title={`${currentStage.name} Checkpoints`}
          checkpoints={currentStage.checkpoints}
          completedMap={completedCheckpoints}
          onToggleCheckpoint={onToggleCheckpoint}
        />
      </div>
    </div>
  );
};
