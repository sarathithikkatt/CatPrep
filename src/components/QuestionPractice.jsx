import React, { useState, useEffect, useRef } from 'react';
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
  BookOpen,
  Image as ImageIcon,
  UploadCloud,
  Loader2,
  Trash2,
  Settings,
  ExternalLink
} from 'lucide-react';
import { QUESTIONS_BANK } from '../data/questionsData';
import { EXAMS_CONFIG } from '../data/examsData';
import { MathText } from './MathText';
import { analyzeQuestionScreenshot, getGeminiApiKey } from '../utils/gemini';

export const QuestionPractice = ({ 
  activeExamId, 
  initialTopicFilter = 'all', 
  retestQuestionId = null,
  onClearRetest,
  onOpenSettings,
  userData, 
  onUpdateUserData 
}) => {
  const currentExam = EXAMS_CONFIG.find(e => e.id === activeExamId) || EXAMS_CONFIG[0];
  const [selectedSection, setSelectedSection] = useState('all'); // all, qa, dilr, varc...
  const [selectedTopic, setSelectedTopic] = useState(initialTopicFilter);
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all'); // all, unattempted, correct, incorrect, bookmarked
  const [selectedYear, setSelectedYear] = useState('all');
  const [userAnswers, setUserAnswers] = useState({}); // { [qid]: selectedOptionIndex | string }
  const [submittedQuestions, setSubmittedQuestions] = useState({}); // { [qid]: boolean }
  const [retestingQuestions, setRetestingQuestions] = useState({}); // { [qid]: boolean }
  const [activeSolutionTab, setActiveSolutionTab] = useState({}); // { [qid]: 'step' | 'shortcut' | 'concept' | 'traps' }
  const [showAddModal, setShowAddModal] = useState(false);
  const [isAiAnalyzing, setIsAiAnalyzing] = useState(false);
  const [aiError, setAiError] = useState(null);

  const fileInputRef = useRef(null);

  // New Custom Question Form State
  const [newQuestion, setNewQuestion] = useState({
    sectionId: currentExam.sections[0]?.id || 'qa',
    topicName: '',
    topicId: '',
    year: 2024,
    slot: 'Slot 1',
    type: 'MCQ',
    difficulty: 'Moderate',
    question: '',
    options: ['', '', '', ''],
    correctAnswer: 0,
    imageBase64: '',
    imageMime: 'image/png',
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

  // Reset filter when exam target changes
  useEffect(() => {
    setSelectedSection('all');
    setSelectedTopic('all');
  }, [activeExamId]);

  // Retest navigation effect
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
  }, [retestQuestionId]);

  // Image paste handler for custom question modal
  const handleImageFile = (file) => {
    if (!file || !file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      setNewQuestion(prev => ({
        ...prev,
        imageBase64: e.target.result,
        imageMime: file.type
      }));
      setAiError(null);
    };
    reader.readAsDataURL(file);
  };

  const handlePaste = (e) => {
    const items = e.clipboardData?.items;
    if (!items) return;
    for (const item of items) {
      if (item.type.indexOf('image') !== -1) {
        const file = item.getAsFile();
        handleImageFile(file);
        break;
      }
    }
  };

  // AI Auto-solve via Gemini Vision
  const handleAutoSolveWithGemini = async () => {
    if (!newQuestion.imageBase64 && !newQuestion.question) {
      setAiError('Please paste an image screenshot or enter question text first.');
      return;
    }
    const apiKey = getGeminiApiKey();
    if (!apiKey) {
      if (onOpenSettings) {
        onOpenSettings();
      } else {
        alert('Please configure your Gemini API Key in AI Settings first.');
      }
      return;
    }

    setIsAiAnalyzing(true);
    setAiError(null);
    try {
      const result = await analyzeQuestionScreenshot({
        imageBase64: newQuestion.imageBase64 || '',
        mimeType: newQuestion.imageMime || 'image/png',
        questionHint: newQuestion.question || '',
        examId: activeExamId
      });

      setNewQuestion(prev => ({
        ...prev,
        sectionId: result.sectionId || prev.sectionId,
        topicId: result.topicId || prev.topicId,
        topicName: result.topicName || prev.topicName || 'General Practice',
        difficulty: result.difficulty || prev.difficulty,
        type: result.type || prev.type,
        question: result.question || prev.question,
        options: result.options && result.options.length > 0 ? result.options : prev.options,
        correctAnswer: typeof result.correctAnswer === 'number' ? result.correctAnswer : 0,
        solution: {
          coreConcept: result.solution?.coreConcept || '',
          stepByStep: result.solution?.stepByStep || '',
          shortcut: result.solution?.shortcut || '',
          pitfalls: result.solution?.pitfalls || ''
        }
      }));
    } catch (err) {
      setAiError(err.message || 'Gemini analysis failed');
    } finally {
      setIsAiAnalyzing(false);
    }
  };

  // Handle Option Pick
  const handleSelectOption = (qid, optionIndexOrVal) => {
    const isRetesting = !!retestingQuestions[qid];
    if (submittedQuestions[qid] && !isRetesting) return;
    setUserAnswers(prev => ({ ...prev, [qid]: optionIndexOrVal }));
  };

  // Re-attempt / Re-test fresh attempt
  const handleRetestQuestion = (qid) => {
    setUserAnswers(prev => {
      const updated = { ...prev };
      delete updated[qid];
      return updated;
    });
    setSubmittedQuestions(prev => ({ ...prev, [qid]: false }));
    setRetestingQuestions(prev => ({ ...prev, [qid]: true }));
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
      isCorrect = answer.toString().trim().toLowerCase() === q.correctAnswer.toString().trim().toLowerCase();
    }

    const wasRetesting = !!retestingQuestions[qid];
    setSubmittedQuestions(prev => ({ ...prev, [qid]: true }));
    if (wasRetesting) {
      setRetestingQuestions(prev => ({ ...prev, [qid]: false }));
    }

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

  return (
    <div className="space-y-6">
      {/* Filters Header */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
          <div>
            <h1 className="text-xl font-black text-slate-900 dark:text-white">
              {currentExam.name} Practice & Solutions
            </h1>
            <p className="text-xs text-slate-400">
              Authentic past paper questions & sectional drills with instant evaluation & 4-tier solutions
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setNewQuestion(prev => ({
                  ...prev,
                  sectionId: currentExam.sections[0]?.id || 'qa'
                }));
                setShowAddModal(true);
              }}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-sm transition cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Add Custom / Screenshot</span>
            </button>
          </div>
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
              {currentExam.sections.map(s => (
                <option key={s.id} value={s.id}>{s.name}</option>
              ))}
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
              <option value="challenging">Challenging</option>
            </select>
          </div>

          {/* Status Filter */}
          <div>
            <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">Attempt Status</label>
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

          {/* Year Filter */}
          <div>
            <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">Year</label>
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="w-full text-xs font-semibold px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-200 focus:outline-none"
            >
              <option value="all">All Years</option>
              <option value="2024">2024</option>
              <option value="2023">2023</option>
              <option value="2022">2022</option>
              <option value="2021">2021</option>
              <option value="2020">2020</option>
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
              className="w-full py-1.5 px-3 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 text-xs font-semibold flex items-center justify-center gap-1 transition cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          </div>
        </div>
      </div>

      {/* Questions Count Indicator */}
      <div className="text-xs font-bold text-slate-500 px-1">
        Showing {filteredQuestions.length} Questions for {currentExam.name}
      </div>

      {/* Questions List */}
      <div className="space-y-6">
        {filteredQuestions.length === 0 ? (
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-12 text-center border border-dashed border-slate-300 dark:border-slate-800">
            <div className="w-12 h-12 rounded-full bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 flex items-center justify-center mx-auto mb-3">
              <BookOpen className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-800 dark:text-slate-200 mb-1">
              No Questions Match Your Filter
            </h3>
            <p className="text-xs text-slate-400 max-w-md mx-auto mb-4">
              Try resetting your section or difficulty filters, or click below to paste mock screenshots with Gemini AI.
            </p>
            <button
              onClick={() => {
                setSelectedSection('all');
                setSelectedTopic('all');
                setSelectedDifficulty('all');
                setSelectedYear('all');
                setStatusFilter('all');
              }}
              className="px-4 py-2 rounded-xl bg-indigo-600 text-white font-bold text-xs shadow-sm hover:bg-indigo-700 cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
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

            const currentTab = activeSolutionTab[qid] || 'step';
            const examLabel = q.examId ? q.examId.toUpperCase() : 'CAT';

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
                      {examLabel} {q.year} • {q.slot}
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
                      {q.type === 'TITA' ? 'TITA (0 Negative Marks)' : (q.options?.length === 5 ? 'MCQ (+3 / -1) • 5 Options' : 'MCQ (+3 / -1)')}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleToggleBookmark(qid)}
                      title={isBookmarked ? "Remove from Mistake Notebook" : "Save to Mistake Notebook"}
                      className={`p-1.5 rounded-lg border transition cursor-pointer ${
                        isBookmarked
                          ? 'bg-amber-50 border-amber-300 text-amber-600 dark:bg-amber-950/40 dark:border-amber-800 dark:text-amber-400'
                          : 'border-slate-200 dark:border-slate-700 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
                      }`}
                    >
                      <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-amber-500' : ''}`} />
                    </button>
                  </div>
                </div>

                {/* Question Statement & Image */}
                <div className="p-6">
                  {/* Screenshot thumbnail if present */}
                  {(q.imageBase64 || q.imageUrl) && (
                    <div className="mb-4 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700 max-w-xl">
                      <img 
                        src={q.imageBase64 || q.imageUrl} 
                        alt="Question Screenshot" 
                        className="w-full h-auto object-contain bg-slate-50 dark:bg-slate-800 cursor-pointer hover:opacity-95 transition"
                        onClick={() => window.open(q.imageBase64 || q.imageUrl, '_blank')}
                      />
                      <div className="p-1.5 bg-slate-100 dark:bg-slate-800 text-[10px] text-slate-500 text-center font-semibold">
                        Screenshot attached • Click to view full image
                      </div>
                    </div>
                  )}

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
                          optionStyle = 'border-indigo-600 bg-indigo-50/50 dark:bg-indigo-950/40 text-indigo-900 dark:text-indigo-200 font-bold ring-2 ring-indigo-500/20';
                        }

                        return (
                          <button
                            key={optIdx}
                            disabled={isSubmitted}
                            onClick={() => handleSelectOption(qid, optIdx)}
                            className={`w-full text-left p-3.5 rounded-xl border transition-all flex items-start gap-3 cursor-pointer ${optionStyle}`}
                          >
                            <span className={`w-5 h-5 rounded-full flex items-center justify-center text-xs shrink-0 font-bold ${
                              isSelected
                                ? 'bg-indigo-600 text-white'
                                : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
                            }`}>
                              {String.fromCharCode(65 + optIdx)}
                            </span>
                            <div className="flex-1 text-xs sm:text-sm">
                              <MathText text={opt} />
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="mb-6 space-y-2">
                      <label className="text-xs font-bold text-slate-600 dark:text-slate-300 block">
                        Numerical Answer (TITA):
                      </label>
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
                      <div className="flex items-center gap-2.5 flex-wrap">
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

                        <button
                          onClick={() => handleRetestQuestion(qid)}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold text-xs transition cursor-pointer"
                          title="Clear previous attempt and re-test this question fresh"
                        >
                          <RotateCcw className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                          <span>Re-attempt Question</span>
                        </button>
                      </div>
                    )}

                    {/* Solution indicator */}
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
                        <Zap className="w-3.5 h-3.5" />
                        <span>Exam Pro Shortcut</span>
                      </button>

                      <button
                        onClick={() => setActiveSolutionTab(prev => ({ ...prev, [qid]: 'concept' }))}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                          currentTab === 'concept'
                            ? 'bg-blue-600 text-white'
                            : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100'
                        }`}
                      >
                        <HelpCircle className="w-3.5 h-3.5" />
                        <span>Core Concept</span>
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
          })
        )}
      </div>

      {/* Add Custom Question / Screenshot OCR Modal */}
      {showAddModal && (
        <div 
          onPaste={handlePaste}
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
        >
          <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-2xl w-full p-6 border border-slate-200 dark:border-slate-800 shadow-2xl max-h-[90vh] overflow-y-auto space-y-4">
            <div className="flex items-center justify-between border-b pb-3 border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-bold text-xs">
                  {currentExam.id.toUpperCase()}
                </div>
                <div>
                  <h2 className="text-base font-bold text-slate-900 dark:text-white">
                    Add Question & Mock Screenshot OCR
                  </h2>
                  <span className="text-[11px] text-slate-400">
                    Paste screenshot (Ctrl+V) or let Gemini AI transcribe and draft 4-tier solutions
                  </span>
                </div>
              </div>
              <button 
                onClick={() => setShowAddModal(false)} 
                className="text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 cursor-pointer font-bold"
              >
                ✕
              </button>
            </div>

            {/* SCREENSHOT PASTE & DRAG-AND-DROP ZONE */}
            <div className="space-y-3">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block">
                Question Screenshot (Clipboard Paste or Drag-and-Drop)
              </label>

              {newQuestion.imageBase64 ? (
                <div className="relative rounded-xl border border-indigo-200 dark:border-indigo-800 bg-indigo-50/40 dark:bg-indigo-950/30 p-3 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3 overflow-hidden">
                    <img 
                      src={newQuestion.imageBase64} 
                      alt="Uploaded Preview" 
                      className="w-16 h-16 object-cover rounded-lg border border-slate-200 dark:border-slate-700 shrink-0"
                    />
                    <div className="truncate">
                      <span className="text-xs font-bold text-slate-800 dark:text-slate-200 block truncate">
                        Screenshot Captured from Clipboard / File
                      </span>
                      <span className="text-[11px] text-emerald-600 font-semibold">
                        Ready for Gemini OCR & Auto-Solve
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      type="button"
                      onClick={() => setNewQuestion(prev => ({ ...prev, imageBase64: '' }))}
                      className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg transition"
                      title="Remove image"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ) : (
                <div 
                  onClick={() => fileInputRef.current?.click()}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => {
                    e.preventDefault();
                    if (e.dataTransfer.files?.[0]) handleImageFile(e.dataTransfer.files[0]);
                  }}
                  className="border-2 border-dashed border-slate-300 dark:border-slate-700 hover:border-indigo-500 rounded-xl p-5 text-center cursor-pointer transition bg-slate-50/50 dark:bg-slate-800/40 group"
                >
                  <UploadCloud className="w-8 h-8 text-slate-400 group-hover:text-indigo-600 mx-auto mb-2 transition" />
                  <p className="text-xs font-bold text-slate-700 dark:text-slate-200">
                    Paste mock screenshot (<kbd className="px-1 py-0.5 rounded bg-white dark:bg-slate-800 border text-[10px]">Ctrl+V</kbd>) or click to browse
                  </p>
                  <span className="text-[10px] text-slate-400">
                    Supports PNG, JPEG, WebP mock screenshots from IMS, TIME, CL, Cracku
                  </span>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      if (e.target.files?.[0]) handleImageFile(e.target.files[0]);
                    }}
                    className="hidden"
                  />
                </div>
              )}

              {/* Gemini Auto-Solve Button */}
              <div className="flex items-center justify-between flex-wrap gap-2">
                <button
                  type="button"
                  disabled={isAiAnalyzing}
                  onClick={handleAutoSolveWithGemini}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 hover:from-indigo-700 hover:to-purple-700 text-white font-bold text-xs shadow-md shadow-indigo-500/20 flex items-center gap-2 transition cursor-pointer disabled:opacity-50"
                >
                  {isAiAnalyzing ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Transcribing & Drafting 4-Tier Solution...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 text-amber-300" />
                      <span>✨ Auto-Solve with Gemini AI</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={onOpenSettings}
                  className="text-[11px] font-semibold text-slate-500 hover:text-indigo-600 flex items-center gap-1 cursor-pointer"
                >
                  <Settings className="w-3.5 h-3.5" />
                  <span>Configure Gemini API Key</span>
                </button>
              </div>

              {aiError && (
                <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-300 dark:border-rose-800 text-xs text-rose-700 dark:text-rose-300 flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold block">AI Processing Notice:</span>
                    <span>{aiError}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Section & Topic Controls */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs pt-2">
              <div>
                <label className="font-bold text-slate-600 dark:text-slate-300 block mb-1">Target Section</label>
                <select
                  value={newQuestion.sectionId}
                  onChange={(e) => setNewQuestion({ ...newQuestion, sectionId: e.target.value })}
                  className="w-full p-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-semibold"
                >
                  {currentExam.sections.map(s => (
                    <option key={s.id} value={s.id}>{s.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="font-bold text-slate-600 dark:text-slate-300 block mb-1">Topic Name</label>
                <input
                  type="text"
                  placeholder="e.g. Time Speed Distance"
                  value={newQuestion.topicName}
                  onChange={(e) => setNewQuestion({ ...newQuestion, topicName: e.target.value })}
                  className="w-full p-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-semibold"
                />
              </div>

              <div>
                <label className="font-bold text-slate-600 dark:text-slate-300 block mb-1">Question Type</label>
                <select
                  value={newQuestion.type}
                  onChange={(e) => setNewQuestion({ ...newQuestion, type: e.target.value })}
                  className="w-full p-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-semibold"
                >
                  <option value="MCQ">MCQ (Multiple Choice)</option>
                  <option value="TITA">TITA (Type in Answer)</option>
                </select>
              </div>
            </div>

            {/* Question Statement */}
            <div>
              <label className="text-xs font-bold text-slate-600 dark:text-slate-300 block mb-1">
                Question Statement (LaTeX supported via $...$)
              </label>
              <textarea
                rows={3}
                placeholder="Type question statement or let Gemini Vision transcribe it above..."
                value={newQuestion.question}
                onChange={(e) => setNewQuestion({ ...newQuestion, question: e.target.value })}
                className="w-full p-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-800 dark:text-slate-200 leading-relaxed font-mono"
              />
            </div>

            {/* Options (for MCQ) */}
            {newQuestion.type === 'MCQ' && (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-slate-600 dark:text-slate-300">
                    Options (Select radio button for the correct key)
                  </label>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setNewQuestion(prev => ({ ...prev, options: [...prev.options, ''] }))}
                      className="text-[11px] font-bold text-indigo-600 hover:underline cursor-pointer"
                    >
                      + Add Option
                    </button>
                    {newQuestion.options.length > 2 && (
                      <button
                        type="button"
                        onClick={() => setNewQuestion(prev => ({ ...prev, options: prev.options.slice(0, -1) }))}
                        className="text-[11px] font-bold text-rose-500 hover:underline cursor-pointer"
                      >
                        - Remove Option
                      </button>
                    )}
                  </div>
                </div>

                {newQuestion.options.map((opt, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <span className="text-xs font-bold w-4 text-slate-500">{String.fromCharCode(65 + i)}</span>
                    <input
                      type="text"
                      value={opt}
                      onChange={(e) => {
                        const updated = [...newQuestion.options];
                        updated[i] = e.target.value;
                        setNewQuestion({ ...newQuestion, options: updated });
                      }}
                      placeholder={`Option ${String.fromCharCode(65 + i)}`}
                      className="flex-1 p-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-800 dark:text-slate-200"
                    />
                    <input
                      type="radio"
                      name="correctOpt"
                      checked={newQuestion.correctAnswer === i}
                      onChange={() => setNewQuestion({ ...newQuestion, correctAnswer: i })}
                      title={`Mark ${String.fromCharCode(65 + i)} as correct`}
                      className="w-4 h-4 cursor-pointer"
                    />
                  </div>
                ))}
              </div>
            )}

            {/* TITA Correct Value */}
            {newQuestion.type === 'TITA' && (
              <div>
                <label className="text-xs font-bold text-slate-600 dark:text-slate-300 block mb-1">
                  Correct Numerical Value (TITA)
                </label>
                <input
                  type="text"
                  placeholder="e.g. 15 or 42.5"
                  value={newQuestion.correctAnswer}
                  onChange={(e) => setNewQuestion({ ...newQuestion, correctAnswer: e.target.value })}
                  className="w-full p-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-mono font-bold"
                />
              </div>
            )}

            {/* 4-Tier Solutions Inputs */}
            <div className="space-y-3 pt-2 border-t border-slate-100 dark:border-slate-800">
              <span className="text-xs font-black uppercase tracking-wider text-slate-500 block">
                Structured 4-Tier Solution
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="font-bold text-blue-600 dark:text-blue-400 block mb-1">
                    1. Core Concept / Fundamental Rule
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Underlying formula or axiom..."
                    value={newQuestion.solution.coreConcept}
                    onChange={(e) => setNewQuestion({
                      ...newQuestion,
                      solution: { ...newQuestion.solution, coreConcept: e.target.value }
                    })}
                    className="w-full p-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs"
                  />
                </div>

                <div>
                  <label className="font-bold text-amber-600 dark:text-amber-400 block mb-1">
                    2. Exam Pro Shortcut
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Option elimination, boundary value, symmetry..."
                    value={newQuestion.solution.shortcut}
                    onChange={(e) => setNewQuestion({
                      ...newQuestion,
                      solution: { ...newQuestion.solution, shortcut: e.target.value }
                    })}
                    className="w-full p-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-indigo-600 dark:text-indigo-400 block mb-1">
                  3. Rigorous Step-by-Step Derivation
                </label>
                <textarea
                  rows={3}
                  placeholder="Detailed mathematical steps in KaTeX..."
                  value={newQuestion.solution.stepByStep}
                  onChange={(e) => setNewQuestion({
                    ...newQuestion,
                    solution: { ...newQuestion.solution, stepByStep: e.target.value }
                  })}
                  className="w-full p-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-mono"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-rose-600 dark:text-rose-400 block mb-1">
                  4. Trap Alerts & Pitfalls
                </label>
                <textarea
                  rows={2}
                  placeholder="Why are options B or C distractors? Common misreadings..."
                  value={newQuestion.solution.pitfalls}
                  onChange={(e) => setNewQuestion({
                    ...newQuestion,
                    solution: { ...newQuestion.solution, pitfalls: e.target.value }
                  })}
                  className="w-full p-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs"
                />
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex justify-end gap-2 pt-3 border-t border-slate-100 dark:border-slate-800">
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-500 hover:bg-slate-100 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  if (!newQuestion.question.trim()) {
                    alert('Please enter a question statement or upload a screenshot.');
                    return;
                  }
                  const custom = {
                    ...newQuestion,
                    id: `custom-${Date.now()}`,
                    examId: activeExamId,
                    year: newQuestion.year || 2024,
                    slot: newQuestion.slot || 'Custom Drill'
                  };
                  const updatedCustom = [...(userData.customQuestions || []), custom];
                  onUpdateUserData({ ...userData, customQuestions: updatedCustom });
                  setShowAddModal(false);
                }}
                className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-md shadow-indigo-500/20 cursor-pointer"
              >
                Save to Question Bank
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
