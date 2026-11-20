/**
 * Data structures for CAT Sprint Plans: 3-Month, 1-Month, and 1-Week countdown roadmaps,
 * along with verified curated internet resources from top percentilers and prep platforms.
 */

export const THREE_MONTH_PLAN_DATA = {
  id: '3m',
  title: '3-Month Master Sprint (90 Days / ~400 Hours)',
  subtitle:
    'The 3-phase high-ROI roadmap to transition from conceptual foundation to 99th percentile mock strategy.',
  overview: {
    totalHours: 400,
    weekdayCommitment: '3.5 - 4 hours / day',
    weekendCommitment: '7 - 8 hours / day',
    targetMockCount: '15 - 20 Full-Length Mocks',
    corePhilosophy:
      'CAT is an exam of smart selection, not completion. Focus 70% of effort on Arithmetic & Algebra in Quant, puzzle-anchor heuristics in DILR, and daily active reading in VARC.'
  },
  phases: [
    {
      phaseId: 'p1',
      month: 'Month 1 (Days 1–30)',
      name: 'Foundation & High-ROI Concept Dominance',
      goal: 'Lock in 70% of recurring CAT syllabus topics and establish a non-negotiable 3-track daily routine.',
      weeklyTargetHours: 32,
      mockFrequency: '1 Diagnostic Mock (Day 1) + 1 Mock every 10 days',
      sections: {
        qa: {
          focus: 'Arithmetic & Core Algebra (The 70% scoring engine)',
          topics: [
            'Percentages, Profit & Loss, SI/CI',
            'Ratios, Proportions & Variations',
            'Averages, Mixtures & Alligations',
            'Time, Speed, Distance & Work-Pipes',
            'Linear & Quadratic Equations, Logarithms'
          ],
          dailyVolume: '20-25 questions daily with shortcut exploration'
        },
        dilr: {
          focus: 'Standard Puzzle Mechanics & Constraint Anchoring',
          topics: [
            'Linear & Circular Arrangements',
            'Matrix Matchings (3-4 attributes)',
            'Games & Tournaments (Knockout & Round-Robin rules)',
            'Missing Data Tables & Cumulative Frequency'
          ],
          dailyVolume: '2 distinct sets daily (1 LR + 1 DI)'
        },
        varc: {
          focus: 'Active Reading Cadence & Non-MCQ Verbal Ability',
          topics: [
            '2 diverse articles daily (Aeon Essays, Guardian Long Reads, Smithsonian)',
            'Para Jumbles (TITA mandatory pairs)',
            'Para Summary (Eliminating distortive extreme choices)'
          ],
          dailyVolume: '2 RCs + 5 VA questions daily'
        }
      },
      checkpoints: [
        {
          id: '3m-m1-1',
          text: 'Take official CAT 2023 Slot 1 as a Diagnostic Mock (untimed or timed) to benchmark strengths and weaknesses'
        },
        {
          id: '3m-m1-2',
          text: 'Complete Arithmetic mastery (Percentages, Profit/Loss, Ratio, Averages, TSD, Work) — minimum 150 solved questions'
        },
        {
          id: '3m-m1-3',
          text: 'Master Quadratic Equations, Polynomials, and Logarithms cheatsheets and properties'
        },
        {
          id: '3m-m1-4',
          text: 'Solve 40 DILR foundation sets across Arrangements, Matrix Matchings, and Games & Tournaments'
        },
        {
          id: '3m-m1-5',
          text: 'Read 30 Aeon Essays / Guardian Long Reads with mental one-sentence paragraph summarization'
        },
        {
          id: '3m-m1-6',
          text: 'Set up Mistake Notebook with root-cause tags (Concept, Calculation, Trap Choice, Time Panic)'
        }
      ]
    },
    {
      phaseId: 'p2',
      month: 'Month 2 (Days 31–60)',
      name: 'Consolidation, Authentic PYQs & Weekly Mocks',
      goal: 'Bridge conceptual blind spots, master past 7 years authentic CAT sets, and institutionalize weekly mock autopsies.',
      weeklyTargetHours: 35,
      mockFrequency: '1 Full-Length Mock every weekend + 2 Mid-week Sectional Sprints',
      sections: {
        qa: {
          focus: 'Advanced Algebra, Geometry & Modern Math Foundations',
          topics: [
            'Functions, Graphs & Maxima/Minima',
            'Progressions (AP, GP, AGP)',
            'Geometry (Triangles similarity, Circles & Tangents, Mensuration)',
            'Permutations & Combinations (Basic cases & constraints)'
          ],
          dailyVolume: '20 PYQs with strict 2-minute timer per question'
        },
        dilr: {
          focus: 'Authentic CAT PYQ Sets (2017–2024 Slots)',
          topics: [
            'Unconventional hybrid reasoning (Routes & Networks, Optimization)',
            '4-Set Venn Diagrams (Maxima-Minima formulas)',
            'Multi-table caselets with algebraic constraints'
          ],
          dailyVolume: '3 actual CAT DILR sets daily with 15-minute selection evaluation'
        },
        varc: {
          focus: 'RC Option Elimination & Genre Acclimatization',
          topics: [
            'Philosophy, Sociology, Anthropology and Art critique passages',
            'Odd Sentence Out & Para Completion',
            'Distractor identification (Extreme words, Half-true statements)'
          ],
          dailyVolume: '3 RCs (timed 10 min/passage) + 6 VA questions'
        }
      },
      checkpoints: [
        {
          id: '3m-m2-1',
          text: 'Take 4 full-length mocks (SIMCAT / AIMCAT / Cracku DashCAT) strictly under exam conditions'
        },
        {
          id: '3m-m2-2',
          text: 'Execute 1:2 mock analysis rule: Spend 4 hours analyzing every 2-hour mock test'
        },
        {
          id: '3m-m2-3',
          text: 'Solve all CAT 2017–2024 actual DILR sets from 2IIM / Cracku repository'
        },
        {
          id: '3m-m2-4',
          text: 'Complete Geometry & Mensuration high-yield formula cheatsheets (Circles, Triangles, Coordinate)'
        },
        { id: '3m-m2-5', text: 'Practice 4-Set Venn Diagram Maxima/Minima optimization models' },
        {
          id: '3m-m2-6',
          text: 'Re-test at least 25 questions from the Mistake Notebook in hidden-answer mode'
        }
      ]
    },
    {
      phaseId: 'p3',
      month: 'Month 3 (Days 61–90)',
      name: 'Exam Mode, Triage Discipline & Biological Alignment',
      goal: 'Peak cognitive stamina, eliminate ego traps, master the ABC question triage method, and synchronize circadian rhythm.',
      weeklyTargetHours: 35,
      mockFrequency: '2 Full-Length Mocks per week (strictly during your allotted CAT slot)',
      sections: {
        qa: {
          focus: 'Round-Wise Execution (The ABC Strategy)',
          topics: [
            'Round 1 (0-15m): Instant Arithmetic & Algebra pickings (<90s each)',
            'Round 2 (15-32m): Multi-step solvable questions (2-2.5m each)',
            'Round 3 (32-40m): Calculated guesses on TITA & boundary checks'
          ],
          dailyVolume: 'Mixed-bag 22-question sectional sprints under 40-minute hard timer'
        },
        dilr: {
          focus: 'The 5-Minute Selection Protocol',
          topics: [
            'Minutes 0–5: Skim all 4-5 sets without picking up pen. Rank 1 (do first) to 4 (do never)',
            'Minutes 5–22: Crack Set #1 with 100% accuracy',
            'Minutes 22–38: Crack Set #2 completely',
            'Minutes 38–40: TITA value guesses'
          ],
          dailyVolume: '2 timed sectionals per week + set selection audits'
        },
        varc: {
          focus: 'Accuracy First Strategy (3 RCs + 8 VA or 4 RCs)',
          topics: [
            'Passage triage based on comfortable reading domain',
            'Eliminating negative marks in MCQs by discarding 50-50 gambles',
            'Non-MCQ VA aggressive maximization'
          ],
          dailyVolume: '1 sectional mock every 2 days'
        }
      },
      checkpoints: [
        {
          id: '3m-m3-1',
          text: 'Shift sleep cycle: Wake up at 6:00 AM daily to align with morning slot readiness'
        },
        {
          id: '3m-m3-2',
          text: 'Take 8 full mocks at exact slot time (Slot 1: 8:30am / Slot 2: 12:30pm / Slot 3: 4:30pm)'
        },
        {
          id: '3m-m3-3',
          text: 'Track Panic Delta: Measure difference between untimed capability score vs timed exam score'
        },
        {
          id: '3m-m3-4',
          text: 'Enforce ZERO NEW TOPICS rule: Never study new theory during the final 30 days'
        },
        {
          id: '3m-m3-5',
          text: 'Conduct comprehensive Mistake Notebook audit: verify 100% resolution of recurring calculation errors'
        },
        {
          id: '3m-m3-6',
          text: 'Taper off study intensity 4 days before CAT to allow cognitive replenishment'
        }
      ]
    }
  ]
};

