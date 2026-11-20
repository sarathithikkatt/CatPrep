/**
 * Pure calculation functions for the Multi-Track Study Planner.
 */

/**
 * Calculates current day number based on a start date string (YYYY-MM-DD).
 */
export const calculateCurrentDay = (startDateStr, maxDays = 90) => {
  if (!startDateStr) return 1;
  const start = new Date(startDateStr);
  const now = new Date();

  // Set both to midnight UTC for reliable day difference
  const startMidnight = new Date(Date.UTC(start.getFullYear(), start.getMonth(), start.getDate()));
  const nowMidnight = new Date(Date.UTC(now.getFullYear(), now.getMonth(), now.getDate()));

  const diffMs = nowMidnight - startMidnight;
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  const dayNumber = diffDays + 1;
  return Math.max(1, Math.min(dayNumber, maxDays));
};

/**
 * Determines which phase is currently active given the current day number.
 */
export const determineActivePhaseId = (phases = [], currentDay = 1) => {
  if (!phases || phases.length === 0) return null;
  const found = phases.find((phase) => {
    return currentDay >= phase.dayStart && currentDay <= phase.dayEnd;
  });
  return found ? found.id : phases[0].id;
};

/**
 * Computes completion percentage and counts for a track.
 */
export const calculateTrackProgress = (trackConfig, trackState = {}) => {
  if (!trackConfig || !trackConfig.phases) {
    return { totalTasks: 0, completedTasks: 0, percent: 0, currentDay: 1, activePhaseId: null };
  }

  const allTasks = trackConfig.phases.flatMap((p) => p.tasks || []);
  const totalTasks = allTasks.length;
  const completedIds = trackState.completedTaskIds || [];
  const completedTasks = allTasks.filter((t) => completedIds.includes(t.id)).length;
  const percent = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  const currentDay = calculateCurrentDay(trackState.startDate, trackConfig.totalDays);
  const activePhaseId = determineActivePhaseId(trackConfig.phases, currentDay);

  return {
    totalTasks,
    completedTasks,
    percent,
    currentDay,
    totalDays: trackConfig.totalDays,
    daysRemaining: Math.max(0, trackConfig.totalDays - currentDay),
    activePhaseId
  };
};

/**
 * Calculates progress for a specific phase inside a track.
 */
export const calculatePhaseProgress = (phase, completedTaskIds = []) => {
  const tasks = phase.tasks || [];
  const total = tasks.length;
  const completed = tasks.filter((t) => completedTaskIds.includes(t.id)).length;
  const percent = total > 0 ? Math.round((completed / total) * 100) : 0;
  return { total, completed, percent };
};
