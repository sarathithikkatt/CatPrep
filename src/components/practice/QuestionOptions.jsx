import React from 'react';
import { MathText } from '../MathText';

/**
 * MCQ options component with selectable state, KaTeX rendering, and post-submission color highlighting.
 */
export const QuestionOptions = ({
  options = [],
  correctAnswer,
  currentAnswer,
  isSubmitted = false,
  onSelectOption
}) => {
  return (
    <div className="space-y-2.5 mb-6">
      {options.map((opt, optIdx) => {
        const isSelected = currentAnswer === optIdx || currentAnswer === optIdx.toString();
        const isOptionCorrect = optIdx === correctAnswer;

        let optionStyle =
          'border-slate-200 dark:border-slate-700/80 hover:border-indigo-300 dark:hover:border-indigo-700 bg-white dark:bg-slate-800/60';
        if (isSubmitted) {
          if (isOptionCorrect) {
            optionStyle =
              'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-200 font-bold';
          } else if (isSelected && !isOptionCorrect) {
            optionStyle =
              'border-rose-500 bg-rose-50 dark:bg-rose-950/40 text-rose-900 dark:text-rose-200';
          }
        } else if (isSelected) {
          optionStyle =
            'border-indigo-600 bg-indigo-50/50 dark:bg-indigo-950/40 text-indigo-900 dark:text-indigo-200 font-bold ring-2 ring-indigo-500/20';
        }

        return (
          <button
            key={optIdx}
            disabled={isSubmitted}
            onClick={() => onSelectOption(optIdx)}
            className={`w-full text-left p-3.5 rounded-xl border transition-all flex items-start gap-3 cursor-pointer ${optionStyle}`}
          >
            <span
              className={`w-5 h-5 rounded-full flex items-center justify-center text-xs shrink-0 font-bold ${
                isSelected
                  ? 'bg-indigo-600 text-white'
                  : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
              }`}
            >
              {String.fromCharCode(65 + optIdx)}
            </span>
            <div className="flex-1 text-xs sm:text-sm">
              <MathText text={opt} />
            </div>
          </button>
        );
      })}
    </div>
  );
};
