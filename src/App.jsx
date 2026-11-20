import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { DashboardTracker } from './components/DashboardTracker';
import { SyllabusManager } from './components/SyllabusManager';
import { QuestionPractice } from './components/QuestionPractice';
import { MistakeNotebook } from './components/MistakeNotebook';
import { MockScorecard } from './components/MockScorecard';
import { StudyPlanner } from './components/StudyPlanner';
import { ResourcesGuide } from './components/ResourcesGuide';
import { SettingsModal } from './components/SettingsModal';
import { FirebaseSetupModal } from './components/FirebaseSetupModal';
import { loadUserData, saveUserData } from './utils/storage';
import { useAuth } from './context/AuthContext';
import { 
  loadUserCloudData, 
  saveUserCloudDataImmediate, 
  saveUserCloudDataDebounced 
} from './utils/cloudSync';

export default function App() {
  const { currentUser, setSyncStatus } = useAuth();
  const [userData, setUserData] = useState(() => loadUserData());
  const [activeExamId, setActiveExamId] = useState(userData.activeExamId || 'cat');
  const [activeTab, setActiveTab] = useState('dashboard');
  const [topicFilterForPractice, setTopicFilterForPractice] = useState('all');
  const [retestQuestionId, setRetestQuestionId] = useState(null);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isFirebaseSetupOpen, setIsFirebaseSetupOpen] = useState(false);

  // Sync with Firestore when auth state changes
  useEffect(() => {
    let isCancelled = false;

    async function syncOnLogin() {
      if (currentUser?.uid) {
        try {
          setSyncStatus('saving');
          const cloudData = await loadUserCloudData(currentUser.uid);
          if (isCancelled) return;

          if (cloudData) {
            // Restore from cloud
            setUserData(cloudData);
            saveUserData(cloudData); // Keep local storage fresh
            if (cloudData.activeExamId) {
              setActiveExamId(cloudData.activeExamId);
            }
          } else {
            // First time login: migrate guest local progress to Firestore
            await saveUserCloudDataImmediate(currentUser.uid, userData);
          }
          setSyncStatus('synced');
        } catch (err) {
          console.error('Cloud sync error on login:', err);
          setSyncStatus('error');
        }
      } else {
        setSyncStatus('guest');
      }
    }

    syncOnLogin();

    return () => {
      isCancelled = true;
    };
  }, [currentUser?.uid]);

  // Persist user data updates locally and debounced to Firestore
  const handleUpdateUserData = (newData) => {
    setUserData(newData);
    saveUserData(newData);

    if (currentUser?.uid) {
      saveUserCloudDataDebounced(currentUser.uid, newData, 1500, setSyncStatus);
    }
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

  // Navigate to Practice tab focused on re-testing a specific mistake
  const handleRetestInPractice = (questionId) => {
    setRetestQuestionId(questionId);
    setActiveTab('practice');
  };

  const handleClearRetest = () => {
    setRetestQuestionId(null);
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
        onOpenSettings={() => setIsSettingsOpen(true)}
        onOpenFirebaseSetup={() => setIsFirebaseSetupOpen(true)}
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

        {activeTab === 'planner' && (
          <StudyPlanner
            userData={userData}
            onUpdateUserData={handleUpdateUserData}
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
            retestQuestionId={retestQuestionId}
            onClearRetest={handleClearRetest}
            onOpenSettings={() => setIsSettingsOpen(true)}
            userData={userData}
            onUpdateUserData={handleUpdateUserData}
          />
        )}

        {activeTab === 'notebook' && (
          <MistakeNotebook
            userData={userData}
            onUpdateUserData={handleUpdateUserData}
            onNavigateToPractice={handleNavigateToPractice}
            onRetestInPractice={handleRetestInPractice}
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

      {/* Global AI & System Settings Modal */}
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
      />

      {/* Firebase Setup Guide Modal */}
      <FirebaseSetupModal
        isOpen={isFirebaseSetupOpen}
        onClose={() => setIsFirebaseSetupOpen(false)}
      />

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
