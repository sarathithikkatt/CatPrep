import React, { useState } from 'react';
import { X } from 'lucide-react';
import { calcSectionScore, estimatePercentile } from './mocksHelper';

/**
 * Modal dialog for inputting and calculating a new mock test report card.
 */
export const LogMockModal = ({ isOpen, onClose, onSaveMock }) => {
  const [mockName, setMockName] = useState('');
  const [platform, setPlatform] = useState('IMS SimCAT');
  const [dateTaken, setDateTaken] = useState(new Date().toISOString().split('T')[0]);

  // Section inputs
  const [sectionData, setSectionData] = useState({
    varc: { total: 24, attempted: 18, correct: 13, incorrectMcq: 4, incorrectTita: 1, capabilityMarks: 45 },
    dilr: { total: 20, attempted: 12, correct: 9, incorrectMcq: 3, incorrectTita: 0, capabilityMarks: 36 },
    qa: { total: 22, attempted: 14, correct: 11, incorrectMcq: 2, incorrectTita: 1, capabilityMarks: 42 }
  });

  if (!isOpen) return null;

  const handleUpdateSection = (secKey, field, val) => {
    const num = Math.max(0, parseInt(val, 10) || 0);
    setSectionData(prev => ({
      ...prev,
      [secKey]: {
        ...prev[secKey],
        [field]: num
      }
    }));
  };

  const varcScore = calcSectionScore(sectionData.varc);
  const dilrScore = calcSectionScore(sectionData.dilr);
  const qaScore = calcSectionScore(sectionData.qa);
  const totalScore = varcScore + dilrScore + qaScore;
  const totalAttempted = sectionData.varc.attempted + sectionData.dilr.attempted + sectionData.qa.attempted;
  const totalCorrect = sectionData.varc.correct + sectionData.dilr.correct + sectionData.qa.correct;
  const totalCapability = sectionData.varc.capabilityMarks + sectionData.dilr.capabilityMarks + sectionData.qa.capabilityMarks;
  const panicDelta = Math.max(0, totalCapability - totalScore);
  const overallAccuracy = totalAttempted > 0 ? Math.round((totalCorrect / totalAttempted) * 100) : 0;

  const handleSubmit = () => {
    if (!mockName.trim()) {
      alert('Please enter a mock test name (e.g., SimCAT 3)');
      return;
    }

    onSaveMock({
      id: `mock-${Date.now()}`,
      name: mockName.trim(),
      platform,
      date: dateTaken,
      sections: {
        varc: { ...sectionData.varc, score: varcScore },
        dilr: { ...sectionData.dilr, score: dilrScore },
        qa: { ...sectionData.qa, score: qaScore }
      },
      totalScore,
      totalAttempted,
      totalCorrect,
      totalCapability,
      panicDelta,
      accuracy: overallAccuracy,
      percentileEstimate: estimatePercentile(totalScore)
    });

    setMockName('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-2xl w-full p-6 border border-slate-200 dark:border-slate-800 shadow-2xl max-h-[90vh] overflow-y-auto space-y-4">
        <div className="flex items-center justify-between border-b pb-3 border-slate-100 dark:border-slate-800">
          <h2 className="text-base font-bold text-slate-900 dark:text-white">
            Log Mock Test Report Card
          </h2>
          <button 
            onClick={onClose} 
            className="text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 text-lg cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* General Info */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div>
            <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Mock Name</label>
            <input
              type="text"
              placeholder="e.g. SimCAT 4"
              value={mockName}
              onChange={(e) => setMockName(e.target.value)}
              className="w-full p-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-semibold"
            />
          </div>

          <div>
            <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Test Platform</label>
            <select
              value={platform}
              onChange={(e) => setPlatform(e.target.value)}
              className="w-full p-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-semibold cursor-pointer"
            >
              <option value="IMS SimCAT">IMS SimCAT</option>
              <option value="TIME AIMCAT">TIME AIMCAT</option>
              <option value="CL PRIME">Career Launcher PRIME</option>
              <option value="Cracku Daily/Mock">Cracku Mocks</option>
              <option value="Sectional Test">Sectional Test</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div>
            <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Date Taken</label>
            <input
              type="date"
              value={dateTaken}
              onChange={(e) => setDateTaken(e.target.value)}
              className="w-full p-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-semibold"
            />
          </div>
        </div>

        {/* Sectional Data Table */}
        <div className="space-y-3 pt-2">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
            Sectional Marks Entry (+3 for correct, -1 for MCQ wrong, 0 for TITA wrong)
          </span>

          {['varc', 'dilr', 'qa'].map((secKey) => {
            const sec = sectionData[secKey];
            const secName = secKey.toUpperCase();
            const currentSecMarks = calcSectionScore(sec);

            return (
              <div key={secKey} className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                    {secName} Section
                  </span>
                  <span className="text-xs font-extrabold text-indigo-600 dark:text-indigo-400">
                    Net Score: {currentSecMarks} Marks
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-xs">
                  <div>
                    <span className="text-[10px] text-slate-400 block mb-0.5">Attempted</span>
                    <input
                      type="number"
                      value={sec.attempted}
                      onChange={(e) => handleUpdateSection(secKey, 'attempted', e.target.value)}
                      className="w-full p-1.5 rounded border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-bold"
                    />
                  </div>
                  <div>
                    <span className="text-[10px] text-emerald-600 block mb-0.5">Correct (+3)</span>
                    <input
                      type="number"
                      value={sec.correct}
                      onChange={(e) => handleUpdateSection(secKey, 'correct', e.target.value)}
                      className="w-full p-1.5 rounded border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-bold text-emerald-600"
                    />
                  </div>
                  <div>
                    <span className="text-[10px] text-rose-600 block mb-0.5">MCQ Wrong (-1)</span>
                    <input
                      type="number"
                      value={sec.incorrectMcq}
                      onChange={(e) => handleUpdateSection(secKey, 'incorrectMcq', e.target.value)}
                      className="w-full p-1.5 rounded border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-bold text-rose-600"
                    />
                  </div>
                  <div>
                    <span className="text-[10px] text-amber-600 block mb-0.5">TITA Wrong (0)</span>
                    <input
                      type="number"
                      value={sec.incorrectTita}
                      onChange={(e) => handleUpdateSection(secKey, 'incorrectTita', e.target.value)}
                      className="w-full p-1.5 rounded border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-bold text-amber-600"
                    />
                  </div>
                  <div>
                    <span className="text-[10px] text-indigo-500 block mb-0.5">Untimed Cap.</span>
                    <input
                      type="number"
                      value={sec.capabilityMarks}
                      onChange={(e) => handleUpdateSection(secKey, 'capabilityMarks', e.target.value)}
                      className="w-full p-1.5 rounded border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-bold text-indigo-500"
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Total Summary Footer */}
        <div className="p-4 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-900/60 flex items-center justify-between text-xs">
          <div>
            <span className="text-slate-500 block">Total Timed Score:</span>
            <span className="text-xl font-black text-indigo-700 dark:text-indigo-300">
              {totalScore} / 198 Marks
            </span>
          </div>
          <div className="text-right">
            <span className="text-slate-500 block">Percentile Benchmark:</span>
            <span className="text-sm font-extrabold text-slate-800 dark:text-slate-200">
              {estimatePercentile(totalScore)}
            </span>
          </div>
        </div>

        <div className="flex justify-end gap-2 pt-2">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-500 cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-5 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-sm cursor-pointer transition"
          >
            Save Scorecard
          </button>
        </div>
      </div>
    </div>
  );
};
