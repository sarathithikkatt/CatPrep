import React from 'react';
import { ChevronDown } from 'lucide-react';
import { EXAMS_CONFIG } from '../../data/examsData';

/**
 * Dropdown switcher for selecting the active target exam (CAT, XAT, GMAT, etc.).
 */
export const ExamSelector = ({ activeExamId, onSelectExam }) => {
  return (
    <div className="relative group">
      <label className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 block -mb-0.5">
        Active Target
      </label>
      <div className="relative inline-flex items-center">
        <select
          value={activeExamId}
          onChange={(e) => onSelectExam(e.target.value)}
          className="appearance-none pl-2.5 pr-8 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-100 font-bold text-sm cursor-pointer border border-transparent focus:border-indigo-500 focus:outline-none transition-all"
        >
          {EXAMS_CONFIG.map((exam) => (
            <option key={exam.id} value={exam.id}>
              {exam.name}
            </option>
          ))}
        </select>
        <ChevronDown className="w-4 h-4 text-slate-400 absolute right-2 pointer-events-none" />
      </div>
    </div>
  );
};
