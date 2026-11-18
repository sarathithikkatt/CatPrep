import React, { useState } from 'react';
import { 
  Calendar, 
  CheckCircle2, 
  Circle, 
  Clock, 
  Plus, 
  Trash2, 
  Filter, 
  RotateCcw, 
  Sparkles, 
  Award, 
  BookOpen, 
  Zap, 
  Target, 
  CheckSquare, 
  Square,
  HelpCircle,
  ChevronRight
} from 'lucide-react';

export const DEFAULT_REST_PLAN = [
  {
    dayId: 'mon',
    dayName: 'Monday',
    theme: 'Quant Foundations & Arithmetic Drill',
    description: 'Percentages, ratios, profit/loss multiplier formulas & calculation velocity',
    tasks: [
      { id: 't-mon-1', title: 'Revise Percentages, Ratios & Profit/Loss Cheatsheets', section: 'qa', pillar: 'revise', minutes: 30, completed: false },
      { id: 't-mon-2', title: 'Practice 15 Arithmetic PYQs (2020-2024 Slots with Pro Shortcuts)', section: 'qa', pillar: 'enhance', minutes: 45, completed: false },
      { id: 't-mon-3', title: 'Read 1 Aeon Essay or Smithsonian Article (Focus on author tone)', section: 'varc', pillar: 'revise', minutes: 25, completed: false },
      { id: 't-mon-4', title: 'Speed Drill: 15-minute mental math & reciprocal percentage tables', section: 'qa', pillar: 'strategize', minutes: 15, completed: false }
    ]
  },
  {
    dayId: 'tue',
    dayName: 'Tuesday',
    theme: 'DILR Puzzle Anchoring & Para Jumbles',
    description: 'Games & Tournaments logic, matrix matching, and verbal sentence structures',
    tasks: [
      { id: 't-tue-1', title: 'Revise Games & Tournaments Knockout & Round-Robin Rules', section: 'dilr', pillar: 'revise', minutes: 25, completed: false },
      { id: 't-tue-2', title: 'Solve 2 DILR Sets (Complex Seating Arrangement & Missing Value Table)', section: 'dilr', pillar: 'enhance', minutes: 45, completed: false },
      { id: 't-tue-3', title: 'Solve 6 TITA Para Jumbles (Identify mandatory pronoun/noun pairs)', section: 'varc', pillar: 'enhance', minutes: 30, completed: false },
      { id: 't-tue-4', title: 'DILR Anchor Drill: 5-minute set selection evaluation without solving', section: 'dilr', pillar: 'strategize', minutes: 15, completed: false }
    ]
  },
  {
    dayId: 'wed',
    dayName: 'Wednesday',
    theme: 'Algebra Rigor & RC Deep Dive',
    description: 'Quadratic roots, modulus inequalities, and inference-driven RC passages',
    tasks: [
      { id: 't-wed-1', title: 'Revise Algebra Inequalities, Logarithms & Modulus Properties', section: 'qa', pillar: 'revise', minutes: 30, completed: false },
      { id: 't-wed-2', title: 'Practice 12 Algebra PYQs (Functions, Maxima/Minima & Quadratics)', section: 'qa', pillar: 'enhance', minutes: 45, completed: false },
      { id: 't-wed-3', title: 'Solve 2 Full RC Passages with detailed tone and inference analysis', section: 'varc', pillar: 'enhance', minutes: 40, completed: false },
      { id: 't-wed-4', title: 'Option Elimination Drill: Identify trap answer choices in RC options', section: 'varc', pillar: 'strategize', minutes: 15, completed: false }
    ]
  },
  {
    dayId: 'thu',
    dayName: 'Thursday',
    theme: 'Quant Advanced & Venn Diagrams',
    description: 'Time Speed Distance, circular races, and 3-set Maxima/Minima optimization',
    tasks: [
      { id: 't-thu-1', title: 'Revise TSD Races, Escalators & Relative Speed formulas', section: 'qa', pillar: 'revise', minutes: 25, completed: false },
      { id: 't-thu-2', title: 'Solve 10 TSD & Work-Pipes PYQs', section: 'qa', pillar: 'enhance', minutes: 40, completed: false },
      { id: 't-thu-3', title: 'Solve 2 Advanced Venn Diagram (3-Set / 4-Set Maxima-Minima) Sets', section: 'dilr', pillar: 'enhance', minutes: 40, completed: false },
      { id: 't-thu-4', title: 'Time-boxed 20-min Quant Sectional Sprint (Target: 7+ net correct)', section: 'qa', pillar: 'strategize', minutes: 20, completed: false }
    ]
  },
  {
    dayId: 'fri',
    dayName: 'Friday',
    theme: 'Mistake Notebook & Geometry Polish',
    description: 'Active re-testing of errors, geometry visualization, and verbal summary',
    tasks: [
      { id: 't-fri-1', title: 'Mistake Notebook Re-test: Attempt 8 previously flagged questions', section: 'general', pillar: 'revise', minutes: 35, completed: false },
      { id: 't-fri-2', title: 'Revise Circle Theorems, Triangle Similarity & Mensuration Formulas', section: 'qa', pillar: 'revise', minutes: 30, completed: false },
      { id: 't-fri-3', title: 'Solve 8 Geometry & Mensuration PYQs', section: 'qa', pillar: 'enhance', minutes: 35, completed: false },
      { id: 't-fri-4', title: 'Practice 5 Para Summaries & Odd Sentence Out questions', section: 'varc', pillar: 'enhance', minutes: 25, completed: false }
    ]
  },
  {
    dayId: 'sat',
    dayName: 'Saturday',
    theme: 'Test Day: Full Mock / Sectional Sprint',
    description: 'Live test conditions, section pacing, and untimed capability re-attempt',
    tasks: [
      { id: 't-sat-1', title: 'Take 1 Full-Length Timed Mock or 2 Sectional Mocks (IMS/TIME/CL)', section: 'mock', pillar: 'test', minutes: 120, completed: false },
      { id: 't-sat-2', title: 'Untimed Capability Session: Solve unattempted questions to measure true ability', section: 'mock', pillar: 'test', minutes: 60, completed: false },
      { id: 't-sat-3', title: 'Log Scores & Calculate Panic Delta in Mock Scorecard tab', section: 'mock', pillar: 'strategize', minutes: 20, completed: false }
    ]
  },
  {
    dayId: 'sun',
    dayName: 'Sunday',
    theme: 'Deep Diagnostic & Next Week Strategy',
    description: 'Root cause analysis, personal notes logging, and next week plan formulation',
    tasks: [
      { id: 't-sun-1', title: 'Categorize all Mock Errors into Mistake Notebook (Concept vs Calc vs Panic)', section: 'general', pillar: 'revise', minutes: 45, completed: false },
      { id: 't-sun-2', title: 'Watch curated video lectures for top 2 weakest topics from the mock', section: 'general', pillar: 'revise', minutes: 45, completed: false },
      { id: 't-sun-3', title: 'Weekly Review: Audit Daily Velocity, accuracy rate & update syllabus burndown', section: 'general', pillar: 'strategize', minutes: 20, completed: false }
    ]
  }
];

