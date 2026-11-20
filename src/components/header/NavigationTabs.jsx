import React from 'react';
import { Target, Calendar, BookOpen, Layers, Bookmark, Award, Sparkles, Flame } from 'lucide-react';

/**
 * Navigation tabs row switching between the 8 primary application views.
 */
export const NavigationTabs = ({ activeTab, onSelectTab }) => {
  const tabs = [
    {
      id: 'dashboard',
      label: 'Daily Tracker',
      icon: Target
    },
    {
      id: 'planner',
      label: 'Study Planner',
      icon: Calendar,
      badge: 'R-E-S-T'
    },
    {
      id: 'roadmaps',
      label: 'Sprint Plans',
      icon: Flame,
      badge: '3M • 1M • 1W',
      badgeColor: 'bg-rose-100 dark:bg-rose-900/60 text-rose-800 dark:text-rose-200'
    },
    {
      id: 'syllabus',
      label: 'Syllabus & Weightage',
      icon: BookOpen
    },
    {
      id: 'practice',
      label: 'PYQs & Solutions',
      icon: Layers,
      badge: 'Pro Shortcuts'
    },
    {
      id: 'notebook',
      label: 'Mistake Notebook',
      icon: Bookmark
    },
    {
      id: 'mocks',
      label: 'Mock Scorecards',
      icon: Award,
      badge: 'Panic Delta',
      badgeColor: 'bg-amber-200 dark:bg-amber-900/60 text-amber-900 dark:text-amber-200'
    },
    {
      id: 'resources',
      label: 'Resources',
      icon: Sparkles
    }
  ];

  return (
    <div className="flex space-x-1 sm:space-x-3 overflow-x-auto py-2 scrollbar-none scroll-smooth">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;

        return (
          <button
            key={tab.id}
            onClick={() => onSelectTab(tab.id)}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all whitespace-nowrap cursor-pointer ${
              isActive
                ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-500/20'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <Icon className="w-4 h-4" />
            <span>{tab.label}</span>
            {tab.badge && (
              <span
                className={`ml-0.5 px-1.5 py-0.2 rounded-full text-[10px] ${
                  tab.badgeColor ||
                  (isActive
                    ? 'bg-white/20 text-white'
                    : 'bg-indigo-100 dark:bg-indigo-900/60 text-indigo-900 dark:text-indigo-200')
                }`}
              >
                {tab.badge}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
};
