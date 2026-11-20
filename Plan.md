# CatPrep — Master Execution Plan: Architecture Refactor, Multi-Track Planner & Visual E2E Audit

**Version**: 2.0  
**Last Updated**: November 21, 2026  
**Status**: Ready for Execution  
**Repository**: `d:\Dev\CatPrep`

---

## Executive Summary

This Master Execution Plan synthesizes the existing capabilities of **CatPrep** (including the newly established Sprint Roadmaps, R-E-S-T Weekly Planner, Mistake Notebook, Mock Scorecard with Panic Delta, Gemini AI Vision Solver, and Firebase Cloud Sync) and extends them into a unified, modular, production-grade architecture.

The plan spans **6 Phased Objectives**:
1. **Repository Audit, Prettier Formatting & Full Architectural Refactor**: Modularize into `features/`, `hooks/`, `services/`, and `components/common/`, extracting all business logic from JSX (<250 lines/component) with zero regressions.
2. **Unified Multi-Track Study Planner (`3-Month`, `1-Month`, `1-Week` + `R-E-S-T`)**: Build structured, phase-driven tracks with focus splits, deep-link actions (`targetAction: { tab, label, filter }`), dynamic `Day X of Y` tracking, and Dashboard integration.
3. **End-to-End Testing & Visual Audit (Pass 1)**: Automated screenshot capture across all flows on Desktop (`1440x900`) and Mobile (`390x844`) saved to `./audit/pass-1/`.
4. **Visual & UX Audit Report**: Comprehensive inspection of Pass 1 screenshots documenting spacing, contrast, hierarchy, and mobile responsive fixes in `./audit/ux-improvements.md`.
5. **UX Improvements Implementation**: Execute all high and medium priority fixes across the design system.
6. **Final E2E Verification & Screenshot Comparison (Pass 2)**: Re-run test suite, capture `./audit/pass-2/` screenshots, confirm zero regressions, and verify 100% clean `npm run build`.

---

## Phase 1: Repository Audit, Formatting & Architectural Refactor

### 1.1 Discovery & Baseline Verification
- Confirm clean baseline build with `npm run build` and lint status via `oxlint`.
- Review existing data schemas (`examsData.js`, `questionsData.js`, `sprintPlansData.js`, `plannerConstants.js`) and storage adapters (`storage.js`, `cloudSync.js`).

### 1.2 Formatting & Linting Standardization
- Install `prettier` as a dev dependency.
- Configure `.prettierrc`:
  ```json
  {
    "semi": true,
    "singleQuote": true,
    "tabWidth": 2,
    "trailingComma": "none",
    "printWidth": 100
  }
  ```
- Configure `.prettierignore` (ignoring `dist/`, `node_modules/`, `audit/`).
- Add `"format": "prettier --write \"src/**/*.{js,jsx,css,json}\""` and `"format:check": "prettier --check \"src/**/*.{js,jsx,css,json}\""` to `package.json`.
- Execute full codebase formatting pass.

### 1.3 Target Directory Architecture
Refactor the codebase from flat and mixed component folders into a strict separation-of-concerns architecture:

