import React, { useState } from 'react';
import { 
  Target, 
  Clock, 
  CheckCircle2, 
  Flame, 
  TrendingUp, 
  AlertCircle, 
  BookOpen, 
  Plus, 
  ArrowRight,
  Settings,
  Sparkles,
  Calendar
} from 'lucide-react';
import { EXAMS_CONFIG } from '../data/examsData';

export const DashboardTracker = ({ 
  activeExamId, 
  userData, 
  onUpdateUserData, 
  onNavigateToTopic,
  onNavigateToPractice 
}) => {
  const [isEditingTarget, setIsEditingTarget] = useState(false);
  const [targetQsInput, setTargetQsInput] = useState(userData.dailyTarget?.questions || 25);
  const [targetMinsInput, setTargetMinsInput] = useState(userData.dailyTarget?.minutes || 120);

  const currentExam = EXAMS_CONFIG.find(e => e.id === activeExamId) || EXAMS_CONFIG[0];
  const today = new Date().toISOString().split('T')[0];
  const todayLog = userData.dailyLogs?.[today] || {
    questionsSolved: 0,
    correctCount: 0,
    incorrectCount: 0,
    minutesSpent: 0
  };

  const targetQs = userData.dailyTarget?.questions || 25;
  const targetMins = userData.dailyTarget?.minutes || 120;

  const qsRemaining = Math.max(0, targetQs - todayLog.questionsSolved);
  const minsRemaining = Math.max(0, targetMins - todayLog.minutesSpent);
  const qsPercent = Math.min(100, Math.round((todayLog.questionsSolved / targetQs) * 100));
  const minsPercent = Math.min(100, Math.round((todayLog.minutesSpent / targetMins) * 100));
  const todayAccuracy = todayLog.questionsSolved > 0 
    ? Math.round((todayLog.correctCount / todayLog.questionsSolved) * 100) 
    : 0;

  // Calculate Syllabus Metrics
  let totalTopics = 0;
  let masteredTopics = 0;
  let inProgressTopics = 0;
  let totalEstimatedHours = 0;
  let sectionProgressMap = {};

  currentExam.sections.forEach(sec => {
    let secTotal = 0;
    let secMastered = 0;
    sec.modules.forEach(mod => {
      totalEstimatedHours += (mod.estimatedHours || 0);
      mod.topics.forEach(top => {
        totalTopics += 1;
        secTotal += 1;
        const progress = userData.topicProgress?.[top.id];
        if (progress?.status === 'completed') {
          masteredTopics += 1;
          secMastered += 1;
        } else if (progress?.status === 'in_progress') {
          inProgressTopics += 1;
        }
      });
    });
    sectionProgressMap[sec.id] = {
      name: sec.shortName,
      total: secTotal,
      mastered: secMastered,
      percent: secTotal > 0 ? Math.round((secMastered / secTotal) * 100) : 0
    };
  });

  const overallSyllabusPercent = totalTopics > 0 
    ? Math.round((masteredTopics / totalTopics) * 100) 
    : 0;

  // Add study minutes handler
  const handleAddMinutes = (additionalMinutes) => {
    const updatedLogs = { ...userData.dailyLogs };
    const current = updatedLogs[today] || {
      questionsSolved: 0,
      correctCount: 0,
      incorrectCount: 0,
      minutesSpent: 0
    };

    updatedLogs[today] = {
      ...current,
      minutesSpent: (current.minutesSpent || 0) + additionalMinutes
    };

    onUpdateUserData({
      ...userData,
      dailyLogs: updatedLogs
    });
  };

  // Save custom daily target
  const handleSaveTarget = () => {
    onUpdateUserData({
      ...userData,
      dailyTarget: {
        questions: parseInt(targetQsInput, 10) || 25,
        minutes: parseInt(targetMinsInput, 10) || 120
      }
    });
    setIsEditingTarget(false);
  };

  // Remaining days estimate based on current daily pace
  const avgMinsPerDay = Math.max(60, todayLog.minutesSpent || 90);
  const totalRemainingHours = Math.round(totalEstimatedHours * (1 - overallSyllabusPercent / 100));
  const estimatedDaysToFinish = Math.max(1, Math.round((totalRemainingHours * 60) / avgMinsPerDay));

  return (
    <div className="space-y-6">
      {/* Welcome Banner & Exam Overview */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-indigo-900 via-indigo-800 to-slate-900 text-white p-6 sm:p-8 shadow-xl">
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm text-xs font-semibold text-indigo-200 mb-3 border border-white/10">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Targeting 99+ Percentile Benchmark</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white mb-2">
            {currentExam.name} Preparation Dashboard
          </h1>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed mb-4">
            {currentExam.tagline} • Exam Duration: {currentExam.durationMinutes} mins • Total Questions: {currentExam.totalQuestions} • Target Net Score: ~{currentExam.targetScore99ile}+
          </p>
          <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-slate-300">
            <div className="flex items-center gap-1.5 bg-black/20 px-3 py-1.5 rounded-lg border border-white/5">
              <Calendar className="w-4 h-4 text-indigo-400" />
              <span>Today: {new Date().toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })}</span>
            </div>
            <div className="flex items-center gap-1.5 bg-black/20 px-3 py-1.5 rounded-lg border border-white/5">
              <Flame className="w-4 h-4 text-orange-400" />
              <span>Streak: {userData.streak?.currentStreak || 1} consecutive days</span>
            </div>
          </div>
        </div>
        <div className="absolute -right-12 -bottom-12 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* Primary Metrics Grid: Today's Done vs Remaining */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Metric 1: Questions Solved Today */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Questions Today
            </span>
            <div className="p-2 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400">
              <Target className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline gap-2 mb-2">
            <span className="text-4xl font-extrabold text-slate-900 dark:text-white">
              {todayLog.questionsSolved}
            </span>
            <span className="text-slate-400 font-semibold text-lg">
              / {targetQs}
            </span>
          </div>
          <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2.5 mb-3 overflow-hidden">
            <div 
              className="bg-blue-600 h-2.5 rounded-full transition-all duration-500" 
              style={{ width: `${qsPercent}%` }}
            />
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className={qsRemaining === 0 ? "text-emerald-600 font-bold" : "text-slate-500"}>
              {qsRemaining === 0 ? "🎉 Daily Goal Achieved!" : `${qsRemaining} questions remaining`}
            </span>
            <span className="font-semibold text-slate-700 dark:text-slate-300">{qsPercent}% done</span>
          </div>
        </div>

        {/* Metric 2: Time Studied Today */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Time Invested Today
            </span>
            <div className="p-2 rounded-xl bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400">
              <Clock className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline gap-2 mb-2">
            <span className="text-4xl font-extrabold text-slate-900 dark:text-white">
              {todayLog.minutesSpent}
            </span>
            <span className="text-slate-400 font-semibold text-sm">
              mins ({Math.floor(todayLog.minutesSpent / 60)}h {todayLog.minutesSpent % 60}m)
            </span>
          </div>
          <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2.5 mb-3 overflow-hidden">
            <div 
              className="bg-purple-600 h-2.5 rounded-full transition-all duration-500" 
              style={{ width: `${minsPercent}%` }}
            />
          </div>
          <div className="flex items-center justify-between text-xs mb-3">
            <span className={minsRemaining === 0 ? "text-emerald-600 font-bold" : "text-slate-500"}>
              {minsRemaining === 0 ? "Target reached" : `${minsRemaining} mins remaining of ${targetMins}m goal`}
            </span>
            <span className="font-semibold text-slate-700 dark:text-slate-300">{minsPercent}%</span>
          </div>
          {/* Quick Add Minutes Buttons */}
          <div className="flex items-center gap-1.5 pt-2 border-t border-slate-100 dark:border-slate-800">
            <span className="text-[11px] text-slate-400 font-medium">Log Time:</span>
            <button
              onClick={() => handleAddMinutes(15)}
              className="px-2 py-1 rounded bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-semibold transition"
            >
              +15m
            </button>
            <button
              onClick={() => handleAddMinutes(30)}
              className="px-2 py-1 rounded bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-semibold transition"
            >
              +30m
            </button>
            <button
              onClick={() => handleAddMinutes(60)}
              className="px-2 py-1 rounded bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-semibold transition"
            >
              +1h
            </button>
          </div>
        </div>

        {/* Metric 3: Today's Accuracy & Quality */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Today's Accuracy
            </span>
            <div className="p-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400">
              <TrendingUp className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline gap-2 mb-2">
            <span className="text-4xl font-extrabold text-slate-900 dark:text-white">
              {todayAccuracy}%
            </span>
            <span className="text-xs font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300">
              Target: 80%+
            </span>
          </div>
          <div className="text-xs text-slate-500 mb-4">
            <span className="text-emerald-600 dark:text-emerald-400 font-bold">{todayLog.correctCount || 0} Correct</span>
            {' • '}
            <span className="text-rose-500 font-bold">{todayLog.incorrectCount || 0} Wrong</span>
          </div>
          <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
            <span className="text-slate-400">Customize Daily Target</span>
            <button
              onClick={() => setIsEditingTarget(!isEditingTarget)}
              className="inline-flex items-center gap-1 text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 font-semibold cursor-pointer"
            >
              <Settings className="w-3.5 h-3.5" />
              <span>{isEditingTarget ? 'Close' : 'Adjust Target'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Target Customizer Form (Toggleable) */}
      {isEditingTarget && (
        <div className="p-5 bg-indigo-50 dark:bg-indigo-950/30 rounded-2xl border border-indigo-200 dark:border-indigo-900/60 flex flex-wrap items-center gap-4">
          <div className="flex-1 min-w-[200px]">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
              Target Questions / Day:
            </label>
            <input 
              type="number"
              min="5"
              max="150"
              value={targetQsInput}
              onChange={(e) => setTargetQsInput(e.target.value)}
              className="w-full px-3 py-1.5 rounded-lg border border-indigo-300 dark:border-indigo-700 bg-white dark:bg-slate-900 text-sm font-semibold"
            />
          </div>
          <div className="flex-1 min-w-[200px]">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
              Target Study Minutes / Day:
            </label>
            <input 
              type="number"
              min="15"
              max="600"
              value={targetMinsInput}
              onChange={(e) => setTargetMinsInput(e.target.value)}
              className="w-full px-3 py-1.5 rounded-lg border border-indigo-300 dark:border-indigo-700 bg-white dark:bg-slate-900 text-sm font-semibold"
            />
          </div>
          <div className="pt-5">
            <button
              onClick={handleSaveTarget}
              className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-sm"
            >
              Save New Targets
            </button>
          </div>
        </div>
      )}

      {/* Middle Row: Overall Syllabus Burndown & Section-Wise Health */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Overall Syllabus Completion */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                Syllabus Burndown & Progress
              </h2>
              <p className="text-xs text-slate-400">
                Tracking syllabus coverage across all {currentExam.sections.length} sections
              </p>
            </div>
            <div className="text-right">
              <span className="text-2xl font-black text-indigo-600 dark:text-indigo-400">
                {overallSyllabusPercent}%
              </span>
              <span className="text-xs text-slate-400 block">Overall Done</span>
            </div>
          </div>

          {/* Master Progress Bar */}
          <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-3 mb-5 overflow-hidden">
            <div 
              className="bg-gradient-to-r from-indigo-500 to-blue-500 h-3 rounded-full transition-all duration-500" 
              style={{ width: `${overallSyllabusPercent}%` }}
            />
          </div>

          {/* Topics Breakdown Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 text-center">
              <span className="text-xl font-bold text-slate-800 dark:text-slate-100 block">
                {totalTopics}
              </span>
              <span className="text-[11px] font-medium text-slate-400">Total Topics</span>
            </div>
            <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-100 dark:border-emerald-900/40 text-center">
              <span className="text-xl font-bold text-emerald-600 dark:text-emerald-400 block">
                {masteredTopics}
              </span>
              <span className="text-[11px] font-medium text-emerald-600/80 dark:text-emerald-400/80">Mastered</span>
            </div>
            <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-100 dark:border-amber-900/40 text-center">
              <span className="text-xl font-bold text-amber-600 dark:text-amber-400 block">
                {inProgressTopics}
              </span>
              <span className="text-[11px] font-medium text-amber-600/80 dark:text-amber-400/80">In Progress</span>
            </div>
            <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-100 dark:border-blue-900/40 text-center">
              <span className="text-xl font-bold text-blue-600 dark:text-blue-400 block">
                {Math.max(0, totalTopics - masteredTopics - inProgressTopics)}
              </span>
              <span className="text-[11px] font-medium text-blue-600/80 dark:text-blue-400/80">Unstarted</span>
            </div>
          </div>

          {/* Section Progress Rows */}
          <div className="space-y-3">
            {Object.keys(sectionProgressMap).map((secKey) => {
              const sec = sectionProgressMap[secKey];
              return (
                <div key={secKey} className="flex items-center gap-4 text-xs">
                  <span className="w-16 font-bold text-slate-700 dark:text-slate-200">
                    {sec.name}
                  </span>
                  <div className="flex-1 bg-slate-100 dark:bg-slate-800 rounded-full h-2 overflow-hidden">
                    <div 
                      className="bg-indigo-500 h-2 rounded-full"
                      style={{ width: `${sec.percent}%` }}
                    />
                  </div>
                  <span className="w-12 text-right font-semibold text-slate-500">
                    {sec.percent}%
                  </span>
                  <span className="text-slate-400 hidden sm:inline">
                    ({sec.mastered}/{sec.total} topics)
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Velocity & Completion Forecast */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              <h2 className="text-base font-bold text-slate-900 dark:text-white">
                Completion Forecast
              </h2>
            </div>
            <p className="text-xs text-slate-400 mb-6 leading-relaxed">
              Based on your target hours (~{totalEstimatedHours}h curriculum) and current daily pace.
            </p>

            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
                <span className="text-xs text-slate-400 block mb-1">Estimated Hours Remaining</span>
                <span className="text-2xl font-black text-slate-800 dark:text-slate-100">
                  ~{totalRemainingHours} Hours
                </span>
              </div>

              <div className="p-4 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900/40">
                <span className="text-xs text-indigo-600 dark:text-indigo-400 font-semibold block mb-1">
                  Estimated Days to Complete Syllabus
                </span>
                <span className="text-2xl font-black text-indigo-700 dark:text-indigo-300">
                  ~{estimatedDaysToFinish} Days
                </span>
                <span className="text-[11px] text-slate-400 block mt-1">
                  At {Math.round(avgMinsPerDay / 60 * 10)/10} hrs/day average
                </span>
              </div>
            </div>
          </div>

          <div className="pt-6">
            <button
              onClick={() => onNavigateToPractice()}
              className="w-full py-2.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm shadow-indigo-500/20 transition-all cursor-pointer"
            >
              <span>Practice Today's PYQs</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
