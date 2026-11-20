import React, { useState } from 'react';
import { Key, ExternalLink, Eye, EyeOff, ShieldCheck, CheckCircle2, XCircle, Trash2 } from 'lucide-react';
import { saveGeminiApiKey, testGeminiApiKey } from '../../utils/gemini';

/**
 * API Key Form with key visibility toggle, connection testing, and secure local storage saving.
 */
export const ApiKeyForm = ({
  apiKey,
  setApiKey,
  onClose
}) => {
  const [showKey, setShowKey] = useState(false);
  const [isTesting, setIsTesting] = useState(false);
  const [testResult, setTestResult] = useState(null);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    saveGeminiApiKey(apiKey);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2500);
  };

  const handleRemove = () => {
    if (confirm('Remove saved Gemini API key from local storage?')) {
      saveGeminiApiKey('');
      setApiKey('');
      setTestResult(null);
    }
  };

  const handleTest = async () => {
    if (!apiKey.trim()) {
      setTestResult({ success: false, message: 'Please enter an API key first.' });
      return;
    }
    setIsTesting(true);
    setTestResult(null);
    try {
      await testGeminiApiKey(apiKey.trim());
      setTestResult({ success: true, message: 'Connection verified! Gemini API key is valid.' });
    } catch (err) {
      setTestResult({ success: false, message: err.message || 'Connection failed' });
    } finally {
      setIsTesting(false);
    }
  };

  return (
    <form onSubmit={handleSave} className="space-y-4">
      <div>
        <div className="flex items-center justify-between mb-1.5">
          <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
            <Key className="w-3.5 h-3.5 text-indigo-600" />
            <span>Google Gemini API Key</span>
          </label>
          <a
            href="https://aistudio.google.com/app/apikey"
            target="_blank"
            rel="noreferrer"
            className="text-[11px] text-indigo-600 dark:text-indigo-400 font-bold hover:underline flex items-center gap-1"
          >
            <span>Get Free Key (Google AI Studio)</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>

        <div className="relative">
          <input
            type={showKey ? 'text' : 'password'}
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            placeholder="AIzaSy..."
            className="w-full pl-3 pr-10 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-mono text-slate-900 dark:text-slate-100 focus:outline-none focus:border-indigo-500"
          />
          <button
            type="button"
            onClick={() => setShowKey(!showKey)}
            className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
          >
            {showKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Test Status Feedback */}
      {testResult && (
        <div className={`p-3 rounded-xl border text-xs flex items-start gap-2 ${
          testResult.success
            ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-200'
            : 'bg-rose-50 dark:bg-rose-950/40 border-rose-300 dark:border-rose-800 text-rose-800 dark:text-rose-200'
        }`}>
          {testResult.success ? (
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
          ) : (
            <XCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
          )}
          <span className="font-semibold text-[11px] leading-relaxed">
            {testResult.message}
          </span>
        </div>
      )}

      {saveSuccess && (
        <div className="p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 text-emerald-700 text-xs font-bold text-center">
          ✓ API Key Saved Successfully!
        </div>
      )}

      {/* Privacy Disclaimer */}
      <div className="flex items-center gap-2 text-[10px] text-slate-400 dark:text-slate-500 bg-slate-50 dark:bg-slate-800/40 p-2.5 rounded-xl">
        <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
        <span>Stored strictly on your device in browser LocalStorage. Never uploaded to our servers.</span>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleTest}
            disabled={isTesting || !apiKey.trim()}
            className="px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-40 transition cursor-pointer"
          >
            {isTesting ? 'Verifying...' : 'Test Key'}
          </button>

          {apiKey && (
            <button
              type="button"
              onClick={handleRemove}
              className="p-2 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition cursor-pointer"
              title="Remove Key"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          )}
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer transition"
          >
            Close
          </button>
          <button
            type="submit"
            className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md shadow-indigo-500/20 transition cursor-pointer"
          >
            Save Settings
          </button>
        </div>
      </div>
    </form>
  );
};
