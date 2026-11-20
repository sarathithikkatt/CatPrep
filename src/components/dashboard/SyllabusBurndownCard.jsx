import React from 'react';
import { ProgressBar } from '../common/ProgressBar';
import { TopicsStatsGrid } from './TopicsStatsGrid';
import { SectionProgressRow } from './SectionProgressRow';

/**
 * Syllabus burndown card showing overall curriculum completion, topic metrics, and section rows.
 */
export const SyllabusBurndownCard = ({
  sectionsCount = 3,
  overallSyllabusPercent = 0,
  totalTopics = 0,
  masteredTopics = 0,
  inProgressTopics = 0,
  sectionProgressMap = {}
}) => {
  return (
    <div className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">
            Syllabus Burndown & Progress
          </h2>
          <p className="text-xs text-slate-400">
            Tracking syllabus coverage across all {sectionsCount} sections
          </p>
        </div>
        <div className="text-right">
          <span className="text-2xl font-black text-indigo-600 dark:text-indigo-400">
            {overallSyllabusPercent}%
          </span>
          <span className="text-xs text-slate-400 block">Overall Done</span>
        </div>
      </div>

      {/* Master Progress Bar */}
      <ProgressBar
        percent={overallSyllabusPercent}
        height="h-3"
        color="bg-gradient-to-r from-indigo-500 to-blue-500"
        className="mb-5"
      />

      {/* Topics Breakdown Stats */}
      <TopicsStatsGrid
        totalTopics={totalTopics}
        masteredTopics={masteredTopics}
        inProgressTopics={inProgressTopics}
      />

      {/* Section Progress Rows */}
      <div className="space-y-3">
        {Object.keys(sectionProgressMap).map((secKey) => {
          const sec = sectionProgressMap[secKey];
          return (
            <SectionProgressRow
              key={secKey}
              name={sec.name}
              percent={sec.percent}
              mastered={sec.mastered}
              total={sec.total}
            />
          );
        })}
      </div>
    </div>
  );
};