```
src/
├── components/
│   ├── common/                          # Reusable UI primitives
│   │   ├── Button.jsx                   # Standard button with variants (primary, ghost, danger)
│   │   ├── Card.jsx                     # Base card container with dark-mode borders
│   │   ├── Badge.jsx                    # Status, section & difficulty pill badges
│   │   ├── ProgressBar.jsx              # Normalized progress bar with KaTeX compatibility
│   │   ├── Modal.jsx                    # Accessible modal dialog with backdrop blur
│   │   └── EmptyState.jsx               # Standardized empty states with action triggers
│   │
│   ├── layout/                          # Global application shell & navigation
│   │   ├── Header.jsx                   # Sticky top bar with brand & user controls
│   │   ├── NavigationTabs.jsx           # Primary 8-tab navigation switcher
│   │   ├── BrandLogo.jsx                # Brand typography & percentile badge
│   │   ├── QuickStatsBar.jsx            # Daily question & streak counter
│   │   ├── ExamSelector.jsx             # Active exam switcher (CAT / XAT / GMAT)
│   │   ├── DataActions.jsx              # Export/Import JSON & Settings triggers
│   │   ├── GoogleSignInButton.jsx       # Firebase Google OAuth launcher
│   │   └── UserProfileDropdown.jsx      # User profile, sync status & logout
│   │
│   └── features/                        # Lean feature domains (<250 lines per file)
│       ├── dashboard/                   # DashboardTracker & metrics widgets
│       │   ├── DashboardTracker.jsx     # Dashboard domain container
│       │   ├── ExamHeroBanner.jsx       # Welcome banner & exam countdown timer
│       │   ├── DailyMetricsGrid.jsx     # Daily target completion meters
│       │   ├── DailyTargetEditor.jsx    # Inline target modifier modal
│       │   ├── SyllabusBurndownCard.jsx # Syllabus completion bar & burndown
│       │   ├── VelocityForecastCard.jsx # Daily question velocity & exam forecast
│       │   └── ActivePlanWidget.jsx     # Summary card of active study plan track
│       │
│       ├── planner/                     # Unified Multi-Track & Weekly Planner
│       │   ├── StudyPlanner.jsx         # Planner domain container (Track & Mode switcher)
│       │   ├── TrackSelector.jsx        # Segmented cards for 3-Month, 1-Month, 1-Week
│       │   ├── ProgressBanner.jsx       # Day X of Y, start date modifier, reset trigger
│       │   ├── PhaseCard.jsx            # Collapsible phase container with active badge
│       │   ├── TaskRow.jsx              # Interactive task with deep-link navigation
│       │   ├── RestWeeklyView.jsx       # 7-day cyclical R-E-S-T weekly planner view
│       │   ├── DayScheduleCard.jsx      # Daily schedule card for R-E-S-T mode
│       │   ├── PillarFilterCards.jsx    # R-E-S-T pillar filter chips
│       │   └── AddTaskModal.jsx         # Custom task creation modal
│       │
│       ├── practice/                    # Question practice & solution engine
│       │   ├── QuestionPractice.jsx     # Practice domain container
│       │   ├── PracticeFiltersHeader.jsx# Section, topic, difficulty & year filters
│       │   ├── QuestionCard.jsx         # Question prompt with KaTeX typography
│       │   ├── QuestionOptions.jsx      # MCQ options with post-submission grading
│       │   ├── QuestionTitaInput.jsx     # TITA numeric keypad & input field
│       │   ├── SolutionDrawer.jsx       # 4-tier solution drawer (Step/Shortcut/Concept/Traps)
│       │   ├── ScreenshotDropzone.jsx   # Clipboard & file screenshot upload zone
│       │   ├── GeminiAutoSolveSection.jsx # Gemini Vision OCR trigger
│       │   └── AddQuestionModal.jsx     # Custom question creation modal
│       │
│       ├── mistakes/                    # Mistake Notebook & Re-test engine
│       │   ├── MistakeNotebook.jsx      # Mistake Notebook domain container
│       │   ├── NotebookHeader.jsx       # Mistake counters & root-cause filter pills
│       │   ├── NotebookQuestionCard.jsx # Mistake card container
│       │   ├── InlineRetestArea.jsx     # In-place re-test mode with hidden answer
│       │   ├── MistakeReflectionNotes.jsx # Personal error reflection editor
│       │   └── NotebookSolutionViewer.jsx # Tabbed solution review drawer
│       │
│       ├── mocks/                       # Mock test scorecard & diagnostics
│       │   ├── MockScorecard.jsx        # Mock scorecard domain container
│       │   ├── MockScorecardHeader.jsx  # Header & Log Mock Test CTA
│       │   ├── PanicDeltaInsightCard.jsx# Capability Score vs Panic Delta explainer
│       │   ├── SectionScoreCard.jsx     # Section breakdown (VARC, DILR, QA)
│       │   ├── MockReportCard.jsx       # Mock history report card
│       │   └── LogMockModal.jsx         # Test score logger modal
│       │
│       ├── syllabus/                    # Syllabus manager & topic masterclasses
│       │   ├── SyllabusManager.jsx      # Syllabus domain container
│       │   ├── SyllabusHeader.jsx       # Header & section switchers
│       │   ├── SectionTabs.jsx          # Section tabs (QA, DILR, VARC)
│       │   ├── ModuleCard.jsx           # Module accordion card
│       │   ├── TopicRow.jsx             # Topic row with confidence stars & status
│       │   ├── TopicDetailsDrawer.jsx   # Topic cheatsheet & subtopics drawer
│       │   └── CuratedVideoItem.jsx     # Verified YouTube masterclass item
│       │
│       ├── roadmaps/                    # Countdown Roadmaps & Resources Hub
│       │   ├── SprintPlansView.jsx      # Sprint plans container & mode switcher
│       │   ├── ThreeMonthPlanView.jsx   # 90-day phase-wise sprint view
│       │   ├── OneMonthPlanView.jsx     # 30-day lockdown execution view
│       │   ├── OneWeekPlanView.jsx      # D-7 to D-Day countdown protocol view
│       │   ├── InternetResourcesView.jsx# Curated directory of free internet resources
│       │   └── SprintMilestoneChecklist.jsx # Interactive milestone checklist
│       │
│       ├── resources/                   # Benchmark cutoffs & repositories
│       │   ├── ResourcesGuide.jsx       # Resources domain container
│       │   ├── ScorePercentileTable.jsx # Historical score vs percentile benchmarks
│       │   ├── PastPapersRepository.jsx # Official paper archive links
│       │   ├── VideoMasterclassesList.jsx # Educator channel recommendations
│       │   └── ExamExtensibilityCards.jsx # Multi-exam architecture overview
│       │
│       └── settings/                    # AI & Firebase Configuration
│           ├── SettingsModal.jsx        # Gemini AI settings modal
│           ├── ApiKeyForm.jsx           # API key input & validation
│           ├── FeatureExplainer.jsx     # Vision OCR feature overview
│           ├── FirebaseSetupModal.jsx   # Firebase setup wizard
│           ├── SetupStepItem.jsx        # Setup wizard step card
│           └── EnvTemplateBlock.jsx     # Environment variable copy block
│
├── hooks/                               # Custom React Hooks
│   ├── useLocalStorage.js               # Reactive LocalStorage wrapper
│   ├── useStudyPlans.js                 # Multi-track plan state & task toggling
│   ├── usePractice.js                   # Question filtering, answers & TITA grading
│   ├── useMistakes.js                   # Mistake collection, tagging & re-tests
│   ├── useMockScorecard.js              # Mock score calculations & panic delta
│   └── useCloudSync.js                  # Cloud sync debouncing & auth sync
│
├── services/                            # Pure Business Logic & Storage Adapters
│   ├── storageService.js                # Core localStorage read/write/backup engine
│   ├── planCalculator.js                # Day X of Y, completion %, active phase math
│   ├── mockScoringService.js            # Official score formulas & percentile models
│   ├── cloudSyncService.js              # Firestore push/pull synchronization
│   └── geminiService.js                 # Gemini Vision OCR prompt & JSON parsing
│
├── data/                                # Static Data Registries Only
│   ├── examsData.js                     # Multi-exam syllabus & topic definitions
│   ├── questionsData.js                 # Seeded PYQs & 4-tier solution models
│   ├── studyPlansData.js                # Multi-Track plans (3M, 1M, 1W) with deep-links
│   └── sprintPlansData.js               # Strategic sprint roadmaps & curated resources
│
├── utils/                               # Stateless Utility Functions
│   ├── dateUtils.js                     # Date formatting, day differences, slot timers
│   ├── formatters.js                    # Percentage, score, and minute formatters
│   └── mathUtils.js                     # Net score & accuracy calculations
│
└── context/
    └── AuthContext.jsx                  # Firebase auth context & user session
```

