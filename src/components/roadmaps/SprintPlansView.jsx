import React, { useState, useMemo } from 'react';
import { Rocket, Clock, RotateCcw, CheckCheck, Flame, Globe, Zap } from 'lucide-react';
import { ProgressBar } from '../common/ProgressBar';
import { ThreeMonthPlanView } from './ThreeMonthPlanView';
import { OneMonthPlanView } from './OneMonthPlanView';
import { OneWeekPlanView } from './OneWeekPlanView';
import { InternetResourcesView } from './InternetResourcesView';
import { THREE_MONTH_PLAN_DATA, ONE_MONTH_PLAN_DATA, ONE_WEEK_PLAN_DATA } from './sprintPlansData';

/**
 * SprintPlansView Page:
 * Multi-horizon countdown roadmaps (3-Month, 1-Month, 1-Week) and curated internet resources.
 * Supports interactive milestone tracking saved to userData.sprintChecklist.
 */
export const SprintPlansView = ({ userData = {}, onUpdateUserData }) => {
  const [activePlanTab, setActivePlanTab] = useState('3m'); // '3m' | '1m' | '1w' | 'resources'

  const completedMap = userData.sprintChecklist || {};

  // Toggle checklist milestone
  const handleToggleCheckpoint = (checkpointId) => {
    const nextMap = {
      ...completedMap,
      [checkpointId]: !completedMap[checkpointId]
    };
    onUpdateUserData({
      ...userData,
      sprintChecklist: nextMap
    });
  };

  // Reset checklist for active plan
  const handleResetChecklist = () => {
    if (confirm('Reset your milestone progress for all sprint roadmaps?')) {
      onUpdateUserData({
        ...userData,
        sprintChecklist: {}
      });
    }
  };

  // Mark all active plan checkpoints as completed
  const handleMarkAllDone = () => {
    let idsToMark = [];
    if (activePlanTab === '3m') {
      idsToMark = THREE_MONTH_PLAN_DATA.phases.flatMap((p) => p.checkpoints.map((c) => c.id));
    } else if (activePlanTab === '1m') {
      idsToMark = ONE_MONTH_PLAN_DATA.stages.flatMap((s) => s.checkpoints.map((c) => c.id));
    } else if (activePlanTab === '1w') {
      idsToMark = ONE_WEEK_PLAN_DATA.days.flatMap((d) => d.checklist.map((c) => c.id));
    }

    const nextMap = { ...completedMap };
    idsToMark.forEach((id) => {
      nextMap[id] = true;
    });

    onUpdateUserData({
      ...userData,
      sprintChecklist: nextMap
    });
  };

  // Metrics for active plan
  const activeMetrics = useMemo(() => {
    let allCheckpoints = [];
    if (activePlanTab === '3m') {
      allCheckpoints = THREE_MONTH_PLAN_DATA.phases.flatMap((p) => p.checkpoints);
    } else if (activePlanTab === '1m') {
      allCheckpoints = ONE_MONTH_PLAN_DATA.stages.flatMap((s) => s.checkpoints);
    } else if (activePlanTab === '1w') {
      allCheckpoints = ONE_WEEK_PLAN_DATA.days.flatMap((d) => d.checklist);
    }

    const total = allCheckpoints.length;
    const completed = allCheckpoints.filter((c) => completedMap[c.id]).length;
    const percent = total > 0 ? Math.round((completed / total) * 100) : 0;
    return { total, completed, percent };
  }, [activePlanTab, completedMap]);

  // Exam Countdown calculation
  const daysUntilExam = useMemo(() => {
    const examDate = new Date('2026-11-29T08:30:00');
    const now = new Date();
    const diffMs = examDate - now;
    return Math.max(0, Math.floor(diffMs / (1000 * 60 * 60 * 24)));
  }, []);

  return (
    <div className="space-y-6">
      {/* Top Hero Banner */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Flame className="w-5 h-5 text-rose-600 dark:text-rose-400" />
              <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                CAT Sprint Roadmaps & Countdown Plans
              </h1>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-2xl">
              Research-backed high-yield blueprints designed for 3-Month, 1-Month, and 1-Week
              countdown horizons, synthesized from top percentilers at IMS, 2IIM, Cracku, and Rodha.
            </p>
          </div>

          {/* Quick Metrics & Actions */}
          <div className="flex items-center gap-2 flex-wrap">
            <div className="px-3.5 py-1.5 rounded-xl bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-800 text-amber-900 dark:text-amber-200 text-xs font-bold flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-amber-600 dark:text-amber-400" />
              <span>{daysUntilExam} Days to CAT</span>
            </div>

            {activePlanTab !== 'resources' && (
              <>
                <button
                  onClick={handleMarkAllDone}
                  title="Mark all checkpoints for this plan complete"
                  className="px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 font-semibold text-xs flex items-center gap-1 transition cursor-pointer"
                >
                  <CheckCheck className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Mark All Done</span>
                </button>

                <button
                  onClick={handleResetChecklist}
                  title="Reset milestone checklist"
                  className="px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 font-semibold text-xs flex items-center gap-1 transition cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5 text-slate-500" />
                  <span>Reset</span>
                </button>
              </>
            )}
          </div>
        </div>

        {/* Plan Switcher Pills */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-4 border-t border-slate-100 dark:border-slate-800/80">
          <button
            onClick={() => setActivePlanTab('3m')}
            className={`p-3 rounded-xl border text-left transition cursor-pointer ${
              activePlanTab === '3m'
                ? 'bg-indigo-50 dark:bg-indigo-950/50 border-indigo-300 dark:border-indigo-800 ring-2 ring-indigo-500/20'
                : 'bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-700/60 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <div className="flex items-center gap-1.5 font-bold text-xs sm:text-sm text-slate-900 dark:text-white mb-0.5">
              <Zap className="w-4 h-4 text-indigo-600 dark:text-indigo-400 shrink-0" />
              <span>3-Month Sprint</span>
            </div>
            <div className="text-[11px] text-slate-500 dark:text-slate-400">
              90 Days • 400 Hours
            </div>
          </button>

          <button
            onClick={() => setActivePlanTab('1m')}
            className={`p-3 rounded-xl border text-left transition cursor-pointer ${
              activePlanTab === '1m'
                ? 'bg-rose-50 dark:bg-rose-950/50 border-rose-300 dark:border-rose-800 ring-2 ring-rose-500/20'
                : 'bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-700/60 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <div className="flex items-center gap-1.5 font-bold text-xs sm:text-sm text-slate-900 dark:text-white mb-0.5">
              <Rocket className="w-4 h-4 text-rose-600 dark:text-rose-400 shrink-0" />
              <span>1-Month Lockdown</span>
            </div>
            <div className="text-[11px] text-slate-500 dark:text-slate-400">
              30 Days • Execution Peak
            </div>
          </button>

          <button
            onClick={() => setActivePlanTab('1w')}
            className={`p-3 rounded-xl border text-left transition cursor-pointer ${
              activePlanTab === '1w'
                ? 'bg-amber-50 dark:bg-amber-950/50 border-amber-300 dark:border-amber-800 ring-2 ring-amber-500/20'
                : 'bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-700/60 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <div className="flex items-center gap-1.5 font-bold text-xs sm:text-sm text-slate-900 dark:text-white mb-0.5">
              <Flame className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
              <span>1-Week Countdown</span>
            </div>
            <div className="text-[11px] text-slate-500 dark:text-slate-400">
              D-7 to D-Day Protocol
            </div>
          </button>

          <button
            onClick={() => setActivePlanTab('resources')}
            className={`p-3 rounded-xl border text-left transition cursor-pointer ${
              activePlanTab === 'resources'
                ? 'bg-cyan-50 dark:bg-cyan-950/50 border-cyan-300 dark:border-cyan-800 ring-2 ring-cyan-500/20'
                : 'bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-700/60 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <div className="flex items-center gap-1.5 font-bold text-xs sm:text-sm text-slate-900 dark:text-white mb-0.5">
              <Globe className="w-4 h-4 text-cyan-600 dark:text-cyan-400 shrink-0" />
              <span>Internet Resources</span>
            </div>
            <div className="text-[11px] text-slate-500 dark:text-slate-400">
              Free Portals & Playlists
            </div>
          </button>
        </div>

        {/* Milestone Completion Progress Bar (shown for 3m, 1m, 1w) */}
        {activePlanTab !== 'resources' && (
          <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80">
            <div className="flex items-center justify-between text-xs mb-1.5">
              <span className="font-bold text-slate-600 dark:text-slate-400">
                Milestone Completion: {activeMetrics.completed} of {activeMetrics.total} Checkpoints
              </span>
              <span className="font-extrabold text-indigo-600 dark:text-indigo-400">
                {activeMetrics.percent}%
              </span>
            </div>
            <ProgressBar percent={activeMetrics.percent} height="h-2" color="bg-indigo-600" />
          </div>
        )}
      </div>

      {/* Active Tab View */}
      {activePlanTab === '3m' && (
        <ThreeMonthPlanView
          completedCheckpoints={completedMap}
          onToggleCheckpoint={handleToggleCheckpoint}
        />
      )}

      {activePlanTab === '1m' && (
        <OneMonthPlanView
          completedCheckpoints={completedMap}
          onToggleCheckpoint={handleToggleCheckpoint}
        />
      )}

      {activePlanTab === '1w' && (
        <OneWeekPlanView
          completedCheckpoints={completedMap}
          onToggleCheckpoint={handleToggleCheckpoint}
        />
      )}

      {activePlanTab === 'resources' && <InternetResourcesView />}
    </div>
  );
};
