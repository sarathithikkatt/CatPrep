import React, { useState, useRef, useEffect } from 'react';
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
  Calendar,
  Cloud,
  LogOut,
  User,
  Check,
  AlertCircle,
  Loader2
} from 'lucide-react';
import { EXAMS_CONFIG } from '../data/examsData';
import { exportUserDataJSON } from '../utils/storage';
import { useAuth } from '../context/AuthContext';

const GoogleIcon = () => (
  <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24">
    <path
      fill="#4285F4"
      d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"
    />
    <path
      fill="#34A853"
      d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.36 24 12 24z"
    />
    <path
      fill="#FBBC05"
      d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
    />
    <path
      fill="#EA4335"
      d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.36 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
    />
  </svg>
);

export const Header = ({ 
  activeExamId, 
  onSelectExam, 
  activeTab, 
  setActiveTab, 
  userData, 
  onImportData, 
  onOpenSettings,
  onOpenFirebaseSetup
}) => {
  const { currentUser, authLoading, isConfigured, syncStatus, loginWithGoogle, logout } = useAuth();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isSigningIn, setIsSigningIn] = useState(false);
  const profileDropdownRef = useRef(null);

  const currentExam = EXAMS_CONFIG.find(e => e.id === activeExamId) || EXAMS_CONFIG[0];
  const today = new Date().toISOString().split('T')[0];
  const todayLog = userData.dailyLogs?.[today] || { questionsSolved: 0, minutesSpent: 0 };
  const targetQs = userData.dailyTarget?.questions || 25;
  const questionsProgressPercent = Math.min(100, Math.round((todayLog.questionsSolved / targetQs) * 100));

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileDropdownRef.current && !profileDropdownRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSignIn = async () => {
    setIsSigningIn(true);
    try {
      const res = await loginWithGoogle();
      if (res?.notConfigured) {
        if (onOpenFirebaseSetup) onOpenFirebaseSetup();
      } else if (!res?.success && res?.error) {
        alert(res.error);
      }
    } finally {
      setIsSigningIn(false);
    }
  };

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
          <div className="flex items-center gap-2 sm:gap-3">
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

            {/* Data Backup / Restore Buttons & AI Settings */}
            <div className="flex items-center gap-1">
              <button
                onClick={onOpenSettings}
                title="AI & Gemini OCR Settings"
                className="p-1.5 rounded-lg text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 dark:text-slate-400 dark:hover:text-indigo-400 dark:hover:bg-indigo-950/40 transition-colors cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-indigo-500" />
              </button>
              <button
                onClick={() => exportUserDataJSON(userData)}
                title="Backup progress as JSON"
                className="p-1.5 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-100 dark:text-slate-400 dark:hover:text-slate-200 dark:hover:bg-slate-800 transition-colors cursor-pointer"
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

            {/* Vertical separator */}
            <div className="h-5 w-px bg-slate-200 dark:bg-slate-700 mx-0.5 sm:mx-1" />

            {/* Google Authentication & User Profile */}
            {authLoading ? (
              <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                <Loader2 className="w-4 h-4 animate-spin text-slate-400" />
              </div>
            ) : currentUser ? (
              <div className="relative" ref={profileDropdownRef}>
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center gap-2 p-1 pl-1.5 pr-2 rounded-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-750 transition-all cursor-pointer shadow-sm"
                  title="Account and Cloud Sync"
                >
                  {currentUser.photoURL ? (
                    <img
                      src={currentUser.photoURL}
                      alt={currentUser.displayName || 'User'}
                      className="w-7 h-7 rounded-full object-cover ring-1 ring-indigo-500/30"
                    />
                  ) : (
                    <div className="w-7 h-7 rounded-full bg-indigo-600 text-white flex items-center justify-center text-xs font-bold">
                      {currentUser.displayName?.charAt(0) || currentUser.email?.charAt(0) || 'U'}
                    </div>
                  )}

                  <span className="hidden md:inline text-xs font-semibold text-slate-700 dark:text-slate-200 max-w-[100px] truncate">
                    {currentUser.displayName?.split(' ')[0] || 'User'}
                  </span>

                  {/* Cloud status icon */}
                  {syncStatus === 'saving' ? (
                    <Loader2 className="w-3.5 h-3.5 animate-spin text-indigo-500" title="Syncing to cloud..." />
                  ) : syncStatus === 'synced' ? (
                    <Cloud className="w-3.5 h-3.5 text-emerald-500" title="Synced to Firestore" />
                  ) : syncStatus === 'error' ? (
                    <AlertCircle className="w-3.5 h-3.5 text-rose-500" title="Sync error" />
                  ) : null}

                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                </button>

                {/* Profile Dropdown Menu */}
                {isProfileOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xl p-3 z-50 animate-fade-in text-sm">
                    {/* User Info */}
                    <div className="flex items-center gap-3 pb-3 border-b border-slate-100 dark:border-slate-800">
                      {currentUser.photoURL ? (
                        <img
                          src={currentUser.photoURL}
                          alt={currentUser.displayName || 'User'}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold">
                          {currentUser.displayName?.charAt(0) || 'U'}
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="font-bold text-slate-900 dark:text-slate-100 text-xs truncate">
                          {currentUser.displayName || 'AptiPrep Student'}
                        </p>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                          {currentUser.email}
                        </p>
                      </div>
                    </div>

                    {/* Sync Status Badge */}
                    <div className="my-2.5 px-2.5 py-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/50 flex items-center justify-between text-xs text-emerald-700 dark:text-emerald-300 font-medium">
                      <span className="flex items-center gap-1.5">
                        <Cloud className="w-3.5 h-3.5" />
                        Firestore Cloud Sync
                      </span>
                      <span className="text-[10px] uppercase font-bold bg-emerald-200/60 dark:bg-emerald-900/60 px-1.5 py-0.5 rounded">
                        Active
                      </span>
                    </div>

                    {/* Actions */}
                    <div className="space-y-1 pt-1">
                      <button
                        onClick={() => {
                          setIsProfileOpen(false);
                          exportUserDataJSON(userData);
                        }}
                        className="w-full flex items-center gap-2 px-2.5 py-2 text-xs text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
                      >
                        <Download className="w-3.5 h-3.5 text-slate-500" />
                        Export Backup JSON
                      </button>

                      <button
                        onClick={() => {
                          setIsProfileOpen(false);
                          logout();
                        }}
                        className="w-full flex items-center gap-2 px-2.5 py-2 text-xs text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-lg transition-colors cursor-pointer"
                      >
                        <LogOut className="w-3.5 h-3.5" />
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={handleSignIn}
                disabled={isSigningIn}
                className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-750 text-slate-700 dark:text-slate-200 text-xs font-semibold shadow-sm hover:shadow transition-all cursor-pointer"
                title={isConfigured ? 'Sign in with your Google account' : 'Configure Firebase for Google Sign-In'}
              >
                {isSigningIn ? (
                  <Loader2 className="w-4 h-4 animate-spin text-indigo-600" />
                ) : (
                  <GoogleIcon />
                )}
                <span className="hidden sm:inline">Sign in with Google</span>
                <span className="sm:hidden">Sign In</span>
              </button>
            )}
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex space-x-1 sm:space-x-4 overflow-x-auto py-2 scrollbar-none">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all whitespace-nowrap cursor-pointer ${
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
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all whitespace-nowrap cursor-pointer ${
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
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all whitespace-nowrap cursor-pointer ${
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
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all whitespace-nowrap cursor-pointer ${
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
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all whitespace-nowrap cursor-pointer ${
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
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all whitespace-nowrap cursor-pointer ${
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
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all whitespace-nowrap cursor-pointer ${
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
