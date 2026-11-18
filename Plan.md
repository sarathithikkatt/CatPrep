# CatPrep — Implementation Plan

**Version**: 1.0  
**Last Updated**: November 19, 2026  
**Repository**: `d:\Dev\CatPrep`

---

## 1. Where We Stand Today

### What exists and works

| Component | Files | What it does |
| :--- | :--- | :--- |
| **Syllabus Manager** | `SyllabusManager.jsx`, `examsData.js` | 40 topics across QA (21), DILR (11), VARC (8) with weightage, difficulty, cheatsheets, confidence stars, status tracking |
| **Question Practice** | `QuestionPractice.jsx`, `questionsData.js` | MCQ/TITA practice with instant grading, 4-tier solution drawer (Step-by-Step / Shortcut / Concept / Traps), KaTeX math rendering |
| **Daily Tracker** | `DashboardTracker.jsx` | Questions done vs target, time logged, accuracy %, syllabus burndown, velocity forecast, streak counter |
| **Mistake Notebook** | `MistakeNotebook.jsx` | Auto-collects wrong + bookmarked questions, root-cause tagging, reflection notes, shortcut reminders |
| **Resources Page** | `ResourcesGuide.jsx` | Score vs percentile tables, links to 2IIM/Cracku/IIM portal, educator recommendations |
| **Data Layer** | `storage.js` | LocalStorage persistence, JSON export/import |
| **Multi-Exam Schema** | `examsData.js` | CAT (full), XAT (skeleton), GMAT Focus (skeleton) |
| **Mock Test Scorecard** | `MockScorecard.jsx` | Multi-platform mock score logging, net score formula, Capability score & Panic Delta diagnostics |

### What is thin or missing

1. **Question bank scaling**: 61 authentic questions seeded (40 CAT, 11 XAT, 10 GMAT) covering 100% of CAT, XAT, and GMAT syllabus topics. Continuous community expansion towards the 200+ milestone.
2. **Re-test / revision mode**: Completed in Mistake Notebook and Practice mode with hidden answers and mastery tracking.
3. **Weekly study planner**: Completed in `StudyPlanner.jsx` pre-seeded with coderdevang's R-E-S-T framework.
4. **Topic-level question count badges**: Completed in `SyllabusManager.jsx` with real-time topic badges and module summaries.
5. **Image-based questions & Gemini OCR**: Completed in `QuestionPractice.jsx`, `gemini.js`, and `SettingsModal.jsx`.

---

## 2. Critical Analysis of Recommendations

Before laying out the plan, here is an honest evaluation of what matters and what doesn't:

### High-impact, low-effort (do first)

| Feature | Why it matters | Effort |
| :--- | :--- | :--- |
| **Expand question bank to 200+ PYQs** | The app is a practice tool. 8 questions means it runs dry in one sitting. This is the single biggest gap. | Medium (data entry, not code) |
| **Embed curated video lecture links per topic** | Transforms the syllabus from a checklist into a learning launcher. Free, no API needed, immediate value. | Low |
| **Fix TITA scoring (0 penalty)** | Incorrect scoring undermines trust. Simple code fix. | Very Low |
| **Exam countdown on dashboard** | Daily motivation. Trivial to implement. | Very Low |

### High-impact, medium-effort (do next)

| Feature | Why it matters | Effort |
| :--- | :--- | :--- |
| **Mock test scorecard tab** | Every serious aspirant takes 20-30 mocks. Tracking scores and trends across mocks is essential for strategy. | Medium |
| **Re-test mode for Mistake Notebook** | The whole point of error logging is eventual re-testing. Without it, the notebook is read-only documentation. | Medium |
| **Study planner with daily to-do** | Structure prevents aimless studying. The R-E-S-T framework from `coderdevang` is a proven model. | Medium |

### Low-impact or premature (defer)

| Feature | Why it's lower priority | Recommendation |
| :--- | :--- | :--- |
| **Clipboard image paste + Gemini OCR** | Requires users to have a Gemini API key. Adds complexity. Most PYQs are available as text. Only useful for private coaching mock screenshots. | Defer to Phase 3 |
| **Multi-exam expansion (XAT, GMAT modules)** | User said "CAT is one we are starting from". Skeleton schemas are already there. Fleshing them out before CAT content is complete would be premature. | Defer to Phase 4 |
| **PWA / offline service worker** | Nice-to-have. The app already works locally. PWA adds install-to-homescreen and offline caching but isn't blocking anyone. | Defer |
| **IndexedDB migration** | LocalStorage works fine for the current data volume. IndexedDB is needed only when storing thousands of image blobs. | Defer |

