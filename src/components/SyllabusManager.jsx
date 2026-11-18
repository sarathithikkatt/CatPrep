import React, { useState } from 'react';
import { 
  BookOpen, 
  CheckCircle2, 
  Circle, 
  Clock, 
  ChevronDown, 
  ChevronRight, 
  Star, 
  Zap, 
  Layers, 
  Search, 
  Filter, 
  CheckSquare, 
  Square, 
  Sparkles, 
  ArrowRight,
  Video,
  Play,
  ArrowUpRight
} from 'lucide-react';
import { EXAMS_CONFIG } from '../data/examsData';
import { QUESTIONS_BANK } from '../data/questionsData';

export const SyllabusManager = ({ 
  activeExamId, 
  userData, 
  onUpdateUserData, 
  onPracticeTopic 
}) => {
  const currentExam = EXAMS_CONFIG.find(e => e.id === activeExamId) || EXAMS_CONFIG[0];
  const [selectedSectionId, setSelectedSectionId] = useState(currentExam.sections[0]?.id || 'qa');
  const [statusFilter, setStatusFilter] = useState('all'); // all, completed, in_progress, not_started
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedTopicId, setExpandedTopicId] = useState(null);

  const activeSection = currentExam.sections.find(s => s.id === selectedSectionId) || currentExam.sections[0];

  const allQuestions = React.useMemo(() => [
    ...QUESTIONS_BANK,
    ...(userData.customQuestions || [])
  ], [userData.customQuestions]);

  // Topic-level question count mapping
  const topicQuestionCounts = React.useMemo(() => {
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
  const sectionQuestionCounts = React.useMemo(() => {
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

  // Status badge style helper
  const getStatusBadge = (status) => {
    switch (status) {
      case 'completed':
        return {
          label: 'Mastered',
          className: 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800'
        };
      case 'in_progress':
        return {
          label: 'In Progress',
          className: 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-800'
        };
      case 'revision':
        return {
          label: 'Revision Due',
          className: 'bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/40 dark:text-rose-300 dark:border-rose-800'
        };
      default:
        return {
          label: 'Not Started',
          className: 'bg-slate-100 text-slate-600 border-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:border-slate-700'
        };
    }
  };

  return (
    <div className="space-y-6">
      {/* Section Tabs & Overview */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-xl font-black text-slate-900 dark:text-white">
              {currentExam.name} Syllabus & Topic Planner
            </h1>
            <p className="text-xs text-slate-400">
              Structured topic breakdown, historical question weightage & mastery tracking
            </p>
          </div>

          {/* Search bar */}
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5 pointer-events-none" />
            <input
              type="text"
              placeholder="Search topics or concepts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-800 dark:text-slate-100 focus:outline-none focus:border-indigo-500 transition-all"
            />
          </div>
        </div>

        {/* Section Pill Selectors */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-100 dark:border-slate-800">
          {currentExam.sections.map((sec) => {
            const isSelected = sec.id === selectedSectionId;
            return (
              <button
                key={sec.id}
                onClick={() => setSelectedSectionId(sec.id)}
                className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl font-bold text-xs transition-all cursor-pointer whitespace-nowrap ${
                  isSelected
                    ? `${sec.bgColor} ${sec.borderColor} ${sec.textColor} border-2 shadow-sm`
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 border border-transparent'
                }`}
              >
                <span>{sec.name}</span>
                <span className="px-1.5 py-0.5 rounded-full text-[10px] bg-black/10 dark:bg-white/10">
                  {sectionQuestionCounts[sec.id] || 0} PYQs
                </span>
              </button>
            );
          })}
        </div>

        {/* Filter by Status */}
        <div className="flex items-center gap-2 pt-4 text-xs">
          <Filter className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-slate-400 font-semibold">Filter:</span>
          {['all', 'completed', 'in_progress', 'not_started'].map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-2.5 py-1 rounded-lg font-semibold capitalize transition ${
                statusFilter === status
                  ? 'bg-slate-800 text-white dark:bg-slate-100 dark:text-slate-900'
                  : 'text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              {status.replace('_', ' ')}
            </button>
          ))}
        </div>
      </div>

      {/* Modules & Topics List */}
      <div className="space-y-5">
        {activeSection.modules.map((module) => {
          // Filter topics by status and search
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
            <div key={module.id} className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
              {/* Module Header */}
              <div className="px-6 py-4 bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    {module.title}
                  </h3>
                  <span className="text-xs text-slate-400">
                    Est. Study Effort: ~{module.estimatedHours} hours • {filteredTopics.length} Topics • {modulePYQCount} PYQs Available
                  </span>
                </div>
              </div>

              {/* Topics Grid */}
              <div className="divide-y divide-slate-100 dark:divide-slate-800">
                {filteredTopics.map((topic) => {
                  const progress = userData.topicProgress?.[topic.id] || {
                    status: 'not_started',
                    confidence: 1,
                    hoursSpent: 0
                  };
                  const isExpanded = expandedTopicId === topic.id;
                  const badge = getStatusBadge(progress.status);
                  const pyqCount = topicQuestionCounts[topic.id] || 0;

                  return (
                    <div key={topic.id} className="p-5 hover:bg-slate-50/60 dark:hover:bg-slate-800/40 transition-colors">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        {/* Title and metadata */}
                        <div className="flex-1">
                          <div className="flex items-center gap-2.5 mb-1.5 flex-wrap">
                            <button
                              onClick={() => setExpandedTopicId(isExpanded ? null : topic.id)}
                              className="font-bold text-sm text-slate-900 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400 flex items-center gap-1.5 text-left"
                            >
                              <span>{topic.title}</span>
                              {isExpanded ? (
                                <ChevronDown className="w-4 h-4 text-slate-400" />
                              ) : (
                                <ChevronRight className="w-4 h-4 text-slate-400" />
                              )}
                            </button>

                            {/* Weightage Badge */}
                            <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-950/50 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
                              {topic.weightage}
                            </span>

                            {/* Difficulty */}
                            <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                              {topic.difficulty}
                            </span>

                            {/* Topic Question Count Badge */}
                            <button
                              onClick={() => onPracticeTopic(topic.id)}
                              title={`Practice ${pyqCount} PYQ${pyqCount === 1 ? '' : 's'} on ${topic.title}`}
                              className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-indigo-50 hover:bg-indigo-100 text-indigo-700 dark:bg-indigo-950/60 dark:hover:bg-indigo-900 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 transition cursor-pointer shadow-xs group"
                            >
                              <Layers className="w-3 h-3 text-indigo-600 dark:text-indigo-400 group-hover:scale-110 transition-transform" />
                              <span>{pyqCount} PYQ{pyqCount === 1 ? '' : 's'}</span>
                            </button>
                          </div>

                          <div className="flex items-center gap-3 text-xs text-slate-400">
                            <span className="flex items-center gap-1">
                              <Clock className="w-3.5 h-3.5" />
                              {progress.hoursSpent || 0} / {topic.hoursNeeded} hrs spent
                            </span>
                            <span>•</span>
                            <span>{topic.subtopics?.length || 0} sub-concepts</span>
                          </div>
                        </div>

                        {/* Status selector & Actions */}
                        <div className="flex items-center gap-2.5 self-start sm:self-auto">
                          {/* Confidence Rating (1-5 stars) */}
                          <div className="flex items-center gap-0.5 mr-2">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <button
                                key={star}
                                onClick={() => handleUpdateTopicProgress(topic.id, { confidence: star })}
                                title={`Confidence: ${star}/5`}
                                className="p-0.5 hover:scale-110 transition cursor-pointer"
                              >
                                <Star
                                  className={`w-3.5 h-3.5 ${
                                    star <= (progress.confidence || 1)
                                      ? 'text-amber-400 fill-amber-400'
                                      : 'text-slate-200 dark:text-slate-700'
                                  }`}
                                />
                              </button>
                            ))}
                          </div>

                          {/* Status Dropdown */}
                          <select
                            value={progress.status}
                            onChange={(e) => handleUpdateTopicProgress(topic.id, { status: e.target.value })}
                            className={`text-xs font-bold px-2.5 py-1.5 rounded-xl border appearance-none cursor-pointer focus:outline-none transition ${badge.className}`}
                          >
                            <option value="not_started">⚪ Not Started</option>
                            <option value="in_progress">🟡 In Progress</option>
                            <option value="completed">🟢 Mastered</option>
                            <option value="revision">🔴 Revision Due</option>
                          </select>

                          {/* Quick Practice Topic Button */}
                          <button
                            onClick={() => onPracticeTopic(topic.id)}
                            title={`Practice ${pyqCount} PYQ${pyqCount === 1 ? '' : 's'} on this topic`}
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-100 dark:hover:bg-indigo-900 border border-indigo-200 dark:border-indigo-800 text-xs font-bold transition shadow-xs cursor-pointer"
                          >
                            <span>Practice</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      {/* Expandable Topic Details (Key Concepts & Subtopics) */}
                      {isExpanded && (
                        <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800/80 space-y-3 bg-slate-50/50 dark:bg-slate-800/20 p-4 rounded-xl">
                          {/* Key Concepts Cheatsheet */}
                          {topic.keyConcepts && (
                            <div>
                              <span className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                                💡 High-Yield Cheatsheet / Formula Concept:
                              </span>
                              <p className="text-xs text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-800 p-2.5 rounded-lg border border-slate-200 dark:border-slate-700 leading-relaxed font-mono">
                                {topic.keyConcepts}
                              </p>
                            </div>
                          )}

                          {/* Subtopics Checklist */}
                          {topic.subtopics && topic.subtopics.length > 0 && (
                            <div>
                              <span className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1.5">
                                Sub-modules & Problem Types:
                              </span>
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                                {topic.subtopics.map((st, i) => (
                                  <div key={i} className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400">
                                    <div className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                                    <span>{st}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Curated Video Masterclasses from Top Mentors */}
                          {topic.lectures && topic.lectures.length > 0 && (
                            <div className="pt-1">
                              <span className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-2 flex items-center gap-1.5">
                                <Video className="w-3.5 h-3.5 text-red-500" />
                                <span>Curated Video Masterclasses (Free on YouTube):</span>
                              </span>
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                {topic.lectures.map((lec, lIdx) => (
                                  <a
                                    key={lIdx}
                                    href={lec.url}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="flex items-center justify-between p-2.5 rounded-xl border border-slate-200 dark:border-slate-700/80 bg-white dark:bg-slate-800 hover:border-red-400 dark:hover:border-red-500/80 transition-all shadow-xs group"
                                  >
                                    <div className="flex items-center gap-2.5 overflow-hidden">
                                      <div className="w-7 h-7 rounded-lg bg-red-50 dark:bg-red-950/60 text-red-600 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                                        <Play className="w-3.5 h-3.5 fill-red-600" />
                                      </div>
                                      <div className="truncate">
                                        <span className="text-xs font-bold text-slate-800 dark:text-slate-200 block truncate group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors">
                                          {lec.title}
                                        </span>
                                        <span className="text-[10px] text-slate-400 font-medium">
                                          {lec.educator} • {lec.duration}
                                        </span>
                                      </div>
                                    </div>
                                    <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-red-500 shrink-0 ml-1.5 transition-colors" />
                                  </a>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Hour logger for topic */}
                          <div className="flex items-center gap-3 pt-2 text-xs">
                            <span className="text-slate-500 font-medium">Logged study effort:</span>
                            <div className="flex items-center gap-1.5">
                              <button
                                onClick={() => handleUpdateTopicProgress(topic.id, { 
                                  hoursSpent: Math.max(0, (progress.hoursSpent || 0) + 1) 
                                })}
                                className="px-2 py-0.5 rounded bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-bold hover:bg-slate-100"
                              >
                                +1 Hour
                              </button>
                              <button
                                onClick={() => handleUpdateTopicProgress(topic.id, { 
                                  hoursSpent: Math.max(0, (progress.hoursSpent || 0) + 2) 
                                })}
                                className="px-2 py-0.5 rounded bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-bold hover:bg-slate-100"
                              >
                                +2 Hours
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
