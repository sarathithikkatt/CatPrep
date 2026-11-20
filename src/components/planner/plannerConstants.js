/**
 * Default Recommended R-E-S-T Framework Study Blueprint.
 * Revise -> Enhance -> Strategize -> Test.
 */
export const DEFAULT_REST_PLAN = [
  {
    dayId: 'mon',
    dayName: 'Monday',
    theme: 'Quant Foundations & Arithmetic Drill',
    description: 'Percentages, ratios, profit/loss multiplier formulas & calculation velocity',
    tasks: [
      {
        id: 't-mon-1',
        title: 'Revise Percentages, Ratios & Profit/Loss Cheatsheets',
        section: 'qa',
        pillar: 'revise',
        minutes: 30,
        completed: false
      },
      {
        id: 't-mon-2',
        title: 'Practice 15 Arithmetic PYQs (2020-2024 Slots with Pro Shortcuts)',
        section: 'qa',
        pillar: 'enhance',
        minutes: 45,
        completed: false
      },
      {
        id: 't-mon-3',
        title: 'Read 1 Aeon Essay or Smithsonian Article (Focus on author tone)',
        section: 'varc',
        pillar: 'revise',
        minutes: 25,
        completed: false
      },
      {
        id: 't-mon-4',
        title: 'Speed Drill: 15-minute mental math & reciprocal percentage tables',
        section: 'qa',
        pillar: 'strategize',
        minutes: 15,
        completed: false
      }
    ]
  },
  {
    dayId: 'tue',
    dayName: 'Tuesday',
    theme: 'DILR Puzzle Anchoring & Para Jumbles',
    description: 'Games & Tournaments logic, matrix matching, and verbal sentence structures',
    tasks: [
      {
        id: 't-tue-1',
        title: 'Revise Games & Tournaments Knockout & Round-Robin Rules',
        section: 'dilr',
        pillar: 'revise',
        minutes: 25,
        completed: false
      },
      {
        id: 't-tue-2',
        title: 'Solve 2 DILR Sets (Complex Seating Arrangement & Missing Value Table)',
        section: 'dilr',
        pillar: 'enhance',
        minutes: 45,
        completed: false
      },
      {
        id: 't-tue-3',
        title: 'Solve 6 TITA Para Jumbles (Identify mandatory pronoun/noun pairs)',
        section: 'varc',
        pillar: 'enhance',
        minutes: 30,
        completed: false
      },
      {
        id: 't-tue-4',
        title: 'DILR Anchor Drill: 5-minute set selection evaluation without solving',
        section: 'dilr',
        pillar: 'strategize',
        minutes: 15,
        completed: false
      }
    ]
  },
  {
    dayId: 'wed',
    dayName: 'Wednesday',
    theme: 'Algebra Rigor & RC Deep Dive',
    description: 'Quadratic roots, modulus inequalities, and inference-driven RC passages',
    tasks: [
      {
        id: 't-wed-1',
        title: 'Revise Algebra Inequalities, Logarithms & Modulus Properties',
        section: 'qa',
        pillar: 'revise',
        minutes: 30,
        completed: false
      },
      {
        id: 't-wed-2',
        title: 'Practice 12 Algebra PYQs (Functions, Maxima/Minima & Quadratics)',
        section: 'qa',
        pillar: 'enhance',
        minutes: 45,
        completed: false
      },
      {
        id: 't-wed-3',
        title: 'Solve 2 Full RC Passages with detailed tone and inference analysis',
        section: 'varc',
        pillar: 'enhance',
        minutes: 40,
        completed: false
      },
      {
        id: 't-wed-4',
        title: 'Option Elimination Drill: Identify trap answer choices in RC options',
        section: 'varc',
        pillar: 'strategize',
        minutes: 15,
        completed: false
      }
    ]
  },
  {
    dayId: 'thu',
    dayName: 'Thursday',
    theme: 'Quant Advanced & Venn Diagrams',
    description: 'Time Speed Distance, circular races, and 3-set Maxima/Minima optimization',
    tasks: [
      {
        id: 't-thu-1',
        title: 'Revise TSD Races, Escalators & Relative Speed formulas',
        section: 'qa',
        pillar: 'revise',
        minutes: 25,
        completed: false
      },
      {
        id: 't-thu-2',
        title: 'Solve 10 TSD & Work-Pipes PYQs',
        section: 'qa',
        pillar: 'enhance',
        minutes: 40,
        completed: false
      },
      {
        id: 't-thu-3',
        title: 'Solve 2 Advanced Venn Diagram (3-Set / 4-Set Maxima-Minima) Sets',
        section: 'dilr',
        pillar: 'enhance',
        minutes: 40,
        completed: false
      },
      {
        id: 't-thu-4',
        title: 'Time-boxed 20-min Quant Sectional Sprint (Target: 7+ net correct)',
        section: 'qa',
        pillar: 'strategize',
        minutes: 20,
        completed: false
      }
    ]
  },
  {
    dayId: 'fri',
    dayName: 'Friday',
    theme: 'Mistake Notebook & Geometry Polish',
    description: 'Active re-testing of errors, geometry visualization, and verbal summary',
    tasks: [
      {
        id: 't-fri-1',
        title: 'Mistake Notebook Re-test: Attempt 8 previously flagged questions',
        section: 'general',
        pillar: 'revise',
        minutes: 35,
        completed: false
      },
      {
        id: 't-fri-2',
        title: 'Revise Circle Theorems, Triangle Similarity & Mensuration Formulas',
        section: 'qa',
        pillar: 'revise',
        minutes: 30,
        completed: false
      },
      {
        id: 't-fri-3',
        title: 'Solve 8 Geometry & Mensuration PYQs',
        section: 'qa',
        pillar: 'enhance',
        minutes: 35,
        completed: false
      },
      {
        id: 't-fri-4',
        title: 'Practice 5 Para Summaries & Odd Sentence Out questions',
        section: 'varc',
        pillar: 'enhance',
        minutes: 25,
        completed: false
      }
    ]
  },
  {
    dayId: 'sat',
    dayName: 'Saturday',
    theme: 'Test Day: Full Mock / Sectional Sprint',
    description: 'Live test conditions, section pacing, and untimed capability re-attempt',
    tasks: [
      {
        id: 't-sat-1',
        title: 'Take 1 Full-Length Timed Mock or 2 Sectional Mocks (IMS/TIME/CL)',
        section: 'mock',
        pillar: 'test',
        minutes: 120,
        completed: false
      },
      {
        id: 't-sat-2',
        title: 'Untimed Capability Session: Solve unattempted questions to measure true ability',
        section: 'mock',
        pillar: 'test',
        minutes: 60,
        completed: false
      },
      {
        id: 't-sat-3',
        title: 'Log Scores & Calculate Panic Delta in Mock Scorecard tab',
        section: 'mock',
        pillar: 'strategize',
        minutes: 20,
        completed: false
      }
    ]
  },
  {
    dayId: 'sun',
    dayName: 'Sunday',
    theme: 'Deep Diagnostic & Next Week Strategy',
    description: 'Root cause analysis, personal notes logging, and next week plan formulation',
    tasks: [
      {
        id: 't-sun-1',
        title: 'Categorize all Mock Errors into Mistake Notebook (Concept vs Calc vs Panic)',
        section: 'general',
        pillar: 'revise',
        minutes: 45,
        completed: false
      },
      {
        id: 't-sun-2',
        title: 'Watch curated video lectures for top 2 weakest topics from the mock',
        section: 'general',
        pillar: 'revise',
        minutes: 45,
        completed: false
      },
      {
        id: 't-sun-3',
        title: 'Weekly Review: Audit Daily Velocity, accuracy rate & update syllabus burndown',
        section: 'general',
        pillar: 'strategize',
        minutes: 20,
        completed: false
      }
    ]
  }
];

