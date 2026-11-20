import React from 'react';
import { Sparkles, Download, Upload } from 'lucide-react';
import { exportUserDataJSON } from '../../utils/storage';

/**
 * Data backup, restore, and AI settings action buttons in the header.
 */
export const DataActions = ({ userData, onImportData, onOpenSettings }) => {
  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target.result);
        onImportData(parsed);
        alert('Data successfully restored!');
      } catch {
        alert('Invalid JSON backup file');
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="flex items-center gap-1">
      <button
        onClick={onOpenSettings}
        title="AI & Gemini OCR Settings"
        className="p-1.5 rounded-lg text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 dark:text-slate-400 dark:hover:text-indigo-400 dark:hover:bg-indigo-950/40 transition-colors cursor-pointer"
      >
        <Sparkles className="w-4 h-4 text-indigo-500" />
      </button>
      <button
        onClick={() => exportUserDataJSON(userData)}
        title="Backup progress as JSON"
        className="p-1.5 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-100 dark:text-slate-400 dark:hover:text-slate-200 dark:hover:bg-slate-800 transition-colors cursor-pointer"
      >
        <Download className="w-4 h-4" />
      </button>
      <label
        title="Restore progress from JSON"
        className="p-1.5 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-100 dark:text-slate-400 dark:hover:text-slate-200 dark:hover:bg-slate-800 transition-colors cursor-pointer"
      >
        <Upload className="w-4 h-4" />
        <input type="file" accept=".json" onChange={handleFileUpload} className="hidden" />
      </label>
    </div>
  );
};
