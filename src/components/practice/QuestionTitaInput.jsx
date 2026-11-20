import React from 'react';

/**
 * TITA (Type In The Answer) input field for numerical question entries.
 */
export const QuestionTitaInput = ({
  currentAnswer = '',
  isSubmitted = false,
  onChangeAnswer
}) => {
  return (
    <div className="mb-6 space-y-2">
      <label className="text-xs font-bold text-slate-600 dark:text-slate-300 block">
        Numerical Answer (TITA):
      </label>
      <input
        type="text"
        placeholder="Type number or answer..."
        disabled={isSubmitted}
        value={currentAnswer}
        onChange={(e) => onChangeAnswer(e.target.value)}
        className="px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm font-bold text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
      />
    </div>
  );
};
