import React from 'react';
import { QuestionsMetricCard } from './QuestionsMetricCard';
import { TimeSpentMetricCard } from './TimeSpentMetricCard';
import { AccuracyMetricCard } from './AccuracyMetricCard';

/**
 * Grid container rendering the 3 primary daily metric cards.
 */
export const DailyMetricsGrid = ({
  todayLog,
  targetQs,
  targetMins,
  accuracy,
  isEditingTarget,
  onToggleEditTarget,
  onAddMinutes
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
      <QuestionsMetricCard questionsSolved={todayLog.questionsSolved} targetQuestions={targetQs} />
      <TimeSpentMetricCard
        minutesSpent={todayLog.minutesSpent}
        targetMinutes={targetMins}
        onAddMinutes={onAddMinutes}
      />
      <AccuracyMetricCard
        accuracy={accuracy}
        correctCount={todayLog.correctCount || 0}
        incorrectCount={todayLog.incorrectCount || 0}
        isEditingTarget={isEditingTarget}
        onToggleEditTarget={onToggleEditTarget}
      />
    </div>
  );
};
