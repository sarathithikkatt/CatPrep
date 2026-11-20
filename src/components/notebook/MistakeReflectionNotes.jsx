import React from 'react';
import { Edit3 } from 'lucide-react';

/**
 * Personal reflection notes viewer and inline editor for questions in the mistake notebook.
 */
export const MistakeReflectionNotes = ({
  notes,
  isEditing,
  tempNotes,
  setTempNotes,
  onStartEditing,
  onCancelEditing,
  onSaveNotes
}) => {
  return (
    <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
      {isEditing ? (
        <div className="space-y-2">
          <textarea
            rows={2}
            value={tempNotes}
            onChange={(e) => setTempNotes(e.target.value)}
            placeholder="Why did you get this wrong? (e.g. Forgot that |x| can be negative, or misread percentage of total vs added)..."
            className="w-full p-2.5 rounded-lg border border-slate-300 dark:border-slate-700 text-xs bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-100 font-sans"
          />
          <div className="flex justify-end gap-2">
            <button
              onClick={onCancelEditing}
              className="px-3 py-1 rounded text-xs font-semibold text-slate-500 cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 transition"
            >
              Cancel
            </button>
            <button
              onClick={onSaveNotes}
              className="px-3 py-1 rounded bg-indigo-600 text-white text-xs font-bold cursor-pointer hover:bg-indigo-700 transition"
            >
              Save Reflection
            </button>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-between text-xs">
          <div className="flex-1 mr-4">
            <span className="font-bold text-slate-500">My Mistake Reflection: </span>
            <span className="text-slate-700 dark:text-slate-300 italic">
              {notes ? `"${notes}"` : 'No reflection notes added yet.'}
            </span>
          </div>
          <button
            onClick={onStartEditing}
            className="text-indigo-600 dark:text-indigo-400 font-bold hover:underline flex items-center gap-1 cursor-pointer"
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>{notes ? 'Edit' : 'Add Note'}</span>
          </button>
        </div>
      )}
    </div>
  );
};
