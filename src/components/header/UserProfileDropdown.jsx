import React, { useRef, useState, useEffect } from 'react';
import { ChevronDown, Cloud, AlertCircle, Loader2, Download, LogOut } from 'lucide-react';
import { exportUserDataJSON } from '../../utils/storage';

/**
 * User avatar profile button with sync status badge and dropdown options (Export, Sign Out).
 */
export const UserProfileDropdown = ({
  currentUser,
  syncStatus,
  userData,
  onLogout
}) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileDropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileDropdownRef.current && !profileDropdownRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={profileDropdownRef}>
      <button
        onClick={() => setIsProfileOpen(!isProfileOpen)}
        className="flex items-center gap-2 p-1 pl-1.5 pr-2 rounded-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-750 transition-all cursor-pointer shadow-sm"
        title="Account and Cloud Sync"
      >
        {currentUser.photoURL ? (
          <img
            src={currentUser.photoURL}
            alt={currentUser.displayName || 'User'}
            className="w-7 h-7 rounded-full object-cover ring-1 ring-indigo-500/30"
          />
        ) : (
          <div className="w-7 h-7 rounded-full bg-indigo-600 text-white flex items-center justify-center text-xs font-bold">
            {currentUser.displayName?.charAt(0) || currentUser.email?.charAt(0) || 'U'}
          </div>
        )}

        <span className="hidden md:inline text-xs font-semibold text-slate-700 dark:text-slate-200 max-w-[100px] truncate">
          {currentUser.displayName?.split(' ')[0] || 'User'}
        </span>

        {/* Cloud status icon */}
        {syncStatus === 'saving' ? (
          <Loader2 className="w-3.5 h-3.5 animate-spin text-indigo-500" title="Syncing to cloud..." />
        ) : syncStatus === 'synced' ? (
          <Cloud className="w-3.5 h-3.5 text-emerald-500" title="Synced to Firestore" />
        ) : syncStatus === 'error' ? (
          <AlertCircle className="w-3.5 h-3.5 text-rose-500" title="Sync error" />
        ) : null}

        <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
      </button>

      {/* Profile Dropdown Menu */}
      {isProfileOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xl p-3 z-50 animate-fade-in text-sm">
          {/* User Info */}
          <div className="flex items-center gap-3 pb-3 border-b border-slate-100 dark:border-slate-800">
            {currentUser.photoURL ? (
              <img
                src={currentUser.photoURL}
                alt={currentUser.displayName || 'User'}
                className="w-10 h-10 rounded-full object-cover"
              />
            ) : (
              <div className="w-10 h-10 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold">
                {currentUser.displayName?.charAt(0) || 'U'}
              </div>
            )}
            <div className="flex-1 min-w-0">
              <p className="font-bold text-slate-900 dark:text-slate-100 text-xs truncate">
                {currentUser.displayName || 'AptiPrep Student'}
              </p>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                {currentUser.email}
              </p>
            </div>
          </div>

          {/* Sync Status Badge */}
          <div className="my-2.5 px-2.5 py-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/50 flex items-center justify-between text-xs text-emerald-700 dark:text-emerald-300 font-medium">
            <span className="flex items-center gap-1.5">
              <Cloud className="w-3.5 h-3.5" />
              Firestore Cloud Sync
            </span>
            <span className="text-[10px] uppercase font-bold bg-emerald-200/60 dark:bg-emerald-900/60 px-1.5 py-0.5 rounded">
              Active
            </span>
          </div>

          {/* Actions */}
          <div className="space-y-1 pt-1">
            <button
              onClick={() => {
                setIsProfileOpen(false);
                exportUserDataJSON(userData);
              }}
              className="w-full flex items-center gap-2 px-2.5 py-2 text-xs text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 text-slate-500" />
              Export Backup JSON
            </button>

            <button
              onClick={() => {
                setIsProfileOpen(false);
                onLogout();
              }}
              className="w-full flex items-center gap-2 px-2.5 py-2 text-xs text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-lg transition-colors cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              Sign Out
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
