import React, { useState } from 'react';
import { useStudyPlans } from '../../../hooks/useStudyPlans';
import { TrackSelector } from './TrackSelector';
import { ProgressBanner } from './ProgressBanner';
import { PhaseCard } from './PhaseCard';
import { RestWeeklyView } from './RestWeeklyView';

/**
 * Unified StudyPlanner Feature:
 * Integrates Multi-Track Horizons (3-Month, 1-Month, 1-Week) with deep-link actions
 * and the 7-day cyclical R-E-S-T weekly planner framework.
 */
export const StudyPlanner = ({ userData, onUpdateUserData, onNavigateAction }) => {
  const [plannerMode, setPlannerMode] = useState('tracks'); // 'tracks' | 'rest'

  const {
    allTracks,
    activeTrackId,
    activeTrackConfig,
    activeTrackState,
    progressMetrics,
    setActiveTrackId,
    toggleTask,
    setStartDate,
    resetTrack,
    markPhaseAllTasks
  } = useStudyPlans();

  return (
    <div className="space-y-6">
      {/* Track & Mode Selector */}
      <TrackSelector
        allTracks={allTracks}
        activeTrackId={activeTrackId}
        onSelectTrack={setActiveTrackId}
        activeMode={plannerMode}
        onSelectMode={setPlannerMode}
      />

      {/* Mode 1: Multi-Track Horizons */}
      {plannerMode === 'tracks' && (
        <div className="space-y-6">
          {/* Progress & Day Counter Banner */}
          <ProgressBanner
            trackConfig={activeTrackConfig}
            trackState={activeTrackState}
            metrics={progressMetrics}
            onUpdateStartDate={(dateStr) => setStartDate(activeTrackId, dateStr)}
            onResetTrack={() => resetTrack(activeTrackId)}
          />

          {/* Phases Stack */}
          <div className="space-y-4">
            {activeTrackConfig.phases.map((phase) => (
              <PhaseCard
                key={phase.id}
                phase={phase}
                completedTaskIds={activeTrackState.completedTaskIds || []}
                isCurrentPhase={progressMetrics.activePhaseId === phase.id}
                onToggleTask={(taskId) => toggleTask(activeTrackId, taskId)}
                onNavigateAction={onNavigateAction}
                onMarkPhaseTasks={(phaseId, markComplete) =>
                  markPhaseAllTasks(activeTrackId, phaseId, markComplete)
                }
              />
            ))}
          </div>
        </div>
      )}

      {/* Mode 2: R-E-S-T Weekly Planner */}
      {plannerMode === 'rest' && (
        <RestWeeklyView userData={userData} onUpdateUserData={onUpdateUserData} />
      )}
    </div>
  );
};