### 1.4 Refactoring Directives
- **Zero Business Logic in JSX**: Components should only handle presentation and dispatch hook actions.
- **Single Responsibility**: Enforce strict `<250` lines per component.
- **Zero Regressions**: Maintain complete backward compatibility with `CATPREP_USER_DATA_V1` LocalStorage key and Firebase schemas.

---

## Phase 2: Unified Multi-Track Study Planner Implementation

### 2.1 Multi-Track Data Specification (`src/data/studyPlansData.js`)

Define `STUDY_PLANS` supporting three tracks with deep-link navigation actions:

#### 1. Track: `3-month` (90 Days | 3–4 hrs/day)
- **Focus Split**: 40% Concept / 40% Practice / 20% Revision
- **Mock Cadence**: 1 mock/10 days (M1) $\rightarrow$ 1 mock/week (M2) $\rightarrow$ 2 mocks/week (M3)
- **Phases**:
  - `Phase 1 (Days 1–30)`: Foundation & High-ROI Concept Dominance (Arithmetic, Core Algebra, Standard Arrangements, Daily Aeon Reading).
  - `Phase 2 (Days 31–60)`: Authentic PYQ Consolidation & Sectionals (2017–2024 DILR sets, Advanced Algebra, Triangles/Circles, Weekly Mocks with 1:2 autopsy).
  - `Phase 3 (Days 61–90)`: Exam Temperament, ABC Question Triage & Slot Synchronization (2 slot-timed mocks/week, 5-min DILR scan rule, Mistake Notebook purge).

