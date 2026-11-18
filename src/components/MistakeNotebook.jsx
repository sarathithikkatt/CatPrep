import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { 
  Bookmark, 
  Trash2, 
  CheckCircle2, 
  XCircle,
  AlertTriangle, 
  Tag, 
  BookOpen, 
  Sparkles, 
  RotateCcw,
  Edit3,
  PlayCircle,
  Zap,
  HelpCircle,
  ExternalLink,
  ChevronDown
} from 'lucide-react';
import { QUESTIONS_BANK } from '../data/questionsData';
import { MathText } from './MathText';

const MISTAKE_REASONS = [
  { id: 'concept', label: 'Missing / Weak Concept', color: 'bg-purple-50 text-purple-700 border-purple-200' },
  { id: 'calc', label: 'Calculation Slip', color: 'bg-rose-50 text-rose-700 border-rose-200' },
  { id: 'misread', label: 'Misread Question Statement', color: 'bg-amber-50 text-amber-700 border-amber-200' },
  { id: 'formula', label: 'Formula Forgotten', color: 'bg-blue-50 text-blue-700 border-blue-200' },
  { id: 'panic', label: 'Time Pressure / Guess', color: 'bg-slate-100 text-slate-700 border-slate-300' }
];

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
  const [retestAnswers, setRetestAnswers] = useState({}); // { [qid]: optionIndex | string }
  const [retestSubmissions, setRetestSubmissions] = useState({}); // { [qid]: { isCorrect: boolean } }
  const [activeSolutionTab, setActiveSolutionTab] = useState({}); // { [qid]: tab }

  const allQuestions = [...QUESTIONS_BANK, ...(userData.customQuestions || [])];

  // Questions in notebook are either in bookmarkedQuestions or marked incorrect
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

    // Also mark question as not incorrect if they choose to resolve it
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
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Bookmark className="w-5 h-5 text-amber-500 fill-amber-500" />
              <h1 className="text-xl font-black text-slate-900 dark:text-white">
                Mistake & Revision Notebook
              </h1>
            </div>
            <p className="text-xs text-slate-400">
              The #1 differentiator for 99+ percentile scorers. Re-test errors with answers hidden & confirm true mastery.
            </p>
          </div>

          <div className="flex items-center gap-2.5 flex-wrap">
            <span className="text-xs font-bold px-3 py-1.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
              {notebookQuestions.length} Questions for Revision
            </span>

            {masteredRetestCount > 0 && (
              <span className="text-xs font-bold px-3 py-1.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>{masteredRetestCount} Mastered on Re-test</span>
              </span>
            )}

            {notebookQuestions.length > 0 && (
              <button
                onClick={() => handleStartRetest(notebookQuestions[0].id)}
                className="px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-sm flex items-center gap-1.5 transition cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Start Re-test Drill</span>
              </button>
            )}
          </div>
        </div>

        {/* Filter by Root Cause */}
        <div className="flex items-center gap-2 pt-4 overflow-x-auto text-xs">
          <span className="text-slate-400 font-bold shrink-0">Filter By Cause:</span>
          <button
            onClick={() => setActiveReasonFilter('all')}
            className={`px-3 py-1 rounded-lg font-bold transition shrink-0 cursor-pointer ${
              activeReasonFilter === 'all'
                ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900'
                : 'text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            All Errors ({notebookQuestions.length})
          </button>
          {MISTAKE_REASONS.map((r) => (
            <button
              key={r.id}
              onClick={() => setActiveReasonFilter(r.label)}
              className={`px-2.5 py-1 rounded-lg border font-semibold shrink-0 transition cursor-pointer ${
                activeReasonFilter === r.label
                  ? `${r.color} font-bold ring-2 ring-indigo-500/20`
                  : 'border-slate-200 dark:border-slate-700 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              {r.label}
            </button>
          ))}
        </div>
      </div>

      {/* Notebook Questions List */}
      {filteredQuestions.length === 0 ? (
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-12 text-center border border-dashed border-slate-300 dark:border-slate-800">
          <div className="w-12 h-12 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 flex items-center justify-center mx-auto mb-3">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-slate-800 dark:text-slate-200 mb-1">
            {activeReasonFilter === 'all' ? 'Zero Unresolved Errors!' : `No errors tagged under "${activeReasonFilter}"`}
          </h3>
          <p className="text-xs text-slate-400 max-w-md mx-auto mb-4">
            Practice previous year questions in the PYQ tab. Bookmark tough questions or flag incorrect solutions to review and re-test them here.
          </p>
          <button
            onClick={onNavigateToPractice}
            className="px-4 py-2 rounded-xl bg-indigo-600 text-white font-bold text-xs shadow-sm hover:bg-indigo-700 cursor-pointer"
          >
            Start Practicing PYQs
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredQuestions.map((q) => {
            const qid = q.id;
            const meta = userData.bookmarkedQuestions?.[qid] || {};
            const isEditing = editingNotesId === qid;
            const isRetesting = activeRetestId === qid;
            const retestAnswer = retestAnswers[qid];
            const retestResult = retestSubmissions[qid];
            const savedRetest = retestAttempts[qid];
            const currentTab = activeSolutionTab[qid] || 'step';

            return (
              <div 
                key={qid}
                className={`bg-white dark:bg-slate-900 rounded-2xl border transition-all shadow-sm p-6 space-y-4 ${
                  isRetesting
                    ? 'border-indigo-400 ring-2 ring-indigo-500/20 shadow-md'
                    : savedRetest?.isCorrect
                      ? 'border-emerald-300 dark:border-emerald-800/60'
                      : 'border-slate-200 dark:border-slate-800'
                }`}
              >
                {/* Header */}
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs font-bold px-2.5 py-0.5 rounded-md bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
                      CAT {q.year} • {q.slot}
                    </span>
                    <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                      {q.topicName}
                    </span>
                    <span className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-amber-50 dark:bg-amber-950/50 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
                      {q.difficulty}
                    </span>

                    {/* Retest status indicator */}
                    {savedRetest?.isCorrect ? (
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-md bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                        <CheckCircle2 className="w-3 h-3" />
                        <span>Re-test Mastered ({savedRetest.count}x)</span>
                      </span>
                    ) : savedRetest?.count ? (
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-md bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-800">
                        <AlertTriangle className="w-3 h-3" />
                        <span>Re-test Due ({savedRetest.count} attempt)</span>
                      </span>
                    ) : null}
                  </div>

                  <div className="flex items-center gap-2">
                    {/* Cause Tag Selector */}
                    <select
                      value={meta.reason || 'General Review'}
                      onChange={(e) => handleUpdateReason(qid, e.target.value)}
                      className="text-xs font-semibold px-2.5 py-1 rounded-lg border border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 cursor-pointer"
                    >
                      <option value="General Review">📌 General Review</option>
                      {MISTAKE_REASONS.map(r => (
                        <option key={r.id} value={r.label}>{r.label}</option>
                      ))}
                    </select>

                    {/* Re-test button (when not active) */}
                    {!isRetesting && (
                      <button
                        onClick={() => handleStartRetest(qid)}
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-xs transition cursor-pointer"
                        title="Re-test this question with answers hidden"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>Re-test</span>
                      </button>
                    )}

                    {/* Jump to practice tab */}
                    {onRetestInPractice && (
                      <button
                        onClick={() => onRetestInPractice(qid)}
                        className="p-1.5 rounded-lg text-slate-500 hover:text-indigo-600 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                        title="Open in Practice Workspace"
                      >
                        <PlayCircle className="w-4 h-4 text-indigo-500" />
                      </button>
                    )}

                    <button
                      onClick={() => handleRemove(qid)}
                      title="Mark as Mastered and Remove"
                      className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Question Statement */}
                <div className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 font-medium leading-relaxed">
                  <MathText text={q.question} />
                </div>

                {/* ACTIVE RE-TEST MODE */}
                {isRetesting && (
                  <div className="p-4 rounded-xl bg-indigo-50/60 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800/80 space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-indigo-600 animate-pulse" />
                        <span className="text-xs font-black text-indigo-900 dark:text-indigo-200 uppercase tracking-wider">
                          Active Re-Test Mode — Answer & Solution Hidden
                        </span>
                      </div>
                      <button
                        onClick={() => setActiveRetestId(null)}
                        className="text-xs font-bold text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 cursor-pointer"
                      >
                        Cancel Re-test
                      </button>
                    </div>

                    {/* Options or Input */}
                    {q.type === 'MCQ' ? (
                      <div className="space-y-2">
                        {q.options.map((opt, optIdx) => {
                          const isSelected = retestAnswer === optIdx;
                          return (
                            <button
                              key={optIdx}
                              disabled={!!retestResult}
                              onClick={() => setRetestAnswers(prev => ({ ...prev, [qid]: optIdx }))}
                              className={`w-full text-left p-3 rounded-xl border text-xs sm:text-sm transition flex items-start gap-3 cursor-pointer ${
                                isSelected
                                  ? 'border-indigo-600 bg-white dark:bg-slate-800 ring-2 ring-indigo-500/20 font-bold'
                                  : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-slate-300 text-slate-700 dark:text-slate-200'
                              }`}
                            >
                              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-xs shrink-0 font-bold ${
                                isSelected ? 'bg-indigo-600 text-white' : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
                              }`}>
                                {String.fromCharCode(65 + optIdx)}
                              </span>
                              <div className="flex-1">
                                <MathText text={opt} />
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    ) : (
                      <div>
                        <label className="text-xs font-bold text-slate-600 dark:text-slate-300 block mb-1">
                          Type Your TITA Numerical Answer:
                        </label>
                        <input
                          type="text"
                          disabled={!!retestResult}
                          value={retestAnswer || ''}
                          onChange={(e) => setRetestAnswers(prev => ({ ...prev, [qid]: e.target.value }))}
                          placeholder="e.g. 15 or 4.5"
                          className="px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm font-bold text-slate-900 dark:text-white"
                        />
                      </div>
                    )}

                    {/* Action & Feedback */}
                    {!retestResult ? (
                      <div className="flex items-center gap-2 pt-2">
                        <button
                          onClick={() => handleSubmitRetest(q)}
                          disabled={retestAnswer === undefined || retestAnswer === ''}
                          className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white font-bold text-xs shadow-sm transition cursor-pointer"
                        >
                          Submit Re-Test Attempt
                        </button>
                        <button
                          onClick={() => setActiveRetestId(null)}
                          className="px-3 py-2 rounded-xl text-xs font-semibold text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
                        >
                          Exit
                        </button>
                      </div>
                    ) : (
                      <div className="space-y-3 pt-2">
                        {retestResult.isCorrect ? (
                          <div className="p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800 flex items-center justify-between flex-wrap gap-2">
                            <div className="flex items-center gap-2 text-emerald-800 dark:text-emerald-200">
                              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                              <span className="text-xs font-bold">
                                🎉 Brilliant! You got it right on Re-test. Mastery confirmed!
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => handleRemove(qid)}
                                className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs transition cursor-pointer"
                              >
                                Mark Mastered & Remove
                              </button>
                              <button
                                onClick={() => setActiveRetestId(null)}
                                className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
                              >
                                Keep in Notebook
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div className="p-3.5 rounded-xl bg-rose-50 dark:bg-rose-950/60 border border-rose-300 dark:border-rose-800 flex items-center justify-between flex-wrap gap-2">
                            <div className="flex items-center gap-2 text-rose-800 dark:text-rose-200">
                              <XCircle className="w-5 h-5 text-rose-600 shrink-0" />
                              <span className="text-xs font-bold">
                                Still incorrect on this re-test. Review the pro shortcut and core concept below.
                              </span>
                            </div>
                            <button
                              onClick={() => {
                                setRetestSubmissions(prev => {
                                  const updated = { ...prev };
                                  delete updated[qid];
                                  return updated;
                                });
                                setRetestAnswers(prev => ({ ...prev, [qid]: undefined }));
                              }}
                              className="px-3 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs shadow-xs transition cursor-pointer"
                            >
                              Try Again
                            </button>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}

                {/* Normal Mode: Pro Shortcut Reminder */}
                {!isRetesting && q.solution?.shortcut && (
                  <div className="p-3 bg-amber-50/60 dark:bg-amber-950/30 rounded-xl border border-amber-200 dark:border-amber-900/60 text-xs">
                    <span className="font-bold text-amber-800 dark:text-amber-300 block mb-1">
                      💡 Pro Shortcut to Remember:
                    </span>
                    <MathText text={q.solution.shortcut} />
                  </div>
                )}

                {/* Solution Drawer (shown when re-test is submitted or requested) */}
                {retestResult && q.solution && (
                  <div className="border border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-900/60 p-4 rounded-xl space-y-3">
                    <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-200 dark:border-slate-800">
                      <button
                        onClick={() => setActiveSolutionTab(prev => ({ ...prev, [qid]: 'step' }))}
                        className={`px-2.5 py-1 rounded-lg text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                          currentTab === 'step' ? 'bg-indigo-600 text-white' : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                        }`}
                      >
                        <BookOpen className="w-3 h-3" />
                        <span>Step-by-Step</span>
                      </button>
                      <button
                        onClick={() => setActiveSolutionTab(prev => ({ ...prev, [qid]: 'shortcut' }))}
                        className={`px-2.5 py-1 rounded-lg text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                          currentTab === 'shortcut' ? 'bg-amber-500 text-white' : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                        }`}
                      >
                        <Zap className="w-3 h-3" />
                        <span>Pro Shortcut</span>
                      </button>
                      <button
                        onClick={() => setActiveSolutionTab(prev => ({ ...prev, [qid]: 'concept' }))}
                        className={`px-2.5 py-1 rounded-lg text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                          currentTab === 'concept' ? 'bg-purple-600 text-white' : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                        }`}
                      >
                        <HelpCircle className="w-3 h-3" />
                        <span>Core Concept</span>
                      </button>
                    </div>

                    <div className="text-xs text-slate-700 dark:text-slate-200 leading-relaxed font-mono">
                      {currentTab === 'step' && <MathText text={q.solution.stepByStep} />}
                      {currentTab === 'shortcut' && <MathText text={q.solution.shortcut} />}
                      {currentTab === 'concept' && <MathText text={q.solution.coreConcept} />}
                    </div>
                  </div>
                )}

                {/* Personal Notes / Reflection Area */}
                <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
                  {isEditing ? (
                    <div className="space-y-2">
                      <textarea
                        rows={2}
                        value={tempNotes}
                        onChange={(e) => setTempNotes(e.target.value)}
                        placeholder="Why did you get this wrong? (e.g. Forgot that |x| can be negative, or misread percentage of total vs added)..."
                        className="w-full p-2.5 rounded-lg border text-xs bg-slate-50 dark:bg-slate-800"
                      />
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => setEditingNotesId(null)}
                          className="px-3 py-1 rounded text-xs font-semibold text-slate-500 cursor-pointer"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={() => handleSaveNotes(qid)}
                          className="px-3 py-1 rounded bg-indigo-600 text-white text-xs font-bold cursor-pointer"
                        >
                          Save Reflection
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex-1 mr-4">
                        <span className="font-bold text-slate-500">My Mistake Reflection: </span>
                        <span className="text-slate-700 dark:text-slate-300 italic">
                          {meta.notes ? `"${meta.notes}"` : 'No reflection notes added yet.'}
                        </span>
                      </div>
                      <button
                        onClick={() => {
                          setEditingNotesId(qid);
                          setTempNotes(meta.notes || '');
                        }}
                        className="text-indigo-600 dark:text-indigo-400 font-bold hover:underline flex items-center gap-1 cursor-pointer"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                        <span>{meta.notes ? 'Edit' : 'Add Note'}</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
