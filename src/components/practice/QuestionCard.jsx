import React from 'react';
import { Bookmark } from 'lucide-react';
import { MathText } from '../MathText';
import { QuestionOptions } from './QuestionOptions';
import { QuestionTitaInput } from './QuestionTitaInput';
import { QuestionActionFooter } from './QuestionActionFooter';
import { SolutionDrawer } from './SolutionDrawer';

/**
 * QuestionCard component representing a full practice item with screenshot, KaTeX question text,
 * interactive MCQ/TITA, submission evaluation, and 4-tier solution drawer.
 */
export const QuestionCard = ({
  question,
  index,
  isSubmitted,
  isCorrect,
  currentAnswer,
  isBookmarked,
  currentSolutionTab = 'step',
  onSelectOption,
  onInputTita,
  onSubmitAnswer,
  onRetestQuestion,
  onToggleBookmark,
  onSelectSolutionTab
}) => {
  const qid = question.id;
  const examLabel = question.examId ? question.examId.toUpperCase() : 'CAT';
  const hasAnswer = currentAnswer !== undefined && currentAnswer !== '';

  return (
    <div
      className={`bg-white dark:bg-slate-900 rounded-2xl border transition-all shadow-sm ${
        isSubmitted
          ? isCorrect
            ? 'border-emerald-300 dark:border-emerald-800/80'
            : 'border-rose-300 dark:border-rose-800/80'
          : 'border-slate-200 dark:border-slate-800'
      }`}
    >
      {/* Question Header: Badges & Bookmark */}
      <div className="p-5 border-b border-slate-100 dark:border-slate-800/80 flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs font-black px-2.5 py-0.5 rounded-md bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900">
            Q{index + 1}
          </span>
          <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
            {examLabel} {question.year} • {question.slot}
          </span>
          <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
            {question.topicName}
          </span>
          <span className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-amber-50 dark:bg-amber-950/50 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
            {question.difficulty}
          </span>
          <span
            className={`text-[11px] font-bold px-2 py-0.5 rounded-md ${
              question.type === 'TITA'
                ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800'
                : 'text-slate-500 bg-slate-100 dark:bg-slate-800'
            }`}
          >
            {question.type === 'TITA'
              ? 'TITA (0 Negative Marks)'
              : question.options?.length === 5
                ? 'MCQ (+3 / -1) • 5 Options'
                : 'MCQ (+3 / -1)'}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onToggleBookmark(qid)}
            title={isBookmarked ? 'Remove from Mistake Notebook' : 'Save to Mistake Notebook'}
            className={`p-1.5 rounded-lg border transition cursor-pointer ${
              isBookmarked
                ? 'bg-amber-50 border-amber-300 text-amber-600 dark:bg-amber-950/40 dark:border-amber-800 dark:text-amber-400'
                : 'border-slate-200 dark:border-slate-700 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
            }`}
          >
            <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-amber-500' : ''}`} />
          </button>
        </div>
      </div>

      {/* Question Statement & Image */}
      <div className="p-6">
        {/* Screenshot thumbnail if present */}
        {(question.imageBase64 || question.imageUrl) && (
          <div className="mb-4 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700 max-w-xl">
            <img
              src={question.imageBase64 || question.imageUrl}
              alt="Question Screenshot"
              className="w-full h-auto object-contain bg-slate-50 dark:bg-slate-800 cursor-pointer hover:opacity-95 transition"
              onClick={() => window.open(question.imageBase64 || question.imageUrl, '_blank')}
            />
            <div className="p-1.5 bg-slate-100 dark:bg-slate-800 text-[10px] text-slate-500 text-center font-semibold">
              Screenshot attached • Click to view full image
            </div>
          </div>
        )}

        <div className="text-sm sm:text-base text-slate-800 dark:text-slate-100 font-medium leading-relaxed mb-6">
          <MathText text={question.question} />
        </div>

        {/* Options / Input */}
        {question.type === 'MCQ' ? (
          <QuestionOptions
            options={question.options}
            correctAnswer={question.correctAnswer}
            currentAnswer={currentAnswer}
            isSubmitted={isSubmitted}
            onSelectOption={(optIdx) => onSelectOption(qid, optIdx)}
          />
        ) : (
          <QuestionTitaInput
            currentAnswer={currentAnswer}
            isSubmitted={isSubmitted}
            onChangeAnswer={(val) => onInputTita(qid, val)}
          />
        )}

        {/* Action Buttons: Submit / Review */}
        <QuestionActionFooter
          isSubmitted={isSubmitted}
          isCorrect={isCorrect}
          questionType={question.type}
          hasAnswer={hasAnswer}
          onSubmit={() => onSubmitAnswer(question)}
          onRetest={() => onRetestQuestion(qid)}
        />
      </div>

      {/* 4-Tier Solution Drawer */}
      {isSubmitted && question.solution && (
        <SolutionDrawer
          solution={question.solution}
          currentTab={currentSolutionTab}
          onSelectTab={(tab) => onSelectSolutionTab(qid, tab)}
        />
      )}
    </div>
  );
};