#### 2. Track: `1-month` (30 Days | 5–6 hrs/day)
- **Focus Split**: 15% Concept / 50% Practice / 35% Revision
- **Mock Cadence**: 2 slot-timed mocks/week (Days 30–15) $\rightarrow$ 1 mock/week (Days 14–5) $\rightarrow$ Mock Freeze (Days 4–1)
- **Phases**:
  - `Phase 1 (Days 30–16)`: Simulation & Forensic Autopsy (2 slot-timed mocks/week, 4-hour autopsy, 15 high-yield QA daily, 2 DILR sets, zero new theory).
  - `Phase 2 (Days 15–6)`: Strategy Locking & Selection Discipline (ABC question triage, 5-minute DILR rule, VARC passage prioritization, admit card logistics).
  - `Phase 3 (Days 5–1)`: Mental Taper & Energy Preservation (No full mocks, formula cheatsheets, sleep synchronization).

#### 3. Track: `1-week` (7 Days | 4–5 hrs/day)
- **Focus Split**: 0% New Concepts / 30% Light Practice / 70% Revision
- **Mock Cadence**: 1 Baseline Mock on D-7; **Zero** thereafter
- **Phases**:
  - `Day 7 (D-7)`: Final Baseline Mock at slot time.
  - `Day 6 (D-6)`: Mock Autopsy & Error Notebook Re-test.
  - `Day 5 (D-5)`: Light Sectional Sprints (Confidence Booster).
  - `Day 4 (D-4)`: Formula & Trap Matrix Flash Consolidation.
  - `Day 3 (D-3)`: Warm-up Touch & Logistics Clear (Admit Card, Original Photo ID).
  - `Day 2 (D-2)`: Light Skimming & Exam Kit Packing.
  - `Day 1 (D-1)`: Complete Cognitive Switch-Off (Zero studying).
  - `D-Day`: 120-Minute Master Execution Playbook.

#### Task Data Schema with Deep-Link Navigation:
```javascript
{
  id: '3m-p1-t1',
  section: 'qa', // 'qa' | 'dilr' | 'varc' | 'mock' | 'review'
  title: 'Percentages & Multiplier Practice',
  description: 'Solve 15 authentic PYQs focusing on fraction-to-percentage conversions and successive changes.',
  targetAction: {
    tab: 'practice',
    label: 'Practice QA →',
    filter: 'qa-percentages'
  }
}
```

