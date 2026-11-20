import React, { useState, useMemo } from 'react';
import { EXAMS_CONFIG } from '../data/examsData';
import { QUESTIONS_BANK } from '../data/questionsData';
import { SyllabusHeader } from './syllabus/SyllabusHeader';
import { SectionTabs } from './syllabus/SectionTabs';
import { StatusFilterPills } from './syllabus/StatusFilterPills';
import { ModuleCard } from './syllabus/ModuleCard';

/**
 * SyllabusManager Page:
 * Structured topic breakdown, historical question weightage, and mastery tracking.
 */
export const SyllabusManager = ({ 
  activeExamId, 
  userData, 
  onUpdateUserData, 
  onPracticeTopic 
}) => {
  const currentExam = useMemo(() => 
    EXAMS_CONFIG.find(e => e.id === activeExamId) || EXAMS_CONFIG[0],
    [activeExamId]
  );

  const [selectedSectionId, setSelectedSectionId] = useState(currentExam.sections[0]?.id || 'qa');
  const [statusFilter, setStatusFilter] = useState('all'); // all, completed, in_progress, not_started
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedTopicId, setExpandedTopicId] = useState(null);

  // Fallback to first section if selected section is not present in the current target exam
  const activeSectionId = currentExam.sections.some(s => s.id === selectedSectionId)
    ? selectedSectionId
    : (currentExam.sections[0]?.id || 'qa');

  const activeSection = currentExam.sections.find(s => s.id === activeSectionId) || currentExam.sections[0];

  const allQuestions = useMemo(() => [
    ...QUESTIONS_BANK,
    ...(userData.customQuestions || [])
  ], [userData.customQuestions]);

  // Topic-level question count mapping
  const topicQuestionCounts = useMemo(() => {
    const counts = {};
    for (const q of allQuestions) {
      if (q.examId && q.examId !== activeExamId) continue;
      if (q.topicId) {
        counts[q.topicId] = (counts[q.topicId] || 0) + 1;
      }
    }
    return counts;
  }, [allQuestions, activeExamId]);

  // Section-level question count mapping
  const sectionQuestionCounts = useMemo(() => {
    const counts = {};
    for (const q of allQuestions) {
      if (q.examId && q.examId !== activeExamId) continue;
      if (q.sectionId) {
        counts[q.sectionId] = (counts[q.sectionId] || 0) + 1;
      }
    }
    return counts;
  }, [allQuestions, activeExamId]);

  // Update a topic status or confidence
  const handleUpdateTopicProgress = (topicId, updates) => {
    const existing = userData.topicProgress?.[topicId] || {
      status: 'not_started',
      confidence: 1,
      hoursSpent: 0,
      notes: ''
    };

    onUpdateUserData({
      ...userData,
      topicProgress: {
        ...userData.topicProgress,
        [topicId]: {
          ...existing,
          ...updates
        }
      }
    });
  };

  return (
    <div className="space-y-6">
      {/* Section Tabs & Overview Card */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm">
        <SyllabusHeader
          examName={currentExam.name}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />

        <SectionTabs
          sections={currentExam.sections}
          selectedSectionId={activeSectionId}
          onSelectSection={setSelectedSectionId}
          sectionQuestionCounts={sectionQuestionCounts}
        />

        <StatusFilterPills
          statusFilter={statusFilter}
          onSelectStatus={setStatusFilter}
        />
      </div>

      {/* Modules & Topics List */}
      <div className="space-y-5">
        {activeSection.modules.map((module) => {
          const filteredTopics = module.topics.filter((t) => {
            const progress = userData.topicProgress?.[t.id]?.status || 'not_started';
            const matchesStatus = statusFilter === 'all' || progress === statusFilter;
            const matchesSearch = searchQuery === '' || 
              t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
              t.keyConcepts?.toLowerCase().includes(searchQuery.toLowerCase()) ||
              t.subtopics?.some(st => st.toLowerCase().includes(searchQuery.toLowerCase()));
            return matchesStatus && matchesSearch;
          });

          if (filteredTopics.length === 0) return null;
          const modulePYQCount = filteredTopics.reduce((acc, t) => acc + (topicQuestionCounts[t.id] || 0), 0);

          return (
            <ModuleCard
              key={module.id}
              module={module}
              filteredTopics={filteredTopics}
              modulePYQCount={modulePYQCount}
              userData={userData}
              topicQuestionCounts={topicQuestionCounts}
              expandedTopicId={expandedTopicId}
              onToggleExpandTopic={setExpandedTopicId}
              onUpdateTopicProgress={handleUpdateTopicProgress}
              onPracticeTopic={onPracticeTopic}
            />
          );
        })}
      </div>
    </div>
  );
};
