import React, { useState, useEffect, useCallback, useMemo } from 'react';
import confetti from 'canvas-confetti';
import { BookOpen } from 'lucide-react';
import { QUESTIONS_BANK } from '../data/questionsData';
import { EXAMS_CONFIG } from '../data/examsData';
import { EmptyState } from './common/EmptyState';
import { PracticeFiltersHeader } from './practice/PracticeFiltersHeader';
import { QuestionCard } from './practice/QuestionCard';
import { AddQuestionModal } from './practice/AddQuestionModal';

/**
 * QuestionPractice Page:
 * Practice workspace for authentic past papers with instant evaluation,
 * interactive MCQ/TITA, Gemini Vision screenshot OCR, and 4-tier solution drawers.
 */
export const QuestionPractice = ({ 
  activeExamId, 
  initialTopicFilter = 'all', 
  retestQuestionId = null,
  onClearRetest,
  onOpenSettings,
  userData, 
  onUpdateUserData 
}) => {
  const currentExam = useMemo(() => 
    EXAMS_CONFIG.find(e => e.id === activeExamId) || EXAMS_CONFIG[0],
    [activeExamId]
  );

  const [selectedSection, setSelectedSection] = useState('all');
  const [selectedTopic, setSelectedTopic] = useState(initialTopicFilter);
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedYear, setSelectedYear] = useState('all');
  const [userAnswers, setUserAnswers] = useState({});
  const [submittedQuestions, setSubmittedQuestions] = useState({});
  const [retestingQuestions, setRetestingQuestions] = useState({});
  const [activeSolutionTab, setActiveSolutionTab] = useState({});
  const [showAddModal, setShowAddModal] = useState(false);

  // Keep track of activeExamId to reset filter when exam changes
  const [prevExamId, setPrevExamId] = useState(activeExamId);
  if (prevExamId !== activeExamId) {
    setPrevExamId(activeExamId);
    setSelectedSection('all');
    setSelectedTopic('all');
  }

  const allQuestions = useMemo(() => [
    ...QUESTIONS_BANK,
    ...(userData.customQuestions || [])
  ], [userData.customQuestions]);

  // Re-attempt / Re-test fresh attempt handler
  const handleRetestQuestion = useCallback((qid) => {
    setUserAnswers(prev => {
      const updated = { ...prev };
      delete updated[qid];
      return updated;
    });
    setSubmittedQuestions(prev => ({ ...prev, [qid]: false }));
    setRetestingQuestions(prev => ({ ...prev, [qid]: true }));
  }, []);

  // Retest navigation effect when jumping from Mistake Notebook
  useEffect(() => {
    if (retestQuestionId) {
      const target = allQuestions.find(q => q.id === retestQuestionId);
      if (target) {
        if (target.sectionId) setSelectedSection(target.sectionId);
        if (target.topicId) setSelectedTopic(target.topicId);
        setSelectedDifficulty('all');
        setSelectedYear('all');
        setStatusFilter('all');
        handleRetestQuestion(retestQuestionId);
      }
      if (onClearRetest) onClearRetest();
    }
  }, [retestQuestionId, allQuestions, handleRetestQuestion, onClearRetest]);

  // Handle Option Pick
  const handleSelectOption = (qid, optionIndexOrVal) => {
    const isRetesting = !!retestingQuestions[qid];
    if (submittedQuestions[qid] && !isRetesting) return;
    setUserAnswers(prev => ({ ...prev, [qid]: optionIndexOrVal }));
  };

  // Submit Answer & Evaluate
  const handleSubmitAnswer = (q) => {
    const qid = q.id;
    const answer = userAnswers[qid];
    if (answer === undefined || answer === '') return;

    let isCorrect = false;
    if (q.type === 'MCQ') {
      isCorrect = parseInt(answer, 10) === q.correctAnswer;
    } else {
      isCorrect = answer.toString().trim().toLowerCase() === q.correctAnswer.toString().trim().toLowerCase();
    }

    const wasRetesting = !!retestingQuestions[qid];
    setSubmittedQuestions(prev => ({ ...prev, [qid]: true }));
    if (wasRetesting) {
      setRetestingQuestions(prev => ({ ...prev, [qid]: false }));
    }

    if (isCorrect) {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 }
      });
    }

    const today = new Date().toISOString().split('T')[0];
    const updatedDailyLogs = { ...userData.dailyLogs };
    const currentDayLog = updatedDailyLogs[today] || {
      questionsSolved: 0,
      correctCount: 0,
      incorrectCount: 0,
      minutesSpent: 0
    };

    const wasAlreadyAttempted = !!userData.questionAttempts?.[qid];
    if (!wasAlreadyAttempted) {
      updatedDailyLogs[today] = {
        ...currentDayLog,
        questionsSolved: (currentDayLog.questionsSolved || 0) + 1,
        correctCount: (currentDayLog.correctCount || 0) + (isCorrect ? 1 : 0),
        incorrectCount: (currentDayLog.incorrectCount || 0) + (isCorrect ? 0 : 1)
      };
    }

    const updatedAttempts = {
      ...userData.questionAttempts,
      [qid]: {
        isCorrect,
        userAnswer: answer,
        timestamp: new Date().toISOString()
      }
    };

    let updatedRetests = userData.retestAttempts;
    if (wasRetesting) {
      const prevCount = (userData.retestAttempts?.[qid]?.count || 0) + 1;
      updatedRetests = {
        ...userData.retestAttempts,
        [qid]: {
          count: prevCount,
          isCorrect,
          lastAttemptDate: new Date().toISOString()
        }
      };
    }

    onUpdateUserData({
      ...userData,
      dailyLogs: updatedDailyLogs,
      questionAttempts: updatedAttempts,
      ...(updatedRetests ? { retestAttempts: updatedRetests } : {})
    });
  };

  // Toggle Bookmark / Mistake Notebook
  const handleToggleBookmark = (qid, reason = 'General Review') => {
    const isBookmarked = !!userData.bookmarkedQuestions?.[qid];
    const updatedBookmarks = { ...userData.bookmarkedQuestions };

    if (isBookmarked) {
      delete updatedBookmarks[qid];
    } else {
      updatedBookmarks[qid] = {
        date: new Date().toISOString(),
        reason,
        notes: ''
      };
    }

    onUpdateUserData({
      ...userData,
      bookmarkedQuestions: updatedBookmarks
    });
  };

  const handleResetFilters = () => {
    setSelectedSection('all');
    setSelectedTopic('all');
    setSelectedDifficulty('all');
    setSelectedYear('all');
    setStatusFilter('all');
  };

  // Filtering questions
  const filteredQuestions = allQuestions.filter((q) => {
    if (q.examId && q.examId !== activeExamId) return false;
    if (selectedSection !== 'all' && q.sectionId !== selectedSection) return false;
    if (selectedTopic !== 'all' && q.topicId !== selectedTopic) return false;
    if (selectedDifficulty !== 'all' && q.difficulty.toLowerCase() !== selectedDifficulty.toLowerCase()) return false;
    if (selectedYear !== 'all' && q.year.toString() !== selectedYear) return false;

    const attempt = userData.questionAttempts?.[q.id];
    const isBookmarked = !!userData.bookmarkedQuestions?.[q.id];

    if (statusFilter === 'unattempted' && attempt) return false;
    if (statusFilter === 'correct' && attempt?.isCorrect !== true) return false;
    if (statusFilter === 'incorrect' && attempt?.isCorrect !== false) return false;
    if (statusFilter === 'bookmarked' && !isBookmarked) return false;

    return true;
  });

  return (
    <div className="space-y-6">
      {/* Filters Header */}
      <PracticeFiltersHeader
        currentExam={currentExam}
        selectedSection={selectedSection}
        onSelectSection={setSelectedSection}
        selectedDifficulty={selectedDifficulty}
        onSelectDifficulty={setSelectedDifficulty}
        statusFilter={statusFilter}
        onSelectStatus={setStatusFilter}
        selectedYear={selectedYear}
        onSelectYear={setSelectedYear}
        onResetFilters={handleResetFilters}
        onOpenAddModal={() => setShowAddModal(true)}
      />

      {/* Questions Count Indicator */}
      <div className="text-xs font-bold text-slate-500 px-1">
        Showing {filteredQuestions.length} Questions for {currentExam.name}
      </div>

      {/* Questions List */}
      <div className="space-y-6">
        {filteredQuestions.length === 0 ? (
          <EmptyState
            icon={BookOpen}
            title="No Questions Match Your Filter"
            description="Try resetting your section or difficulty filters, or click below to paste mock screenshots with Gemini AI."
            actionLabel="Reset Filters"
            onAction={handleResetFilters}
          />
        ) : (
          filteredQuestions.map((q, index) => {
            const qid = q.id;
            const isRetesting = !!retestingQuestions[qid];
            const isSubmitted = !isRetesting && (submittedQuestions[qid] || (submittedQuestions[qid] !== false && !!userData.questionAttempts?.[qid]));
            const previousAttempt = userData.questionAttempts?.[qid];
            const isBookmarked = !!userData.bookmarkedQuestions?.[qid];
            const currentAnswer = userAnswers[qid] !== undefined ? userAnswers[qid] : (previousAttempt?.userAnswer ?? '');
            const isCorrect = isSubmitted 
              ? (q.type === 'MCQ' ? parseInt(currentAnswer, 10) === q.correctAnswer : currentAnswer.toString().trim().toLowerCase() === q.correctAnswer.toString().trim().toLowerCase())
              : null;

            return (
              <QuestionCard
                key={qid}
                question={q}
                index={index}
                isSubmitted={isSubmitted}
                isCorrect={isCorrect}
                currentAnswer={currentAnswer}
                isBookmarked={isBookmarked}
                currentSolutionTab={activeSolutionTab[qid] || 'step'}
                onSelectOption={handleSelectOption}
                onInputTita={handleSelectOption}
                onSubmitAnswer={handleSubmitAnswer}
                onRetestQuestion={handleRetestQuestion}
                onToggleBookmark={handleToggleBookmark}
                onSelectSolutionTab={(id, tab) => setActiveSolutionTab(prev => ({ ...prev, [id]: tab }))}
              />
            );
          })
        )}
      </div>

      {/* Add Custom Question / Screenshot OCR Modal */}
      <AddQuestionModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        currentExam={currentExam}
        activeExamId={activeExamId}
        onSaveQuestion={(customQ) => {
          const updatedCustom = [...(userData.customQuestions || []), customQ];
          onUpdateUserData({ ...userData, customQuestions: updatedCustom });
        }}
        onOpenSettings={onOpenSettings}
      />
    </div>
  );
};
