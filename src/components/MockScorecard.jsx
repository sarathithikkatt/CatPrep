import React, { useState } from 'react';
import { BarChart2 } from 'lucide-react';
import { EmptyState } from './common/EmptyState';
import { MockScorecardHeader } from './mocks/MockScorecardHeader';
import { PanicDeltaInsightCard } from './mocks/PanicDeltaInsightCard';
import { MockReportCard } from './mocks/MockReportCard';
import { LogMockModal } from './mocks/LogMockModal';

/**
 * MockScorecard Page:
 * Logs full-length and sectional mock exams, calculates Panic Delta,
 * and tracks percentile benchmarks across test platforms.
 */
export const MockScorecard = ({ userData, onUpdateUserData }) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const mockList = userData.mockReports || [];

  const handleSaveMock = (newReport) => {
    const updated = [newReport, ...mockList];
    onUpdateUserData({
      ...userData,
      mockReports: updated
    });
  };

  const handleDeleteMock = (id) => {
    if (confirm('Delete this mock test report?')) {
      const updated = mockList.filter((m) => m.id !== id);
      onUpdateUserData({
        ...userData,
        mockReports: updated
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <MockScorecardHeader onOpenAddModal={() => setShowAddModal(true)} />

      {/* Diagnostics Insight Card: What is Capability Score? */}
      <PanicDeltaInsightCard />

      {/* Mock Tests List */}
      {mockList.length === 0 ? (
        <EmptyState
          icon={BarChart2}
          title="No Mock Tests Logged Yet"
          description="Record your SimCATs, AIMCATs, or sectional tests to track your score progression, accuracy, and section percentiles."
          actionLabel="Log First Mock Exam"
          onAction={() => setShowAddModal(true)}
        />
      ) : (
        <div className="space-y-4">
          {mockList.map((mock) => (
            <MockReportCard key={mock.id} mock={mock} onDeleteMock={handleDeleteMock} />
          ))}
        </div>
      )}

      {/* Log Mock Score Modal */}
      <LogMockModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSaveMock={handleSaveMock}
      />
    </div>
  );
};
