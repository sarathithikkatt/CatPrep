import React, { useState } from 'react';
import { X, ExternalLink, Key, ShieldCheck, Database, Check, Copy } from 'lucide-react';

export const FirebaseSetupModal = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const envTemplate = `# .env.local
VITE_FIREBASE_API_KEY=your_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project_id.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(envTemplate);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl max-w-xl w-full p-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1 rounded-lg"
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
            <div className="flex items-start gap-2.5">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-indigo-600 text-white flex items-center justify-center text-xs font-bold">1</span>
              <div>
                <p className="font-semibold text-slate-800 dark:text-slate-200">Create a Free Project</p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
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
                </p>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-indigo-600 text-white flex items-center justify-center text-xs font-bold">2</span>
              <div>
                <p className="font-semibold text-slate-800 dark:text-slate-200">Enable Google Auth & Firestore</p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  • <strong>Build &gt; Authentication</strong> → Click <strong>Get started</strong> → Enable <strong>Google</strong>.<br />
                  • <strong>Build &gt; Firestore Database</strong> → Click <strong>Create database</strong> (choose Test or Production mode).
                </p>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-indigo-600 text-white flex items-center justify-center text-xs font-bold">3</span>
              <div>
                <p className="font-semibold text-slate-800 dark:text-slate-200">Add Web App & Copy Keys</p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Click the Web icon (<strong>&lt;/&gt;</strong>) in Project Overview, register your app, and paste the config values into your local <code>.env.local</code> file (and into Vercel's Environment Variables):
                </p>
              </div>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Environment template:</span>
              <button
                onClick={copyToClipboard}
                className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline inline-flex items-center gap-1 font-medium cursor-pointer"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? 'Copied template!' : 'Copy template'}
              </button>
            </div>
            <pre className="p-3 bg-slate-900 text-slate-200 text-xs rounded-xl font-mono overflow-x-auto border border-slate-800">
              {envTemplate}
            </pre>
          </div>

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