### 2.2 Plan State & Logic Engine (`useStudyPlans.js` & `planCalculator.js`)
- Store plan tracking under key `catprep_study_plans_v1`:
  ```javascript
  {
    activeTrackId: '3-month',
    tracks: {
      '3-month': { startDate: '2026-09-01', completedTaskIds: ['3m-p1-t1'] },
      '1-month': { startDate: '2026-11-01', completedTaskIds: [] },
      '1-week': { startDate: '2026-11-22', completedTaskIds: [] }
    }
  }
  ```
- **Auto-Initialization**: Initialize `startDate` to today on first visit if unset.
- **Dynamic Calculation**: Compute `currentDay = differenceInDays(today, startDate) + 1`, `completionPercentage`, and determine active phase.
- **Reset Confirmation**: Support resetting active track progress with a confirmation prompt.
- **Cross-Module Deep-Links**: Support jumping from a planner task directly to Practice (with topic pre-filtered), Mistake Notebook, or Mocks scorecard.

### 2.3 Dashboard Integration (`ActivePlanWidget.jsx`)
- Embed an active plan progress widget in `DashboardTracker.jsx`.
- Displays: Active Track name, Focus split pill, `Day X of Y` progress bar, % completed, and the next uncompleted task with 1-click launcher.

---

## Phase 3: End-to-End Testing & Visual Audit (Pass 1)

### 3.1 Test Automation Setup
- Set up an automated browser testing script using Playwright or headless Chrome.
- Configure two standardized viewports:
  - **Desktop**: `1440 × 900`
  - **Mobile**: `390 × 844` (iPhone 14 / modern mobile standard)
- Serve the application via Vite (`npm run dev` or `vite preview`).

### 3.2 Automated Flow Verification
1. **Navigation Flow**: Switch through all 8 tabs (Daily Tracker, Study Planner, Sprint Plans, Syllabus, Practice, Mistake Notebook, Mock Scorecard, Resources) verifying zero JS errors or broken styles.
2. **Planner Flow**:
   - Switch between 3-Month, 1-Month, and 1-Week tracks.
   - Toggle tasks complete/incomplete; verify persistence after page reload.
   - Modify start date; verify `Day X of Y` updates dynamically.
   - Click deep-link actions (`Practice QA →`) and confirm seamless navigation to Practice with topic filters applied.
   - Verify Reset Plan confirmation dialog.
3. **Practice Flow**: Attempt MCQ and TITA questions, test 4-tier solution drawer, submit answers, and flag to Mistake Notebook.
4. **Syllabus Flow**: Update topic statuses (In Progress / Completed), modify confidence stars.
5. **Mistake Notebook Flow**: Filter by root cause, enter Re-test mode, re-attempt question with hidden answers.
6. **Mock Scorecard Flow**: Open Log Mock modal, calculate net scores, verify Panic Delta calculation.
7. **Sprint Plans Flow**: Switch between 3M, 1M, 1W, and Internet Resources, verify external links and checklist persistence.

### 3.3 Screenshot Capture Directory (`./audit/pass-1/`)
Save high-resolution screenshots for both viewports:
- `dashboard-desktop.png`, `dashboard-mobile.png`
- `planner-3month-desktop.png`, `planner-1month-desktop.png`, `planner-1week-desktop.png`, `planner-mobile.png`
- `roadmaps-desktop.png`, `roadmaps-mobile.png`
- `practice-desktop.png`, `practice-mobile.png`
- `syllabus-desktop.png`, `syllabus-mobile.png`
- `mistakes-desktop.png`, `mistakes-mobile.png`
- `mocks-desktop.png`, `mocks-mobile.png`
- `resources-desktop.png`, `resources-mobile.png`

---

## Phase 4: Visual & UX Audit + Improvement Plan

### 4.1 Audit Methodology
Inspect every screenshot in `./audit/pass-1/` across 5 core UX dimensions:
1. **Visual Hierarchy & Scannability**: Clear primary calls-to-action, distinct typography scales, no visual clutter.
2. **Spacing & Alignment**: Consistent grid padding, proper card margins, absence of awkward line wrapping.
3. **Color Contrast & Dark Mode**: WCAG AA compliance on text badges, muted labels, and progress bars.
4. **Mobile Responsiveness**: Zero horizontal overflow, touch-target sizes ($\ge 44\text{px}$), accessible drawer heights.
5. **Empty States & Micro-interactions**: Contextual guidance when lists or notebooks are empty.

