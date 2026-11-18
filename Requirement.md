# CatPrep — Requirements Specification

**Version**: 2.1  
**Last Updated**: November 19, 2026  
**Repository**: `d:\Dev\CatPrep`

---

## 1. Problem Statement

A CAT aspirant's daily workflow involves three distinct activities:

1. **Learning** — watching concept lectures, reading theory, memorizing formulas.
2. **Practicing** — solving previous year questions, sectional tests, mock exams.
3. **Analysing** — reviewing mistakes, tracking weak areas, monitoring daily progress.

Today these activities are fragmented across 5-10 disconnected tools: YouTube playlists, Google Sheets, coaching app screenshots, WhatsApp notes, paper notebooks, and mental arithmetic. No single system ties learning, practice, and analysis into one loop.

CatPrep exists to close that loop.

---

## 2. User Profile

**Primary User**: Self-preparing CAT aspirant (working professional or final-year student), aiming for 95-99+ percentile, studying 2-4 hours daily over 4-6 months.

**Key Constraints**:
- Limited time — every minute spent navigating tools is a minute not spent studying.
- Mobile/laptop access — may study at office, home, or commute.
- Budget-conscious — prefers free resources over paid coaching subscriptions.
- Needs accountability — daily tracking prevents procrastination.

---

## 3. Functional Requirements

### 3.1 Syllabus & Topic Management

| ID | Requirement | Priority | Status |
| :--- | :--- | :--- | :--- |
| FR-1.1 | Display CAT syllabus organized as Section → Module → Topic → Subtopics | P0 | ✅ Done |
| FR-1.2 | Show historical weightage and difficulty per topic | P0 | ✅ Done |
| FR-1.3 | Allow users to mark topic status (Not Started / In Progress / Mastered / Revision Due) | P0 | ✅ Done |
| FR-1.4 | Confidence rating (1-5 stars) per topic | P1 | ✅ Done |
| FR-1.5 | Show formula cheatsheet / key concepts per topic (expandable) | P0 | ✅ Done |
| FR-1.6 | Estimated study hours per topic with progress tracking | P1 | ✅ Done |
| FR-1.7 | Link curated video lectures (YouTube) per topic for self-study | P1 | ✅ Done (40/40 topics linked) |
| FR-1.8 | Search and filter topics by name, status, or section | P1 | ✅ Done |
| FR-1.9 | Support switching between exam targets (CAT, XAT, GMAT) via top navbar | P2 | ✅ Done |

### 3.2 Question Bank & Practice

| ID | Requirement | Priority | Status |
| :--- | :--- | :--- | :--- |
| FR-2.1 | Pre-loaded previous year CAT questions (MCQ and TITA) with metadata (year, slot, topic, difficulty) | P0 | ⚠️ In Progress (40 authentic PYQs covering 100% of CAT topics; expanding towards 200+) |
| FR-2.2 | Active practice mode: answer hidden until user submits | P0 | ✅ Done |
| FR-2.3 | Instant evaluation with visual feedback (confetti on correct, highlight on wrong) | P1 | ✅ Done |
| FR-2.4 | Correct CAT scoring: +3 MCQ correct, -1 MCQ wrong, +3 TITA correct, 0 TITA wrong | P0 | ✅ Done (+3 / -1 MCQ, +3 / 0 TITA) |
| FR-2.5 | Filter questions by section, topic, difficulty, year, and attempt status | P0 | ✅ Done |
| FR-2.6 | Bookmark questions to Mistake Notebook | P0 | ✅ Done |
| FR-2.7 | Add custom questions via form (text + options) | P1 | ✅ Done |
| FR-2.8 | Paste screenshot from clipboard (Ctrl+V) to add image-based questions | P2 | 🔲 Planned |
| FR-2.9 | AI-generated solutions via Gemini API for pasted image questions | P3 | 🔲 Planned |
| FR-2.10 | KaTeX math rendering in question text, options, and solutions | P0 | ✅ Done |

### 3.3 Solution Quality

