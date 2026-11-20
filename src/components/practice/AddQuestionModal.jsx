import React, { useState } from 'react';
import { X } from 'lucide-react';
import { ScreenshotDropzone } from './ScreenshotDropzone';
import { GeminiAutoSolveSection } from './GeminiAutoSolveSection';
import { analyzeQuestionScreenshot, getGeminiApiKey } from '../../utils/gemini';

/**
 * Modal to add a custom question or transcribe a mock test screenshot using Gemini AI.
 */
export const AddQuestionModal = ({
  isOpen,
  onClose,
  currentExam,
  activeExamId,
  onSaveQuestion,
  onOpenSettings
}) => {
  const [isAiAnalyzing, setIsAiAnalyzing] = useState(false);
  const [aiError, setAiError] = useState(null);

  const [newQuestion, setNewQuestion] = useState({
    sectionId: currentExam.sections[0]?.id || 'qa',
    topicName: '',
    topicId: '',
    year: 2024,
    slot: 'Slot 1',
    type: 'MCQ',
    difficulty: 'Moderate',
    question: '',
    options: ['', '', '', ''],
    correctAnswer: 0,
    imageBase64: '',
    imageMime: 'image/png',
    solution: {
      coreConcept: '',
      stepByStep: '',
      shortcut: '',
      pitfalls: ''
    }
  });

  if (!isOpen) return null;

  const handleImageFile = (file) => {
    if (!file || !file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      setNewQuestion((prev) => ({
        ...prev,
        imageBase64: e.target.result,
        imageMime: file.type
      }));
      setAiError(null);
    };
    reader.readAsDataURL(file);
  };

  const handlePaste = (e) => {
    const items = e.clipboardData?.items;
    if (!items) return;
    for (const item of items) {
      if (item.type.indexOf('image') !== -1) {
        const file = item.getAsFile();
        handleImageFile(file);
        break;
      }
    }
  };

  const handleAutoSolveWithGemini = async () => {
    if (!newQuestion.imageBase64 && !newQuestion.question) {
      setAiError('Please paste an image screenshot or enter question text first.');
      return;
    }
    const apiKey = getGeminiApiKey();
    if (!apiKey) {
      if (onOpenSettings) {
        onOpenSettings();
      } else {
        alert('Please configure your Gemini API Key in AI Settings first.');
      }
      return;
    }

    setIsAiAnalyzing(true);
    setAiError(null);
    try {
      const result = await analyzeQuestionScreenshot({
        imageBase64: newQuestion.imageBase64 || '',
        mimeType: newQuestion.imageMime || 'image/png',
        questionHint: newQuestion.question || '',
        examId: activeExamId
      });

      setNewQuestion((prev) => ({
        ...prev,
        sectionId: result.sectionId || prev.sectionId,
        topicId: result.topicId || prev.topicId,
        topicName: result.topicName || prev.topicName || 'General Practice',
        difficulty: result.difficulty || prev.difficulty,
        type: result.type || prev.type,
        question: result.question || prev.question,
        options: result.options && result.options.length > 0 ? result.options : prev.options,
        correctAnswer: typeof result.correctAnswer === 'number' ? result.correctAnswer : 0,
        solution: {
          coreConcept: result.solution?.coreConcept || '',
          stepByStep: result.solution?.stepByStep || '',
          shortcut: result.solution?.shortcut || '',
          pitfalls: result.solution?.pitfalls || ''
        }
      }));
    } catch (err) {
      setAiError(err.message || 'Gemini analysis failed');
    } finally {
      setIsAiAnalyzing(false);
    }
  };

  const handleSubmit = () => {
    if (!newQuestion.question.trim()) {
      alert('Please enter a question statement or upload a screenshot.');
      return;
    }
    const custom = {
      ...newQuestion,
      id: `custom-${Date.now()}`,
      examId: activeExamId,
      year: newQuestion.year || 2024,
      slot: newQuestion.slot || 'Custom Drill'
    };
    onSaveQuestion(custom);
    onClose();
  };

  return (
    <div
      onPaste={handlePaste}
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
    >
      <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-2xl w-full p-6 border border-slate-200 dark:border-slate-800 shadow-2xl max-h-[90vh] overflow-y-auto space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between border-b pb-3 border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-bold text-xs">
              {currentExam.id.toUpperCase()}
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900 dark:text-white">
                Add Question & Mock Screenshot OCR
              </h2>
              <span className="text-[11px] text-slate-400">
                Paste screenshot (Ctrl+V) or let Gemini AI transcribe and draft 4-tier solutions
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 cursor-pointer font-bold"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* SCREENSHOT PASTE & DRAG-AND-DROP ZONE */}
        <ScreenshotDropzone
          imageBase64={newQuestion.imageBase64}
          onImageFile={handleImageFile}
          onRemoveImage={() => setNewQuestion((prev) => ({ ...prev, imageBase64: '' }))}
        />

        {/* Gemini Auto-Solve Button */}
        <GeminiAutoSolveSection
          isAiAnalyzing={isAiAnalyzing}
          aiError={aiError}
          onAutoSolve={handleAutoSolveWithGemini}
          onOpenSettings={onOpenSettings}
        />

        {/* Section & Topic Controls */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs pt-2">
          <div>
            <label className="font-bold text-slate-600 dark:text-slate-300 block mb-1">
              Target Section
            </label>
            <select
              value={newQuestion.sectionId}
              onChange={(e) => setNewQuestion({ ...newQuestion, sectionId: e.target.value })}
              className="w-full p-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-semibold"
            >
              {currentExam.sections.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="font-bold text-slate-600 dark:text-slate-300 block mb-1">
              Topic Name
            </label>
            <input
              type="text"
              placeholder="e.g. Time Speed Distance"
              value={newQuestion.topicName}
              onChange={(e) => setNewQuestion({ ...newQuestion, topicName: e.target.value })}
              className="w-full p-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-semibold"
            />
          </div>

          <div>
            <label className="font-bold text-slate-600 dark:text-slate-300 block mb-1">
              Question Type
            </label>
            <select
              value={newQuestion.type}
              onChange={(e) => setNewQuestion({ ...newQuestion, type: e.target.value })}
              className="w-full p-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-semibold"
            >
              <option value="MCQ">MCQ (Multiple Choice)</option>
              <option value="TITA">TITA (Type in Answer)</option>
            </select>
          </div>
        </div>

        {/* Question Statement */}
        <div>
          <label className="text-xs font-bold text-slate-600 dark:text-slate-300 block mb-1">
            Question Statement (LaTeX supported via $...$)
          </label>
          <textarea
            rows={3}
            placeholder="Type question statement or let Gemini Vision transcribe it above..."
            value={newQuestion.question}
            onChange={(e) => setNewQuestion({ ...newQuestion, question: e.target.value })}
            className="w-full p-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-800 dark:text-slate-200 leading-relaxed font-mono"
          />
        </div>

        {/* Options (for MCQ) */}
        {newQuestion.type === 'MCQ' && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-600 dark:text-slate-300">
                Options (Select radio button for the correct key)
              </label>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() =>
                    setNewQuestion((prev) => ({ ...prev, options: [...prev.options, ''] }))
                  }
                  className="text-[11px] font-bold text-indigo-600 hover:underline cursor-pointer"
                >
                  + Add Option
                </button>
                {newQuestion.options.length > 2 && (
                  <button
                    type="button"
                    onClick={() =>
                      setNewQuestion((prev) => ({ ...prev, options: prev.options.slice(0, -1) }))
                    }
                    className="text-[11px] font-bold text-rose-500 hover:underline cursor-pointer"
                  >
                    - Remove Option
                  </button>
                )}
              </div>
            </div>

            {newQuestion.options.map((opt, i) => (
              <div key={i} className="flex items-center gap-2">
                <span className="text-xs font-bold w-4 text-slate-500">
                  {String.fromCharCode(65 + i)}
                </span>
                <input
                  type="text"
                  value={opt}
                  onChange={(e) => {
                    const updated = [...newQuestion.options];
                    updated[i] = e.target.value;
                    setNewQuestion({ ...newQuestion, options: updated });
                  }}
                  placeholder={`Option ${String.fromCharCode(65 + i)}`}
                  className="flex-1 p-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-800 dark:text-slate-200"
                />
                <input
                  type="radio"
                  name="correctOpt"
                  checked={newQuestion.correctAnswer === i}
                  onChange={() => setNewQuestion({ ...newQuestion, correctAnswer: i })}
                  title={`Mark ${String.fromCharCode(65 + i)} as correct`}
                  className="w-4 h-4 cursor-pointer"
                />
              </div>
            ))}
          </div>
        )}

        {/* TITA Correct Value */}
        {newQuestion.type === 'TITA' && (
          <div>
            <label className="text-xs font-bold text-slate-600 dark:text-slate-300 block mb-1">
              Correct Numerical Value (TITA)
            </label>
            <input
              type="text"
              placeholder="e.g. 15 or 42.5"
              value={newQuestion.correctAnswer}
              onChange={(e) => setNewQuestion({ ...newQuestion, correctAnswer: e.target.value })}
              className="w-full p-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-mono font-bold"
            />
          </div>
        )}

        {/* 4-Tier Solutions Inputs */}
        <div className="space-y-3 pt-2 border-t border-slate-100 dark:border-slate-800">
          <span className="text-xs font-black uppercase tracking-wider text-slate-500 block">
            Structured 4-Tier Solution
          </span>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div>
              <label className="font-bold text-blue-600 dark:text-blue-400 block mb-1">
                1. Core Concept / Fundamental Rule
              </label>
              <textarea
                rows={2}
                placeholder="Underlying formula or axiom..."
                value={newQuestion.solution.coreConcept}
                onChange={(e) =>
                  setNewQuestion({
                    ...newQuestion,
                    solution: { ...newQuestion.solution, coreConcept: e.target.value }
                  })
                }
                className="w-full p-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs"
              />
            </div>

            <div>
              <label className="font-bold text-amber-600 dark:text-amber-400 block mb-1">
                2. Exam Pro Shortcut
              </label>
              <textarea
                rows={2}
                placeholder="Option elimination, boundary value, symmetry..."
                value={newQuestion.solution.shortcut}
                onChange={(e) =>
                  setNewQuestion({
                    ...newQuestion,
                    solution: { ...newQuestion.solution, shortcut: e.target.value }
                  })
                }
                className="w-full p-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-indigo-600 dark:text-indigo-400 block mb-1">
              3. Rigorous Step-by-Step Derivation
            </label>
            <textarea
              rows={3}
              placeholder="Detailed mathematical steps in KaTeX..."
              value={newQuestion.solution.stepByStep}
              onChange={(e) =>
                setNewQuestion({
                  ...newQuestion,
                  solution: { ...newQuestion.solution, stepByStep: e.target.value }
                })
              }
              className="w-full p-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-mono"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-rose-600 dark:text-rose-400 block mb-1">
              4. Trap Alerts & Pitfalls
            </label>
            <textarea
              rows={2}
              placeholder="Why are options B or C distractors? Common misreadings..."
              value={newQuestion.solution.pitfalls}
              onChange={(e) =>
                setNewQuestion({
                  ...newQuestion,
                  solution: { ...newQuestion.solution, pitfalls: e.target.value }
                })
              }
              className="w-full p-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs"
            />
          </div>
        </div>

        {/* Modal Actions */}
        <div className="flex justify-end gap-2 pt-3 border-t border-slate-100 dark:border-slate-800">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-500 hover:bg-slate-100 cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-md shadow-indigo-500/20 cursor-pointer"
          >
            Save to Question Bank
          </button>
        </div>
      </div>
    </div>
  );
};
