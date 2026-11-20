import React, { useMemo } from 'react';
import { Sparkles, Calendar, Flame } from 'lucide-react';

/**
 * Hero welcome banner with active exam metadata, streak indicator, and countdown timer.
 */
export const ExamHeroBanner = ({ currentExam, streakCount = 1 }) => {
  // Memoized exam countdown and formatted date
  const { daysUntilExam, hoursUntilExam, formattedToday } = useMemo(() => {
    const catExamDate = new Date('2026-11-29T08:30:00');
    const now = new Date();
    const diffMs = catExamDate - now;
    const days = Math.max(0, Math.floor(diffMs / (1000 * 60 * 60 * 24)));
    const hours = Math.max(0, Math.floor((diffMs / (1000 * 60 * 60)) % 24));
    const today = now.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
    return { daysUntilExam: days, hoursUntilExam: hours, formattedToday: today };
  }, []);

  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-indigo-900 via-indigo-800 to-slate-900 text-white p-6 sm:p-8 shadow-xl">
      <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="max-w-2xl">
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
              <span>Today: {formattedToday}</span>
            </div>
            <div className="flex items-center gap-1.5 bg-black/20 px-3 py-1.5 rounded-lg border border-white/5">
              <Flame className="w-4 h-4 text-orange-400" />
              <span>Streak: {streakCount} consecutive days</span>
            </div>
          </div>
        </div>

        {/* Exam Countdown Card */}
        <div className="shrink-0 p-5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 text-center min-w-[200px] shadow-lg">
          <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-200 block mb-1">
            Countdown to CAT 2026
          </span>
          <div className="flex items-baseline justify-center gap-1 mb-1">
            <span className="text-4xl font-black text-amber-300 tracking-tight">
              {daysUntilExam}
            </span>
            <span className="text-xs font-bold text-slate-300">Days</span>
            <span className="text-xl font-extrabold text-white ml-1">
              {hoursUntilExam}
            </span>
            <span className="text-xs font-medium text-slate-300">Hrs</span>
          </div>
          <span className="text-[10px] text-slate-300 block">
            Exam Date: Sun, Nov 29, 2026
          </span>
        </div>
      </div>
      <div className="absolute -right-12 -bottom-12 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />
    </div>
  );
};
