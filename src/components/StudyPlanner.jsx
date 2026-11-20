import React, { useState } from 'react';
import { 
  DEFAULT_REST_PLAN, 
  getSectionBadge, 
  getPillarBadge 
} from './planner/plannerConstants';
import { PlannerHeaderBanner } from './planner/PlannerHeaderBanner';
import { PillarFilterCards } from './planner/PillarFilterCards';
import { PlannerControls } from './planner/PlannerControls';
import { DayScheduleCard } from './planner/DayScheduleCard';
import { AddTaskModal } from './planner/AddTaskModal';

export { DEFAULT_REST_PLAN, getSectionBadge, getPillarBadge };

/**
 * StudyPlanner Page:
 * Orchestrates weekly schedules aligned with the R-E-S-T framework (Revise, Enhance, Strategize, Test).
 */
export const StudyPlanner = ({ userData, onUpdateUserData }) => {
  const [selectedDay, setSelectedDay] = useState('all');
  const [pillarFilter, setPillarFilter] = useState('all');
  const [sectionFilter, setSectionFilter] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);

  // Current plan from userData or default
  const weeklyPlan = userData.weeklyPlanner || DEFAULT_REST_PLAN;

  const savePlan = (updatedPlan) => {
    onUpdateUserData({
      ...userData,
      weeklyPlanner: updatedPlan
    });
  };

  // Toggle task complete
  const handleToggleTask = (dayId, taskId) => {
    const updated = weeklyPlan.map(day => {
      if (day.dayId !== dayId) return day;
      return {
        ...day,
        tasks: day.tasks.map(t => t.id === taskId ? { ...t, completed: !t.completed } : t)
      };
    });
    savePlan(updated);
  };

  // Delete task
  const handleDeleteTask = (dayId, taskId) => {
    const updated = weeklyPlan.map(day => {
      if (day.dayId !== dayId) return day;
      return {
        ...day,
        tasks: day.tasks.filter(t => t.id !== taskId)
      };
    });
    savePlan(updated);
  };

  // Add custom task
  const handleAddTask = ({ dayId, task }) => {
    const updated = weeklyPlan.map(day => {
      if (day.dayId !== dayId) return day;
      return {
        ...day,
        tasks: [...day.tasks, task]
      };
    });
    savePlan(updated);
  };

  // Reset to default R-E-S-T template
  const handleResetToDefault = () => {
    if (confirm('Reset your study planner back to the recommended R-E-S-T framework template?')) {
      savePlan(DEFAULT_REST_PLAN);
    }
  };

  // Clear completed tasks
  const handleClearCompleted = () => {
    if (confirm('Clear completed status for all tasks in this week?')) {
      const updated = weeklyPlan.map(day => ({
        ...day,
        tasks: day.tasks.map(t => ({ ...t, completed: false }))
      }));
      savePlan(updated);
    }
  };

  // Mark all tasks for a day complete
  const handleMarkDayComplete = (dayId) => {
    const updated = weeklyPlan.map(day => {
      if (day.dayId !== dayId) return day;
      return {
        ...day,
        tasks: day.tasks.map(t => ({ ...t, completed: true }))
      };
    });
    savePlan(updated);
  };

  // Metrics calculation
  const allTasks = weeklyPlan.flatMap(d => d.tasks);
  const totalTasks = allTasks.length;
  const completedTasks = allTasks.filter(t => t.completed).length;
  const weeklyProgressPercent = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  const totalMinutesPlanned = allTasks.reduce((sum, t) => sum + (t.minutes || 0), 0);
  const completedMinutes = allTasks.filter(t => t.completed).reduce((sum, t) => sum + (t.minutes || 0), 0);

  // Filter days to display
  const daysToDisplay = selectedDay === 'all' 
    ? weeklyPlan 
    : weeklyPlan.filter(d => d.dayId === selectedDay);

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

      {/* R-E-S-T Framework Pillars Interactive Cards */}
      <PillarFilterCards
        pillarFilter={pillarFilter}
        onSelectPillar={setPillarFilter}
      />

      {/* Day Selector Pills & Section Dropdown */}
      <PlannerControls
        weeklyPlan={weeklyPlan}
        totalTasks={totalTasks}
        selectedDay={selectedDay}
        onSelectDay={setSelectedDay}
        sectionFilter={sectionFilter}
        onSelectSection={setSectionFilter}
      />

      {/* Daily Schedule Cards */}
      <div className="space-y-6">
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

      {/* Add Custom Task Modal */}
      <AddTaskModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onAddTask={handleAddTask}
      />
    </div>
  );
};