export const ONE_MONTH_PLAN_DATA = {
  id: '1m',
  title: '1-Month Lockdown Sprint (30 Days to CAT)',
  subtitle:
    'Strict execution phase: Stop learning new theory. Double down on mock simulation, set selection discipline, and error notebook re-testing.',
  overview: {
    totalHours: 120,
    dailyCommitment: '4 - 5 hours / day',
    targetMockCount: '6 - 8 Full Mocks (tapering in final week)',
    goldenRule:
      'This is a consolidation and execution phase, not an acquisition phase. Your score will increase by dropping time-sink traps, not by cramming obscure geometry theorems.'
  },
  stages: [
    {
      stageId: 's1',
      period: 'Days 30 to 16 (Weeks 1 & 2)',
      name: 'Simulation & Diagnostic Autopsy',
      focus:
        'Lock in exam slot biological rhythm and conduct 4-hour forensic reviews of every mock test.',
      keyActions: [
        'Take 2 full-length mocks per week strictly during your assigned CAT slot (Morning / Afternoon / Evening).',
        'Spend at least 3.5 to 4 hours per mock on forensic autopsy: categorize every lost mark (Concept / Calculation / Trap / Time Sink).',
        'Solve 2 DILR sets and 2 RCs every single day without exception to maintain cognitive momentum.',
        'Review your personal Mistake Notebook for 30 minutes every evening before sleeping.',
        'Zero tolerance for new topics: If you have never touched Modulus or 3D Geometry, skip them permanently.'
      ],
      dailyScheduleTemplate: [
        {
          time: '08:30 - 10:30',
          activity: 'Slot Simulation / Timed Sectional (QA or VARC or DILR) or Full Mock'
        },
        {
          time: '11:00 - 13:00',
          activity: 'Forensic Mock Analysis: Re-solve unattempted and wrong questions without timer'
        },
        {
          time: '15:00 - 16:30',
          activity: 'High-Yield Drill: 15 Arithmetic/Algebra questions with Pro Shortcuts'
        },
        {
          time: '17:00 - 18:00',
          activity: 'VARC Reading: 1 Aeon Essay + 4 Para Summaries / Para Jumbles'
        },
        { time: '21:00 - 22:00', activity: 'Formula Diary & Mistake Notebook Re-test' }
      ],
      checkpoints: [
        {
          id: '1m-s1-1',
          text: 'Take Mock #1 in exact CAT slot with zero phone or ambient distractions'
        },
        {
          id: '1m-s1-2',
          text: 'Log Panic Delta in Mock Scorecard: identify which section suffered from time anxiety'
        },
        {
          id: '1m-s1-3',
          text: 'Re-solve all wrong questions from last 3 mocks without looking at solutions'
        },
        {
          id: '1m-s1-4',
          text: 'Practice 15 mental math & reciprocal percentage conversions daily'
        },
        { id: '1m-s1-5', text: 'Take Mock #2 and test strict 5-minute set selection rule in DILR' }
      ]
    },
    {
      stageId: 's2',
      period: 'Days 15 to 6 (Weeks 3 & 4)',
      name: 'Strategy Locking & Selection Discipline',
      focus: 'Finalize your section-wise attempt order and enforce the strict 90-second skip rule.',
      keyActions: [
        'Reduce mock frequency to 1 or max 2 mocks per week to avoid mental fatigue.',
        'Enforce the 5-Minute DILR Rule: Never start solving a set in minute 1. Evaluate all sets, identify constraints, pick the friendliest.',
        'Quant Round-Robin: In Round 1, solve only pure sitters (<90s). Leave everything else for Round 2.',
        'VARC Stability: Stop experimenting with passage order. Stick to your proven combination (e.g., 3 RCs + all 8 VA).',
        'Begin light physical exercises and set your bedtime to ensure 8 hours of solid sleep.'
      ],
      checkpoints: [
        {
          id: '1m-s2-1',
          text: 'Take Mock #3: enforce strict ABC rule in Quant (abandon any question exceeding 2.5 minutes)'
        },
        { id: '1m-s2-2', text: 'Take Mock #4 (Final heavy full mock of prep journey)' },
        {
          id: '1m-s2-3',
          text: 'Create a 4-page consolidated Cheat Sheet containing all essential formulas and traps'
        },
        {
          id: '1m-s2-4',
          text: 'Re-attempt 30 flagged questions in Mistake Notebook with 85%+ accuracy'
        },
        {
          id: '1m-s2-5',
          text: 'Download and print CAT Admit Card; verify test venue, slot, and reporting time'
        }
      ]
    },
    {
      stageId: 's3',
      period: 'Days 5 to 1 (The Taper Phase)',
      name: 'Confidence Preservation & Mental Taper',
      focus:
        'Stop full mocks completely. Protect your confidence and conserve cognitive energy for exam day.',
      keyActions: [
        'ABSOLUTE RULE: No full mock tests during the final 5 days. A sudden dip in score ruins exam temperament.',
        'Only light formula review, cheatsheet skimming, and 1-2 friendly puzzle sets to keep hands warm.',
        'Inspect the official IIM CAT Mock Test interface on iimcat.ac.in to get familiar with on-screen calculator.',
        'Arrange all logistics: Admit Card printouts, original government ID, passport photos, travel route.',
        'Sleep at least 8 hours every night. Your brain needs maximum neural replenishment.'
      ],
      checkpoints: [
        { id: '1m-s3-1', text: 'Freeze full mocks: No full tests from Day 5 onward' },
        {
          id: '1m-s3-2',
          text: 'Complete Official CAT Mock on iimcat.ac.in to test calculator and question palette'
        },
        { id: '1m-s3-3', text: 'Review formula diary 45 mins/day; zero new problem solving' },
        {
          id: '1m-s3-4',
          text: 'Pack exam pouch with admit card, original ID proof, and photo affixed'
        },
        { id: '1m-s3-5', text: 'Execute complete study shut-down on the day before CAT by 6:00 PM' }
      ]
    }
  ]
};

