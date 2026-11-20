import React from 'react';
import { MathText } from '../MathText';
import { NotebookQuestionHeader } from './NotebookQuestionHeader';
import { InlineRetestArea } from './InlineRetestArea';
import { NotebookSolutionViewer } from './NotebookSolutionViewer';
import { MistakeReflectionNotes } from './MistakeReflectionNotes';

/**
 * Notebook card for an individual flagged or incorrect question.
 */
export const NotebookQuestionCard = ({
  question,
  meta,
  isEditingNotes,
  tempNotes,
  setTempNotes,
  isRetesting,
  retestAnswer,
  retestResult,
  savedRetest,
  currentSolutionTab = 'step',
  onUpdateReason,
  onStartRetest,
  onCancelRetest,
  onRetestInPractice,
  onRemove,
  onSelectRetestOption,
  onInputRetestTita,
  onSubmitRetest,
  onResetRetestSubmission,
  onSelectSolutionTab,
  onStartEditingNotes,
  onCancelEditingNotes,
  onSaveNotes
}) => {
  const qid = question.id;

  return (
    <div
      className={`bg-white dark:bg-slate-900 rounded-2xl border transition-all shadow-sm p-6 space-y-4 ${
        isRetesting
          ? 'border-indigo-400 ring-2 ring-indigo-500/20 shadow-md'
          : savedRetest?.isCorrect
            ? 'border-emerald-300 dark:border-emerald-800/60'
            : 'border-slate-200 dark:border-slate-800'
      }`}
    >
      {/* Header */}
      <NotebookQuestionHeader
        question={question}
        reason={meta.reason}
        savedRetest={savedRetest}
        isRetesting={isRetesting}
        onUpdateReason={onUpdateReason}
        onStartRetest={onStartRetest}
        onRetestInPractice={onRetestInPractice}
        onRemove={onRemove}
      />

      {/* Question Statement */}
      <div className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 font-medium leading-relaxed">
        <MathText text={question.question} />
      </div>

      {/* ACTIVE RE-TEST MODE */}
      {isRetesting && (
        <InlineRetestArea
          question={question}
          retestAnswer={retestAnswer}
          retestResult={retestResult}
          onSelectOption={onSelectRetestOption}
          onInputTita={onInputRetestTita}
          onSubmitRetest={onSubmitRetest}
          onCancelRetest={onCancelRetest}
          onRemoveMastered={onRemove}
          onResetRetestSubmission={onResetRetestSubmission}
        />
      )}

      {/* Normal Mode: Pro Shortcut Reminder */}
      {!isRetesting && question.solution?.shortcut && (
        <div className="p-3 bg-amber-50/60 dark:bg-amber-950/30 rounded-xl border border-amber-200 dark:border-amber-900/60 text-xs">
          <span className="font-bold text-amber-800 dark:text-amber-300 block mb-1">
            💡 Pro Shortcut to Remember:
          </span>
          <MathText text={question.solution.shortcut} />
        </div>
      )}

      {/* Solution Drawer (shown when re-test is submitted or requested) */}
      {retestResult && question.solution && (
        <NotebookSolutionViewer
          solution={question.solution}
          currentTab={currentSolutionTab}
          onSelectTab={(tab) => onSelectSolutionTab(qid, tab)}
        />
      )}

      {/* Personal Notes / Reflection Area */}
      <MistakeReflectionNotes
        notes={meta.notes}
        isEditing={isEditingNotes}
        tempNotes={tempNotes}
        setTempNotes={setTempNotes}
        onStartEditing={() => onStartEditingNotes(qid, meta.notes || '')}
        onCancelEditing={onCancelEditingNotes}
        onSaveNotes={() => onSaveNotes(qid)}
      />
    </div>
  );
};
