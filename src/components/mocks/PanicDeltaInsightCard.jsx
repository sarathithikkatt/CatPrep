import React from 'react';
import { Sparkles } from 'lucide-react';

/**
 * Diagnostic insight callout explaining the Panic Delta methodology.
 */
export const PanicDeltaInsightCard = () => {
  return (
    <div className="bg-gradient-to-r from-indigo-900 via-indigo-950 to-slate-900 text-white p-5 rounded-2xl border border-indigo-800 shadow-sm">
      <div className="flex items-start gap-3">
        <div className="p-2 rounded-xl bg-amber-400/20 text-amber-300 shrink-0 mt-0.5">
          <Sparkles className="w-4 h-4" />
        </div>
        <div className="text-xs space-y-1">
          <span className="font-bold text-amber-300 block">
            The 99th Percentile "Panic Delta" Diagnostic (from CAT Knowledge Vault):
          </span>
          <p className="text-slate-300 leading-relaxed">
            After finishing a timed mock test, solve the unattempted questions in an <strong>untimed "Capability" session</strong>. The difference between your Capability Score and your Timed Score is your <strong>Panic Delta</strong>. A high delta means your knowledge is sound, but question selection or speed panic is reducing your score!
          </p>
        </div>
      </div>
    </div>
  );
};
