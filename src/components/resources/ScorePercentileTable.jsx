import React from 'react';
import { Award } from 'lucide-react';

/**
 * Historical raw score vs percentile benchmarks table for CAT.
 */
export const ScorePercentileTable = () => {
  const benchmarkRows = [
    {
      percentile: '99.5+ Percentile (IIM A/B/C)',
      percentileColor: 'text-indigo-600 dark:text-indigo-400 font-bold',
      overallMarks: '95 - 102 Marks (~50%)',
      netQs: '~32 - 34 Net Qs',
      varc: '42 - 45 Marks',
      dilr: '30 - 34 Marks',
      qa: '36 - 40 Marks'
    },
    {
      percentile: '99.0 Percentile (Top Tier IIMs)',
      percentileColor: 'text-indigo-600 dark:text-indigo-400 font-bold',
      overallMarks: '82 - 88 Marks (~43%)',
      netQs: '~28 - 30 Net Qs',
      varc: '36 - 40 Marks',
      dilr: '25 - 28 Marks',
      qa: '30 - 33 Marks'
    },
    {
      percentile: '95.0 Percentile (New/Baby IIMs)',
      percentileColor: 'text-slate-700 dark:text-slate-300 font-bold',
      overallMarks: '58 - 64 Marks (~31%)',
      netQs: '~20 - 22 Net Qs',
      varc: '26 - 30 Marks',
      dilr: '18 - 21 Marks',
      qa: '20 - 23 Marks'
    },
    {
      percentile: '90.0 Percentile (Top Private B-Schools)',
      percentileColor: 'text-slate-700 dark:text-slate-300 font-bold',
      overallMarks: '46 - 52 Marks (~25%)',
      netQs: '~15 - 18 Net Qs',
      varc: '20 - 23 Marks',
      dilr: '13 - 16 Marks',
      qa: '15 - 18 Marks'
    }
  ];

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <Award className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
        <h2 className="text-base font-bold text-slate-900 dark:text-white">
          Historical Score vs Percentile Reality Check (CAT 2020 - 2024)
        </h2>
      </div>
      <p className="text-xs text-slate-400 mb-4">
        CAT has 66 questions (Total 198 Marks, +3 for correct, -1 for wrong). Here are the actual
        raw score cutoffs:
      </p>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60 text-slate-700 dark:text-slate-300">
              <th className="p-3 font-bold">Target Percentile</th>
              <th className="p-3 font-bold">Overall Raw Marks (out of 198)</th>
              <th className="p-3 font-bold">Net Correct Questions (out of 66)</th>
              <th className="p-3 font-bold">VARC Target</th>
              <th className="p-3 font-bold">DILR Target</th>
              <th className="p-3 font-bold">QA Target</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-600 dark:text-slate-300">
            {benchmarkRows.map((row, idx) => (
              <tr key={idx} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30">
                <td className={`p-3 ${row.percentileColor}`}>{row.percentile}</td>
                <td className="p-3 font-black text-slate-900 dark:text-white">
                  {row.overallMarks}
                </td>
                <td className="p-3 font-bold">{row.netQs}</td>
                <td className="p-3">{row.varc}</td>
                <td className="p-3">{row.dilr}</td>
                <td className="p-3">{row.qa}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
