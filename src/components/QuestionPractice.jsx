import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { 
  CheckCircle2, 
  XCircle, 
  Bookmark, 
  HelpCircle, 
  Zap, 
  AlertTriangle, 
  ChevronDown, 
  ChevronUp, 
  Filter, 
  Search, 
  Plus, 
  Clock, 
  RotateCcw,
  Sparkles,
  BookOpen
} from 'lucide-react';
import { QUESTIONS_BANK } from '../data/questionsData';
import { MathText } from './MathText';

export const QuestionPractice = ({ 
  activeExamId, 
  initialTopicFilter = 'all', 
  userData, 
  onUpdateUserData 
}) => {
  const [selectedSection, setSelectedSection] = useState('all'); // all, qa, dilr, varc
  const [selectedTopic, setSelectedTopic] = useState(initialTopicFilter);
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all'); // all, unattempted, correct, incorrect, bookmarked
  const [selectedYear, setSelectedYear] = useState('all');
  const [userAnswers, setUserAnswers] = useState({}); // { [qid]: selectedOptionIndex | string }
  const [submittedQuestions, setSubmittedQuestions] = useState({}); // { [qid]: boolean }
  const [activeSolutionTab, setActiveSolutionTab] = useState({}); // { [qid]: 'step' | 'shortcut' | 'concept' | 'traps' }
  const [showAddModal, setShowAddModal] = useState(false);

  // New Custom Question Form State
  const [newQuestion, setNewQuestion] = useState({
    sectionId: 'qa',
    topicName: 'Algebra',
    year: 2024,
    slot: 'Slot 1',
    type: 'MCQ',
    difficulty: 'Moderate',
    question: '',
    options: ['', '', '', ''],
    correctAnswer: 0,
    solution: {
      coreConcept: '',
      stepByStep: '',
      shortcut: '',
      pitfalls: ''
    }
  });

  const allQuestions = [...QUESTIONS_BANK, ...(userData.customQuestions || [])];

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

  // Handle Option Pick
  const handleSelectOption = (qid, optionIndexOrVal) => {
    if (submittedQuestions[qid]) return; // lock once submitted
    setUserAnswers(prev => ({ ...prev, [qid]: optionIndexOrVal }));
  };

  // Submit Answer
  const handleSubmitAnswer = (q) => {
    const qid = q.id;
    const answer = userAnswers[qid];
    if (answer === undefined || answer === '') return;

    let isCorrect = false;
    if (q.type === 'MCQ') {
      isCorrect = parseInt(answer, 10) === q.correctAnswer;
    } else {
      // TITA: trim and compare string
      isCorrect = answer.toString().trim().toLowerCase() === q.correctAnswer.toString().trim().toLowerCase();
    }

    setSubmittedQuestions(prev => ({ ...prev, [qid]: true }));

    // Confetti on correct answer
    if (isCorrect) {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 }
      });
    }

    // Update User Data Daily Logs & Question Attempts
    const today = new Date().toISOString().split('T')[0];
    const updatedDailyLogs = { ...userData.dailyLogs };
    const currentDayLog = updatedDailyLogs[today] || {
      questionsSolved: 0,
      correctCount: 0,
      incorrectCount: 0,
      minutesSpent: 0
    };

    // Only increment daily counts if not previously attempted today
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

    onUpdateUserData({
      ...userData,
      dailyLogs: updatedDailyLogs,
      questionAttempts: updatedAttempts
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

  return (
    <div className="space-y-6">
      {/* Filters Header */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
          <div>
            <h1 className="text-xl font-black text-slate-900 dark:text-white">
              Previous Year Questions (PYQs) & Practice
            </h1>
            <p className="text-xs text-slate-400">
              Filtered by authentic CAT slots (2020-2024) with instant evaluation & 4-tier solutions
            </p>
          </div>

          <button
            onClick={() => setShowAddModal(true)}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-sm transition"
          >
            <Plus className="w-4 h-4" />
            <span>Add Custom Question</span>
          </button>
        </div>

        {/* Filter Controls Row */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 pt-2">
          {/* Section Filter */}
          <div>
            <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">Section</label>
            <select
              value={selectedSection}
              onChange={(e) => setSelectedSection(e.target.value)}
              className="w-full text-xs font-semibold px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-200 focus:outline-none"
            >
              <option value="all">All Sections</option>
              <option value="qa">Quantitative Aptitude (QA)</option>
              <option value="dilr">Data Interpretation & LR</option>
              <option value="varc">Verbal Ability & RC</option>
            </select>
          </div>

          {/* Difficulty Filter */}
          <div>
            <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">Difficulty</label>
            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="w-full text-xs font-semibold px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-200 focus:outline-none"
            >
              <option value="all">All Difficulties</option>
              <option value="easy">Easy</option>
              <option value="moderate">Moderate</option>
              <option value="hard">Hard</option>
              <option value="challenging">Challenging</option>
            </select>
          </div>

          {/* Year Filter */}
          <div>
            <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">Exam Year</label>
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="w-full text-xs font-semibold px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-200 focus:outline-none"
            >
              <option value="all">All Years</option>
              <option value="2024">CAT 2024</option>
              <option value="2023">CAT 2023</option>
              <option value="2022">CAT 2022</option>
              <option value="2021">CAT 2021</option>
            </select>
          </div>

          {/* Status Filter */}
          <div>
            <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">Status</label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full text-xs font-semibold px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-200 focus:outline-none"
            >
              <option value="all">All Questions</option>
              <option value="unattempted">Unattempted</option>
              <option value="correct">Solved Correct</option>
              <option value="incorrect">Solved Incorrect</option>
              <option value="bookmarked">Bookmarked</option>
            </select>
          </div>

          {/* Reset Filters */}
          <div className="flex items-end">
            <button
              onClick={() => {
                setSelectedSection('all');
                setSelectedTopic('all');
                setSelectedDifficulty('all');
                setSelectedYear('all');
                setStatusFilter('all');
              }}
              className="w-full py-1.5 px-3 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 text-xs font-semibold flex items-center justify-center gap-1 transition"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          </div>
        </div>
      </div>

      {/* Questions Count Indicator */}
      <div className="text-xs font-bold text-slate-500 px-1">
        Showing {filteredQuestions.length} Questions
      </div>

      {/* Questions List */}
      <div className="space-y-6">
        {filteredQuestions.map((q, index) => {
          const qid = q.id;
          const isSubmitted = submittedQuestions[qid] || !!userData.questionAttempts?.[qid];
          const previousAttempt = userData.questionAttempts?.[qid];
          const isBookmarked = !!userData.bookmarkedQuestions?.[qid];
          const currentAnswer = userAnswers[qid] !== undefined ? userAnswers[qid] : (previousAttempt?.userAnswer ?? '');
          const isCorrect = isSubmitted 
            ? (q.type === 'MCQ' ? parseInt(currentAnswer, 10) === q.correctAnswer : currentAnswer.toString().trim().toLowerCase() === q.correctAnswer.toString().trim().toLowerCase())
            : null;

          const currentTab = activeSolutionTab[qid] || 'step';

          return (
            <div 
              key={qid}
              className={`bg-white dark:bg-slate-900 rounded-2xl border transition-all shadow-sm ${
                isSubmitted
                  ? isCorrect
                    ? 'border-emerald-300 dark:border-emerald-800/80'
                    : 'border-rose-300 dark:border-rose-800/80'
                  : 'border-slate-200 dark:border-slate-800'
              }`}
            >
              {/* Question Header: Badges & Bookmark */}
              <div className="p-5 border-b border-slate-100 dark:border-slate-800/80 flex items-center justify-between flex-wrap gap-2">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xs font-black px-2.5 py-0.5 rounded-md bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900">
                    Q{index + 1}
                  </span>
                  <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
                    CAT {q.year} • {q.slot}
                  </span>
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                    {q.topicName}
                  </span>
                  <span className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-amber-50 dark:bg-amber-950/50 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
                    {q.difficulty}
                  </span>
                  <span className={`text-[11px] font-bold px-2 py-0.5 rounded-md ${
                    q.type === 'TITA' 
                      ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800'
                      : 'text-slate-500 bg-slate-100 dark:bg-slate-800'
                  }`}>
                    {q.type === 'TITA' ? 'TITA (0 Negative Marks)' : 'MCQ (+3 / -1)'}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleToggleBookmark(qid)}
                    title={isBookmarked ? "Remove from Mistake Notebook" : "Save to Mistake Notebook"}
                    className={`p-1.5 rounded-lg border transition ${
                      isBookmarked
                        ? 'bg-amber-50 border-amber-300 text-amber-600 dark:bg-amber-950/40 dark:border-amber-800 dark:text-amber-400'
                        : 'border-slate-200 dark:border-slate-700 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
                    }`}
                  >
                    <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-amber-500' : ''}`} />
                  </button>
                </div>
              </div>

              {/* Question Statement */}
              <div className="p-6">
                <div className="text-sm sm:text-base text-slate-800 dark:text-slate-100 font-medium leading-relaxed mb-6">
                  <MathText text={q.question} />
                </div>

                {/* MCQ Options or TITA Input */}
                {q.type === 'MCQ' ? (
                  <div className="space-y-2.5 mb-6">
                    {q.options.map((opt, optIdx) => {
                      const isSelected = currentAnswer === optIdx || currentAnswer === optIdx.toString();
                      const isOptionCorrect = optIdx === q.correctAnswer;

                      let optionStyle = 'border-slate-200 dark:border-slate-700/80 hover:border-indigo-300 dark:hover:border-indigo-700 bg-white dark:bg-slate-800/60';
                      if (isSubmitted) {
                        if (isOptionCorrect) {
                          optionStyle = 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-200 font-bold';
                        } else if (isSelected && !isOptionCorrect) {
                          optionStyle = 'border-rose-500 bg-rose-50 dark:bg-rose-950/40 text-rose-900 dark:text-rose-200';
                        }
                      } else if (isSelected) {
                        optionStyle = 'border-indigo-600 bg-indigo-50/60 dark:bg-indigo-950/40 text-indigo-900 dark:text-indigo-200 font-semibold ring-2 ring-indigo-500/20';
                      }

                      return (
                        <div
                          key={optIdx}
                          onClick={() => handleSelectOption(qid, optIdx)}
                          className={`flex items-center gap-3 p-3.5 rounded-xl border text-xs sm:text-sm cursor-pointer transition-all ${optionStyle}`}
                        >
                          <div className={`w-6 h-6 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 ${
                            isSelected 
                              ? 'bg-indigo-600 text-white' 
                              : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
                          }`}>
                            {String.fromCharCode(65 + optIdx)}
                          </div>
                          <div className="flex-1">
                            <MathText text={opt} />
                          </div>
                          {isSubmitted && isOptionCorrect && (
                            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                          )}
                          {isSubmitted && isSelected && !isOptionCorrect && (
                            <XCircle className="w-5 h-5 text-rose-600 shrink-0" />
                          )}
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  /* TITA Input Field */
                  <div className="mb-6 flex items-center gap-3 max-w-sm">
                    <label className="text-xs font-bold text-slate-500">Your Answer (TITA):</label>
                    <input
                      type="text"
                      placeholder="Type number or answer..."
                      disabled={isSubmitted}
                      value={currentAnswer}
                      onChange={(e) => handleSelectOption(qid, e.target.value)}
                      className="px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm font-bold text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                )}

                {/* Action Buttons: Submit / Review */}
                <div className="flex items-center justify-between pt-2">
                  {!isSubmitted ? (
                    <button
                      onClick={() => handleSubmitAnswer(q)}
                      disabled={currentAnswer === undefined || currentAnswer === ''}
                      className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white font-bold text-xs shadow-md shadow-indigo-500/20 transition cursor-pointer"
                    >
                      Submit & Evaluate
                    </button>
                  ) : (
                    <div className="flex items-center gap-2">
                      {isCorrect ? (
                        <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-3 py-1.5 rounded-xl border border-emerald-200 dark:border-emerald-800">
                          <CheckCircle2 className="w-4 h-4" />
                          <span>Correct (+3 Marks)</span>
                        </div>
                      ) : (
                        <div className={`inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-xl border ${
                          q.type === 'TITA'
                            ? 'text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/40 border-amber-200 dark:border-amber-800'
                            : 'text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/40 border-rose-200 dark:border-rose-800'
                        }`}>
                          <XCircle className="w-4 h-4" />
                          <span>{q.type === 'TITA' ? 'Incorrect (0 Penalty — TITA Exempt)' : 'Incorrect (-1 Mark Penalty)'}</span>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Toggle Solution Drawer */}
                  {isSubmitted && (
                    <div className="text-xs font-semibold text-slate-400">
                      Solution revealed below 👇
                    </div>
                  )}
                </div>
              </div>

              {/* 4-Tier Solution Drawer */}
              {isSubmitted && q.solution && (
                <div className="border-t border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-900/60 p-6 rounded-b-2xl">
                  {/* Solution Sub-Navigation Tabs */}
                  <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-4 border-b border-slate-200 dark:border-slate-800">
                    <button
                      onClick={() => setActiveSolutionTab(prev => ({ ...prev, [qid]: 'step' }))}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                        currentTab === 'step'
                          ? 'bg-indigo-600 text-white'
                          : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100'
                      }`}
                    >
                      <BookOpen className="w-3.5 h-3.5" />
                      <span>Step-by-Step Solution</span>
                    </button>

                    <button
                      onClick={() => setActiveSolutionTab(prev => ({ ...prev, [qid]: 'shortcut' }))}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                        currentTab === 'shortcut'
                          ? 'bg-amber-500 text-white'
                          : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100'
                      }`}
                    >
                      <Zap className="w-3.5 h-3.5 text-amber-300" />
                      <span>⚡ Exam Pro Shortcut</span>
                    </button>

                    <button
                      onClick={() => setActiveSolutionTab(prev => ({ ...prev, [qid]: 'concept' }))}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                        currentTab === 'concept'
                          ? 'bg-blue-600 text-white'
                          : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100'
                      }`}
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Core Concept & Formula</span>
                    </button>

                    <button
                      onClick={() => setActiveSolutionTab(prev => ({ ...prev, [qid]: 'traps' }))}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                        currentTab === 'traps'
                          ? 'bg-rose-600 text-white'
                          : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100'
                      }`}
                    >
                      <AlertTriangle className="w-3.5 h-3.5" />
                      <span>Trap Alerts</span>
                    </button>
                  </div>

                  {/* Tab Contents */}
                  <div className="bg-white dark:bg-slate-800/90 rounded-xl p-5 border border-slate-200 dark:border-slate-700/80 text-xs sm:text-sm text-slate-800 dark:text-slate-200 leading-relaxed font-sans">
                    {currentTab === 'step' && (
                      <div>
                        <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 block mb-2">
                          Detailed Mathematical & Logical Derivation:
                        </span>
                        <MathText text={q.solution.stepByStep} />
                      </div>
                    )}

                    {currentTab === 'shortcut' && (
                      <div>
                        <span className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 block mb-2">
                          ⚡ Exam-Hall Shortcut (Option Elimination & Fast Speed Technique):
                        </span>
                        <div className="bg-amber-50/60 dark:bg-amber-950/30 p-4 rounded-xl border border-amber-200 dark:border-amber-900/60">
                          <MathText text={q.solution.shortcut} />
                        </div>
                      </div>
                    )}

                    {currentTab === 'concept' && (
                      <div>
                        <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 block mb-2">
                          Theoretical Foundation & Axiom:
                        </span>
                        <div className="p-3 bg-blue-50/50 dark:bg-blue-950/30 rounded-xl border border-blue-200 dark:border-blue-900/50">
                          <MathText text={q.solution.coreConcept} />
                        </div>
                      </div>
                    )}

                    {currentTab === 'traps' && (
                      <div>
                        <span className="text-xs font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400 block mb-2">
                          ⚠️ Common Candidate Pitfalls & Distractor Analysis:
                        </span>
                        <div className="p-3 bg-rose-50/50 dark:bg-rose-950/30 rounded-xl border border-rose-200 dark:border-rose-900/50 text-rose-800 dark:text-rose-200">
                          <MathText text={q.solution.pitfalls} />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Add Custom Question Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-2xl w-full p-6 border border-slate-200 dark:border-slate-800 shadow-2xl max-h-[90vh] overflow-y-auto space-y-4">
            <div className="flex items-center justify-between border-b pb-3 border-slate-100 dark:border-slate-800">
              <h2 className="text-base font-bold text-slate-900 dark:text-white">
                Add New Question to Bank
              </h2>
              <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-slate-700">✕</button>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div>
                <label className="font-bold text-slate-600 dark:text-slate-300 block mb-1">Section</label>
                <select
                  value={newQuestion.sectionId}
                  onChange={(e) => setNewQuestion({ ...newQuestion, sectionId: e.target.value })}
                  className="w-full p-2 rounded-lg border bg-slate-50 dark:bg-slate-800"
                >
                  <option value="qa">Quantitative Aptitude</option>
                  <option value="dilr">DILR</option>
                  <option value="varc">VARC</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-slate-600 dark:text-slate-300 block mb-1">Topic Name</label>
                <input
                  type="text"
                  placeholder="e.g. Time Speed Distance"
                  value={newQuestion.topicName}
                  onChange={(e) => setNewQuestion({ ...newQuestion, topicName: e.target.value })}
                  className="w-full p-2 rounded-lg border bg-slate-50 dark:bg-slate-800"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-600 dark:text-slate-300 block mb-1">Question Statement</label>
              <textarea
                rows={3}
                placeholder="Type question statement (Supports LaTeX with $...$)"
                value={newQuestion.question}
                onChange={(e) => setNewQuestion({ ...newQuestion, question: e.target.value })}
                className="w-full p-2.5 rounded-lg border bg-slate-50 dark:bg-slate-800 text-xs"
              />
            </div>

            {/* Options */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-600 dark:text-slate-300 block">Options (A, B, C, D)</label>
              {newQuestion.options.map((opt, i) => (
                <div key={i} className="flex items-center gap-2">
                  <span className="text-xs font-bold w-4">{String.fromCharCode(65 + i)}</span>
                  <input
                    type="text"
                    value={opt}
                    onChange={(e) => {
                      const updated = [...newQuestion.options];
                      updated[i] = e.target.value;
                      setNewQuestion({ ...newQuestion, options: updated });
                    }}
                    placeholder={`Option ${String.fromCharCode(65 + i)}`}
                    className="flex-1 p-2 rounded-lg border bg-slate-50 dark:bg-slate-800 text-xs"
                  />
                  <input
                    type="radio"
                    name="correctOpt"
                    checked={newQuestion.correctAnswer === i}
                    onChange={() => setNewQuestion({ ...newQuestion, correctAnswer: i })}
                  />
                </div>
              ))}
            </div>

            <div>
              <label className="text-xs font-bold text-slate-600 dark:text-slate-300 block mb-1">Step-by-Step Solution</label>
              <textarea
                rows={3}
                placeholder="Detailed steps..."
                value={newQuestion.solution.stepByStep}
                onChange={(e) => setNewQuestion({
                  ...newQuestion,
                  solution: { ...newQuestion.solution, stepByStep: e.target.value }
                })}
                className="w-full p-2.5 rounded-lg border bg-slate-50 dark:bg-slate-800 text-xs"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 rounded-lg border text-xs font-bold text-slate-500"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  const custom = {
                    ...newQuestion,
                    id: `custom-${Date.now()}`,
                    examId: activeExamId
                  };
                  const updatedCustom = [...(userData.customQuestions || []), custom];
                  onUpdateUserData({ ...userData, customQuestions: updatedCustom });
                  setShowAddModal(false);
                }}
                className="px-4 py-2 rounded-lg bg-indigo-600 text-white text-xs font-bold"
              >
                Save to Bank
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
