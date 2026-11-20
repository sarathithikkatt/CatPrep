# 🎯 CatPrep (AptiPrep Elite Hub)

> **A focused, local-first preparation workstation, multimodal AI diagnostic solver, and multi-exam preparation hub for the Common Admission Test (CAT), XAT, and GMAT Focus Edition.**

[![React](https://img.shields.io/badge/React-19.3-61DAFB?style=flat&logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8.3-646CFF?style=flat&logo=vite&logoColor=white)](https://vite.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4.3-38B2AC?style=flat&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![KaTeX](https://img.shields.io/badge/KaTeX-LaTeX_Math-005E5D?style=flat&logo=latex&logoColor=white)](https://katex.org/)
[![Firebase](https://img.shields.io/badge/Firebase-v13.4_Spark-FFCA28?style=flat&logo=firebase&logoColor=black)](https://firebase.google.com/)
[![Gemini](https://img.shields.io/badge/Gemini_AI-2.5_Flash-4285F4?style=flat&logo=google&logoColor=white)](https://ai.google.dev/)
[![Storage](https://img.shields.io/badge/Storage-LocalFirst_Offline-green?style=flat&logo=local)](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

---

## 📌 Table of Contents

- [Overview](#-overview)
- [The Preparation Philosophy](#-the-preparation-philosophy)
- [Key Features](#-key-features)
  - [1. Daily Tracker & Progress Dashboard](#1-daily-tracker--progress-dashboard)
  - [2. Interactive Multi-Exam Syllabus & Video Masterclasses](#2-interactive-multi-exam-syllabus--video-masterclasses)
  - [3. Question Practice with 4-Tier Solutions](#3-question-practice-with-4-tier-solutions)
  - [4. Multimodal AI Question Solver (Gemini 2.5 Flash)](#4-multimodal-ai-question-solver-gemini-25-flash)
  - [5. Mistake Notebook & Interactive Re-Test Engine](#5-mistake-notebook--interactive-re-test-engine)
  - [6. Mock Test Scorecards & Capability Gap Diagnostics](#6-mock-test-scorecards--capability-gap-diagnostics)
  - [7. Unified Multi-Track Study Planner (3M • 1M • 1W & R-E-S-T Engine)](#7-unified-multi-track-study-planner-3m--1m--1w--r-e-s-t-engine)
  - [8. Sprint Roadmaps & Countdown Plans (3M • 1M • 1W)](#8-sprint-roadmaps--countdown-plans-3m--1m--1w)
  - [9. Multi-Exam Ecosystem (CAT, XAT & GMAT Focus)](#9-multi-exam-ecosystem-cat-xat--gmat-focus)
  - [10. Google Sign-In & Multi-Device Cloud Sync (Firebase Spark)](#10-google-sign-in--multi-device-cloud-sync-firebase-spark)
  - [11. Local-First Sovereignty & Instant Backup](#11-local-first-sovereignty--instant-backup)
  - [12. Automated Visual Audit & Dual-Viewport E2E Testing](#12-automated-visual-audit--dual-viewport-e2e-testing)
- [Architecture & Modular Component Design](#-architecture--modular-component-design)
- [Exam Structure & Scoring Blueprints](#-exam-structure--scoring-blueprints)
  - [Common Admission Test (CAT)](#common-admission-test-cat)
  - [Xavier Aptitude Test (XAT)](#xavier-aptitude-test-xat)
  - [GMAT Focus Edition](#gmat-focus-edition)
- [Tech Stack](#-tech-stack)
- [Project Directory Structure](#-project-directory-structure)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation & Running](#installation--running)
  - [Environment Variables Setup](#environment-variables-setup)
  - [Available Scripts](#available-scripts)
- [Roadmap](#-roadmap)
- [Contributing & License](#-contributing--license)

---

## 🌟 Overview

A serious management entrance aspirant’s daily preparation fractures across 5–10 disconnected tools: YouTube playlists, spreadsheet trackers, coaching mock test portals, PDF past-year question banks, WhatsApp groups, and paper notebooks. 

**CatPrep** consolidates the three pillars of high-percentile preparation into a single zero-friction feedback loop:
1. **Learn** — Complete topic syllabi, historical question weightages, expandable formula sheets, and curated topic-by-topic YouTube masterclasses.
2. **Practice** — Past year questions (MCQ, 5-option, and TITA) with authentic marking rules, KaTeX-rendered mathematical typography, and tiered explanations.
3. **Analyze** — Root-cause tagging for errors, mock exam diagnostic scorecards, untimed capability gap analysis, and daily velocity tracking.

All user data is stored **local-first** in your browser with zero tracking and full offline readiness. An optional **Google Sign-In + Cloud Firestore sync** powered by Firebase's free Spark tier allows seamless multi-device continuity.

---

## 🧠 The Preparation Philosophy

> **"CAT is an examination of question selection and accuracy, not syllabus completion."**

- **The 45–50% Rule**: Securing a **99th percentile** in CAT historically requires approximately **85–95 marks out of 198 (~45–50% raw score)**. You do not need to attempt every question; you need to solve 10–12 questions per section with 85%+ accuracy.
- **Pareto Principle in Quantitative Aptitude**: ~70% of QA questions consistently emerge from **Arithmetic** and **Algebra**. CatPrep prioritizes high-yield modules so you maximize return on investment (ROI).
- **The Capability Gap**: The difference between your timed mock score and untimed re-attempt score reveals whether your bottlenecks are *conceptual* or *operational* (time pressure, panic, or poor question selection).

```mermaid
flowchart LR
    A["Study & Concept Mastery\n(Curated Masterclasses & Cheatsheets)"] --> B["Active Practice & AI Solver\n(Real PYQs + Exact Scoring)"]
    B --> C["Error Categorization\n(Root-Cause Tagging in Notebook)"]
    C --> D["Re-Test & Revision Engine\n(Hidden Answers & Mastery Tracking)"]
    D --> E["Mock Diagnostics\n(Real Score vs. Capability Score)"]
    E --> A
```

---

## 🚀 Key Features

### 1. Daily Tracker & Progress Dashboard
- **Daily Targets**: Set custom daily goals for questions solved and study minutes.
- **Quick Time Logging**: Rapid 1-click log buttons (`+15m`, `+30m`, `+1h`) to log focus sessions effortlessly.
- **Velocity & Burndown**: Live tracking of topics mastered vs. total syllabus with completion forecasting.
- **Study Streak**: Automatic streak tracking across consecutive study days.
- **CAT Countdown Timer**: Real-time days remaining countdown to keep long-term milestones in perspective.

### 2. Interactive Multi-Exam Syllabus & Video Masterclasses
- **Structured Hierarchy**: Section $\rightarrow$ Module $\rightarrow$ Topic $\rightarrow$ Subtopics covering QA (21 topics), DILR (11 topics), and VARC (8 topics) for CAT, plus comprehensive modules for XAT and GMAT Focus.
- **Historical Weightage & Difficulty**: Topic-by-topic question frequency and difficulty rating tags.
- **Formula Cheatsheets**: Expandable high-yield formula summaries, shortcuts, and theorems right within each topic card.
- **Curated Video Masterclasses**: Direct links to top-tier free lectures on YouTube (Rodha, Elites Grid, Ravi Prakash, 2IIM, Takshzila) organized by topic.
- **Progress & Confidence Tracking**: Toggle status (*Not Started*, *In Progress*, *Mastered*, *Revision Due*) and assign 1–5 star confidence ratings.
- **Topic-Level Question Badges**: Live count of available practice questions with direct one-click practice launch.

### 3. Question Practice with 4-Tier Solutions
- **Multi-Exam Question Bank**: 61 authentic questions covering 100% of CAT topics, XAT Decision Making caselets, and GMAT Focus Data Insights.
- **Authentic Scoring Engines**:
  - **CAT / XAT MCQ**: $+3$ for correct, $-1$ for wrong answers.
  - **TITA (Type In The Answer)**: $+3$ for correct, **0 penalty** for wrong answers.
  - **XAT 5-Option**: Accurate negative marking representation.
- **KaTeX LaTeX Engine**: Flawless mathematical typesetting for complex algebraic expressions, fractions, powers, matrices, and geometric formulas.
- **Immediate Feedback**: Correct answers trigger celebratory confetti; incorrect attempts offer immediate bookmarking and root-cause tagging.
- **4-Tier Solution Drawer**:
  1. 💡 **Core Concept**: Fundamental principles, theorems, and definitions.
  2. 📝 **Step-by-Step**: Thorough, structured textbook-level mathematical derivation.
  3. ⚡ **Exam Shortcut**: Rapid elimination techniques, approximations, and option-substitution tricks.
  4. ⚠️ **Trap Alerts**: Pitfalls, unit traps, edge cases, and common test-maker lures.

### 4. Multimodal AI Question Solver (Gemini 2.5 Flash)
- **Zero-Friction Question Ingestion**: Paste mock screenshot directly from your clipboard (`Ctrl+V`), drag-and-drop an image file, or upload from disk.
- **Gemini Vision OCR**: Uses Google's `gemini-2.5-flash` to extract question text, equations, tables, and options automatically.
- **Automated 4-Tier Generation**: Instantly drafts comprehensive explanations across Core Concept, Step-by-Step, Exam Shortcut, and Trap Alerts.
- **Auto-Topic Classification**: Analyzes question context and maps it to the exact syllabus topic (`TOPIC_CHECK`).
- **Bring-Your-Own-Key Privacy**: Stores your Gemini API key strictly in your local browser storage.

### 5. Mistake Notebook & Interactive Re-Test Engine
- **Automatic Error Logging**: Every incorrectly answered question or bookmarked item is automatically indexed.
- **Root-Cause Error Classification**:
  - 🧠 *Concept Gap* (Theory or formula unknown)
  - ✏️ *Calculation Slip* (Math or arithmetic slip under pressure)
  - 👓 *Misread Question* (Overlooked constraints or units)
  - ⏰ *Time Panic* (Rushed through the problem)
  - 📜 *Formula Forgotten* (Knew the approach but forgot the exact formula)
- **Personal Reflection Journal**: Record takeaways, notes, and personal observations on each error.
- **Interactive Re-Test Mode**: Re-attempt saved mistakes with answers hidden, instant re-evaluation, confetti animations, and mastery progression badges.

### 6. Mock Test Scorecards & Capability Gap Diagnostics
- **Test Series Support**: Log mocks from major providers including **IMS SimCAT**, **TIME AIMCAT**, **Career Launcher CL Prime**, **Cracku**, or custom tests.
- **Section-Wise Breakdown**: Detailed tracking for VARC, DILR, and QA (Attempted, Correct, Incorrect MCQ, Incorrect TITA, Accuracy %, Net Score).
- **Capability Score & Panic Delta**:
  - **Capability Score**: Untimed re-attempt score on the same mock.
  - **Panic Delta**: Difference between Capability Score and Timed Score — reveals marks lost to time pressure and anxiety vs. concept gaps.
- **Percentile Estimator & Trend Analysis**: Visual indicators of scoring trajectory across test series.

### 7. Unified Multi-Track Study Planner (3M • 1M • 1W & R-E-S-T Engine)
- **Multi-Track Macro Horizons**:
  - ⚡ **3-Month Track (90 Days | 3.5–4 hrs/day)**: 40% Concept / 40% Practice / 20% Revision focus split across Phase 1 (Foundation), Phase 2 (Authentic PYQs & Weekly Mocks), and Phase 3 (Strategy Convergence & Slot Lock).
  - 🎯 **1-Month Track (30 Days | 5–6 hrs/day)**: 15% Concept / 50% Practice / 35% Revision focus split across Phase 1 (Simulation & Autopsy), Phase 2 (Selection Discipline & 5-Min DILR Rule), and Phase 3 (Mental Taper & Mock Freeze).
  - ⏱️ **1-Week Track (7 Days | 4–5 hrs/day tapering to 0)**: 0% New Theory / 30% Light Touch / 70% Revision focus split (D-7 Baseline Mock $\rightarrow$ D-4 Formulas $\rightarrow$ D-1 Total Rest $\rightarrow$ D-Day 120-minute Exam Playbook).
- **Cross-Module Deep-Links**: Every task features a direct launcher button (`Practice QA →`, `Solve DILR →`, `Log Mock →`, `Open Notebook →`, etc.) that jumps straight into the relevant module with section/topic filters pre-applied.
- **Dynamic Timeline Tracking**: Real-time `Day X of Y` tracking derived from an editable `startDate`, active phase indicators, and bulk phase completion toggles.
- **R-E-S-T Cyclical Engine**: Integrated view switcher allowing students to toggle between high-level **Multi-Track Horizons** and coderdevang's tactical 7-day **R-E-S-T Weekly Planner** (Revise, Enhance, Strategize, Test).
- **Dashboard Priority Widget**: Live active plan progress bar and next pending task launcher embedded directly on the main Dashboard.

### 8. Sprint Roadmaps & Countdown Plans (3M • 1M • 1W)
- **Multi-Horizon Roadmaps**:
  - ⚡ **3-Month Master Sprint (90 Days / ~400 Hours)**: High-ROI concept dominance (Arithmetic + Algebra), 2017–2024 authentic DILR set consolidation, and 15–20 full mocks with 1:2 test-to-analysis forensic autopsies.
  - 🎯 **1-Month Lockdown Sprint (30 Days)**: Peak execution, 2 slot-timed mocks/week, 5-minute DILR set selection rule, ABC question triage, zero new chapters, and confidence preservation.
  - ⏱️ **1-Week Countdown Protocol (D-7 to D-Day)**: Baseline mock on D-7, error log purge, formula flashcards, logistics clearance (admit card + original ID), complete study shutdown on D-1, and 120-minute exam hall execution playbook.
- **Interactive Checklists**: Check off action items saved directly into `userData.sprintChecklist` and synchronized across devices.
- **Curated Internet Resources & Toolkit**: One-click direct directory to top free channels and portals: **Rodha** (concept video theory), **Cracku** (free mocks & daily targets), **2IIM** (free authentic past paper solutions), **Elites Grid** (DILR puzzle mastery), **Takshzila** (free fundabooks), **Bodhee Prep / Gejo Speaks** (VARC), and the **Official IIM Mock Simulator**.
- **Master Sprint Guide**: See [CAT_SPRINT_PLANS.md](file:///d:/Dev/CatPrep/CAT_SPRINT_PLANS.md) for full blueprints.

### 9. Multi-Exam Ecosystem (CAT, XAT & GMAT Focus)
- **Common Admission Test (CAT)**: Complete 40-topic QA, DILR, and VARC schemas with video links and cheatsheets.
- **Xavier Aptitude Test (XAT)**:
  - Decision Making (ethical dilemmas, stakeholder trade-offs, managerial caselets).
  - Verbal and Logical Ability (critical reasoning, poem comprehension).
  - Quantitative Ability & Data Interpretation.
  - General Knowledge modules.
- **GMAT Focus Edition**:
  - Quantitative Reasoning (Problem Solving).
  - Verbal Reasoning (Critical Reasoning & Reading Comprehension).
  - Data Insights (Data Sufficiency with 12-second AD/BCE grid method, Multi-Source Reasoning, Two-Part Analysis, Tables & Graphs).

### 10. Google Sign-In & Multi-Device Cloud Sync (Firebase Spark)
- **100% Free Tier (Firebase Spark)**: Uses Google Firebase Authentication and Cloud Firestore within the permanent free limits.
- **One-Click Google Sign-In**: Authenticate using your Google account with pop-up authentication.
- **Bi-directional Cloud Sync**: Push local study progress to Firestore or pull cloud progress to your current device.
- **Safe Guest / Offline Fallback**: Zero forced login. If no Firebase keys are configured, CatPrep functions flawlessly in local guest mode.
- **Setup Guidance Modal**: Built-in interactive setup assistant (`FirebaseSetupModal`) with 1-click template copying for `.env.local`.

### 11. Local-First Sovereignty & Instant Backup
- **Zero Lock-In**: All progress, mistake logs, study sessions, and mock scores are kept in browser `localStorage`.
- **1-Click Backup Export**: Download your complete study history as a structured `.json` file at any time.
- **1-Click Restore**: Seamlessly import your data on any device or browser to restore state without data loss.

### 12. Automated Visual Audit & Dual-Viewport E2E Testing
- **Automated Headless Test Runner**: Custom browser automation via Puppeteer-Core capturing dual-viewport screenshots:
  - **Desktop**: `1440 × 900`
  - **Mobile**: `390 × 844` (iPhone 14 standard)
- **Two-Pass Audit Workflow**: Initial screenshots captured in `./audit/pass-1/`, evaluated in `./audit/ux-improvements.md`, followed by UX optimization and verified regression-free in `./audit/pass-2/`.
- **Zero Lock-In**: All progress, mistake logs, study sessions, and mock scores are kept in browser `localStorage`.
- **1-Click Backup Export**: Download your complete study history as a structured `.json` file at any time.
- **1-Click Restore**: Seamlessly import your data on any device or browser to restore state without data loss.

---

## 🏗️ Architecture & Modular Component Design

CatPrep is architected with a **clean, modular, and feature-driven component design**. The codebase separates cross-cutting UI primitives, feature modules, business logic services, custom hooks, and data definitions:

```
src/
├── components/
│   ├── common/                          # Atomic, reusable design system primitives
│   │   ├── Badge.jsx                    # Status, pill & difficulty indicators
│   │   ├── Button.jsx                   # Standardized buttons with variant & size tokens
│   │   ├── Card.jsx                     # Glassmorphic bordered containers
│   │   ├── EmptyState.jsx               # Consistent zero-state & fallback displays
│   │   ├── Modal.jsx                    # Accessible dialog overlay with backdrop blur
│   │   └── ProgressBar.jsx              # Smooth animated progress meters
│   │
│   ├── features/                        # Advanced high-cohesion feature domains
│   │   ├── dashboard/
│   │   │   └── ActivePlanWidget.jsx     # Active multi-track progress & next task launcher
│   │   └── planner/
│   │       ├── PhaseCard.jsx            # Multi-week phase milestone card with bulk-complete
│   │       ├── ProgressBanner.jsx       # Day X of Y progress meter, completion % & dates
│   │       ├── RestWeeklyView.jsx       # 7-day cyclical R-E-S-T tactical schedule
│   │       ├── StudyPlanner.jsx         # Unified planner orchestrator (Tracks + R-E-S-T)
│   │       ├── TaskRow.jsx              # Actionable task item with deep-linking buttons
│   │       └── TrackSelector.jsx        # Track switcher tabs (3-Month, 1-Month, 1-Week)
│   │
│   ├── roadmaps/                        # Countdown Sprint Roadmaps & Resources
│   │   ├── InternetResourcesView.jsx    # Curated free prep portal & playlist directory
│   │   ├── OneMonthPlanView.jsx         # 30-day lockdown roadmap (5-min DILR rule, mock slots)
│   │   ├── OneWeekPlanView.jsx          # D-7 to D-Day countdown protocol & exam kit
│   │   ├── SprintMilestoneChecklist.jsx # Interactive milestone checklist with local persistence
│   │   ├── SprintPlansView.jsx          # Multi-horizon sprint view switcher & exam countdown
│   │   ├── sprintPlansData.js           # Structured roadmap definitions & verified URLs
│   │   └── ThreeMonthPlanView.jsx       # 90-day phase-wise roadmap (Foundation, PYQs, Mock Lock)
│   │
│   ├── dashboard/                       # Daily Tracker & Velocity domain
│   │   ├── AccuracyMetricCard.jsx       # Daily accuracy % and target editor toggle
│   │   ├── DailyMetricsGrid.jsx         # 3-column metric cards container
│   │   ├── DailyTargetEditor.jsx        # Inline target customization form
│   │   ├── ExamHeroBanner.jsx           # Header banner & CAT countdown timer
│   │   ├── QuestionsMetricCard.jsx      # Questions solved vs target
│   │   ├── SectionProgressRow.jsx       # Individual section progress row
│   │   ├── SyllabusBurndownCard.jsx     # Master burndown progress & section breakdown
│   │   ├── TimeSpentMetricCard.jsx      # Study time invested + quick logging (+15m, +30m, +1h)
│   │   ├── TopicsStatsGrid.jsx          # Topic mastery statistics grid
│   │   └── VelocityForecastCard.jsx     # Remaining hours, completion forecast & CTA
│   │
│   ├── syllabus/                        # Syllabus & Weightage domain
│   │   ├── CuratedVideoItem.jsx         # Curated YouTube lecture masterclass cards
│   │   ├── ModuleCard.jsx               # Module grouping card with study effort hours
│   │   ├── SectionTabs.jsx              # Section tabs (QA, DILR, VARC) with PYQ count badges
│   │   ├── StatusFilterPills.jsx        # Filter buttons (All, Mastered, In Progress, Not Started)
│   │   ├── SyllabusHeader.jsx           # Header banner & search input
│   │   ├── TopicDetailsDrawer.jsx       # Expandable cheatsheet, subtopics & study hour logger
│   │   ├── TopicRow.jsx                 # Topic row (confidence stars, status, quick practice)
│   │   └── syllabusHelpers.js           # Topic status badge styling helper
│   │
│   ├── practice/                        # PYQs & Solutions domain
│   │   ├── AddQuestionModal.jsx         # Custom question creation & screenshot OCR modal
│   │   ├── GeminiAutoSolveSection.jsx   # Gemini AI Vision OCR & 4-tier solution trigger
│   │   ├── PracticeFiltersHeader.jsx    # 5-filter control bar (Section, Difficulty, Status, Year)
│   │   ├── QuestionActionFooter.jsx     # Submit button, marks breakdown (+3/-1/0) & re-attempt
│   │   ├── QuestionCard.jsx             # Full question container with KaTeX & solutions
│   │   ├── QuestionOptions.jsx          # MCQ options list with post-submission highlights
│   │   ├── QuestionTitaInput.jsx        # Numerical input field for TITA questions
│   │   ├── ScreenshotDropzone.jsx       # Drag-and-drop & clipboard screenshot upload area
│   │   └── SolutionDrawer.jsx           # 4-tier solution drawer (Step/Shortcut/Concept/Traps)
│   │
│   ├── notebook/                        # Mistake & Revision Notebook domain
│   │   ├── InlineRetestArea.jsx         # Active re-test mode with answers hidden & evaluation
│   │   ├── MistakeReflectionNotes.jsx   # Personal mistake reflection view & editor
│   │   ├── NotebookHeader.jsx           # Counters, Start Drill CTA & root-cause filter pills
│   │   ├── NotebookQuestionCard.jsx     # Combined mistake card orchestrator
│   │   ├── NotebookQuestionHeader.jsx   # Exam slot badge, re-test status, root-cause tag
│   │   ├── NotebookSolutionViewer.jsx   # Tabbed solution viewer (Step, Shortcut, Concept)
│   │   └── notebookConstants.js         # MISTAKE_REASONS root-cause taxonomy
│   │
│   ├── mocks/                           # Mock Scorecard domain
│   │   ├── LogMockModal.jsx             # Scorecard logger with real-time net score preview
│   │   ├── MockReportCard.jsx           # Logged test card with panic delta summary
│   │   ├── MockScorecardHeader.jsx      # Header with Log Mock Score CTA
│   │   ├── PanicDeltaInsightCard.jsx    # Explainer for Untimed Capability & Panic Delta
│   │   ├── SectionScoreCard.jsx         # Section-level score badges (VARC, DILR, QA)
│   │   └── mocksHelper.js               # calcSectionScore & percentile estimator
│   │
│   ├── resources/                       # Resources & Knowledge Repository domain
│   │   ├── ExamExtensibilityCards.jsx   # Architecture roadmap for XAT, GMAT, GRE, GATE
│   │   ├── PastPapersRepository.jsx     # 2IIM, IIM official portal, Cracku past paper links
│   │   ├── ResourcesHeader.jsx          # Resources title and description
│   │   ├── ScorePercentileTable.jsx     # Score vs Percentile cutoffs (99.5%, 99%, 95%, 90%)
│   │   └── VideoMasterclassesList.jsx   # Elites Grid, Rodha, Bodhee Prep, Aeon recommendations
│   │
│   ├── header/                          # Global Navigation & Top Bar domain
│   │   ├── BrandLogo.jsx                # AptiPrep branding & 99%ile badge
│   │   ├── DataActions.jsx              # AI settings, export JSON, restore JSON
│   │   ├── ExamSelector.jsx             # Target exam switcher
│   │   ├── GoogleSignInButton.jsx       # Google OAuth button with spinner
│   │   ├── NavigationTabs.jsx           # Primary navigation view tabs with active indicators
│   │   ├── QuickStatsBar.jsx            # Daily target progress bar & streak counter
│   │   └── UserProfileDropdown.jsx      # Avatar, sync status, and account dropdown
│   │
│   ├── settings/                        # AI Settings domain
│   │   ├── ApiKeyForm.jsx               # Password toggle, key verification & storage
│   │   └── FeatureExplainer.jsx         # Vision OCR & 4-tier solution explainer
│   │
│   └── firebase/                        # Cloud Auth Setup domain
│       ├── EnvTemplateBlock.jsx         # One-click copyable environment template
│       └── SetupStepItem.jsx            # Numbered guide step cards
│
├── hooks/
│   └── useStudyPlans.js                 # Custom React hook for track selection, tasks & dates
│
├── services/
│   ├── planCalculator.js                # Pure functions for day calculation & track completion
│   └── storageService.js                # Centralized local-first persistence layer
│
├── data/
│   ├── examsData.js                     # Exam definitions, sections & scoring rules
│   ├── questionsData.js                 # 60+ authentic questions with 4-tier solutions
│   ├── studyPlansData.js                # 3-Month, 1-Month, 1-Week structured tracks & deep-links
│   └── syllabusData.js                  # Complete QA, DILR, VARC syllabus modules & video links
│
├── scripts/
│   └── capture-audit-screenshots.js    # Automated headless browser dual-viewport visual audit
│
└── audit/
    ├── ux-improvements.md               # Visual audit report, identified issues & fixes
    ├── pass-1/                          # 9 Desktop + 9 Mobile baseline audit screenshots
    └── pass-2/                          # 9 Desktop + 9 Mobile post-improvement verified screenshots
```

---

## 📊 Exam Structure & Scoring Blueprints

### Common Admission Test (CAT)

| Section | Questions | Duration | Pattern | Marking Scheme | 99%ile Benchmark (Approx) |
| :--- | :---: | :---: | :--- | :--- | :--- |
| **VARC** (Verbal Ability & Reading Comprehension) | 24 | 40 mins | 16 RC (4 passages), 8 VA | $+3$ correct, $-1$ wrong MCQ, $0$ TITA | $\sim 38 - 42$ marks ($\sim 14$ net correct) |
| **DILR** (Data Interpretation & Logical Reasoning) | 20–22 | 40 mins | 4–5 sets (4–5 questions each) | $+3$ correct, $-1$ wrong MCQ, $0$ TITA | $\sim 28 - 32$ marks ($\sim 2 - 2.5$ full sets) |
| **QA** (Quantitative Aptitude) | 22 | 40 mins | Arithmetic, Algebra, Geometry, Numbers, Modern Math | $+3$ correct, $-1$ wrong MCQ, $0$ TITA | $\sim 32 - 36$ marks ($\sim 11 - 12$ net correct) |
| **Total** | **66** | **120 mins** | **$\sim 48$ MCQ, $\sim 18$ TITA** | **Total Marks: 198** | **$\sim 85 - 95$ marks ($\sim 45 - 50\%$ raw score)** |

### Xavier Aptitude Test (XAT)

| Section | Questions | Duration | Focus Areas | Marking Scheme |
| :--- | :---: | :---: | :--- | :--- |
| **Decision Making (DM)** | 21–22 | ~50 mins | Managerial ethics, business dilemmas, stakeholder conflicts | $+1.0$ correct, $-0.25$ wrong |
| **Verbal & Logical Ability (VALA)** | 26 | ~55 mins | Critical reasoning, poem comprehension, RC passages | $+1.0$ correct, $-0.25$ wrong |
| **QA & DI** | 28 | ~65 mins | Advanced arithmetic, algebra, complex data sets | $+1.0$ correct, $-0.25$ wrong |
| **General Knowledge & Essay** | 25 Qs + Essay | 30 mins | Current affairs, static GK, analytical essay | No negative marking for GK |

### GMAT Focus Edition

| Section | Questions | Duration | Focus Areas | Scoring Scale |
| :--- | :---: | :---: | :--- | :--- |
| **Quantitative Reasoning** | 21 | 45 mins | Pure problem solving (No geometry) | 60–90 scale |
| **Verbal Reasoning** | 23 | 45 mins | Critical reasoning, reading comprehension (No SC) | 60–90 scale |
| **Data Insights** | 20 | 45 mins | Data Sufficiency, Multi-Source, Two-Part, Tables/Graphs | 60–90 scale |
| **Total Score** | **64** | **135 mins** | Flexible section order; question review & edit | **205–805 scale** |

---

## 🛠️ Tech Stack

- **Core Framework**: [React 19](https://react.dev/) + [Vite 8](https://vite.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Typography & Math**: [KaTeX](https://katex.org/) for fast, accessible LaTeX math rendering
- **Icons**: [Lucide React](https://lucide.dev/)
- **Delight & Animations**: [canvas-confetti](https://www.npmjs.com/package/canvas-confetti)
- **Authentication & Cloud Sync**: [Firebase v13](https://firebase.google.com/) (Google Auth & Cloud Firestore)
- **Multimodal AI**: [Google Gemini API](https://ai.google.dev/) (`gemini-2.5-flash`)
- **Code Quality & Linter**: [Oxlint](https://oxc.rs/)

---

## 📁 Project Directory Structure

```text
CatPrep/
├── public/                 # Static assets & web manifest
├── src/
│   ├── assets/             # Brand graphics, icons & logos
│   ├── components/         # Modular feature-driven component architecture
│   │   ├── common/         # Cross-cutting primitives (Badge, EmptyState, ProgressBar)
│   │   ├── dashboard/      # Daily tracker, burndown, velocity & countdown subcomponents
│   │   ├── firebase/       # Cloud sync setup guide & template block
│   │   ├── header/         # Top navbar, exam selector, cloud status, Google auth & tabs
│   │   ├── mocks/          # Scorecard, section breakdown, panic delta & modal
│   │   ├── notebook/       # Mistake notebook, root-cause tags, re-test & reflection
│   │   ├── planner/        # 7-day R-E-S-T study planner, pillars, task items & modal
│   │   ├── practice/       # Practice cards, KaTeX options, 4-tier solution & AI modal
│   │   ├── resources/      # Score vs percentile, official repos, mentors & roadmap
│   │   ├── settings/       # Gemini AI settings & key verification form
│   │   ├── syllabus/       # Syllabus header, section tabs, module cards & video links
│   │   ├── DashboardTracker.jsx   # Dashboard coordinator page
│   │   ├── FirebaseSetupModal.jsx # Firebase setup guide modal
│   │   ├── Header.jsx             # Application header coordinator
│   │   ├── MathText.jsx           # KaTeX parser for inline & display math
│   │   ├── MistakeNotebook.jsx    # Mistake notebook coordinator page
│   │   ├── MockScorecard.jsx      # Mock scorecard coordinator page
│   │   ├── QuestionPractice.jsx   # Practice & solutions coordinator page
│   │   ├── ResourcesGuide.jsx     # Resources guide coordinator page
│   │   ├── SettingsModal.jsx      # Settings modal coordinator
│   │   ├── StudyPlanner.jsx       # Study planner coordinator page
│   │   └── SyllabusManager.jsx    # Syllabus manager coordinator page
│   ├── context/
│   │   └── AuthContext.jsx        # Google Firebase authentication state & login/logout
│   ├── data/
│   │   ├── examsData.js           # Comprehensive CAT, XAT & GMAT syllabus schemas
│   │   └── questionsData.js       # Authentic questions with 4-tier KaTeX solutions
│   ├── utils/
│   │   ├── cloudSync.js           # Bi-directional Firestore sync engine for user state
│   │   ├── firebase.js            # Firebase app, Google Auth, and Firestore initialization
│   │   ├── gemini.js              # Gemini 2.5 Flash multimodal vision & 4-tier solver API
│   │   └── storage.js             # LocalStorage helpers & JSON export/import handlers
│   ├── App.jsx                    # Main application state, tab routing & modal wiring
│   ├── main.jsx                   # Application entry point with AuthProvider wrapper
│   └── index.css                  # Global styles and Tailwind CSS v4 imports
├── .env.example            # Environment variables template for Firebase configuration
├── CAT_PREP_GUIDE.md       # Strategic preparation framework & exam analysis
├── Plan.md                 # Product development and roadmap plan
├── Requirement.md          # Comprehensive PRD & requirements specification
├── package.json            # Project dependencies and build scripts
└── vite.config.js          # Vite configuration
```

---

## 💻 Getting Started

### Prerequisites

Ensure you have [Node.js](https://nodejs.org/) installed:
- Node.js version **20.19+** or **22.12+** recommended
- `npm`, `yarn`, or `pnpm`

### Installation & Running

1. **Clone the repository**:
   ```bash
   git clone https://github.com/sarathithikkatt/CatPrep.git
   cd CatPrep
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the local development server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:5173](http://localhost:5173) in your browser.

### Environment Variables Setup

CatPrep runs 100% locally out-of-the-box in Guest mode. To enable **Google Sign-In & Multi-Device Cloud Sync** or **Gemini Multimodal AI OCR**:

#### 1. Google Firebase (Cloud Sync)
Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```

Fill in your Firebase keys (from [Firebase Console](https://console.firebase.google.com/) $\rightarrow$ Project Settings $\rightarrow$ Web App):
```env
VITE_FIREBASE_API_KEY=your_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project_id.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id_here
```

#### 2. Gemini Multimodal AI (Image OCR & Solver)
You can enter your Google Gemini API key directly in the application UI:
- Click the **Sparkles icon (✨)** in the top header.
- Paste your Gemini API key from [Google AI Studio](https://aistudio.google.com/app/apikey).
- Click **Test Key & Save Settings**. The key is stored locally in your browser.

### Available Scripts

| Command | Purpose |
| :--- | :--- |
| `npm run dev` | Starts the Vite development server with Hot Module Replacement (HMR). |
| `npm run build` | Compiles and bundles production-ready assets into `/dist`. |
| `npm run preview` | Locally serves the production build for testing. |
| `npm run lint` | Runs Oxlint to check code quality and detect lint errors quickly. |
| `npm run format` | Automatically formats all `.js`, `.jsx`, `.css`, and `.json` source files with Prettier. |
| `npm run format:check` | Verifies codebase formatting compliance with Prettier without modifying files. |
| `npm run audit:screenshots` | Runs the automated dual-viewport headless browser visual regression test suite (`pass-1` / `pass-2`). |

---

## 🗺️ Roadmap

- [x] **Core Dashboard**: Daily questions and study-time target tracker with velocity forecast.
- [x] **Full CAT Syllabus**: 40+ topics across QA, DILR, and VARC with weightage and difficulty metrics.
- [x] **Curated Video Lectures**: Topic-wise embedded masterclass YouTube links (40/40 topics).
- [x] **Mock Test Scorecards**: Multi-platform mock logging (SimCAT, AIMCAT, CL Prime) and capability gap analysis.
- [x] **Authentic Marking**: Correct $+3 / -1$ MCQ and $+3 / 0$ TITA scoring.
- [x] **Mistake Notebook**: Automatic error capture with 5 root-cause tags.
- [x] **Exam Countdown**: Live countdown timer for CAT exam.
- [x] **4-Tier Solution Drawer**: Core Concept, Step-by-Step, Exam Shortcut, and Trap Alerts.
- [x] **Interactive Re-Test Mode**: Hidden-answer revision engine in Mistake Notebook and Practice arena.
- [x] **Unified Multi-Track Study Planner**: 3-Month, 1-Month, and 1-Week structured macro tracks with deep-link navigation actions (`Practice QA →`, `Solve DILR →`, `Log Mock →`).
- [x] **R-E-S-T Cyclical Engine**: Integrated 7-day tactical planner (Revise, Enhance, Strategize, Test) seamlessly switchable inside Study Planner.
- [x] **Countdown Sprint Roadmaps**: 90-day, 30-day, and 7-day tactical sprints with interactive milestone checklists and persistent progress.
- [x] **Curated Free Internet Directory**: Direct links to top-tier free portals (Rodha, Cracku, 2IIM, Elites Grid, Takshzila, Bodhee Prep).
- [x] **Automated Dual-Viewport Visual Regression Testing**: Edge/Puppeteer automated screenshot audit pipeline (`1440x900` Desktop and `390x844` Mobile).
- [x] **Code Quality & Prettier Standard**: Comprehensive formatting standard across the entire project.
- [x] **Multi-Exam Expansion**: Full syllabus and authentic questions for XAT (Decision Making) and GMAT Focus Edition (Data Insights).
- [x] **Multimodal AI Solver**: Gemini 2.5 Flash vision OCR, image paste/upload, and automatic 4-tier solution generation.
- [x] **Firebase Cloud Sync & Google Auth**: Free Spark tier Google OAuth and bi-directional Firestore cloud synchronization.
- [x] **Component-Wise Modular Architecture**: Every page decomposed into clean, extensible feature directories.
- [ ] **Expanded PYQ Bank**: Continuous scaling of past year questions towards the 200+ milestone.
- [ ] **Offline PWA Service Worker**: Installable desktop/mobile progressive web app.

---

## 📄 Contributing & License

Contributions, feedback, and pull requests are warmly welcome! Whether it is adding more past year questions, refining 4-tier solution explanations, or contributing exam strategies:

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'feat: add AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

Distributed under the **MIT License**. See `LICENSE` for more information.

---

<p align="center">
  <b>Built for serious CAT, XAT, and GMAT aspirants aiming for top percentiles. Selection & Accuracy &gt; Blind Completion.</b>
</p>
