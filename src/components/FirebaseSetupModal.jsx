import React from 'react';
import { X, ExternalLink, Key, ShieldCheck } from 'lucide-react';
import { SetupStepItem } from './firebase/SetupStepItem';
import { EnvTemplateBlock } from './firebase/EnvTemplateBlock';

/**
 * Firebase Setup Guide Modal:
 * Walks users through configuring Google Sign-In & Cloud Firestore synchronization on Firebase Spark (Free) plan.
 */
export const FirebaseSetupModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const envTemplate = `# .env.local
VITE_FIREBASE_API_KEY=your_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project_id.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id_here`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl max-w-xl w-full p-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1 rounded-lg cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center">
            <Key className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-lg text-slate-900 dark:text-slate-100">
              Set Up Google Sign-In & Cloud Sync
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              100% Free on Firebase Spark Plan (No Credit Card Required)
            </p>
          </div>
        </div>

        <div className="space-y-4 text-sm text-slate-600 dark:text-slate-300">
          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 space-y-3">
            <SetupStepItem stepNumber="1" title="Create a Free Project">
              Go to{' '}
              <a
                href="https://console.firebase.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-600 dark:text-indigo-400 underline font-medium inline-flex items-center gap-1"
              >
                Firebase Console <ExternalLink className="w-3 h-3" />
              </a>{' '}
              and click <strong>Add project</strong>.
            </SetupStepItem>

            <SetupStepItem stepNumber="2" title="Enable Google Auth & Firestore">
              • <strong>Build &gt; Authentication</strong> → Click <strong>Get started</strong> → Enable <strong>Google</strong>.<br />
              • <strong>Build &gt; Firestore Database</strong> → Click <strong>Create database</strong> (choose Test or Production mode).
            </SetupStepItem>

            <SetupStepItem stepNumber="3" title="Add Web App & Copy Keys">
              Click the Web icon (<strong>&lt;/&gt;</strong>) in Project Overview, register your app, and paste the config values into your local <code>.env.local</code> file (and into Vercel/Netlify Environment Variables):
            </SetupStepItem>
          </div>

          <EnvTemplateBlock template={envTemplate} />

          <div className="p-3 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-900/50 flex items-center gap-2.5 text-xs text-indigo-800 dark:text-indigo-300">
            <ShieldCheck className="w-5 h-5 flex-shrink-0 text-indigo-600 dark:text-indigo-400" />
            <span>
              <strong>Note:</strong> Until configured, all progress continues to be stored locally in your browser. No data is lost!
            </span>
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-sm font-semibold bg-indigo-600 hover:bg-indigo-700 text-white transition-colors cursor-pointer"
          >
            Got it, continue
          </button>
        </div>
      </div>
    </div>
  );
};
