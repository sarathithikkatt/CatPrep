import { useState, useEffect, useMemo, useCallback } from 'react';
import { STUDY_PLANS } from '../data/studyPlansData';
import { loadStudyPlansState, saveStudyPlansState } from '../services/storageService';
import { calculateTrackProgress, calculatePhaseProgress } from '../services/planCalculator';

/**
 * Custom React hook managing the multi-track study planner state.
 */
export const useStudyPlans = () => {
  const [plansState, setPlansState] = useState(() => loadStudyPlansState());

  // Save to localStorage when state changes
  useEffect(() => {
    saveStudyPlansState(plansState);
  }, [plansState]);

  const activeTrackId = plansState.activeTrackId || '3-month';
  const activeTrackState = plansState.tracks?.[activeTrackId] || {
    startDate: new Date().toISOString().split('T')[0],
    completedTaskIds: []
  };

  const activeTrackConfig = useMemo(() => {
    return STUDY_PLANS.find((t) => t.id === activeTrackId) || STUDY_PLANS[0];
  }, [activeTrackId]);

  // Compute overall progress metrics for the active track
  const progressMetrics = useMemo(() => {
    return calculateTrackProgress(activeTrackConfig, activeTrackState);
  }, [activeTrackConfig, activeTrackState]);

  // Switch active track
  const setActiveTrackId = useCallback((trackId) => {
    setPlansState((prev) => ({
      ...prev,
      activeTrackId: trackId
    }));
  }, []);

  // Toggle a single task completion status
  const toggleTask = useCallback((trackId, taskId) => {
    setPlansState((prev) => {
      const track = prev.tracks?.[trackId] || {
        startDate: new Date().toISOString().split('T')[0],
        completedTaskIds: []
      };
      const isDone = track.completedTaskIds.includes(taskId);
      const nextCompleted = isDone
        ? track.completedTaskIds.filter((id) => id !== taskId)
        : [...track.completedTaskIds, taskId];

      return {
        ...prev,
        tracks: {
          ...prev.tracks,
          [trackId]: {
            ...track,
            completedTaskIds: nextCompleted
          }
        }
      };
    });
  }, []);

  // Update start date for a track
  const setStartDate = useCallback((trackId, startDateStr) => {
    setPlansState((prev) => {
      const track = prev.tracks?.[trackId] || {
        completedTaskIds: []
      };
      return {
        ...prev,
        tracks: {
          ...prev.tracks,
          [trackId]: {
            ...track,
            startDate: startDateStr
          }
        }
      };
    });
  }, []);

  // Reset a track's completed tasks
  const resetTrack = useCallback((trackId) => {
    setPlansState((prev) => {
      const track = prev.tracks?.[trackId] || {};
      return {
        ...prev,
        tracks: {
          ...prev.tracks,
          [trackId]: {
            ...track,
            completedTaskIds: []
          }
        }
      };
    });
  }, []);

  // Mark all tasks in a phase completed
  const markPhaseAllTasks = useCallback((trackId, phaseId, markComplete = true) => {
    const trackConfig = STUDY_PLANS.find((t) => t.id === trackId);
    if (!trackConfig) return;
    const phase = trackConfig.phases.find((p) => p.id === phaseId);
    if (!phase) return;

    const phaseTaskIds = phase.tasks.map((t) => t.id);

    setPlansState((prev) => {
      const track = prev.tracks?.[trackId] || { completedTaskIds: [] };
      let nextCompleted = [...track.completedTaskIds];
      if (markComplete) {
        phaseTaskIds.forEach((id) => {
          if (!nextCompleted.includes(id)) nextCompleted.push(id);
        });
      } else {
        nextCompleted = nextCompleted.filter((id) => !phaseTaskIds.includes(id));
      }

      return {
        ...prev,
        tracks: {
          ...prev.tracks,
          [trackId]: {
            ...track,
            completedTaskIds: nextCompleted
          }
        }
      };
    });
  }, []);

  return {
    allTracks: STUDY_PLANS,
    activeTrackId,
    activeTrackConfig,
    activeTrackState,
    progressMetrics,
    setActiveTrackId,
    toggleTask,
    setStartDate,
    resetTrack,
    markPhaseAllTasks,
    calculatePhaseProgress
  };
};
