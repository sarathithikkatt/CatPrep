import React, { useState } from 'react';
import { 
  Bookmark, 
  Trash2, 
  CheckCircle2, 
  AlertTriangle, 
  Tag, 
  BookOpen, 
  Sparkles, 
  RotateCcw,
  Edit3
} from 'lucide-react';
import { QUESTIONS_BANK } from '../data/questionsData';
import { MathText } from './MathText';

const MISTAKE_REASONS = [
  { id: 'concept', label: 'Missing / Weak Concept', color: 'bg-purple-50 text-purple-700 border-purple-200' },
  { id: 'calc', label: 'Calculation Slip', color: 'bg-rose-50 text-rose-700 border-rose-200' },
  { id: 'misread', label: 'Misread Question Statement', color: 'bg-amber-50 text-amber-700 border-amber-200' },
  { id: 'formula', label: 'Formula Forgotten', color: 'bg-blue-50 text-blue-700 border-blue-200' },
  { id: 'panic', label: 'Time Pressure / Guess', color: 'bg-slate-100 text-slate-700 border-slate-300' }
];

export const MistakeNotebook = ({ 
  userData, 
  onUpdateUserData, 
  onNavigateToPractice 
}) => {
  const [activeReasonFilter, setActiveReasonFilter] = useState('all');
  const [editingNotesId, setEditingNotesId] = useState(null);
  const [tempNotes, setTempNotes] = useState('');

  const allQuestions = [...QUESTIONS_BANK, ...(userData.customQuestions || [])];

  // Questions in notebook are either in bookmarkedQuestions or marked incorrect
  const bookmarkedIds = Object.keys(userData.bookmarkedQuestions || {});
  const incorrectIds = Object.keys(userData.questionAttempts || {}).filter(
    qid => userData.questionAttempts[qid]?.isCorrect === false
  );

  const unionIds = Array.from(new Set([...bookmarkedIds, ...incorrectIds]));
  const notebookQuestions = allQuestions.filter(q => unionIds.includes(q.id));

  // Save reason tag
  const handleUpdateReason = (qid, reason) => {
    const existing = userData.bookmarkedQuestions?.[qid] || {
      date: new Date().toISOString(),
      reason: 'General Review',
      notes: ''
    };
    onUpdateUserData({
      ...userData,
      bookmarkedQuestions: {
        ...userData.bookmarkedQuestions,
        [qid]: {
          ...existing,
          reason
        }
      }
    });
  };

  // Save personal notes
  const handleSaveNotes = (qid) => {
    const existing = userData.bookmarkedQuestions?.[qid] || {
      date: new Date().toISOString(),
      reason: 'General Review',
      notes: ''
    };
    onUpdateUserData({
      ...userData,
      bookmarkedQuestions: {
        ...userData.bookmarkedQuestions,
        [qid]: {
          ...existing,
          notes: tempNotes
        }
      }
    });
    setEditingNotesId(null);
  };

  // Remove question from mistake notebook
  const handleRemove = (qid) => {
    const updated = { ...userData.bookmarkedQuestions };
    delete updated[qid];
    onUpdateUserData({
      ...userData,
      bookmarkedQuestions: updated
    });
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Bookmark className="w-5 h-5 text-amber-500 fill-amber-500" />
              <h1 className="text-xl font-black text-slate-900 dark:text-white">
                Mistake & Revision Notebook
              </h1>
            </div>
            <p className="text-xs text-slate-400">
              The #1 differentiator for 99+ percentile scorers. Catalog your errors, pinpoint root causes & prevent repeat traps.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-bold px-3 py-1.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
              {notebookQuestions.length} Questions for Revision
            </span>
          </div>
        </div>

        {/* Filter by Root Cause */}
        <div className="flex items-center gap-2 pt-4 overflow-x-auto text-xs">
          <span className="text-slate-400 font-bold shrink-0">Filter By Cause:</span>
          <button
            onClick={() => setActiveReasonFilter('all')}
            className={`px-3 py-1 rounded-lg font-bold transition shrink-0 ${
              activeReasonFilter === 'all'
                ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900'
                : 'text-slate-500 hover:bg-slate-100'
            }`}
          >
            All Errors
          </button>
          {MISTAKE_REASONS.map((r) => (
            <button
              key={r.id}
              onClick={() => setActiveReasonFilter(r.label)}
              className={`px-2.5 py-1 rounded-lg border font-semibold shrink-0 transition ${
                activeReasonFilter === r.label
                  ? `${r.color} font-bold ring-2 ring-indigo-500/20`
                  : 'border-slate-200 text-slate-500 hover:bg-slate-100'
              }`}
            >
              {r.label}
            </button>
          ))}
        </div>
      </div>

      {/* Notebook Questions List */}
      {notebookQuestions.length === 0 ? (
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-12 text-center border border-dashed border-slate-300 dark:border-slate-800">
          <div className="w-12 h-12 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 flex items-center justify-center mx-auto mb-3">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-slate-800 dark:text-slate-200 mb-1">
            Zero Unresolved Errors!
          </h3>
          <p className="text-xs text-slate-400 max-w-md mx-auto mb-4">
            Practice previous year questions in the PYQ tab. Bookmark tough questions or flag incorrect solutions to review them here.
          </p>
          <button
            onClick={onNavigateToPractice}
            className="px-4 py-2 rounded-xl bg-indigo-600 text-white font-bold text-xs shadow-sm hover:bg-indigo-700"
          >
            Start Practicing PYQs
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {notebookQuestions.map((q) => {
            const qid = q.id;
            const meta = userData.bookmarkedQuestions?.[qid] || {};
            const isEditing = editingNotesId === qid;

            return (
              <div 
                key={qid}
                className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-4"
              >
                {/* Header */}
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold px-2.5 py-0.5 rounded-md bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
                      CAT {q.year} • {q.slot}
                    </span>
                    <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                      {q.topicName}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    {/* Cause Tag Selector */}
                    <select
                      value={meta.reason || 'General Review'}
                      onChange={(e) => handleUpdateReason(qid, e.target.value)}
                      className="text-xs font-semibold px-2.5 py-1 rounded-lg border border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 cursor-pointer"
                    >
                      <option value="General Review">📌 General Review</option>
                      {MISTAKE_REASONS.map(r => (
                        <option key={r.id} value={r.label}>{r.label}</option>
                      ))}
                    </select>

                    <button
                      onClick={() => handleRemove(qid)}
                      title="Mark as Mastered and Remove"
                      className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Question */}
                <div className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 font-medium leading-relaxed">
                  <MathText text={q.question} />
                </div>

                {/* Pro Shortcut Reminder */}
                {q.solution?.shortcut && (
                  <div className="p-3 bg-amber-50/60 dark:bg-amber-950/30 rounded-xl border border-amber-200 dark:border-amber-900/60 text-xs">
                    <span className="font-bold text-amber-800 dark:text-amber-300 block mb-1">
                      💡 Shortcut to Remember:
                    </span>
                    <MathText text={q.solution.shortcut} />
                  </div>
                )}

                {/* Personal Notes / Reflection Area */}
                <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
                  {isEditing ? (
                    <div className="space-y-2">
                      <textarea
                        rows={2}
                        value={tempNotes}
                        onChange={(e) => setTempNotes(e.target.value)}
                        placeholder="Why did you get this wrong? (e.g. Forgot that |x| can be negative, or misread percentage of total vs added)..."
                        className="w-full p-2.5 rounded-lg border text-xs bg-slate-50 dark:bg-slate-800"
                      />
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => setEditingNotesId(null)}
                          className="px-3 py-1 rounded text-xs font-semibold text-slate-500"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={() => handleSaveNotes(qid)}
                          className="px-3 py-1 rounded bg-indigo-600 text-white text-xs font-bold"
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
                          {meta.notes ? `"${meta.notes}"` : 'No reflection notes added yet.'}
                        </span>
                      </div>
                      <button
                        onClick={() => {
                          setEditingNotesId(qid);
                          setTempNotes(meta.notes || '');
                        }}
                        className="text-indigo-600 dark:text-indigo-400 font-bold hover:underline flex items-center gap-1 cursor-pointer"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                        <span>{meta.notes ? 'Edit' : 'Add Note'}</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
