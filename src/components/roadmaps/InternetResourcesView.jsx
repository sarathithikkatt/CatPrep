import React, { useState } from 'react';
import { ExternalLink, Globe, Search } from 'lucide-react';
import { CURATED_INTERNET_RESOURCES } from './sprintPlansData';

/**
 * Curated Internet Resources View:
 * Comprehensive directory of free high-yield CAT preparation resources,
 * past paper portals, video lecture playlists, and official exam simulators.
 */
export const InternetResourcesView = () => {
  const [filterCategory, setFilterCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const resources = CURATED_INTERNET_RESOURCES;

  // Filter logic
  const filtered = resources.filter((res) => {
    const matchesCategory =
      filterCategory === 'all' || res.category.toLowerCase().includes(filterCategory.toLowerCase());
    const matchesSearch =
      res.platform.toLowerCase().includes(searchQuery.toLowerCase()) ||
      res.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      res.bestFor.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white rounded-2xl p-6 shadow-lg border border-indigo-800">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm text-xs font-semibold text-indigo-200 mb-2 border border-white/10">
            <Globe className="w-3.5 h-3.5 text-cyan-300" />
            <span>Verified High-Yield Internet Resources</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black">Curated Free CAT Preparation Directory</h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 leading-relaxed">
            The top free resources, past paper portals, video masterclasses, and reading archives
            recommended by 99+ percentilers from IMS, 2IIM, Cracku, and Rodha.
          </p>
        </div>
      </div>

      {/* Filter and Search Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {[
            { id: 'all', label: 'All Resources' },
            { id: 'video', label: 'Video Theory' },
            { id: 'paper', label: 'Past Papers / PYQ' },
            { id: 'mock', label: 'Free Mocks' },
            { id: 'reading', label: 'VARC Reading' },
            { id: 'official', label: 'Official IIM Portal' }
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setFilterCategory(cat.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer whitespace-nowrap ${
                filterCategory === cat.id
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="relative min-w-[220px]">
          <Search className="w-3.5 h-3.5 absolute left-3 top-3 text-slate-400" />
          <input
            type="text"
            placeholder="Search resources, topics..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      </div>

      {/* Resource Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((res) => (
          <div
            key={res.id}
            className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between hover:border-indigo-300 dark:hover:border-indigo-700 transition"
          >
            <div className="space-y-3">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider ${res.badgeColor}`}
                  >
                    {res.badge}
                  </span>
                  <h3 className="text-base font-extrabold text-slate-900 dark:text-white mt-1">
                    {res.platform}
                  </h3>
                  <div className="text-xs text-indigo-600 dark:text-indigo-400 font-semibold">
                    {res.category}
                  </div>
                </div>
              </div>

              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                {res.description}
              </p>

              {/* Best For Tag */}
              <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 text-[11px]">
                <span className="font-bold text-slate-900 dark:text-white">🎯 Best For: </span>
                <span className="text-slate-600 dark:text-slate-400">{res.bestFor}</span>
              </div>

              {/* Recommended Playlists / Archives */}
              {res.recommendedPlaylists && (
                <div className="space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                    Recommended Archives / Playlists:
                  </span>
                  <ul className="text-xs space-y-1 text-slate-600 dark:text-slate-300 list-disc list-inside">
                    {res.recommendedPlaylists.map((item, idx) => (
                      <li key={idx} className="text-[11px] leading-snug">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Direct Links Row */}
            <div className="pt-4 mt-4 border-t border-slate-100 dark:border-slate-800 flex items-center gap-2 flex-wrap">
              {res.links.map((link, idx) => (
                <a
                  key={idx}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-slate-100 dark:bg-slate-800 hover:bg-indigo-600 hover:text-white dark:hover:bg-indigo-600 text-slate-700 dark:text-slate-300 transition cursor-pointer"
                >
                  <span>{link.title}</span>
                  <ExternalLink className="w-3 h-3 opacity-70" />
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
