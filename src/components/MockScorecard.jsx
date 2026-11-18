import React, { useState } from 'react';
import { 
  Award, 
  Plus, 
  Trash2, 
  TrendingUp, 
  AlertCircle, 
  Clock, 
  CheckCircle2, 
  Calendar, 
  Sparkles,
  BarChart2,
  ChevronDown,
  Layers
} from 'lucide-react';

export const MockScorecard = ({ userData, onUpdateUserData }) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [mockName, setMockName] = useState('');
  const [platform, setPlatform] = useState('IMS SimCAT');
  const [dateTaken, setDateTaken] = useState(new Date().toISOString().split('T')[0]);

  // Section inputs
  const [sectionData, setSectionData] = useState({
    varc: { total: 24, attempted: 18, correct: 13, incorrectMcq: 4, incorrectTita: 1, capabilityMarks: 45 },
    dilr: { total: 20, attempted: 12, correct: 9, incorrectMcq: 3, incorrectTita: 0, capabilityMarks: 36 },
    qa: { total: 22, attempted: 14, correct: 11, incorrectMcq: 2, incorrectTita: 1, capabilityMarks: 42 }
  });

  const mockList = userData.mockReports || [];

  // Calculate scores helper
  const calcSectionScore = (sec) => {
    return (sec.correct * 3) - (sec.incorrectMcq * 1);
  };

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

  // Percentile Estimator based on historical CAT raw scores
  const estimatePercentile = (rawScore) => {
    if (rawScore >= 95) return '99.5+ %ile (IIM A/B/C tier)';
    if (rawScore >= 82) return '99.0 %ile (Top IIMs tier)';
    if (rawScore >= 70) return '97.5 %ile (IIM L/K/I)';
    if (rawScore >= 58) return '95.0 %ile (New IIMs)';
    if (rawScore >= 46) return '90.0 %ile (Tier 1 Private)';
    if (rawScore >= 35) return '85.0 %ile';
    return '< 80.0 %ile';
  };

  const handleSaveMock = () => {
    if (!mockName.trim()) {
      alert('Please enter a mock test name (e.g., SimCAT 3)');
      return;
    }

    const newReport = {
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
    };

    const updated = [newReport, ...mockList];
    onUpdateUserData({
      ...userData,
      mockReports: updated
    });

    setShowAddModal(false);
    setMockName('');
  };

  const handleDeleteMock = (id) => {
    if (confirm('Delete this mock test report?')) {
      const updated = mockList.filter(m => m.id !== id);
      onUpdateUserData({
        ...userData,
        mockReports: updated
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Award className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            <h1 className="text-xl font-black text-slate-900 dark:text-white">
              Mock Test Scorecards & Capability Analysis
            </h1>
          </div>
          <p className="text-xs text-slate-400">
            Log sectional & full-length mock exams (IMS, TIME, CL, Cracku), track percentiles & measure your Panic Delta
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md shadow-indigo-500/20 transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Log Mock Score</span>
        </button>
      </div>

      {/* Diagnostics Insight Card: What is Capability Score? */}
      <div className="bg-gradient-to-r from-indigo-900 via-indigo-950 to-slate-900 text-white p-5 rounded-2xl border border-indigo-800 shadow-sm">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-xl bg-amber-400/20 text-amber-300 shrink-0 mt-0.5">
            <Sparkles className="w-4 h-4" />
          </div>
          <div className="text-xs space-y-1">
            <span className="font-bold text-amber-300 block">
              The 99th Percentile "Panic Delta" Diagnostic (from CAT Knowledge Vault):
            </span>
            <p className="text-slate-300 leading-relaxed">
              After finishing a timed mock test, solve the unattempted questions in an <strong>untimed "Capability" session</strong>. The difference between your Capability Score and your Timed Score is your <strong>Panic Delta</strong>. A high delta means your knowledge is sound, but question selection or speed panic is reducing your score!
            </p>
          </div>
        </div>
      </div>

      {/* Mock Tests List */}
      {mockList.length === 0 ? (
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-12 text-center border border-dashed border-slate-200 dark:border-slate-800">
          <div className="w-12 h-12 rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mx-auto mb-3">
            <BarChart2 className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-slate-800 dark:text-slate-200 mb-1">
            No Mock Tests Logged Yet
          </h3>
          <p className="text-xs text-slate-400 max-w-md mx-auto mb-4">
            Record your SimCATs, AIMCATs, or sectional tests to track your score progression, accuracy, and section percentiles.
          </p>
          <button
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2 rounded-xl bg-indigo-600 text-white font-bold text-xs shadow-sm hover:bg-indigo-700 cursor-pointer"
          >
            Log First Mock Exam
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {mockList.map((mock) => (
            <div
              key={mock.id}
              className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-4 hover:border-indigo-300 dark:hover:border-indigo-800 transition"
            >
              {/* Card Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-black text-sm">
                    {mock.totalScore}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-extrabold text-base text-slate-900 dark:text-white">
                        {mock.name}
                      </h3>
                      <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                        {mock.platform}
                      </span>
                    </div>
                    <span className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
                      <Calendar className="w-3.5 h-3.5" />
                      {mock.date} • {mock.percentileEstimate}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <span className="text-xs text-slate-400 block">Overall Accuracy</span>
                    <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400">
                      {mock.accuracy}%
                    </span>
                  </div>
                  <button
                    onClick={() => handleDeleteMock(mock.id)}
                    className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-lg transition"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Section Breakdown Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {/* VARC */}
                <div className="p-3.5 rounded-xl bg-purple-50/60 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-900/40">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-purple-700 dark:text-purple-300">VARC Section</span>
                    <span className="text-sm font-black text-purple-900 dark:text-purple-200">
                      {mock.sections.varc.score} Marks
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400">
                    {mock.sections.varc.correct} Correct • {mock.sections.varc.incorrectMcq} Wrong (MCQ) • {mock.sections.varc.attempted}/{mock.sections.varc.total} Att.
                  </div>
                </div>

                {/* DILR */}
                <div className="p-3.5 rounded-xl bg-emerald-50/60 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/40">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-emerald-700 dark:text-emerald-300">DILR Section</span>
                    <span className="text-sm font-black text-emerald-900 dark:text-emerald-200">
                      {mock.sections.dilr.score} Marks
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400">
                    {mock.sections.dilr.correct} Correct • {mock.sections.dilr.incorrectMcq} Wrong (MCQ) • {mock.sections.dilr.attempted}/{mock.sections.dilr.total} Att.
                  </div>
                </div>

                {/* QA */}
                <div className="p-3.5 rounded-xl bg-blue-50/60 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900/40">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-blue-700 dark:text-blue-300">QA Section</span>
                    <span className="text-sm font-black text-blue-900 dark:text-blue-200">
                      {mock.sections.qa.score} Marks
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400">
                    {mock.sections.qa.correct} Correct • {mock.sections.qa.incorrectMcq} Wrong (MCQ) • {mock.sections.qa.attempted}/{mock.sections.qa.total} Att.
                  </div>
                </div>
              </div>

              {/* Capability Gap Footnote */}
              <div className="flex items-center justify-between text-xs pt-1 px-1 text-slate-500">
                <span>
                  Untimed Capability: <strong className="text-slate-800 dark:text-slate-200">{mock.totalCapability} Marks</strong>
                </span>
                <span className="font-semibold text-amber-600 dark:text-amber-400">
                  Panic Delta: -{mock.panicDelta} Marks lost to time pressure
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Log Mock Score Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-2xl w-full p-6 border border-slate-200 dark:border-slate-800 shadow-2xl max-h-[90vh] overflow-y-auto space-y-4">
            <div className="flex items-center justify-between border-b pb-3 border-slate-100 dark:border-slate-800">
              <h2 className="text-base font-bold text-slate-900 dark:text-white">
                Log Mock Test Report Card
              </h2>
              <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-slate-700 text-lg">✕</button>
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
                  className="w-full p-2 rounded-lg border bg-slate-50 dark:bg-slate-800 font-semibold"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Test Platform</label>
                <select
                  value={platform}
                  onChange={(e) => setPlatform(e.target.value)}
                  className="w-full p-2 rounded-lg border bg-slate-50 dark:bg-slate-800 font-semibold"
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
                  className="w-full p-2 rounded-lg border bg-slate-50 dark:bg-slate-800 font-semibold"
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
                          className="w-full p-1.5 rounded border bg-white dark:bg-slate-900 text-xs font-bold"
                        />
                      </div>
                      <div>
                        <span className="text-[10px] text-emerald-600 block mb-0.5">Correct (+3)</span>
                        <input
                          type="number"
                          value={sec.correct}
                          onChange={(e) => handleUpdateSection(secKey, 'correct', e.target.value)}
                          className="w-full p-1.5 rounded border bg-white dark:bg-slate-900 text-xs font-bold text-emerald-600"
                        />
                      </div>
                      <div>
                        <span className="text-[10px] text-rose-600 block mb-0.5">MCQ Wrong (-1)</span>
                        <input
                          type="number"
                          value={sec.incorrectMcq}
                          onChange={(e) => handleUpdateSection(secKey, 'incorrectMcq', e.target.value)}
                          className="w-full p-1.5 rounded border bg-white dark:bg-slate-900 text-xs font-bold text-rose-600"
                        />
                      </div>
                      <div>
                        <span className="text-[10px] text-amber-600 block mb-0.5">TITA Wrong (0)</span>
                        <input
                          type="number"
                          value={sec.incorrectTita}
                          onChange={(e) => handleUpdateSection(secKey, 'incorrectTita', e.target.value)}
                          className="w-full p-1.5 rounded border bg-white dark:bg-slate-900 text-xs font-bold text-amber-600"
                        />
                      </div>
                      <div>
                        <span className="text-[10px] text-indigo-500 block mb-0.5">Untimed Cap.</span>
                        <input
                          type="number"
                          value={sec.capabilityMarks}
                          onChange={(e) => handleUpdateSection(secKey, 'capabilityMarks', e.target.value)}
                          className="w-full p-1.5 rounded border bg-white dark:bg-slate-900 text-xs font-bold text-indigo-500"
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
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 rounded-lg border text-xs font-bold text-slate-500 cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveMock}
                className="px-5 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-sm cursor-pointer"
              >
                Save Scorecard
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
