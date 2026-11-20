import React from 'react';
import { BookOpen, ArrowUpRight } from 'lucide-react';

/**
 * Curated authentic past paper repositories with direct links.
 */
export const PastPapersRepository = () => {
  const repositories = [
    {
      title: '2IIM Question Bank',
      badge: '100% Free / No Login',
      badgeClass: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300',
      description: 'Contains complete slot-wise question papers from CAT 2017 to 2024 with detailed step-by-step and video solutions for every problem.',
      link: 'https://questions.2iim.com/',
      linkLabel: 'Visit questions.2iim.com'
    },
    {
      title: 'IIM Official CAT Portal',
      badge: 'Official Mock & Papers',
      badgeClass: 'bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300',
      description: 'Official convenor portal releasing the actual exam interface, calculator software, and official response sheets every November.',
      link: 'https://iimcat.ac.in',
      linkLabel: 'Visit iimcat.ac.in'
    },
    {
      title: 'Cracku CAT Past Papers & Daily Targets',
      badge: 'Topic-Wise Filtered',
      badgeClass: 'bg-purple-100 text-purple-800 dark:bg-purple-900/40 dark:text-purple-300',
      description: 'Archives of CAT papers organized by topic and slot with percentile calculators.',
      link: 'https://cracku.in/cat-previous-papers',
      linkLabel: 'Visit cracku.in'
    }
  ];

  return (
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
        {repositories.map((repo, idx) => (
          <div key={idx} className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40">
            <div className="flex items-center justify-between mb-1">
              <span className="font-bold text-xs text-slate-800 dark:text-slate-200">{repo.title}</span>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${repo.badgeClass}`}>
                {repo.badge}
              </span>
            </div>
            <p className="text-[11px] text-slate-500 mb-2 leading-relaxed">
              {repo.description}
            </p>
            <a 
              href={repo.link} 
              target="_blank" 
              rel="noreferrer" 
              className="inline-flex items-center gap-1 text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline"
            >
              <span>{repo.linkLabel}</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};