| ID | Requirement | Priority | Status |
| :--- | :--- | :--- | :--- |
| FR-3.1 | Each solution provides 4 tiers: Core Concept, Step-by-Step, Exam Shortcut, Trap Alerts | P0 | ✅ Done |
| FR-3.2 | Tabbed navigation between solution tiers | P0 | ✅ Done |
| FR-3.3 | Solutions render KaTeX math correctly | P0 | ✅ Done |

### 3.4 Daily Tracker & Progress

| ID | Requirement | Priority | Status |
| :--- | :--- | :--- | :--- |
| FR-4.1 | Customizable daily target (questions/day, minutes/day) | P0 | ✅ Done |
| FR-4.2 | Real-time progress bar: questions solved today vs target | P0 | ✅ Done |
| FR-4.3 | Time investment tracker with quick-log buttons (+15m, +30m, +1h) | P0 | ✅ Done |
| FR-4.4 | Daily accuracy percentage | P0 | ✅ Done |
| FR-4.5 | Study streak counter (consecutive active days) | P1 | ✅ Done |
| FR-4.6 | Syllabus burndown: topics mastered vs total, section-wise progress bars | P0 | ✅ Done |
| FR-4.7 | Velocity forecast: estimated days to complete syllabus at current pace | P1 | ✅ Done |
| FR-4.8 | CAT exam countdown timer/ring | P2 | ✅ Done |

### 3.5 Mistake Notebook & Error Analysis

| ID | Requirement | Priority | Status |
| :--- | :--- | :--- | :--- |
| FR-5.1 | Auto-collect incorrectly answered and bookmarked questions | P0 | ✅ Done |
| FR-5.2 | Tag errors by root cause (Concept Gap, Calculation Slip, Misread, Time Panic, Formula Forgotten) | P0 | ✅ Done |
| FR-5.3 | Personal reflection notes per mistake | P1 | ✅ Done |
| FR-5.4 | Filter notebook by root cause tag | P1 | ✅ Done |
| FR-5.5 | Display shortcut reminder for each mistake | P1 | ✅ Done |
| FR-5.6 | Re-test mode: re-attempt mistakes with answer hidden again | P2 | ✅ Done |

### 3.6 Mock Test Scorecards

| ID | Requirement | Priority | Status |
| :--- | :--- | :--- | :--- |
| FR-6.1 | Log sectional and full mock scores (VARC, DILR, QA: attempted, correct, incorrect, TITA incorrect) | P1 | ✅ Done |
| FR-6.2 | Calculate net score: (Correct × 3) − ((Incorrect − TITA Incorrect) × 1) | P1 | ✅ Done |
| FR-6.3 | Capability score: untimed re-attempt score for same mock | P2 | ✅ Done |
| FR-6.4 | Mock score history with trend visualization | P2 | ✅ Done |

### 3.7 Study Planner

| ID | Requirement | Priority | Status |
| :--- | :--- | :--- | :--- |
| FR-7.1 | Structured multi-week study schedule (R-E-S-T: Revise, Enhance, Strategize, Test) | P2 | ✅ Done |
| FR-7.2 | Daily to-do list with section-tagged tasks | P2 | ✅ Done |

### 3.8 Data & Privacy

| ID | Requirement | Priority | Status |
| :--- | :--- | :--- | :--- |
| FR-8.1 | All data stored locally (LocalStorage). No cloud servers. | P0 | ✅ Done |
| FR-8.2 | One-click JSON export backup | P0 | ✅ Done |
| FR-8.3 | One-click JSON import restore | P0 | ✅ Done |

---

## 4. Non-Functional Requirements

| ID | Requirement | Priority |
| :--- | :--- | :--- |
| NFR-1 | Page loads in under 2 seconds | P0 |
| NFR-2 | Works fully offline after first load | P1 |
| NFR-3 | Responsive layout: desktop-first, usable on tablet and mobile | P1 |
| NFR-4 | Supports Chrome, Edge, Firefox, Safari | P0 |
| NFR-5 | Clean module separation: data / components / utilities | P0 |
| NFR-6 | No paid dependencies or mandatory API keys for core features | P0 |

---

## 5. Out of Scope (for v1)

- User authentication or multi-user accounts
- Cloud sync or server-side storage
- Native mobile app (iOS / Android)
- Paid coaching content or DRM-protected material
- Full-length timed mock exam simulation engine
- Payment or subscription features
