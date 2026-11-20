import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';

/**
 * Modal dialog for scheduling a custom task into a specific day and R-E-S-T pillar.
 */
export const AddTaskModal = ({ isOpen, onClose, onAddTask }) => {
  const [newTaskDay, setNewTaskDay] = useState('mon');
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskSection, setNewTaskSection] = useState('qa');
  const [newTaskPillar, setNewTaskPillar] = useState('enhance');
  const [newTaskMinutes, setNewTaskMinutes] = useState(30);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;

    onAddTask({
      dayId: newTaskDay,
      task: {
        id: `task-${Date.now()}`,
        title: newTaskTitle.trim(),
        section: newTaskSection,
        pillar: newTaskPillar,
        minutes: parseInt(newTaskMinutes, 10) || 30,
        completed: false
      }
    });

    setNewTaskTitle('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-md w-full p-6 border border-slate-200 dark:border-slate-800 shadow-2xl space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
          <h3 className="font-extrabold text-base text-slate-900 dark:text-white flex items-center gap-2">
            <Plus className="w-4 h-4 text-indigo-600" />
            <span>Add Study Task</span>
          </h3>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 text-sm font-bold cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
              Scheduled Day
            </label>
            <select
              value={newTaskDay}
              onChange={(e) => setNewTaskDay(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-100 font-semibold"
            >
              <option value="mon">Monday</option>
              <option value="tue">Tuesday</option>
              <option value="wed">Wednesday</option>
              <option value="thu">Thursday</option>
              <option value="fri">Friday</option>
              <option value="sat">Saturday</option>
              <option value="sun">Sunday</option>
            </select>
          </div>

          <div>
            <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
              Task Title & Goal
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Solve 10 Time Speed Distance PYQs"
              value={newTaskTitle}
              onChange={(e) => setNewTaskTitle(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-100 font-semibold"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                Section
              </label>
              <select
                value={newTaskSection}
                onChange={(e) => setNewTaskSection(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-100 font-semibold"
              >
                <option value="qa">QA (Quant)</option>
                <option value="dilr">DILR</option>
                <option value="varc">VARC</option>
                <option value="mock">Mock Test</option>
                <option value="general">General / Review</option>
              </select>
            </div>

            <div>
              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                R-E-S-T Pillar
              </label>
              <select
                value={newTaskPillar}
                onChange={(e) => setNewTaskPillar(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-100 font-semibold"
              >
                <option value="revise">Revise</option>
                <option value="enhance">Enhance</option>
                <option value="strategize">Strategize</option>
                <option value="test">Test & Diagnostic</option>
              </select>
            </div>
          </div>

          <div>
            <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
              Target Duration (Minutes)
            </label>
            <div className="grid grid-cols-4 gap-2">
              {[15, 30, 45, 60].map((mins) => (
                <button
                  type="button"
                  key={mins}
                  onClick={() => setNewTaskMinutes(mins)}
                  className={`py-2 rounded-xl border font-bold text-xs transition cursor-pointer ${
                    newTaskMinutes === mins
                      ? 'bg-indigo-600 text-white border-indigo-600'
                      : 'border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  {mins}m
                </button>
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-3 border-t border-slate-100 dark:border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-slate-500 font-semibold cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold cursor-pointer shadow-md shadow-indigo-500/20"
            >
              Add Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