---

## 3. Implementation Plan

### Phase 1: Content Foundation (Priority: Immediate)

**Goal**: Make the app genuinely usable for daily practice by filling the content gaps.

| Task | Detail | Status / Deliverable |
| :--- | :--- | :--- |
| **1.1 Expand PYQ bank to 200+ questions** | Add authentic CAT questions (2017-2024) across all 3 sections. Target: ~100 QA, ~50 DILR, ~50 VARC. Each with 4-tier solutions. Source from 2IIM public database and official papers. | 🟡 In Progress: 40 questions seeded across 100% of CAT topics; scaling towards 200+ |
| **1.2 Embed video lecture links per syllabus topic** | Map curated links from top educators (Rodha, Elites Grid, 2IIM, Takshzila, Gejo Speaks) to all topic IDs. Add `lectures` array to each topic in `examsData.js` with `{title, educator, url, duration}`. | ✅ Completed: 40/40 topics linked with verified masterclasses in `examsData.js` |
| **1.3 Fix TITA scoring** | In `QuestionPractice.jsx`, when `q.type === 'TITA'` and answer is wrong, display "Incorrect (0 Penalty — TITA Exempt)" instead of "-1 Penalty". Update daily log to not increment `incorrectCount` penalty for TITA. | ✅ Completed: Implemented in `QuestionPractice.jsx` |
| **1.4 Add CAT exam countdown** | Add a countdown component to `DashboardTracker.jsx` showing days/hours remaining until CAT 2026 exam date. Simple calculation, prominent placement. | ✅ Completed: Implemented in `DashboardTracker.jsx` |

### Phase 2: Diagnostic & Tracking Depth

**Goal**: Turn passive tracking into active improvement tools.

| Task | Detail | Status / Deliverable |
| :--- | :--- | :--- |
| **2.1 Mock test scorecard tab** | Component `MockScorecard.jsx`. Form to log: Mock Name, Date, Platform (IMS/TIME/CL/Cracku/Other), and per-section input table (Total Qs, Attempted, Correct, Incorrect, TITA Incorrect). Auto-calculate net score using official formula. Capability score & Panic Delta diagnostics. | ✅ Completed: Implemented `MockScorecard.jsx`, with percentile estimator and trend analysis |
| **2.2 Re-test mode in Mistake Notebook & Practice** | In-place interactive Re-test mode in `MistakeNotebook.jsx` with hidden answers, instant feedback, confetti, and mastery tracking. Added one-click navigation to Practice in re-test mode and "Re-attempt Question" on practice cards. | ✅ Completed: Implemented in `MistakeNotebook.jsx` & `QuestionPractice.jsx` |
| **2.3 Weekly study planner (R-E-S-T framework)** | New component `StudyPlanner.jsx`. 7-day interactive schedule pre-seeded with coderdevang's R-E-S-T framework (Revise, Enhance, Strategize, Test). Add/delete custom tasks, track completion %, study minutes, and section filtering. | ✅ Completed: Implemented `StudyPlanner.jsx` & added to top navigation |
| **2.4 Topic-level question count badges** | In `SyllabusManager.jsx`, show how many authentic PYQs exist for each topic (e.g., "1 PYQ", "2 PYQs") with direct one-click practice launch. Module and section headers also summarize available practice volume. | ✅ Completed: Implemented in `SyllabusManager.jsx` |

### Phase 3: Image Ingestion & AI Solution Engine

**Goal**: Support users who practice from coaching mock screenshots and automate 4-tier solution generation.

| Task | Detail | Status / Deliverable |
| :--- | :--- | :--- |
| **3.1 Image paste upload zone** | Add clipboard paste (`Ctrl+V`), drag-and-drop, and file upload support to the "Add Custom Question" modal. Store images as base64 in LocalStorage. Display screenshot thumbnails and previews on question cards. | ✅ Completed: Implemented in `QuestionPractice.jsx` |
| **3.2 Gemini API integration (optional)** | Settings modal for entering and testing a personal Gemini API key (stored in LocalStorage). When an image question is uploaded, provide "✨ Auto-Solve with Gemini AI" that sends the image to `gemini-2.5-flash` with structured JSON schema response. | ✅ Completed: Implemented in `gemini.js` and `SettingsModal.jsx` |
| **3.3 Auto-topic classification & 4-tier generation** | When Gemini generates a solution, auto-populate question text, options, correct answer, topic assignment (`TOPIC_CHECK`), and complete 4-tier solution drawers (Core Concept, Step-by-Step, Shortcut, Traps). | ✅ Completed: Implemented in `gemini.js` and `QuestionPractice.jsx` |

