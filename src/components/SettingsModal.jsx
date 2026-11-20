import React, { useState } from 'react';
import { Sparkles, X } from 'lucide-react';
import { getGeminiApiKey } from '../utils/gemini';
import { FeatureExplainer } from './settings/FeatureExplainer';
import { ApiKeyForm } from './settings/ApiKeyForm';

/**
 * Global AI Settings Modal for configuring Gemini API credentials.
 */
export const SettingsModal = ({ isOpen, onClose }) => {
  const [apiKey, setApiKey] = useState(() => getGeminiApiKey());

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-lg w-full p-6 border border-slate-200 dark:border-slate-800 shadow-2xl space-y-5">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 text-white flex items-center justify-center shadow-md shadow-indigo-500/20">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-base text-slate-900 dark:text-white">
                AI & Gemini OCR Settings
              </h3>
              <span className="text-[11px] text-slate-400">
                Optional: Power screenshot OCR & 4-tier solution generation
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 text-sm font-bold p-1 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Feature Explainer */}
        <FeatureExplainer />

        {/* API Key Form */}
        <ApiKeyForm
          apiKey={apiKey}
          setApiKey={setApiKey}
          onClose={onClose}
        />
      </div>
    </div>
  );
};
