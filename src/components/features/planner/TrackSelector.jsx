import React from 'react';
import { Clock, Calendar, Zap, Rocket, Flame, Layers } from 'lucide-react';

/**
 * TrackSelector: Segmented cards for switching between 3-Month, 1-Month, and 1-Week tracks,
 * plus a full-width responsive switcher for accessing the cyclical 7-day R-E-S-T weekly planner.
 */
export const TrackSelector = ({
  allTracks = [],
  activeTrackId,
  onSelectTrack,
  activeMode = 'tracks', // 'tracks' | 'rest'
  onSelectMode
}) => {
  const trackIcons = {
    '3-month': Zap,
    '1-month': Rocket,
    '1-week': Flame
  };

  return (
    <div className="space-y-4">
      {/* Mode Switcher: Multi-Track Horizons vs Weekly R-E-S-T */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-200 dark:border-slate-800">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white flex items-center gap-2">
            <span>Study Planner & Strategy Engine</span>
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Select your preparation runway horizon or execute via the 7-day R-E-S-T weekly
            framework.
          </p>
        </div>

        {/* View Mode Toggle (Full width on mobile, auto on desktop) */}
        <div className="inline-flex w-full sm:w-auto p-1 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700/80">
          <button
            type="button"
            onClick={() => onSelectMode('tracks')}
            className={`flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer whitespace-nowrap ${
              activeMode === 'tracks'
                ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Multi-Track Horizons</span>
          </button>

          <button
            type="button"
            onClick={() => onSelectMode('rest')}
            className={`flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer whitespace-nowrap ${
              activeMode === 'rest'
                ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>R-E-S-T Weekly</span>
          </button>
        </div>
      </div>

      {/* Track Selection Cards (Shown when mode === 'tracks') */}
      {activeMode === 'tracks' && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {allTracks.map((track) => {
            const isSelected = activeTrackId === track.id;
            const Icon = trackIcons[track.id] || Zap;

            return (
              <button
                key={track.id}
                type="button"
                onClick={() => onSelectTrack(track.id)}
                className={`p-4 rounded-2xl border text-left transition-all cursor-pointer relative overflow-hidden ${
                  isSelected
                    ? 'bg-indigo-50/80 dark:bg-indigo-950/50 border-indigo-300 dark:border-indigo-800 ring-2 ring-indigo-500/20 shadow-sm'
                    : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2.5">
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                        isSelected
                          ? 'bg-indigo-600 text-white shadow-xs shadow-indigo-500/30'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-500'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-sm font-black text-slate-900 dark:text-white">
                        {track.title}
                      </div>
                      <div className="text-[11px] font-bold text-slate-400">
                        {track.durationBadge}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-500 dark:text-slate-400">
                  <Clock className="w-3 h-3 text-indigo-500 shrink-0" />
                  <span>{track.dailyHours}</span>
                </div>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};
