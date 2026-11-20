import React from 'react';
import { Calendar, Trash2 } from 'lucide-react';
import { SectionScoreCard } from './SectionScoreCard';

/**
 * Report card for a single logged mock test.
 */
export const MockReportCard = ({ mock, onDeleteMock }) => {
  const sectionStyles = {
    varc: {
      bg: 'bg-purple-50/60 dark:bg-purple-950/30',
      border: 'border-purple-200 dark:border-purple-900/40',
      textTitle: 'text-purple-700 dark:text-purple-300',
      textScore: 'text-purple-900 dark:text-purple-200'
    },
    dilr: {
      bg: 'bg-emerald-50/60 dark:bg-emerald-950/30',
      border: 'border-emerald-200 dark:border-emerald-900/40',
      textTitle: 'text-emerald-700 dark:text-emerald-300',
      textScore: 'text-emerald-900 dark:text-emerald-200'
    },
    qa: {
      bg: 'bg-blue-50/60 dark:bg-blue-950/30',
      border: 'border-blue-200 dark:border-blue-900/40',
      textTitle: 'text-blue-700 dark:text-blue-300',
      textScore: 'text-blue-900 dark:text-blue-200'
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-4 hover:border-indigo-300 dark:hover:border-indigo-800 transition">
      {/* Card Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-black text-sm">
            {mock.totalScore}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-extrabold text-base text-slate-900 dark:text-white">
                {mock.name}
              </h3>
              <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                {mock.platform}
              </span>
            </div>
            <span className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
              <Calendar className="w-3.5 h-3.5" />
              {mock.date} • {mock.percentileEstimate}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right">
            <span className="text-xs text-slate-400 block">Overall Accuracy</span>
            <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400">
              {mock.accuracy}%
            </span>
          </div>
          <button
            onClick={() => onDeleteMock(mock.id)}
            title="Delete mock test"
            className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-lg transition cursor-pointer"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Section Breakdown Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <SectionScoreCard
          sectionKey="varc"
          sectionName="VARC"
          data={mock.sections.varc}
          styles={sectionStyles.varc}
        />
        <SectionScoreCard
          sectionKey="dilr"
          sectionName="DILR"
          data={mock.sections.dilr}
          styles={sectionStyles.dilr}
        />
        <SectionScoreCard
          sectionKey="qa"
          sectionName="QA"
          data={mock.sections.qa}
          styles={sectionStyles.qa}
        />
      </div>

      {/* Capability Gap Footnote */}
      <div className="flex items-center justify-between text-xs pt-1 px-1 text-slate-500">
        <span>
          Untimed Capability: <strong className="text-slate-800 dark:text-slate-200">{mock.totalCapability} Marks</strong>
        </span>
        <span className="font-semibold text-amber-600 dark:text-amber-400">
          Panic Delta: -{mock.panicDelta} Marks lost to time pressure
        </span>
      </div>
    </div>
  );
};