export const PILLARS_CONFIG = [
  {
    id: 'revise',
    letter: 'R',
    name: 'Revise',
    description: 'Formulas, theory, cheatsheets & mistake notebook review.',
    colorBg: 'bg-indigo-600',
    activeStyles:
      'bg-indigo-50 border-indigo-300 ring-2 ring-indigo-500/20 dark:bg-indigo-950/60 dark:border-indigo-800'
  },
  {
    id: 'enhance',
    letter: 'E',
    name: 'Enhance',
    description: 'High-volume topic drills, authentic PYQs & RC passages.',
    colorBg: 'bg-emerald-600',
    activeStyles:
      'bg-emerald-50 border-emerald-300 ring-2 ring-emerald-500/20 dark:bg-emerald-950/60 dark:border-emerald-800'
  },
  {
    id: 'strategize',
    letter: 'S',
    name: 'Strategize',
    description: 'Time-boxed speed tests, set selection & option elimination.',
    colorBg: 'bg-amber-500',
    activeStyles:
      'bg-amber-50 border-amber-300 ring-2 ring-amber-500/20 dark:bg-amber-950/60 dark:border-amber-800'
  },
  {
    id: 'test',
    letter: 'T',
    name: 'Test & Analyze',
    description: 'Timed mocks, capability re-attempts & Panic Delta logging.',
    colorBg: 'bg-rose-600',
    activeStyles:
      'bg-rose-50 border-rose-300 ring-2 ring-rose-500/20 dark:bg-rose-950/60 dark:border-rose-800'
  }
];

/**
 * Returns formatted label and Tailwind classes for sections.
 */
export const getSectionBadge = (sec) => {
  switch (sec) {
    case 'qa':
      return {
        label: 'QA',
        className:
          'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/50 dark:text-blue-300 dark:border-blue-800'
      };
    case 'dilr':
      return {
        label: 'DILR',
        className:
          'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/50 dark:text-emerald-300 dark:border-emerald-800'
      };
    case 'varc':
      return {
        label: 'VARC',
        className:
          'bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-950/50 dark:text-purple-300 dark:border-purple-800'
      };
    case 'mock':
      return {
        label: 'Mock Test',
        className:
          'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/50 dark:text-amber-300 dark:border-amber-800'
      };
    default:
      return {
        label: 'Strategy / Review',
        className:
          'bg-slate-100 text-slate-700 border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700'
      };
  }
};

/**
 * Returns formatted label and Tailwind classes for pillars.
 */
export const getPillarBadge = (pillar) => {
  switch (pillar) {
    case 'revise':
      return {
        label: 'Revise',
        className:
          'bg-indigo-50 text-indigo-700 border-indigo-200 dark:bg-indigo-950/50 dark:text-indigo-300 dark:border-indigo-800'
      };
    case 'enhance':
      return {
        label: 'Enhance',
        className:
          'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/50 dark:text-emerald-300 dark:border-emerald-800'
      };
    case 'strategize':
      return {
        label: 'Strategize',
        className:
          'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/50 dark:text-amber-300 dark:border-amber-800'
      };
    case 'test':
      return {
        label: 'Test & Diagnostic',
        className:
          'bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/50 dark:text-rose-300 dark:border-rose-800'
      };
    default:
      return { label: pillar, className: 'bg-slate-100 text-slate-700 border-slate-200' };
  }
};