### Phase 4: Multi-Exam Expansion

**Goal**: Fulfill the vision of supporting multiple competitive management entrance exams.

| Task | Detail | Status / Deliverable |
| :--- | :--- | :--- |
| **4.1 Flesh out XAT syllabus** | Complete authentic XAT section schemas in `examsData.js`: Decision Making (4 modules / 7 topics), Verbal & Logical Ability (3 modules / 6 topics), QA & DI (3 modules / 4 topics), and General Knowledge (2 modules / 4 topics) with lectures and cheatsheets. | ✅ Completed: Implemented in `examsData.js` |
| **4.2 Flesh out GMAT Focus syllabus** | Complete GMAT Focus Edition schemas in `examsData.js`: Quantitative Reasoning (3 modules / 7 topics), Verbal Reasoning (2 modules / 5 topics), and Data Insights (4 modules / 6 topics: Data Sufficiency, Multi-Source Reasoning, Two-Part Analysis, Tables & Graphs). | ✅ Completed: Implemented in `examsData.js` |
| **4.3 Add XAT/GMAT practice questions** | Seed authentic questions across XAT and GMAT with exam-specific features (5-option MCQs, ethical dilemma DM caselets, 12-second AD/BCE Data Sufficiency grids, Integrated Reasoning) and full 4-tier solutions. | ✅ Completed: 21 authentic multi-exam questions seeded in `questionsData.js` (bank total: 61 questions) |

---

## 4. File Architecture (Current → Target)

```
src/
├── components/
│   ├── Header.jsx              ← (updated) mock scorecard, study planner tabs, and AI settings gear
│   ├── DashboardTracker.jsx    ← (updated) exam countdown, streak counter, burndown metrics
│   ├── SyllabusManager.jsx     ← (updated) lecture links, PYQ count badges, multi-exam section sync
│   ├── QuestionPractice.jsx    ← (updated) TITA scoring, re-test mode, Ctrl+V image paste, Gemini AI solver
│   ├── MistakeNotebook.jsx     ← (updated) in-place interactive re-test engine with answer hiding
│   ├── MockScorecard.jsx       ← (new) multi-platform score logging, Panic Delta & Capability diagnostics
│   ├── StudyPlanner.jsx        ← (new) 7-day R-E-S-T study planner with customizable tasks
│   ├── SettingsModal.jsx       ← (new) Gemini API key configuration & connection test
│   ├── ResourcesGuide.jsx      ← (exists) percentile tables & study guide
│   └── MathText.jsx            ← (exists) KaTeX mathematical renderer
├── data/
│   ├── examsData.js            ← (updated) comprehensive CAT, XAT, and GMAT Focus Edition schemas
│   └── questionsData.js        ← (updated) 61 authentic questions with 4-tier KaTeX solutions
├── utils/
│   ├── storage.js              ← (updated) mockReports, retestAttempts, and weeklyPlanner schemas
│   └── gemini.js               ← (new) Gemini 2.5 Flash multimodal vision & 4-tier solver API client
├── App.jsx                     ← (updated) tab routing, retest navigation, settings modal wiring
├── main.jsx                    ← (exists)
└── index.css                   ← (exists)
```

---

## 5. What We Are NOT Building

To stay focused and ship something useful:

- **Not an Electron app.** Web-first. No native binaries, no SQLite, no Prisma. Browser LocalStorage is sufficient for a single-user study tool.
- **Not a content-creation CMS.** We curate and pre-seed questions. The custom question form is a convenience, not the primary workflow.
- **Not a timed mock simulator.** Recording mock scores (taken on IMS/TIME/CL platforms) is in scope. Simulating a full 120-minute timed mock exam with section switching is out of scope for v1.
- **Not a social platform.** No leaderboards, no peer comparison, no sharing. This is a private study workstation.
- **Not dependent on paid APIs.** Gemini integration is optional and user-brings-their-own-key. All core features work without any API key.

---

## 6. Success Criteria

The app is successful when a CAT aspirant can, in a single daily session:

1. Open the dashboard and see exactly how many questions they have solved today, how much time they have invested, and how many days remain until CAT.
2. Navigate to a weak topic, watch a recommended lecture, then immediately practice 10+ relevant PYQs with instant grading and detailed solutions.
3. Review their mistakes from the last session, understand the root cause via tagged flairs and personal notes, and re-test themselves on those exact questions.
4. Log their latest mock test score and see whether their sectional scores are trending up or down.
5. Close the app knowing exactly what to study tomorrow.
