import React from 'react';
import { PILLARS_CONFIG } from './plannerConstants';

/**
 * 4 interactive cards representing the R-E-S-T pillars (Revise, Enhance, Strategize, Test).
 */
export const PillarFilterCards = ({ pillarFilter, onSelectPillar }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
      {PILLARS_CONFIG.map((pillar) => {
        const isActive = pillarFilter === pillar.id;

        return (
          <div
            key={pillar.id}
            onClick={() => onSelectPillar(isActive ? 'all' : pillar.id)}
            className={`p-4 rounded-xl border transition cursor-pointer shadow-xs ${
              isActive
                ? pillar.activeStyles
                : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-indigo-300'
            }`}
          >
            <div className="flex items-center gap-2 mb-1">
              <span className={`w-6 h-6 rounded-lg ${pillar.colorBg} text-white font-black text-xs flex items-center justify-center`}>
                {pillar.letter}
              </span>
              <span className="font-extrabold text-sm text-slate-900 dark:text-white">
                {pillar.name}
              </span>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-tight">
              {pillar.description}
            </p>
          </div>
        );
      })}
    </div>
  );
};
