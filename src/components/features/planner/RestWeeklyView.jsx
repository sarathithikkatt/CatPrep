import React, { useState } from 'react';
import { DEFAULT_REST_PLAN } from '../../planner/plannerConstants';
import { PlannerHeaderBanner } from '../../planner/PlannerHeaderBanner';
import { PillarFilterCards } from '../../planner/PillarFilterCards';
import { PlannerControls } from '../../planner/PlannerControls';
import { DayScheduleCard } from '../../planner/DayScheduleCard';
import { AddTaskModal } from '../../planner/AddTaskModal';

/**
 * RestWeeklyView:
 * 7-Day cyclical schedule pre-configured with coderdevang's R-E-S-T framework
 * (Revise, Enhance, Strategize, Test).
 */
export const RestWeeklyView = ({ userData, onUpdateUserData }) => {
  const [selectedDay, setSelectedDay] = useState('all');
  const [pillarFilter, setPillarFilter] = useState('all');
  const [sectionFilter, setSectionFilter] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);

  const weeklyPlan = userData.weeklyPlanner || DEFAULT_REST_PLAN;

  const savePlan = (updatedPlan) => {
    onUpdateUserData({
      ...userData,
      weeklyPlanner: updatedPlan
    });
  };

  const handleToggleTask = (dayId, taskId) => {
    const updated = weeklyPlan.map((day) => {
      if (day.dayId !== dayId) return day;
      return {
        ...day,
        tasks: day.tasks.map((t) => (t.id === taskId ? { ...t, completed: !t.completed } : t))
      };
    });
    savePlan(updated);
  };

  const handleDeleteTask = (dayId, taskId) => {
    const updated = weeklyPlan.map((day) => {
      if (day.dayId !== dayId) return day;
      return {
        ...day,
        tasks: day.tasks.filter((t) => t.id !== taskId)
      };
    });
    savePlan(updated);
  };

  const handleAddTask = ({ dayId, task }) => {
    const updated = weeklyPlan.map((day) => {
      if (day.dayId !== dayId) return day;
      return {
        ...day,
        tasks: [...day.tasks, task]
      };
    });
    savePlan(updated);
  };

  const handleResetToDefault = () => {
    if (confirm('Reset your weekly study planner back to the recommended R-E-S-T template?')) {
      savePlan(DEFAULT_REST_PLAN);
    }
  };

  const handleClearCompleted = () => {
    if (confirm('Clear completed status for all tasks in this week?')) {
      const updated = weeklyPlan.map((day) => ({
        ...day,
        tasks: day.tasks.map((t) => ({ ...t, completed: false }))
      }));
      savePlan(updated);
    }
  };

  const handleMarkDayComplete = (dayId) => {
    const updated = weeklyPlan.map((day) => {
      if (day.dayId !== dayId) return day;
      return {
        ...day,
        tasks: day.tasks.map((t) => ({ ...t, completed: true }))
      };
    });
    savePlan(updated);
  };

  // Metrics
  const allTasks = weeklyPlan.flatMap((d) => d.tasks);
  const totalTasks = allTasks.length;
  const completedTasks = allTasks.filter((t) => t.completed).length;
  const weeklyProgressPercent =
    totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  const totalMinutesPlanned = allTasks.reduce((sum, t) => sum + (t.minutes || 0), 0);
  const completedMinutes = allTasks
    .filter((t) => t.completed)
    .reduce((sum, t) => sum + (t.minutes || 0), 0);

  const daysToDisplay =
    selectedDay === 'all' ? weeklyPlan : weeklyPlan.filter((d) => d.dayId === selectedDay);

  return (
    <div className="space-y-6">
      {/* Header Banner & Weekly Progress */}
      <PlannerHeaderBanner
        completedTasks={completedTasks}
        totalTasks={totalTasks}
        weeklyProgressPercent={weeklyProgressPercent}
        completedMinutes={completedMinutes}
        totalMinutesPlanned={totalMinutesPlanned}
        onOpenAddModal={() => setShowAddModal(true)}
        onResetToDefault={handleResetToDefault}
        onClearCompleted={handleClearCompleted}
      />

      {/* R-E-S-T Pillars Explanation & Filter Bar */}
      <PillarFilterCards pillarFilter={pillarFilter} onSelectPillar={setPillarFilter} />

      {/* Day & Section Controls */}
      <PlannerControls
        weeklyPlan={weeklyPlan}
        selectedDay={selectedDay}
        onSelectDay={setSelectedDay}
        sectionFilter={sectionFilter}
        onSelectSection={setSectionFilter}
      />

      {/* Schedule Days Grid */}
      <div className="grid grid-cols-1 gap-6">
        {daysToDisplay.map((day) => (
          <DayScheduleCard
            key={day.dayId}
            day={day}
            pillarFilter={pillarFilter}
            sectionFilter={sectionFilter}
            onToggleTask={handleToggleTask}
            onDeleteTask={handleDeleteTask}
            onMarkDayComplete={handleMarkDayComplete}
          />
        ))}
      </div>

      {/* Add Task Modal */}
      <AddTaskModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onAddTask={handleAddTask}
        weeklyPlan={weeklyPlan}
        defaultDayId={selectedDay === 'all' ? 'mon' : selectedDay}
      />
    </div>
  );
};
