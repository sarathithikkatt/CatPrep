import React, { useState } from 'react';
import { Loader2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { BrandLogo } from './header/BrandLogo';
import { ExamSelector } from './header/ExamSelector';
import { QuickStatsBar } from './header/QuickStatsBar';
import { DataActions } from './header/DataActions';
import { GoogleSignInButton } from './header/GoogleSignInButton';
import { UserProfileDropdown } from './header/UserProfileDropdown';
import { NavigationTabs } from './header/NavigationTabs';

/**
 * Top navigation header: brand logo, active exam switcher, daily study counters,
 * data export/import, Google auth status, and primary tab navigation.
 */
export const Header = ({ 
  activeExamId, 
  onSelectExam, 
  activeTab, 
  setActiveTab, 
  userData, 
  onImportData, 
  onOpenSettings,
  onOpenFirebaseSetup
}) => {
  const { currentUser, authLoading, isConfigured, syncStatus, loginWithGoogle, logout } = useAuth();
  const [isSigningIn, setIsSigningIn] = useState(false);

  const today = new Date().toISOString().split('T')[0];
  const todayLog = userData.dailyLogs?.[today] || { questionsSolved: 0, minutesSpent: 0 };
  const targetQs = userData.dailyTarget?.questions || 25;

  const handleSignIn = async () => {
    setIsSigningIn(true);
    try {
      const res = await loginWithGoogle();
      if (res?.notConfigured) {
        if (onOpenFirebaseSetup) onOpenFirebaseSetup();
      } else if (!res?.success && res?.error) {
        alert(res.error);
      }
    } finally {
      setIsSigningIn(false);
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 shadow-sm transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Bar: Brand, Exam Selector, Quick Stats, Actions */}
        <div className="flex items-center justify-between h-16 border-b border-slate-100 dark:border-slate-800/60">
          {/* Logo & Exam Switcher */}
          <div className="flex items-center gap-3 sm:gap-6">
            <BrandLogo />
            <ExamSelector
              activeExamId={activeExamId}
              onSelectExam={onSelectExam}
            />
          </div>

          {/* Quick Metrics & Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            <QuickStatsBar
              questionsSolved={todayLog.questionsSolved}
              targetQuestions={targetQs}
              streakCount={userData.streak?.currentStreak || 1}
            />

            <DataActions
              userData={userData}
              onImportData={onImportData}
              onOpenSettings={onOpenSettings}
            />

            {/* Vertical separator */}
            <div className="h-5 w-px bg-slate-200 dark:bg-slate-700 mx-0.5 sm:mx-1" />

            {/* Google Authentication & User Profile */}
            {authLoading ? (
              <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                <Loader2 className="w-4 h-4 animate-spin text-slate-400" />
              </div>
            ) : currentUser ? (
              <UserProfileDropdown
                currentUser={currentUser}
                syncStatus={syncStatus}
                userData={userData}
                onLogout={logout}
              />
            ) : (
              <GoogleSignInButton
                isSigningIn={isSigningIn}
                isConfigured={isConfigured}
                onSignIn={handleSignIn}
              />
            )}
          </div>
        </div>

        {/* Tab Navigation */}
        <NavigationTabs
          activeTab={activeTab}
          onSelectTab={setActiveTab}
        />
      </div>
    </header>
  );
};