export const StudyPlanner = ({ userData, onUpdateUserData }) => {
  const [selectedDay, setSelectedDay] = useState('all'); // 'all', 'mon', 'tue', ...
  const [pillarFilter, setPillarFilter] = useState('all'); // 'all', 'revise', 'enhance', 'strategize', 'test'
  const [sectionFilter, setSectionFilter] = useState('all'); // 'all', 'qa', 'dilr', 'varc', 'mock', 'general'
  const [showAddModal, setShowAddModal] = useState(false);

  // New task form state
  const [newTaskDay, setNewTaskDay] = useState('mon');
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskSection, setNewTaskSection] = useState('qa');
  const [newTaskPillar, setNewTaskPillar] = useState('enhance');
  const [newTaskMinutes, setNewTaskMinutes] = useState(30);

  // Current plan from userData or default
  const weeklyPlan = userData.weeklyPlanner || DEFAULT_REST_PLAN;

  // Save updated plan to userData
  const savePlan = (updatedPlan) => {
    onUpdateUserData({
      ...userData,
      weeklyPlanner: updatedPlan
    });
  };

  // Toggle task complete
  const handleToggleTask = (dayId, taskId) => {
    const updated = weeklyPlan.map(day => {
      if (day.dayId !== dayId) return day;
      return {
        ...day,
        tasks: day.tasks.map(t => t.id === taskId ? { ...t, completed: !t.completed } : t)
      };
    });
    savePlan(updated);
  };

  // Delete task
  const handleDeleteTask = (dayId, taskId) => {
    const updated = weeklyPlan.map(day => {
      if (day.dayId !== dayId) return day;
      return {
        ...day,
        tasks: day.tasks.filter(t => t.id !== taskId)
      };
    });
    savePlan(updated);
  };

  // Add custom task
  const handleAddTask = (e) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;

    const newTask = {
      id: `task-${Date.now()}`,
      title: newTaskTitle.trim(),
      section: newTaskSection,
      pillar: newTaskPillar,
      minutes: parseInt(newTaskMinutes, 10) || 30,
      completed: false
    };

    const updated = weeklyPlan.map(day => {
      if (day.dayId !== newTaskDay) return day;
      return {
        ...day,
        tasks: [...day.tasks, newTask]
      };
    });

    savePlan(updated);
    setNewTaskTitle('');
    setShowAddModal(false);
  };

  // Reset to default R-E-S-T framework
  const handleResetToDefault = () => {
    if (confirm('Reset your study planner back to the recommended R-E-S-T framework template?')) {
      savePlan(DEFAULT_REST_PLAN);
    }
  };

  // Clear completed tasks
  const handleClearCompleted = () => {
    if (confirm('Clear completed status for all tasks in this week?')) {
      const updated = weeklyPlan.map(day => ({
        ...day,
        tasks: day.tasks.map(t => ({ ...t, completed: false }))
      }));
      savePlan(updated);
    }
  };

  // Mark all today's tasks complete
  const handleMarkDayComplete = (dayId) => {
    const updated = weeklyPlan.map(day => {
      if (day.dayId !== dayId) return day;
      return {
        ...day,
        tasks: day.tasks.map(t => ({ ...t, completed: true }))
      };
    });
    savePlan(updated);
  };

  // Calculate metrics
  const allTasks = weeklyPlan.flatMap(d => d.tasks);
  const totalTasks = allTasks.length;
  const completedTasks = allTasks.filter(t => t.completed).length;
  const weeklyProgressPercent = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  const totalMinutesPlanned = allTasks.reduce((sum, t) => sum + (t.minutes || 0), 0);
  const completedMinutes = allTasks.filter(t => t.completed).reduce((sum, t) => sum + (t.minutes || 0), 0);

  // Section badge styles
  const getSectionBadge = (sec) => {
    switch (sec) {
      case 'qa':
        return { label: 'QA', className: 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/50 dark:text-blue-300 dark:border-blue-800' };
      case 'dilr':
        return { label: 'DILR', className: 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/50 dark:text-emerald-300 dark:border-emerald-800' };
      case 'varc':
        return { label: 'VARC', className: 'bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-950/50 dark:text-purple-300 dark:border-purple-800' };
      case 'mock':
        return { label: 'Mock Test', className: 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/50 dark:text-amber-300 dark:border-amber-800' };
      default:
        return { label: 'Strategy / Review', className: 'bg-slate-100 text-slate-700 border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700' };
    }
  };

  // Pillar badge styles
  const getPillarBadge = (pillar) => {
    switch (pillar) {
      case 'revise':
        return { label: 'Revise', className: 'bg-indigo-50 text-indigo-700 border-indigo-200 dark:bg-indigo-950/50 dark:text-indigo-300 dark:border-indigo-800' };
      case 'enhance':
        return { label: 'Enhance', className: 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/50 dark:text-emerald-300 dark:border-emerald-800' };
      case 'strategize':
        return { label: 'Strategize', className: 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/50 dark:text-amber-300 dark:border-amber-800' };
      case 'test':
        return { label: 'Test & Diagnostic', className: 'bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/50 dark:text-rose-300 dark:border-rose-800' };
      default:
        return { label: pillar, className: 'bg-slate-100 text-slate-700 border-slate-200' };
    }
  };

  // Filter days and tasks
  const daysToDisplay = selectedDay === 'all' 
    ? weeklyPlan 
    : weeklyPlan.filter(d => d.dayId === selectedDay);

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Calendar className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              <h1 className="text-xl font-black text-slate-900 dark:text-white">
                Weekly Study Planner (R-E-S-T Framework)
              </h1>
            </div>
            <p className="text-xs text-slate-400">
              Structured multi-week schedule: Revise fundamentals, Enhance via targeted drills, Strategize pacing & Test in real conditions.
            </p>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={() => setShowAddModal(true)}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md shadow-indigo-500/20 transition cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Add Custom Task</span>
            </button>

            <button
              onClick={handleResetToDefault}
              title="Reset schedule to recommended R-E-S-T blueprint"
              className="px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 font-semibold text-xs flex items-center gap-1 transition cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5 text-slate-500" />
              <span>Reset Template</span>
            </button>
          </div>
        </div>

        {/* Weekly Completion Progress Meter */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-100 dark:border-slate-800/80">
          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
              Weekly Task Completion
            </span>
            <div className="flex items-baseline justify-between mb-2">
              <span className="text-lg font-black text-slate-900 dark:text-white">
                {completedTasks} / {totalTasks} Tasks
              </span>
              <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400">
                {weeklyProgressPercent}%
              </span>
            </div>
            <div className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
              <div 
                className="h-full bg-indigo-600 rounded-full transition-all duration-500"
                style={{ width: `${weeklyProgressPercent}%` }}
              />
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
              Study Time Logged
            </span>
            <div className="flex items-baseline justify-between mb-2">
              <span className="text-lg font-black text-slate-900 dark:text-white">
                {Math.round(completedMinutes / 60 * 10) / 10} hrs done
              </span>
              <span className="text-xs text-slate-400 font-medium">
                of {Math.round(totalMinutesPlanned / 60 * 10) / 10} hrs target
              </span>
            </div>
            <div className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
              <div 
                className="h-full bg-emerald-500 rounded-full transition-all duration-500"
                style={{ width: `${totalMinutesPlanned > 0 ? Math.min(100, Math.round((completedMinutes / totalMinutesPlanned) * 100)) : 0}%` }}
              />
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 flex items-center justify-between">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                Quick Actions
              </span>
              <span className="text-xs text-slate-600 dark:text-slate-300 font-semibold block">
                Manage weekly checkpoints
              </span>
            </div>
            <button
              onClick={handleClearCompleted}
              className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition cursor-pointer"
            >
              Clear Completed
            </button>
          </div>
        </div>
      </div>

      {/* R-E-S-T Framework Pillars Guide */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
        <div 
          onClick={() => setPillarFilter(pillarFilter === 'revise' ? 'all' : 'revise')}
          className={`p-4 rounded-xl border transition cursor-pointer shadow-xs ${
            pillarFilter === 'revise'
              ? 'bg-indigo-50 border-indigo-300 ring-2 ring-indigo-500/20 dark:bg-indigo-950/60 dark:border-indigo-800'
              : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-indigo-300'
          }`}
        >
          <div className="flex items-center gap-2 mb-1">
            <span className="w-6 h-6 rounded-lg bg-indigo-600 text-white font-black text-xs flex items-center justify-center">
              R
            </span>
            <span className="font-extrabold text-sm text-slate-900 dark:text-white">Revise</span>
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-tight">
            Formulas, theory, cheatsheets & mistake notebook review.
          </p>
        </div>

        <div 
          onClick={() => setPillarFilter(pillarFilter === 'enhance' ? 'all' : 'enhance')}
          className={`p-4 rounded-xl border transition cursor-pointer shadow-xs ${
            pillarFilter === 'enhance'
              ? 'bg-emerald-50 border-emerald-300 ring-2 ring-emerald-500/20 dark:bg-emerald-950/60 dark:border-emerald-800'
              : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-emerald-300'
          }`}
        >
          <div className="flex items-center gap-2 mb-1">
            <span className="w-6 h-6 rounded-lg bg-emerald-600 text-white font-black text-xs flex items-center justify-center">
              E
            </span>
            <span className="font-extrabold text-sm text-slate-900 dark:text-white">Enhance</span>
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-tight">
            High-volume topic drills, authentic PYQs & RC passages.
          </p>
        </div>

        <div 
          onClick={() => setPillarFilter(pillarFilter === 'strategize' ? 'all' : 'strategize')}
          className={`p-4 rounded-xl border transition cursor-pointer shadow-xs ${
            pillarFilter === 'strategize'
              ? 'bg-amber-50 border-amber-300 ring-2 ring-amber-500/20 dark:bg-amber-950/60 dark:border-amber-800'
              : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-amber-300'
          }`}
        >
          <div className="flex items-center gap-2 mb-1">
            <span className="w-6 h-6 rounded-lg bg-amber-500 text-white font-black text-xs flex items-center justify-center">
              S
            </span>
            <span className="font-extrabold text-sm text-slate-900 dark:text-white">Strategize</span>
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-tight">
            Time-boxed speed tests, set selection & option elimination.
          </p>
        </div>

        <div 
          onClick={() => setPillarFilter(pillarFilter === 'test' ? 'all' : 'test')}
          className={`p-4 rounded-xl border transition cursor-pointer shadow-xs ${
            pillarFilter === 'test'
              ? 'bg-rose-50 border-rose-300 ring-2 ring-rose-500/20 dark:bg-rose-950/60 dark:border-rose-800'
              : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-rose-300'
          }`}
        >
          <div className="flex items-center gap-2 mb-1">
            <span className="w-6 h-6 rounded-lg bg-rose-600 text-white font-black text-xs flex items-center justify-center">
              T
            </span>
            <span className="font-extrabold text-sm text-slate-900 dark:text-white">Test & Analyze</span>
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-tight">
            Timed mocks, capability re-attempts & Panic Delta logging.
          </p>
        </div>
      </div>

      {/* Day Selector Pills & Filter Controls */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Day Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          <button
            onClick={() => setSelectedDay('all')}
            className={`px-3 py-1.5 rounded-xl font-bold text-xs whitespace-nowrap transition cursor-pointer ${
              selectedDay === 'all'
                ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            All Week ({totalTasks})
          </button>

          {weeklyPlan.map((d) => {
            const isSelected = selectedDay === d.dayId;
            const dayDone = d.tasks.filter(t => t.completed).length;
            const dayTotal = d.tasks.length;
            return (
              <button
                key={d.dayId}
                onClick={() => setSelectedDay(d.dayId)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-bold text-xs whitespace-nowrap transition cursor-pointer ${
                  isSelected
                    ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-500/20'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <span>{d.dayName.slice(0, 3)}</span>
                <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                  isSelected
                    ? 'bg-white/20 text-white'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-500'
                }`}>
                  {dayDone}/{dayTotal}
                </span>
              </button>
            );
          })}
        </div>

        {/* Section Filter Dropdown */}
        <div className="flex items-center gap-2 shrink-0">
          <Filter className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-xs font-semibold text-slate-400">Section:</span>
          <select
            value={sectionFilter}
            onChange={(e) => setSectionFilter(e.target.value)}
            className="text-xs font-semibold px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-200 focus:outline-none cursor-pointer"
          >
            <option value="all">All Sections</option>
            <option value="qa">QA (Quant)</option>
            <option value="dilr">DILR</option>
            <option value="varc">VARC</option>
            <option value="mock">Mock Test</option>
            <option value="general">General / Review</option>
          </select>
        </div>
      </div>

      {/* Daily Schedule Cards */}
      <div className="space-y-6">
        {daysToDisplay.map((day) => {
          // Filter day tasks by pillar and section
          const filteredTasks = day.tasks.filter(t => {
            if (pillarFilter !== 'all' && t.pillar !== pillarFilter) return false;
            if (sectionFilter !== 'all' && t.section !== sectionFilter) return false;
            return true;
          });

          const dayCompleted = day.tasks.filter(t => t.completed).length;
          const dayTotal = day.tasks.length;
          const dayProgressPercent = dayTotal > 0 ? Math.round((dayCompleted / dayTotal) * 100) : 0;

          return (
            <div 
              key={day.dayId}
              className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden"
            >
              {/* Day Header */}
              <div className="px-6 py-4 bg-slate-50/80 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2.5">
                    <h2 className="text-base font-black text-slate-900 dark:text-white">
                      {day.dayName}
                    </h2>
                    <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
                      {day.theme}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mt-0.5">
                    {day.description}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                      {dayCompleted}/{dayTotal} Done ({dayProgressPercent}%)
                    </span>
                    <div className="w-24 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden mt-1">
                      <div 
                        className="h-full bg-indigo-600 rounded-full transition-all duration-300"
                        style={{ width: `${dayProgressPercent}%` }}
                      />
                    </div>
                  </div>

                  {dayCompleted < dayTotal && (
                    <button
                      onClick={() => handleMarkDayComplete(day.dayId)}
                      className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline cursor-pointer"
                    >
                      Complete All
                    </button>
                  )}
                </div>
              </div>

              {/* Day Tasks List */}
              <div className="divide-y divide-slate-100 dark:divide-slate-800">
                {filteredTasks.length === 0 ? (
                  <div className="p-8 text-center text-xs text-slate-400">
                    No tasks match the active filters for {day.dayName}.
                  </div>
                ) : (
                  filteredTasks.map((task) => {
                    const secBadge = getSectionBadge(task.section);
                    const pillarBadge = getPillarBadge(task.pillar);

                    return (
                      <div 
                        key={task.id}
                        className={`p-4 sm:p-5 flex items-start justify-between gap-3 transition-colors ${
                          task.completed 
                            ? 'bg-slate-50/50 dark:bg-slate-800/20 text-slate-400' 
                            : 'hover:bg-slate-50/70 dark:hover:bg-slate-800/40'
                        }`}
                      >
                        <div className="flex items-start gap-3 flex-1">
                          {/* Checkbox */}
                          <button
                            onClick={() => handleToggleTask(day.dayId, task.id)}
                            className="mt-0.5 text-slate-400 hover:text-indigo-600 transition cursor-pointer"
                          >
                            {task.completed ? (
                              <CheckCircle2 className="w-5 h-5 text-emerald-600 fill-emerald-100 dark:fill-emerald-950" />
                            ) : (
                              <Circle className="w-5 h-5 text-slate-300 dark:text-slate-600 hover:text-indigo-600" />
                            )}
                          </button>

                          <div className="flex-1 space-y-1.5">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className={`text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md border ${secBadge.className}`}>
                                {secBadge.label}
                              </span>

                              <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md border ${pillarBadge.className}`}>
                                {pillarBadge.label}
                              </span>

                              <span className="text-[11px] font-medium text-slate-400 flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                <span>~{task.minutes} mins</span>
                              </span>
                            </div>

                            <p className={`text-xs sm:text-sm font-semibold leading-relaxed ${
                              task.completed
                                ? 'line-through text-slate-400 dark:text-slate-500'
                                : 'text-slate-800 dark:text-slate-100'
                            }`}>
                              {task.title}
                            </p>
                          </div>
                        </div>

                        {/* Delete Task */}
                        <button
                          onClick={() => handleDeleteTask(day.dayId, task.id)}
                          title="Remove task"
                          className="p-1.5 text-slate-300 hover:text-rose-600 rounded-lg transition cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Custom Task Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-md w-full p-6 border border-slate-200 dark:border-slate-800 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <h3 className="font-extrabold text-base text-slate-900 dark:text-white flex items-center gap-2">
                <Plus className="w-4 h-4 text-indigo-600" />
                <span>Add Study Task</span>
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-slate-400 hover:text-slate-700 text-sm font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddTask} className="space-y-4 text-xs">
              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Scheduled Day
                </label>
                <select
                  value={newTaskDay}
                  onChange={(e) => setNewTaskDay(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-100 font-semibold"
                >
                  <option value="mon">Monday</option>
                  <option value="tue">Tuesday</option>
                  <option value="wed">Wednesday</option>
                  <option value="thu">Thursday</option>
                  <option value="fri">Friday</option>
                  <option value="sat">Saturday</option>
                  <option value="sun">Sunday</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Task Title & Goal
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Solve 10 Time Speed Distance PYQs"
                  value={newTaskTitle}
                  onChange={(e) => setNewTaskTitle(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-100 font-semibold"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Section
                  </label>
                  <select
                    value={newTaskSection}
                    onChange={(e) => setNewTaskSection(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-100 font-semibold"
                  >
                    <option value="qa">QA (Quant)</option>
                    <option value="dilr">DILR</option>
                    <option value="varc">VARC</option>
                    <option value="mock">Mock Test</option>
                    <option value="general">General / Review</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    R-E-S-T Pillar
                  </label>
                  <select
                    value={newTaskPillar}
                    onChange={(e) => setNewTaskPillar(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-100 font-semibold"
                  >
                    <option value="revise">Revise</option>
                    <option value="enhance">Enhance</option>
                    <option value="strategize">Strategize</option>
                    <option value="test">Test & Diagnostic</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Target Duration (Minutes)
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {[15, 30, 45, 60].map(mins => (
                    <button
                      type="button"
                      key={mins}
                      onClick={() => setNewTaskMinutes(mins)}
                      className={`py-2 rounded-xl border font-bold text-xs transition cursor-pointer ${
                        newTaskMinutes === mins
                          ? 'bg-indigo-600 text-white border-indigo-600'
                          : 'border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      {mins}m
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl text-slate-500 font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold cursor-pointer shadow-md shadow-indigo-500/20"
                >
                  Add Task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
