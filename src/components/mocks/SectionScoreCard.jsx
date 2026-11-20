import React from 'react';

/**
 * Section result card showing sectional net marks, accuracy, correct and incorrect stats.
 */
export const SectionScoreCard = ({ sectionKey, sectionName, data, styles }) => {
  return (
    <div className={`p-3.5 rounded-xl border ${styles.bg} ${styles.border}`}>
      <div className="flex items-center justify-between mb-1">
        <span className={`text-xs font-bold ${styles.textTitle}`}>{sectionName} Section</span>
        <span className={`text-sm font-black ${styles.textScore}`}>{data.score} Marks</span>
      </div>
      <div className="text-[11px] text-slate-500 dark:text-slate-400">
        {data.correct} Correct • {data.incorrectMcq} Wrong (MCQ) • {data.attempted}/{data.total}{' '}
        Att.
      </div>
    </div>
  );
};