export const ONE_WEEK_PLAN_DATA = {
  id: '1w',
  title: '1-Week Countdown Protocol (D-7 to D-Day)',
  subtitle:
    'The hour-by-hour consolidation protocol to protect confidence, align biology, and peak on Sunday.',
  overview: {
    totalHours: 20,
    dailyCommitment: '2 - 3 hours / day (tapering to 0 on D-1)',
    targetMockCount: '1 Baseline Mock on D-7; ZERO full mocks thereafter',
    mindset:
      'You cannot double your aptitude in 7 days, but you can easily lose 20 percentile points through panic and sleep deprivation. Focus entirely on composure, precision, and rest.'
  },
  days: [
    {
      dayId: 'd7',
      dayLabel: 'D-7 (Sunday)',
      theme: 'The Final Baseline Mock',
      targetHours: '3.5 hours',
      tag: 'Final Simulation',
      tagColor: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/60 dark:text-indigo-300',
      description:
        'Take your final full-length mock test strictly at your allotted CAT slot time (Slot 1: 8:30am / Slot 2: 12:30pm / Slot 3: 4:30pm).',
      checklist: [
        {
          id: '1w-d7-1',
          text: 'Simulate exact exam conditions: clear table, no phone, wear exam clothes, adhere to strict 120-minute timer'
        },
        {
          id: '1w-d7-2',
          text: 'Do NOT panic over the score. Treat this solely as a final drill for pacing and set selection'
        },
        {
          id: '1w-d7-3',
          text: 'Conduct a gentle 1-hour review in the evening: note silly errors and time sinks'
        },
        {
          id: '1w-d7-4',
          text: 'Declare FULL MOCK FREEZE: This is the last full mock you will take before CAT'
        }
      ]
    },
    {
      dayId: 'd6',
      dayLabel: 'D-6 (Monday)',
      theme: 'Error Notebook Clean-Up & DILR Anchoring',
      targetHours: '3 hours',
      tag: 'Error Analysis',
      tagColor: 'bg-amber-100 text-amber-700 dark:bg-amber-900/60 dark:text-amber-300',
      description:
        'Clean up recurring mistakes from your Mistake Notebook and re-anchor your DILR set evaluation instincts.',
      checklist: [
        {
          id: '1w-d6-1',
          text: 'Re-solve 5-8 questions from your Mistake Notebook that you previously got wrong due to calculation slips'
        },
        {
          id: '1w-d6-2',
          text: 'Solve 2 moderate DILR sets (e.g. Games & Tournaments or Missing Table) untimed to reinforce confidence'
        },
        {
          id: '1w-d6-3',
          text: 'Read 2 editorial essays (Aeon or Smithsonian) to maintain reading speed and tone sensitivity'
        },
        { id: '1w-d6-4', text: 'Review Arithmetic formula cheatsheet for 30 minutes' }
      ]
    },
    {
      dayId: 'd5',
      dayLabel: 'D-5 (Tuesday)',
      theme: 'Light Sectional Sprints (Confidence Booster)',
      targetHours: '2.5 hours',
      tag: 'Micro-Pacing',
      tagColor: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/60 dark:text-emerald-300',
      description:
        'Build confidence with short sectionals. Focus on maximizing accuracy, not volume.',
      checklist: [
        {
          id: '1w-d5-1',
          text: 'Take ONE 40-minute sectional test in your strongest section to boost morale'
        },
        {
          id: '1w-d5-2',
          text: 'Practice 6 TITA Para Jumbles & 4 Para Summaries (zero negative marking drills)'
        },
        {
          id: '1w-d5-3',
          text: 'Review Algebra cheatsheet: Quadratics, Logarithms, and Progressions formulas'
        },
        { id: '1w-d5-4', text: 'Strict 10:30 PM bedtime to cement circadian sleep rhythm' }
      ]
    },
    {
      dayId: 'd4',
      dayLabel: 'D-4 (Wednesday)',
      theme: 'Formula & Trap Matrix Flash Consolidation',
      targetHours: '2 hours',
      tag: 'Formulas & Traps',
      tagColor: 'bg-purple-100 text-purple-700 dark:bg-purple-900/60 dark:text-purple-300',
      description: 'Mental mapping and formula memorization refresh. Zero complex problem-solving.',
      checklist: [
        {
          id: '1w-d4-1',
          text: 'Review Geometry & Mensuration formulas: Circle theorems, triangle medians, volume ratios'
        },
        {
          id: '1w-d4-2',
          text: 'Review common exam traps: Units conversion (km/h vs m/s), odd/even parity, boundary values (0, 1)'
        },
        {
          id: '1w-d4-3',
          text: 'Spend 20 minutes testing the official CAT on-screen calculator shortcuts on iimcat.ac.in'
        },
        { id: '1w-d4-4', text: 'Do 30 minutes of light physical walking or stretching' }
      ]
    },
    {
      dayId: 'd3',
      dayLabel: 'D-3 (Thursday)',
      theme: 'Logistics Clear & Warm-Up Touch',
      targetHours: '1.5 hours',
      tag: 'Logistics & Warm-up',
      tagColor: 'bg-blue-100 text-blue-700 dark:bg-blue-900/60 dark:text-blue-300',
      description:
        'Clear all logistical stress so exam week has zero friction, and do a gentle problem-solving touch.',
      checklist: [
        {
          id: '1w-d3-1',
          text: 'Print 2 clean copies of CAT Admit Card (color printout recommended)'
        },
        {
          id: '1w-d3-2',
          text: 'Affix identical passport-size photograph on the Admit Card as per instructions'
        },
        {
          id: '1w-d3-3',
          text: 'Verify original Government Photo ID (Aadhaar Card / Passport / Voter ID) — digital copies not accepted'
        },
        {
          id: '1w-d3-4',
          text: 'Map travel route to test center: check Google Maps traffic forecast and plan to reach 60 mins early'
        },
        {
          id: '1w-d3-5',
          text: 'Solve 3 easy Quant questions and 1 familiar RC passage just to keep cognitive gears rotating'
        }
      ]
    },
    {
      dayId: 'd2',
      dayLabel: 'D-2 (Friday)',
      theme: 'Light Skimming & Exam Kit Packing',
      targetHours: '1 hour',
      tag: 'Packing & Calm',
      tagColor: 'bg-teal-100 text-teal-700 dark:bg-teal-900/60 dark:text-teal-300',
      description:
        'Complete mental relaxation. Put your study materials aside and prepare your physical exam kit.',
      checklist: [
        {
          id: '1w-d2-1',
          text: 'Pack your clear exam folder: Printed Admit Card, Original Photo ID, 2 spare passport photos'
        },
        {
          id: '1w-d2-2',
          text: 'Select comfortable, simple exam clothes (no metal jewelry, jackets with large buttons, or prohibited items)'
        },
        { id: '1w-d2-3', text: 'Brief 30-minute glance at your 1-page formula cheatsheet' },
        {
          id: '1w-d2-4',
          text: 'Do NOT engage in online CAT prediction forums, telegram groups, or WhatsApp flame wars'
        },
        { id: '1w-d2-5', text: 'Eat a light, home-cooked dinner and go to bed early' }
      ]
    },
    {
      dayId: 'd1',
      dayLabel: 'D-1 (Saturday)',
      theme: 'Complete Cognitive Switch-Off',
      targetHours: '0 hours',
      tag: 'Zero Study',
      tagColor: 'bg-rose-100 text-rose-700 dark:bg-rose-900/60 dark:text-rose-300',
      description:
        'Zero books, zero mocks, zero lectures. Conserve every ounce of neural energy for tomorrow.',
      checklist: [
        {
          id: '1w-d1-1',
          text: 'ABSOLUTE STUDY SHUTDOWN: Do not touch books, formula sheets, or YouTube strategy videos'
        },
        {
          id: '1w-d1-2',
          text: 'Watch a light movie, listen to calming music, or spend relaxing time with family/friends'
        },
        {
          id: '1w-d1-3',
          text: 'Hydrate well throughout the day; avoid excessive caffeine or junk food'
        },
        { id: '1w-d1-4', text: 'Set two independent alarms for tomorrow morning' },
        {
          id: '1w-d1-5',
          text: 'In bed with lights off by 9:30 - 10:00 PM. Rest your eyes even if sleep takes time to arrive'
        }
      ]
    },
    {
      dayId: 'dday',
      dayLabel: 'D-Day (Sunday)',
      theme: 'The 120-Minute Master Execution',
      targetHours: '2 hours exam',
      tag: 'Game Day',
      tagColor: 'bg-red-600 text-white shadow-md shadow-red-500/20',
      description:
        'Trust your preparation. Execute the ABC strategy and treat each 40-minute block as an independent game.',
      checklist: [
        {
          id: '1w-dd-1',
          text: 'Wake up 3 hours before your slot; eat a light, energetic breakfast (banana, toast, oats)'
        },
        {
          id: '1w-dd-2',
          text: 'Reach exam venue 60-75 mins before gate closure; complete biometric registration calmly'
        },
        {
          id: '1w-dd-3',
          text: 'Inside Hall (Minutes -15 to 0): Close your eyes, practice deep diaphragmatic breathing, clear mental noise'
        },
        {
          id: '1w-dd-4',
          text: 'Section 1 VARC (0-40m): Read with active tone visualization. Do not rush. Eliminate trap choices methodically'
        },
        {
          id: '1w-dd-5',
          text: 'Section 2 DILR (40-80m): Spend first 4 minutes scanning all sets. Pick the 2 cleanest sets. 8-10 net correct = 99%ile!'
        },
        {
          id: '1w-dd-6',
          text: 'Section 3 QA (80-120m): Execute Round 1 sitters instantly (<90s). Never let your ego trap you in a question'
        },
        {
          id: '1w-dd-7',
          text: 'The Zero-Baggage Rule: The second a section ends, it ceases to exist. Never carry anxiety into the next section'
        }
      ]
    }
  ]
};

