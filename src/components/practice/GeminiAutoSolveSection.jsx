import React from 'react';
import { Sparkles, Loader2, Settings, AlertTriangle } from 'lucide-react';

/**
 * Trigger section for Gemini AI Vision OCR & 4-tier solution generation.
 */
export const GeminiAutoSolveSection = ({ isAiAnalyzing, aiError, onAutoSolve, onOpenSettings }) => {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <button
          type="button"
          disabled={isAiAnalyzing}
          onClick={onAutoSolve}
          className="px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 hover:from-indigo-700 hover:to-purple-700 text-white font-bold text-xs shadow-md shadow-indigo-500/20 flex items-center gap-2 transition cursor-pointer disabled:opacity-50"
        >
          {isAiAnalyzing ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Transcribing & Drafting 4-Tier Solution...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>✨ Auto-Solve with Gemini AI</span>
            </>
          )}
        </button>

        <button
          type="button"
          onClick={onOpenSettings}
          className="text-[11px] font-semibold text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400 flex items-center gap-1 cursor-pointer"
        >
          <Settings className="w-3.5 h-3.5" />
          <span>Configure Gemini API Key</span>
        </button>
      </div>

      {aiError && (
        <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-300 dark:border-rose-800 text-xs text-rose-700 dark:text-rose-300 flex items-start gap-2">
          <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold block">AI Processing Notice:</span>
            <span>{aiError}</span>
          </div>
        </div>
      )}
    </div>
  );
};
