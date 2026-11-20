import React from 'react';
import { CheckCircle2, XCircle } from 'lucide-react';
import { MathText } from '../MathText';

/**
 * Interactive inline re-test interface with hidden answers, evaluation, and feedback.
 */
export const InlineRetestArea = ({
  question,
  retestAnswer,
  retestResult,
  onSelectOption,
  onInputTita,
  onSubmitRetest,
  onCancelRetest,
  onRemoveMastered,
  onResetRetestSubmission
}) => {
  const qid = question.id;

  return (
    <div className="p-4 rounded-xl bg-indigo-50/60 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800/80 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-indigo-600 animate-pulse" />
          <span className="text-xs font-black text-indigo-900 dark:text-indigo-200 uppercase tracking-wider">
            Active Re-Test Mode — Answer & Solution Hidden
          </span>
        </div>
        <button
          onClick={onCancelRetest}
          className="text-xs font-bold text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 cursor-pointer"
        >
          Cancel Re-test
        </button>
      </div>

      {/* Options or Input */}
      {question.type === 'MCQ' ? (
        <div className="space-y-2">
          {question.options.map((opt, optIdx) => {
            const isSelected = retestAnswer === optIdx;
            return (
              <button
                key={optIdx}
                disabled={!!retestResult}
                onClick={() => onSelectOption(qid, optIdx)}
                className={`w-full text-left p-3 rounded-xl border text-xs sm:text-sm transition flex items-start gap-3 cursor-pointer ${
                  isSelected
                    ? 'border-indigo-600 bg-white dark:bg-slate-800 ring-2 ring-indigo-500/20 font-bold'
                    : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-slate-300 text-slate-700 dark:text-slate-200'
                }`}
              >
                <span className={`w-5 h-5 rounded-full flex items-center justify-center text-xs shrink-0 font-bold ${
                  isSelected ? 'bg-indigo-600 text-white' : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
                }`}>
                  {String.fromCharCode(65 + optIdx)}
                </span>
                <div className="flex-1">
                  <MathText text={opt} />
                </div>
              </button>
            );
          })}
        </div>
      ) : (
        <div>
          <label className="text-xs font-bold text-slate-600 dark:text-slate-300 block mb-1">
            Type Your TITA Numerical Answer:
          </label>
          <input
            type="text"
            disabled={!!retestResult}
            value={retestAnswer || ''}
            onChange={(e) => onInputTita(qid, e.target.value)}
            placeholder="e.g. 15 or 4.5"
            className="px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm font-bold text-slate-900 dark:text-white"
          />
        </div>
      )}

      {/* Action & Feedback */}
      {!retestResult ? (
        <div className="flex items-center gap-2 pt-2">
          <button
            onClick={() => onSubmitRetest(question)}
            disabled={retestAnswer === undefined || retestAnswer === ''}
            className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white font-bold text-xs shadow-sm transition cursor-pointer"
          >
            Submit Re-Test Attempt
          </button>
          <button
            onClick={onCancelRetest}
            className="px-3 py-2 rounded-xl text-xs font-semibold text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
          >
            Exit
          </button>
        </div>
      ) : (
        <div className="space-y-3 pt-2">
          {retestResult.isCorrect ? (
            <div className="p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800 flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-2 text-emerald-800 dark:text-emerald-200">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                <span className="text-xs font-bold">
                  🎉 Brilliant! You got it right on Re-test. Mastery confirmed!
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => onRemoveMastered(qid)}
                  className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs transition cursor-pointer"
                >
                  Mark Mastered & Remove
                </button>
                <button
                  onClick={onCancelRetest}
                  className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
                >
                  Keep in Notebook
                </button>
              </div>
            </div>
          ) : (
            <div className="p-3.5 rounded-xl bg-rose-50 dark:bg-rose-950/60 border border-rose-300 dark:border-rose-800 flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-2 text-rose-800 dark:text-rose-200">
                <XCircle className="w-5 h-5 text-rose-600 shrink-0" />
                <span className="text-xs font-bold">
                  Still incorrect on this re-test. Review the pro shortcut and core concept below.
                </span>
              </div>
              <button
                onClick={() => onResetRetestSubmission(qid)}
                className="px-3 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs shadow-xs transition cursor-pointer"
              >
                Try Again
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
