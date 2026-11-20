import React from 'react';

/**
 * Section selector pill bar with PYQ count badges.
 */
export const SectionTabs = ({
  sections = [],
  selectedSectionId,
  onSelectSection,
  sectionQuestionCounts = {}
}) => {
  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-100 dark:border-slate-800">
      {sections.map((sec) => {
        const isSelected = sec.id === selectedSectionId;
        const count = sectionQuestionCounts[sec.id] || 0;

        return (
          <button
            key={sec.id}
            onClick={() => onSelectSection(sec.id)}
            className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl font-bold text-xs transition-all cursor-pointer whitespace-nowrap ${
              isSelected
                ? `${sec.bgColor} ${sec.borderColor} ${sec.textColor} border-2 shadow-sm`
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 border border-transparent'
            }`}
          >
            <span>{sec.name}</span>
            <span className="px-1.5 py-0.5 rounded-full text-[10px] bg-black/10 dark:bg-white/10">
              {count} PYQs
            </span>
          </button>
        );
      })}
    </div>
  );
};
