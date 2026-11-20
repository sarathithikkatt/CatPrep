import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';

/**
 * Copyable environment template block for Firebase setup with copy feedback.
 */
export const EnvTemplateBlock = ({ template }) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(template);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
          Environment template:
        </span>
        <button
          onClick={copyToClipboard}
          className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline inline-flex items-center gap-1 font-medium cursor-pointer"
        >
          {copied ? (
            <Check className="w-3.5 h-3.5 text-emerald-500" />
          ) : (
            <Copy className="w-3.5 h-3.5" />
          )}
          {copied ? 'Copied template!' : 'Copy template'}
        </button>
      </div>
      <pre className="p-3 bg-slate-900 text-slate-200 text-xs rounded-xl font-mono overflow-x-auto border border-slate-800">
        {template}
      </pre>
    </div>
  );
};
