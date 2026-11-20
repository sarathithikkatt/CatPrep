import React from 'react';
import { Video } from 'lucide-react';
import { CuratedVideoItem } from './CuratedVideoItem';

/**
 * Expandable drawer displaying cheatsheet concepts, sub-module checklist, curated videos, and study hour logger.
 */
export const TopicDetailsDrawer = ({
  topic,
  progress,
  onUpdateTopicProgress
}) => {
  return (
    <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800/80 space-y-3 bg-slate-50/50 dark:bg-slate-800/20 p-4 rounded-xl">
      {/* Key Concepts Cheatsheet */}
      {topic.keyConcepts && (
        <div>
          <span className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
            💡 High-Yield Cheatsheet / Formula Concept:
          </span>
          <p className="text-xs text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-800 p-2.5 rounded-lg border border-slate-200 dark:border-slate-700 leading-relaxed font-mono">
            {topic.keyConcepts}
          </p>
        </div>
      )}

      {/* Subtopics Checklist */}
      {topic.subtopics && topic.subtopics.length > 0 && (
        <div>
          <span className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1.5">
            Sub-modules & Problem Types:
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
            {topic.subtopics.map((st, i) => (
              <div key={i} className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400">
                <div className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                <span>{st}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Curated Video Masterclasses from Top Mentors */}
      {topic.lectures && topic.lectures.length > 0 && (
        <div className="pt-1">
          <span className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-2 flex items-center gap-1.5">
            <Video className="w-3.5 h-3.5 text-red-500" />
            <span>Curated Video Masterclasses (Free on YouTube):</span>
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {topic.lectures.map((lec, lIdx) => (
              <CuratedVideoItem key={lIdx} lecture={lec} />
            ))}
          </div>
        </div>
      )}

      {/* Hour logger for topic */}
      <div className="flex items-center gap-3 pt-2 text-xs">
        <span className="text-slate-500 font-medium">Logged study effort:</span>
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => onUpdateTopicProgress(topic.id, { 
              hoursSpent: Math.max(0, (progress.hoursSpent || 0) + 1) 
            })}
            className="px-2 py-0.5 rounded bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-bold hover:bg-slate-100 dark:hover:bg-slate-700 transition cursor-pointer"
          >
            +1 Hour
          </button>
          <button
            onClick={() => onUpdateTopicProgress(topic.id, { 
              hoursSpent: Math.max(0, (progress.hoursSpent || 0) + 2) 
            })}
            className="px-2 py-0.5 rounded bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-bold hover:bg-slate-100 dark:hover:bg-slate-700 transition cursor-pointer"
          >
            +2 Hours
          </button>
        </div>
      </div>
    </div>
  );
};