### 4.2 Audit Deliverable (`./audit/ux-improvements.md`)
Generate a structured report documenting:
- Screen-by-screen inventory of visual defects.
- Categorized fixes (High / Medium / Low priority).
- Clear technical specifications for Phase 5 implementation.

---

## Phase 5: Implement UX Improvements

Execute all prioritized fixes documented in `./audit/ux-improvements.md`:
- Refine responsive navigation and mobile tab scrollbars.
- Enhance contrast of status badges and KaTeX formula displays in dark mode.
- Polish empty state illustrations and callouts in Mistake Notebook and Mock Scorecard.
- Streamline task deep-link buttons and phase card collapsible transitions.
- Re-run `npm run format` and verify clean `npm run build`.

---

## Phase 6: Final E2E Verification & Screenshot Comparison (Pass 2)

- Re-run automated E2E test suite across all 8 feature flows.
- Capture updated screenshots into `./audit/pass-2/` using identical filenames and viewports.
- Side-by-side comparison of `./audit/pass-1/` vs `./audit/pass-2/`.
- Verify that every defect listed in `ux-improvements.md` is resolved.
- Validate that `npm run build` succeeds cleanly with zero errors.

---

## File Migration & Mapping Matrix

| Original Location | Target Refactored Location | Domain |
| :--- | :--- | :--- |
| `src/components/DashboardTracker.jsx` | `src/components/features/dashboard/DashboardTracker.jsx` | Dashboard |
| `src/components/dashboard/*` | `src/components/features/dashboard/*` | Dashboard |
| `src/components/StudyPlanner.jsx` | `src/components/features/planner/StudyPlanner.jsx` | Planner |
| `src/components/planner/*` | `src/components/features/planner/*` | Planner |
| `src/components/roadmaps/*` | `src/components/features/roadmaps/*` | Roadmaps |
| `src/components/QuestionPractice.jsx` | `src/components/features/practice/QuestionPractice.jsx` | Practice |
| `src/components/practice/*` | `src/components/features/practice/*` | Practice |
| `src/components/MistakeNotebook.jsx` | `src/components/features/mistakes/MistakeNotebook.jsx` | Mistakes |
| `src/components/notebook/*` | `src/components/features/mistakes/*` | Mistakes |
| `src/components/MockScorecard.jsx` | `src/components/features/mocks/MockScorecard.jsx` | Mocks |
| `src/components/mocks/*` | `src/components/features/mocks/*` | Mocks |
| `src/components/SyllabusManager.jsx` | `src/components/features/syllabus/SyllabusManager.jsx` | Syllabus |
| `src/components/syllabus/*` | `src/components/features/syllabus/*` | Syllabus |
| `src/components/ResourcesGuide.jsx` | `src/components/features/resources/ResourcesGuide.jsx` | Resources |
| `src/components/resources/*` | `src/components/features/resources/*` | Resources |
| `src/components/Header.jsx` | `src/components/layout/Header.jsx` | Layout |
| `src/components/header/*` | `src/components/layout/*` | Layout |
| `src/components/SettingsModal.jsx` | `src/components/features/settings/SettingsModal.jsx` | Settings |
| `src/components/settings/*` | `src/components/features/settings/*` | Settings |
| `src/components/FirebaseSetupModal.jsx` | `src/components/features/settings/FirebaseSetupModal.jsx` | Settings |
| `src/components/firebase/*` | `src/components/features/settings/*` | Settings |
| `src/components/common/ProgressBar.jsx` | `src/components/common/ProgressBar.jsx` | Common UI |
| `src/utils/storage.js` | `src/services/storageService.js` & `src/hooks/useLocalStorage.js` | Services / Hooks |
| `src/utils/cloudSync.js` | `src/services/cloudSyncService.js` & `src/hooks/useCloudSync.js` | Services / Hooks |
| `src/utils/gemini.js` | `src/services/geminiService.js` | Services |
