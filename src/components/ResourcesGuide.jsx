import React from 'react';
import { 
  ExternalLink, 
  Video, 
  BookOpen, 
  Award, 
  CheckCircle2, 
  TrendingUp, 
  ArrowUpRight, 
  Sparkles, 
  Layers 
} from 'lucide-react';

export const ResourcesGuide = () => {
  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm">
        <h1 className="text-xl font-black text-slate-900 dark:text-white mb-1">
          CAT Preparation Resources & Official Repositories
        </h1>
        <p className="text-xs text-slate-400">
          Curated authentic previous year papers, top video lectures, reading lists & percentile benchmarks
        </p>
      </div>

      {/* 1. Score vs Percentile Benchmarks */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <Award className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
          <h2 className="text-base font-bold text-slate-900 dark:text-white">
            Historical Score vs Percentile Reality Check (CAT 2020 - 2024)
          </h2>
        </div>
        <p className="text-xs text-slate-400 mb-4">
          CAT has 66 questions (Total 198 Marks, +3 for correct, -1 for wrong). Here are the actual raw score cutoffs:
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
              <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30">
                <td className="p-3 font-bold text-indigo-600 dark:text-indigo-400">99.5+ Percentile (IIM A/B/C)</td>
                <td className="p-3 font-black text-slate-900 dark:text-white">95 - 102 Marks (~50%)</td>
                <td className="p-3 font-bold">~32 - 34 Net Qs</td>
                <td className="p-3">42 - 45 Marks</td>
                <td className="p-3">30 - 34 Marks</td>
                <td className="p-3">36 - 40 Marks</td>
              </tr>
              <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30">
                <td className="p-3 font-bold text-indigo-600 dark:text-indigo-400">99.0 Percentile (Top Tier IIMs)</td>
                <td className="p-3 font-black text-slate-900 dark:text-white">82 - 88 Marks (~43%)</td>
                <td className="p-3 font-bold">~28 - 30 Net Qs</td>
                <td className="p-3">36 - 40 Marks</td>
                <td className="p-3">25 - 28 Marks</td>
                <td className="p-3">30 - 33 Marks</td>
              </tr>
              <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30">
                <td className="p-3 font-bold text-slate-700 dark:text-slate-300">95.0 Percentile (New/Baby IIMs)</td>
                <td className="p-3 font-bold">58 - 64 Marks (~31%)</td>
                <td className="p-3">~20 - 22 Net Qs</td>
                <td className="p-3">26 - 30 Marks</td>
                <td className="p-3">18 - 21 Marks</td>
                <td className="p-3">20 - 23 Marks</td>
              </tr>
              <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30">
                <td className="p-3 font-bold text-slate-700 dark:text-slate-300">90.0 Percentile (Top Private B-Schools)</td>
                <td className="p-3 font-bold">46 - 52 Marks (~25%)</td>
                <td className="p-3">~15 - 18 Net Qs</td>
                <td className="p-3">20 - 23 Marks</td>
                <td className="p-3">13 - 16 Marks</td>
                <td className="p-3">15 - 18 Marks</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* 2. Official Past Papers & Free Repositories */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-blue-600" />
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Authentic Previous Year Papers
            </h3>
          </div>
          <p className="text-xs text-slate-400">
            Past year papers from 2017 to 2024 are official and the gold standard for your preparation.
          </p>

          <div className="space-y-3">
            <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40">
              <div className="flex items-center justify-between mb-1">
                <span className="font-bold text-xs text-slate-800 dark:text-slate-200">2IIM Question Bank</span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300">100% Free / No Login</span>
              </div>
              <p className="text-[11px] text-slate-500 mb-2">
                Contains complete slot-wise question papers from CAT 2017 to 2024 with detailed step-by-step and video solutions for every problem.
              </p>
              <a 
                href="https://questions.2iim.com/" 
                target="_blank" 
                rel="noreferrer" 
                className="inline-flex items-center gap-1 text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline"
              >
                <span>Visit questions.2iim.com</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>

            <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40">
              <div className="flex items-center justify-between mb-1">
                <span className="font-bold text-xs text-slate-800 dark:text-slate-200">IIM Official CAT Portal</span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300">Official Mock & Papers</span>
              </div>
              <p className="text-[11px] text-slate-500 mb-2">
                Official convenor portal releasing the actual exam interface, calculator software, and official response sheets every November.
              </p>
              <a 
                href="https://iimcat.ac.in" 
                target="_blank" 
                rel="noreferrer" 
                className="inline-flex items-center gap-1 text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline"
              >
                <span>Visit iimcat.ac.in</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>

            <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40">
              <div className="flex items-center justify-between mb-1">
                <span className="font-bold text-xs text-slate-800 dark:text-slate-200">Cracku CAT Past Papers & Daily Targets</span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-purple-100 text-purple-800 dark:bg-purple-900/40 dark:text-purple-300">Topic-Wise Filtered</span>
              </div>
              <p className="text-[11px] text-slate-500 mb-2">
                Archives of CAT papers organized by topic and slot with percentile calculators.
              </p>
              <a 
                href="https://cracku.in/cat-previous-papers" 
                target="_blank" 
                rel="noreferrer" 
                className="inline-flex items-center gap-1 text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline"
              >
                <span>Visit cracku.in</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>

        {/* 3. High-Yield Free Channels & Lecturers */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center gap-2">
            <Video className="w-5 h-5 text-red-600" />
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Recommended Free Video Playlists
            </h3>
          </div>
          <p className="text-xs text-slate-400">
            Top mentors praised by CAT 99+ percentilers for deep conceptual rigor.
          </p>

          <div className="space-y-3">
            <div className="p-3 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/30">
              <div className="flex items-center justify-between mb-1">
                <span className="font-bold text-xs text-slate-800 dark:text-slate-200">Elites Grid (Hunny Sharma)</span>
                <span className="text-[10px] font-bold text-emerald-600">Best for DILR Puzzles</span>
              </div>
              <p className="text-[11px] text-slate-500">
                Famous for their "100 DILR Sets" marathon covering Games & Tournaments, Matrix matchings, and Venn Maxima-Minima.
              </p>
            </div>

            <div className="p-3 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/30">
              <div className="flex items-center justify-between mb-1">
                <span className="font-bold text-xs text-slate-800 dark:text-slate-200">Rodha (Ravi Prakash)</span>
                <span className="text-[10px] font-bold text-blue-600">Best for QA Foundations</span>
              </div>
              <p className="text-[11px] text-slate-500">
                In-depth mathematical concepts for Arithmetic, Algebra, and Geometry from scratch to advanced level.
              </p>
            </div>

            <div className="p-3 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/30">
              <div className="flex items-center justify-between mb-1">
                <span className="font-bold text-xs text-slate-800 dark:text-slate-200">Bodhee Prep & Gejo Speaks</span>
                <span className="text-[10px] font-bold text-purple-600">Best for VARC RC & Tone</span>
              </div>
              <p className="text-[11px] text-slate-500">
                Teaches how to deconstruct Aeon essays, identify author assumptions, and eliminate trap choices in Reading Comprehension.
              </p>
            </div>

            <div className="p-3 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/30">
              <div className="flex items-center justify-between mb-1">
                <span className="font-bold text-xs text-slate-800 dark:text-slate-200">Aeon Essays (aeon.co)</span>
                <span className="text-[10px] font-bold text-amber-600">Must-Read for RC Mastery</span>
              </div>
              <p className="text-[11px] text-slate-500">
                Read 1 essay every single day on philosophy, anthropology, psychology, and science to build mental stamina.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Multi-Exam Extensibility Blueprint */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white rounded-2xl p-6 border border-slate-800 shadow-lg">
        <div className="flex items-center gap-2 mb-2">
          <Layers className="w-5 h-5 text-indigo-400" />
          <h2 className="text-base font-bold text-white">
            Extending to Future Competitive Examinations (XAT, GMAT, GRE, GATE)
          </h2>
        </div>
        <p className="text-xs text-slate-300 mb-4 max-w-2xl leading-relaxed">
          The system architecture has been engineered with modular schemas. Switching exams in the top navbar instantly loads the corresponding curriculum:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-white/5 border border-white/10">
            <span className="font-bold text-amber-300 block mb-1">XAT (XLRI Jamshedpur)</span>
            <p className="text-slate-300 text-[11px] leading-relaxed">
              Shares 70% syllabus with CAT (QA, DI, Verbal). Adds the critical **Decision Making (DM)** section and General Knowledge.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-white/5 border border-white/10">
            <span className="font-bold text-emerald-300 block mb-1">GMAT (Focus Edition)</span>
            <p className="text-slate-300 text-[11px] leading-relaxed">
              Shares Arithmetic & Algebra with CAT QA. Replaces Geometry with **Data Insights (Multi-Source Reasoning & Data Sufficiency)**.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-white/5 border border-white/10">
            <span className="font-bold text-blue-300 block mb-1">GRE & GATE</span>
            <p className="text-slate-300 text-[11px] leading-relaxed">
              Easily plug in vocabulary-rich verbal or engineering math modules directly into `src/data/examsData.js`.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
