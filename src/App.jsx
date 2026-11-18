import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { DashboardTracker } from './components/DashboardTracker';
import { SyllabusManager } from './components/SyllabusManager';
import { QuestionPractice } from './components/QuestionPractice';
import { MistakeNotebook } from './components/MistakeNotebook';
import { MockScorecard } from './components/MockScorecard';
import { ResourcesGuide } from './components/ResourcesGuide';
import { loadUserData, saveUserData } from './utils/storage';
import { EXAMS_CONFIG } from './data/examsData';

export default function App() {
  const [userData, setUserData] = useState(() => loadUserData());
  const [activeExamId, setActiveExamId] = useState(userData.activeExamId || 'cat');
  const [activeTab, setActiveTab] = useState('dashboard');
  const [topicFilterForPractice, setTopicFilterForPractice] = useState('all');

  // Persist user data updates
  const handleUpdateUserData = (newData) => {
    setUserData(newData);
    saveUserData(newData);
  };

  // Switch Target Exam
  const handleSelectExam = (examId) => {
    setActiveExamId(examId);
    handleUpdateUserData({
      ...userData,
      activeExamId: examId
    });
  };

  // Jump from Syllabus to Practice with topic pre-filtered
  const handlePracticeTopic = (topicId) => {
    setTopicFilterForPractice(topicId);
    setActiveTab('practice');
  };

  const handleNavigateToPractice = () => {
    setTopicFilterForPractice('all');
    setActiveTab('practice');
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans transition-colors">
      {/* Top Navigation & Brand Header */}
      <Header
        activeExamId={activeExamId}
        onSelectExam={handleSelectExam}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        userData={userData}
        onImportData={handleUpdateUserData}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {activeTab === 'dashboard' && (
          <DashboardTracker
            activeExamId={activeExamId}
            userData={userData}
            onUpdateUserData={handleUpdateUserData}
            onNavigateToPractice={handleNavigateToPractice}
          />
        )}

        {activeTab === 'syllabus' && (
          <SyllabusManager
            activeExamId={activeExamId}
            userData={userData}
            onUpdateUserData={handleUpdateUserData}
            onPracticeTopic={handlePracticeTopic}
          />
        )}

        {activeTab === 'practice' && (
          <QuestionPractice
            activeExamId={activeExamId}
            initialTopicFilter={topicFilterForPractice}
            userData={userData}
            onUpdateUserData={handleUpdateUserData}
          />
        )}

        {activeTab === 'notebook' && (
          <MistakeNotebook
            userData={userData}
            onUpdateUserData={handleUpdateUserData}
            onNavigateToPractice={handleNavigateToPractice}
          />
        )}

        {activeTab === 'mocks' && (
          <MockScorecard
            userData={userData}
            onUpdateUserData={handleUpdateUserData}
          />
        )}

        {activeTab === 'resources' && (
          <ResourcesGuide />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 py-6 text-center text-xs text-slate-400">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>
            <strong className="text-slate-600 dark:text-slate-300">AptiPrep Elite Hub</strong> — Architected for CAT, XAT, GMAT & Competitive Aptitude Mastery.
          </p>
          <div className="flex items-center gap-4 text-slate-500">
            <span>Selection & Accuracy &gt; Blind Completion</span>
            <span>•</span>
            <span>Target: 99+ Percentile</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