export const CURATED_INTERNET_RESOURCES = [
  {
    id: 'res-rodha',
    platform: 'Rodha (Ravi Prakash)',
    category: 'Concept & Comprehensive Video Theory',
    badge: 'Gold Standard Video',
    badgeColor: 'bg-red-100 text-red-800 dark:bg-red-900/60 dark:text-red-300',
    description:
      'Massive, exhaustive free YouTube playlists covering Arithmetic, Algebra, Number Systems, Geometry, and DILR from absolute scratch to 99th percentile level.',
    bestFor: 'Foundations & Comprehensive Concept Building (Months 1 & 2 of 3M Plan)',
    links: [
      { title: 'Rodha YouTube Channel', url: 'https://www.youtube.com/@Rodha' },
      { title: 'Rodha Official Portal', url: 'https://rodha.co.in' }
    ],
    recommendedPlaylists: [
      'Complete Arithmetic for CAT (Percentages to TSD)',
      'Complete Algebra Masterclass (Quadratics, Logs, Functions)',
      'CAT DILR Exhaustive Puzzle Playlists'
    ]
  },
  {
    id: 'res-cracku',
    platform: 'Cracku',
    category: 'Daily Targets, Shortcuts & Free Full Mocks',
    badge: '100%iler Strategy & Free Mocks',
    badgeColor: 'bg-blue-100 text-blue-800 dark:bg-blue-900/60 dark:text-blue-300',
    description:
      'Founded by 100-percentilers (Maruti Konduri & Sayali Kale). Renowned for free full-length CAT mock tests, Daily Target question series, and high-velocity shortcuts.',
    bestFor: 'Mocks, Shortcuts & Daily Practice Drills (All Phases of 3M & 1M Plans)',
    links: [
      { title: 'Cracku Free CAT Mocks & Portal', url: 'https://cracku.in/cat-mock-test' },
      {
        title: 'Cracku Past Year Papers (2000-2024)',
        url: 'https://cracku.in/cat-previous-papers'
      },
      { title: 'Cracku YouTube Channel', url: 'https://www.youtube.com/@Cracku' }
    ],
    recommendedPlaylists: [
      'Cracku Free Full-Length All-India Open Mocks',
      'Daily Target Sectional Practice Engine',
      'Slot-wise Authentic CAT Video Solutions'
    ]
  },
  {
    id: 'res-2iim',
    platform: '2IIM CAT Preparation (Rajesh Balasubramanian)',
    category: 'Official Past Papers & Conceptual Depth',
    badge: 'Best Free PYQ Repository',
    badgeColor: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/60 dark:text-emerald-300',
    description:
      'Completely open-access past CAT question bank (2017 to 2024 slots) with detailed text derivations, alternative shortcut solutions, and video explanations with zero paywalls.',
    bestFor:
      'Authentic Past Paper Practice & Alternative Algebraic Shortcuts (Months 2 & 3, 1-Month Plan)',
    links: [
      { title: '2IIM Free CAT Question Bank (2017-2024)', url: 'https://2iim.com/cat-questions/' },
      { title: '2IIM Free CAT Material & Notes', url: 'https://2iim.com/free-cat-material/' },
      { title: '2IIM YouTube Channel', url: 'https://www.youtube.com/@2IIMCAT' }
    ],
    recommendedPlaylists: [
      'CAT Official Papers 2017-2024 Slot-by-Slot Video Autopsy',
      '2IIM Arithmetic & Number Theory First Principles',
      'Rajesh Sir’s Non-Formulaic Quant Thinking'
    ]
  },
  {
    id: 'res-elites-grid',
    platform: 'Elites Grid (Hunny Malhotra & Gaurav)',
    category: 'Unconventional DILR & High-Difficulty Quant',
    badge: 'Top DILR Problem Solving',
    badgeColor: 'bg-purple-100 text-purple-800 dark:bg-purple-900/60 dark:text-purple-300',
    description:
      'Arguably the most acclaimed DILR problem-solving YouTube channel in the CAT community. Teaches students how to break down brand new, never-seen-before hybrid puzzle sets.',
    bestFor:
      'Advanced DILR Puzzle Anchoring & Games/Tournaments (Months 1 & 2 of 3M, 1-Month Plan)',
    links: [
      { title: 'Elites Grid YouTube Channel', url: 'https://www.youtube.com/@ElitesGrid' },
      { title: 'Elites Grid Official Website', url: 'https://www.elitesgrid.com' }
    ],
    recommendedPlaylists: [
      'Elites Grid DILR Must-Solve 100 Sets Series',
      'Games & Tournaments Master Series',
      'Quant Revision Booster & Advanced Algebra Sets'
    ]
  },
  {
    id: 'res-takshzila',
    platform: 'Takshzila Shikshak (Nishit Sinha & Chandra)',
    category: 'Theory Fundabooks & Rigorous Fundamentals',
    badge: 'Free Fundabooks PDFs',
    badgeColor: 'bg-amber-100 text-amber-800 dark:bg-amber-900/60 dark:text-amber-300',
    description:
      'Famous for their free downloadable "Fundabooks" covering Number Systems, Arithmetic, Algebra, and Geometry with crystal-clear academic proofs and progressive examples.',
    bestFor: 'Textbook Learners & Clear Concept Reading (Month 1 of 3M Plan)',
    links: [
      { title: 'Takshzila Fundabooks & Free Downloads', url: 'https://takshzila.com' },
      { title: 'Takshzila YouTube Channel', url: 'https://www.youtube.com/@Takshzila' }
    ],
    recommendedPlaylists: [
      'Takshzila Free Fundabooks PDF Archives',
      'Takshzila Geometry & Mensuration Visual Proofs',
      'Quantitative Aptitude Deep Mechanics'
    ]
  },
  {
    id: 'res-bodhee-gejo',
    platform: 'Bodhee Prep & Gejo Speaks',
    category: 'VARC Reading Comprehension & Critical Reasoning',
    badge: 'VARC Masterclasses',
    badgeColor: 'bg-sky-100 text-sky-800 dark:bg-sky-900/60 dark:text-sky-300',
    description:
      'Bodhee Prep (Brijesh Pandey) and Gejo Speaks provide exceptional breakdowns of RC passages, identifying author tone, argument structure, and eliminating trick options.',
    bestFor: 'RC Inference Mastery & Option Elimination Drills (All Plans)',
    links: [
      { title: 'Bodhee Prep VARC Portal', url: 'https://bodheeprep.com' },
      { title: 'Bodhee Prep YouTube', url: 'https://www.youtube.com/@bodheeprep' },
      { title: 'Gejo Speaks YouTube', url: 'https://www.youtube.com/@GejoSpeaks' }
    ],
    recommendedPlaylists: [
      'Bodhee Prep RC Passage Breakdown & Inference Walkthroughs',
      'Gejo Speaks Verbal Ability & Option Elimination Strategy',
      'Philosophy & Sociology Passage Reading Guides'
    ]
  },
  {
    id: 'res-iim-official',
    platform: 'IIM Official CAT Portal (iimcat.ac.in)',
    category: 'Official Interface & Mock Simulator',
    badge: 'Official Exam Interface',
    badgeColor: 'bg-rose-100 text-rose-800 dark:bg-rose-900/60 dark:text-rose-300',
    description:
      'The official test delivery simulator provided by the convening IIM. Absolutely mandatory for getting comfortable with the on-screen scientific calculator, timer, and question palette.',
    bestFor: 'Exam Interface Acclimatization (1-Month Plan & 1-Week Protocol D-4)',
    links: [
      { title: 'IIM CAT Official Website', url: 'https://iimcat.ac.in' },
      {
        title: 'Official Mock Test Interface Link',
        url: 'https://cdn.digialm.com//OnlineAssessment/index.html?166@@M214'
      }
    ],
    recommendedPlaylists: [
      'Official CAT On-Screen Calculator Tutorial',
      'Exam Day Rules, Permitted Items & Hall Protocol Document'
    ]
  },
  {
    id: 'res-reading-hubs',
    platform: 'Aeon Essays & Long Read Portals',
    category: 'Daily VARC Reading Stamina',
    badge: 'Core Reading Sources',
    badgeColor: 'bg-teal-100 text-teal-800 dark:bg-teal-900/60 dark:text-teal-300',
    description:
      'The exact intellectual journals where IIM CAT passage setters source authentic RCs from: Philosophy, evolutionary biology, anthropology, and socio-economic critique.',
    bestFor: 'Daily Active Reading habit (1 to 2 articles daily across 3M & 1M plans)',
    links: [
      { title: 'Aeon Essays (Philosophy & Ideas)', url: 'https://aeon.co/essays' },
      {
        title: 'The Guardian Long Reads',
        url: 'https://www.theguardian.com/news/series/the-long-read'
      },
      {
        title: 'Project Syndicate (Global Economics & Policy)',
        url: 'https://www.project-syndicate.org'
      },
      { title: 'Smithsonian Magazine (Science & History)', url: 'https://www.smithsonianmag.com' }
    ],
    recommendedPlaylists: [
      'Daily 20-Minute Active Essay Summaries',
      'Tone Identification: Cynical vs Objective vs Sceptical vs Analytical'
    ]
  }
];
