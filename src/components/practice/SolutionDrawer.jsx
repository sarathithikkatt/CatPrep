import React from 'react';
import { BookOpen, Zap, HelpCircle, AlertTriangle } from 'lucide-react';
import { MathText } from '../MathText';

/**
 * 4-Tier Solution Drawer: Step-by-Step, Exam Pro Shortcut, Core Concept, and Trap Alerts.
 */
export const SolutionDrawer = ({
  solution,
  currentTab = 'step',
  onSelectTab
}) => {
  if (!solution) return null;

  return (
    <div className="border-t border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-900/60 p-6 rounded-b-2xl">
      <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-4 border-b border-slate-200 dark:border-slate-800">
        <button
          onClick={() => onSelectTab('step')}
          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
            currentTab === 'step'
              ? 'bg-indigo-600 text-white'
              : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100'
          }`}
        >
          <BookOpen className="w-3.5 h-3.5" />
          <span>Step-by-Step Solution</span>
        </button>

        <button
          onClick={() => onSelectTab('shortcut')}
          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
            currentTab === 'shortcut'
              ? 'bg-amber-500 text-white'
              : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100'
          }`}
        >
          <Zap className="w-3.5 h-3.5" />
          <span>Exam Pro Shortcut</span>
        </button>

        <button
          onClick={() => onSelectTab('concept')}
          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
            currentTab === 'concept'
              ? 'bg-blue-600 text-white'
              : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100'
          }`}
        >
          <HelpCircle className="w-3.5 h-3.5" />
          <span>Core Concept</span>
        </button>

        <button
          onClick={() => onSelectTab('traps')}
          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
            currentTab === 'traps'
              ? 'bg-rose-600 text-white'
              : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100'
          }`}
        >
          <AlertTriangle className="w-3.5 h-3.5" />
          <span>Trap Alerts</span>
        </button>
      </div>

      {/* Tab Contents */}
      <div className="bg-white dark:bg-slate-800/90 rounded-xl p-5 border border-slate-200 dark:border-slate-700/80 text-xs sm:text-sm text-slate-800 dark:text-slate-200 leading-relaxed font-sans">
        {currentTab === 'step' && (
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 block mb-2">
              Detailed Mathematical & Logical Derivation:
            </span>
            <MathText text={solution.stepByStep} />
          </div>
        )}

        {currentTab === 'shortcut' && (
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 block mb-2">
              ⚡ Exam-Hall Shortcut (Option Elimination & Fast Speed Technique):
            </span>
            <div className="bg-amber-50/60 dark:bg-amber-950/30 p-4 rounded-xl border border-amber-200 dark:border-amber-900/60">
              <MathText text={solution.shortcut} />
            </div>
          </div>
        )}

        {currentTab === 'concept' && (
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 block mb-2">
              Theoretical Foundation & Axiom:
            </span>
            <div className="p-3 bg-blue-50/50 dark:bg-blue-950/30 rounded-xl border border-blue-200 dark:border-blue-900/50">
              <MathText text={solution.coreConcept} />
            </div>
          </div>
        )}

        {currentTab === 'traps' && (
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400 block mb-2">
              ⚠️ Common Candidate Pitfalls & Distractor Analysis:
            </span>
            <div className="p-3 bg-rose-50/50 dark:bg-rose-950/30 rounded-xl border border-rose-200 dark:border-rose-900/50 text-rose-800 dark:text-rose-200">
              <MathText text={solution.pitfalls} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
