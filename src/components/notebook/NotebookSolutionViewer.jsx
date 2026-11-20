import React from 'react';
import { BookOpen, Zap, HelpCircle } from 'lucide-react';
import { MathText } from '../MathText';

/**
 * Tabbed solution viewer for the mistake notebook, showing Step-by-Step, Shortcut, and Core Concept.
 */
export const NotebookSolutionViewer = ({
  solution,
  currentTab = 'step',
  onSelectTab
}) => {
  if (!solution) return null;

  return (
    <div className="border border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-900/60 p-4 rounded-xl space-y-3">
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-200 dark:border-slate-800">
        <button
          onClick={() => onSelectTab('step')}
          className={`px-2.5 py-1 rounded-lg text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
            currentTab === 'step'
              ? 'bg-indigo-600 text-white'
              : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300'
          }`}
        >
          <BookOpen className="w-3 h-3" />
          <span>Step-by-Step</span>
        </button>
        <button
          onClick={() => onSelectTab('shortcut')}
          className={`px-2.5 py-1 rounded-lg text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
            currentTab === 'shortcut'
              ? 'bg-amber-500 text-white'
              : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300'
          }`}
        >
          <Zap className="w-3 h-3" />
          <span>Pro Shortcut</span>
        </button>
        <button
          onClick={() => onSelectTab('concept')}
          className={`px-2.5 py-1 rounded-lg text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
            currentTab === 'concept'
              ? 'bg-purple-600 text-white'
              : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300'
          }`}
        >
          <HelpCircle className="w-3 h-3" />
          <span>Core Concept</span>
        </button>
      </div>

      <div className="text-xs text-slate-700 dark:text-slate-200 leading-relaxed font-mono">
        {currentTab === 'step' && <MathText text={solution.stepByStep} />}
        {currentTab === 'shortcut' && <MathText text={solution.shortcut} />}
        {currentTab === 'concept' && <MathText text={solution.coreConcept} />}
      </div>
    </div>
  );
};
