import React from 'react';
import { 
  BookOpen, 
  CheckCircle2, 
  Flame, 
  Target, 
  Bookmark, 
  Download, 
  Upload, 
  Sparkles,
  ChevronDown,
  Layers,
  HelpCircle,
  Clock,
  Award,
  Calendar
} from 'lucide-react';
import { EXAMS_CONFIG } from '../data/examsData';
import { exportUserDataJSON } from '../utils/storage';

export const Header = ({ 
  activeExamId, 
  onSelectExam, 
  activeTab, 
  setActiveTab, 
  userData, 
  onImportData 
}) => {
  const currentExam = EXAMS_CONFIG.find(e => e.id === activeExamId) || EXAMS_CONFIG[0];
  const today = new Date().toISOString().split('T')[0];
  const todayLog = userData.dailyLogs?.[today] || { questionsSolved: 0, minutesSpent: 0 };
  const targetQs = userData.dailyTarget?.questions || 25;
  const questionsProgressPercent = Math.min(100, Math.round((todayLog.questionsSolved / targetQs) * 100));

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target.result);
        onImportData(parsed);
        alert('Data successfully restored!');
      } catch (err) {
        alert('Invalid JSON backup file');
      }
    };
    reader.readAsText(file);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 shadow-sm transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Bar: Brand, Exam Selector, Quick Stats, Actions */}
        <div className="flex items-center justify-between h-16 border-b border-slate-100 dark:border-slate-800/60">
          {/* Logo & Exam Switcher */}
          <div className="flex items-center gap-3 sm:gap-6">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-blue-500 flex items-center justify-center text-white shadow-md shadow-indigo-500/20">
                <Target className="w-5 h-5" />
              </div>
              <div>
                <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-indigo-600 via-blue-600 to-indigo-800 bg-clip-text text-transparent">
                  AptiPrep
                </span>
                <span className="ml-1 text-xs font-semibold px-1.5 py-0.5 rounded bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300">
                  99%ile
                </span>
              </div>
            </div>

            {/* Multi-Exam Switcher Dropdown */}
            <div className="relative group">
              <label className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 block -mb-0.5">Active Target</label>
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
          </div>

          {/* Quick Metrics & Cloud/Local Actions */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Daily Target Pill */}
            <div className="hidden sm:flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/60">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <div className="text-xs">
                <span className="font-bold text-slate-700 dark:text-slate-200">
                  {todayLog.questionsSolved}
                </span>
                <span className="text-slate-400">/{targetQs} Qs Today</span>
              </div>
              <div className="w-16 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-indigo-600 rounded-full transition-all duration-500"
                  style={{ width: `${questionsProgressPercent}%` }}
                />
              </div>
            </div>

            {/* Streak Counter */}
            <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-orange-50 dark:bg-orange-950/40 border border-orange-200 dark:border-orange-900/50 text-orange-600 dark:text-orange-400 font-bold text-xs">
              <Flame className="w-4 h-4 fill-orange-500" />
              <span>{userData.streak?.currentStreak || 1}d Streak</span>
            </div>

            {/* Data Backup / Restore Buttons */}
            <div className="flex items-center gap-1">
              <button
                onClick={() => exportUserDataJSON(userData)}
                title="Backup progress as JSON"
                className="p-1.5 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-100 dark:text-slate-400 dark:hover:text-slate-200 dark:hover:bg-slate-800 transition-colors"
              >
                <Download className="w-4 h-4" />
              </button>
              <label 
                title="Restore progress from JSON"
                className="p-1.5 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-100 dark:text-slate-400 dark:hover:text-slate-200 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <Upload className="w-4 h-4" />
                <input type="file" accept=".json" onChange={handleFileUpload} className="hidden" />
              </label>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex space-x-1 sm:space-x-4 overflow-x-auto py-2 scrollbar-none">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
              activeTab === 'dashboard'
                ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-500/20'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <Target className="w-4 h-4" />
            <span>Daily Tracker</span>
          </button>

          <button
            onClick={() => setActiveTab('planner')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
              activeTab === 'planner'
                ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-500/20'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span>Study Planner</span>
            <span className="ml-0.5 px-1.5 py-0.2 rounded-full text-[10px] bg-indigo-200 dark:bg-indigo-900/60 text-indigo-900 dark:text-indigo-200">
              R-E-S-T
            </span>
          </button>

          <button
            onClick={() => setActiveTab('syllabus')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
              activeTab === 'syllabus'
                ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-500/20'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Syllabus & Weightage</span>
          </button>

          <button
            onClick={() => setActiveTab('practice')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
              activeTab === 'practice'
                ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-500/20'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>PYQs & Solutions</span>
            <span className="ml-1 px-1.5 py-0.2 rounded-full text-[10px] bg-indigo-200 dark:bg-indigo-900/60 text-indigo-900 dark:text-indigo-200">
              Pro Shortcuts
            </span>
          </button>

          <button
            onClick={() => setActiveTab('notebook')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
              activeTab === 'notebook'
                ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-500/20'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <Bookmark className="w-4 h-4" />
            <span>Mistake Notebook</span>
          </button>

          <button
            onClick={() => setActiveTab('mocks')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
              activeTab === 'mocks'
                ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-500/20'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <Award className="w-4 h-4" />
            <span>Mock Scorecards</span>
            <span className="ml-0.5 px-1.5 py-0.2 rounded-full text-[10px] bg-amber-200 dark:bg-amber-900/60 text-amber-900 dark:text-amber-200">
              Panic Delta
            </span>
          </button>

          <button
            onClick={() => setActiveTab('resources')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
              activeTab === 'resources'
                ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-500/20'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>Resources</span>
          </button>
        </div>
      </div>
    </header>
  );
};
