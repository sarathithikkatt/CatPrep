import React from 'react';
import { TopicRow } from './TopicRow';

/**
 * Module card grouping topics with module title, hours estimate, and topic list.
 */
export const ModuleCard = ({
  module,
  filteredTopics = [],
  modulePYQCount = 0,
  userData,
  topicQuestionCounts = {},
  expandedTopicId,
  onToggleExpandTopic,
  onUpdateTopicProgress,
  onPracticeTopic
}) => {
  if (filteredTopics.length === 0) return null;

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
      {/* Module Header */}
      <div className="px-6 py-4 bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
        <div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            {module.title}
          </h3>
          <span className="text-xs text-slate-400">
            Est. Study Effort: ~{module.estimatedHours} hours • {filteredTopics.length} Topics • {modulePYQCount} PYQs Available
          </span>
        </div>
      </div>

      {/* Topics Grid */}
      <div className="divide-y divide-slate-100 dark:divide-slate-800">
        {filteredTopics.map((topic) => {
          const progress = userData.topicProgress?.[topic.id] || {
            status: 'not_started',
            confidence: 1,
            hoursSpent: 0
          };
          const isExpanded = expandedTopicId === topic.id;
          const pyqCount = topicQuestionCounts[topic.id] || 0;

          return (
            <TopicRow
              key={topic.id}
              topic={topic}
              progress={progress}
              pyqCount={pyqCount}
              isExpanded={isExpanded}
              onToggleExpand={() => onToggleExpandTopic(isExpanded ? null : topic.id)}
              onUpdateTopicProgress={onUpdateTopicProgress}
              onPracticeTopic={onPracticeTopic}
            />
          );
        })}
      </div>
    </div>
  );
};
