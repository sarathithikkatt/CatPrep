import React from 'react';
import { CheckCircle2, XCircle, RotateCcw } from 'lucide-react';

/**
 * Action footer for QuestionCard showing submit button, result score badge, and re-attempt button.
 */
export const QuestionActionFooter = ({
  isSubmitted,
  isCorrect,
  questionType,
  hasAnswer,
  onSubmit,
  onRetest
}) => {
  return (
    <div className="flex items-center justify-between pt-2">
      {!isSubmitted ? (
        <button
          onClick={onSubmit}
          disabled={!hasAnswer}
          className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white font-bold text-xs shadow-md shadow-indigo-500/20 transition cursor-pointer"
        >
          Submit & Evaluate
        </button>
      ) : (
        <div className="flex items-center gap-2.5 flex-wrap">
          {isCorrect ? (
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-3 py-1.5 rounded-xl border border-emerald-200 dark:border-emerald-800">
              <CheckCircle2 className="w-4 h-4" />
              <span>Correct (+3 Marks)</span>
            </div>
          ) : (
            <div className={`inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-xl border ${
              questionType === 'TITA'
                ? 'text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/40 border-amber-200 dark:border-amber-800'
                : 'text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/40 border-rose-200 dark:border-rose-800'
            }`}>
              <XCircle className="w-4 h-4" />
              <span>{questionType === 'TITA' ? 'Incorrect (0 Penalty — TITA Exempt)' : 'Incorrect (-1 Mark Penalty)'}</span>
            </div>
          )}

          <button
            onClick={onRetest}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold text-xs transition cursor-pointer"
            title="Clear previous attempt and re-test this question fresh"
          >
            <RotateCcw className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
            <span>Re-attempt Question</span>
          </button>
        </div>
      )}

      {/* Solution indicator */}
      {isSubmitted && (
        <div className="text-xs font-semibold text-slate-400">
          Solution revealed below 👇
        </div>
      )}
    </div>
  );
};
