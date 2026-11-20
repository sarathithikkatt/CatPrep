import React from 'react';
import { ResourcesHeader } from './resources/ResourcesHeader';
import { ScorePercentileTable } from './resources/ScorePercentileTable';
import { PastPapersRepository } from './resources/PastPapersRepository';
import { VideoMasterclassesList } from './resources/VideoMasterclassesList';
import { ExamExtensibilityCards } from './resources/ExamExtensibilityCards';

/**
 * ResourcesGuide Page:
 * Curated authentic past paper repositories, video lectures,
 * historical score vs percentile cutoffs, and multi-exam extensibility blueprint.
 */
export const ResourcesGuide = () => {
  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <ResourcesHeader />

      {/* 1. Score vs Percentile Benchmarks */}
      <ScorePercentileTable />

      {/* 2. Official Past Papers & Free Video Channels */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <PastPapersRepository />
        <VideoMasterclassesList />
      </div>

      {/* 3. Multi-Exam Extensibility Blueprint */}
      <ExamExtensibilityCards />
    </div>
  );
};
