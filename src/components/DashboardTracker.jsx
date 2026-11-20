import React, { useState } from 'react';
import { EXAMS_CONFIG } from '../data/examsData';
import { ExamHeroBanner } from './dashboard/ExamHeroBanner';
import { DailyMetricsGrid } from './dashboard/DailyMetricsGrid';
import { DailyTargetEditor } from './dashboard/DailyTargetEditor';
import { SyllabusBurndownCard } from './dashboard/SyllabusBurndownCard';
import { VelocityForecastCard } from './dashboard/VelocityForecastCard';

/**
 * DashboardTracker Page:
 * Top-level dashboard view orchestrating daily targets, exam countdown,
 * metrics burndown, and velocity forecasts.
 */
export const DashboardTracker = ({ 
  activeExamId, 
  userData, 
  onUpdateUserData, 
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

  const todayAccuracy = todayLog.questionsSolved > 0 
    ? Math.round((todayLog.correctCount / todayLog.questionsSolved) * 100) 
    : 0;

  // Calculate Syllabus Metrics across modules & topics
  let totalTopics = 0;
  let masteredTopics = 0;
  let inProgressTopics = 0;
  let totalEstimatedHours = 0;
  const sectionProgressMap = {};

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

  // Quick add study minutes handler
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
      {/* Welcome Banner & Exam Countdown */}
      <ExamHeroBanner
        currentExam={currentExam}
        streakCount={userData.streak?.currentStreak || 1}
      />

      {/* Primary Metrics Grid: Questions, Time Invested, Accuracy */}
      <DailyMetricsGrid
        todayLog={todayLog}
        targetQs={targetQs}
        targetMins={targetMins}
        accuracy={todayAccuracy}
        isEditingTarget={isEditingTarget}
        onToggleEditTarget={() => setIsEditingTarget(!isEditingTarget)}
        onAddMinutes={handleAddMinutes}
      />

      {/* Target Customizer Form (Toggleable) */}
      {isEditingTarget && (
        <DailyTargetEditor
          targetQsInput={targetQsInput}
          setTargetQsInput={setTargetQsInput}
          targetMinsInput={targetMinsInput}
          setTargetMinsInput={setTargetMinsInput}
          onSaveTarget={handleSaveTarget}
        />
      )}

      {/* Middle Row: Overall Syllabus Burndown & Velocity Forecast */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <SyllabusBurndownCard
          sectionsCount={currentExam.sections.length}
          overallSyllabusPercent={overallSyllabusPercent}
          totalTopics={totalTopics}
          masteredTopics={masteredTopics}
          inProgressTopics={inProgressTopics}
          sectionProgressMap={sectionProgressMap}
        />

        <VelocityForecastCard
          totalEstimatedHours={totalEstimatedHours}
          totalRemainingHours={totalRemainingHours}
          estimatedDaysToFinish={estimatedDaysToFinish}
          avgMinsPerDay={avgMinsPerDay}
          onNavigateToPractice={onNavigateToPractice}
        />
      </div>
    </div>
  );
};
