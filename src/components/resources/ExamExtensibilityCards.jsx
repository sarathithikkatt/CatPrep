import React from 'react';
import { Layers } from 'lucide-react';

/**
 * Information section displaying multi-exam extensibility (XAT, GMAT, GRE, GATE).
 */
export const ExamExtensibilityCards = () => {
  return (
    <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white rounded-2xl p-6 border border-slate-800 shadow-lg">
      <div className="flex items-center gap-2 mb-2">
        <Layers className="w-5 h-5 text-indigo-400" />
        <h2 className="text-base font-bold text-white">
          Extending to Future Competitive Examinations (XAT, GMAT, GRE, GATE)
        </h2>
      </div>
      <p className="text-xs text-slate-300 mb-4 max-w-2xl leading-relaxed">
        The system architecture has been engineered with modular schemas. Switching exams in the top
        navbar instantly loads the corresponding curriculum:
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
        <div className="p-4 rounded-xl bg-white/5 border border-white/10">
          <span className="font-bold text-amber-300 block mb-1">XAT (XLRI Jamshedpur)</span>
          <p className="text-slate-300 text-[11px] leading-relaxed">
            Shares 70% syllabus with CAT (QA, DI, Verbal). Adds the critical{' '}
            <strong>Decision Making (DM)</strong> section and General Knowledge.
          </p>
        </div>

        <div className="p-4 rounded-xl bg-white/5 border border-white/10">
          <span className="font-bold text-emerald-300 block mb-1">GMAT (Focus Edition)</span>
          <p className="text-slate-300 text-[11px] leading-relaxed">
            Shares Arithmetic & Algebra with CAT QA. Replaces Geometry with{' '}
            <strong>Data Insights (Multi-Source Reasoning & Data Sufficiency)</strong>.
          </p>
        </div>

        <div className="p-4 rounded-xl bg-white/5 border border-white/10">
          <span className="font-bold text-blue-300 block mb-1">GRE & GATE</span>
          <p className="text-slate-300 text-[11px] leading-relaxed">
            Easily plug in vocabulary-rich verbal or engineering math modules directly into{' '}
            <code>src/data/examsData.js</code>.
          </p>
        </div>
      </div>
    </div>
  );
};
