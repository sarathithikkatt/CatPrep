import React from 'react';
import { CheckCircle2, AlertTriangle, RotateCcw, PlayCircle, Trash2 } from 'lucide-react';
import { MISTAKE_REASONS } from './notebookConstants';

/**
 * Top metadata bar of a question in the mistake notebook.
 */
export const NotebookQuestionHeader = ({
  question,
  reason,
  savedRetest,
  isRetesting,
  onUpdateReason,
  onStartRetest,
  onRetestInPractice,
  onRemove
}) => {
  return (
    <div className="flex items-center justify-between flex-wrap gap-2">
      <div className="flex items-center gap-2 flex-wrap">
        <span className="text-xs font-bold px-2.5 py-0.5 rounded-md bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
          CAT {question.year} • {question.slot}
        </span>
        <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
          {question.topicName}
        </span>
        <span className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-amber-50 dark:bg-amber-950/50 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
          {question.difficulty}
        </span>

        {/* Retest status indicator */}
        {savedRetest?.isCorrect ? (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-md bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
            <CheckCircle2 className="w-3 h-3" />
            <span>Re-test Mastered ({savedRetest.count}x)</span>
          </span>
        ) : savedRetest?.count ? (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-md bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-800">
            <AlertTriangle className="w-3 h-3" />
            <span>Re-test Due ({savedRetest.count} attempt)</span>
          </span>
        ) : null}
      </div>

      <div className="flex items-center gap-2">
        {/* Cause Tag Selector */}
        <select
          value={reason || 'General Review'}
          onChange={(e) => onUpdateReason(question.id, e.target.value)}
          className="text-xs font-semibold px-2.5 py-1 rounded-lg border border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 cursor-pointer"
        >
          <option value="General Review">📌 General Review</option>
          {MISTAKE_REASONS.map((r) => (
            <option key={r.id} value={r.label}>
              {r.label}
            </option>
          ))}
        </select>

        {/* Re-test button (when not active) */}
        {!isRetesting && (
          <button
            onClick={() => onStartRetest(question.id)}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-xs transition cursor-pointer"
            title="Re-test this question with answers hidden"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Re-test</span>
          </button>
        )}

        {/* Jump to practice tab */}
        {onRetestInPractice && (
          <button
            onClick={() => onRetestInPractice(question.id)}
            className="p-1.5 rounded-lg text-slate-500 hover:text-indigo-600 hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer"
            title="Open in Practice Workspace"
          >
            <PlayCircle className="w-4 h-4 text-indigo-500" />
          </button>
        )}

        {/* Remove button */}
        <button
          onClick={() => onRemove(question.id)}
          title="Mark as Mastered and Remove"
          className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition cursor-pointer"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
