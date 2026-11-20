/**
 * Multi-Track Study Plans Registry for CatPrep.
 * Supports 3-Month (90d), 1-Month (30d), and 1-Week (7d) structured tracks
 * with phase breakdowns, focus splits, daily commitments, and cross-module deep-links.
 */

export const STUDY_PLANS = [
  {
    id: '3-month',
    title: '3-Month Master Sprint',
    durationBadge: '90 Days',
    totalDays: 90,
    dailyHours: '3.5 - 4 hrs/day',
    weekendHours: '7 - 8 hrs/day',
    mockFrequency: '1/week (Month 1-2) → 2/week (Month 3)',
    focusSplit: {
      concept: 40,
      practice: 40,
      revision: 20
    },
    philosophy:
      'Master the Pareto 70% high-ROI topics in Arithmetic & Algebra, anchor DILR puzzle types, and institutionalize weekly mock autopsies.',
    phases: [
      {
        id: '3m-phase-1',
        name: 'Phase 1: Foundation & High-ROI Concept Dominance',
        dayStart: 1,
        dayEnd: 30,
        daysLabel: 'Days 1 – 30',
        goal: 'Lock in 70% of recurring CAT syllabus topics and establish a non-negotiable 3-track daily routine.',
        tasks: [
          {
            id: '3m-p1-t1',
            section: 'qa',
            title: 'Master Percentages, Ratios & Multiplier Shortcuts',
            description:
              'Solve 15 authentic PYQs focusing on fraction-to-percentage conversions and successive changes.',
            targetAction: {
              tab: 'practice',
              label: 'Practice QA →',
              filter: 'qa-percentages'
            }
          },
          {
            id: '3m-p1-t2',
            section: 'qa',
            title: 'Arithmetic Time-Work & Pipes Rigor',
            description: 'Review LCM method and alternate-day efficiency models with 10 questions.',
            targetAction: {
              tab: 'practice',
              label: 'Practice QA →',
              filter: 'qa-timework'
            }
          },
          {
            id: '3m-p1-t3',
            section: 'dilr',
            title: 'Linear & Circular Seating Arrangements',
            description:
              'Solve 2 full sets focusing on fixed anchor constraints and branching cases.',
            targetAction: {
              tab: 'practice',
              label: 'Solve DILR →',
              filter: 'dilr-arrangements'
            }
          },
          {
            id: '3m-p1-t4',
            section: 'varc',
            title: 'Active Reading: Aeon Essay Analysis',
            description:
              'Read 1 philosophical or sociological essay; formulate mental 1-sentence paragraph summaries.',
            targetAction: {
              tab: 'resources',
              label: 'Reading Hub →',
              filter: null
            }
          },
          {
            id: '3m-p1-t5',
            section: 'varc',
            title: 'Para Jumbles Mandatory Pairs Drill',
            description:
              'Solve 6 TITA Para Jumbles focusing on pronoun-noun referencing and chronological order.',
            targetAction: {
              tab: 'practice',
              label: 'Practice VARC →',
              filter: 'varc-parajumbles'
            }
          },
          {
            id: '3m-p1-t6',
            section: 'mock',
            title: 'Diagnostic Baseline Mock (Official CAT PYQ)',
            description:
              'Take official CAT 2023 Slot 1 under timed conditions to benchmark initial capability.',
            targetAction: {
              tab: 'mocks',
              label: 'Log Mock →',
              filter: null
            }
          },
          {
            id: '3m-p1-t7',
            section: 'review',
            title: 'Set up Mistake Notebook & Root-Cause Tagging',
            description:
              'Log all diagnostic errors categorizing them into Concept, Calculation, Trap, or Time Panic.',
            targetAction: {
              tab: 'notebook',
              label: 'Open Notebook →',
              filter: null
            }
          }
        ]
      },
      {
        id: '3m-phase-2',
        name: 'Phase 2: Authentic PYQ Sweep & Timed Sectionals',
        dayStart: 31,
        dayEnd: 60,
        daysLabel: 'Days 31 – 60',
        goal: 'Bridge conceptual gaps, master past 7 years authentic CAT sets, and execute weekly mock autopsies.',
        tasks: [
          {
            id: '3m-p2-t1',
            section: 'qa',
            title: 'Algebra Rigor: Quadratic Roots & Modulus Inequalities',
            description: 'Solve 15 Algebra PYQs applying vertex shortcuts and wavy curve methods.',
            targetAction: {
              tab: 'practice',
              label: 'Practice QA →',
              filter: 'qa-quadratics'
            }
          },
          {
            id: '3m-p2-t2',
            section: 'dilr',
            title: 'Games & Tournaments Master Series',
            description:
              'Solve 2 round-robin and knockout tournament sets with seeded player logic.',
            targetAction: {
              tab: 'practice',
              label: 'Solve DILR →',
              filter: 'dilr-games'
            }
          },
          {
            id: '3m-p2-t3',
            section: 'dilr',
            title: '4-Set Venn Diagrams Maxima-Minima',
            description: 'Master optimization formulas for 3-set and 4-set overlapping conditions.',
            targetAction: {
              tab: 'syllabus',
              label: 'View Cheatsheet →',
              filter: 'dilr-venn'
            }
          },
          {
            id: '3m-p2-t4',
            section: 'varc',
            title: 'RC Option Elimination Drill',
            description:
              'Identify trap distractors (Out of Scope, Extreme, Opposite) across 3 timed passages.',
            targetAction: {
              tab: 'practice',
              label: 'Practice VARC →',
              filter: 'varc-rc'
            }
          },
          {
            id: '3m-p2-t5',
            section: 'mock',
            title: 'Weekly Full-Length Mock + 4-Hour Autopsy',
            description:
              'Take 1 proctored mock on Saturday; spend 4 hours on Sunday re-solving unattempted and wrong questions.',
            targetAction: {
              tab: 'mocks',
              label: 'Mock Scorecard →',
              filter: null
            }
          },
          {
            id: '3m-p2-t6',
            section: 'review',
            title: 'Mistake Notebook Re-Test Mode',
            description:
              'Attempt 15 previously wrong questions in hidden-answer re-test mode to confirm concept retention.',
            targetAction: {
              tab: 'notebook',
              label: 'Start Re-test →',
              filter: null
            }
          }
        ]
      },
      {
        id: '3m-phase-3',
        name: 'Phase 3: Strategy Convergence & Slot Lock',
        dayStart: 61,
        dayEnd: 90,
        daysLabel: 'Days 61 – 90',
        goal: 'Peak cognitive stamina, eliminate ego traps, master ABC question triage, and align biological clock.',
        tasks: [
          {
            id: '3m-p3-t1',
            section: 'mock',
            title: 'Slot-Timed Mock (8:30am / 12:30pm / 4:30pm)',
            description:
              'Take 2 full mocks per week strictly during your assigned CAT slot time to synchronize circadian rhythm.',
            targetAction: {
              tab: 'mocks',
              label: 'Log Mock →',
              filter: null
            }
          },
          {
            id: '3m-p3-t2',
            section: 'dilr',
            title: '5-Minute Set Selection Discipline Drill',
            description:
              'Scan all 4 sets in minutes 0-5. Rank difficulty 1 to 4. Solve the 2 cleanest sets first.',
            targetAction: {
              tab: 'roadmaps',
              label: 'View 5-Min Rule →',
              filter: null
            }
          },
          {
            id: '3m-p3-t3',
            section: 'qa',
            title: 'ABC Question Triage Sprints',
            description:
              'Solve 22 Quant questions using Round 1 (<90s sitters) and Round 2 (solvable 2.5m). Drop ego traps.',
            targetAction: {
              tab: 'practice',
              label: 'Practice QA →',
              filter: 'all'
            }
          },
          {
            id: '3m-p3-t4',
            section: 'review',
            title: 'Zero New Chapters Rule & Formula Refresh',
            description:
              'Skim 4-page consolidated formula sheets every night for 30 minutes before sleep.',
            targetAction: {
              tab: 'syllabus',
              label: 'Browse Formulas →',
              filter: 'all'
            }
          },
          {
            id: '3m-p3-t5',
            section: 'review',
            title: 'Resolve 100% of Flagged Errors in Mistake Notebook',
            description:
              'Achieve 90%+ mastery rate on all logged calculation and concept mistakes.',
            targetAction: {
              tab: 'notebook',
              label: 'Open Notebook →',
              filter: null
            }
          }
        ]
      }
    ]
  },
  {
    id: '1-month',
    title: '1-Month Lockdown Sprint',
    durationBadge: '30 Days',
    totalDays: 30,
    dailyHours: '5 - 6 hrs/day',
    weekendHours: '7 - 8 hrs/day',
    mockFrequency: '2-3 full mocks/week + daily sectionals',
    focusSplit: {
      concept: 15,
      practice: 50,
      revision: 35
    },
    philosophy:
      'Consolidation and execution over acquisition. Master question selection, eliminate panic delta, and preserve confidence.',
    phases: [
      {
        id: '1m-phase-1',
        name: 'Phase 1: High-Weightage Sprint & Slot Simulation',
        dayStart: 1,
        dayEnd: 14,
        daysLabel: 'Days 1 – 14',
        goal: 'Lock in official slot timing, conduct 4-hour forensic autopsies, and eliminate calculation slips.',
        tasks: [
          {
            id: '1m-p1-t1',
            section: 'mock',
            title: 'Take Slot-Timed Full Mock #1',
            description: 'Strict 120-minute simulation during your exact CAT test slot time.',
            targetAction: {
              tab: 'mocks',
              label: 'Log Score →',
              filter: null
            }
          },
          {
            id: '1m-p1-t2',
            section: 'review',
            title: '4-Hour Mock Forensic Autopsy',
            description:
              'Re-solve all unattempted and wrong questions without timer; measure Panic Delta.',
            targetAction: {
              tab: 'mocks',
              label: 'View Diagnostics →',
              filter: null
            }
          },
          {
            id: '1m-p1-t3',
            section: 'qa',
            title: '15 High-Yield Arithmetic/Algebra PYQs Daily',
            description:
              'Enforce strict 2-minute timer per question with pro option-elimination shortcuts.',
            targetAction: {
              tab: 'practice',
              label: 'Practice QA →',
              filter: 'qa-percentages'
            }
          },
          {
            id: '1m-p1-t4',
            section: 'dilr',
            title: 'Solve 2 Authentic CAT DILR Sets Daily',
            description: '1 LR set (Arrangements/Tournaments) + 1 DI set (Missing values/Tables).',
            targetAction: {
              tab: 'practice',
              label: 'Solve DILR →',
              filter: 'dilr-arrangements'
            }
          },
          {
            id: '1m-p1-t5',
            section: 'varc',
            title: 'Daily VARC Maintenance: 2 RCs + 4 VA',
            description:
              'Maintain reading cadence and tone sensitivity on philosophy and science essays.',
            targetAction: {
              tab: 'practice',
              label: 'Practice VARC →',
              filter: 'varc-rc'
            }
          }
        ]
      },
      {
        id: '1m-phase-2',
        name: 'Phase 2: Strategy Locking & Selection Discipline',
        dayStart: 15,
        dayEnd: 25,
        daysLabel: 'Days 15 – 25',
        goal: 'Enforce the 90-second skip rule, lock passage ordering in VARC, and finalize exam tactics.',
        tasks: [
          {
            id: '1m-p2-t1',
            section: 'dilr',
            title: 'Enforce 5-Minute Selection Rule in Mocks',
            description:
              'Never solve set #1 without scanning all sets. Identify the lowest-hanging set first.',
            targetAction: {
              tab: 'roadmaps',
              label: 'Review 5-Min Rule →',
              filter: null
            }
          },
          {
            id: '1m-p2-t2',
            section: 'qa',
            title: 'Quant ABC Triage Drill (Zero Ego)',
            description:
              'Abandon any question exceeding 2.5 minutes. Never fight a question in the exam hall.',
            targetAction: {
              tab: 'practice',
              label: 'Practice QA →',
              filter: 'all'
            }
          },
          {
            id: '1m-p2-t3',
            section: 'review',
            title: 'Mistake Notebook Comprehensive Re-Test',
            description:
              'Re-test 25 flagged questions; confirm 0 recurrence of silly calculation errors.',
            targetAction: {
              tab: 'notebook',
              label: 'Start Re-test →',
              filter: null
            }
          },
          {
            id: '1m-p2-t4',
            section: 'review',
            title: 'Download & Verify CAT Admit Card',
            description:
              'Verify test center venue, slot reporting time, and print 2 clean color copies.',
            targetAction: {
              tab: 'resources',
              label: 'Official Portal →',
              filter: null
            }
          }
        ]
      },
      {
        id: '1m-phase-3',
        name: 'Phase 3: The Taper Phase & Energy Preservation',
        dayStart: 26,
        dayEnd: 30,
        daysLabel: 'Days 26 – 30',
        goal: 'Stop full mocks completely. Protect your confidence and conserve cognitive energy for exam day.',
        tasks: [
          {
            id: '1m-p3-t1',
            section: 'mock',
            title: 'Full Mock Freeze (No Mocks in Final 5 Days)',
            description:
              'A sudden low score right before CAT destroys exam temperament. Transition to formula reviews.',
            targetAction: {
              tab: 'roadmaps',
              label: 'View Taper Rules →',
              filter: null
            }
          },
          {
            id: '1m-p3-t2',
            section: 'review',
            title: 'Official CAT On-Screen Calculator Practice',
            description:
              'Familiarize yourself with keypad shortcuts and on-screen calculator on iimcat.ac.in.',
            targetAction: {
              tab: 'roadmaps',
              label: 'Open Calculator Tool →',
              filter: null
            }
          },
          {
            id: '1m-p3-t3',
            section: 'review',
            title: 'Circadian Sleep Lock (8 Hours / Night)',
            description:
              'Anchor wake-up time to 6:00 AM to ensure peak alertness during morning exam slots.',
            targetAction: {
              tab: 'roadmaps',
              label: 'View Protocol →',
              filter: null
            }
          }
        ]
      }
    ]
  },
  {
    id: '1-week',
    title: '1-Week Countdown Protocol',
    durationBadge: '7 Days',
    totalDays: 7,
    dailyHours: '3 - 4 hrs/day (tapering to 0 on D-1)',
    weekendHours: '4 hrs/day',
    mockFrequency: '1 Baseline Mock on D-7 (Zero thereafter)',
    focusSplit: {
      concept: 0,
      practice: 30,
      revision: 70
    },
    philosophy:
      'Neural replenishment and psychological composure. You cannot double your aptitude in 7 days, but you can easily lose 20 percentile points through panic and sleep deprivation.',
    phases: [
      {
        id: '1w-phase-1',
        name: 'Days 1 – 3: Final Baseline Mock & Light Sectionals',
        dayStart: 1,
        dayEnd: 3,
        daysLabel: 'D-7 to D-5',
        goal: 'Final pacing benchmark and light sectional sprints to keep reflexes warm.',
        tasks: [
          {
            id: '1w-p1-t1',
            section: 'mock',
            title: 'D-7 (Sunday): The Final Baseline Mock',
            description:
              'Take 1 full mock strictly at official slot time. Full mock freeze begins immediately after.',
            targetAction: {
              tab: 'mocks',
              label: 'Log Score →',
              filter: null
            }
          },
          {
            id: '1w-p1-t2',
            section: 'review',
            title: 'D-6 (Monday): Error Notebook Clean-Up',
            description:
              'Re-solve 5-8 questions from Mistake Notebook previously lost to calculation slips.',
            targetAction: {
              tab: 'notebook',
              label: 'Open Notebook →',
              filter: null
            }
          },
          {
            id: '1w-p1-t3',
            section: 'qa',
            title: 'D-5 (Tuesday): One 40-Min Sectional Sprint',
            description:
              'Take 1 sectional in your strongest section to boost morale. 6 TITA Para Jumbles.',
            targetAction: {
              tab: 'practice',
              label: 'Practice Drill →',
              filter: 'all'
            }
          }
        ]
      },
      {
        id: '1w-phase-2',
        name: 'Days 4 – 6: Formulas, Logistics & Exam Kit',
        dayStart: 4,
        dayEnd: 6,
        daysLabel: 'D-4 to D-2',
        goal: 'Clear all logistical stress and refresh formula memorization.',
        tasks: [
          {
            id: '1w-p2-t1',
            section: 'review',
            title: 'D-4 (Wednesday): Formula Flashcards & Trap Matrix',
            description:
              'Review Algebra identities, Geometry circle theorems, and common traps (units, parity, 0/1 bounds).',
            targetAction: {
              tab: 'syllabus',
              label: 'View Formulas →',
              filter: 'all'
            }
          },
          {
            id: '1w-p2-t2',
            section: 'review',
            title: 'D-3 (Thursday): Logistics Clear & Warm-Up Touch',
            description:
              'Print 2 copies of Admit Card, affix photo, verify original Photo ID, and map travel route.',
            targetAction: {
              tab: 'roadmaps',
              label: 'Logistics Checklist →',
              filter: null
            }
          },
          {
            id: '1w-p2-t3',
            section: 'review',
            title: 'D-2 (Friday): Pack Exam Pouch & Zero Social Media',
            description:
              'Pack clear exam pouch (Admit card, ID, photos). Avoid Telegram/WhatsApp prediction groups.',
            targetAction: {
              tab: 'roadmaps',
              label: 'View Checklist →',
              filter: null
            }
          }
        ]
      },
      {
        id: '1w-phase-3',
        name: 'Day 7: Complete Switch-Off & D-Day Execution',
        dayStart: 7,
        dayEnd: 7,
        daysLabel: 'D-1 & D-Day',
        goal: 'Complete cognitive rest on Saturday and 120-minute master execution on Sunday.',
        tasks: [
          {
            id: '1w-p3-t1',
            section: 'review',
            title: 'D-1 (Saturday): ABSOLUTE STUDY SHUTDOWN',
            description:
              'Zero books, zero mocks, zero lectures. Light walk, early dinner by 7:30 PM, sleep by 9:30 PM.',
            targetAction: {
              tab: 'roadmaps',
              label: 'View D-1 Guide →',
              filter: null
            }
          },
          {
            id: '1w-p3-t2',
            section: 'mock',
            title: 'D-Day (Sunday): The 120-Minute Master Execution',
            description:
              'Execute ABC triage in QA, 5-min scan in DILR, and enforce the Zero-Baggage rule between sections.',
            targetAction: {
              tab: 'roadmaps',
              label: 'Hall Playbook →',
              filter: null
            }
          }
        ]
      }
    ]
  }
];
