import React from 'react';
import { Zap } from 'lucide-react';

/**
 * Feature explainer callout describing Gemini Vision OCR and 4-tier solution generation capabilities.
 */
export const FeatureExplainer = () => {
  return (
    <div className="p-3.5 rounded-2xl bg-indigo-50/70 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800/60 text-xs space-y-2">
      <div className="flex items-center gap-2 font-bold text-indigo-900 dark:text-indigo-200">
        <Zap className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
        <span>Why connect Gemini API?</span>
      </div>
      <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-[11px]">
        When you paste mock test screenshots (
        <kbd className="px-1 py-0.5 rounded bg-white dark:bg-slate-800 font-mono text-[10px] border border-slate-200 dark:border-slate-700">
          Ctrl+V
        </kbd>
        ), Gemini automatically transcribes formulas into KaTeX, identifies the syllabus topic, and
        drafts full 4-tier step-by-step and shortcut solutions.
      </p>
    </div>
  );
};
