import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { CheckCircle2 } from 'lucide-react';
import { QUESTIONS_BANK } from '../data/questionsData';
import { EmptyState } from './common/EmptyState';
import { NotebookHeader } from './notebook/NotebookHeader';
import { NotebookQuestionCard } from './notebook/NotebookQuestionCard';

/**
 * MistakeNotebook Page:
 * Error notebook with root-cause categorization, reflection notes,
 * and blind re-test mode to confirm concept mastery.
 */
export const MistakeNotebook = ({ 
  userData, 
  onUpdateUserData, 
  onNavigateToPractice,
  onRetestInPractice
}) => {
  const [activeReasonFilter, setActiveReasonFilter] = useState('all');
  const [editingNotesId, setEditingNotesId] = useState(null);
  const [tempNotes, setTempNotes] = useState('');
  
  // Re-test state per question
  const [activeRetestId, setActiveRetestId] = useState(null);
  const [retestAnswers, setRetestAnswers] = useState({});
  const [retestSubmissions, setRetestSubmissions] = useState({});
  const [activeSolutionTab, setActiveSolutionTab] = useState({});

  const allQuestions = [...QUESTIONS_BANK, ...(userData.customQuestions || [])];

  // Questions in notebook are either bookmarked or marked incorrect
  const bookmarkedIds = Object.keys(userData.bookmarkedQuestions || {});
  const incorrectIds = Object.keys(userData.questionAttempts || {}).filter(
    qid => userData.questionAttempts[qid]?.isCorrect === false
  );

  const unionIds = Array.from(new Set([...bookmarkedIds, ...incorrectIds]));
  const notebookQuestions = allQuestions.filter(q => unionIds.includes(q.id));

  // Save reason tag
  const handleUpdateReason = (qid, reason) => {
    const existing = userData.bookmarkedQuestions?.[qid] || {
      date: new Date().toISOString(),
      reason: 'General Review',
      notes: ''
    };
    onUpdateUserData({
      ...userData,
      bookmarkedQuestions: {
        ...userData.bookmarkedQuestions,
        [qid]: {
          ...existing,
          reason
        }
      }
    });
  };

  // Save personal notes
  const handleSaveNotes = (qid) => {
    const existing = userData.bookmarkedQuestions?.[qid] || {
      date: new Date().toISOString(),
      reason: 'General Review',
      notes: ''
    };
    onUpdateUserData({
      ...userData,
      bookmarkedQuestions: {
        ...userData.bookmarkedQuestions,
        [qid]: {
          ...existing,
          notes: tempNotes
        }
      }
    });
    setEditingNotesId(null);
  };

  // Remove question from mistake notebook
  const handleRemove = (qid) => {
    const updatedBookmarks = { ...userData.bookmarkedQuestions };
    delete updatedBookmarks[qid];

    const updatedAttempts = { ...userData.questionAttempts };
    if (updatedAttempts[qid]) {
      updatedAttempts[qid] = {
        ...updatedAttempts[qid],
        isCorrect: true
      };
    }

    onUpdateUserData({
      ...userData,
      bookmarkedQuestions: updatedBookmarks,
      questionAttempts: updatedAttempts
    });

    if (activeRetestId === qid) {
      setActiveRetestId(null);
    }
  };

  // Start inline re-test
  const handleStartRetest = (qid) => {
    setActiveRetestId(qid);
    setRetestAnswers(prev => ({ ...prev, [qid]: undefined }));
    setRetestSubmissions(prev => {
      const updated = { ...prev };
      delete updated[qid];
      return updated;
    });
  };

  // Submit inline re-test
  const handleSubmitRetest = (q) => {
    const qid = q.id;
    const answer = retestAnswers[qid];
    if (answer === undefined || answer === '') return;

    let isCorrect = false;
    if (q.type === 'MCQ') {
      isCorrect = parseInt(answer, 10) === q.correctAnswer;
    } else {
      isCorrect = answer.toString().trim().toLowerCase() === q.correctAnswer.toString().trim().toLowerCase();
    }

    setRetestSubmissions(prev => ({
      ...prev,
      [qid]: { isCorrect }
    }));

    if (isCorrect) {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 }
      });
    }

    // Persist re-test attempt in userData
    const existingRetests = userData.retestAttempts || {};
    const previousForQ = existingRetests[qid] || { count: 0 };
    const updatedRetests = {
      ...existingRetests,
      [qid]: {
        count: previousForQ.count + 1,
        lastAttemptStatus: isCorrect ? 'mastered' : 'failed',
        lastAttemptDate: new Date().toISOString(),
        isCorrect
      }
    };

    onUpdateUserData({
      ...userData,
      retestAttempts: updatedRetests
    });
  };

  // Filter notebook questions
  const filteredQuestions = notebookQuestions.filter(q => {
    if (activeReasonFilter === 'all') return true;
    const reason = userData.bookmarkedQuestions?.[q.id]?.reason || 'General Review';
    return reason === activeReasonFilter;
  });

  const retestAttempts = userData.retestAttempts || {};
  const masteredRetestCount = notebookQuestions.filter(q => retestAttempts[q.id]?.isCorrect === true).length;

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <NotebookHeader
        totalCount={notebookQuestions.length}
        masteredCount={masteredRetestCount}
        activeReasonFilter={activeReasonFilter}
        onSelectReasonFilter={setActiveReasonFilter}
        onStartDrill={() => notebookQuestions.length > 0 && handleStartRetest(notebookQuestions[0].id)}
      />

      {/* Notebook Questions List */}
      {filteredQuestions.length === 0 ? (
        <EmptyState
          icon={CheckCircle2}
          title={activeReasonFilter === 'all' ? 'Zero Unresolved Errors!' : `No errors tagged under "${activeReasonFilter}"`}
          description="Practice previous year questions in the PYQ tab. Bookmark tough questions or flag incorrect solutions to review and re-test them here."
          actionLabel="Start Practicing PYQs"
          onAction={onNavigateToPractice}
        />
      ) : (
        <div className="space-y-4">
          {filteredQuestions.map((q) => {
            const qid = q.id;
            return (
              <NotebookQuestionCard
                key={qid}
                question={q}
                meta={userData.bookmarkedQuestions?.[qid] || {}}
                isEditingNotes={editingNotesId === qid}
                tempNotes={tempNotes}
                setTempNotes={setTempNotes}
                isRetesting={activeRetestId === qid}
                retestAnswer={retestAnswers[qid]}
                retestResult={retestSubmissions[qid]}
                savedRetest={retestAttempts[qid]}
                currentSolutionTab={activeSolutionTab[qid] || 'step'}
                onUpdateReason={handleUpdateReason}
                onStartRetest={handleStartRetest}
                onCancelRetest={() => setActiveRetestId(null)}
                onRetestInPractice={onRetestInPractice}
                onRemove={handleRemove}
                onSelectRetestOption={(id, optIdx) => setRetestAnswers(prev => ({ ...prev, [id]: optIdx }))}
                onInputRetestTita={(id, val) => setRetestAnswers(prev => ({ ...prev, [id]: val }))}
                onSubmitRetest={handleSubmitRetest}
                onResetRetestSubmission={(id) => {
                  setRetestSubmissions(prev => {
                    const updated = { ...prev };
                    delete updated[id];
                    return updated;
                  });
                  setRetestAnswers(prev => ({ ...prev, [id]: undefined }));
                }}
                onSelectSolutionTab={(id, tab) => setActiveSolutionTab(prev => ({ ...prev, [id]: tab }))}
                onStartEditingNotes={(id, currentNotes) => {
                  setEditingNotesId(id);
                  setTempNotes(currentNotes);
                }}
                onCancelEditingNotes={() => setEditingNotesId(null)}
                onSaveNotes={handleSaveNotes}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};
