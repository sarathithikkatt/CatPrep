import React from 'react';
import { ChevronDown, ChevronRight, Star, Layers, Clock, ArrowRight } from 'lucide-react';
import { TopicDetailsDrawer } from './TopicDetailsDrawer';
import { getTopicStatusBadge } from './syllabusHelpers';

/**
 * Individual topic row in syllabus manager.
 */
export const TopicRow = ({
  topic,
  progress,
  pyqCount,
  isExpanded,
  onToggleExpand,
  onUpdateTopicProgress,
  onPracticeTopic
}) => {
  const badge = getTopicStatusBadge(progress.status);

  return (
    <div className="p-5 hover:bg-slate-50/60 dark:hover:bg-slate-800/40 transition-colors">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        {/* Title and metadata */}
        <div className="flex-1">
          <div className="flex items-center gap-2.5 mb-1.5 flex-wrap">
            <button
              onClick={onToggleExpand}
              className="font-bold text-sm text-slate-900 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400 flex items-center gap-1.5 text-left cursor-pointer"
            >
              <span>{topic.title}</span>
              {isExpanded ? (
                <ChevronDown className="w-4 h-4 text-slate-400" />
              ) : (
                <ChevronRight className="w-4 h-4 text-slate-400" />
              )}
            </button>

            {/* Weightage Badge */}
            <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-950/50 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
              {topic.weightage}
            </span>

            {/* Difficulty */}
            <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
              {topic.difficulty}
            </span>

            {/* Topic Question Count Badge */}
            <button
              onClick={() => onPracticeTopic(topic.id)}
              title={`Practice ${pyqCount} PYQ${pyqCount === 1 ? '' : 's'} on ${topic.title}`}
              className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-indigo-50 hover:bg-indigo-100 text-indigo-700 dark:bg-indigo-950/60 dark:hover:bg-indigo-900 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 transition cursor-pointer shadow-xs group"
            >
              <Layers className="w-3 h-3 text-indigo-600 dark:text-indigo-400 group-hover:scale-110 transition-transform" />
              <span>
                {pyqCount} PYQ{pyqCount === 1 ? '' : 's'}
              </span>
            </button>
          </div>

          <div className="flex items-center gap-3 text-xs text-slate-400">
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {progress.hoursSpent || 0} / {topic.hoursNeeded} hrs spent
            </span>
            <span>•</span>
            <span>{topic.subtopics?.length || 0} sub-concepts</span>
          </div>
        </div>

        {/* Status selector & Actions */}
        <div className="flex items-center gap-2.5 self-start sm:self-auto">
          {/* Confidence Rating (1-5 stars) */}
          <div className="flex items-center gap-0.5 mr-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onClick={() => onUpdateTopicProgress(topic.id, { confidence: star })}
                title={`Confidence: ${star}/5`}
                className="p-0.5 hover:scale-110 transition cursor-pointer"
              >
                <Star
                  className={`w-3.5 h-3.5 ${
                    star <= (progress.confidence || 1)
                      ? 'text-amber-400 fill-amber-400'
                      : 'text-slate-200 dark:text-slate-700'
                  }`}
                />
              </button>
            ))}
          </div>

          {/* Status Dropdown */}
          <select
            value={progress.status}
            onChange={(e) => onUpdateTopicProgress(topic.id, { status: e.target.value })}
            className={`text-xs font-bold px-2.5 py-1.5 rounded-xl border appearance-none cursor-pointer focus:outline-none transition ${badge.className}`}
          >
            <option value="not_started">⚪ Not Started</option>
            <option value="in_progress">🟡 In Progress</option>
            <option value="completed">🟢 Mastered</option>
            <option value="revision">🔴 Revision Due</option>
          </select>

          {/* Quick Practice Topic Button */}
          <button
            onClick={() => onPracticeTopic(topic.id)}
            title={`Practice ${pyqCount} PYQ${pyqCount === 1 ? '' : 's'} on this topic`}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-100 dark:hover:bg-indigo-900 border border-indigo-200 dark:border-indigo-800 text-xs font-bold transition shadow-xs cursor-pointer"
          >
            <span>Practice</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Expandable Topic Details */}
      {isExpanded && (
        <TopicDetailsDrawer
          topic={topic}
          progress={progress}
          onUpdateTopicProgress={onUpdateTopicProgress}
        />
      )}
    </div>
  );
};
